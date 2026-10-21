/**
 * Horizontal-overflow detector.
 *
 *   node scripts/check-overflow.mjs http://localhost:4173 / /dev/kitchen-sink
 *
 * Loads each path at every breakpoint in the device matrix and reports any
 * element wider than the viewport. `overflow-x: hidden` on the body stops the
 * page scrolling sideways, but it also hides the evidence — this measures the
 * elements themselves, so a too-wide node is still caught.
 *
 * Drives Chrome over the DevTools Protocol using Node's built-in WebSocket,
 * so it needs no Puppeteer install.
 *
 * Exits non-zero if anything overflows.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const WIDTHS = [320, 360, 390, 414, 480, 768, 834, 1024, 1280, 1440, 1920];

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const [, , baseArg, ...pathArgs] = process.argv;
const base = (baseArg ?? 'http://localhost:4173').replace(/\/$/, '');
const paths = pathArgs.length > 0 ? pathArgs : ['/'];

const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromePath) {
  console.error('No Chrome or Edge binary found. Checked:\n  ' + CHROME_CANDIDATES.join('\n  '));
  process.exit(1);
}

const port = 9222 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(path.join(tmpdir(), 'overflow-'));

const chrome = spawn(
  chromePath,
  [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-extensions',
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
    /* the profile dir is a temp dir; leaving it behind is harmless */
  }
}
process.on('exit', cleanup);

/** Poll the debugger's HTTP endpoint until Chrome is listening. */
async function waitForChrome() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Chrome did not expose a debugging port in time');
}

/** Minimal CDP client over the browser-level WebSocket. */
function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 1;

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      listeners.get(msg.method)?.forEach((fn) => fn(msg.params));
    }
  });

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('CDP socket failed')), { once: true });
  });

  return {
    ready,
    send(method, params = {}, sessionId) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
    on(method, fn) {
      listeners.set(method, [...(listeners.get(method) ?? []), fn]);
    },
    close: () => ws.close(),
  };
}

/**
 * Runs in the page: find every element that sticks out past the viewport
 * AND is not clipped by an ancestor.
 *
 * The second half matters. A carousel slide is deliberately wider than the
 * screen and sits inside an `overflow: hidden` track — it extends past the
 * viewport but can never scroll the page, so flagging it is noise. Only a
 * node with no clipping ancestor can actually widen the document.
 */
const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p);
      if (/hidden|clip|auto|scroll/.test(o.overflowX)) return true;
    }
    return false;
  };

  const offenders = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (Math.round(r.right - vw) <= 1 && Math.round(-r.left) <= 1) continue;
    if (clipped(el)) continue;
    // Report only the outermost offender; a wide parent makes every
    // descendant look wide too.
    if (offenders.some((o) => o.el.contains(el))) continue;
    offenders.push({
      el,
      tag: el.tagName.toLowerCase(),
      cls: (el.getAttribute('class') || '').slice(0, 90),
      width: Math.round(r.width),
      right: Math.round(r.right),
      left: Math.round(r.left),
    });
  }

  return JSON.stringify({
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: offenders.slice(0, 12).map(({ el: _el, ...rest }) => rest),
  });
})()`;

const wsUrl = await waitForChrome();
const browser = connect(wsUrl);
await browser.ready;

const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });

await browser.send('Page.enable', {}, sessionId);
await browser.send('Runtime.enable', {}, sessionId);

const consoleErrors = [];
browser.on('Runtime.exceptionThrown', (p) => {
  consoleErrors.push(p.exceptionDetails?.exception?.description ?? 'unknown exception');
});

let failures = 0;

for (const pagePath of paths) {
  console.log(`\n${'='.repeat(64)}\n${pagePath}\n${'='.repeat(64)}`);

  for (const width of WIDTHS) {
    await browser.send(
      'Emulation.setDeviceMetricsOverride',
      { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 },
      sessionId,
    );

    const loaded = new Promise((resolve) => {
      const done = () => resolve();
      browser.on('Page.loadEventFired', done);
      setTimeout(done, 12000);
    });

    await browser.send('Page.navigate', { url: base + pagePath }, sessionId);
    await loaded;
    // Let fonts settle and lazy content paint before measuring.
    await new Promise((r) => setTimeout(r, 900));

    const { result } = await browser.send(
      'Runtime.evaluate',
      { expression: PROBE, returnByValue: true, awaitPromise: false },
      sessionId,
    );

    const data = JSON.parse(result.value);
    const scrolls = data.scrollWidth > data.viewport + 1;
    const ok = data.offenders.length === 0 && !scrolls;

    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'}  ${String(width).padStart(4)}px   ` +
        `scrollWidth ${data.scrollWidth}` +
        (ok ? '' : `   ${data.offenders.length} wide element(s)`),
    );

    if (!ok) {
      failures++;
      for (const o of data.offenders) {
        console.log(`           <${o.tag}> w=${o.width} left=${o.left} right=${o.right}`);
        console.log(`           class="${o.cls}"`);
      }
    }
  }
}

if (consoleErrors.length) {
  console.log('\nUncaught page exceptions:');
  for (const e of [...new Set(consoleErrors)]) console.log('  ' + e.split('\n')[0]);
}

console.log(
  `\n${failures === 0 ? 'No horizontal overflow at any width.' : `${failures} breakpoint(s) overflow.`}`,
);

browser.close();
cleanup();
process.exit(failures === 0 && consoleErrors.length === 0 ? 0 : 1);
