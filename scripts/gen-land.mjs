// Generate the dot-matrix land mask used by the atlas globe.
//
// Samples the Earth on a roughly equal-area grid (rows every STEP degrees of
// latitude, columns spaced so dots stay evenly apart toward the poles) and
// records which samples fall on land. The result is a compact bitmask
// written to src/data/land.json and decoded in the browser.
//
// Run manually when changing resolution: node scripts/gen-land.mjs
// (The output is committed, so builds do not need these dev dependencies.)
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const topo = JSON.parse(await readFile(require.resolve('world-atlas/land-50m.json'), 'utf8'));
const land = feature(topo, topo.objects.land);

const STEP = 1.0; // degrees between rows (fine enough for the large /listings globe)
const rows = [];
let total = 0;

for (let lat = -84 + STEP / 2; lat < 84; lat += STEP) {
  const circ = Math.cos((lat * Math.PI) / 180);
  const count = Math.max(1, Math.round((360 / STEP) * circ));
  let bits = '';
  for (let i = 0; i < count; i++) {
    const lng = -180 + (i + 0.5) * (360 / count);
    const on = geoContains(land, [lng, lat]);
    bits += on ? '1' : '0';
    if (on) total++;
  }
  // Pack bits into hex nibbles (pad to a multiple of 4).
  const padded = bits.padEnd(Math.ceil(bits.length / 4) * 4, '0');
  let hex = '';
  for (let i = 0; i < padded.length; i += 4) hex += parseInt(padded.slice(i, i + 4), 2).toString(16);
  rows.push([Number(lat.toFixed(2)), count, hex]);
}

await writeFile(resolve(root, 'src/data/land.json'), JSON.stringify({ step: STEP, rows }));
console.log(`land.json: ${rows.length} rows, ${total} land dots`);
