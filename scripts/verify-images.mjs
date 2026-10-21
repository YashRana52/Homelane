/**
 * Checks every photo id in src/config/images.ts against the Unsplash CDN.
 *
 *   node scripts/verify-images.mjs
 *
 * Exits non-zero if any id 404s, so a broken photo is caught before it ships
 * as a grey box on the homepage.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(root, 'src/config/images.ts'), 'utf8');

// Pull the PHOTOS block out, then read `key: 'id',` pairs from it.
const block = source.match(/export const PHOTOS = \{([\s\S]*?)\n\} as const;/);
if (!block) {
  console.error('Could not find the PHOTOS block in src/config/images.ts');
  process.exit(1);
}

const entries = [...block[1].matchAll(/^\s*(\w+):\s*'([^']+)'/gm)].map(([, key, id]) => ({
  key,
  id,
}));

if (entries.length === 0) {
  console.error('PHOTOS block parsed but contained no entries');
  process.exit(1);
}

const CONCURRENCY = 8;
const results = [];

async function check({ key, id }) {
  const url = `https://images.unsplash.com/photo-${id}?w=80&q=40`;
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return { key, id, ok: res.ok, status: res.status };
  } catch (err) {
    return { key, id, ok: false, status: err.code ?? 'NETWORK' };
  }
}

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  const batch = entries.slice(i, i + CONCURRENCY);
  results.push(...(await Promise.all(batch.map(check))));
  process.stdout.write(`\rchecked ${Math.min(i + CONCURRENCY, entries.length)}/${entries.length}`);
}
process.stdout.write('\n\n');

// Duplicate ids are allowed (one photo reused), but worth surfacing.
const byId = new Map();
for (const { key, id } of entries) {
  byId.set(id, [...(byId.get(id) ?? []), key]);
}
const dupes = [...byId.entries()].filter(([, keys]) => keys.length > 1);

const failed = results.filter((r) => !r.ok);

for (const r of results) {
  console.log(`${r.ok ? 'ok  ' : 'FAIL'}  ${r.key.padEnd(22)} ${r.id}  ${r.status}`);
}

if (dupes.length) {
  console.log('\nReused photos (fine, but may look repetitive):');
  for (const [id, keys] of dupes) console.log(`  ${id} → ${keys.join(', ')}`);
}

console.log(`\n${results.length - failed.length}/${results.length} ids resolved.`);

/* -----------------------------------------------------------------------------
   index.html preloads the hero by URL, because in an SPA the hero's address is
   not known until React has rendered. That hardcoded id has to track
   PHOTOS.heroHome — if it drifts, the browser eagerly downloads a large image
   that is never displayed, and the one that is displayed loses its head start.
   -------------------------------------------------------------------------- */

const html = await readFile(path.join(root, 'index.html'), 'utf8');
const preloadIds = [...html.matchAll(/rel="preload"[\s\S]*?photo-([0-9a-z-]+)\?/g)].map(
  (m) => m[1],
);
const heroId = entries.find((e) => e.key === 'heroHome')?.id;

let preloadDrift = false;
if (preloadIds.length === 0) {
  console.log('\nNo hero preload found in index.html (optional, but it is the main LCP lever).');
} else {
  const wrong = [...new Set(preloadIds)].filter((id) => id !== heroId);
  preloadDrift = wrong.length > 0;
  console.log(
    preloadDrift
      ? `\nFAIL  index.html preloads ${wrong.join(', ')} but PHOTOS.heroHome is ${heroId}`
      : `\nok    index.html hero preload matches PHOTOS.heroHome (${heroId})`,
  );
}

if (failed.length) {
  console.log('\nReplace these keys in src/config/images.ts:');
  for (const r of failed) console.log(`  ${r.key} (${r.id})`);
}

process.exit(failed.length === 0 && !preloadDrift ? 0 : 1);
