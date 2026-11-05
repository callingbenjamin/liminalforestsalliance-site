// Page-ready view of the listings: status, place, satellite frame and an
// approximate US$ value for sorting. Used at build time by the Atlas.
import { listings } from '../data/content.js';
import { placeFor, slugFor, formatCoords } from '../data/places.js';
import satellite from '../data/satellite.json';

const fmt = (n) => n.toLocaleString('en-US');

/** Parse "US$2,500,000", "≈ US$26M", "≈ US$720,000", "US$2,000,000–3,000,000". */
function parseUsd(text) {
  if (!text) return null;
  const m = text.match(/US\$\s?([\d.,]+)\s?(M|million|K)?(?:\s?[–-]\s?([\d.,]+)\s?(M|million)?)?/i);
  if (!m) return null;
  const num = (s, unit) => {
    const v = parseFloat(s.replace(/,/g, ''));
    if (!Number.isFinite(v)) return null;
    if (/^m/i.test(unit || '')) return v * 1e6;
    if (/^k/i.test(unit || '')) return v * 1e3;
    return v;
  };
  const low = num(m[1], m[2]);
  const high = m[3] ? num(m[3], m[4] || m[2]) : null;
  return low ? { low, high } : null;
}

function usdFor(p) {
  // A per-unit price ("US$1,300 / acre") is only useful through its total in the note.
  const perUnit = /\//.test(p.price);
  const fromPrice = !perUnit && /^US\$/.test(p.price) ? parseUsd(p.price) : null;
  if (fromPrice) return { ...fromPrice, approx: false };
  const fromNote = parseUsd(p.price_note);
  if (fromNote) return { ...fromNote, approx: true };
  return null;
}

const compact = (v) =>
  v >= 1e6 ? `${(v / 1e6).toFixed(v < 1e7 ? 1 : 0).replace(/\.0$/, '')}M` : `${Math.round(v / 1e3)}K`;

export function usdLabel(usd) {
  if (!usd) return null;
  const core = usd.high ? `US$${compact(usd.low)}–${compact(usd.high)}` : `US$${compact(usd.low)}`;
  return usd.approx ? `≈ ${core}` : core;
}

function enrich(p, kind, index) {
  const place = placeFor(p);
  const slug = slugFor(p);
  const usd = usdFor(p);
  const sat = satellite[slug] || null;
  return {
    ...p,
    kind, // 'sale' | 'review'
    index,
    slug,
    place,
    coords: formatCoords(place),
    usd,
    usdText: usdLabel(usd),
    areaText: `${fmt(p.size_ha)} ha`,
    acresText: `${fmt(p.size_acres)} ac`,
    sat: sat ? { ...sat, src800: `/media/sat/${slug}-800.webp`, src1600: `/media/sat/${slug}-1600.webp` } : null,
  };
}

export function allListings() {
  return [
    ...listings.for_sale.map((p, i) => enrich(p, 'sale', i)),
    ...listings.new_candidates.map((p, i) => enrich(p, 'review', i)),
  ];
}

export function sceneImage(slug) {
  const s = satellite[slug];
  return s ? { ...s, src800: `/media/sat/${slug}-800.webp`, src1600: `/media/sat/${slug}-1600.webp` } : null;
}

/** "29 Oct 2025" */
export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
