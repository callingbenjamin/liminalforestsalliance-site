# How to update the Rewilding page (/rewilding)

The public Rewilding page shows **working** land that is currently for sale and
could be restored rather than intensified: plantations (tea, coffee, oil palm),
logged leases and farm lots. It is deliberately **separate** from the Listings
page (`/old-growth`), which carries large, ecologically important **wild** land.
A property belongs on Rewilding, not Old Growth, when its current use is
agricultural or extractive and the case is for conversion/restoration — not
because it is already intact wild forest.

The page is an **accordion**, and it mirrors the Old Growth page UX: a stats row,
filter chips, a sort control, a locator globe, and a collapsed row per property
that expands to a detail panel with the broker's photo and the full listed
facts. The one deliberate difference is the filter axis: Old Growth filters by
geographic **region**, Rewilding filters by **land use** (plantation, logged
lease, farm lot), because every rewilding candidate so far is in Asia and the
useful distinction is the kind of working land.

In the expanded panel we show:

- the broker's **photo** (`photo_url`), hotlinked with `referrerpolicy="no-referrer"`
  and cropped to a landscape frame (`object-fit: cover`);
- a **Critical** note when the card is flagged (see below), shown just above the
  rewilding case with the listing-based reason;
- the rewilding case, the full listed facts (location, land use, area, price,
  tenure, broker, last-checked date), and two actions — "Ask about this
  property" (Calendly) and "View the broker's listing";
- when there is no usable photo, a neutral empty state reading
  "See photos on the broker listing." — never the technical `photo_note`, a QR
  code, a broker logo or a tiny thumbnail.

The collapsed row stays scannable: name, location, area and a compact price.

Like the rest of the site, the page is generated from a single dataset, so the
HTML page, the Markdown alternate and the sitemap entry all follow from one file
and cannot drift apart. The accordion's filter/sort/expand behaviour is a small
self-contained script inside `rewilding.astro`; the page is fully readable with
JavaScript disabled (every detail panel is in the DOM, just collapsed).

## Where things live

| Thing | File |
| --- | --- |
| Card data (source of truth) | `src/data/rewilding-page.json` (`meta` + `listings`) |
| Helpers + Markdown renderer | `src/data/rewilding-page.js` |
| Globe pin positions (approximate) | `src/data/rewilding-places.js` |
| Locator globe drawing | `src/scripts/globe.js` (land dots: `src/data/land.json`) |
| Rewilding page | `src/pages/rewilding.astro` → `/rewilding` |
| Rewilding Markdown | `src/pages/rewilding.md.js` → `/rewilding.md` |
| Nav entry (next to Old Growth) | `src/data/content.js` (`content.nav`) |
| Sitemap (merges rewilding) | `src/pages/sitemap.xml.js` via `rewildingPages` |
| Machine index | `public/llms.txt` (Pages section) |

Do **not** confuse this with `src/data/listings-page.json` + `src/data/listings-page.js`
(the wild Old Growth page) or with `src/data/listings.json` + `src/lib/listings.js`
(the old home-page Atlas data). The rewilding inventory is independent.

## Card data shape

Each entry in `listings` carries, at minimum: `id`, `name`, `location`,
`country`, `size_ha`, `size_acres`, `price`, `price_display`, `price_usd`,
`fx_note`, `ecological_case`, `rewilding_angle`, `broker`, `url`, `photo_url`
(may be `null`), `photo_note`, `tenure`, `tenure_label`, `category`, `status`,
`checked`, `critical` (boolean) and `critical_reason`. `category` is one of
`plantation`, `logged_lease` or `farm_lot` and drives the filter chips.
`critical` drives the Critical badge and the "Critical only" filter (see below).
`meta` carries page-level copy such as `title`, `description`, `intro` and
`checked`.

The page derives its summary counts (number of properties, total hectares,
number of countries) from the `listings` array itself, so those numbers stay
correct even if `meta` is incomplete.

## The Critical flag

`critical` (boolean) marks a card that sits on a **known ecological priority**.
When `true`, the collapsed row shows a "Critical" pill (and a solid sun-coloured
key), the expanded panel shows the `critical_reason` just above the rewilding
case, the Markdown alternate adds `— Critical` to the heading and a
`- Critical:` line, and a "Critical only" filter chip appears in the toolbar.
Critical cards are sorted first in the default "As listed" order.

A card is Critical **only** when the broker's own listing (or a public
protected-area adjacency it explicitly names) supports one of these, using
listing facts only — never a guess or an outside lookup:

- **Corridor / protected-area edge** — the listing states the property borders
  or is a gateway to a named national park, reserve or protected area (e.g.
  "directly borders Braulio Carrillo National Park", "adjacent to Reserva do
  Mico-Leão-Dourado").
- **Rare or high-value biome** — the listing locates the land in a named rare or
  threatened biome and claims a remnant of it (e.g. primary Mata Atlântica,
  indigenous Rift Valley forest, a named biodiversity hotspot such as the
  Eastern Himalaya or Western Ghats, the Knuckles massif).
- **Deforestation frontier** — the listing places the land on an active clearing
  frontier at scale (e.g. Amazon-frontier farm stated as fully cleared "sem
  mata", Sundaland oil-palm/logged leases at thousands of hectares).

`critical_reason` is required whenever the flag is set and must paraphrase the
listing fact that justifies it — no invented ecology. For transparency we also
keep a `critical_reason` on non-critical cards briefly noting why they fell
short (e.g. "near, but not stated as bordering, a protected area"); that text is
**not** rendered anywhere because the page and Markdown only read
`critical_reason` when `critical` is `true`. When in doubt, leave `critical`
`false` — the flag should stay rare and defensible.

## Field rules (non-negotiable)

- **Facts only.** Every value on a card comes from the broker's own listing.
  Never invent names, sizes, prices, dates or ecological claims. If something is
  unknown, leave the field out rather than guessing.
- **Only land that is actually for sale.** Drop any listing that has sold or been
  withdrawn on the next check.
- **Working land, not wild land.** This page is for plantations, logged leases
  and farm lots with a restoration/conversion case. Genuinely intact wild land
  belongs on `/old-growth` instead.
- **Prices exactly as listed.** Show the broker's figure. For non-USD prices,
  keep the original currency; add an approximate `≈ US$` conversion only when you
  have a dated rate, recorded in `fx_note`.
- **Tenure labels.** Use `tenure_label` to flag foreign-ownership rules such as
  FEMA-restricted (India), leasehold-only or foreign-ownership-barred. Many of
  these countries bar foreign freehold purchase; keep the note honest.
- **Photos are hotlinks only.** `photo_url` is the broker's own image URL, loaded
  with `referrerpolicy="no-referrer"`. Never download or commit broker images
  into the repo. Prefer a large landscape gallery image or the page's `og:image`.
  **Reject** QR codes, broker logos, HTML/error pages, and tiny or near-square
  thumbnails (roughly under 400px on the short side). Where there is no usable
  photo, set `photo_url` to `null` (keep any note in `photo_note` for the
  record); the expanded panel then shows the neutral empty state. If a hotlinked
  image fails to load at runtime, the same neutral empty state shows through.

## Steps to update

1. Re-run the rewilding candidate check and regenerate the dataset.
2. Copy it over `src/data/rewilding-page.json`.
   If a listing is new, add its id to `src/data/rewilding-places.js` with an
   approximate position (town or district level) and a `precision`. Until you
   do, its pin sits at the country centre and the build prints a
   `[rewilding-places]` warning naming it.
3. Rebuild and verify from the repo root:

   ```
   npm test
   npm run build
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
