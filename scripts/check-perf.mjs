/**
 * Core Web Vitals on a throttled mobile profile.
 *
 *   npm run check:perf -- http://localhost:4173
 *
 * Measures LCP and CLS per route against a 4x-slowed CPU and a Fast-3G
 * network, which is closer to the device most of this audience browses on
 * than an unthrottled desktop run.
 *
 * Thresholds are the ones in PLAN.md §7 Phase 9: LCP under 2.5s, CLS under
 * 0.1. INP needs real interaction and is checked by hand in the wizard flow.
 *
 * Treat the timings as a trend, not a verdict. Emulated throttling on a busy
 * desktop is noisy — repeat runs of the same build have moved homepage FCP
 * between roughly 2.9s and 5.7s. CLS, TTFB, transfer size and request count
 * are stable and are the numbers worth acting on.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROUTES = ['/', '/design-ideas/modular-kitchen', '/price-calculator/kitchen', '/luxe'];

const LCP_BUDGET_MS = 2500;
const CLS_BUDGET = 0.1;

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const base = (process.argv[2] ?? 'http://localhost:4173').replace(/\/$/, '');
const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromePath) {
  console.error('No Chrome binary found.');
  process.exit(1);
}

const port = 9500 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(path.join(tmpdir(), 'perf-'));
const chrome = spawn(
  chromePath,
  [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

function cleanup() {
  chrome.kill();
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {
    /* temp dir */
  }
}
process.on('exit', cleanup);

async function wsUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Chrome did not start');
}

const ws = new WebSocket(await wsUrl());
const pending = new Map();
let nextId = 1;
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
  }
});
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Network.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride', {
  width: 390, height: 844, deviceScaleFactor: 2, mobile: true,
}, sessionId);
await send('Emulation.setCPUThrottlingRate', { rate: 4 }, sessionId);
await send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
}, sessionId);

const PROBE = `new Promise((resolve) => {
  let lcp = 0, lcpEl = '';
  let cls = 0;
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      lcp = e.startTime;
      lcpEl = (e.element && e.element.tagName ? e.element.tagName.toLowerCase() : '?') +
              (e.url ? ' ' + e.url.split('/').pop().slice(0, 36) : '');
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });

  setTimeout(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const paints = performance.getEntriesByType('paint');
    const fcp = (paints.find((p) => p.name === 'first-contentful-paint') || {}).startTime || 0;
    const bytes = performance.getEntriesByType('resource')
      .reduce((sum, r) => sum + (r.encodedBodySize || 0), 0);
    const res = performance.getEntriesByType('resource');
    resolve(JSON.stringify({
      lcp: Math.round(lcp), lcpEl, cls: +cls.toFixed(4),
      fcp: Math.round(fcp), ttfb: Math.round(nav.responseStart || 0),
      kb: Math.round(bytes / 1024),
      reqs: res.length,
    }));
  }, 7000);
})`;

let failures = 0;

console.log('390x844, 4x CPU throttle, ~1.6 Mbps / 150ms RTT\n');
console.log(
  'route'.padEnd(36) + 'LCP'.padStart(8) + 'CLS'.padStart(9) + 'FCP'.padStart(8) +
    'TTFB'.padStart(8) + 'KB'.padStart(7) + 'reqs'.padStart(6),
);
console.log('-'.repeat(78));

// Every route is measured cold. Without this the first route pays for the
// vendor chunks and fonts and every later one reads them from cache, which
// makes the first page look several seconds slower than its neighbours for
// reasons that have nothing to do with the page.
await send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId);

for (const route of ROUTES) {
  await send('Network.clearBrowserCache', {}, sessionId);
  await send('Page.navigate', { url: base + route }, sessionId);
  // The evaluate must land in the NEW document. Without this pause the first
  // navigation out of about:blank measures the blank page and reports 0ms,
  // and on a throttled connection that first document takes a while.
  await new Promise((r) => setTimeout(r, 2500));
  const { result } = await send(
    'Runtime.evaluate',
    { expression: PROBE, awaitPromise: true, returnByValue: true },
    sessionId,
  );
  const m = JSON.parse(result.value);

  const lcpOk = m.lcp > 0 && m.lcp <= LCP_BUDGET_MS;
  const clsOk = m.cls <= CLS_BUDGET;
  if (!lcpOk || !clsOk) failures++;

  console.log(
    route.slice(0, 35).padEnd(36) +
      `${m.lcp}ms`.padStart(8) +
      `${m.cls}`.padStart(9) +
      `${m.fcp}ms`.padStart(8) +
      `${m.ttfb}ms`.padStart(8) +
      `${m.kb}`.padStart(7) +
      `${m.reqs}`.padStart(6) +
      (lcpOk && clsOk ? '  ok' : `  FAIL${!lcpOk ? ' lcp' : ''}${!clsOk ? ' cls' : ''}`),
  );
  if (m.lcpEl) console.log(`${' '.repeat(40)}LCP element: ${m.lcpEl}`);
}

console.log(
  `\n${failures === 0 ? `All routes within budget (LCP <= ${LCP_BUDGET_MS}ms, CLS <= ${CLS_BUDGET}).` : `${failures} route(s) over budget.`}`,
);

ws.close();
cleanup();
process.exit(failures === 0 ? 0 : 1);
