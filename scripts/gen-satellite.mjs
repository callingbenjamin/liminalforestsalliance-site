// Fetch real satellite imagery for every listing (and a few page scenes).
//
// Source: Copernicus Sentinel-2 Level-2A, rendered through Microsoft's
// Planetary Computer data API. Copernicus Sentinel data is free and open,
// including commercial use, with attribution: "Contains modified Copernicus
// Sentinel data [year]". For each place we search the least-cloudy scenes,
// score small previews for local cloud / missing data, keep the best, then
// crop a full-size frame and colour-grade it lightly.
//
// Output (committed, so builds need no network):
//   public/media/sat/<slug>-1600.webp, <slug>-800.webp
//   src/data/satellite.json   { [slug]: { item, date, cloud, bbox, km } }
//
// Usage: node scripts/gen-satellite.mjs [--force] [--only <slug>]
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';
import { placeFor, slugFor } from '../src/data/places.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/media/sat');
const metaPath = resolve(root, 'src/data/satellite.json');
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const STAC = 'https://planetarycomputer.microsoft.com/api/stac/v1/search';
const DATA = 'https://planetarycomputer.microsoft.com/api/data/v1/item/bbox';

const listings = JSON.parse(await readFile(resolve(root, 'src/data/listings.json'), 'utf8'));

// Extra scenes used by the page itself (not listings).
const SCENES = [
  // Forest meets farmland: upper Xingu basin, Mato Grosso, Brazil.
  // Pale farm fields look like cloud to the gap test, so only truly empty pixels are
  // filled here, preferring the neighbouring tile from the same satellite pass.
  { slug: 'scene-edge', lat: -10.84, lng: -52.795, km: 44, emptyOnly: true, big: true },
  // Base for the "how it works" illustration: Sarapiquí, Costa Rica.
  { slug: 'scene-survey', lat: 10.3, lng: -84.07, km: 16 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchRetry(url, opts = {}, tries = 4) {
  for (let a = 0; a < tries; a++) {
    try {
      const res = await fetch(url, opts);
      if (res.ok && res.status !== 204) return res;
      if (res.status === 404 || res.status === 204) return null;
    } catch {
      /* network blip: retry */
    }
    await sleep(900 * (a + 1));
  }
  return null;
}

function bboxFor(lat, lng, km, aspect = 1600 / 1000) {
  const w = km;
  const h = km / aspect;
  const dx = w / 2 / (111.32 * Math.cos((lat * Math.PI) / 180));
  const dy = h / 2 / 110.57;
  return [lng - dx, lat - dy, lng + dx, lat + dy].map((v) => +v.toFixed(5));
}

/** Width of the frame in km: about four times the side of the property, within limits. */
function frameKm(ha) {
  const side = Math.sqrt(ha) / 10; // km
  return Math.min(40, Math.max(28, side * 4));
}

async function candidates({ lat, lng, months }, bbox) {
  const [x0, y0, x1, y1] = bbox;
  const body = {
    collections: ['sentinel-2-l2a'],
    intersects: { type: 'Polygon', coordinates: [[[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]] },
    datetime: '2021-01-01T00:00:00Z/2025-10-31T00:00:00Z',
    query: { 'eo:cloud_cover': { lt: 25 } },
    sortby: [{ field: 'properties.eo:cloud_cover', direction: 'asc' }],
    limit: 60,
  };
  const res = await fetchRetry(STAC, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!res) return [];
  const j = await res.json();
  let feats = j.features || [];
  if (months) {
    const inSeason = feats.filter((f) => months.includes(new Date(f.properties.datetime).getUTCMonth() + 1));
    if (inSeason.length) feats = inSeason;
  }
  return feats.slice(0, 40).map((f) => ({ id: f.id, cloud: f.properties['eo:cloud_cover'], date: f.properties.datetime.slice(0, 10) }));
}

const renderUrl = (bbox, w, h, item) =>
  `${DATA}/${bbox.join(',')}/${w}x${h}.jpg?collection=sentinel-2-l2a&item=${item}&assets=visual&asset_bidx=visual%7C1%2C2%2C3&nodata=0`;

/** Lower is better: share of cloud-white or empty (no-data) pixels in a preview. */
async function score(bbox, item, c = {}) {
  const res = await fetchRetry(renderUrl(bbox, 240, 150, item));
  if (!res) return Infinity;
  let nodata = 0;
  const { data, info } = await sharp(Buffer.from(await res.arrayBuffer())).raw().toBuffer({ resolveWithObject: true });
  let bad = 0;
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max < 6) { bad += 6; nodata++; } // no data (scene edge): never acceptable
    else if (max > 175 && max - min < 40) bad += 1; // bright and grey: cloud
    else if (max > 135 && max - min < 22) bad += 0.5; // haze
  }
  c.nodata = nodata / n;
  return bad / n;
}

async function grade(buf) {
  return sharp(buf)
    .normalise({ lower: 0.6, upper: 99.6 })
    .modulate({ saturation: 0.74, brightness: 0.98 })
    .linear(1.22, -16)
    .recomb([
      [1.03, 0.03, 0],
      [0, 1.0, 0.02],
      [0, 0.05, 0.93],
    ])
    .toBuffer();
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function makeOne(job, meta) {
  const file1600 = resolve(outDir, `${job.slug}-1600.webp`);
  if (!FORCE && meta[job.slug] && (await exists(file1600))) return 'cached';
  const bbox = bboxFor(job.lat, job.lng, job.km);
  const cands = await candidates(job, bbox);
  if (!cands.length) return 'no scenes';
  for (const c of cands.slice(0, 14)) {
    c.score = await score(bbox, c.id, c);
    if (c.score < 0.003) break; // clean enough
  }
  const scored = cands
    .filter((c) => Number.isFinite(c.score))
    .sort(job.emptyOnly ? (a, b) => a.cloud - b.cloud || a.nodata - b.nodata : (a, b) => a.score - b.score);
  // Unscored scenes (often from neighbouring passes) are kept as gap fillers.
  let ranked = [...scored, ...cands.filter((c) => c.score === undefined)];
  if (job.emptyOnly && ranked.length) {
    const d = ranked[0].date;
    ranked = [ranked[0], ...ranked.slice(1).filter((c) => c.date === d), ...ranked.slice(1).filter((c) => c.date !== d)];
  }
  const best = ranked[0];
  if (!best) return 'no usable scenes';

  // Render the best scene, then fill gaps (edge-of-pass or cloud-white pixels) from the next best.
  // Cloud test: bright and nearly grey. Neighbouring pixels are not checked, so thin cloud edges may remain.
  const isGap = (d, i) => {
    const mx = Math.max(d[i], d[i + 1], d[i + 2]);
    const mn = Math.min(d[i], d[i + 1], d[i + 2]);
    return mx < (job.emptyOnly ? 16 : 6) || (!job.emptyOnly && mx > 170 && mx - mn < 38);
  };
  const W = job.big ? 3200 : 1600, H = job.big ? 2000 : 1000;
  let base = null;
  let empty = 0;
  const used = [];
  for (const c of ranked.slice(0, 16)) {
    const res = await fetchRetry(renderUrl(bbox, W, H, c.id));
    if (!res) continue;
    const { data } = await sharp(Buffer.from(await res.arrayBuffer())).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    if (!base) {
      base = data;
    } else {
      // Match the filler pass to the base pass where both have good pixels,
      // so patches from another pass don't show as seams.
      const sb = [0, 0, 0];
      const sd = [0, 0, 0];
      let n = 0;
      for (let i = 0; i < base.length; i += 12) {
        if (isGap(base, i) || isGap(data, i)) continue;
        for (let k = 0; k < 3; k++) {
          sb[k] += base[i + k];
          sd[k] += data[i + k];
        }
        n++;
      }
      const gain = n > 500 ? sb.map((v, k) => Math.min(1.6, Math.max(0.6, v / Math.max(1, sd[k])))) : [1, 1, 1];
      for (let i = 0; i < base.length; i += 3) {
        if (isGap(base, i) && !isGap(data, i)) {
          for (let k = 0; k < 3; k++) base[i + k] = Math.min(255, Math.round(data[i + k] * gain[k]));
        }
      }
    }
    used.push(c);
    empty = 0;
    for (let i = 0; i < base.length; i += 3) if (isGap(base, i)) empty++;
    if (empty / (W * H) < 0.0015) break;
  }
  if (!base) return 'render failed';

  // Trim empty strips at the edges (end of satellite coverage), keep the 16:10 shape.
  const isEmpty = (x, y) => {
    const i = (y * W + x) * 3;
    return Math.max(base[i], base[i + 1], base[i + 2]) < 6;
  };
  const colEmpty = (x) => { let e = 0; for (let y = 0; y < H; y += 4) e += isEmpty(x, y); return e / (H / 4) > 0.2; };
  const rowEmpty = (y) => { let e = 0; for (let x = 0; x < W; x += 4) e += isEmpty(x, y); return e / (W / 4) > 0.2; };
  let l = 0, r = W - 1, t = 0, b = H - 1;
  while (l < W / 3 && colEmpty(l)) l++;
  while (r > (2 * W) / 3 && colEmpty(r)) r--;
  while (t < H / 3 && rowEmpty(t)) t++;
  while (b > (2 * H) / 3 && rowEmpty(b)) b--;
  let cw = r - l + 1, ch = b - t + 1;
  if (cw / ch > W / H) cw = Math.round(ch * (W / H));
  else ch = Math.round(cw / (W / H));
  const cx = Math.round((l + r) / 2), cy = Math.round((t + b) / 2);
  const left = Math.max(l, Math.min(cx - Math.round(cw / 2), r + 1 - cw));
  const top = Math.max(t, Math.min(cy - Math.round(ch / 2), b + 1 - ch));
  const framed = await sharp(base, { raw: { width: W, height: H, channels: 3 } })
    .extract({ left, top, width: cw, height: ch })
    .resize(W, H)
    .png()
    .toBuffer();
  const graded = await grade(framed);
  if (job.big) await sharp(graded).webp({ quality: 70 }).toFile(resolve(outDir, `${job.slug}-3200.webp`));
  await sharp(graded).resize(1600).webp({ quality: 72 }).toFile(file1600);
  await sharp(graded).resize(800).webp({ quality: 70 }).toFile(resolve(outDir, `${job.slug}-800.webp`));
  const dates = used.map((c) => c.date).sort();
  meta[job.slug] = {
    items: used.map((c) => c.id),
    date: dates[dates.length - 1],
    years: [...new Set(dates.map((d) => d.slice(0, 4)))],
    score: +best.score.toFixed(4),
    empty: +(empty / (W * H)).toFixed(4),
    bbox,
    km: +job.km.toFixed(1),
  };
  return `ok ${used.length} scene(s), empty ${(empty / (W * H)).toFixed(4)}, score ${best.score.toFixed(3)}`;
}

await mkdir(outDir, { recursive: true });
const meta = (await exists(metaPath)) ? JSON.parse(await readFile(metaPath, 'utf8')) : {};
const jobs = [
  ...[...listings.for_sale, ...listings.new_candidates].map((p) => {
    const g = placeFor(p);
    // Bright landscapes (snow, desert, savanna, farmland) read as cloud to the gap test,
    // so only tropical forest scenes use cloud filling.
    const tropical = ['rainforest', 'cloudforest', 'river', 'coast'].includes(g.biome);
    return { slug: slugFor(p), lat: g.lat, lng: g.lng, km: g.km ?? frameKm(p.size_ha), emptyOnly: !tropical || !!g.months, months: g.months };
  }),
  ...SCENES,
].filter((j) => !ONLY || j.slug === ONLY);

// A few at a time, to be polite to the API.
const queue = [...jobs];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const job = queue.shift();
      const r = await makeOne(job, meta).catch((e) => `error ${e.message}`);
      console.log(`${job.slug.padEnd(48)} ${r}`);
    }
  }),
);
await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
console.log(`satellite.json: ${Object.keys(meta).length} entries`);
