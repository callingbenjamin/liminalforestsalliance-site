// Single source of truth for the public Listings page ("/listings").
//
// Consumed by:
//   - src/pages/listings.astro     (the /listings HTML page)
//   - src/pages/listings.md.js      (the /listings.md Markdown alternate)
//   - src/pages/sitemap.xml.js      (adds the Listings pages to the sitemap)
//
// The verified dataset lives in a sibling JSON file, src/data/listings-page.json,
// which is synced from the weekly research routine (see docs/listings-process.md).
// The HTML page and the Markdown alternate are both generated from that one file
// so they cannot drift apart.
//
// SOURCING RULE: every fact on a card (name, location, size, price, broker,
// tenure, ecological case) comes from the broker's own listing. Nothing here is
// invented. Prices are shown exactly as listed; non-USD prices keep their
// currency alongside an approximate US$ conversion with the rate date in the
// page's fx note. Photos are hotlinked from the broker (never downloaded into
// the repo). Where a listing has no usable photo, the card shows a note instead.
// This is not an offer of sale; details change, so confirm with the broker.
//
// Do NOT confuse this with src/data/listings.json + src/lib/listings.js, which
// power the home-page Atlas satellite cards. This module is independent.
import { SITE_URL } from './content.js';
import data from './listings-page.json';

// `meta` carries page-level copy (title, intro, last-checked date, fx note).
// `listings` is the array of verified for-sale cards.
export const listingsMeta = data.meta || {};
export const listings = Array.isArray(data.listings) ? data.listings : [];

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
  if (listingsMeta.checked) return listingsMeta.checked;
  const dates = listings.map((l) => l.checked).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : '';
}

// Area line used on cards and in Markdown: "1,012 ha / 2,500 ac".
export const areaLine = (l) => `${fmt(l.size_ha)} ha / ${fmt(l.size_acres)} ac`;

// Price as shown to people: the broker's listed figure (with any ≈ US$ note),
// falling back to the raw price if a display string was not provided.
export const priceLine = (l) => l.price_display || l.price || 'Price on request';

// Derived totals, computed from the listings themselves so the page's summary
// never contradicts the cards even if meta is incomplete.
export function listingsStats() {
  const totalHa = listings.reduce((s, l) => s + (Number(l.size_ha) || 0), 0);
  const totalAcres = listings.reduce((s, l) => s + (Number(l.size_acres) || 0), 0);
  const countries = new Set(listings.map((l) => l.country).filter(Boolean));
  const withoutPhoto = listings.filter((l) => !l.photo_url);
  return {
    count: listings.length,
    totalHa,
    totalAcres,
    countries: countries.size,
    withoutPhoto,
  };
}

// Page entries for the sitemap (the HTML page advertises its .md alternate).
// Merged into the sitemap by src/pages/sitemap.xml.js so content.js does not
// need to import this module.
export const listingsPages = [
  { path: '/listings', md: '/listings.md', changefreq: 'weekly', priority: '0.9' },
];

// ---- Markdown rendering (shared by the .md alternate) ---------------------

function listingToMarkdown(l) {
  const lines = [`### ${l.name}`];
  const place = l.country && !String(l.location || '').includes(l.country)
    ? `${l.location}, ${l.country}`
    : l.location;
  if (place) lines.push(`- Location: ${place}`);
  lines.push(`- Size: ${areaLine(l)}`);
  lines.push(`- Price: ${priceLine(l)}`);
  if (l.tenure_label) lines.push(`- Tenure: ${l.tenure_label}`);
  if (l.exceptional && l.exceptional_note) lines.push(`- Note: ${l.exceptional_note}`);
  if (l.ecological_case) lines.push(`- Ecological case: ${l.ecological_case}`);
  if (l.broker) lines.push(`- Broker: ${l.broker}`);
  if (!l.photo_url && l.photo_note) lines.push(`- Photo: ${l.photo_note}`);
  if (l.url) lines.push(`- Listing: ${l.url}`);
  if (l.checked) lines.push(`- Last checked: ${formatDate(l.checked)}`);
  return lines.join('\n');
}

export function renderListingsMarkdown() {
  const stats = listingsStats();
  const checked = lastChecked();
  const out = [];

  out.push(`# ${listingsMeta.title || 'Land for sale — Liminal Forests Alliance'}`);
  out.push('');
  if (listingsMeta.intro || listingsMeta.description) {
    out.push(listingsMeta.intro || listingsMeta.description);
    out.push('');
  }
  out.push(`Canonical page: ${SITE_URL}/listings`);
  out.push('');
  out.push(
    `${stats.count} ${stats.count === 1 ? 'property' : 'properties'} currently listed for sale across ${stats.countries} ${stats.countries === 1 ? 'country' : 'countries'}, roughly ${fmt(stats.totalHa)} hectares in total.`,
  );
  if (checked) out.push(`Last checked ${formatDate(checked)}.`);
  if (listingsMeta.fx_note) out.push(listingsMeta.fx_note);
  out.push('');
  out.push(
    'These are real properties listed by independent third-party brokers. This page is not an offer of sale and the alliance is not the seller; prices and availability change, so confirm every detail directly with the broker.',
  );
  out.push('');
  out.push('## Listings');
  out.push('');
  for (const l of listings) {
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
