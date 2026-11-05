// Generate the Open Graph / Twitter share image (1200x630 PNG).
// Runs automatically before `astro build` (see package.json prebuild).
// Built from a real frame of the hero film (public/media/film/hero-poster.webp)
// with the name and tagline set over a soft dark gradient, and the frog mark
// (public/brand/mark-192.webp, made by scripts/gen-icons.mjs) beside the name.
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public');
const W = 1200;
const H = 630;

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0b0d0c" stop-opacity="0.86"/>
      <stop offset="0.55" stop-color="#0b0d0c" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0b0d0c" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.5" stop-color="#0b0d0c" stop-opacity="0"/>
      <stop offset="1" stop-color="#0b0d0c" stop-opacity="0.75"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#l)"/>
  <rect width="${W}" height="${H}" fill="url(#b)"/>
  <text x="76" y="330" font-family="Georgia, 'DejaVu Serif', serif" font-size="84" font-weight="400" fill="#f2ede3" letter-spacing="-1.5">Protecting the world’s</text>
  <text x="76" y="420" font-family="Georgia, 'DejaVu Serif', serif" font-size="84" font-style="italic" fill="#f2ede3" letter-spacing="-1.5">wild places, for good.</text>
  <text x="150" y="549" font-family="Georgia, 'DejaVu Serif', serif" font-size="30" fill="#f2ede3">Liminal Forests Alliance</text>
</svg>`;

await mkdir(outDir, { recursive: true });
const mark = await sharp(resolve(outDir, 'brand/mark-192.webp')).resize({ width: 54 }).png().toBuffer();
await sharp(resolve(outDir, 'media/film/hero-poster.webp'))
  .resize(W, H, { fit: 'cover', position: 'right' })
  .modulate({ brightness: 0.92 })
  .composite([{ input: Buffer.from(overlay) }, { input: mark, left: 80, top: 510 }])
  .png({ compressionLevel: 9 })
  .toFile(resolve(outDir, 'og.png'));
await writeFile(resolve(outDir, 'og.svg'), overlay);
console.log('Generated public/og.png');
