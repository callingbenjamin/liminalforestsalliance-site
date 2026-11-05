// Where each /listings property sits on the locator globe.
//
// Keyed by the listing `id` in src/data/listings-page.json (two listings share
// a broker URL, so the URL cannot be the key). Coordinates are APPROXIMATE and
// only place a pin on the globe: they are not boundaries or survey points.
//
// `precision` says how much the broker's listing tells us:
//   'town'    the named town or locality                (shown as ≈ coordinates)
//   'area'    a named district, valley or conservancy    (shown as ≈ coordinates)
//   'region'  only a broad region, e.g. "North-Eastern Namibia"
//   'country' only the country
// For 'region' and 'country' the page says the exact location was not given.
//
// When the weekly listings sync adds a property, add its id here. Until then it
// falls back to its country's rough centre (precision 'country') and the build
// prints a warning naming it.

const BY_ID = {
  'rea-rural-floresta-nativa-61-500-ha-carauari': { lat: -4.88, lng: -66.9, precision: 'town' },
  'sango-wildlife-conservancy-60-000-ha': { lat: -20.4, lng: 32.25, precision: 'area' },
  'wooroora-station-20-333-ha-bush-heritage-purchase-underway': { lat: -17.6, lng: 145.15, precision: 'area' },
  'la-josefina-estancia-16-272-ha-lago-san-mart-n': { lat: -49.1, lng: -72.05, precision: 'area' },
  'three-creek-preserve': { lat: 44.25, lng: -117.52, precision: 'area' },
  'tyityaba-nature-reserve-13-000-ha': { lat: -32.68, lng: 28.38, precision: 'town' },
  'hammond-nyerezi-safaris-32-000-acres-in-sav-valley-conservan': { lat: -20.3, lng: 32.4, precision: 'area' },
  '12-000-hectares-north-eastern-namibia': { lat: -19.0, lng: 20.5, precision: 'region' },
  'finca-en-patagonia-10-982-ha-esquel': { lat: -42.91, lng: -71.32, precision: 'town' },
  'ngorare-ranch-27-000-acres-ewaso-nyiro-frontage': { lat: 0.2, lng: 36.5, precision: 'area' },
  'mauricedale-game-ranch-6-506-ha-adjacent-to-kruger': { lat: -25.48, lng: 31.52, precision: 'town' },
  'private-nature-reserve-waterberg-0240': { lat: -24.2, lng: 28.0, precision: 'area' },
  'lago-posadas-6-128-ha': { lat: -47.55, lng: -71.75, precision: 'town' },
  'la-dorita-farm-13-897-acres-78-near-virgin-forest': { lat: -23.4, lng: -58.4, precision: 'country' },
  'pf0011-13-000-acres-of-exceptional-ecological-value': { lat: 17.75, lng: -88.95, precision: 'area' },
  'nature-s-paradise-10-400-acres-17-miles-of-caribbean-coastli': { lat: 17.88, lng: -88.33, precision: 'area' },
  '3-770-ha-on-the-shore-of-lago-o-higgins': { lat: -48.9, lng: -72.6, precision: 'area' },
  'finca-propiedad-forestal-y-de-conservaci-n-en-pet-n': { lat: 16.33, lng: -89.42, precision: 'town' },
  'fazenda-em-novo-aripuan-2-377-ha-native-amazon-forest': { lat: -5.12, lng: -60.38, precision: 'town' },
  'southern-patagonia-estate-puerto-cisnes': { lat: -44.73, lng: -72.68, precision: 'town' },
  'far-ralia': { lat: 57.03, lng: -4.08, precision: 'town' },
  'manuka-point-station': { lat: -43.4, lng: 171.4, precision: 'area' },
  '2-500-acre-conservation-land-with-precious-woods': { lat: 9.85, lng: -83.25, precision: 'area' },
  'fazenda-itapema-843-ha-500-ha-primary-atlantic-forest': { lat: -14.2, lng: -39.1, precision: 'area' },
  'hacienda-santa-clara-2-000-acre-coastal-sanctuary': { lat: -0.46, lng: -80.45, precision: 'town' },
  '2000-acres-of-fertile-land-rolling-hills-jungle': { lat: 17.1, lng: -88.6, precision: 'area' },
  'fazenda-tavares-808-ha-atlantic-forest-bordering-intervales-': { lat: -24.59, lng: -48.59, precision: 'town' },
  'lot-215-blackwattle-road-769-ha-native-bush': { lat: -34.36, lng: 117.08, precision: 'town' },
  'lot-3-the-qeii-block-ohau-downs-station-757-ha': { lat: -44.23, lng: 169.85, precision: 'town' },
  '700-hectares-of-peruvian-rainforest': { lat: -3.75, lng: -73.25, precision: 'area' },
  'conservation-acreage-critical-habitat': { lat: 17.25, lng: -88.38, precision: 'area' },
  'reserve-of-531-ha-primary-forest-for-preservation': { lat: 10.39, lng: -84.12, precision: 'town' },
  'rara-avis-biological-research-station': { lat: 10.28, lng: -84.05, precision: 'town' },
  'bosque-de-paz-private-cloud-forest-reserve-with-field-statio': { lat: 10.17, lng: -84.33, precision: 'town' },
  '849-acre-cloud-forest-estate-cerro-punta': { lat: 8.85, lng: -82.57, precision: 'town' },
  'los-campanos-cloud-forest-reserve': { lat: 9.75, lng: -83.92, precision: 'town' },
};

// Rough country centres, used only when a listing has no entry above.
const BY_COUNTRY = {
  Brazil: { lat: -10.0, lng: -53.0 },
  Argentina: { lat: -38.0, lng: -65.0 },
  Chile: { lat: -38.0, lng: -71.5 },
  Paraguay: { lat: -23.4, lng: -58.4 },
  Peru: { lat: -9.0, lng: -75.0 },
  Ecuador: { lat: -1.5, lng: -78.5 },
  Belize: { lat: 17.2, lng: -88.7 },
  Guatemala: { lat: 15.7, lng: -90.3 },
  'Costa Rica': { lat: 10.0, lng: -84.0 },
  Panama: { lat: 8.5, lng: -80.0 },
  'United States': { lat: 39.5, lng: -98.5 },
  Canada: { lat: 56.0, lng: -106.0 },
  Zimbabwe: { lat: -19.0, lng: 29.8 },
  'South Africa': { lat: -29.0, lng: 25.0 },
  Namibia: { lat: -22.5, lng: 17.5 },
  Kenya: { lat: 0.2, lng: 37.9 },
  Australia: { lat: -25.0, lng: 134.0 },
  'New Zealand': { lat: -41.5, lng: 172.5 },
  'United Kingdom': { lat: 54.0, lng: -2.5 },
};

const missing = [];

/** { lat, lng, precision } for a listing from listings-page.json. */
export function listingPlace(l) {
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
    `[listings-places] ${missing.length} listing(s) have no map position and use their country centre: ${[...new Set(missing)].join(', ')}. Add them to src/data/listings-places.js.`,
  );
  missing.length = 0;
}

const dms = (v, pos, neg) => `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}`;

/** Label for the globe panel: "≈ 4.9° S · 66.9° W", or a plain note when only the region or country is known. */
export function placeLabel({ lat, lng, precision }) {
  if (precision === 'region' || precision === 'country') return 'Exact location not given';
  return `≈ ${dms(lat, 'N', 'S')} · ${dms(lng, 'E', 'W')}`;
}
