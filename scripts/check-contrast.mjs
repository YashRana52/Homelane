/**
 * Contrast audit of the design tokens themselves.
 *
 *   node scripts/check-contrast.mjs
 *
 * Reads the colours straight out of tokens.css and checks every pair the UI
 * actually puts together, against the WCAG 2.1 AA thresholds: 4.5:1 for body
 * text, 3:1 for large text (>=24px, or >=18.7px bold) and for UI boundaries.
 *
 * Auditing the tokens rather than the rendered page is the point — a page scan
 * reports the same failure five hundred times, one per node. This reports it
 * once, where it can be fixed.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(path.join(ROOT, 'src/styles/tokens.css'), 'utf8');

/** Tokens from the :root block only — the Luxe overrides are audited apart. */
const rootBlock = css.slice(css.indexOf(':root'), css.indexOf('[data-theme'));
const tokens = Object.fromEntries(
  [...rootBlock.matchAll(/--(c-[a-z0-9-]+):\s*(#[0-9a-f]{3,8})/gi)].map(([, k, v]) => [k, v]),
);

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const t = (name) => {
  const v = tokens[name];
  if (!v) throw new Error(`token --${name} not found`);
  return v;
};

/** [foreground, background, required ratio, what it is] */
const PAIRS = [
  // Button labels — small bold text on a solid fill.
  ['c-on-primary', 'c-primary-500', 4.5, 'Button label on primary fill'],
  ['c-on-primary', 'c-primary-600', 4.5, 'Button label on primary hover'],
  ['c-on-primary', 'c-primary-700', 4.5, 'Button label on primary active'],
  ['c-surface', 'c-secondary-700', 4.5, 'Button label on plum fill'],
  ['c-on-gold', 'c-gold-600', 4.5, 'Button label on gold fill'],

  // Body and secondary text on the two page backgrounds.
  ['c-secondary-700', 'c-surface', 4.5, 'Body text on white'],
  ['c-secondary-700', 'c-surface-50', 4.5, 'Body text on muted band'],
  ['c-surface-600', 'c-surface', 4.5, 'Secondary text on white'],
  ['c-surface-600', 'c-surface-50', 4.5, 'Secondary text on muted band'],
  // surface-400 is deliberately NOT a text colour. It failed AA badly at
  // 2.8:1, so every `text-surface-400` was replaced with `text-surface-600`;
  // the token survives for decorative icons and dividers, which only need 3:1.
  ['c-surface-400', 'c-surface', 3, 'Decorative icon on white'],

  // Coral used as text: links, eyebrows, the wordmark.
  ['c-primary-500', 'c-surface', 4.5, 'Coral text on white'],
  ['c-primary-600', 'c-surface', 4.5, 'Coral link on white'],
  ['c-primary-700', 'c-surface', 4.5, 'Coral link (dark) on white'],
  ['c-primary-600', 'c-surface-50', 4.5, 'Coral link on muted band'],
  ['c-primary-600', 'c-primary-50', 4.5, 'Coral text on coral tint'],

  // Semantic text.
  ['c-error', 'c-surface', 4.5, 'Error text on white'],
  ['c-success', 'c-surface', 4.5, 'Success text on white'],

  // Non-text. WCAG 1.4.11 wants 3:1 for a boundary that is needed to identify
  // a control — an input's border qualifies, since without it there is no
  // field. A card's border does not: the card is identified by the photograph
  // and heading inside it, and pushing every card outline to 3:1 would turn a
  // light layout into a wireframe. surface-200 is therefore held to 1.3:1,
  // enough to read as a seam.
  ['c-surface-300', 'c-surface', 3, 'Input border on white'],
  ['c-surface-200', 'c-surface', 1.3, 'Decorative card seam on white'],
  ['c-primary-500', 'c-surface', 3, 'Focus ring on white'],
];

let failures = 0;
const rows = [];

for (const [fg, bg, need, label] of PAIRS) {
  const r = ratio(t(fg), t(bg));
  const ok = r >= need;
  if (!ok) failures++;
  rows.push({ ok, r, need, label, fg: `${fg} ${t(fg)}`, bg: `${bg} ${t(bg)}` });
}

const width = Math.max(...rows.map((r) => r.label.length));
for (const row of rows) {
  console.log(
    `${row.ok ? 'ok  ' : 'FAIL'}  ${row.r.toFixed(2).padStart(5)}:1  (need ${row.need})  ` +
      `${row.label.padEnd(width)}   ${row.fg} on ${row.bg}`,
  );
}

console.log(
  `\n${failures === 0 ? 'All token pairs meet WCAG AA.' : `${failures} pair(s) below the AA threshold.`}`,
);
process.exit(failures === 0 ? 0 : 1);
