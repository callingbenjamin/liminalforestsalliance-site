// Build the logo files and favicons from the frog emblem.
//
// Source: assets/frog-emblem.png (the frog-and-leaf emblem on its dark green
// square). Run with `npm run gen:icons`. Outputs, all committed:
//
//   public/brand/mark-{96,192,320}.webp  the frog alone, see-through background,
//                                         for the header and footer
//   public/brand/mark-512.png             the same, as a PNG for press/partners
//   public/favicon.ico                    16/32/48 px, rounded dark square
//   public/apple-touch-icon.png           180 px, full square (iOS rounds it)
//   public/icon-192.png, icon-512.png     for the web app manifest + schema logo
//   public/site.webmanifest
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'assets/frog-emblem.png');
const PUB = resolve(root, 'public');
const BRAND = resolve(PUB, 'brand');

// ---------- read the source and find the emblem's background ----------
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const px = (x, y) => {
  const i = (y * W + x) * 3;
  return [data[i], data[i + 1], data[i + 2]];
};
const border = [];
for (let x = 0; x < W; x += 5) border.push(px(x, 1), px(x, H - 2));
for (let y = 0; y < H; y += 5) border.push(px(1, y), px(W - 2, y));
const BG = [0, 1, 2].map((k) => border.map((p) => p[k]).sort((a, b) => a - b)[border.length >> 1]);
const BG_HEX = '#' + BG.map((v) => v.toString(16).padStart(2, '0')).join('');

// ---------- cut the frog out of its square ----------
// Alpha comes from each pixel's distance to the background colour: near it is
// clear, far from it is solid, with a soft ramp for the anti-aliased edges.
// The background colour is then "un-mixed" out of those edge pixels so no dark
// fringe is left when the mark sits on a light surface.
const LO = 14;
const HI = 95;
const rgba = Buffer.alloc(W * H * 4);
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const d = Math.hypot(r - BG[0], g - BG[1], b - BG[2]);
    const a = Math.min(1, Math.max(0, (d - LO) / (HI - LO)));
    const o = i * 4;
    if (a > 0) {
      const un = (v, k) => Math.round(Math.min(255, Math.max(0, (v - BG[k] * (1 - a)) / a)));
      rgba[o] = un(r, 0);
      rgba[o + 1] = un(g, 1);
      rgba[o + 2] = un(b, 2);
      rgba[o + 3] = Math.round(a * 255);
      if (a > 0.5) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
}
// Dark shapes fully enclosed by the frog (the pupils) stay solid emblem green,
// so the eyes read correctly on light backgrounds too. Only the background
// that connects to the outer edge of the square becomes see-through.
const outside = new Uint8Array(W * H);
const stack = [];
const seed = (i) => {
  if (!outside[i] && rgba[i * 4 + 3] < 128) {
    outside[i] = 1;
    stack.push(i);
  }
};
for (let x = 0; x < W; x++) seed(x), seed((H - 1) * W + x);
for (let y = 0; y < H; y++) seed(y * W), seed(y * W + W - 1);
while (stack.length) {
  const i = stack.pop();
  const x = i % W;
  if (x > 0) seed(i - 1);
  if (x < W - 1) seed(i + 1);
  if (i >= W) seed(i - W);
  if (i < W * (H - 1)) seed(i + W);
}
// Pixels within 2 px of the outside keep their soft edge; everything else
// inside the silhouette is made fully solid with its original colour.
const near = new Uint8Array(outside);
for (let pass = 0; pass < 2; pass++) {
  const prev = new Uint8Array(near);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      if (!prev[i] && (prev[i - 1] || prev[i + 1] || prev[i - W] || prev[i + W])) near[i] = 1;
    }
  }
}
for (let i = 0; i < W * H; i++) {
  if (near[i] || rgba[i * 4 + 3] === 255) continue;
  rgba[i * 4] = data[i * 3];
  rgba[i * 4 + 1] = data[i * 3 + 1];
  rgba[i * 4 + 2] = data[i * 3 + 2];
  rgba[i * 4 + 3] = 255;
}

const PAD = 6;
const box = {
  left: Math.max(0, x0 - PAD),
  top: Math.max(0, y0 - PAD),
  width: Math.min(W, x1 + PAD + 1) - Math.max(0, x0 - PAD),
  height: Math.min(H, y1 + PAD + 1) - Math.max(0, y0 - PAD),
};
const markFull = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract(box).png().toBuffer();

await mkdir(BRAND, { recursive: true });
for (const w of [96, 192, 320]) {
  await sharp(markFull).resize({ width: w }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(resolve(BRAND, `mark-${w}.webp`));
}
await sharp(markFull).resize({ width: 512 }).png({ compressionLevel: 9 }).toFile(resolve(BRAND, 'mark-512.png'));

// ---------- square icons on the emblem's own dark green ----------
// `fill` is how much of the square the frog takes up. Small icons crop tighter
// so the frog stays readable at 16 px.
const cx = (x0 + x1) / 2;
const cy = (y0 + y1) / 2;
const span = Math.max(x1 - x0, y1 - y0);
const EXT = 400;
const padded = await sharp(SRC)
  .removeAlpha()
  .extend({ top: EXT, bottom: EXT, left: EXT, right: EXT, background: { r: BG[0], g: BG[1], b: BG[2] } })
  .png()
  .toBuffer();

async function square(size, fill, { radius = 0 } = {}) {
  const side = Math.round(span / fill);
  const left = Math.round(cx - side / 2) + EXT;
  const top = Math.round(cy - side / 2) + EXT;
  let img = sharp(padded).extract({ left, top, width: side, height: side }).resize(size, size, { kernel: 'lanczos3' });
  if (radius > 0) {
    const r = Math.round(size * radius);
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`);
    img = sharp(await img.ensureAlpha().png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]);
  }
  // Flat artwork: a 128-colour palette keeps the opaque icons small without visible loss.
  return radius > 0
    ? img.png({ compressionLevel: 9 }).toBuffer()
    : img.png({ palette: true, colours: 128, compressionLevel: 9, effort: 10 }).toBuffer();
}

// favicon.ico: PNG-in-ICO, three sizes.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => square(s, s <= 16 ? 0.94 : 0.88, { radius: 0.22 })));
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
icoSizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(icoPngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += icoPngs[i].length;
});
await writeFile(resolve(PUB, 'favicon.ico'), Buffer.concat([header, ...icoPngs]));

await writeFile(resolve(PUB, 'apple-touch-icon.png'), await square(180, 0.74));
await writeFile(resolve(PUB, 'icon-192.png'), await square(192, 0.68));
await writeFile(resolve(PUB, 'icon-512.png'), await square(512, 0.68));

const manifest = {
  name: 'Liminal Forests Alliance',
  short_name: 'Liminal Forests',
  start_url: '/',
  display: 'browser',
  background_color: '#0b0d0c',
  theme_color: '#0b0d0c',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};
await writeFile(resolve(PUB, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

console.log(`Emblem background ${BG_HEX}; frog box ${x1 - x0 + 1}x${y1 - y0 + 1}; mark aspect ${(box.width / box.height).toFixed(4)}`);
console.log('Wrote public/brand/mark-*.webp, mark-512.png, favicon.ico, apple-touch-icon.png, icon-192/512.png, site.webmanifest');
