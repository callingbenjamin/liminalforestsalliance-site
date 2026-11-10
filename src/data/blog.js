// Single source of truth for the blog ("Dispatches").
//
// Consumed by:
//   - src/pages/blog/index.astro      (the /blog index HTML page)
//   - src/pages/blog/[slug].astro     (each post's HTML page)
//   - src/pages/blog.md.js            (the /blog.md Markdown alternate)
//   - src/pages/blog/[slug].md.js     (each post's Markdown alternate)
//   - src/pages/blog/rss.xml.js       (the RSS feed)
//   - src/data/content.js             (adds blog pages to the sitemap)
//
// Same principle as content.js: the HTML, Markdown and feed are all
// generated from this one module so they cannot drift apart.
//
// SOURCING RULE: every fact below (size, price, date, seller, buyer, current
// use) is drawn from the URLs listed in each post's `sources` array. Nothing
// here is invented. Where a figure could not be confirmed in a primary source
// it is described as reported or "not publicly disclosed". Facts are accurate
// as of November 2026 per those sources. See docs/blog-process.md.
import { SITE_URL } from './content.js';
import { plantersPosts } from './blog-planters.js';

export const blogMeta = {
  title: 'Dispatches — Liminal Forests Alliance',
  description:
    'Short, sourced stories about large, wild, ecologically important land that has changed hands, and what each place is used for now.',
  intro:
    'A field notebook on large, wild, ecologically important land that has been sold or handed on, and what became of it. Some stories are conservation wins. Some are cautionary. Each one is sourced, and each one says something about why the way land is held matters as much as who holds it.',
};

const fmt = (n) => n.toLocaleString('en-US');

// Shared closing line relating each story back to the alliance's work.
const DATELINE =
  'The facts in this post are drawn from the cited sources and were accurate as of November 2026.';

export const posts = [
  // 1 -------------------------------------------------------------------
  {
    slug: 'patagonia-national-park-chacabuco',
    title: 'From sheep ranch to national park: the Chacabuco Valley',
    date: '2026-11-04',
    location: 'Chacabuco Valley, Aysén Region, Chile',
    region: 'South America',
    outcome: 'Conservation win',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/chacabuco-guanaco", width: 1200, height: 800, alt: "A guanaco with a pale brown coat browsing low shrubs among dry grass.", caption: "A guanaco browsing in Patagonia National Park, which now covers the former Chacabuco ranch, March 2019.", author: "Natalia Reyes Escobar", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Guanaco_(Lama_guanicoe)_en_el_Parque_Nacional_Patagonia.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/chacabuco-guanaco", width: 1200, height: 800, alt: "A guanaco with a pale brown coat browsing low shrubs among dry grass.", focus: "45% 45%", credit: "Photo: Natalia Reyes Escobar, CC BY-SA 4.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:Guanaco_(Lama_guanicoe)_en_el_Parque_Nacional_Patagonia.jpg"},
    size_ha: 70600,
    size_acres: 174457,
    price: 'US$10 million (2004 purchase); donated to Chile in 2018',
    saleDate: 'Purchased 2004; gifted to the Chilean state in 2018',
    seller: 'The de Smet family, owners of the Estancia Valle Chacabuco since 1980',
    buyer: 'Conservación Patagónica (founded by Kris and Doug Tompkins), which later donated the land to Chile',
    currentUse:
      'The core of Parque Nacional Patagonia, a Chilean national park managed by the national forestry agency CONAF.',
    summary:
      'One of Chile’s largest sheep ranches was bought in 2004, restored, and given to the state. Today the Chacabuco Valley is the heart of Patagonia National Park.',
    lead:
      'For most of the twentieth century the Chacabuco Valley, deep in Chilean Patagonia, was one of the largest sheep ranches in the country. Today it is the heart of a national park, and the way that happened is a small lesson in how wild land is actually saved.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'In 2004 the conservationists Kris and Doug Tompkins, through their organisation Conservación Patagónica, bought the roughly 70,600 hectare Estancia Valle Chacabuco from the de Smet family, who had run it as a sheep operation since 1980. Contemporary reporting put the price at about US$10 million, a figure that included the ranch’s livestock as well as its land.',
          'The valley sits between two existing reserves, and buying it joined them into a single protected block of roughly 260,000 hectares. Over the following years the new owners pulled out hundreds of kilometres of fencing, retired the sheep, and let the grasslands and their guanacos, pumas and huemul deer recover.',
        ],
      },
      {
        heading: 'What it is used for now',
        paras: [
          'In 2018 the Tompkins organisation donated the Chacabuco land to the Chilean state, which combined it with public land to create Parque Nacional Patagonia. The park is now managed by Chile’s national forestry corporation, CONAF, and is open to the public, with trails, campgrounds and a visitor centre built during the restoration years.',
          'The work that made that possible was slow and physical. Fences came down by the hundreds of kilometres, the sheep were sold off, and the valley’s grasslands were left to recover along with the guanacos, pumas and endangered huemul deer that depend on them. By the time the land was handed over, it no longer looked or functioned like a ranch.',
          'It is, in other words, no longer private at all. The protection does not depend on the goodwill of a single wealthy owner, because ownership has passed to the nation and the land has a legal status that is hard to undo.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Liminal Forests Alliance follows a simple idea: secure large, ecologically important wild land, then place each property in an independent trust so that protection outlasts any one owner. The Chacabuco story is a vivid version of the same instinct. A private purchase was only ever the first step. The lasting protection came from changing how the land is held, moving it into a structure, in this case a national park, designed to keep it wild for good.',
          'It also shows the scale of patience involved. Nearly fifteen years passed between the purchase and the handover, with restoration happening all the while. A trust model builds that patience in, because the holding structure, not a person’s lifespan or balance sheet, is what carries the land forward.',
          'There is one more detail worth sitting with. The valley was bought because it sat between two existing reserves, and buying it knitted them into a single large block. Protecting whole, connected landscapes rather than isolated fragments is the point, and it usually means acquiring the private parcel in the middle that no public body happened to own. That is precisely the kind of gap the alliance looks to fill.',
        ],
      },
    ],
    sources: [
      {
        title: 'Rewilding Chile — Patagonia National Park project',
        url: 'https://www.rewildingchile.org/en/projects/patagonia-national-park/',
      },
      {
        title: 'Patagonia National Park (Chile) — Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Patagonia_National_Park_(Chile)',
      },
      {
        title: 'Sierra Club — The fashion executives who saved a Patagonian paradise',
        url: 'https://www.sierraclub.org/sierra/2019-5-september-october/feature/fashion-executives-who-saved-patagonian-paradise-doug-kris-tompkins',
      },
      {
        title: 'Uvalde Leader-News — Conservationists married passion, fortunes to save Patagonia',
        url: 'https://www.uvaldeleadernews.com/articles/conservationists-married-passion-fortunes-to-save-patagonia/',
      },
    ],
  },

  // 2 -------------------------------------------------------------------
  {
    slug: 'valdivian-coastal-reserve',
    title: 'A rainforest saved at auction: Chile’s Valdivian coast',
    date: '2026-11-04',
    location: 'Los Ríos Region, Chile',
    region: 'South America',
    outcome: 'Conservation win',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/valdivian-coast", width: 1200, height: 845, alt: "Dense green forest running down to a rocky Pacific shore under a grey sky.", caption: "Coastal forest meeting the Pacific in the Valdivian Coastal Reserve, Los Ríos, April 2015.", author: "Natalia Reyes Escobar", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Reserva_Costera_Valdiviana_03.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/valdivian-coast", width: 1200, height: 845, alt: "Dense green forest running down to a rocky Pacific shore under a grey sky.", focus: "50% 50%", credit: "Photo: Natalia Reyes Escobar, CC BY-SA 4.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:Reserva_Costera_Valdiviana_03.jpg"},
    size_ha: 60000,
    size_acres: 148000,
    price: 'Not officially disclosed; reported by WWF at about US$7.5 million',
    saleDate: 'Public auction, November 2003',
    seller: 'The bankrupt forestry company Bosques S.A., whose chief creditor was the Fleet Bank of Boston',
    buyer: 'The Nature Conservancy, working with WWF',
    currentUse:
      'A private protected area managed by The Nature Conservancy; about 10,000 hectares were donated in 2012 to help create Alerce Costero National Park.',
    summary:
      'A temperate rainforest with approval to be felled for pulp plantations was bought at a bankruptcy auction in 2003 by The Nature Conservancy, and is now a protected reserve.',
    lead:
      'In 2003 a stretch of Chilean temperate rainforest came up for auction because the company that owned it had gone bankrupt. The forest had permits to be cut down and replaced with eucalyptus for paper pulp. Instead it was bought to be kept standing.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'The property, roughly 60,000 hectares on the Pacific coast of what is now the Los Ríos Region, had belonged to the forestry firm Bosques S.A. When the company failed, its land went to a public auction controlled by its main creditor, the Fleet Bank of Boston. The Nature Conservancy, with WWF, bought it in late 2003. The purchase price was not officially disclosed, though WWF has been reported as putting it at about US$7.5 million.',
          'What made the deal urgent was the alternative. The native evergreen and alerce forest had approvals to be felled and converted to plantation, and a coastal road was planned straight through it. The sale turned a logging prospect into a reserve.',
        ],
      },
      {
        heading: 'What it is used for now',
        paras: [
          'The land became the Valdivian Coastal Reserve, a private protected area that The Nature Conservancy still manages, working with neighbouring fishing villages and Indigenous communities. Restoration here has meant the slow job of converting old eucalyptus stands back toward native forest. In 2012 about 10,000 hectares were donated to the state to help form Alerce Costero National Park, so part of the original purchase is now public land as well.',
          'What is protected is unusually old. The forest includes alerce, a long-lived southern conifer, alongside the dense evergreen rainforest of the coastal range. That combination is part of why the threat of felling it for pulp plantation, and of running a new road through the heart of it, was treated as a loss that could not be recovered rather than a routine change of land use.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Valdivian purchase is a reminder that the open market decides the fate of a lot of wild land, and often on a very short clock. The same auction that could have delivered the forest to a pulp producer delivered it to a conservation buyer instead. That is exactly the moment the Liminal Forests Alliance is built to act in.',
          'It is also a model for what comes after the purchase. By holding the reserve long term and placing a slice of it into a national park, the owners made protection the land’s default state rather than a temporary arrangement. Securing the land and then fixing how it is held, so the next owner cannot simply reverse the decision, is the whole point of the trust approach.',
          'The circumstances are worth noting too. This land reached the market because its owner went bankrupt, not because anyone set out to sell a rainforest. Wild land often becomes available through distress, insolvency, inheritance or a quiet listing, and whoever is ready to act in that window decides what the place becomes. Being ready, with the means to buy and a structure to hold, is most of the work.',
        ],
      },
    ],
    sources: [
      {
        title: 'The Nature Conservancy — Valdivian Coastal Reserve',
        url: 'https://www.nature.org/en-us/about-us/where-we-work/latin-america/chile/valdivian-coastal-reserve/',
      },
      {
        title: 'Valdivian Coastal Reserve — Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Valdivian_Coastal_Reserve',
      },
      {
        title: 'Earth Island Journal — Saving Chile’s redwoods',
        url: 'https://www.earthisland.org/journal/index.php/magazine/entry/saving_chiles_redwoods/',
      },
      {
        title: 'Conservation Atlas — Where the ocean and the forest meet',
        url: 'https://www.conservationatlas.org/blog/where-the-ocean-and-the-forest-meet-the-valdivian-coastal-reserve2017',
      },
    ],
  },

  // 3 -------------------------------------------------------------------
  {
    slug: 'cumberland-forest-appalachia',
    title: '253,000 acres of Appalachia, bought to keep working',
    date: '2026-11-04',
    location: 'Virginia, Kentucky and Tennessee, United States',
    region: 'North America',
    outcome: 'Conservation win',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/breaks-canyon", width: 1200, height: 900, alt: "A winding river gorge between steep, forested ridges in late winter.", caption: "Breaks Canyon, on the Virginia and Kentucky border, in February 2018: the same central Appalachian forest country. It is a public park, not project land; we found no freely licensed photograph of the project land itself.", author: "Bpluke01", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Breaks_Canyon;_February_2018.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/breaks-canyon", width: 1200, height: 900, alt: "A winding river gorge between steep, forested ridges in late winter.", focus: "50% 45%", credit: "Photo: Bpluke01, CC BY-SA 4.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:Breaks_Canyon;_February_2018.jpg"},
    size_ha: 102386,
    size_acres: 253000,
    price: 'US$130 million',
    saleDate: '2019 (closings in April and July 2019)',
    seller: 'The Forestland Group and Corrigan TLP, both private timberland investment managers',
    buyer: 'The Nature Conservancy, through the Cumberland Forest Limited Partnership managed by its NatureVest arm',
    currentUse:
      'A working-forest conservation project under sustainable, FSC-certified timber management, with public recreation access, mine-land restoration and a forest carbon program.',
    summary:
      'In 2019 The Nature Conservancy assembled 253,000 acres of central Appalachian forest for US$130 million, keeping it as a working, carbon-storing, publicly accessible forest.',
    lead:
      'In 2019 The Nature Conservancy pulled together one of the largest private land conservation deals in the eastern United States: about 253,000 acres of central Appalachian forest, bought for US$130 million. The striking part is what they chose to do with it, which was to keep it working.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'The Cumberland Forest Project is really two purchases stitched together. Roughly 153,000 acres of southwest Virginia highlands came from The Forestland Group, and about 100,000 acres along the Kentucky and Tennessee border came from Corrigan TLP. Both sellers were timberland investment managers. The closings happened in 2019, and the reported total was US$130 million.',
          'The Nature Conservancy structured the deal through an investment vehicle, the Cumberland Forest Limited Partnership, run by its impact-investing arm. That let it raise capital from investors rather than relying on donations alone, which is part of why a purchase at this scale was possible.',
        ],
      },
      {
        heading: 'What it is used for now',
        paras: [
          'Rather than lock the land away, The Nature Conservancy manages it as a working forest under sustainable, FSC-certified timber harvesting, while roughly 149,000 acres are open for public recreation. The project also includes restoration of old mine land and a forest carbon program, with credits sold into California’s cap-and-trade market. The idea is that a well-managed forest can pay part of its own way while still storing carbon and staying intact.',
          'The setting matters. This is coal country, a part of Appalachia where land and work have long been tied to extraction. A conservation project here was pitched not only as a climate measure but as a way to keep forest jobs, recreation and local tax base in place while the energy economy shifts. Protection and livelihood were framed as the same project rather than competing ones.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Cumberland shows that protection does not always mean fencing land off and walking away. A large landscape can keep producing timber, carbon and recreation and still be held for the long term, as long as the ownership structure is built for conservation first. That is the balance the Liminal Forests Alliance aims for when it places land in an independent trust: the trust sets the terms, and compatible uses can continue underneath them.',
          'It also makes the financial case plainly. Protecting land at this scale takes serious money, and a durable holding structure is what lets patient capital and earned income work together over decades. A trust is precisely the vehicle that can carry that mix without drifting back toward development when ownership changes hands.',
          'The sellers here are worth noticing as well. Both were timberland investment managers, the kind of owner for whom land is a financial position to be exited when the fund matures. That is not a criticism so much as a fact of how a great deal of forest is held. It means large forests routinely come up for sale on an investor’s timetable, and that each such moment is a chance for the next owner to be one that intends to keep them.',
        ],
      },
    ],
    sources: [
      {
        title: 'The Nature Conservancy — Cumberland Forest Project',
        url: 'https://www.nature.org/en-us/what-we-do/our-priorities/protect-water-and-land/land-and-water-stories/cumberland-forest-project/',
      },
      {
        title: 'Virginia Center for Investigative Journalism — Big bet: a $130M conservation deal in coal country',
        url: 'https://vcij.org/stories/big-bet-can-a-130m-conservation-deal-in-virginias-coal-country-curb-climate-change-and-lift-appalachia',
      },
      {
        title: 'Cleary Gottlieb — Cumberland Forest Fund acquisition of 253,000 acres',
        url: 'https://www.clearygottlieb.com/news-and-insights/news-listing/cumberland-forest-funds-acquisition-of-253000-acres-of-forestland',
      },
    ],
  },

  // 4 -------------------------------------------------------------------
  {
    slug: 'platinum-rhino-african-parks',
    title: 'The world’s largest rhino farm, handed to conservation',
    date: '2026-11-04',
    location: 'North West Province, South Africa',
    region: 'Africa',
    outcome: 'Conservation win',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/white-rhino-calf", width: 1200, height: 800, alt: "A grey white rhino and her small calf touching noses in tall green grass.", caption: "A white rhino and her calf in Kruger National Park, South Africa, 2024. These are not animals from the Platinum Rhino herd; we found no freely licensed photograph of the property.", author: "Charles J. Sharp", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:White_rhinoceros_(Ceratotherium_simum)_with_calf_Kruger.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/white-rhino-calf", width: 1200, height: 800, alt: "A grey white rhino and her small calf touching noses in tall green grass.", focus: "45% 50%", credit: "Photo: Charles J. Sharp, CC BY-SA 4.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:White_rhinoceros_(Ceratotherium_simum)_with_calf_Kruger.jpg"},
    size_ha: 7800,
    size_acres: 19274,
    price: 'Not publicly disclosed',
    saleDate: 'Announced September 2023',
    seller: 'John Hume, the South African businessman who built the operation',
    buyer: 'African Parks, a conservation non-profit',
    currentUse:
      'A rhino sanctuary where African Parks is phasing out captive breeding and rewilding roughly 2,000 southern white rhino to protected areas across Africa over about a decade.',
    summary:
      'The world’s largest captive rhino operation, home to about 2,000 southern white rhino, was bought by African Parks in 2023 with a plan to release the animals back into the wild.',
    lead:
      'In September 2023 the conservation non-profit African Parks announced it had bought the largest captive rhino breeding operation in the world, a 7,800 hectare property in South Africa carrying around 2,000 southern white rhino. The purchase was less about the land than about what lived on it.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'The operation, known as Platinum Rhino, was built over decades by the businessman John Hume, who had reportedly spent in the region of US$150 million breeding rhino in the hope of protecting the species. By 2023 he could no longer sustain it, and the farm had been put up for auction earlier that year without a successful bid.',
          'African Parks stepped in and acquired the whole operation. The price was not publicly disclosed. What the organisation took on was extraordinary in one sense: the roughly 2,000 animals represent a large share of all the southern white rhino left on Earth.',
        ],
      },
      {
        heading: 'What it is used for now',
        paras: [
          'African Parks has said it will not continue the breeding operation. Instead it plans to phase out captivity and progressively rewild the herd, moving the animals over roughly ten years to well-protected areas across the continent where they can rebuild wild populations. The property, for now, is a holding and staging sanctuary for that long release.',
          'The scale is hard to overstate. The roughly 2,000 animals amount to a meaningful share of all the southern white rhino left anywhere, so the fate of a single South African property briefly became entangled with the prospects of the subspecies as a whole. A failed sale, or a buyer with other plans, would have been a conservation problem measured in the thousands.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Not every conservation purchase is about the acreage. Here the land was the vessel for a living asset that had become too expensive and too fragile to sit with a single private owner. When African Parks took it on, the future of a sizeable fraction of a species stopped depending on one man’s finances.',
          'That is the same risk the Liminal Forests Alliance tries to design out. Wild value held privately is only ever as secure as the owner’s circumstances. Moving it into an institution built to hold it, whether a conservation body or an independent trust, is what converts a vulnerable private holding into something durable. The Platinum Rhino handover is that conversion, carried out under real time pressure.',
          'It is also a reminder that the clock is rarely generous. The operation had already gone to auction once, earlier in 2023, without a successful bid. The years and the money a private owner can pour into a place are finite, and when they run out the asset simply goes to market. Having an institution ready to catch it before that point, rather than scrambling after, is most of what good stewardship actually requires.',
        ],
      },
    ],
    sources: [
      {
        title: 'Phys.org (AFP) — South African rhino farm, world’s largest, saved by NGO',
        url: 'https://phys.org/news/2023-09-safrican-rhino-farm-world-largest.html',
      },
      {
        title: 'Africanews (AFP) — World’s largest rhino farm saved by an NGO',
        url: 'https://www.africanews.com/2023/09/05/south-africa-the-worlds-largest-rhino-farm-saved-by-an-ngo/',
      },
    ],
  },

  // 5 -------------------------------------------------------------------
  {
    slug: 'bon-bon-station-reserve',
    title: 'Bon Bon: a sheep station the size of a small country, retired',
    date: '2026-11-04',
    location: 'Arid South Australia, Australia',
    region: 'Australia and the Pacific',
    outcome: 'Conservation win',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/lake-gairdner", width: 1200, height: 800, alt: "Red soil and grey-green bluebush shrubs in front of a pink salt pan, with a lone tree.", caption: "Red earth, bluebush and a salt pan in Lake Gairdner National Park, about 130 kilometres south of Bon Bon, in 2009. This is not Bon Bon, but it is the same kind of arid salt-lake country; we found no freely licensed photograph of the reserve.", author: "Murray Foubister", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Scene_in_Lake_Gairdner_National_Park,_South_Australia.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/lake-gairdner", width: 1200, height: 800, alt: "Red soil and grey-green bluebush shrubs in front of a pink salt pan, with a lone tree.", focus: "50% 55%", credit: "Photo: Murray Foubister, CC BY-SA 2.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:Scene_in_Lake_Gairdner_National_Park,_South_Australia.jpg"},
    size_ha: 216454,
    size_acres: 534870,
    price: 'A$4 million, including A$2,093,374 from the Australian Government’s National Reserve System program',
    saleDate: '2008',
    seller: 'Paul Blight, the station’s grazier',
    buyer: 'Bush Heritage Australia',
    currentUse:
      'A nature reserve protecting arid-zone salt lakes, mulga shrublands and bluebush plains, and species such as the southern hairy-nosed wombat.',
    summary:
      'In 2008 Bush Heritage Australia bought the 216,454 hectare Bon Bon sheep station for A$4 million and retired it from grazing, turning it into one of the country’s large arid-zone reserves.',
    lead:
      'In 2008 Bush Heritage Australia bought a sheep station in arid South Australia called Bon Bon. At 216,454 hectares it is bigger than many small countries, and the purchase quietly took one of the continent’s large dry landscapes out of production for good.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'Bon Bon had been run as a pastoral station for around 130 years when its grazier, Paul Blight, sold it to Bush Heritage Australia in 2008. The reported price was A$4 million, of which A$2,093,374 came from the Australian Government’s National Reserve System program, with the rest from Bush Heritage and assistance from the South Australian government.',
          'The land spans salt lakes, mulga shrublands and bluebush plains across the arid interior, roughly south of Coober Pedy. It is the kind of country that rarely makes headlines but holds a great deal of life adapted to very little water.',
        ],
      },
      {
        heading: 'What it is used for now',
        paras: [
          'Bush Heritage retired the sheep and now manages Bon Bon as a nature reserve. The focus is on recovery of arid-zone ecosystems and the species that depend on them, including the southern hairy-nosed wombat, the kultarr, and the chestnut-breasted whiteface. Management here is mostly about removing pressures, grazing stock, feral animals, and letting a slow landscape mend.',
          'Arid country like this is easy to undervalue. It carries few people, rarely makes news, and recovers on a timescale measured in decades rather than seasons. But its salt lakes, mulga shrublands and bluebush plains hold species found nowhere else, and because the land is cheap per hectare, a modest sum can protect an enormous area. Bon Bon alone is larger than many national parks.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Bon Bon is a clean example of a private purchase being turned into permanent protection by a body built to hold land for conservation. Bush Heritage did not buy the station to run it differently for a while. It bought it to hold it indefinitely, which is the distinction the Liminal Forests Alliance cares about most.',
          'It is also a case where public money and a conservation holder combined well. A government program funded roughly half the purchase, but the land is held by an independent organisation whose mission is protection. That split, public support flowing into an independent, mission-locked holder, is close to the structure a trust provides, and it is why the protection at Bon Bon does not depend on any single budget cycle or owner.',
          'The economics are quietly encouraging. At A$4 million for more than 216,000 hectares, this was protection bought at a few Australian dollars per hectare, a fraction of what an acre of forest or coastline costs elsewhere in this series. Large, intact, lightly populated landscapes are often the best value conservation money can find, which is one reason the alliance looks well beyond the obvious postcard places.',
        ],
      },
    ],
    sources: [
      {
        title: 'Bush Heritage Australia — Bon Bon Station Reserve',
        url: 'https://www.bushheritage.org.au/places/bon-bon',
      },
      {
        title: 'Bon Bon Reserve — Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Bon_Bon_Reserve',
      },
    ],
  },

  // 6 -------------------------------------------------------------------
  {
    slug: 'brewdog-lost-forest-kinrara',
    title: 'The Lost Forest that lived up to its name',
    date: '2026-11-04',
    location: 'Kinrara, near Aviemore, Cairngorms, Scottish Highlands',
    region: 'Europe',
    outcome: 'Cautionary tale',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/kinrara-dulnain", width: 1024, height: 768, alt: "Open moorland in a Highland valley, with a dark block of conifer woodland on the far slope.", caption: "The upper Dulnain valley on the Kinrara Estate, west of Aviemore, in July 2022, while BrewDog owned the estate. We could not confirm which parts of the estate were planted.", author: "Richard Webb", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:View_down_the_Dulnain,_Kinrara_Estate_-_geograph.org.uk_-_7240806.jpg", via: "Geograph and Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/kinrara-dulnain", width: 1024, height: 768, alt: "Open moorland in a Highland valley, with a dark block of conifer woodland on the far slope.", focus: "50% 50%", credit: "Photo: Richard Webb, CC BY-SA 2.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:View_down_the_Dulnain,_Kinrara_Estate_-_geograph.org.uk_-_7240806.jpg"},
    size_ha: 3765,
    size_acres: 9300,
    price: 'About £8.8 million (widely reported; some reports say £7.5 million or £8.5 million)',
    saleDate: 'Acquisition reported in 2021; estate sold on in 2025',
    seller: 'Marketed through the agents Galbraith; the prior owner is not confirmed in the sources we read',
    buyer: 'BrewDog, the brewery, through a subsidiary; it sold the estate in 2025 to Oxygen Conservation',
    currentUse:
      'No longer BrewDog’s. After more than half the planted trees died, the brewery sold the estate in 2025 to the natural-capital firm Oxygen Conservation, ending its "Lost Forest" carbon-offset scheme.',
    summary:
      'BrewDog bought a Highland estate to plant a carbon-offset forest. More than half the trees died, the scheme was criticised, and the brewery sold up in 2025. A cautionary tale.',
    lead:
      'Around 2021 the brewery BrewDog bought a Highland estate called Kinrara and announced it would plant a forest to offset its carbon, branded the "Lost Forest". The name turned out to be more apt than intended.',
    sections: [
      {
        heading: 'What was bought, and when',
        paras: [
          'BrewDog acquired the roughly 9,300 acre Kinrara estate, in the Cairngorms near Aviemore, in a deal reported in 2021. The price has been given variously, most often as about £8.8 million, though some reports cite £7.5 million or £8.5 million, and the prior owner is not clearly named in the coverage we read. The plan was ambitious: plant large numbers of native trees and generate carbon credits.',
        ],
      },
      {
        heading: 'What went wrong',
        paras: [
          'A great many of the trees did not survive. Reporting, including figures from a freedom of information request, put the losses at more than half the saplings planted, with tens of thousands of trees dead, hit by extreme weather and with Scots pine particularly affected. Critics also noted that planting on peatland can release carbon rather than store it, and that the scheme had drawn substantial public planting grants. By some accounts the project would be a net source of emissions for years before offsetting anything.',
          'In 2025 BrewDog sold the estate to the natural-capital firm Oxygen Conservation, describing the move as an evolution of its environmental strategy. The "Lost Forest" as BrewDog had framed it was over.',
          'Part of the criticism was ecological rather than just bad luck with the weather. Planting trees on peat can disturb a store of carbon that took millennia to accumulate, so a scheme meant to lock carbon away can release it instead, at least for years. By some accounts the project would be a net emitter well into the future before it offset anything, which sat awkwardly with the marketing that launched it.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Kinrara story is a useful corrective. Buying wild land and announcing a green intention is not the same as protecting it. Good outcomes depend on the land being well matched to the plan, the ecology being understood, and the commitment outlasting a single owner’s strategy or news cycle. When the owner’s priorities shifted, the land was simply sold on.',
          'The Liminal Forests Alliance takes the opposite lesson to heart. Protection should not rest on one company’s marketing or one season’s weather. Placing land in an independent trust is meant to remove exactly this fragility, so that the fate of a landscape does not swing with a corporate strategy review. Kinrara is a reminder of why that separation between owner and protection is worth building in from the start.',
          'None of this means the land was ruined, and its new owner may well do good work. The point is narrower. When protection is tied to a single owner’s brand and balance sheet, it inherits that owner’s volatility, and the land can be bought and sold like any other asset the moment the story changes. A holding structure whose only purpose is to keep the land wild is designed not to have a change of heart.',
        ],
      },
    ],
    sources: [
      {
        title: 'The Grocer — Thousands of saplings in BrewDog’s Lost Forest die',
        url: 'https://www.thegrocer.co.uk/news/thousands-of-saplings-in-brewdogs-lost-forest-die/690508.article',
      },
      {
        title: 'Parkswatch Scotland — BrewDog’s Lost Forest at Kinrara: lost trees, lost carbon and lost finances',
        url: 'https://parkswatchscotland.co.uk/2024/02/14/brewdogs-lost-forest-at-kinrara-lost-trees-lost-carbon-and-lost-finances/',
      },
      {
        title: 'The Grocer — BrewDog offloads £8.8m Lost Forest estate',
        url: 'https://www.thegrocer.co.uk/news/brewdog-offloads-88m-lost-forest-estate-in-esg-strategy-evolution/710221.article',
      },
      {
        title: 'Countryside Alliance — Punk beer, dead trees and a Lost Forest',
        url: 'https://www.countryside-alliance.org/features/tim-bonner-punk-beer-dead-trees-and-a-lost-forest-brewdog-sells-highland-estate',
      },
    ],
  },

  // 7 -------------------------------------------------------------------
  {
    slug: 'chiquitano-dry-forest-inpa',
    title: 'An island of forest, and the soy frontier closing in',
    date: '2026-11-04',
    location: 'Chiquitano dry forest, Santa Cruz Department, Bolivia',
    region: 'South America',
    outcome: 'Cautionary tale',
    // Free-licensed photo (made by scripts/gen-blog-photos.mjs), shown at the
    // top of the post and on its /blog card.
    photos: [{src: "/media/blog/dispatches/chiquitania", width: 1200, height: 900, alt: "A sandstone overhang above a wide plain of green forest under a cloudy sky.", caption: "Looking out over forested plains in the Chiquitania from Santiago de Chiquitos, Bolivia, February 2025. This is not the INPA property; we found no freely licensed photograph of it.", author: "Ruditaly", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Vista_desde_Las_Pozas_de_Santiago_de_Chiquitos_-_Bolivia.jpg", via: "Wikimedia Commons"}],
    cover: {src: "/media/blog/dispatches/chiquitania", width: 1200, height: 900, alt: "A sandstone overhang above a wide plain of green forest under a cloudy sky.", focus: "60% 50%", credit: "Photo: Ruditaly, CC BY-SA 4.0.", creditUrl: "https://commons.wikimedia.org/wiki/File:Vista_desde_Las_Pozas_de_Santiago_de_Chiquitos_-_Bolivia.jpg"},
    size_ha: 30019,
    size_acres: 74179,
    price: 'Reported at about US$20 million, with a US$2 million deposit (preliminary; not confirmed by the parties)',
    saleDate: 'Agreement reported in July 2025; sale contested and not confirmed finalised',
    seller: 'INPA Parket, a Bolivian affiliate of a Dutch wood-flooring maker owned by the Roosenboom family',
    buyer: 'Reported to be Bom Futuro, a Brazilian agribusiness group; the sale is contested',
    currentUse:
      'FSC-certified, selectively logged native dry forest. The reported buyer intends to clear much of it for agriculture, and nearby Indigenous organisations are preparing legal and regulatory challenges.',
    summary:
      'A 30,019-hectare patch of Bolivian dry forest, kept intact for two decades under sustainable logging, was reportedly being sold to a soy producer who plans to clear much of it. The deal is contested.',
    lead:
      'In the Chiquitano dry forest of eastern Bolivia sits a 30,019 hectare patch of woodland that has stayed intact for about two decades, while much of the land around it was cleared. In 2025 reporting emerged that it was being sold, and that the buyer intended to cut much of it down.',
    sections: [
      {
        heading: 'What is being sold, and to whom',
        paras: [
          'The forest is held by INPA Parket, the Bolivian affiliate of a Dutch wood-flooring company owned by the Roosenboom family. For roughly twenty years it was managed under FSC certification for selective, sustainable hardwood logging, which is part of why it survived as an island of forest while neighbouring land was converted to farmland.',
          'According to Mongabay, an agreement reported in July 2025 would sell the property for about US$20 million, with a US$2 million deposit said to have been placed. The reported buyer is Bom Futuro, a large Brazilian agribusiness group associated with the Maggi soy family. Bom Futuro did not respond to Mongabay, Revista Nómadas could not get either party to confirm the sale, and it was described as pending rather than closed. Mongabay also reported that a conservation-minded buyer, the Swedish agroforestry investor Amazonas For Life Europe AB, had been in talks to buy the land earlier in 2025 with backing from Dutch lenders, before the owner agreed to sell to Bom Futuro instead.',
        ],
      },
      {
        heading: 'What it would mean',
        paras: [
          'The reported plan is to clear a large share of the forest, by some accounts around two-thirds, for soy and other agriculture. Revista Nómadas found that within 40 kilometres of the property, deforestation averaged more than 10,000 hectares a year between 2021 and 2023, so this parcel is one of the last large intact pieces in its area. Nearby Indigenous organisations in Lomerío, with legal support from the Jenecherú Foundation, have been preparing a petition to Bolivia’s forest and land regulator to halt any land-use change; clearing would also require approvals from that regulator and the Santa Cruz government. As of late 2025 the outcome was unresolved.',
          'The Chiquitano dry forest is less famous than the Amazon to its north, but it is one of the largest and best preserved tropical dry forests left in the world, and it has been losing ground fast to the soy and cattle frontier. An intact block of 30,000 hectares inside that frontier is not an ordinary parcel. It is the kind of keystone piece whose fate shapes everything around it, which is partly why the reported deal drew the attention it did.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'This is the cautionary case in its sharpest form. Two decades of careful management kept the forest standing, but careful management is not the same as permanent protection. Because the land was an ordinary private asset, a single sale could put everything about it back on the table, including whether it stays a forest at all.',
          'There is a painful irony in the detail. The forest survived precisely because its owner logged it gently and held it under a sustainable certification, which kept it as forest rather than farmland. Yet that same private ownership is what now allows it to be sold to a buyer who may clear it. Responsible use bought time, but it did not buy permanence, and the two are easy to confuse.',
          'The Liminal Forests Alliance exists for exactly this gap. If a landscape like this were secured and placed in an independent trust, its wild status would no longer be one transaction away from reversal. The Chiquitano parcel shows what is at stake when it is not: good stewardship, undone at the point of sale. Buying such land and locking its protection into how it is held is the difference between a forest that happens to have survived and one that is meant to.',
        ],
      },
    ],
    sources: [
      {
        title: 'Mongabay — The land deal threatening a vital piece of Bolivia’s Chiquitano dry forest',
        url: 'https://news.mongabay.com/2025/11/the-land-deal-threatening-a-vital-piece-of-bolivias-chiquitano-dry-forest/',
      },
      {
        title: 'Revista Nómadas — Bom Futuro en Bolivia: el gigante de la soya deja en vilo a INPA',
        url: 'http://revistanomadas.com/bom-futuro-en-bolivia-el-gigante-de-la-soya-brasilena-deja-en-vilo-a-inpa-una-isla-de-bosque-de-30-019-hectareas-en-la-chiquitania/',
      },
    ],
  },

  // 8+ ------------------------------------------------------------------
  // "They planted forests by hand" series: a hub post plus one story per
  // forest maker. Kept in its own module; see src/data/blog-planters.js.
  ...plantersPosts,
];

// Page entries for the sitemap (HTML pages, each advertising a .md alternate).
// Merged into the sitemap by src/pages/sitemap.xml.js so content.js does not
// need to import this module (which would create a circular dependency).
export const blogPages = [
  { path: '/blog', md: '/blog.md', changefreq: 'weekly', priority: '0.8' },
  ...posts.map((p) => ({
    path: postPath(p.slug),
    md: postMdPath(p.slug),
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

export function postPath(slug) {
  return `/blog/${slug}`;
}
export function postUrl(slug) {
  return `${SITE_URL}/blog/${slug}`;
}
export function postMdPath(slug) {
  return `/blog/${slug}.md`;
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

const areaLine = (p) => `${fmt(p.size_ha)} ha / ${fmt(p.size_acres)} ac`;

/** Land-sale dispatches have size and sale facts; feature posts do not. */
export function isSalePost(p) {
  return typeof p.size_ha === 'number';
}

/** The short line under a post title in lists: location, plus area for sales. */
export function listLine(p) {
  return isSalePost(p) ? `${p.location} · ${areaLine(p)}` : p.location;
}

// Profile photos are stored as <src>-800.webp and <src>-1200.webp (the 1200
// file may be narrower when the original was smaller; `width` is its width).
export function photoSrcset(photo) {
  if (photo.width <= 800) return `${photo.src}-1200.webp ${photo.width}w`;
  return `${photo.src}-800.webp 800w, ${photo.src}-1200.webp ${Math.min(1200, photo.width)}w`;
}

/** Plain-text credit for a profile photo (used by the Markdown alternate). */
export function photoCredit(photo) {
  const via = photo.via ? `, via ${photo.via}` : '';
  const cropped = photo.cropped ? '; cropped' : '';
  return `${photo.creditLabel ?? 'Photo'}: ${photo.author} (${photo.license}${via}${cropped}). Source: ${photo.source}`;
}

// ---- Markdown rendering (shared by the .md alternates) --------------------

function imageLines(photos = []) {
  return photos.flatMap((ph) => [`Image: ${ph.alt} ${ph.caption ?? ''} ${photoCredit(ph)}`.replace(/\s+/g, ' '), '']);
}

function beforeAfterLines(ba) {
  if (!ba) return [];
  return [`Before and after: ${ba.before.label} compared with ${ba.after.label}. ${ba.caption ?? ''} ${ba.credit ?? ''}`.trim(), ''];
}

function factLines(p) {
  return [
    `- Location: ${p.location}`,
    `- Size: ${areaLine(p)}`,
    `- Sale price: ${p.price}`,
    `- Sale date: ${p.saleDate}`,
    `- Seller: ${p.seller}`,
    `- Buyer: ${p.buyer}`,
    `- Current use: ${p.currentUse}`,
    `- Outcome: ${p.outcome}`,
  ];
}

export function renderPostMarkdown(p) {
  const out = [];
  out.push(`# ${p.title}`);
  out.push('');
  out.push(`_Published ${p.date} · ${p.location} · ${p.outcome}_`);
  out.push('');
  out.push(`Canonical page: ${postUrl(p.slug)}`);
  out.push('');
  const parent = p.partOf ? getPost(p.partOf) : null;
  if (parent) {
    out.push(`Part of the series "${parent.title}": ${postUrl(parent.slug)}`);
    out.push('');
  }
  out.push(p.lead);
  out.push('');
  out.push(...imageLines(p.photos));
  if (isSalePost(p)) {
    out.push('## Property at a glance');
    out.push('');
    out.push(...factLines(p));
    out.push('');
  } else if (p.glance) {
    out.push('## At a glance');
    out.push('');
    for (const [k, v] of p.glance) out.push(`- ${k}: ${v}`);
    out.push('');
  }
  for (const para of p.intro ?? []) {
    out.push(para);
    out.push('');
  }
  const series = (p.series ?? []).map(getPost).filter(Boolean);
  if (series.length) {
    out.push(`## ${p.seriesHeading ?? 'The stories'}`);
    out.push('');
    for (const c of series) out.push(`- [${c.title}](${postUrl(c.slug)}) (${c.location}): ${c.summary}`);
    out.push('');
  }
  for (const s of p.sections) {
    out.push(`## ${s.heading}`);
    out.push('');
    for (const para of s.paras) {
      out.push(para);
      out.push('');
    }
    out.push(...imageLines(s.photos));
    out.push(...beforeAfterLines(s.beforeAfter));
    if (s.note) out.push(`_${s.note}_`, '');
  }
  out.push(`## ${p.sourcesHeading ?? 'Sources'}`);
  out.push('');
  for (const s of p.sources) {
    out.push(`- [${s.title}](${s.url})`);
  }
  out.push('');
  out.push('---');
  out.push('');
  out.push(DATELINE);
  out.push('');
  out.push(
    'Part of the Liminal Forests Alliance dispatches. This site permits search and answer crawlers but does not permit AI-training crawlers. See /robots.txt and /llms.txt.',
  );
  out.push('');
  return out.join('\n');
}

export function renderBlogIndexMarkdown() {
  const out = [];
  out.push(`# ${blogMeta.title}`);
  out.push('');
  out.push(blogMeta.intro);
  out.push('');
  out.push(`Canonical page: ${SITE_URL}/blog`);
  out.push('');
  out.push('## Posts');
  out.push('');
  for (const p of posts) {
    out.push(`### ${p.title}`);
    out.push(`- Published: ${p.date}`);
    out.push(`- Location: ${p.location}`);
    out.push(`- Outcome: ${p.outcome}`);
    out.push(`- Summary: ${p.summary}`);
    out.push(`- Read: ${postUrl(p.slug)}`);
    out.push(`- Markdown: ${SITE_URL}${postMdPath(p.slug)}`);
    out.push('');
  }
  out.push('---');
  out.push('');
  out.push(DATELINE.replace('post', 'blog'));
  out.push('');
  return out.join('\n');
}

// ---- RSS 2.0 feed ---------------------------------------------------------

const xmlEscape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// RFC-822 date; fixed midnight UTC so the build is deterministic.
function rfc822(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dt = new Date(Date.UTC(y, m - 1, d));
  return `${days[dt.getUTCDay()]}, ${String(d).padStart(2, '0')} ${months[m - 1]} ${y} 00:00:00 GMT`;
}

export function renderBlogRss() {
  const items = posts
    .map((p) =>
      [
        '    <item>',
        `      <title>${xmlEscape(p.title)}</title>`,
        `      <link>${postUrl(p.slug)}</link>`,
        `      <guid isPermaLink="true">${postUrl(p.slug)}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <description>${xmlEscape(p.summary)}</description>`,
        '    </item>',
      ].join('\n'),
    )
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xmlEscape(blogMeta.title)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${xmlEscape(blogMeta.description)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}
