# How to update the Old Growth page (/old-growth)

The public Old Growth page shows large, ecologically important wild land that is
currently for sale. It is the **only** public home for this inventory: the home
page no longer carries an on-page land section (the old "#land" Atlas accordion
was removed), and the old callingbenjamin.com/liminal-commons page redirects
here.

The page is an **accordion**, styled to match the site's documentary theme
(stats row, region filter chips, a sort control, and a collapsed row per
property that expands to a detail panel). The design deliberately mirrors the
look the home page's Atlas section used to have. In the expanded panel we show:

- the broker's **photo** (`photo_url`), hotlinked with `referrerpolicy="no-referrer"`
  and cropped to a landscape frame (`object-fit: cover`);
- the ecological case, the full listed facts (location, area, price, tenure,
  broker, last-checked date), and two actions — "Ask about this property"
  (Calendly) and "View the broker's listing";
- when there is no usable photo, a neutral empty state reading
  "See photos on the broker listing." — never the technical `photo_note`, a QR
  code, a broker logo or a tiny thumbnail.

The collapsed row stays scannable: name, location, area and a compact price.

Like the home page and the blog, the page is generated from a single dataset, so
the HTML page, the Markdown alternate and the sitemap entry all follow from one
file and cannot drift apart. The accordion's filter/sort/expand behaviour is a
small self-contained script inside `listings.astro`; the page is fully readable
with JavaScript disabled (every detail panel is in the DOM, just collapsed).

## Where things live

| Thing | File |
| --- | --- |
| Card data (source of truth) | `src/data/listings-page.json` (`meta` + `listings`) |
| Helpers + Markdown renderer | `src/data/listings-page.js` |
| Globe pin positions (approximate) | `src/data/listings-places.js` |
| Locator globe drawing | `src/scripts/globe.js` (land dots: `src/data/land.json`) |
| Old Growth page | `src/pages/old-growth.astro` → `/old-growth` |
| Old Growth Markdown | `src/pages/old-growth.md.js` → `/old-growth.md` |
| Sitemap (merges listings) | `src/pages/sitemap.xml.js` via `listingsPages` |
| Machine index | `public/llms.txt` (Pages section) |

`src/data/listings-page.json` is synced from the weekly research routine's
dataset at `/workspace/liminal-forests/listings.json` (outside this repo). The
weekly check re-verifies each listing against the broker's page and rebuilds the
JSON; copy the resulting file into `src/data/listings-page.json` and open a PR.

Do **not** confuse this with `src/data/listings.json` + `src/lib/listings.js`.
That dataset powered the old home-page Atlas section, which has been removed;
only the hero's "landscapes tracked" count still reads from it. It is separate
from, and must not be mixed with, the public listings inventory in
`src/data/listings-page.json`.

## Card data shape

Each entry in `listings` carries, at minimum: `id`, `name`, `location`,
`country`, `size_ha`, `size_acres`, `price`, `price_display`, `price_usd`,
`fx_note`, `ecological_case`, `broker`, `url`, `photo_url` (may be `null`),
`photo_note`, `tenure`, `tenure_label`, `status`, `checked`, `exceptional` and
`exceptional_note`. `meta` carries page-level copy such as `title`, `intro`,
`checked` and `fx_note`.

The page derives its summary counts (number of properties, total hectares,
number of countries) from the `listings` array itself, so those numbers stay
correct even if `meta` is incomplete.

## Field rules (non-negotiable)

- **Facts only.** Every value on a card comes from the broker's own listing.
  Never invent names, sizes, prices, dates or ecological claims. If something is
  unknown, leave the field out rather than guessing.
- **Only land that is actually for sale.** Drop any listing that has sold or been
  withdrawn on the next weekly check.
- **Roughly 500+ hectares.** Keep the scale large. Smaller parcels are only kept
  when genuinely exceptional (for example Rara Avis at 426 ha), flagged with
  `exceptional` and explained in `exceptional_note`.
- **Prices exactly as listed.** Show the broker's figure. For non-USD prices,
  keep the original currency alongside an approximate `≈ US$` conversion, and
  state the conversion's rate date in `fx_note`.
- **Photos are hotlinks only.** `photo_url` is the broker's own image URL, loaded
  with `referrerpolicy="no-referrer"`. Never download or commit broker images
  into the repo. Prefer a large landscape gallery image or the page's `og:image`.
  **Reject** QR codes, broker logos, HTML/error pages, and tiny or near-square
  thumbnails (roughly under 400px on the short side) — these look broken in the
  landscape frame. Where there is no usable photo, set `photo_url` to `null`
  (keep any note in `photo_note` for the record); the expanded panel then shows
  the neutral empty state "See photos on the broker listing." — it never renders
  `photo_note` in the photo area. If a hotlinked image fails to load at runtime,
  the same neutral empty state shows through automatically.
- **Tenure labels.** Use `tenure_label` to flag non-standard tenure such as
  co-funding, sealed-bid or leasehold arrangements.

## Steps to update after a weekly check

1. Re-run the weekly listings check and regenerate the dataset.
2. Copy it over `src/data/listings-page.json`.
   If a listing is new, add its id to `src/data/listings-places.js` with an
   approximate position (town or district level) and a `precision`. Until you
   do, its pin sits at the country centre and the build prints a
   `[listings-places]` warning naming it.
3. Rebuild and verify from the repo root:

   ```
   npm run build
   npm test
   npm run check:discovery
   ```

   Every same-domain URL in `llms.txt` must resolve in `dist/`; the discovery
   check enforces this.
4. Commit and open a PR to `master`. Vercel deploys from `master` on merge.

## Do not

- Do not invent or estimate any figure.
- Do not contact brokers or act as the seller; the page is not an offer of sale.
- Do not download broker photos into the repo; hotlink only.
- Do not add any contact email to the page.
- Do not use emojis.
