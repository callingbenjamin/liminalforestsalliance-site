# How to update the Listings page (/listings)

The public Listings page shows photo cards of large, ecologically important wild
land that is currently for sale. It is the only public home for these listings
(the old callingbenjamin.com/liminal-commons page redirects here).

Like the home page and the blog, the page is generated from a single dataset, so
the HTML page, the Markdown alternate and the sitemap entry all follow from one
file and cannot drift apart.

## Where things live

| Thing | File |
| --- | --- |
| Card data (source of truth) | `src/data/listings-page.json` (`meta` + `listings`) |
| Helpers + Markdown renderer | `src/data/listings-page.js` |
| Listings page | `src/pages/listings.astro` → `/listings` |
| Listings Markdown | `src/pages/listings.md.js` → `/listings.md` |
| Sitemap (merges listings) | `src/pages/sitemap.xml.js` via `listingsPages` |
| Machine index | `public/llms.txt` (Pages section) |

`src/data/listings-page.json` is synced from the weekly research routine's
dataset at `/workspace/liminal-forests/listings.json` (outside this repo). The
weekly check re-verifies each listing against the broker's page and rebuilds the
JSON; copy the resulting file into `src/data/listings-page.json` and open a PR.

Do **not** confuse this with `src/data/listings.json` + `src/lib/listings.js`,
which power the home-page Atlas satellite cards. Those are separate and are left
untouched by this page.

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
  into the repo. Where there is no usable photo, set `photo_url` to `null` and
  put a short explanation in `photo_note`; the card shows that note instead of an
  image (and if a hotlinked image fails to load, the same note shows through).
- **Tenure labels.** Use `tenure_label` to flag non-standard tenure such as
  co-funding, sealed-bid or leasehold arrangements.

## Steps to update after a weekly check

1. Re-run the weekly listings check and regenerate the dataset.
2. Copy it over `src/data/listings-page.json`.
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
