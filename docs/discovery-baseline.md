# AI discoverability baseline - 2026-11-04

Baseline snapshot of the Liminal Forests Alliance site at the time the
no-AI-training + discoverability work landed. Re-run the checks below whenever
site content, pages, robots/WAF rules or crawler behaviour change.

- Domain: https://liminalforestsalliance.com
- Framework: Astro (static output), deployed on Vercel
- HTML pages: 1 (`/`)

## Policy

- Search and answer crawlers: allowed.
- AI-training crawlers: not allowed (robots.txt disallow + HTTP 403 via middleware).
- Content-Signal on every robots.txt group: `search=yes, ai-input=yes, ai-train=no`.

## Artifacts in this build

| Artifact | Path | Source |
| --- | --- | --- |
| robots.txt | `/robots.txt` | `public/robots.txt` (static) |
| llms.txt | `/llms.txt` | `public/llms.txt` (static) |
| sitemap | `/sitemap.xml` | generated at build from `src/data/content.js` |
| Markdown alternate | `/index.md` | generated at build from `src/data/content.js` |
| JSON-LD | in `/` head | `Organization` + `WebSite` (schema.org) |
| Canonical | in `/` head | `https://liminalforestsalliance.com/` |

## robots.txt crawler decisions

- Blocked group (listed first, one `User-agent` line each, then `Disallow: /`):
  GPTBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot, Applebot-Extended,
  meta-externalagent, FacebookBot, Bytespider, Amazonbot, cohere-ai,
  cohere-training-data-crawler, Diffbot, AI2Bot, Ai2Bot-Dolma, omgili, Timpibot,
  ImagesiftBot, PanguBot, Webzio-Extended, img2dataset.
- Allowed groups: Googlebot, Bingbot, DuckDuckBot, Applebot, OAI-SearchBot,
  ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User,
  and `*` (normal browsers, link-preview bots).

## In-code 403 (middleware.js)

- Vercel Routing Middleware returns 403 for User-Agents matching (case-insensitive):
  `gptbot|claudebot|anthropic-ai|ccbot|bytespider|meta-externalagent|facebookbot|amazonbot|cohere-ai|cohere-training-data-crawler|diffbot|ai2bot|omgili|timpibot|imagesiftbot|pangubot|img2dataset`
- Matcher excludes `/robots.txt` so the policy stays readable to all bots.
- Regex lives in `src/lib/blocked-bots.js`; covered by `test/blocked-bots.test.js`.

## Local verification (2026-11-04)

Run from the repo root:

```
npm ci
npm test                 # node --test: 6/6 pass
npm run build            # astro build: 1 page + /index.md + /sitemap.xml
npm run check:discovery  # 17 passed, 0 failed, 1 skipped (external link)
```

- Unit tests confirm blocked AI-training UAs get 403 and that Googlebot,
  Bingbot, Applebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
  PerplexityBot and Chrome pass through.
- `check-discovery.mjs` confirms robots.txt, llms.txt, sitemap.xml and index.md
  exist in `dist`, that same-domain links in llms.txt resolve, and that the
  home-page JSON-LD parses with both Organization and WebSite.

## Still uncertain / not verified here

- Production HTTP and crawler behaviour (curl against the live domain with each
  user agent) is not verified in this PR; verify after deploy per the spec:
  `GPTBot -> 403`, `Amazonbot -> 403`, `OAI-SearchBot / Googlebot / browser -> 200`,
  `/robots.txt -> 200` for all.
- External broker listing URLs are not checked for liveness offline; they are
  third-party pages subject to change.
- The Vercel firewall rule for AI-training crawlers is managed separately in the
  dashboard and is out of scope for this repo.
- AI referrer counts from Vercel analytics are not included in this baseline.
