# How to add a dispatch (blog post)

The blog ("Dispatches") is generated from a single data module, the same way
the home page is. Add a post by adding one object to that module; the HTML
page, the Markdown alternate, the RSS feed, the sitemap and the `llms.txt`
listing all follow from it.

## Where things live

| Thing | File |
| --- | --- |
| Post data (source of truth) | `src/data/blog.js` (`posts` array) |
| Blog index page | `src/pages/blog/index.astro` → `/blog` |
| Post page | `src/pages/blog/[slug].astro` → `/blog/<slug>` |
| Blog index Markdown | `src/pages/blog.md.js` → `/blog.md` |
| Post Markdown | `src/pages/blog/[slug].md.js` → `/blog/<slug>.md` |
| RSS feed | `src/pages/blog/rss.xml.js` → `/blog/rss.xml` |
| Sitemap (merges blog) | `src/pages/sitemap.xml.js` via `blogPages` in `blog.js` |
| Machine index | `public/llms.txt` (Blog section) |

## Steps

1. **Add the post object** to the `posts` array in `src/data/blog.js`. Required
   fields:

   - `slug` — kebab-case, unique. Becomes `/blog/<slug>`.
   - `title`
   - `date` — use `'2026-11-04'` (ISO `YYYY-MM-DD`).
   - `location`
   - `region` — e.g. `'South America'`, used in the breadcrumb.
   - `outcome` — exactly `'Conservation win'` or `'Cautionary tale'`
     (the cautionary value styles the chip differently).
   - `size_ha`, `size_acres` — numbers (no commas; they are formatted for you).
   - `price` — a string; use `'Not publicly disclosed'` if unknown.
   - `saleDate`, `seller`, `buyer`, `currentUse` — strings.
   - `summary` — one or two sentences; used as the meta description and in the
     list, RSS and `llms.txt`.
   - `lead` — the opening paragraph.
   - `sections` — an array of `{ heading, paras: [..] }`. Include a section
     with the heading **"Why it matters for the trust model"** relating the
     story to the alliance's model (secure large wild land, then place each
     property in an independent trust so protection lasts).
   - `sources` — an array of `{ title, url }`, **at least two** real URLs.

2. **Add the post to `public/llms.txt`** under the Blog section: one line with
   an HTML link and a Markdown link (`/blog/<slug>` and `/blog/<slug>.md`).
   Every same-domain URL in `llms.txt` must resolve in `dist/`, and
   `check-discovery.mjs` enforces this.

3. **Add an entry to the log** at `/workspace/liminal-forests/blog-log.json`
   (outside the repo): `{ slug, title, property, location, url, sources, date_published }`.

4. **Build and verify** from the repo root:

   ```
   npm run build
   npm test
   npm run check:discovery
   ```

   Fix any failures before shipping.

## Sourcing rules (non-negotiable)

- Every fact (price, acreage, hectares, buyer, seller, date, current use) must
  come from a source you actually read. **Never invent numbers, names, dates or
  uses.**
- If something is not known, write `"not publicly disclosed"` or `"we could not
  confirm"`. Do not guess.
- Cite **two or more** real URLs per post in `sources`. Prefer primary sources
  (land trusts, government records, the buyer/seller, reputable news).
- Figures reported by a source you could not open directly should be described
  as reported (e.g. "reported at about US$7.5 million"), not stated as fact.
- Facts are presented as accurate "as of November 2026 per the cited sources".
  Keep that framing; do not imply live/current status.

## Conventions

- No emojis anywhere in the repo.
- Avoid heavy em-dash use; prefer commas and full stops.
- Keep posts roughly 500–900 words.
- The home page, `robots.txt` Content-Signal, and the AI-training `middleware`
  403 are unrelated to the blog and must keep working. Do not add any contact
  email to blog content.
