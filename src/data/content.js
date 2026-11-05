// Single source of truth for the site's prose and structured content.
//
// Consumed by:
//   - src/pages/index.astro      (the HTML page)
//   - src/pages/index.md.js      (the Markdown alternate, /index.md)
//   - src/pages/sitemap.xml.js   (the sitemap)
//
// Keeping the copy here means the HTML page and its Markdown/sitemap
// counterparts are generated from the same data and cannot drift apart.
import listings from './listings.json';

export const SITE_URL = 'https://liminalforestsalliance.com';
export const CALENDLY = 'https://calendly.com/dr-benjamin-mv/30min';

export const meta = {
  title: 'Liminal Forests Alliance — Protecting the world’s wild places, for good',
  description:
    'The Liminal Forests Alliance works to secure large, ecologically important wild landscapes worldwide and to place each one in an independent trust, so it stays protected for generations.',
};

export const content = {
  hero: {
    h1Lines: ['Protecting the world’s', 'wild places, for good.'],
    lede:
      'The Liminal Forests Alliance works to secure large, ecologically important wild landscapes around the world — old-growth rainforest, wetlands, wilderness and wildlife corridors — and to place each one in an independent trust, so it stays protected for generations to come.',
    primaryCta: { label: 'Book a 30-minute call', href: CALENDLY },
    ghostCta: { label: 'See the land for sale', href: '/listings' },
    ctaNote: 'Fund an acquisition, contribute land or partner with us. It starts with a short call.',
    // "Right now we're tracking {count} wild landscapes — {hectares} hectares — listed for sale."
    hook: {
      lead: 'Right now we’re tracking',
      landscapes: 'wild landscapes',
      hectares: 'hectares',
      tail: 'listed for sale.',
      after: 'Each one’s future is decided in a single sale.',
    },
  },
  nav: [
    { label: 'Why it matters', href: '#why' },
    { label: 'How it works', href: '#approach' },
    { label: 'Listings', href: '/listings' },
    { label: 'Rewilding', href: '/rewilding' },
    { label: 'Dispatches', href: '/blog' },
    { label: 'Get involved', href: '#involved' },
  ],
  approach: {
    eyebrow: 'How it works',
    title: 'A simple idea: buy wild land, then protect it for generations.',
    lede:
      'Much of the planet’s most important wild land is privately owned — and quietly for sale. Our model is straightforward, and it works in plain steps.',
    steps: [
      {
        n: '01',
        title: 'Find the land',
        body:
          'We track large, ecologically significant properties on the open market — rainforest, wetlands, wilderness and the corridors that connect them.',
      },
      {
        n: '02',
        title: 'Secure it',
        body:
          'Each property is acquired with the single goal of protection — not development, logging or resale.',
      },
      {
        n: '03',
        title: 'Place it in trust',
        body:
          'The land is transferred into an independent trust. The trust holds it for conservation, kept separate from any one owner or company.',
      },
      {
        n: '04',
        title: 'Keep it that way',
        body:
          'Because protection is written into how the land is held, it stays protected for generations — well beyond any of us.',
      },
    ],
    // Labels shown on the illustrated satellite plate, one per step.
    mapLabels: ['Finding the land', 'Boundary secured', 'Held in trust', 'Protected for generations'],
    ringText: 'Held in trust · Protected for conservation · Beyond any one owner · ',
    mapCaption: 'Illustration on Copernicus Sentinel-2 imagery of Sarapiquí, Costa Rica. Not an actual property boundary.',
    cta: { text: 'Questions about how this works?', label: 'Book a 30-minute call' },
  },
  land: {
    eyebrow: 'Land for sale',
    title: 'Landscapes on the market right now.',
    lede:
      'These are real properties currently listed for sale, each handled by an independent broker. Prices are shown as listed by the broker; where a price isn’t publicly confirmed we show “price on request.” Follow each listing to the broker for full details.',
    status: {
      sale: { label: 'On the market', text: 'Listed publicly by independent brokers. We track these properties for their conservation potential.' },
      review: { label: 'Under review', text: 'Also on the market. We’re assessing their conservation value in more detail.' },
    },
    stats: {
      forSale: 'Landscapes on the market',
      hectares: 'Hectares in total',
      countries: 'Countries',
      review: 'Under closer review',
    },
    imageNote:
      'Satellite views show the wider area around each listing, from Copernicus Sentinel-2. They are not property boundaries.',
    priceNote: 'US$ figures are approximate conversions of the broker’s listed price.',
    // Set this when the listings were last checked against the brokers' pages, e.g. 'November 2026'.
    listingsChecked: '',
    filterLabel: 'Filter by region',
    allRegions: 'All regions',
    askLabel: 'Ask about this property',
    viewLabel: 'View the broker’s listing',
  },
  candidates: {
    eyebrow: 'New candidates under review',
    title: 'Landscapes we’re looking at next.',
    lede:
      'Properties we’re currently assessing for their conservation value. Each note below describes the ecological case drawn from the listing itself.',
  },
  why: {
    eyebrow: 'Why it matters',
    title: 'Wild land, once lost, is almost never recovered.',
    lede:
      'Old-growth forests, intact wetlands and unbroken wilderness are the planet’s living strongholds — for the water we drink, the climate we depend on and the species that have nowhere else to go.',
    para:
      'When these places change hands on the open market, their future is decided in a single transaction. The same sale that could clear a forest can instead protect it. By acquiring these landscapes and placing them in independent trusts, we aim to make protection the outcome that lasts — not the exception that fades with the next owner.',
    points: [
      {
        strong: 'Whole landscapes.',
        rest: ' Large, connected areas — not fragments — so ecosystems can function.',
      },
      {
        strong: 'Permanent by design.',
        rest: ' Trust ownership keeps protection in place beyond any individual.',
      },
      {
        strong: 'Worldwide.',
        rest: ' From rainforest to wetland to wilderness corridor, wherever the need is greatest.',
      },
    ],
    // The real satellite "edge" scene that follows the headline.
    scene: {
      forest: 'Unbroken forest.',
      lost: 'One sale can clear a forest…',
      kept: '…or keep it standing, for good.',
      place: 'Upper Xingu basin, Mato Grosso, Brazil',
      caption: 'Forest on the left; land cleared for farming on the right.',
    },
  },
  ways: {
    eyebrow: 'Get involved',
    title: 'Three ways to help.',
    items: [
      {
        title: 'Fund an acquisition',
        body: 'Help fund the purchase of a landscape on the market. Start with a call about the places that matter to you.',
      },
      {
        title: 'Contribute land',
        body: 'Own wild land that should stay wild? Tell us where it is, how large it is and what lives there.',
      },
      {
        title: 'Partner with us',
        body: 'Conservation groups, land trusts, scientists and funders: let’s explore working together.',
      },
    ],
    cta: 'Book a 30-minute call',
  },
  // Who's behind the alliance. Shown only when filled in.
  about: {
    title: 'Who’s behind this',
    people: [], // e.g. [{ name: '…', role: 'Founder' }]
    email: '',
    body: '',
  },
  involved: {
    eyebrow: 'Start a conversation',
    title: 'Help secure the next landscape.',
    lede:
      'Whether you want to help fund an acquisition, contribute land, or explore working together, the alliance is open to conversations. The best place to start is a short call.',
    primaryCta: { label: 'Book a 30-minute call', href: CALENDLY },
    ctaNote: 'Opens a booking page on Calendly in a new tab.',
    ghostCta: { label: 'Browse the land for sale', href: '/listings' },
  },
  footerNote:
    'Protecting the world’s wild places, for good. Property details are provided by independent third-party brokers and are subject to change; confirm all details directly with each broker.',
  credits: {
    satellite: 'Satellite imagery contains modified Copernicus Sentinel data (2021–2025), processed with Microsoft Planetary Computer.',
  },
  // Mailing-list sign-up in the footer.
  // `action`: the sign-up endpoint of your email service (for example a Formspree,
  // Buttondown or Mailchimp form URL). It must accept a POST with an `email`
  // field. While empty, nothing is collected and the form says the list isn't
  // open yet.
  newsletter: {
    title: 'Get occasional updates on the landscapes we’re working to protect.',
    placeholder: 'Enter email address',
    button: 'Sign up',
    action: '',
    success: 'Thank you. You’re on the list.',
    error: 'That didn’t go through. Please try again, or book a call instead.',
    notOpen: 'Our mailing list isn’t open yet, so nothing was saved. For now, the best way to reach us is a short call.',
  },
  // Social profiles shown as icons in the footer, e.g.
  // { network: 'linkedin' | 'youtube' | 'instagram' | 'x' | 'facebook', href: 'https://…' }
  social: [],
  // Legal pages linked in the footer, e.g. { label: 'Privacy Policy', href: '/privacy' }
  legal: [],
};

export { listings };

// HTML pages that exist on the site. Single source for the sitemap and for
// the check script. Each page may advertise a Markdown alternate.
export const pages = [
  { path: '/', md: '/index.md', changefreq: 'weekly', priority: '1.0' },
];

// Build the Markdown alternate of the home page from the same content + data.
export function renderMarkdown() {
  const c = content;
  const out = [];

  out.push(`# ${content.hero.h1Lines.join(' ')}`);
  out.push('');
  out.push(c.hero.lede);
  out.push('');
  out.push(`Canonical page: ${SITE_URL}/`);
  out.push('');
  out.push(
    'Policy: this site permits search and answer crawlers but does not permit AI-training crawlers. See /robots.txt and /llms.txt.',
  );

  out.push('');
  out.push(`## ${c.approach.title}`);
  out.push('');
  out.push(c.approach.lede);
  out.push('');
  for (const s of c.approach.steps) {
    out.push(`${Number(s.n)}. ${s.title} — ${s.body}`);
  }

  // The land listed for sale lives on its own page now (see /listings and
  // /listings.md), so the home Markdown mirrors the home page and does not
  // repeat the inventory here.
  out.push('');
  out.push('## Land for sale');
  out.push('');
  out.push(
    `We track large, ecologically important wild land currently listed for sale by independent brokers. The full, regularly checked inventory is on its own page: ${SITE_URL}/listings (plain text: ${SITE_URL}/listings.md).`,
  );

  out.push('');
  out.push(`## ${c.why.title}`);
  out.push('');
  out.push(c.why.lede);
  out.push('');
  out.push(c.why.para);
  out.push('');
  for (const pt of c.why.points) {
    out.push(`- ${pt.strong}${pt.rest}`);
  }

  out.push('');
  out.push(`## ${c.involved.title}`);
  out.push('');
  out.push(c.involved.lede);
  out.push('');
  out.push(`Request a conversation: ${CALENDLY}`);

  out.push('');
  out.push('---');
  out.push('');
  out.push(c.footerNote);
  out.push('');

  return out.join('\n');
}

// Build the sitemap XML from the page list. Extra pages (e.g. the blog, which
// lives in src/data/blog.js) can be merged in by callers so this module does
// not need to import the blog and risk a circular dependency.
export function renderSitemap(extraPages = []) {
  const urls = [...pages, ...extraPages]
    .map((p) => {
      const loc = `${SITE_URL}${p.path === '/' ? '/' : p.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <changefreq>${p.changefreq}</changefreq>`,
        `    <priority>${p.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
