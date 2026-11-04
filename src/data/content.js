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
    'The Liminal Forests Alliance secures large, ecologically important wild landscapes worldwide and places each one in an independent trust, so it stays protected for generations.',
};

export const content = {
  hero: {
    eyebrow: 'Part of Liminal Commons · Anthrōpico',
    h1Lines: ['Protecting the world’s', 'wild places, for good.'],
    lede:
      'The Liminal Forests Alliance secures large, ecologically important wild landscapes around the world — old-growth rainforest, wetlands, wilderness and wildlife corridors — and places each one in an independent trust, so it stays protected for generations to come.',
    primaryCta: { label: 'See land for sale', href: '#land' },
    ghostCta: { label: 'How the trust works', href: '#approach' },
  },
  approach: {
    eyebrow: 'The approach',
    title: 'A simple idea: buy wild land, then protect it forever.',
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
  },
  land: {
    eyebrow: 'Land for sale',
    title: 'Landscapes on the market right now.',
    lede:
      'These are real properties currently listed for sale, each handled by an independent broker. Prices are shown as listed by the broker; where a price isn’t publicly confirmed we show “price on request.” Follow each listing to the broker for full details.',
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
  },
  involved: {
    eyebrow: 'Get involved',
    title: 'Help secure the next landscape.',
    lede:
      'Whether you want to help fund an acquisition, contribute land, or explore working together, the alliance is open to conversations. The best place to start is a short call.',
    primaryCta: { label: 'Request a conversation', href: CALENDLY },
    ghostCta: { label: 'Browse the land', href: '#land' },
  },
  footerNote:
    'Protecting the world’s wild places, for good. Property details are provided by independent third-party brokers and are subject to change; confirm all details directly with each broker.',
};

export { listings };

// HTML pages that exist on the site. Single source for the sitemap and for
// the check script. Each page may advertise a Markdown alternate.
export const pages = [
  { path: '/', md: '/index.md', changefreq: 'weekly', priority: '1.0' },
];

const fmt = (n) => n.toLocaleString('en-US');

function listingToMarkdown(p) {
  const price = p.price_note ? `${p.price} (${p.price_note})` : p.price;
  const area = `${fmt(p.size_ha)} ha / ${fmt(p.size_acres)} ac`;
  const lines = [
    `### ${p.name}`,
    `- Location: ${p.location}`,
    `- Area: ${area}`,
    `- Price: ${price}`,
    `- Broker: ${p.broker}`,
  ];
  if (p.ecological_case) lines.push(`- Ecological case: ${p.ecological_case}`);
  lines.push(`- Listing: ${p.url}`);
  return lines.join('\n');
}

// Build the Markdown alternate of the home page from the same content + data.
export function renderMarkdown() {
  const c = content;
  const out = [];

  out.push(`# ${content.hero.h1Lines.join(' ')}`);
  out.push('');
  out.push(`_${c.hero.eyebrow}_`);
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

  out.push('');
  out.push(`## ${c.land.title}`);
  out.push('');
  out.push(c.land.lede);
  out.push('');
  for (const p of listings.for_sale) {
    out.push(listingToMarkdown(p));
    out.push('');
  }

  out.push(`## ${c.candidates.title}`);
  out.push('');
  out.push(c.candidates.lede);
  out.push('');
  for (const p of listings.new_candidates) {
    out.push(listingToMarkdown(p));
    out.push('');
  }

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

// Build the sitemap XML from the page list.
export function renderSitemap() {
  const urls = pages
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
