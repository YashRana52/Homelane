/**
 * Accessibility audit across every route.
 *
 *   npm run check:a11y -- http://localhost:4173
 *
 * Runs axe-core (WCAG 2.0/2.1 A and AA) in headless Chrome against each route
 * at two widths, because layout-dependent rules — contrast over an image, a
 * control that only renders on mobile — differ between them.
 *
 * On top of axe it checks three things axe cannot judge on its own:
 *   - exactly one <h1> per page, and no skipped heading levels
 *   - every <img> carries an alt attribute (empty is fine, missing is not)
 *   - the skip link is present and points at a real target
 *
 * Exits non-zero on any violation of impact "serious" or "critical", which is
 * the bar PLAN.md §7 Phase 9 sets.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXE = readFileSync(path.join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');

const ROUTES = [
  '/',
  '/design-ideas',
  '/design-ideas/modular-kitchen',
  '/design-ideas/modular-kitchen/classic-l-shaped-kitchen-with-light-blue-and-black-cabinets',
  '/offerings/full-home',
  '/luxe',
  '/price-calculator',
  '/price-calculator/kitchen',
  '/estimate',
  '/interiors/bengaluru',
  '/projects',
  '/magazine',
  '/store-locator',
  '/refer',
  '/about',
  '/contact',
  '/policies',
  '/this-route-does-not-exist',
];

const WIDTHS = [390, 1280];

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const base = (process.argv[2] ?? 'http://localhost:4173').replace(/\/$/, '');
const only = process.argv[3];
const routes = only ? [only] : ROUTES;

const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromePath) {
  console.error('No Chrome or Edge binary found.');
  process.exit(1);
}

const port = 9300 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(path.join(tmpdir(), 'a11y-'));
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
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
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
await send('Runtime.enable', {}, sessionId);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Structural checks axe does not make. */
const STRUCTURE = `(() => {
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
  const h1 = headings.filter((n) => n === 1).length;
  let skip = null;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) { skip = headings[i - 1] + '->' + headings[i]; break; }
  }
  const imgs = [...document.querySelectorAll('img')];
  const noAlt = imgs.filter((i) => !i.hasAttribute('alt')).length;
  const skipLink = document.querySelector('a[href="#main"]');
  const skipTarget = document.querySelector('#main');
  const landmarks = {
    header: document.querySelectorAll('header').length,
    main: document.querySelectorAll('main').length,
    footer: document.querySelectorAll('footer').length,
  };
  return JSON.stringify({ h1, skip, imgs: imgs.length, noAlt, skipLink: !!skipLink && !!skipTarget, landmarks });
})()`;

let totalSerious = 0;
let structureFailures = 0;
const seen = new Map();

for (const route of routes) {
  console.log(`\n${route}`);

  for (const width of WIDTHS) {
    await send(
      'Emulation.setDeviceMetricsOverride',
      { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 },
      sessionId,
    );
    await send('Page.navigate', { url: base + route }, sessionId);
    await wait(2600);

    // Inject axe fresh after each navigation — the page context is new.
    await send('Runtime.evaluate', { expression: AXE }, sessionId);

    const { result } = await send(
      'Runtime.evaluate',
      {
        expression: `axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] },
          resultTypes: ['violations'],
        }).then(r => JSON.stringify(r.violations.map(v => ({
          id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length,
          sample: (v.nodes[0] && v.nodes[0].target || []).join(' ')
        }))))`,
        awaitPromise: true,
        returnByValue: true,
      },
      sessionId,
    );

    const violations = JSON.parse(result.value);
    const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    const minor = violations.length - serious.length;
    totalSerious += serious.length;

    const { result: sres } = await send(
      'Runtime.evaluate',
      { expression: STRUCTURE, returnByValue: true },
      sessionId,
    );
    const s = JSON.parse(sres.value);

    const structureOk =
      s.h1 === 1 && !s.skip && s.noAlt === 0 && s.skipLink && s.landmarks.main === 1;
    if (!structureOk) structureFailures++;

    const ok = serious.length === 0 && structureOk;
    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'} ${String(width).padStart(4)}px  ` +
        `axe: ${serious.length} serious/critical, ${minor} minor  ·  ` +
        `h1=${s.h1} headingSkip=${s.skip ?? 'none'} imgs=${s.imgs} missingAlt=${s.noAlt} skipLink=${s.skipLink}`,
    );

    for (const v of serious) {
      console.log(`         [${v.impact}] ${v.id} — ${v.help} (${v.nodes} node${v.nodes > 1 ? 's' : ''})`);
      console.log(`         first: ${v.sample}`);
      seen.set(v.id, (seen.get(v.id) ?? 0) + v.nodes);
    }
  }
}

console.log('\n' + '='.repeat(64));
if (seen.size) {
  console.log('Serious/critical rules hit, by frequency:');
  for (const [id, count] of [...seen].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}  ${id}`);
  }
}
console.log(
  totalSerious === 0 && structureFailures === 0
    ? `Clean: ${routes.length} routes × ${WIDTHS.length} widths, no serious or critical violations.`
    : `${totalSerious} serious/critical violation(s), ${structureFailures} structural failure(s).`,
);

ws.close();
cleanup();
process.exit(totalSerious === 0 && structureFailures === 0 ? 0 : 1);
