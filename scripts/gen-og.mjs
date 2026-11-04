// Generate the Open Graph / Twitter share image (1200x630 PNG) from an SVG.
// Runs automatically before `astro build` (see package.json prebuild).
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d2b22"/>
      <stop offset="0.55" stop-color="#143d2f"/>
      <stop offset="1" stop-color="#0a2019"/>
    </linearGradient>
    <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c5240"/>
      <stop offset="1" stop-color="#0f3527"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <!-- soft mist bands -->
  <rect y="360" width="1200" height="270" fill="#ffffff" opacity="0.03"/>
  <rect y="430" width="1200" height="200" fill="#ffffff" opacity="0.03"/>
  <!-- layered forest ridges -->
  <path d="M0 470 L120 430 L240 460 L380 420 L520 455 L660 415 L820 450 L980 420 L1120 455 L1200 435 L1200 630 L0 630 Z" fill="url(#ridge)" opacity="0.65"/>
  <path d="M0 520 L140 485 L300 515 L460 480 L620 512 L780 478 L940 512 L1100 482 L1200 510 L1200 630 L0 630 Z" fill="#0c2c21" opacity="0.9"/>
  <!-- leaf mark -->
  <g transform="translate(96,150)">
    <circle cx="36" cy="36" r="54" fill="none" stroke="#9ec9a6" stroke-width="3" opacity="0.6"/>
    <path d="M36 8 C14 26 14 54 36 70 C58 54 58 26 36 8 Z" fill="#cfe6cd"/>
    <path d="M36 14 L36 64" stroke="#2a5a46" stroke-width="2.4"/>
    <path d="M36 30 L26 24 M36 40 L48 32 M36 50 L26 44" stroke="#2a5a46" stroke-width="2"/>
  </g>
  <text x="96" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="600" fill="#f4f1e8">Liminal Forests Alliance</text>
  <text x="98" y="360" font-family="Georgia, serif" font-size="34" fill="#b9d6bd" font-style="italic">Protecting the world's wild places, for good.</text>
  <text x="98" y="586" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#8fb79a" letter-spacing="3">PART OF LIMINAL COMMONS · ANTHRŌPICO</text>
</svg>`;

await mkdir(outDir, { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(resolve(outDir, 'og.png'));
await writeFile(resolve(outDir, 'og.svg'), svg);
console.log('✓ Generated public/og.png');
