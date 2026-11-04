// Discovery check: verifies the build output contains the expected
// discoverability artifacts and that same-domain links in llms.txt resolve
// to real files in dist. Also parses the JSON-LD in the home page.
//
// Usage: node scripts/check-discovery.mjs
// Exits non-zero if any check fails. Run after `astro build`.
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const SITE_URL = 'https://liminalforestsalliance.com';

const pass = [];
const fail = [];
const skipped = [];
const ok = (m) => pass.push(m);
const bad = (m) => fail.push(m);
const skip = (m) => skipped.push(m);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function requireFile(rel, label) {
  if (await exists(join(dist, rel))) ok(`${label}: dist/${rel} present`);
  else bad(`${label}: dist/${rel} MISSING`);
}

// 1. Required discovery artifacts (one Markdown alternate per HTML page).
await requireFile('robots.txt', 'robots');
await requireFile('llms.txt', 'llms');
await requireFile('sitemap.xml', 'sitemap');
await requireFile('index.html', 'home');
await requireFile('index.md', 'markdown alternate');

// 2. robots.txt carries the no-AI-training policy signal.
if (await exists(join(dist, 'robots.txt'))) {
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  if (robots.includes('ai-train=no')) ok('robots: Content-Signal ai-train=no present');
  else bad('robots: Content-Signal ai-train=no MISSING');
  if (/^User-agent:\s*GPTBot/im.test(robots)) ok('robots: GPTBot listed in blocked group');
  else bad('robots: GPTBot not found');
}

// 3. llms.txt states the policy and every same-domain link resolves in dist.
if (await exists(join(dist, 'llms.txt'))) {
  const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
  if (/ai-train=no/.test(llms)) ok('llms: states no-AI-training policy');
  else bad('llms: no-AI-training policy statement MISSING');

  const urls = [...llms.matchAll(/https?:\/\/[^\s)\]]+/g)].map((m) => m[0].replace(/[.,;]+$/, ''));
  const seen = new Set();
  for (const url of urls) {
    if (seen.has(url)) continue;
    seen.add(url);
    if (!url.startsWith(SITE_URL)) {
      skip(`llms link (external, not checked offline): ${url}`);
      continue;
    }
    let rel = url.slice(SITE_URL.length) || '/';
    if (rel === '/' || rel === '') rel = '/index.html';
    if (rel.endsWith('/')) rel += 'index.html';
    if (await exists(join(dist, rel.replace(/^\//, '')))) ok(`llms link resolves: ${url}`);
    else bad(`llms link BROKEN (no dist${rel}): ${url}`);
  }
}

// 4. sitemap references the canonical home URL.
if (await exists(join(dist, 'sitemap.xml'))) {
  const sm = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  if (sm.includes(`<loc>${SITE_URL}/</loc>`)) ok('sitemap: home URL present');
  else bad('sitemap: home URL MISSING');
}

// 5. JSON-LD in the home page parses and declares Organization + WebSite.
if (await exists(join(dist, 'index.html'))) {
  const html = await readFile(join(dist, 'index.html'), 'utf8');
  const m = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) {
    bad('json-ld: no application/ld+json script found');
  } else {
    try {
      const data = JSON.parse(m[1]);
      const graph = data['@graph'] || [data];
      const types = graph.map((n) => n['@type']);
      if (types.includes('Organization')) ok('json-ld: Organization present');
      else bad('json-ld: Organization MISSING');
      if (types.includes('WebSite')) ok('json-ld: WebSite present');
      else bad('json-ld: WebSite MISSING');
    } catch (e) {
      bad(`json-ld: failed to parse (${e.message})`);
    }
  }
  if (/rel="alternate"[^>]*type="text\/markdown"/.test(html)) ok('home: Markdown alternate link present');
  else bad('home: Markdown alternate link MISSING');
}

// Report.
for (const m of pass) console.log(`PASS  ${m}`);
for (const m of skipped) console.log(`SKIP  ${m}`);
for (const m of fail) console.log(`FAIL  ${m}`);
console.log(`\n${pass.length} passed, ${fail.length} failed, ${skipped.length} skipped`);
process.exit(fail.length ? 1 : 0);
