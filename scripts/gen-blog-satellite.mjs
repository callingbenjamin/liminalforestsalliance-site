// Satellite before/after pairs for blog feature posts.
//
// Source: Landsat Collection 2 Level-2 surface reflectance (USGS; public
// domain), read through Microsoft Planetary Computer's data API. "Before" is
// Landsat 5 TM, "after" is Landsat 8/9 OLI, both 30 m. Each pair uses the same
// ground box, the same output size and the same colour stretch, and scenes
// from nearly the same day of the year, so the comparison is fair. Scenes were
// picked by eye for clear sky over the site.
//
// The dashed outline is drawn from an OpenStreetMap way (data © OpenStreetMap
// contributors, ODbL), fetched through Nominatim. It is approximate: neither
// site has a published official boundary. Credit both on the page.
//
// Output (committed, so builds need no network):
//   public/media/blog/<dir>/<name>-<year>.webp   (900 x 900)
//
// Usage: node scripts/gen-blog-satellite.mjs [--only <name>]
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const UA = 'LiminalForestsSiteBuilder/1.0 (https://liminalforestsalliance.com)';
const SIZE = 900;

const PAIRS = [
  {
    // Fazenda Bulcão / RPPN, Instituto Terra, Aimorés, Minas Gerais. 8 x 8 km;
    // Aimorés town is top right. Planting began December 1999.
    dir: 'planters',
    name: 'sat-instituto-terra',
    center: [-41.089, -19.524],
    halfMetres: 4000,
    osmWay: 512401621,
    stretch: { lo: [0.005, 0.015, 0.005], hi: [0.15, 0.13, 0.1], gamma: 1.5, sat: 1.1 },
    scenes: [
      { year: 1997, item: 'LT05_L2SP_216074_19970527_02_T1' }, // Landsat 5, 27 May 1997
      { year: 2024, item: 'LC09_L2SP_216073_20240513_02_T1' }, // Landsat 9, 13 May 2024
    ],
  },
  {
    // Bangr-Raaga, Yacouba Sawadogo's forest, Gourga, Ouahigouya. 4 x 4 km.
    // The dark rectangle to the south-west in 2024 is a separate site.
    dir: 'planters',
    name: 'sat-sawadogo',
    center: [-2.3836, 13.5416],
    halfMetres: 2000,
    osmWay: 967547391,
    stretch: { lo: [0.02, 0.02, 0.01], hi: [0.35, 0.3, 0.25], gamma: 1.4, sat: 1.1 },
    scenes: [
      { year: 1986, item: 'LT05_L2SP_196051_19861109_02_T1' }, // Landsat 5, 9 Nov 1986
      { year: 2024, item: 'LC09_L2SP_196051_20241109_02_T1' }, // Landsat 9, 9 Nov 2024
    ],
  },
];

// Single satellite stills (no comparison), used like a photo where no
// freely licensed photograph exists. Copernicus Sentinel-2 L2A true colour
// ("visual" asset, 10 m); credit "Contains modified Copernicus Sentinel data
// <year>". Saved as <name>-800.webp and <name>-1200.webp like the photos.
const STILLS = [
  {
    // The Langol hill range on the northern edge of Imphal, Manipur, with the
    // Lamphelpat wetland below it. Punshilok lies on these hills, but its
    // boundary is not mapped, so nothing is outlined.
    dir: 'planters',
    name: 'langol-hills',
    center: [93.885, 24.852],
    widthKm: 11,
    aspect: 4 / 3,
    item: 'S2C_MSIL2A_20251213T042201_R090_T46REN_20251213T073610', // 13 Dec 2025
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function bboxFor([lon, lat], half) {
  const mLat = 110574;
  const mLon = 111320 * Math.cos((lat * Math.PI) / 180);
  return [lon - half / mLon, lat - half / mLat, lon + half / mLon, lat + half / mLat].map((v) => +v.toFixed(6));
}

// Minimal .npy reader (the data API returns bands x rows x cols, uint16).
function parseNpy(buf) {
  const major = buf[6];
  const hl = major === 1 ? buf.readUInt16LE(8) : buf.readUInt32LE(8);
  const off = major === 1 ? 10 : 12;
  const hdr = buf.subarray(off, off + hl).toString('latin1');
  const descr = /'descr':\s*'([^']+)'/.exec(hdr)[1];
  if (descr !== '<u2') throw new Error(`unexpected dtype ${descr}`);
  const shape = /'shape':\s*\(([^)]*)\)/.exec(hdr)[1].split(',').map((s) => s.trim()).filter(Boolean).map(Number);
  const data = buf.subarray(off + hl);
  const arr = new Uint16Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
  return { shape, arr };
}

async function bands(item, bbox) {
  const qs = new URLSearchParams({ collection: 'landsat-c2-l2', item, reproject: 'bilinear', resampling: 'bilinear' });
  for (const a of ['red', 'green', 'blue']) qs.append('assets', a);
  const url = `https://planetarycomputer.microsoft.com/api/data/v1/item/bbox/${bbox.join(',')}/${SIZE}x${SIZE}.npy?${qs}`;
  for (let t = 0; t < 4; t++) {
    const res = await fetch(url);
    if (res.ok) {
      const { shape, arr } = parseNpy(Buffer.from(await res.arrayBuffer()));
      const [, h, w] = shape;
      return { w, h, b: [0, 1, 2].map((i) => arr.subarray(i * w * h, (i + 1) * w * h)) };
    }
    await sleep(3000 * (t + 1));
  }
  throw new Error(`could not fetch ${item}`);
}

// Surface reflectance = DN * 2.75e-5 - 0.2, then a fixed per-band stretch,
// a saturation factor and a gamma. Identical for both scenes of a pair.
function toRGB({ w, h, b }, st) {
  const out = Buffer.alloc(w * h * 3);
  const px = [0, 0, 0];
  for (let i = 0; i < w * h; i++) {
    for (let c = 0; c < 3; c++) {
      const v = b[c][i];
      const r = v === 0 ? 0 : v * 2.75e-5 - 0.2;
      px[c] = (r - st.lo[c]) / (st.hi[c] - st.lo[c]);
    }
    const m = (px[0] + px[1] + px[2]) / 3;
    for (let c = 0; c < 3; c++) {
      const x = Math.min(1, Math.max(0, m + st.sat * (px[c] - m)));
      out[i * 3 + c] = Math.round(Math.pow(x, 1 / st.gamma) * 255);
    }
  }
  return out;
}

async function outlineSvg(way, bbox) {
  const u = `https://nominatim.openstreetmap.org/lookup?osm_ids=W${way}&polygon_geojson=1&format=json`;
  const res = await fetch(u, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`nominatim ${res.status}`);
  const geo = (await res.json())[0].geojson;
  const polys = geo.type === 'Polygon' ? [geo.coordinates] : geo.coordinates;
  const pt = ([lon, lat]) =>
    [((lon - bbox[0]) / (bbox[2] - bbox[0])) * SIZE, ((bbox[3] - lat) / (bbox[3] - bbox[1])) * SIZE].map((v) => v.toFixed(1)).join(',');
  const d = polys.map((P) => P.map((ring) => `M${ring.map(pt).join('L')}Z`).join(' ')).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><path d="${d}" fill="none" stroke="#ffd84a" stroke-width="2.5" stroke-dasharray="9 5" stroke-linejoin="round"/></svg>`;
}

for (const s of STILLS) {
  if (ONLY && s.name !== ONLY) continue;
  const [lon, lat] = s.center;
  const hw = s.widthKm / 2 / (111.32 * Math.cos((lat * Math.PI) / 180));
  const hh = s.widthKm / s.aspect / 2 / 110.574;
  const bbox = [lon - hw, lat - hh, lon + hw, lat + hh].map((v) => +v.toFixed(5));
  const w = 1200;
  const h = Math.round(w / s.aspect);
  const url = `https://planetarycomputer.microsoft.com/api/data/v1/item/bbox/${bbox.join(',')}/${w}x${h}.png?collection=sentinel-2-l2a&item=${s.item}&assets=visual&asset_bidx=visual%7C1%2C2%2C3&nodata=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`could not fetch ${s.item} (${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  const outDir = resolve(root, 'public/media/blog', s.dir);
  await mkdir(outDir, { recursive: true });
  await sharp(buf).webp({ quality: 80 }).toFile(resolve(outDir, `${s.name}-1200.webp`));
  await sharp(buf).resize({ width: 800 }).webp({ quality: 76 }).toFile(resolve(outDir, `${s.name}-800.webp`));
  console.log(`saved ${s.name}  ${w}x${h}  (${s.item}, bbox ${bbox.join(',')})`);
}

for (const p of PAIRS) {
  if (ONLY && p.name !== ONLY) continue;
  const bbox = bboxFor(p.center, p.halfMetres);
  const outDir = resolve(root, 'public/media/blog', p.dir);
  await mkdir(outDir, { recursive: true });
  const svg = p.osmWay ? Buffer.from(await outlineSvg(p.osmWay, bbox)) : null;
  for (const s of p.scenes) {
    const img = await bands(s.item, bbox);
    const raw = toRGB(img, p.stretch);
    let pipe = sharp(raw, { raw: { width: img.w, height: img.h, channels: 3 } });
    if (svg) pipe = sharp(await pipe.png().toBuffer()).composite([{ input: svg }]);
    const file = resolve(outDir, `${p.name}-${s.year}.webp`);
    await pipe.webp({ quality: 82 }).toFile(file);
    console.log(`saved ${p.name}-${s.year}  (${s.item}, bbox ${bbox.join(',')})`);
  }
}
