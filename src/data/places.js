// Where each listing sits on the globe, and what kind of landscape it is.
//
// Keyed by the listing URL in listings.json so it survives renames. The
// coordinates are approximate (town / district level), good enough to place
// a marker on the atlas globe — they are not survey boundaries.
//
// `biome` picks the generated artwork style for the listing card
// (see src/lib/landscape.js). If a listing has no entry here, it falls back
// to the country defaults below so new listings still render.

const BY_URL = {
  // ---- for sale ----
  'https://www.thejaguarproject.com/conservation-properties/rara-avis/': { lat: 10.28, lng: -84.05, biome: 'rainforest' },
  'https://sircostarica.com/property/2500-acre-conservation-land-with-precious-woods/': { lat: 9.85, lng: -83.25, biome: 'rainforest' },
  'https://ecorealtorscr.com/property/reserve-of-531-ha-primary-forest-for-preservation-sarapiqui/': { lat: 10.39, lng: -84.12, biome: 'rainforest' },
  'https://www.ecuadorbeachfrontproperty.com/listings/index.php/listings-home/all-for-sale/land/hacienda-santa-clara-414': { lat: -0.46, lng: -80.45, biome: 'coast' },
  'https://www.tranzon.com/atlas26109': { lat: 17.88, lng: -88.33, biome: 'coast' },
  'https://501properties.com/properties/pf0011-13000-acres-of-exceptional-ecological-value/': { lat: 17.75, lng: -88.95, biome: 'rainforest' },
  'https://inthetropics.net/property-listings/conservation-acreage-critical-habitat/': { lat: 17.25, lng: -88.38, biome: 'rainforest' },
  'https://campospatagonia.cl/3-700-has-en-venta-a-orilla-de-lago-ohiggins-patagonia-chilena/': { lat: -48.9, lng: -72.6, biome: 'patagonia' },
  'https://www.chileinvestments.com/southern-patagonia-chile-real-estate/': { lat: -44.73, lng: -72.68, biome: 'patagonia' },
  'https://www.arecopatagonico.com/principal/estancia-de-16000-ha-en-lago-san-mart%C3%ADn-santa-cruz': { lat: -49.1, lng: -72.05, biome: 'patagonia' },
  'https://www.rightmove.co.uk/properties/168517760': { lat: 57.03, lng: -4.08, biome: 'highland' },
  'https://liivra.com/listings/43a4abb5-8097-445d-bd9a-68b3d39a104a': { lat: -32.68, lng: 28.38, biome: 'savanna' },
  'https://wildnetafrica.com/south-africa/private-game-reserve-waterberg-0240/': { km: 50, lat: -24.2, lng: 28.0, biome: 'savanna' },
  'https://chaozao.com.br/imovel/fazenda-em-novo-aripuana-amazonas-com-area-de-2377-ha-r-522940-cod-5UXWPI/': { km: 32, months: [6, 7, 8, 9], lat: -5.12, lng: -60.38, biome: 'river' },
  'https://www.bayleys.co.nz/listings/rural/canterbury/ashburton/-manuka-point--methven-5523056': { lat: -43.4, lng: 171.4, biome: 'alpine' },
  'https://www.farmproperty.com.au/property/35131/lot-215-blackwattle-road-frankland-river-wa-6396': { km: 50, lat: -34.36, lng: 117.08, biome: 'bush' },
  'https://www.dudley-estates.com/property/dehesa-with-598-hectares/': { lat: 37.26, lng: -6.52, biome: 'dehesa' },
  'https://www.inmobiliaria-santander.com/property/finca-propiedad-forestal-y-de-conservacion-en-peten': { km: 60, lat: 16.33, lng: -89.42, biome: 'rainforest' },
  'https://www.all-real-estate.com/property-details/700-hectares-of-peruvian-rainforest-title-deed-available-74181': { km: 70, lat: -3.75, lng: -73.25, biome: 'river' },

  // ---- candidates under review ----
  'https://ecorealtorscr.com/property/biological-reserve-private-forest-of-386-ha-and-small-lodge-for-sale-in-the-cloud-forest-of-sarchi/': { lat: 10.17, lng: -84.33, biome: 'cloudforest' },
  'https://ecorealtorscr.com/property/los-campanos-cloud-forest-reserve/': { lat: 9.75, lng: -83.92, biome: 'cloudforest' },
  'https://polvirealestate.com/three-creek-preserve-malheur-county-eastern-oregon/': { km: 26, lat: 44.25, lng: -117.52, biome: 'desert' },
  'https://ruralargentina.com/venta-finca-en-patagonia-esquel-chubut': { km: 60, lat: -42.91, lng: -71.32, biome: 'patagonia' },
  'https://nordheimer.com/campo-en-venta/6128-ha-lago-posadas-provincia-santa-cruz-campo-venta-turismo-lanares-patagonia/2262389': { lat: -47.55, lng: -71.75, biome: 'patagonia' },
  'https://commercial.leadingre.com/commercial-property/malelane-properties-commercial-sale/58on9': { lat: -25.48, lng: 31.52, biome: 'savanna' },
};

// Country fallbacks: rough centroid, default biome and atlas region.
const BY_COUNTRY = {
  'Costa Rica': { lat: 10.0, lng: -84.0, biome: 'rainforest', region: 'Americas' },
  Ecuador: { lat: -1.5, lng: -78.5, biome: 'rainforest', region: 'Americas' },
  Belize: { lat: 17.2, lng: -88.7, biome: 'rainforest', region: 'Americas' },
  Chile: { lat: -45.0, lng: -72.5, biome: 'patagonia', region: 'Americas' },
  Argentina: { lat: -45.0, lng: -70.0, biome: 'patagonia', region: 'Americas' },
  Brazil: { lat: -5.0, lng: -60.0, biome: 'river', region: 'Americas' },
  Peru: { lat: -5.0, lng: -74.0, biome: 'river', region: 'Americas' },
  Guatemala: { lat: 16.0, lng: -90.0, biome: 'rainforest', region: 'Americas' },
  USA: { lat: 44.0, lng: -117.0, biome: 'desert', region: 'Americas' },
  Scotland: { lat: 57.0, lng: -4.2, biome: 'highland', region: 'Europe' },
  Spain: { lat: 37.3, lng: -6.5, biome: 'dehesa', region: 'Europe' },
  'South Africa': { lat: -26.0, lng: 28.5, biome: 'savanna', region: 'Africa' },
  'New Zealand': { lat: -43.5, lng: 171.0, biome: 'alpine', region: 'Oceania' },
  Australia: { lat: -34.0, lng: 117.0, biome: 'bush', region: 'Oceania' },
};

const DEFAULT = { lat: 0, lng: 0, biome: 'rainforest', region: 'Other' };

export const REGIONS = ['Americas', 'Europe', 'Africa', 'Oceania'];

/** Geo info for a listing: { lat, lng, biome, region }. */
export function placeFor(listing) {
  const country = BY_COUNTRY[listing.country] || DEFAULT;
  const exact = BY_URL[listing.url] || {};
  return {
    lat: exact.lat ?? country.lat,
    lng: exact.lng ?? country.lng,
    biome: exact.biome ?? country.biome,
    region: country.region,
    // Optional wider satellite frame (km) for town-level locations.
    km: exact.km,
    // Optional months (1–12) to prefer, e.g. the dry season in hazy regions.
    months: exact.months,
  };
}

/** Stable, URL-safe id for a listing (used for image files and anchors). */
export function slugFor(listing) {
  return listing.name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
    .replace(/-+$/g, '');
}

/** "10.28° N · 84.05° W" */
export function formatCoords({ lat, lng }) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lng).toFixed(2)}° ${ew}`;
}
