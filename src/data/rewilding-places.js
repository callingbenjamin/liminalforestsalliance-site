// Where each /rewilding property sits on the locator globe.
//
// Keyed by the listing `id` in src/data/rewilding-page.json. Coordinates are
// APPROXIMATE and only place a pin on the globe: they are not boundaries or
// survey points. This mirrors src/data/listings-places.js for the wild Listings
// page.
//
// `precision` says how much the broker's listing tells us:
//   'town'    the named town or locality                (shown as ≈ coordinates)
//   'area'    a named district, valley or conservancy    (shown as ≈ coordinates)
//   'region'  only a broad region
//   'country' only the country
// For 'region' and 'country' the page says the exact location was not given.
//
// When the rewilding sync adds a property, add its id here. Until then it falls
// back to its country's rough centre (precision 'country') and the build prints
// a warning naming it.

const BY_ID = {
  'darjeeling-tea-estate-1235ac': { lat: 27.04, lng: 88.26, precision: 'town' },
  'sakleshpur-70ac-coffee': { lat: 12.94, lng: 75.78, precision: 'town' },
  'knuckles-500ac-tea-factory': { lat: 7.45, lng: 80.78, precision: 'area' },
  'kapit-sarawak-36028ac-plantation-lease': { lat: 2.0, lng: 113.5, precision: 'area' },
  'palawan-aborlan-5ha-farm': { lat: 9.43, lng: 118.55, precision: 'town' },
  'palawan-princess-urduja-6ha-mango': { lat: 9.27, lng: 118.4, precision: 'area' },
  'palawan-quezon-17ha-coconut': { lat: 9.23, lng: 118.03, precision: 'town' },
};

// Rough country centres, used only when a listing has no entry above.
const BY_COUNTRY = {
  India: { lat: 20.6, lng: 79.0 },
  'Sri Lanka': { lat: 7.5, lng: 80.7 },
  Malaysia: { lat: 3.5, lng: 109.5 },
  Philippines: { lat: 12.9, lng: 121.8 },
  Indonesia: { lat: -2.0, lng: 118.0 },
  Thailand: { lat: 15.0, lng: 101.0 },
  Cambodia: { lat: 12.6, lng: 104.9 },
  Vietnam: { lat: 16.0, lng: 107.8 },
};

const missing = [];

/** { lat, lng, precision } for a listing from rewilding-page.json. */
export function rewildingPlace(l) {
  const known = BY_ID[l.id];
  if (known) return known;
  missing.push(l.id || l.name);
  const c = BY_COUNTRY[l.country] || { lat: 0, lng: 0 };
  return { ...c, precision: 'country' };
}

/** Call once after mapping every listing: warns about listings with no pin position. */
export function warnMissingPlaces() {
  if (!missing.length) return;
  console.warn(
    `[rewilding-places] ${missing.length} listing(s) have no map position and use their country centre: ${[...new Set(missing)].join(', ')}. Add them to src/data/rewilding-places.js.`,
  );
  missing.length = 0;
}

const dms = (v, pos, neg) => `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}`;

/** Label for the globe panel: "≈ 7.5° N · 80.7° E", or a plain note when only the region or country is known. */
export function placeLabel({ lat, lng, precision }) {
  if (precision === 'region' || precision === 'country') return 'Exact location not given';
  return `≈ ${dms(lat, 'N', 'S')} · ${dms(lng, 'E', 'W')}`;
}
