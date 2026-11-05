// Single source of truth for the public Rewilding page ("/rewilding").
//
// Consumed by:
//   - src/pages/rewilding.astro     (the /rewilding HTML page)
//   - src/pages/rewilding.md.js      (the /rewilding.md Markdown alternate)
//   - src/pages/sitemap.xml.js       (adds the Rewilding pages to the sitemap)
//
// The verified dataset lives in a sibling JSON file, src/data/rewilding-page.json,
// synced from the rewilding research routine (see docs/rewilding-process.md).
// The HTML page and the Markdown alternate are both generated from that one file
// so they cannot drift apart.
//
// SOURCING RULE: every fact on a card (name, location, size, price, broker,
// tenure, the rewilding case) comes from the broker's own listing. Nothing here
// is invented. Prices are shown exactly as listed. Photos are hotlinked from the
// broker (never downloaded into the repo); where a listing has no usable photo,
// the card shows a neutral note instead. This is not an offer of sale; details
// change, so confirm with the broker.
//
// This is the counterpart to src/data/listings-page.js. That page carries WILD
// land; this one carries WORKING land — plantations, logged leases and farm lots
// — that we track for restoration potential. The two inventories are separate.
import { SITE_URL } from './content.js';
import data from './rewilding-page.json';

// `meta` carries page-level copy (title, intro, last-checked date).
// `listings` is the array of verified for-sale cards.
export const rewildingMeta = data.meta || {};
export const rewildings = Array.isArray(data.listings) ? data.listings : [];

// Pretty integers: 1012 -> "1,012". Leaves non-numbers untouched.
export const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : n);

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ISO date "2026-11-04" -> "4 November 2026". Any other string is returned as-is.
export function formatDate(iso) {
  if (!iso) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!m) return String(iso);
  const [, y, mo, d] = m;
  return `${Number(d)} ${MONTHS[Number(mo) - 1]} ${y}`;
}

// The date to show in the page header. Prefer the dataset's own meta.checked;
// otherwise fall back to the most recent per-listing checked date.
export function lastChecked() {
  if (rewildingMeta.checked) return rewildingMeta.checked;
  const dates = rewildings.map((l) => l.checked).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : '';
}

// Area line used on cards and in Markdown: "500 ha / 1,235 ac".
export const areaLine = (l) => `${fmt(l.size_ha)} ha / ${fmt(l.size_acres)} ac`;

// Land-use grouping for the accordion's filter chips. Unlike the wild Listings
// page (which groups by region), every card here is in Asia, so the useful axis
// is the kind of working land: plantation, logged lease or farm lot. This comes
// straight from each card's `category` field.
const CATEGORY_LABELS = {
  plantation: 'Plantation',
  logged_lease: 'Logged lease',
  farm_lot: 'Farm lot',
  pasture: 'Pasture',
};

// Canonical display order; the page only renders the chips that are actually used.
export const REWILDING_CATEGORIES = ['plantation', 'logged_lease', 'farm_lot', 'pasture', 'other'];

export const categoryLabel = (c) => CATEGORY_LABELS[c] || 'Other';
export const categoryFor = (l) => (CATEGORY_LABELS[l.category] ? l.category : 'other');

// A numeric US$ figure for sorting by price. Prefer the explicit ≈US$ conversion,
// then the display/raw price when it is already in US$. Returns null when no US$
// figure is available (prices listed only in local currency, on request, etc.).
export function usdValue(l) {
  if (typeof l.price_usd === 'number' && Number.isFinite(l.price_usd) && l.price_usd > 0) {
    return l.price_usd;
  }
  const source = [l.price_usd, l.price_display, l.price].find((v) => v != null && v !== '') || '';
  const asNum = Number(source);
  if (Number.isFinite(asNum) && asNum > 0 && String(source).trim() === String(asNum)) {
    return asNum;
  }
  const m = String(source).match(/US\$\s?([\d.,]+)\s?(M|million|K)?/i);
  if (!m) return null;
  const v = parseFloat(m[1].replace(/,/g, ''));
  if (!Number.isFinite(v)) return null;
  const unit = (m[2] || '').toLowerCase();
  if (unit.startsWith('m')) return v * 1e6;
  if (unit === 'k') return v * 1e3;
  return v;
}

// Price as shown to people: the broker's listed figure, falling back to the raw
// price when a display string was not provided.
export const priceLine = (l) => l.price_display || l.price || 'Price on request';

// The rewilding case for a card: prefer the explicit rewilding angle, falling
// back to the ecological case. Both are drawn from the broker's listing.
export const rewildingCase = (l) => l.rewilding_angle || l.ecological_case || '';

// Derived totals, computed from the listings themselves so the page's summary
// never contradicts the cards even if meta is incomplete.
export function rewildingStats() {
  const totalHa = rewildings.reduce((s, l) => s + (Number(l.size_ha) || 0), 0);
  const totalAcres = rewildings.reduce((s, l) => s + (Number(l.size_acres) || 0), 0);
  const countries = new Set(rewildings.map((l) => l.country).filter(Boolean));
  const withoutPhoto = rewildings.filter((l) => !l.photo_url);
  return {
    count: rewildings.length,
    totalHa,
    totalAcres,
    countries: countries.size,
    withoutPhoto,
  };
}

// Page entries for the sitemap (the HTML page advertises its .md alternate).
// Merged into the sitemap by src/pages/sitemap.xml.js.
export const rewildingPages = [
  { path: '/rewilding', md: '/rewilding.md', changefreq: 'weekly', priority: '0.8' },
];

// ---- Markdown rendering (shared by the .md alternate) ---------------------

function listingToMarkdown(l) {
  const lines = [`### ${l.name}${l.critical ? ' — Critical' : ''}`];
  const place = l.country && !String(l.location || '').includes(l.country)
    ? `${l.location}, ${l.country}`
    : l.location;
  if (l.critical && l.critical_reason) lines.push(`- Critical: ${l.critical_reason}`);
  if (place) lines.push(`- Location: ${place}`);
  if (l.category) lines.push(`- Land use: ${categoryLabel(categoryFor(l))}`);
  lines.push(`- Size: ${areaLine(l)}`);
  lines.push(`- Price: ${priceLine(l)}`);
  if (l.tenure_label) lines.push(`- Tenure: ${l.tenure_label}`);
  if (rewildingCase(l)) lines.push(`- Rewilding case: ${rewildingCase(l)}`);
  if (l.broker) lines.push(`- Broker: ${l.broker}`);
  if (!l.photo_url && l.photo_note) lines.push(`- Photo: ${l.photo_note}`);
  if (l.url) lines.push(`- Listing: ${l.url}`);
  if (l.checked) lines.push(`- Last checked: ${formatDate(l.checked)}`);
  return lines.join('\n');
}

export function renderRewildingMarkdown() {
  const stats = rewildingStats();
  const checked = lastChecked();
  const out = [];

  out.push(`# ${rewildingMeta.title || 'Rewilding — Liminal Forests Alliance'}`);
  out.push('');
  if (rewildingMeta.intro || rewildingMeta.description) {
    out.push(rewildingMeta.intro || rewildingMeta.description);
    out.push('');
  }
  out.push(`Canonical page: ${SITE_URL}/rewilding`);
  out.push('');
  out.push(
    `${stats.count} ${stats.count === 1 ? 'property' : 'properties'} currently listed for sale across ${stats.countries} ${stats.countries === 1 ? 'country' : 'countries'}, roughly ${fmt(stats.totalHa)} hectares in total.`,
  );
  const criticalCount = rewildings.filter((l) => l.critical).length;
  if (criticalCount) {
    out.push(
      `${criticalCount} of these are flagged Critical — the listing places them on a known ecological priority (a protected-area edge, a rare biome, or a deforestation frontier).`,
    );
  }
  if (checked) out.push(`Last checked ${formatDate(checked)}.`);
  out.push('');
  out.push(
    'These are working plantations, logged leases and farm lots listed by independent third-party brokers. We track them for their restoration potential, not as wild land. This page is not an offer of sale and the alliance is not the seller; prices and availability change, so confirm every detail directly with the broker. Foreign-ownership rules often apply — see each card’s tenure note.',
  );
  out.push('');
  out.push('## Candidates');
  out.push('');
  for (const l of rewildings) {
    out.push(listingToMarkdown(l));
    out.push('');
  }
  out.push('---');
  out.push('');
  out.push(
    'Property details are provided by independent third-party brokers and are subject to change; confirm all details directly with each broker. This site permits search and answer crawlers but does not permit AI-training crawlers. See /robots.txt and /llms.txt.',
  );
  out.push('');
  return out.join('\n');
}
