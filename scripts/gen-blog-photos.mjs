// Fetch free-licensed photos from Wikimedia Commons for blog feature posts and
// save them as web-sized WebP files.
//
// Every photo used on the blog is credited next to the image (author, licence
// and a link to its Commons page); those credits live in src/data/blog.js.
// This script only fetches and resizes. The output is committed, so builds
// need no network.
//
// Output: public/media/blog/<dir>/<key>-800.webp and <key>-1200.webp
//         (the 1200 file is capped at the original width)
// Prints each file's final 1200 dimensions so they can be copied into blog.js.
//
// Usage: node scripts/gen-blog-photos.mjs [--force] [--only <key>]
import { mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const UA = 'LiminalForestsSiteBuilder/1.0 (https://liminalforestsalliance.com)';
const API = 'https://commons.wikimedia.org/w/api.php';

// { dir, key, file (Commons file title, without "File:"), crop?, aspect?, focusY?, max? }
// crop:   optional { left, top, width, height } as fractions of the original,
//         used to frame the subject (e.g. a photo mounted on an album page).
// aspect: optional width/height ratio to trim to after `crop` (photos shown
//         side by side are 4:5, so aspect 0.8); focusY 0..1 picks which part
//         of the height to keep (0 top, 0.5 centre).
// max:    optional largest output width (default 1200).
const PHOTOS = [
  // The people who planted forests (2026-11-09)
  { dir: 'planters', key: 'payeng-forest', file: 'Chef_Atul_Lahkar_in_conversation_with_Jadav_Payeng_at_Molai_forest,_Jorhat.jpg' },
  { dir: 'planters', key: 'instituto-terra-hill', file: 'Instituto_Terra_1,_Aymorés-MG.jpg' },
  { dir: 'planters', key: 'thimmakka-padma', file: 'Padma_Shri_Saalumarada_Thimakka.jpg' },
  { dir: 'planters', key: 'ramaiah-award', file: 'The_President,_Shri_Pranab_Mukherjee_presenting_the_Padma_Shri_Award_to_Shri_Daripalli_Ramaiah,_at_a_Civil_Investiture_Ceremony,_at_Rashtrapati_Bhavan,_in_New_Delhi_on_March_30,_2017.jpg' },
  { dir: 'planters', key: 'payeng-sandbar', file: 'JadavPayeng.jpg', aspect: 0.8, focusY: 0.5, max: 960 },
  { dir: 'planters', key: 'payeng', file: 'Forest_Man_of_India_-_Jadav_Payeng_DSC_5008.jpg', aspect: 0.8, focusY: 0.25, max: 960 },
  { dir: 'planters', key: 'vicente-trail', file: 'Área_de_Proteção_Ambiental_São_Francisco_Xavier_-_Marcia_Cristina_Machado_(53).jpg' },
  { dir: 'planters', key: 'sawadogo', file: 'Yacouba_Sawadogo.jpg' },
  { dir: 'planters', key: 'salgado', file: 'Sebastião_Salgado_(cropped).jpg', aspect: 0.8, focusY: 0.2, max: 960 },
  { dir: 'planters', key: 'instituto-terra', file: 'Instituto_Terra.jpg', aspect: 0.8, focusY: 0.5, max: 960 },
  { dir: 'planters', key: 'thimmakka', file: 'Saalumarada_Thimmakka,_2011_(cropped).jpg', aspect: 0.8, focusY: 0.2, max: 960 },
  { dir: 'planters', key: 'thimmakka-banyans', file: 'Saalumarada-thimmakka-plaque.jpg', aspect: 0.8, max: 960 },
  { dir: 'planters', key: 'pamela-malhotra', file: 'Ms._Pamela_Gale_Malhotra,_Karnataka.jpg' },
  { dir: 'planters', key: 'ye-river', file: 'Ye_River_at_Weizhou,_Jingxing,_Shijiazhuang_(20241104085141).jpg' },
  { dir: 'planters', key: 'ramaiah', file: 'Shri_Daripalli_Ramaiah,_at_Rashtrapati_Bhavan,_in_2017_(cropped).jpg' },
  { dir: 'planters', key: 'maathai', file: 'Wangari_Maathai_no_Brasil.jpg', aspect: 0.8, focusY: 0.15, max: 960 },
  { dir: 'planters', key: 'karura', file: 'Forest_trail_in_the_Karura_Forest,_Nairobi.jpg', aspect: 0.8, focusY: 0.2, max: 960 },
  { dir: 'planters', key: 'vergons', file: 'Vergons,_crête_de_Chamatte_et_prés.JPG', crop: { left: 0.4, top: 0, width: 0.6, height: 1 }, aspect: 0.8, max: 960 },
  {
    dir: 'planters',
    key: 'faucon-1899',
    file: 'Torrent_du_Bourget_(reboisement_en_pins_noirs_dans_le_canton_des_marquises)_-_Pécheral_-_btv1b10701400f.jpg',
    crop: { left: 0.56, top: 0.13, width: 0.36, height: 0.66 },
    aspect: 0.8,
    max: 960,
  },
];

const exists = (p) => access(p).then(() => true, () => false);

async function thumbUrl(file, width) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: 'query',
    titles: `File:${file}`,
    prop: 'imageinfo',
    iiprop: 'url|size',
    iiurlwidth: String(width),
    format: 'json',
    formatversion: '2',
  });
  const res = await fetch(u, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`Commons API ${res.status} for ${file}`);
  const page = (await res.json()).query.pages[0];
  if (!page.imageinfo) throw new Error(`No such file on Commons: ${file}`);
  const info = page.imageinfo[0];
  // Commons serves the original when the requested width is not smaller.
  return { url: info.thumburl ?? info.url, width: info.width, height: info.height };
}

for (const p of PHOTOS) {
  if (ONLY && p.key !== ONLY) continue;
  const outDir = resolve(root, 'public/media/blog', p.dir);
  await mkdir(outDir, { recursive: true });
  const out1200 = resolve(outDir, `${p.key}-1200.webp`);
  const out800 = resolve(outDir, `${p.key}-800.webp`);
  if (!FORCE && (await exists(out1200)) && (await exists(out800))) {
    const m = await sharp(out1200).metadata();
    console.log(`skip  ${p.key}  ${m.width}x${m.height}`);
    continue;
  }
  // Ask for a 2400px rendition so crops still have room; small originals come back as-is.
  const info = await thumbUrl(p.file, 2400);
  const res = await fetch(info.url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status} for ${p.file}`);
  let img = sharp(Buffer.from(await res.arrayBuffer())).rotate();
  if (p.crop) {
    const m = await img.metadata();
    img = img.extract({
      left: Math.round(p.crop.left * m.width),
      top: Math.round(p.crop.top * m.height),
      width: Math.round(p.crop.width * m.width),
      height: Math.round(p.crop.height * m.height),
    });
  }
  let buf = await img.toBuffer();
  if (p.aspect) {
    const m = await sharp(buf).metadata();
    let w = m.width;
    let h = Math.round(w / p.aspect);
    if (h > m.height) {
      h = m.height;
      w = Math.round(h * p.aspect);
    }
    const left = Math.round((m.width - w) / 2);
    const top = Math.round((m.height - h) * (p.focusY ?? 0.5));
    buf = await sharp(buf).extract({ left, top, width: w, height: h }).toBuffer();
  }
  const big = await sharp(buf)
    .resize({ width: p.max ?? 1200, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(out1200);
  await sharp(buf).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(out800);
  console.log(`saved ${p.key}  ${big.width}x${big.height}`);
}
