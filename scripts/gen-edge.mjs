// Build the overlays for the "edge" scene from its real satellite pixels:
//   public/media/sat/scene-edge-cleared.webp  alpha mask of cleared land (used to dim it)
//   public/media/sat/scene-edge-line.webp     a warm line along the forest edge
// Forest reads as dark green; cleared farmland is much brighter. A blurred
// luminance threshold separates the two, so the line follows the real boundary.
// Run after gen-satellite: node scripts/gen-edge.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'public/media/sat');
const W = 1600, H = 1000;

/** Blur a one-channel buffer and return one channel (sharp may hand back RGB). */
async function blur1(buf, sigma) {
  const { data, info } = await sharp(buf, { raw: { width: W, height: H, channels: 1 } }).blur(sigma).raw().toBuffer({ resolveWithObject: true });
  if (info.channels === 1) return data;
  const out = Buffer.alloc(W * H);
  for (let i = 0, j = 0; i < W * H; i++, j += info.channels) out[i] = data[j];
  return out;
}

const { data: rgb, info } = await sharp(resolve(dir, 'scene-edge-1600.webp')).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const lum = Buffer.alloc(W * H);
for (let i = 0, j = 0; i < W * H; i++, j += info.channels) lum[i] = Math.round(0.3 * rgb[j] + 0.59 * rgb[j + 1] + 0.11 * rgb[j + 2]);
const gray = await blur1(lum, 4);
if (gray.length !== W * H) throw new Error('expected one channel');

// Pick the threshold between the two brightness clusters (Otsu's method).
const hist = new Array(256).fill(0);
for (const v of gray) hist[v]++;
let sum = 0;
for (let i = 0; i < 256; i++) sum += i * hist[i];
let sumB = 0, wB = 0, best = 0, t = 80;
for (let i = 0; i < 256; i++) {
  wB += hist[i];
  if (!wB) continue;
  const wF = gray.length - wB;
  if (!wF) break;
  sumB += i * hist[i];
  const mB = sumB / wB, mF = (sum - sumB) / wF;
  const between = wB * wF * (mB - mF) ** 2;
  if (between > best) { best = between; t = i; }
}

const raw = Buffer.alloc(W * H);
for (let i = 0; i < gray.length; i++) raw[i] = gray[i] > t ? 255 : 0;
// Simplify: thin strips of riverside forest inside the fields are dropped, so the
// line follows the main forest boundary rather than every remnant.
// Morphological opening (erode, then dilate) removes forest strips narrower than ~40px.
const forestRaw = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) forestRaw[i] = raw[i] ? 0 : 255;
const e1 = await blur1(forestRaw, 16);
const eroded = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) eroded[i] = e1[i] > 225 ? 255 : 0;
const d1 = await blur1(eroded, 16);
const forest = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) forest[i] = d1[i] > 30 ? 1 : 0;

// Keep only the largest connected forest (the intact block); smaller remnants
// stay visible in the photo but are not outlined.
const label = new Int32Array(W * H);
let bestLabel = 0, bestSize = 0, next = 0;
const stack = new Int32Array(W * H);
for (let s = 0; s < W * H; s++) {
  if (!forest[s] || label[s]) continue;
  next++;
  let top = 0, size = 0;
  stack[top++] = s;
  label[s] = next;
  while (top) {
    const p = stack[--top];
    size++;
    const x = p % W, y = (p / W) | 0;
    if (x > 0 && forest[p - 1] && !label[p - 1]) { label[p - 1] = next; stack[top++] = p - 1; }
    if (x < W - 1 && forest[p + 1] && !label[p + 1]) { label[p + 1] = next; stack[top++] = p + 1; }
    if (y > 0 && forest[p - W] && !label[p - W]) { label[p - W] = next; stack[top++] = p - W; }
    if (y < H - 1 && forest[p + W] && !label[p + W]) { label[p + W] = next; stack[top++] = p + W; }
  }
  if (size > bestSize) { bestSize = size; bestLabel = next; }
}
const cleared = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) cleared[i] = label[i] === bestLabel ? 0 : 255;
const dimSource = raw;

// Soft mask for dimming.
const soft = await blur1(dimSource, 2);
const maskRGBA = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) { maskRGBA[i * 4 + 3] = soft[i]; }
await sharp(maskRGBA, { raw: { width: W, height: H, channels: 4 } }).resize(800, 500).webp({ quality: 60, alphaQuality: 70 }).toFile(resolve(dir, 'scene-edge-cleared.webp'));

// Edge band: where the blurred binary mask is neither fully forest nor fully cleared.
const band = await blur1(cleared, 1.6);
const glow = await blur1(cleared, 6);
const line = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const v = band[i];
  const core = v > 60 && v < 195 ? 1 - Math.abs(v - 127) / 68 : 0;
  const g = glow[i];
  const halo = g > 40 && g < 215 ? (1 - Math.abs(g - 127) / 88) * 0.16 : 0;
  const a = Math.min(1, Math.max(core, halo));
  line[i * 4] = 242; line[i * 4 + 1] = 200; line[i * 4 + 2] = 138; line[i * 4 + 3] = Math.round(a * 255);
}
await sharp(line, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 70, alphaQuality: 80 }).toFile(resolve(dir, 'scene-edge-line.webp'));
console.log(`edge overlays written (threshold ${t})`);
