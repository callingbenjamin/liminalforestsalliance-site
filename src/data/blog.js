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

  // 8 -------------------------------------------------------------------
  // A feature post: profiles instead of a single property. No sale facts, so
  // no "Property at a glance" box. Photos are free-licensed (mostly Wikimedia
  // Commons) and credited beside each image; files are made by
  // scripts/gen-blog-photos.mjs. Satellite pairs are public-domain Landsat,
  // made by scripts/gen-blog-satellite.mjs (scene IDs listed there).
  // Figures were checked against the sources on 2026-11-09; several widely
  // shared claims about these people were corrected (see each profile).
  {
    slug: 'people-who-planted-forests',
    title: 'They planted forests by hand. Who keeps them now?',
    date: '2026-11-09',
    location: 'India, Brazil, Burkina Faso, China, Kenya and France',
    region: 'Around the world',
    outcome: 'Restoration',
    summary:
      'Ten real people and one fictional shepherd who turned bare ground into forest, with photographs and satellite before-and-after views. Several have died since 2023, and their forests show how much depends on the way land is held.',
    lead:
      'Most dispatches here are about land that changed hands. This one is about land that changed state: a bare river sandbar, worn-out cattle pasture and crusted Sahel soil turned back into forest by people with seeds, buckets and decades of patience. There are ten real people in it and one fictional shepherd. Several of the real ones have died since 2023, which makes a quieter question hard to avoid. Once the planter is gone, what keeps the forest standing?',
    intro: [
      'A note on the pictures. Every photograph is freely licensed and credited beside it, mostly from Wikimedia Commons. Where a forest is large enough to see from orbit and its location is known, there is a before-and-after view of the same ground made from public Landsat satellite imagery; drag the divider, or use the arrow keys, to compare the years. Some famous before-and-after photographs, such as Instituto Terra’s, are copyrighted, so they are not reproduced here. Where no honest comparison exists, we say so.',
      'Several figures that circulate widely about these people turned out to be wrong or overstated, from a forest’s size to the planter’s name. The versions below follow the sources cited under each profile, and where accounts disagree, we say that too.',
    ],
    profiles: [
      {
        id: 'jadav-payeng',
        name: 'Jadav Payeng',
        country: 'India',
        place: 'Molai Forest, on a Brahmaputra sandbar near Kokilamukh, Jorhat, Assam, India',
        glance: [
          ['Began', '1979'],
          ['Area', 'About 550 ha (1,360 acres)'],
          ['Protection', 'None in law'],
          ['Today', 'Still tended by Payeng'],
        ],
        photos: [
          {
            src: '/media/blog/planters/payeng-sandbar',
            width: 736,
            height: 920,
            alt: 'Jadav Payeng crouching on a driftwood trunk on open, bare river sand.',
            caption: 'Payeng on open Brahmaputra sand in 2015, on a trunk carried down by the river.',
            author: 'Itshuman',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:JadavPayeng.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
          {
            src: '/media/blog/planters/payeng',
            width: 960,
            height: 1200,
            alt: 'Close portrait of Jadav Payeng in a knitted cap and red shawl, with forest behind him.',
            caption: 'Payeng in the Molai Forest, January 2026.',
            author: 'JyotiPN',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Forest_Man_of_India_-_Jadav_Payeng_DSC_5008.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
        ],
        paras: [
          'In 1979 Jadav Payeng planted about twenty bamboo seedlings on a bare sandbar in the Brahmaputra, a few kilometres from his village of Kokilamukh. A state social-forestry scheme began planting 200 hectares of the same ground in 1980 and dropped it about three years later. Payeng kept going on his own, and has kept going ever since.',
          'The forest that grew there is named Molai, after his nickname. It now covers roughly 550 hectares, about 1,360 acres, with more than 300 hectares of bamboo alone. By his own account and press reports, a herd of around a hundred elephants spends part of each year there, and rhinos, Bengal tigers, deer and vultures have been seen. He received the Padma Shri, one of India’s highest civilian honours, in 2015.',
          'What the forest does not have is legal protection. In 2018 Mongabay reported that because it is not an officially protected forest, no guards are assigned to it. Payeng has himself been wary of a formal status that might shut out local people, and has spoken instead of a community reserve. In December 2025 a fire burned about 1.25 hectares of a newer plantation that he and his daughter started nearby in 2021 and 2022, destroying more than 5,000 saplings. Local people alleged arson linked to sand mining. That has not been proven, and the district suspended sand mining while it investigated.',
        ],
        note: 'No before-and-after view here: between the 1980s and today the river has reshaped the whole island, so a satellite comparison mostly shows the river moving, not the forest growing.',
        sources: [
          { title: 'Mongabay India — Mulai Kathoni, a young man’s dream, is now a thriving people’s forest (2018)', url: 'https://india.mongabay.com/2018/05/mulai-kathoni-a-young-mans-dream-is-now-a-thriving-peoples-forest/' },
          { title: 'Jadav Payeng — Wikipedia', url: 'https://en.wikipedia.org/wiki/Jadav_Payeng' },
          { title: 'Molai forest — Wikipedia', url: 'https://en.wikipedia.org/wiki/Molai_forest' },
          { title: 'Pratidin Time — Who burnt the forest built by Jadav Payeng?', url: 'https://www.pratidintime.com/latest-assam-news-breaking-news-assam/who-burnt-the-forest-built-by-jadav-payeng-in-majuli-10954882' },
          { title: 'Land Conflict Watch — Arson, sand mining and the fire at Molai Kathoni 2.0', url: 'https://www.landconflictwatch.org/conflicts/arson-sand-mining-and-the-conservation-the-fire-at-environmentalist-jadav-payeng-s-molai-kathoni-2-0-in-assam' },
        ],
      },
      {
        id: 'antonio-vicente',
        name: 'Antonio Vicente',
        country: 'Brazil',
        place: 'Near São Francisco Xavier, São José dos Campos, São Paulo state, Brazil',
        glance: [
          ['Began', '1973'],
          ['Area', '31 ha (77 acres)'],
          ['Trees', 'About 50,000, his estimate'],
          ['Protection', 'None found'],
        ],
        photos: [
          {
            src: '/media/blog/planters/vicente-trail',
            width: 1200,
            height: 900,
            alt: 'A clear, rocky stream running under dense green Atlantic Forest.',
            caption: 'A stream on the Pouso do Rochedo ecological trail near São Francisco Xavier, 2021. News reports place Vicente’s forest at Pouso do Rochedo. No freely licensed photograph of Vicente himself exists.',
            author: 'Márcia Cristina Machado',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:%C3%81rea_de_Prote%C3%A7%C3%A3o_Ambiental_S%C3%A3o_Francisco_Xavier_-_Marcia_Cristina_Machado_(53).jpg',
            via: 'Wikimedia Commons',
          },
        ],
        paras: [
          'In 1973 Antonio Vicente, a trader and the son of farmers, bought about 31 hectares of hill country in the Serra da Mantiqueira, near the village of São Francisco Xavier, roughly 200 kilometres from the city of São Paulo. The land had been cleared for cattle. He began replanting it with native Atlantic Forest species, including the araucaria pine, while most of his neighbours, by his account, laughed at him.',
          'More than four decades on, he estimates that he has planted about 50,000 trees, and the water came back with them. When he bought the land, he has said, it had a single spring; he now counts around twenty water sources, and eight waterfalls run on the property. Toucans, pacas, armadillos and, he says, an ocelot have returned.',
          'We found no record of formal protection for the land. The district contains a state environmental protection area, a loose planning zone that still allows private use, but we could not confirm that the property lies inside it, or that it has been registered as a private reserve. The most recent coverage we found dates from 2018, when he was 84. As far as public records show, the forest’s future rests on the choices of Vicente and his family.',
        ],
        note: 'No before-and-after view here: the property has no mapped boundary, and at 31 hectares it is too small to pick out reliably on 30-metre satellite images without one.',
        sources: [
          { title: 'The Guardian — The man who planted a tree and grew a whole family of forests (2017)', url: 'https://www.theguardian.com/global-development-professionals-network/2017/mar/21/the-man-who-planted-a-tree-and-grew-a-whole-family-of-forests' },
          { title: 'BBC Mundo — Antonio Vicente and his forest (2017)', url: 'https://www.bbc.com/mundo/noticias-39922045' },
          { title: 'Rádio Nacional (EBC) — Antonio Vicente, o homem que plantou a própria floresta (2018)', url: 'https://radionacional.ebc.com.br/brasil-rural/2018/03/antonio-vicente-o-homem-que-plantou-a-propria-floresta' },
          { title: 'São Francisco Xavier Environmental Protection Area — Wikipedia', url: 'https://en.wikipedia.org/wiki/S%C3%A3o_Francisco_Xavier_Environmental_Protection_Area' },
        ],
      },
      {
        id: 'yacouba-sawadogo',
        name: 'Yacouba Sawadogo',
        country: 'Burkina Faso',
        place: 'Bangr-Raaga forest, Gourga, beside Ouahigouya, Yatenga, Burkina Faso',
        glance: [
          ['Began', 'Around 1980'],
          ['Area', 'About 25 to 40 ha (sources differ)'],
          ['Died', 'December 2023'],
          ['Protection', 'Fenced in 2021; no title confirmed'],
        ],
        photos: [
          {
            src: '/media/blog/planters/sawadogo',
            width: 676,
            height: 978,
            alt: 'Yacouba Sawadogo in a blue and white striped smock and an embroidered cap, standing among trees.',
            caption: 'Yacouba Sawadogo in January 2019.',
            author: 'EKokou',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Yacouba_Sawadogo.jpg',
            via: 'Wikimedia Commons',
          },
        ],
        paras: [
          'Yacouba Sawadogo began around 1980, during the severe Sahel droughts, on barren land near Gourga. His tool was zaï, a traditional practice of digging small planting pits. He made the pits somewhat larger and filled them with manure and compost. The manure drew termites, whose tunnels helped the soil hold what little rain fell, and seeds in the pits took root.',
          'Over four decades the pits became a forest of more than sixty species of trees and bushes, which he called Bangr-Raaga, the forest of wisdom. Its size is reported anywhere from about 25 to almost 40 hectares. He received the Right Livelihood Award in 2018 and was named a UN Champion of the Earth in 2020. He died in Ouahigouya in December 2023, aged 77.',
          'His forest shows how exposed unprotected land is at the edge of a growing town. Ouahigouya spread around it. In 2016 Reuters reported that a housing project had annexed parts of his land and carved them into plots, and in 2019 the newspaper Sidwaya reported houses going up inside the forest and trees being cut at night. Sawadogo held no land title. In 2021 the environment ministry built a fence around 28 hectares. We could not confirm that a title or heritage classification has followed. After his death, his family pledged to keep managing the forest together.',
        ],
        beforeAfter: {
          width: 900,
          height: 900,
          before: {
            src: '/media/blog/planters/sat-sawadogo-1986.webp',
            label: '1986',
            alt: 'Satellite view in November 1986: pale, bare land, with the outlined site barely different from its surroundings.',
          },
          after: {
            src: '/media/blog/planters/sat-sawadogo-2024.webp',
            label: '2024',
            alt: 'Satellite view in November 2024: a dense dark block of woodland fills the outlined site, surrounded by new housing.',
          },
          caption:
            'The same 4 by 4 kilometres in November 1986 and November 2024. The dashed line marks Bangr-Raaga. In 1986, a few years into his work, it barely stands out from the bare ground; by 2024 it is a dense block of woodland, ringed by the new housing of Ouahigouya. The dark rectangle to the south-west is a separate site.',
          credit:
            'Landsat 5 and Landsat 9 imagery (30 m), courtesy of the U.S. Geological Survey, via Microsoft Planetary Computer. Outline from OpenStreetMap, © OpenStreetMap contributors.',
        },
        sources: [
          { title: 'Right Livelihood — Yacouba Sawadogo', url: 'https://rightlivelihood.org/the-change-makers/find-a-laureate/yacouba-sawadogo/' },
          { title: 'Reuters (archived) — “They will destroy my father’s grave”, says farmer who turned back the desert (2016)', url: 'http://web.archive.org/web/20230605143142/https://www.reuters.com/article/us-burkina-landrights-hunger/they-will-destroy-my-fathers-grave-says-farmer-who-turned-back-the-desert-idUSKCN11W1Y6' },
          { title: 'Sidwaya — Forêt de Gourga dans le Yatenga (2019)', url: 'https://www.sidwaya.info/blog/2019/07/03/foret-de-gourga-dans-le-yatenga-lecocide-dun-patrimoine-mondial/' },
          { title: 'Sentinelle — La forêt du prix Nobel alternatif 2018 enfin protégée (2021)', url: 'https://sentinellebf.com/la-foret-du-prix-nobel-alternatif-2018-enfin-protegee/' },
          { title: 'Libreinfo — Yacouba Sawadogo (2023)', url: 'https://libreinfo.net/yacouba-sawadogo-doua/' },
        ],
      },
      {
        id: 'sebastiao-lelia-salgado',
        name: 'Sebastião and Lélia Salgado',
        country: 'Brazil',
        place: 'Instituto Terra, Fazenda Bulcão, Aimorés, Minas Gerais, Brazil',
        glance: [
          ['Began', '1998; planting from December 1999'],
          ['Area', 'About 710 ha (1,750 acres)'],
          ['Trees', 'More than 3 million, whole programme'],
          ['Protection', 'Private reserve (RPPN) since 1998'],
        ],
        photos: [
          {
            src: '/media/blog/planters/salgado',
            width: 960,
            height: 1200,
            alt: 'Portrait of Sebastião Salgado in a navy shirt.',
            caption: 'Sebastião Salgado in Rio de Janeiro, 2016.',
            author: 'Fernando Frazão / Agência Brasil',
            license: 'CC BY 3.0 BR',
            licenseUrl: 'https://creativecommons.org/licenses/by/3.0/br/deed.en',
            source: 'https://commons.wikimedia.org/wiki/File:Sebasti%C3%A3o_Salgado_(cropped).jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
          {
            src: '/media/blog/planters/instituto-terra',
            width: 960,
            height: 1200,
            alt: 'A lily pond in front of tall trees and gardens at the Instituto Terra headquarters.',
            caption: 'The pond at the reserve’s headquarters, 2023.',
            author: 'Terapeutajunguiana',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Instituto_Terra.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
        ],
        paras: [
          'By the 1990s the Fazenda Bulcão, the Salgado family’s cattle ranch in the Rio Doce valley, had been worn down to bare, eroded hills. In April 1998 the photographer Sebastião Salgado and his wife, Lélia Wanick Salgado, founded Instituto Terra to bring back the Atlantic Forest that had once covered it. Planting began in December 1999.',
          'The farm covers about 710 hectares, roughly 1,750 acres. The institute says it has now planted more than three million native trees across its programme, and by 2019 the restoration included 297 native tree species. Its monitoring has recorded 172 bird, 33 mammal, 15 reptile and 15 amphibian species. Sebastião Salgado died in Paris in May 2025, aged 81. Lélia remains involved, and their son Juliano chairs the institute.',
          'Unlike most forests in this dispatch, this one was given lasting legal protection at the start. In 1998 the farm was recognised as a Private Natural Heritage Reserve, or RPPN, a Brazilian designation that commits land to conservation in perpetuity. According to the institute, it was the first such title granted to a degraded area, on condition that the forest be restored. The reserve itself covers about 609 hectares of the farm.',
        ],
        beforeAfter: {
          width: 900,
          height: 900,
          before: {
            src: '/media/blog/planters/sat-instituto-terra-1997.webp',
            label: '1997',
            alt: 'Satellite view in May 1997: patchy pale green and brown pasture on steep hills, with the town of Aimorés at top right.',
          },
          after: {
            src: '/media/blog/planters/sat-instituto-terra-2024.webp',
            label: '2024',
            alt: 'Satellite view in May 2024: a continuous dark green forest canopy fills the outlined strip south-west of Aimorés.',
          },
          caption:
            'The same 8 by 8 kilometres in May 1997, two years before planting began, and May 2024. Aimorés is at top right. The dashed line is the reserve as outlined by OpenStreetMap volunteers; it is approximate and larger than the official 609-hectare reserve. The valley is a little greener overall in 2024, but the continuous dark canopy is concentrated inside the line.',
          credit:
            'Landsat 5 and Landsat 9 imagery (30 m), courtesy of the U.S. Geological Survey, via Microsoft Planetary Computer. Outline from OpenStreetMap, © OpenStreetMap contributors.',
        },
        sources: [
          { title: 'Instituto Terra — Our history', url: 'https://institutoterra.org/ourhistory/?lang=en' },
          { title: 'Instituto Terra — Annual report 2013 (PDF)', url: 'https://institutoterra.org/site/wp-content/uploads/2025/07/Relatorio-Anual-2013.pdf' },
          { title: 'FAO — Instituto Terra case study', url: 'https://www.fao.org/sustainable-forest-management/toolbox/cases/case-detail/en/c/1476869' },
          { title: 'Instituto Terra — Wikipedia (Portuguese)', url: 'https://pt.wikipedia.org/wiki/Instituto_Terra' },
          { title: 'Global Voices — From barren land to thriving forest (2025)', url: 'https://globalvoices.org/2025/06/05/from-barren-land-to-thriving-forest-the-story-of-photographer-sebastiao-salgados-instituto-terra-in-brazil/' },
          { title: 'Sebastião Salgado — Wikipedia', url: 'https://en.wikipedia.org/wiki/Sebasti%C3%A3o_Salgado' },
        ],
      },
      {
        id: 'saalumarada-thimmakka',
        name: 'Saalumarada Thimmakka',
        country: 'India',
        place: 'The Hulikal to Kudur road, Magadi taluk, Karnataka, India',
        glance: [
          ['Planted', '385 banyans, by most counts'],
          ['Stretch', 'About 4 to 4.5 km of roadside'],
          ['Died', 'November 2025'],
          ['Protection', 'State-managed; no heritage order found'],
        ],
        photos: [
          {
            src: '/media/blog/planters/thimmakka',
            width: 852,
            height: 1065,
            alt: 'Saalumarada Thimmakka smiling broadly, in a teal sari, outdoors.',
            caption: 'Thimmakka in 2011.',
            author: 'Arun4speed',
            license: 'CC0 1.0',
            licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
            source: 'https://commons.wikimedia.org/wiki/File:Saalumarada_Thimmakka,_2011_(cropped).jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
          {
            src: '/media/blog/planters/thimmakka-banyans',
            width: 960,
            height: 1200,
            alt: 'Large banyan trees beside a road, with a yellow Kannada-language sign in the foreground.',
            caption: 'Her banyans on the Kudur to Hulikal road in 2016, beside a Karnataka forestry sign bearing her name.',
            author: 'ಚೇತನ್ ಅಣ್ಣಾಜಿ ಗೌಡ',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Saalumarada-thimmakka-plaque.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
        ],
        paras: [
          'What Saalumarada Thimmakka and her husband, Chikkaiah, had was a road, the stretch between the villages of Hulikal and Kudur in Karnataka, and the habit of planting banyan saplings along it. Ten went in the first year, fifteen in the second and twenty in the third, and the couple carried pails of water about four kilometres to keep them alive.',
          'Most accounts now count 385 banyans along a stretch of four to four and a half kilometres. The trees made her one of India’s best-known environmentalists. She received the National Citizen’s Award in 1995, was named to the BBC’s 100 Women in 2016 and received the Padma Shri in 2019. Chikkaiah died in 1991. She died in Bengaluru on 14 November 2025, at a claimed age of 114, and was buried with state honours.',
          'The trees stand on government road land, and the Karnataka government has taken over their care. That has not made them untouchable. In 2019 a road-widening plan would have felled them until she met the chief minister, who told officials to find another way. We could not confirm that a permanent alternative was ever settled, and we found no formal heritage protection for the avenue. Her foster son asked for exactly that in 2019.',
        ],
        sources: [
          { title: 'Saalumarada Thimmakka — Wikipedia', url: 'https://en.wikipedia.org/wiki/Saalumarada_Thimmakka' },
          { title: 'Mongabay India — Saalumarada Thimmakka, mother of trees, has died aged 114 (2025)', url: 'https://india.mongabay.com/short-article/2025/11/saalumarada-thimmakka-mother-of-trees-has-died-aged-114' },
          { title: 'The Week (PTI) — Thimmakka’s funeral (2025)', url: 'https://www.theweek.in/wire-updates/national/2025/11/15/mes19-ka-thimmakka-funeral.html' },
          { title: 'The News Minute — Thimmakka convinces Karnataka CM not to chop trees for road widening (2019)', url: 'https://www.thenewsminute.com/article/107-yr-old-activist-thimakka-convinces-karnataka-cm-not-chop-trees-road-widening-102939' },
          { title: 'SheThePeople — Karnataka CM agrees not to axe Thimmakka’s trees (2019)', url: 'https://www.shethepeople.tv/news/107-year-old-thimakka-karnataka-cm-not-axe-trees' },
          { title: 'Down To Earth — A mother’s love (2002)', url: 'https://www.downtoearth.org.in/coverage/a-mothers-love-14815' },
        ],
      },
      {
        id: 'pamela-anil-malhotra',
        name: 'Pamela and Anil Malhotra',
        country: 'India',
        place: 'SAI Sanctuary, Theralu, near Birunani, Kodagu, Karnataka, India',
        glance: [
          ['Began', 'Search 1991; first land 1992 to 1993'],
          ['Area', '55 acres at first; about 300 acres now'],
          ['Held by', 'SAI Sanctuary Trust, since 2002'],
          ['Protection', 'Private land; no state status'],
        ],
        photos: [
          {
            src: '/media/blog/planters/pamela-malhotra',
            width: 1200,
            height: 797,
            alt: 'Pamela Malhotra receiving a framed certificate from President Pranab Mukherjee, with uniformed guards behind.',
            caption: 'Pamela Malhotra receiving the Nari Shakti Puraskar from President Pranab Mukherjee in 2017. No freely licensed photograph of Anil Malhotra or of the sanctuary exists.',
            author: 'Government of India',
            license: 'GODL-India',
            licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
            source: 'https://commons.wikimedia.org/wiki/File:Ms._Pamela_Gale_Malhotra,_Karnataka.jpg',
            via: 'Wikimedia Commons',
          },
        ],
        paras: [
          'In 1991 Anil and Pamela Malhotra began looking for land. Their first purchase, completed in the early 1990s, was 55 acres in south Kodagu, bought from a farmer facing foreclosure. Over the following years they added parcel after parcel beside the Brahmagiri Wildlife Sanctuary, mostly abandoned or stripped coffee and cardamom land. They allowed no felling, kept the native trees that remained and planted more native species around them.',
          'The holding has grown to about 300 acres of regrowing forest, crossed by a year-round stream that runs from the Brahmagiri hills toward the Barapole river. Elephants, leopards, tigers, dhole and river otters use it, along with more than a hundred bird species. Anil died in November 2021, and his last rites were held at the sanctuary. Pamela died in April 2024, according to Wikipedia; we could not find a second source.',
          'The Malhotras saw early that good intentions are not a legal structure. In 2002 they set up the SAI Sanctuary Trust to hold the land, partly, Anil said, because of land-ceiling laws that cap how much one person may own. The land has no government protection status. With both founders gone, we could not confirm who manages it now. The sanctuary’s old web address now shows unrelated spam, so the link below points to an archived copy of its pages.',
        ],
        note: 'No before-and-after view here: the sanctuary sits in continuous Western Ghats forest, and without a mapped boundary its regrowth cannot be told apart from the forest around it at 30-metre resolution.',
        sources: [
          { title: 'SAI Sanctuary — Wikipedia', url: 'https://en.wikipedia.org/wiki/SAI_Sanctuary' },
          { title: 'SAI Sanctuary — About (archived, March 2025)', url: 'https://web.archive.org/web/20250303/https://www.saisanctuary.com/about.htm' },
          { title: 'The Week — India’s private wildlife sanctuary (2016)', url: 'https://www.theweek.in/theweek/specials/private-wildlife-sanctuary.html' },
          { title: 'The Week — Anil Malhotra, owner of India’s first private wildlife sanctuary, no more (2021)', url: 'https://www.theweek.in/news/india/2021/11/24/anil-malhotra-owner-of-indias-first-private-wildlife-sanctuary-no-more.html' },
          { title: 'Pamela Malhotra — Wikipedia', url: 'https://en.wikipedia.org/wiki/Pamela_Malhotra' },
          { title: 'Resilience — From wasteland to rainforest (2016)', url: 'https://www.resilience.org/stories/2016-06-29/from-wasteland-to-rainforest/' },
        ],
      },
      {
        id: 'jia-haixia-jia-wenqi',
        name: 'Jia Haixia and Jia Wenqi',
        country: 'China',
        place: 'Yeli village, Sunzhuang, Jingxing county, Hebei, China',
        glance: [
          ['Began', 'Contracted 2001; planted from 2002'],
          ['Area', 'About 3.3 ha of riverbank'],
          ['Trees', 'More than 10,000'],
          ['Held by', 'Village land, contracted to them'],
        ],
        photos: [
          {
            src: '/media/blog/planters/ye-river',
            width: 1200,
            height: 800,
            alt: 'A wide, stony riverbed with shallow channels, lined with yellow-leaved trees, below bare hills.',
            caption: 'The Ye River at Weizhou in Jingxing county, a few kilometres from the township that includes Yeli village, in November 2024. This is not the Jias’ plot. No freely licensed photograph of them or their trees exists.',
            author: 'N509FZ',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Ye_River_at_Weizhou,_Jingxing,_Shijiazhuang_(20241104085141).jpg',
            via: 'Wikimedia Commons',
          },
        ],
        paras: [
          'Jia Haixia has been blind since an accident in 2000. His childhood friend Jia Wenqi lost both arms as a boy. The two are not closely related. In 2001 they contracted about 50 mu, roughly 3.3 hectares, of barren riverbank on the Ye River from their village committee, and the following spring they started planting.',
          'They had no money for saplings, so they grew poplars and willows from cuttings. In the first year only two of roughly 800 cuttings survived. They kept at it, and by 2016 Chinese reporting counted more than 10,000 trees on the plot.',
          'Their motive, in the most detailed account, was a living: the trees were timber they hoped one day to sell. A claim often repeated online, that the trees protect the village from floods, has little support. The village’s contract states it will not compensate them if floods wash the trees away. The land is still village collective land, contracted to the pair, and the trees and their income are theirs. Fame has changed the calculation: by 2016 they told reporters they no longer dared to cut and sell, because neighbours and officials would object. We found no reporting on them after 2016.',
        ],
        sources: [
          { title: 'The Paper (澎湃新闻) — report on Jia Haixia and Jia Wenqi (2016)', url: 'https://m.thepaper.cn/newsDetail_forward_1476661' },
          { title: 'People’s Daily weekly (人民周刊) — report on the two friends (2016)', url: 'https://paper.people.com.cn/rmzk/html/2016-07/07/content_1693473.htm' },
          { title: 'The Globe and Mail (AP) — Armless man and blind friend plant thousands of trees in China (2015)', url: 'https://www.theglobeandmail.com/news/world/armless-man-and-blind-friend-plant-thousands-of-trees-in-china/article24210682/' },
          { title: 'China Daily — report on the Yeli village planters (2015)', url: 'https://www.chinadaily.com.cn/a/201510/16/WS5a2b4432a310eefe3e99f3f8.html' },
        ],
      },
      {
        id: 'moirangthem-loiya',
        name: 'Moirangthem Loiya',
        country: 'India',
        place: 'Punshilok, Langol hill range, northern edge of Imphal, Manipur, India',
        glance: [
          ['Began', '2002'],
          ['Area', 'About 300 acres (121 ha)'],
          ['Land', 'Langol Reserved Forest, state-owned'],
          ['Today', 'Tended by his society, WAHPS'],
        ],
        paras: [
          'Lists of famous tree planters often give this forest to a “Moirangthem Pacha” and put it at 20 acres. The man who grew it is Moirangthem Loiya, and it covers about 300 acres. In 2002 he began planting on a stretch of the Langol hills above Imphal that had been cleared by burning for shifting cultivation. He built a hut on the hill and lived there alone for about six years while the saplings grew.',
          'He named the forest Punshilok, “spring of life” in Meitei. Counts differ, but it now holds somewhere between 100 and 250 plant species, among them 20 to 30 kinds of bamboo, along with barking deer, porcupines, snakes and many birds. In 2003 he co-founded the Wildlife and Habitat Protection Society to look after it. Its members cut a firebreak every November.',
          'Loiya does not own the land. Punshilok lies inside the Langol Reserved Forest, which belongs to the state, and rather than treat his work as encroachment, the forest department made him part of a joint management committee. That is recognition, but not a guarantee. The wider reserve has long suffered from encroachment, illegal mining and felling. The forest’s own spring, the society’s only water source, has stopped flowing for a few weeks in recent dry seasons, and a project to revive it is under way.',
        ],
        note: 'No freely licensed photograph of Loiya or of Punshilok exists, and the forest has no mapped location precise enough for a satellite comparison, so none appears here.',
        sources: [
          { title: 'Mongabay India — Protecting a forest on a hill in Imphal (2021)', url: 'https://india.mongabay.com/2021/10/protecting-a-forest-on-a-hill-in-imphal/' },
          { title: 'EastMojo — Manipur man converts barren land into 300-acre forest (2022)', url: 'https://eastmojo.com/manipur/2022/11/13/manipur-man-converts-barren-land-into-300-acre-forest/' },
          { title: 'The Better India — Punshilok and the Wildlife and Habitat Protection Society (2017)', url: 'https://thebetterindia.com/89522/manipur-punshilok-moirangthem-loiya-ngamba-wildlife-habitat-protection-society' },
          { title: 'The Sangai Express — Punshilok, a 300-acre forest (2024)', url: 'https://www.thesangaiexpress.com/Encyc/2024/8/4/Mangal-Salam-Most-must-have-heard-about-the-breathtaking-300-acre-forest-known-as-Punshilok-nestled-in-th.html' },
          { title: 'EastMojo — Manipur man toiled for 17 years to bring a dying forest back to life (2019)', url: 'https://eastmojo.com/news/2019/09/06/manipur-man-toiled-for-17-years-to-bring-dying-forest-back-to-life/' },
          { title: 'India Today NE — Route march to curb encroachment in Langol reserve forest (2025)', url: 'https://www.indiatodayne.in/manipur/story/manipur-route-march-conducted-by-forest-officials-to-curb-encroachment-in-langol-reserve-forest-1210132-2025-05-07' },
        ],
      },
      {
        id: 'daripalli-ramaiah',
        name: 'Daripalli Ramaiah',
        country: 'India',
        place: 'Reddipalli, Khammam district, Telangana, India',
        glance: [
          ['Active', 'More than five decades'],
          ['Trees', 'An estimated 10 million, never counted'],
          ['Died', 'April 2025'],
          ['Protection', 'None found for his plantings'],
        ],
        photos: [
          {
            src: '/media/blog/planters/ramaiah',
            width: 724,
            height: 1014,
            alt: 'Daripalli Ramaiah in a white shirt, with a tilak on his forehead, at a formal ceremony.',
            caption: 'Ramaiah at Rashtrapati Bhavan, New Delhi, on the day he received the Padma Shri, 30 March 2017.',
            author: 'President’s Secretariat, Government of India',
            license: 'GODL-India',
            licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
            source: 'https://commons.wikimedia.org/wiki/File:Shri_Daripalli_Ramaiah,_at_Rashtrapati_Bhavan,_in_2017_(cropped).jpg',
            via: 'Wikimedia Commons',
          },
        ],
        paras: [
          'Daripalli Ramaiah, known as Vanajeevi Ramaiah, spent more than fifty years planting along the roads and open land around his village of Reddipalli in Khammam district. He carried seeds in his pockets and scattered them from his bicycle, steering with one hand, and switched to a motorbike as he aged. He favoured native species such as neem, teak, bael, peepal and kadamba, and his wife, Janamma, worked alongside him.',
          'He is usually credited with about ten million trees, a crore in Indian counting. Treat that as an estimate. Nobody counted, and he once told an interviewer that he did not remember how many he had planted. He received the Padma Shri in 2017, and lessons about his life appear in school textbooks in Telangana and Maharashtra. He died at home in April 2025, aged 87.',
          'His plantings were never one forest that could be fenced or registered. They were roadsides, canal banks and open ground, much of it public land. After his death, a former member of India’s upper house of parliament said some of his saplings had been lost to road expansion and called for replanting, and his granddaughter marked his passing by giving away 3,000 saplings. We found no formal programme or protection for what he planted.',
        ],
        sources: [
          { title: 'Mongabay India — Telangana green crusader Daripalli Ramaiah dies at 87 (2025)', url: 'https://india.mongabay.com/2025/04/telangana-green-crusader-daripalli-ramaiah-dies-at-87-obituary/' },
          { title: 'The Tribune — Telangana’s tree man dies at 87 (2025)', url: 'https://www.tribuneindia.com/news/india/telanganas-tree-man-dies-at-87' },
          { title: 'The News Minute — Padma Shri for the Telangana man who planted over one crore saplings (2017)', url: 'https://www.thenewsminute.com/article/green-warrior-padma-shri-telangana-man-who-planted-over-one-crore-saplings-56295' },
          { title: 'Telangana Today — A tribute to Vanajeevi Ramaiah (2025)', url: 'https://telanganatoday.com/a-tribute-to-vanajeevi-ramaiah-santosh-kumar-advocates-national-recognition' },
          { title: 'The Hans India — In the footsteps of Vanajeevi Ramaiah (2025)', url: 'https://thehansindia.com/telangana/in-the-footsteps-of-vanajeevi-ramaiah-965644' },
        ],
      },
      {
        id: 'wangari-maathai',
        name: 'Wangari Maathai',
        country: 'Kenya',
        place: 'The Green Belt Movement, Kenya',
        glance: [
          ['Founded', '1977'],
          ['Trees', 'More than 51 million, by GBM’s count'],
          ['Nobel', 'Peace Prize, 2004'],
          ['Died', 'September 2011'],
        ],
        photos: [
          {
            src: '/media/blog/planters/maathai',
            width: 960,
            height: 1200,
            alt: 'Wangari Maathai speaking, in a patterned dress and matching head wrap.',
            caption: 'Maathai in Salvador, Brazil, in 2006.',
            author: 'Antônio Cruz / Agência Brasil',
            license: 'CC BY 3.0 BR',
            licenseUrl: 'https://creativecommons.org/licenses/by/3.0/br/deed.en',
            source: 'https://commons.wikimedia.org/wiki/File:Wangari_Maathai_no_Brasil.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
          {
            src: '/media/blog/planters/karura',
            width: 960,
            height: 1200,
            alt: 'A red-earth trail running through a tunnel of tall native trees.',
            caption: 'A trail through native trees in Karura Forest, Nairobi, 2025.',
            author: 'Brihaspati',
            license: 'CC BY 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
            source: 'https://commons.wikimedia.org/wiki/File:Forest_trail_in_the_Karura_Forest,_Nairobi.jpg',
            via: 'Wikimedia Commons',
            cropped: true,
          },
        ],
        paras: [
          'Wangari Maathai founded the Green Belt Movement in 1977 to respond to what rural Kenyan women were reporting: their streams were drying up, their food supply was less secure, and they had to walk further and further for firewood. Her answer was to get them planting trees. The first planting, seven trees in a Nairobi park, took place on World Environment Day that year.',
          'The movement worked mainly in Kenya, where it trained tens of thousands of women, and from 1986 a pan-African network carried the model to other countries. It now counts more than 51 million trees grown. In 2004 Maathai became the first African woman to receive the Nobel Peace Prize, “for her contribution to sustainable development, democracy and peace”. She died in Nairobi in September 2011.',
          'Maathai knew that planting was only half the work. In January 1999 she was attacked while leading protesters planting trees in Karura Forest, on Nairobi’s northern edge, where public land was being handed to private developers. Later that year the government banned the allocation of public land. Karura is still a protected forest reserve of about 1,041 hectares, but it is contested again. In 2026 Friends of Karura and the Green Belt Movement went to court over construction inside the forest and won an order halting it pending further directions. Even a legally protected forest needs someone to defend it.',
        ],
        sources: [
          { title: 'The Green Belt Movement', url: 'https://www.greenbeltmovement.org/' },
          { title: 'The Green Belt Movement — Our history', url: 'https://www.greenbeltmovement.org/history/' },
          { title: 'The Nobel Prize — laureate data for Wangari Maathai', url: 'https://api.nobelprize.org/2.1/laureates?name=Maathai' },
          { title: 'PBS NewsHour — Remembering Wangari Maathai (2011)', url: 'https://www.pbs.org/newshour/nation/remembering-wangari-maathai-first-african-woman-to-win-nobel-peace-prize' },
          { title: 'African Arguments — Karura Forest and the politics of community-based conservation (2025)', url: 'https://africanarguments.org/2025/09/karura-forest-and-the-politics-of-community-based-conservation-in-kenya/' },
          { title: 'Friends of Karura — Court order to halt construction inside Karura Forest (2026)', url: 'https://friendsofkarura.org/friends-of-karura-welcome-the-court-order-to-halt-construction-inside-karura-forest/' },
        ],
      },
      {
        id: 'elzeard-bouffier',
        name: 'Elzéard Bouffier, a fiction',
        country: 'France, in fiction',
        place: 'Haute-Provence, France, in Jean Giono’s story The Man Who Planted Trees',
        glance: [
          ['Written', '1953, by Jean Giono'],
          ['Published', '1954, in Vogue'],
          ['Real?', 'No; Giono said so in 1957'],
          ['Film', 'Frédéric Back, 1987; Oscar 1988'],
        ],
        photos: [
          {
            src: '/media/blog/planters/vergons',
            width: 960,
            height: 1200,
            alt: 'Meadows and pine-covered slopes below a long limestone ridge under a clear blue sky.',
            caption: 'Wooded slopes below the Chamatte ridge at Vergons, a village named in the story, 2013.',
            author: 'Sébastien Thébault',
            license: 'CC BY-SA 3.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
            source: 'https://commons.wikimedia.org/wiki/File:Vergons,_cr%C3%AAte_de_Chamatte_et_pr%C3%A9s.JPG',
            via: 'Wikimedia Commons',
            cropped: true,
          },
          {
            src: '/media/blog/planters/faucon-1899',
            width: 960,
            height: 1200,
            alt: 'An old sepia photograph of a man in uniform standing among tall black pines.',
            caption: 'A forester among black pines planted in 1867 at Faucon, Alpes-de-Haute-Provence, photographed in 1899 for the state’s mountain reforestation service. Real reforestation, not Bouffier’s.',
            author: 'Auguste Pécheral',
            license: 'Public domain',
            source: 'https://commons.wikimedia.org/wiki/File:Torrent_du_Bourget_(reboisement_en_pins_noirs_dans_le_canton_des_marquises)_-_P%C3%A9cheral_-_btv1b10701400f.jpg',
            via: 'Bibliothèque nationale de France and Wikimedia Commons',
            cropped: true,
          },
        ],
        paras: [
          'Elzéard Bouffier never lived. He is the shepherd in Jean Giono’s short story The Man Who Planted Trees, written in 1953 after Reader’s Digest asked Giono to describe the most extraordinary character he had met. The magazine turned it down, doubting that Bouffier existed, and the story first appeared in English in Vogue in 1954. In it, a narrator crossing the barren uplands of Haute-Provence meets a solitary shepherd who plants acorns, a hundred at a time, and later beech and birch. Over decades and two world wars, the valley turns green, its streams run again and people return.',
          'In 1957 Giono wrote to the head forestry official in Digne that Bouffier was an invented character, meant to make people love planting trees, and he gave away the rights to the story for nothing. Frédéric Back’s 1987 animated film of it won the Academy Award for animated short film.',
          'The hills themselves have a real reforestation history, older than the story. From the second half of the nineteenth century the French state replanted large areas of these eroded southern Alps, much of it with Austrian black pine and larch, to hold the slopes and calm flash floods. And the story has inspired real planting. France’s national forestry office named a climate project after Giono, collecting acorns and beechnuts in Provence and elsewhere from 2011 and planting beeches further north, near Verdun, where they may suit the climate to come.',
        ],
        sources: [
          { title: 'L’Homme qui plantait des arbres — Wikipedia (French)', url: 'https://fr.wikipedia.org/wiki/L%27Homme_qui_plantait_des_arbres' },
          { title: 'The Man Who Planted Trees — Wikipedia', url: 'https://en.wikipedia.org/wiki/The_Man_Who_Planted_Trees' },
          { title: 'Karl Kehrle bibliography — The Man Who Planted Trees and the reforestation of Haute-Provence', url: 'https://bibliography.karlkehrle.org/?p=200' },
          { title: 'Academy of Motion Picture Arts and Sciences — the 60th Academy Awards (1988)', url: 'https://www.oscars.org/oscars/ceremonies/1988' },
          { title: 'TerraDaily (AFP) — Beeches thrive in France’s Verdun in flight from climate change (2024)', url: 'https://terradaily.com/beeches-thrive-in-frances-verdun-in-flight-from-climate-change-999/' },
        ],
      },
    ],
    sections: [
      {
        heading: 'What keeps a planted forest standing',
        paras: [
          'Read together, these stories sort themselves less by how many trees went in than by how the land is held. The Salgados’ forest has the firmest footing. It was committed to a perpetual private reserve in 1998, before most of it was planted, and its legal status did not change when Sebastião Salgado died. Karura Forest is public and legally protected, yet in 2026 it still needed Maathai’s movement in court.',
          'Most of the others rest on something thinner. Molai has no legal protection at all. Sawadogo’s forest was carved into housing plots before the state fenced what remained, and no title has been confirmed. Thimmakka’s banyans survived a road-widening plan because she appealed to the chief minister in person. Loiya’s forest grows on state land by official goodwill. The SAI Sanctuary sits in a trust, which was a sound decision, but with both founders gone we could not find out who runs it. Vicente’s forest, as far as public records show, depends on his family.',
          'None of this takes anything away from what these people did. Planting a forest by hand is one of the most generous things a person can do. But a forest outlives its planter only if something other than that person’s devotion is holding it.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Liminal Forests Alliance works from a simple idea: secure large, ecologically important wild land, then place each property in an independent trust so that protection outlasts any one owner. The forest makers show both halves of that idea from an unusual angle. They prove that damaged land can come back, often faster than anyone expects, when someone commits to it for decades. They also show how often that commitment is the only thing standing between a young forest and a housing plan, a sand-mining crew or a wider road.',
          'The clearest success here, Instituto Terra, came from founders who moved the land into a structure built to outlast them while they were alive and able to. The SAI Sanctuary trust is a smaller version of the same instinct. That step, fixing how the land is held, is the one the alliance builds in from the start. A planter’s lifetime is long enough to grow a forest. It is not long enough to keep one, unless the way the land is held carries the work forward.',
        ],
      },
    ],
    sourcesHeading: 'Image and data sources',
    sources: [
      {
        title: 'Microsoft Planetary Computer — Landsat Collection 2 Level-2 (satellite imagery used for the before-and-after views)',
        url: 'https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2',
      },
      {
        title: 'U.S. Geological Survey — Are there any restrictions on the use or redistribution of Landsat data?',
        url: 'https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data',
      },
      {
        title: 'OpenStreetMap — Copyright and licence (outlines on the satellite views)',
        url: 'https://www.openstreetmap.org/copyright',
      },
      {
        title: 'Wikimedia Commons — Reusing content outside Wikimedia (photographs)',
        url: 'https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia',
      },
    ],
  },
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
  return `Photo: ${photo.author} (${photo.license}${via}${cropped}). Source: ${photo.source}`;
}

// ---- Markdown rendering (shared by the .md alternates) --------------------

function profileMarkdown(pr, n) {
  const out = [];
  out.push(`## ${String(n).padStart(2, '0')}. ${pr.name}`);
  out.push('');
  out.push(`_${pr.place}_`);
  out.push('');
  if (pr.glance) {
    for (const [k, v] of pr.glance) out.push(`- ${k}: ${v}`);
    out.push('');
  }
  for (const para of pr.paras) {
    out.push(para);
    out.push('');
  }
  for (const ph of pr.photos ?? []) {
    out.push(`Image: ${ph.alt} ${photoCredit(ph)}`);
    out.push('');
  }
  if (pr.beforeAfter) {
    const ba = pr.beforeAfter;
    out.push(`Before and after: ${ba.before.label} compared with ${ba.after.label}. ${ba.caption ?? ''} ${ba.credit ?? ''}`.trim());
    out.push('');
  }
  if (pr.note) {
    out.push(`_${pr.note}_`);
    out.push('');
  }
  if (pr.sources) {
    out.push('Sources:');
    for (const s of pr.sources) out.push(`- [${s.title}](${s.url})`);
    out.push('');
  }
  return out;
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
  out.push(p.lead);
  out.push('');
  if (isSalePost(p)) {
    out.push('## Property at a glance');
    out.push('');
    out.push(...factLines(p));
    out.push('');
  }
  for (const para of p.intro ?? []) {
    out.push(para);
    out.push('');
  }
  (p.profiles ?? []).forEach((pr, i) => out.push(...profileMarkdown(pr, i + 1)));
  for (const s of p.sections) {
    out.push(`## ${s.heading}`);
    out.push('');
    for (const para of s.paras) {
      out.push(para);
      out.push('');
    }
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
