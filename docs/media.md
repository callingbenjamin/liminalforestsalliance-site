# Media on the site

All imagery is real: aerial film, photography and satellite imagery. Nothing is illustrated or AI-generated.

## Film and photography

Listed with creator, source and licence in `src/data/media.js`. That list feeds the credits in the footer.

| Use | File | Creator | Licence |
| --- | --- | --- | --- |
| Hero film | `public/media/film/hero-1080.mp4`, `hero-720.mp4`, `hero-poster*.webp` | haruudu (Pixabay) | Pixabay Content License |
| Closing image | `public/media/photo/closing.webp` | Rebecca Prest (Unsplash) | Unsplash License |
| "Fund an acquisition" | `public/media/photo/way-fund.webp` | Bernd Dittrich (Unsplash) | Unsplash License |
| "Contribute land" | `public/media/photo/way-land.webp` | Adam Śmigielski (Unsplash) | Unsplash License |
| "Partner with us" | `public/media/photo/way-partner.webp` | David Baker (Unsplash) | Unsplash License |

Both licences allow free commercial use without asking. We credit the creators anyway.

## Satellite imagery

- **Source:** Copernicus Sentinel-2 Level-2A, rendered through Microsoft Planetary Computer.
- **Licence:** Copernicus data is free and open, including for commercial use. The required credit is "Contains modified Copernicus Sentinel data [year]", and it is shown in the footer.
- **Not used:** EOX "Sentinel-2 cloudless" tiles. Their current licence needs a paid commercial agreement.
- **Listing frames** (`public/media/sat/<slug>-1600.webp` and `-800.webp`) show the **wider area** around each listing's approximate, town-level location (see `src/data/places.js`). They are not property boundaries, and the page says so.
- **Scene metadata** (scene ids, dates, frame size) is in `src/data/satellite.json`.
- **Scenes made for the page:**
  - `scene-edge`: the upper Xingu basin, Mato Grosso, Brazil, in the "Why it matters" chapter. `scripts/gen-edge.mjs` traces its forest edge and builds the shading for the cleared land from the image pixels.
  - `scene-survey`: Sarapiquí, Costa Rica. It is the base for the "How it works" illustration. The parcel drawn on it is labelled as an illustration, not an actual boundary.

### Regenerating

```
npm run gen:satellite        # every listing, plus both scenes (needs network)
node scripts/gen-satellite.mjs --only <slug> --force   # one frame
```

Each run picks the least cloudy recent passes, fills gaps from neighbouring passes, trims empty edges and applies a light colour grade. Look at the results before committing: cloud and haze detection is a simple brightness test.

When a listing is added to `src/data/listings.json`, add its approximate coordinates to `src/data/places.js` (or it falls back to the country centre). Then run `gen:satellite` again.

## Logo and icons

The frog-and-leaf emblem is the alliance's own artwork. The original is `assets/frog-emblem.png` (1254 × 1254, frog on a dark green square, `#012118`). Everything else is made from it by `scripts/gen-icons.mjs`:

- `public/brand/mark-96/192/320.webp`: the frog alone, with a see-through background, for the header and footer. The pupils stay solid so the eyes read on light backgrounds too.
- `public/brand/mark-512.png`: the same, as a PNG, for partners and press.
- `public/favicon.ico` (16, 32 and 48 px), `public/apple-touch-icon.png` (180 px), `public/icon-192.png` and `public/icon-512.png`: the frog on its dark green square. `icon-512.png` is also the logo in the page's structured data.
- `public/site.webmanifest`.

The share image (`public/og.png`) places `mark-192.webp` beside the name; `scripts/gen-og.mjs` runs before every build.

The name next to the frog (header, footer and the giant footer wordmark) is set in Bricolage Grotesque (SIL Open Font License), self-hosted through `@fontsource-variable/bricolage-grotesque`.

To replace the emblem, overwrite `assets/frog-emblem.png` and run:

```
npm run gen:icons
node scripts/gen-og.mjs
```
