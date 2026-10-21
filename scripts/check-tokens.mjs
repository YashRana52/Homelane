/**
 * Guards against a silent class of bug: a custom theme token that
 * tailwind-merge has not been told about.
 *
 *   node scripts/check-tokens.mjs
 *
 * tailwind-merge only knows Tailwind's own scale names. Add `--text-display`
 * to theme.css without listing it in cn.ts and `cn('text-display',
 * 'text-white')` drops the size, because tailwind-merge reads `text-display`
 * as a colour. Nothing errors; the heading just renders at body size.
 *
 * This compares the tokens declared in theme.css against the lists in cn.ts
 * and fails on any drift, in either direction.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = await readFile(path.join(root, 'src/styles/theme.css'), 'utf8');
const cn = await readFile(path.join(root, 'src/lib/cn.ts'), 'utf8');

/** Namespaces in theme.css, and the class group each maps to in cn.ts. */
const NAMESPACES = [
  { prefix: 'text', group: 'font-size' },
  { prefix: 'shadow', group: 'shadow' },
  { prefix: 'radius', group: 'rounded' },
  { prefix: 'container', group: 'max-w' },
];

/** Values Tailwind already ships, which cn.ts does not need to re-declare. */
const BUILT_IN = {
  'font-size': new Set(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']),
  shadow: new Set(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'none', 'inner']),
  rounded: new Set(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full']),
  'max-w': new Set(['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'prose', 'none', 'full']),
};

let failures = 0;

for (const { prefix, group } of NAMESPACES) {
  // Declared in theme.css, ignoring modifiers like --text-display--line-height.
  const declared = new Set(
    [...theme.matchAll(new RegExp(`^\\s*--${prefix}-([a-z0-9-]+)\\s*:`, 'gm'))]
      .map((m) => m[1])
      .filter((name) => !name.includes('--'))
      .filter((name) => !BUILT_IN[group].has(name)),
  );

  // Listed in cn.ts for this group.
  const block = cn.match(new RegExp(`'?${group}'?:\\s*\\[([\\s\\S]*?)\\],\\n`, 'm'));
  // The negative lookahead skips a quoted object key such as `'max-w':`,
  // which is the group name rather than one of its values.
  const listed = new Set(
    block ? [...block[1].matchAll(/'([a-z0-9-]+)'(?!\s*:)/g)].map((m) => m[1]) : [],
  );

  const missing = [...declared].filter((name) => !listed.has(name));
  const extra = [...listed].filter((name) => !declared.has(name));

  const ok = missing.length === 0 && extra.length === 0;
  if (!ok) failures++;

  console.log(`${ok ? 'ok  ' : 'FAIL'}  --${prefix}-*  →  cn.ts "${group}"  (${declared.size} tokens)`);
  if (missing.length) console.log(`        missing from cn.ts: ${missing.join(', ')}`);
  if (extra.length) console.log(`        in cn.ts but not theme.css: ${extra.join(', ')}`);
}

console.log(
  `\n${failures === 0 ? 'Theme tokens and tailwind-merge config agree.' : `${failures} namespace(s) out of sync — fix src/lib/cn.ts.`}`,
);

/* -----------------------------------------------------------------------------
   Colour utilities that point at a token which does not exist.

   Tailwind simply emits nothing for `text-surface-500` when there is no
   `--color-surface-500`. No error, no warning — the element quietly inherits
   its colour instead, and the styling you wrote never applies. This caught 14
   files' worth of exactly that.
   -------------------------------------------------------------------------- */

const tokensCss = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');
const defined = new Set(
  [...tokensCss.matchAll(/--c-([a-z]+-(?:\d+|[a-z]+)):/g)].map((m) => m[1]),
);
// Single-word tokens such as --c-mustard, --c-error.
for (const m of tokensCss.matchAll(/--c-([a-z]+):/g)) defined.add(m[1]);

const FAMILIES = ['surface', 'secondary', 'primary', 'gold'];
const useRe = new RegExp(
  `\\b(?:text|bg|border|ring|fill|stroke|from|to|via|divide|outline|decoration|shadow)-(${FAMILIES.join('|')})-(\\d+)\\b`,
  'g',
);

const srcDir = path.join(root, 'src');
const files = [];
async function walk(dir) {
  const { readdir } = await import('node:fs/promises');
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) files.push(full);
  }
}
await walk(srcDir);

const missing = new Map();
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const [, family, step] of text.matchAll(useRe)) {
    const token = `${family}-${step}`;
    if (defined.has(token)) continue;
    const rel = path.relative(root, file).replace(/\\/g, '/');
    missing.set(token, [...new Set([...(missing.get(token) ?? []), rel])]);
  }
}

if (missing.size) {
  console.log('\nColour utilities referencing a token that does not exist:');
  for (const [token, where] of missing) {
    console.log(`  --c-${token}  used in ${where.length} file(s): ${where.slice(0, 3).join(', ')}`);
  }
} else {
  console.log('Every colour utility resolves to a defined token.');
}

process.exit(failures === 0 && missing.size === 0 ? 0 : 1);
