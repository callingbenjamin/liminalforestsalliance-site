// "They planted forests by hand" series (published 2026-11-09): a hub post
// plus one story per forest maker. Imported into `posts` in blog.js.
//
// SOURCING: every fact comes from the sources listed on each story, checked
// on 2026-11-09. Several widely shared claims about these people were wrong
// and are corrected here (e.g. Moirangthem Loiya, not "Pacha"; ~300 acres,
// not 20; the Jia "flood protection" claim is unsupported). Where accounts
// differ, the story says so.
//
// IMAGES: free-licensed only, credited beside each image. Photos are made by
// scripts/gen-blog-photos.mjs; satellite views by scripts/gen-blog-satellite.mjs
// (public-domain Landsat; Copernicus Sentinel-2). See docs/blog-process.md.

const SERIES = 'people-who-planted-forests';
const DATE = '2026-11-09';
const D = '/media/blog/planters';

const CC_BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' };
const CC_BY_SA_3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0' };
const CC_BY_4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0' };
const CC_BY_3_BR = { license: 'CC BY 3.0 BR', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/br/deed.en' };
const CC0 = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en' };
const GODL = { license: 'GODL-India', licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf' };
const COMMONS = 'Wikimedia Commons';
const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

// ---- Photos -------------------------------------------------------------

const P = {
  payengSandbar: {
    src: `${D}/payeng-sandbar`, width: 736, height: 920,
    alt: 'Jadav Payeng crouching on a driftwood trunk on open, bare river sand.',
    caption: 'Payeng on open Brahmaputra sand in 2015, on a trunk carried down by the river.',
    author: 'Itshuman', ...CC_BY_SA_4, source: commons('JadavPayeng.jpg'), via: COMMONS, cropped: true,
  },
  payeng: {
    src: `${D}/payeng`, width: 960, height: 1200,
    alt: 'Close portrait of Jadav Payeng in a knitted cap and red shawl, with forest behind him.',
    caption: 'Payeng in the Molai Forest, January 2026.',
    author: 'JyotiPN', ...CC_BY_SA_4, source: commons('Forest_Man_of_India_-_Jadav_Payeng_DSC_5008.jpg'), via: COMMONS, cropped: true,
  },
  payengForest: {
    src: `${D}/payeng-forest`, width: 1200, height: 900,
    alt: 'Jadav Payeng, in a red shawl, talking with a visitor among dense green undergrowth.',
    caption: 'Payeng (right) with a visitor among the undergrowth of the Molai Forest, January 2026.',
    author: 'JyotiPN', ...CC_BY_SA_4, source: commons('Chef_Atul_Lahkar_in_conversation_with_Jadav_Payeng_at_Molai_forest,_Jorhat.jpg'), via: COMMONS,
  },
  vicenteTrail: {
    src: `${D}/vicente-trail`, width: 1200, height: 900,
    alt: 'A clear, rocky stream running under dense green Atlantic Forest.',
    caption: 'A stream on the Pouso do Rochedo ecological trail near São Francisco Xavier, 2021. News reports place Vicente’s forest at Pouso do Rochedo. No freely licensed photograph of Vicente himself exists.',
    author: 'Márcia Cristina Machado', ...CC_BY_SA_4,
    source: commons('%C3%81rea_de_Prote%C3%A7%C3%A3o_Ambiental_S%C3%A3o_Francisco_Xavier_-_Marcia_Cristina_Machado_(53).jpg'), via: COMMONS,
  },
  sawadogo: {
    src: `${D}/sawadogo`, width: 676, height: 978,
    alt: 'Yacouba Sawadogo in a blue and white striped smock and an embroidered cap, standing among trees.',
    caption: 'Yacouba Sawadogo in January 2019.',
    author: 'EKokou', ...CC_BY_SA_4, source: commons('Yacouba_Sawadogo.jpg'), via: COMMONS,
  },
  salgado: {
    src: `${D}/salgado`, width: 960, height: 1200,
    alt: 'Portrait of Sebastião Salgado in a navy shirt.',
    caption: 'Sebastião Salgado in Rio de Janeiro, 2016.',
    author: 'Fernando Frazão / Agência Brasil', ...CC_BY_3_BR, source: commons('Sebasti%C3%A3o_Salgado_(cropped).jpg'), via: COMMONS, cropped: true,
  },
  institutoTerra: {
    src: `${D}/instituto-terra`, width: 960, height: 1200,
    alt: 'A lily pond in front of tall trees and gardens at the Instituto Terra headquarters.',
    caption: 'The pond at the reserve’s headquarters, 2023.',
    author: 'Terapeutajunguiana', ...CC_BY_SA_4, source: commons('Instituto_Terra.jpg'), via: COMMONS, cropped: true,
  },
  institutoTerraHill: {
    src: `${D}/instituto-terra-hill`, width: 1200, height: 900,
    alt: 'A still pond reflecting palms, below a steep hillside covered in forest.',
    caption: 'A forested hillside above a pond at the Instituto Terra headquarters, 2014.',
    author: 'Antonio Carlos Lima Barbosa', ...CC_BY_SA_3, source: commons('Instituto_Terra_1,_Aymor%C3%A9s-MG.jpg'), via: COMMONS,
  },
  thimmakka: {
    src: `${D}/thimmakka`, width: 852, height: 1065,
    alt: 'Saalumarada Thimmakka smiling broadly, in a teal sari, outdoors.',
    caption: 'Thimmakka in 2011.',
    author: 'Arun4speed', ...CC0, source: commons('Saalumarada_Thimmakka,_2011_(cropped).jpg'), via: COMMONS, cropped: true,
  },
  thimmakkaBanyans: {
    src: `${D}/thimmakka-banyans`, width: 960, height: 1200,
    alt: 'Large banyan trees beside a road, with a yellow Kannada-language sign in the foreground.',
    caption: 'Her banyans on the Kudur to Hulikal road in 2016, beside a Karnataka forestry sign bearing her name.',
    author: 'ಚೇತನ್ ಅಣ್ಣಾಜಿ ಗೌಡ', ...CC_BY_SA_4, source: commons('Saalumarada-thimmakka-plaque.jpg'), via: COMMONS, cropped: true,
  },
  thimmakkaPadma: {
    src: `${D}/thimmakka-padma`, width: 1100, height: 1012,
    alt: 'Thimmakka, seated in a green sari, receiving a scroll from President Ram Nath Kovind, with uniformed guards behind.',
    caption: 'President Ram Nath Kovind presents Thimmakka with the Padma Shri, 16 March 2019.',
    author: 'President’s Secretariat, Government of India', ...GODL, source: commons('Padma_Shri_Saalumarada_Thimakka.jpg'), via: COMMONS,
  },
  pamela: {
    src: `${D}/pamela-malhotra`, width: 1200, height: 797,
    alt: 'Pamela Malhotra receiving a framed certificate from President Pranab Mukherjee, with uniformed guards behind.',
    caption: 'Pamela Malhotra receiving the Nari Shakti Puraskar from President Pranab Mukherjee in 2017. No freely licensed photograph of Anil Malhotra or of the sanctuary exists.',
    author: 'Government of India', ...GODL, source: commons('Ms._Pamela_Gale_Malhotra,_Karnataka.jpg'), via: COMMONS,
  },
  yeRiver: {
    src: `${D}/ye-river`, width: 1200, height: 800,
    alt: 'A wide, stony riverbed with shallow channels, lined with yellow-leaved trees, below bare hills.',
    caption: 'The Ye River at Weizhou in Jingxing county, a few kilometres from the township that includes Yeli village, in November 2024. This is not the Jias’ plot. No freely licensed photograph of them or their trees exists.',
    author: 'N509FZ', ...CC_BY_SA_4, source: commons('Ye_River_at_Weizhou,_Jingxing,_Shijiazhuang_(20241104085141).jpg'), via: COMMONS,
  },
  langol: {
    src: `${D}/langol-hills`, width: 1200, height: 900,
    alt: 'Satellite view of a dark green forested ridge surrounded by brown dry-season farmland, with the edge of a city and green wetland at the bottom right.',
    caption: 'The Langol hill range on the northern edge of Imphal, the dark forested ridge at centre, in December 2025, with the Lamphelpat area and the city below it. Punshilok lies on these hills, but its boundary has not been mapped, so it is not marked. No freely licensed photograph of Loiya or of the forest exists.',
    creditLabel: 'Image', author: 'Copernicus Sentinel-2', license: 'contains modified Copernicus Sentinel data 2025',
    source: 'https://planetarycomputer.microsoft.com/dataset/sentinel-2-l2a', via: 'Microsoft Planetary Computer',
  },
  ramaiah: {
    src: `${D}/ramaiah`, width: 724, height: 1014,
    alt: 'Daripalli Ramaiah in a white shirt, with a tilak on his forehead, at a formal ceremony.',
    caption: 'Ramaiah at Rashtrapati Bhavan, New Delhi, on the day he received the Padma Shri, 30 March 2017.',
    author: 'President’s Secretariat, Government of India', ...GODL,
    source: commons('Shri_Daripalli_Ramaiah,_at_Rashtrapati_Bhavan,_in_2017_(cropped).jpg'), via: COMMONS,
  },
  ramaiahAward: {
    src: `${D}/ramaiah-award`, width: 1200, height: 992,
    alt: 'Ramaiah in a white shirt receiving a scroll from President Pranab Mukherjee, with uniformed guards behind.',
    caption: 'President Pranab Mukherjee presents Ramaiah with the Padma Shri at Rashtrapati Bhavan, 30 March 2017.',
    author: 'President’s Secretariat, Government of India', ...GODL,
    source: commons('The_President,_Shri_Pranab_Mukherjee_presenting_the_Padma_Shri_Award_to_Shri_Daripalli_Ramaiah,_at_a_Civil_Investiture_Ceremony,_at_Rashtrapati_Bhavan,_in_New_Delhi_on_March_30,_2017.jpg'),
    via: COMMONS,
  },
  maathai: {
    src: `${D}/maathai`, width: 960, height: 1200,
    alt: 'Wangari Maathai speaking, in a patterned dress and matching head wrap.',
    caption: 'Maathai in Salvador, Brazil, in 2006.',
    author: 'Antônio Cruz / Agência Brasil', ...CC_BY_3_BR, source: commons('Wangari_Maathai_no_Brasil.jpg'), via: COMMONS, cropped: true,
  },
  karura: {
    src: `${D}/karura`, width: 960, height: 1200,
    alt: 'A red-earth trail running through a tunnel of tall native trees.',
    caption: 'A trail through native trees in Karura Forest, Nairobi, 2025.',
    author: 'Brihaspati', ...CC_BY_4, source: commons('Forest_trail_in_the_Karura_Forest,_Nairobi.jpg'), via: COMMONS, cropped: true,
  },
  vergons: {
    src: `${D}/vergons`, width: 960, height: 1200,
    alt: 'Meadows and pine-covered slopes below a long limestone ridge under a clear blue sky.',
    caption: 'Wooded slopes below the Chamatte ridge at Vergons, a village named in the story, 2013.',
    author: 'Sébastien Thébault', ...CC_BY_SA_3, source: commons('Vergons,_cr%C3%AAte_de_Chamatte_et_pr%C3%A9s.JPG'), via: COMMONS, cropped: true,
  },
  faucon: {
    src: `${D}/faucon-1899`, width: 960, height: 1200,
    alt: 'An old sepia photograph of a man in uniform standing among tall black pines.',
    caption: 'A forester among black pines planted in 1867 at Faucon, Alpes-de-Haute-Provence, photographed in 1899 for the state’s mountain reforestation service. Real reforestation, not Bouffier’s.',
    author: 'Auguste Pécheral', license: 'Public domain',
    source: commons('Torrent_du_Bourget_(reboisement_en_pins_noirs_dans_le_canton_des_marquises)_-_P%C3%A9cheral_-_btv1b10701400f.jpg'),
    via: 'Bibliothèque nationale de France and Wikimedia Commons', cropped: true,
  },
};

// Index-card cover from a photo: same file, short credit, framing hint.
const cover = (ph, focus, credit) => ({
  src: ph.src, width: ph.width, height: ph.height, alt: ph.alt, focus,
  credit: credit ?? `${ph.creditLabel ?? 'Photo'}: ${ph.author}, ${ph.license}${ph.cropped ? '; cropped' : ''}.`,
  creditUrl: ph.source,
});

// ---- Satellite comparisons ---------------------------------------------

const LANDSAT_CREDIT =
  'Landsat 5 and Landsat 9 imagery (30 m), courtesy of the U.S. Geological Survey, via Microsoft Planetary Computer. Outline from OpenStreetMap, © OpenStreetMap contributors.';

const SAT = {
  sawadogo: {
    width: 900, height: 900,
    before: { src: `${D}/sat-sawadogo-1986.webp`, label: '1986', alt: 'Satellite view in November 1986: pale, bare land, with the outlined site barely different from its surroundings.' },
    after: { src: `${D}/sat-sawadogo-2024.webp`, label: '2024', alt: 'Satellite view in November 2024: a dense dark block of woodland fills the outlined site, surrounded by new housing.' },
    caption: 'The same 4 by 4 kilometres in November 1986 and November 2024. The dashed line marks Bangr-Raaga. In 1986, a few years into his work, it barely stands out from the bare ground; by 2024 it is a dense block of woodland, ringed by the new housing of Ouahigouya. The dark rectangle to the south-west is a separate site.',
    credit: LANDSAT_CREDIT,
  },
  terra: {
    width: 900, height: 900,
    before: { src: `${D}/sat-instituto-terra-1997.webp`, label: '1997', alt: 'Satellite view in May 1997: patchy pale green and brown pasture on steep hills, with the town of Aimorés at top right.' },
    after: { src: `${D}/sat-instituto-terra-2024.webp`, label: '2024', alt: 'Satellite view in May 2024: a continuous dark green forest canopy fills the outlined strip south-west of Aimorés.' },
    caption: 'The same 8 by 8 kilometres in May 1997, two years before planting began, and May 2024. Aimorés is at top right. The dashed line is the reserve as outlined by OpenStreetMap volunteers; it is approximate and larger than the official 609-hectare reserve. The valley is a little greener overall in 2024, but the continuous dark canopy is concentrated inside the line.',
    credit: LANDSAT_CREDIT,
  },
};

// ---- The stories --------------------------------------------------------

const story = (p) => ({ date: DATE, outcome: 'Restoration', partOf: SERIES, ...p });

const stories = [
  story({
    slug: 'jadav-payeng-molai-forest',
    title: 'A forest on a river sandbar, and no law to guard it',
    location: 'Molai Forest, near Kokilamukh, Jorhat, Assam, India',
    region: 'Asia',
    summary:
      'Since 1979 Jadav Payeng has grown about 550 hectares of forest on a bare Brahmaputra sandbar. Elephants and rhinos use it. It still has no legal protection.',
    lead:
      'In 1979 Jadav Payeng planted about twenty bamboo seedlings on a bare sandbar in the Brahmaputra river in Assam. More than four decades later the sandbar carries a forest of roughly 550 hectares, used by elephants, rhinos and tigers. It is one of the best-known hand-planted forests in the world, and it has never been given legal protection.',
    cover: cover(P.payeng, '50% 45%'),
    photos: [P.payengSandbar, P.payeng],
    glance: [
      ['Planter', 'Jadav “Molai” Payeng'],
      ['Began', '1979'],
      ['Area', 'About 550 ha (1,360 acres)'],
      ['Protection', 'None in law'],
      ['Today', 'Still tended by Payeng, now with his daughter'],
    ],
    sections: [
      {
        heading: 'How the forest grew',
        paras: [
          'The sandbar, known locally as Aruna Chapori, lies a few kilometres from Payeng’s village of Kokilamukh. He began with bamboo in 1979. The following year a state social-forestry scheme started planting 200 hectares of the same ground, and about three years later it was dropped. Payeng stayed and kept planting on his own, year after year, as the forest spread across the island.',
          'It is named Molai, after his nickname, and now covers about 550 hectares, roughly 1,360 acres. Bamboo alone covers more than 300 hectares, and more than a hundred kinds of trees and plants grow there. Most of what is known about its wildlife comes from Payeng’s own accounts and press reports rather than formal surveys: a herd of around a hundred elephants spends about six months of each year there, and around ten calves have been born in the forest. Rhinos, Bengal tigers, deer and vultures have all been reported.',
        ],
        photos: [P.payengForest],
      },
      {
        heading: 'Recognition, but not protection',
        paras: [
          'In 2012 he was publicly named the “Forest Man of India” at an event at Jawaharlal Nehru University in Delhi, and in 2015 he received the Padma Shri, one of India’s highest civilian honours. Two universities in Assam have given him honorary doctorates.',
          'None of that has changed the forest’s legal status. In 2018 Mongabay reported that because Molai is not an officially protected forest, the forest department had not assigned guards to it. A rhino was poached there in 2012. Payeng himself has been wary of formal protected status, fearing it would cut local people off from the forest, and has said he would be open to a community reserve instead. Conservationists have pressed for legal protection. We found no sign that any has been granted.',
          'The risks are not abstract. On 28 December 2025 a fire burned about 1.25 hectares of a newer plantation that Payeng and his daughter, Munmun, started across a stream from the original forest in 2021 and 2022. She said more than 5,000 saplings were lost. Local people and opposition politicians alleged arson linked to sand mining on the river; that has not been proven. In January 2026 the Jorhat district administration temporarily suspended sand mining and ordered an inquiry. We found no outcome.',
        ],
        note: 'No before-and-after view here: between the 1980s and today the river has reshaped the whole island, so a satellite comparison mostly shows the river moving, not the forest growing.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Molai is a near-perfect example of what one committed person can grow, and of how little stands behind it. The forest’s protection is, in practice, Payeng himself: his presence, his reputation and now his daughter’s work. That counts for a great deal while he is there. It is not a structure.',
          'The Liminal Forests Alliance secures wild land and places each property in an independent trust, so that protection is kept separate from any one owner and outlasts them. Payeng’s own caution deserves to be taken seriously, because protection that shuts out the people who live beside a forest can fail too. But what Molai lacks is not goodwill. It is a holder whose only job is to keep it a forest after its planter is gone.',
        ],
      },
    ],
    sources: [
      { title: 'Mongabay India — Mulai Kathoni, a young man’s dream, is now a thriving people’s forest (2018)', url: 'https://india.mongabay.com/2018/05/mulai-kathoni-a-young-mans-dream-is-now-a-thriving-peoples-forest/' },
      { title: 'Jadav Payeng — Wikipedia', url: 'https://en.wikipedia.org/wiki/Jadav_Payeng' },
      { title: 'Molai forest — Wikipedia', url: 'https://en.wikipedia.org/wiki/Molai_forest' },
      { title: 'Pratidin Time — Who burnt the forest built by Jadav Payeng?', url: 'https://www.pratidintime.com/latest-assam-news-breaking-news-assam/who-burnt-the-forest-built-by-jadav-payeng-in-majuli-10954882' },
      { title: 'Land Conflict Watch — Arson, sand mining and the fire at Molai Kathoni 2.0', url: 'https://www.landconflictwatch.org/conflicts/arson-sand-mining-and-the-conservation-the-fire-at-environmentalist-jadav-payeng-s-molai-kathoni-2-0-in-assam' },
    ],
  }),

  story({
    slug: 'antonio-vicente-atlantic-forest',
    title: 'Fifty thousand trees, and the water came back',
    location: 'São Francisco Xavier, São José dos Campos, São Paulo state, Brazil',
    region: 'South America',
    summary:
      'In 1973 Antonio Vicente bought 31 hectares of cleared cattle land in Brazil’s Atlantic Forest and replanted it. By his count one spring became about twenty. We found no formal protection for the land.',
    lead:
      'In 1973 Antonio Vicente bought about 31 hectares of hill land in the Serra da Mantiqueira, in São Paulo state, that had been cleared for cattle. Over the next four decades he replanted it with native Atlantic Forest trees, about 50,000 by his own estimate. He says the water came back with them.',
    cover: cover(P.vicenteTrail, '50% 50%'),
    photos: [P.vicenteTrail],
    glance: [
      ['Planter', 'Antonio Vicente'],
      ['Began', '1973'],
      ['Area', '31 ha (77 acres)'],
      ['Trees', 'About 50,000, his estimate'],
      ['Protection', 'None found'],
    ],
    sections: [
      {
        heading: 'What he planted',
        paras: [
          'Vicente was a trader and the son of farmers when he bought the land near the village of São Francisco Xavier, a district of São José dos Campos about 200 kilometres from the city of São Paulo. The hills had been stripped for grazing. He began planting native species, including the araucaria pine, and kept at it while, by his account, most of his neighbours laughed at the idea.',
          'The Guardian reported in 2017 that a painting of the land as it looked in 1976, bare of trees, hangs in his house. Today the property is forest again.',
        ],
      },
      {
        heading: 'The water, and the animals',
        paras: [
          'Vicente has said that when he bought the land it had a single spring, and that it now has around twenty water sources. Eight waterfalls run on the property. Those figures are his own account rather than a measured survey.',
          'He has also described wildlife returning: toucans, pacas, squirrels, opossums, lizards, armadillos and, he says, an ocelot. The most recent coverage we found dates from 2018, when he was 84.',
        ],
      },
      {
        heading: 'What protects it',
        paras: [
          'We found no record of formal protection. The district contains the São Francisco Xavier Environmental Protection Area, created by state law in 2002 and covering about 11,560 hectares. That kind of designation is a loose planning zone: it guides land use but still allows private ownership and use, and it is not a reserve. We could not confirm that Vicente’s land lies inside it, and we found no record of the land being registered as a private natural heritage reserve, the Brazilian status that commits land to conservation permanently.',
          'As far as public records show, the forest’s future rests on the choices of Vicente and his family.',
        ],
        note: 'No before-and-after view here: the property has no mapped boundary, and at 31 hectares it is too small to pick out reliably on 30-metre satellite images without one.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Vicente’s forest is small by the standards of this blog, but it makes the point cleanly. Four decades of work have produced a forest, its springs and its animals, and none of it is bound to stay. A sale, an inheritance split or a change of plans could undo it, and no public record would need to change for that to happen.',
          'Brazil already has a tool for this, the private natural heritage reserve, which Sebastião and Lélia Salgado used at Instituto Terra, another story in this series. The Liminal Forests Alliance applies the same logic wherever it works: secure the land, then place it in an independent trust whose purpose is to keep it wild, so that one lifetime’s work does not depend on the next owner’s goodwill.',
        ],
      },
    ],
    sources: [
      { title: 'The Guardian — The man who planted a tree and grew a whole family of forests (2017)', url: 'https://www.theguardian.com/global-development-professionals-network/2017/mar/21/the-man-who-planted-a-tree-and-grew-a-whole-family-of-forests' },
      { title: 'BBC Mundo — Antonio Vicente and his forest (2017)', url: 'https://www.bbc.com/mundo/noticias-39922045' },
      { title: 'Rádio Nacional (EBC) — Antonio Vicente, o homem que plantou a própria floresta (2018)', url: 'https://radionacional.ebc.com.br/brasil-rural/2018/03/antonio-vicente-o-homem-que-plantou-a-propria-floresta' },
      { title: 'São Francisco Xavier Environmental Protection Area — Wikipedia', url: 'https://en.wikipedia.org/wiki/S%C3%A3o_Francisco_Xavier_Environmental_Protection_Area' },
    ],
  }),

  story({
    slug: 'yacouba-sawadogo-bangr-raaga',
    title: 'The forest of wisdom, and the town at its edge',
    location: 'Gourga, near Ouahigouya, Yatenga, Burkina Faso',
    region: 'Africa',
    summary:
      'Yacouba Sawadogo turned barren Sahel land into forest using improved planting pits. A growing town carved into it, and the state fenced 28 hectares in 2021. He died in 2023.',
    lead:
      'Around 1980, during the severe droughts in the Sahel, a farmer in northern Burkina Faso began digging planting pits in barren land near the village of Gourga. By the time Yacouba Sawadogo died in December 2023, those pits had become a forest of more than sixty species of trees and bushes, and the town of Ouahigouya had grown up around it.',
    cover: cover(P.sawadogo, '50% 22%'),
    photos: [P.sawadogo],
    glance: [
      ['Planter', 'Yacouba Sawadogo (died 2023)'],
      ['Began', 'Around 1980'],
      ['Area', 'About 25 to 40 ha (sources differ)'],
      ['Method', 'Improved zaï planting pits'],
      ['Protection', 'Fenced by the state in 2021; no title confirmed'],
    ],
    sections: [
      {
        heading: 'How the pits became a forest',
        paras: [
          'Sawadogo’s tool was zaï, a traditional Sahel practice of digging small pits to catch water and plant in hard, degraded soil. He made the pits somewhat larger and filled them with manure and compost. The manure drew termites, and their tunnels helped the soil hold what little rain fell. Seeds in the pits took root, and over the years the trees grew into woodland.',
          'He called it Bangr-Raaga, the forest of wisdom. Its size is reported anywhere from about 25 to almost 40 hectares; when the state fenced it in 2021, the fence enclosed 28. His work became widely known through the 2010 documentary The Man Who Stopped the Desert. He received the Right Livelihood Award in 2018, “for turning barren land into forest and demonstrating how farmers can regenerate their soil”, and was named a UN Champion of the Earth in 2020.',
        ],
        beforeAfter: SAT.sawadogo,
      },
      {
        heading: 'The town at its edge',
        paras: [
          'Ouahigouya, the regional capital, kept spreading, and the forest ended up inside its growth. In 2016 Reuters reported that investors building a housing project had annexed parts of Sawadogo’s land and carved it into plots, including the ground with his well and his parents’ graves. In 2019 the newspaper Sidwaya reported that a 2003 subdivision had already taken about five hectares, that houses were going up inside the forest and that trees were being cut illegally at night. Sawadogo held no land title, and the forest had never been marked out or fenced. The mayor said he wanted it classified as municipal heritage.',
          'Part of the forest burned in December 2020. In June 2021 the Ministry of Environment handed over a fence, a low wall topped with mesh, around 28 hectares. We could not confirm that a land title or heritage classification has followed. Sawadogo died in Ouahigouya on 3 December 2023, aged 77. His family pledged to keep managing the forest together, and one of his sons, Lookman, trained in forestry.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Bangr-Raaga is a restoration that worked ecologically and nearly failed legally. The satellite images show the success. The newspaper reports show what happens to land with no title at the edge of a growing town: it is treated as empty, divided into plots and built on.',
          'A fence helps, but a fence is not ownership. The Liminal Forests Alliance settles that question first, securing the land and placing it in an independent trust, so that a forest has a legal holder whose purpose is to keep it. For a place like Bangr-Raaga, that kind of standing would have mattered long before the plots were drawn up.',
        ],
      },
    ],
    sources: [
      { title: 'Right Livelihood — Yacouba Sawadogo', url: 'https://rightlivelihood.org/the-change-makers/find-a-laureate/yacouba-sawadogo/' },
      { title: 'Reuters (archived) — “They will destroy my father’s grave”, says farmer who turned back the desert (2016)', url: 'http://web.archive.org/web/20230605143142/https://www.reuters.com/article/us-burkina-landrights-hunger/they-will-destroy-my-fathers-grave-says-farmer-who-turned-back-the-desert-idUSKCN11W1Y6' },
      { title: 'Sidwaya — Forêt de Gourga dans le Yatenga (2019)', url: 'https://www.sidwaya.info/blog/2019/07/03/foret-de-gourga-dans-le-yatenga-lecocide-dun-patrimoine-mondial/' },
      { title: 'Sentinelle — La forêt du prix Nobel alternatif 2018 enfin protégée (2021)', url: 'https://sentinellebf.com/la-foret-du-prix-nobel-alternatif-2018-enfin-protegee/' },
      { title: 'Libreinfo — Yacouba Sawadogo (2023)', url: 'https://libreinfo.net/yacouba-sawadogo-doua/' },
      { title: 'EurekAlert — UNEP Champions of the Earth 2020', url: 'https://www.eurekalert.org/news-releases/761161' },
    ],
  }),

  story({
    slug: 'instituto-terra-salgado',
    title: 'Instituto Terra: a worn-out ranch, a new forest and a promise in law',
    location: 'Fazenda Bulcão, Aimorés, Minas Gerais, Brazil',
    region: 'South America',
    summary:
      'Sebastião and Lélia Salgado replanted a degraded cattle ranch with native trees, and made it a perpetual private reserve before most were planted. The satellite record shows the forest returning.',
    lead:
      'By the 1990s the Fazenda Bulcão, the Salgado family’s cattle ranch in Brazil’s Rio Doce valley, had been worn down to bare, eroded hills. The photographer Sebastião Salgado and his wife, Lélia Wanick Salgado, set out to bring back the Atlantic Forest that had once covered it. What makes their story unusual is not only the forest they grew, but the legal step they took first.',
    cover: cover(P.salgado, '50% 40%'),
    photos: [P.salgado, P.institutoTerra],
    glance: [
      ['Founders', 'Sebastião Salgado (died 2025) and Lélia Wanick Salgado'],
      ['Began', 'Instituto Terra founded April 1998; planting from December 1999'],
      ['Area', 'Farm about 710 ha (1,750 acres); reserve about 609 ha'],
      ['Trees', 'More than 3 million across the programme'],
      ['Protection', 'Private Natural Heritage Reserve (RPPN) since 1998'],
    ],
    sections: [
      {
        heading: 'A reserve before a forest',
        paras: [
          'The Salgados founded Instituto Terra in April 1998. That same year the farm was recognised as a Private Natural Heritage Reserve, or RPPN, a Brazilian designation that commits land to conservation in perpetuity. According to the institute, it was the first time the title had been granted to a degraded area, on condition that the forest be restored. Planting began in December 1999.',
          'The order matters. Most restoration projects plant first and look for protection later, if ever. At Instituto Terra the legal commitment came before the trees.',
        ],
      },
      {
        heading: 'What grew back',
        paras: [
          'The farm covers about 710 hectares, roughly 1,750 acres, of which about 609 hectares form the reserve. The institute says it has now planted more than three million native trees across its programme, which has since grown beyond the farm. An FAO case study reported 608 hectares restored by 2019, with 297 native tree species. The institute’s monitoring has recorded 172 bird, 33 mammal, 15 reptile and 15 amphibian species, and an ocelot was photographed there in 2011. In 2009 the reserve was named an outpost of the Atlantic Forest Biosphere Reserve.',
        ],
        beforeAfter: SAT.terra,
        photos: [P.institutoTerraHill],
      },
      {
        heading: 'After Sebastião',
        paras: [
          'Sebastião Salgado, who was born in Aimorés in 1944, died in Paris on 23 May 2025, aged 81. His ashes were scattered over the land he had restored. Lélia remains involved, including as a founder and board member of an Instituto Terra foundation set up in Switzerland in 2025, and their son Juliano Ribeiro Salgado chairs the institute.',
          'The reserve’s legal status did not change with his death. That is the point of the designation.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Instituto Terra is the clearest example in this series of forest makers doing what the Liminal Forests Alliance builds in from the start: fixing how the land is held, so that its protection does not depend on its founders. The Salgados were famous, well connected and able to raise money, and they still chose to bind the land legally before most of it was planted.',
          'An RPPN is a Brazilian tool; an independent trust is the alliance’s equivalent wherever it works. The logic is the same. Secure the land, commit it to conservation in a form that outlasts any one owner, and then do the slow work of restoration knowing it cannot simply be sold off or converted when circumstances change.',
        ],
      },
    ],
    sources: [
      { title: 'Instituto Terra — Our history', url: 'https://institutoterra.org/ourhistory/?lang=en' },
      { title: 'Instituto Terra — Annual report 2013 (PDF)', url: 'https://institutoterra.org/site/wp-content/uploads/2025/07/Relatorio-Anual-2013.pdf' },
      { title: 'FAO — Instituto Terra case study', url: 'https://www.fao.org/sustainable-forest-management/toolbox/cases/case-detail/en/c/1476869' },
      { title: 'Instituto Terra — Wikipedia (Portuguese)', url: 'https://pt.wikipedia.org/wiki/Instituto_Terra' },
      { title: 'Global Voices — From barren land to thriving forest (2025)', url: 'https://globalvoices.org/2025/06/05/from-barren-land-to-thriving-forest-the-story-of-photographer-sebastiao-salgados-instituto-terra-in-brazil/' },
      { title: 'Sebastião Salgado — Wikipedia', url: 'https://en.wikipedia.org/wiki/Sebasti%C3%A3o_Salgado' },
    ],
  }),

  story({
    slug: 'saalumarada-thimmakka-banyans',
    title: 'Three hundred and eighty-five banyans on a country road',
    location: 'Hulikal to Kudur road, Magadi taluk, Karnataka, India',
    region: 'Asia',
    summary:
      'Saalumarada Thimmakka and her husband planted and watered banyans along four kilometres of road in Karnataka. The trees survived a road-widening plan because she appealed in person. She died in 2025.',
    lead:
      'Saalumarada Thimmakka did not plant a forest in the usual sense. She and her husband planted a line of banyan trees along a country road in Karnataka, carried water to them by hand and kept them alive until they could look after themselves. Most accounts now count 385 of them, and they made her one of India’s best-known environmentalists.',
    cover: cover(P.thimmakka, '50% 40%'),
    photos: [P.thimmakka, P.thimmakkaBanyans],
    glance: [
      ['Planters', 'Saalumarada Thimmakka (died 2025) and her husband, Chikkaiah (died 1991)'],
      ['Trees', '385 banyans by most counts, and thousands of others'],
      ['Stretch', 'About 4 to 4.5 km of roadside'],
      ['Land', 'Government road land'],
      ['Protection', 'State-managed; no heritage order found'],
    ],
    sections: [
      {
        heading: 'Pails of water',
        paras: [
          'The road runs between the villages of Hulikal and Kudur in Magadi taluk, west of Bengaluru. Thimmakka and her husband, Chikkaiah, planted grafted banyan saplings along it: ten in the first year, fifteen in the second and twenty in the third. They carried pails of water about four kilometres to keep them alive. One account dates the start of the work to the 1960s; we could not confirm an exact year.',
          'Counts have varied over the years, from 284 in reports around 2000 to the 385 given by most sources now, along a stretch of four to four and a half kilometres. Over her life she is also credited with planting thousands of other trees.',
        ],
      },
      {
        heading: 'Honours, and a long life',
        paras: [
          'Recognition came late but in quantity: the National Citizen’s Award in 1995, the Nadoja award in 2010, a place on the BBC’s 100 Women list in 2016 and the Padma Shri in 2019. Chikkaiah died in 1991. Thimmakka died in Bengaluru on 14 November 2025, at a claimed age of 114, though her year of birth is disputed. She was buried with full state honours, and Karnataka’s forest minister announced an award in her name and the planting of 114 saplings in 114 places.',
        ],
        photos: [P.thimmakkaPadma],
      },
      {
        heading: 'Who looks after the trees now',
        paras: [
          'The banyans stand on government road land; Thimmakka never owned them. The Karnataka government has taken over their management, and a roadside sign from the state’s social forestry division names them as her work.',
          'That has not made them safe. In 2019 a plan to widen the road would have felled them. On 3 June that year Thimmakka met the chief minister, H. D. Kumaraswamy, who told officials not to cut the trees and to find another way. We could not confirm that a permanent alternative was ever settled, and we found no formal heritage protection for the avenue. Her foster son, Umesh Vanasiri, asked at the time for a permanent safeguard.',
        ],
        note: 'No before-and-after view here: a single row of roadside trees is too narrow to see on 30-metre satellite images.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Thimmakka’s banyans show the difference between being admired and being protected. Few trees in India are better known, and they still came within one planning decision of being cut. What saved them in 2019 was a personal appeal from a woman then said to be more than a hundred years old, which is not something anyone can rely on twice.',
          'The Liminal Forests Alliance works with large wild landscapes rather than roadside avenues, but the lesson carries over. Protection that depends on public affection or a sympathetic official can vanish with a new government or a new road plan. Placing land in an independent trust whose single purpose is to keep it wild makes protection the default, so that nobody has to plead for it.',
        ],
      },
    ],
    sources: [
      { title: 'Saalumarada Thimmakka — Wikipedia', url: 'https://en.wikipedia.org/wiki/Saalumarada_Thimmakka' },
      { title: 'Mongabay India — Saalumarada Thimmakka, mother of trees, has died aged 114 (2025)', url: 'https://india.mongabay.com/short-article/2025/11/saalumarada-thimmakka-mother-of-trees-has-died-aged-114' },
      { title: 'The Week (PTI) — Thimmakka’s funeral (2025)', url: 'https://www.theweek.in/wire-updates/national/2025/11/15/mes19-ka-thimmakka-funeral.html' },
      { title: 'The News Minute — Thimmakka convinces Karnataka CM not to chop trees for road widening (2019)', url: 'https://www.thenewsminute.com/article/107-yr-old-activist-thimakka-convinces-karnataka-cm-not-chop-trees-road-widening-102939' },
      { title: 'SheThePeople — Karnataka CM agrees not to axe Thimmakka’s trees (2019)', url: 'https://www.shethepeople.tv/news/107-year-old-thimakka-karnataka-cm-not-axe-trees' },
      { title: 'Down To Earth — A mother’s love (2002)', url: 'https://www.downtoearth.org.in/coverage/a-mothers-love-14815' },
    ],
  }),

  story({
    slug: 'sai-sanctuary-malhotra',
    title: 'From abandoned coffee land to rainforest, held in a trust',
    location: 'SAI Sanctuary, Theralu, Kodagu, Karnataka, India',
    region: 'Asia',
    summary:
      'Anil and Pamela Malhotra bought abandoned plantation land beside a Western Ghats wildlife sanctuary, let it return to forest and put it in a trust. Both have now died.',
    lead:
      'From the early 1990s Anil and Pamela Malhotra bought run-down plantation land in Kodagu, in India’s Western Ghats, piece by piece, and let it turn back into rainforest. They called it the SAI Sanctuary. Unlike most of the forest makers in this series, they also gave the land a legal holder: a trust.',
    cover: cover(P.pamela, '35% 40%'),
    photos: [P.pamela],
    glance: [
      ['Founders', 'Anil Malhotra (died 2021) and Pamela Malhotra (died 2024)'],
      ['Began', 'Search from 1991; first land 1992 to 1993'],
      ['Area', '55 acres at first; at least 300 acres now'],
      ['Held by', 'SAI Sanctuary Trust, set up in 2002'],
      ['Protection', 'Private land; no government status'],
    ],
    sections: [
      {
        heading: 'Buying back a forest, piece by piece',
        paras: [
          'Anil Malhotra began looking for land in 1991. Accounts differ slightly on dates: the sanctuary says its first purchase was in 1992, while Pamela Malhotra’s own account says they became owners in 1993. That first purchase was 55 acres in south Kodagu, bought from a farmer facing foreclosure. Over the following years they added parcel after parcel from different sellers, mostly abandoned or stripped coffee and cardamom land, along the edge of the Brahmagiri Wildlife Sanctuary.',
          'Their approach was mostly to let the forest come back. They allowed no felling, kept the native trees that remained and planted more native species around them. A naturalists’ survey reported in 2016 counted 46 native tree varieties.',
        ],
      },
      {
        heading: 'What lives there now',
        paras: [
          'The sanctuary covers at least 300 acres, about 120 hectares, crossed by a year-round stream that rises in the Brahmagiri hills and runs to the Barapole river, with otters in it. Elephants use the land; a herd with calves came through in December 2013. Leopards, tigers, dhole and king cobras have been recorded, and bird counts range from 105 species in one survey to more than 300 by the sanctuary’s own count. In 2014 it was named Wildlife and Tourism Initiative of the Year by TOFTigers and Sanctuary Asia, and in 2017 Pamela received the Nari Shakti Puraskar, a national award honouring women.',
        ],
        note: 'No before-and-after view here: the sanctuary sits in continuous Western Ghats forest, and without a mapped boundary its regrowth cannot be told apart from the forest around it at 30-metre resolution.',
      },
      {
        heading: 'A trust, and an open question',
        paras: [
          'In 2002 the Malhotras set up the SAI Sanctuary Trust, a registered non-profit, to hold the land. Anil said it was needed partly because of land-ceiling laws, which cap how much land one person may own. The land is private, and it has no government protection status.',
          'Anil died on 22 November 2021, and his last rites were held at the sanctuary. Pamela died in April 2024, according to Wikipedia, which cites an obituary we could not open; we found no second source. We could not confirm who manages the sanctuary now. Its trustee page, archived in 2025, still listed Anil as chair. The sanctuary’s old web address now shows unrelated spam, so the link below points to an archived copy of its pages.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Malhotras did what most forest makers never get round to: they moved their land into a trust while they were alive. That is the heart of the Liminal Forests Alliance’s model, and it is why the sanctuary, unlike several forests in this series, does not legally depend on one person.',
          'Their story also shows what a trust needs in order to keep working: trustees, money and people on the ground. A legal structure stops the land being sold off in a hurry, but it does not manage itself. With both founders gone, the sanctuary’s next chapter depends on whether its trust has the people to carry it.',
        ],
      },
    ],
    sources: [
      { title: 'SAI Sanctuary — Wikipedia', url: 'https://en.wikipedia.org/wiki/SAI_Sanctuary' },
      { title: 'SAI Sanctuary — About (archived, March 2025)', url: 'https://web.archive.org/web/20250303/https://www.saisanctuary.com/about.htm' },
      { title: 'The Week — India’s private wildlife sanctuary (2016)', url: 'https://www.theweek.in/theweek/specials/private-wildlife-sanctuary.html' },
      { title: 'The Week — Anil Malhotra, owner of India’s first private wildlife sanctuary, no more (2021)', url: 'https://www.theweek.in/news/india/2021/11/24/anil-malhotra-owner-of-indias-first-private-wildlife-sanctuary-no-more.html' },
      { title: 'Pamela Malhotra — Wikipedia', url: 'https://en.wikipedia.org/wiki/Pamela_Malhotra' },
      { title: 'Resilience — From wasteland to rainforest (2016)', url: 'https://www.resilience.org/stories/2016-06-29/from-wasteland-to-rainforest/' },
    ],
  }),

  story({
    slug: 'jia-haixia-jia-wenqi-riverbank',
    title: 'Two friends, a riverbank and ten thousand trees',
    location: 'Yeli village, Jingxing county, Hebei, China',
    region: 'Asia',
    summary:
      'A blind man and his friend who has no arms planted more than 10,000 trees on barren riverbank in Hebei, mostly from cuttings. The trees were meant as a living; fame changed that.',
    lead:
      'In 2002 two men from Yeli village in Hebei province began planting trees on a strip of barren riverbank. Jia Haixia is blind. His friend Jia Wenqi has no arms. By 2016 they had more than 10,000 trees, and a story that had travelled around the world, not always accurately.',
    cover: cover(P.yeRiver, '50% 60%'),
    photos: [P.yeRiver],
    glance: [
      ['Planters', 'Jia Haixia and Jia Wenqi'],
      ['Began', 'Land contracted 2001; planting from spring 2002'],
      ['Area', 'About 50 mu, roughly 3.3 ha'],
      ['Trees', 'More than 10,000 poplars and willows'],
      ['Held by', 'Village collective land, contracted to them'],
    ],
    sections: [
      {
        heading: 'Cuttings, not saplings',
        paras: [
          'Jia Haixia lost his sight in an accident in 2000. Jia Wenqi lost both arms as a child. They are childhood friends, not close relatives. In 2001 their village committee contracted them about 50 mu, roughly 3.3 hectares, of barren riverbank on the Ye River, free of charge, and the following spring they started planting.',
          'They had no money for saplings, so they grew poplars and willows from cuttings. In the first year only two of roughly 800 cuttings survived. They kept going. The Associated Press counted about 12,000 trees in 2015, and Chinese reporting in 2016 put the total at more than 10,000.',
        ],
      },
      {
        heading: 'What the trees are for',
        paras: [
          'In the most detailed account, by the Chinese news site The Paper in 2016, the original aim was a living: the trees were timber the two men hoped to sell one day. The story of two disabled men greening their village came later, partly from the media. A claim often repeated online, that their trees protect the village from floods, has little support. Their contract with the village says it will not compensate them if floods wash the trees away, and the only flood link we found was a village official telling China Daily that perhaps the roots were keeping the water steady.',
          'Fame has changed their position. Reports valued the trees at anywhere from ¥100,000 to ¥500,000, yet by 2016 the two men told reporters they no longer dared to cut and sell them, because neighbours and officials would object. They were named among Hebei’s ten most moving people of 2014, and had been offered more than 100 mu of barren hillside for a second phase. We found no reporting on them after 2016.',
        ],
        note: 'No before-and-after view here: the plot’s exact location is not mapped, and at about 3 hectares it is too small for 30-metre satellite images.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'The Jias’ story is a useful corrective to the way restoration gets told. Their trees are real, and so is their achievement. But they never set out to create a protected forest. They set out to grow timber on land they did not own, under a contract that left them carrying the risk. That is how a great deal of tree planting actually works.',
          'Whether those trees stay standing depends on a village contract and on public opinion, not on any commitment to keep them as forest. The Liminal Forests Alliance works with large wild landscapes rather than small plantations, but it asks the same question everywhere: who holds the land, and what are they bound to do with it? An independent trust answers that question in writing. Goodwill and publicity do not.',
        ],
      },
    ],
    sources: [
      { title: 'The Paper (澎湃新闻) — report on Jia Haixia and Jia Wenqi (2016)', url: 'https://m.thepaper.cn/newsDetail_forward_1476661' },
      { title: 'People’s Daily weekly (人民周刊) — report on the two friends (2016)', url: 'https://paper.people.com.cn/rmzk/html/2016-07/07/content_1693473.htm' },
      { title: 'The Globe and Mail (AP) — Armless man and blind friend plant thousands of trees in China (2015)', url: 'https://www.theglobeandmail.com/news/world/armless-man-and-blind-friend-plant-thousands-of-trees-in-china/article24210682/' },
      { title: 'China Daily — report on the Yeli village planters (2015)', url: 'https://www.chinadaily.com.cn/a/201510/16/WS5a2b4432a310eefe3e99f3f8.html' },
    ],
  }),

  story({
    slug: 'moirangthem-loiya-punshilok',
    title: 'Punshilok: a hill forest on borrowed ground',
    location: 'Langol hill range, Imphal, Manipur, India',
    region: 'Asia',
    summary:
      'From 2002 Moirangthem Loiya regrew about 300 acres of forest on burned hills above Imphal, living alone in a hut for six years. The land belongs to the state.',
    lead:
      'Lists of famous tree planters often credit this forest to a “Moirangthem Pacha” and put it at 20 acres. The man who grew it is Moirangthem Loiya, and it covers about 300 acres of the Langol hills on the northern edge of Imphal. He does not own any of it.',
    cover: cover(P.langol, '60% 55%', 'Image: Copernicus Sentinel-2, contains modified Copernicus Sentinel data 2025.'),
    photos: [P.langol],
    glance: [
      ['Planter', 'Moirangthem Loiya'],
      ['Began', '2002'],
      ['Area', 'About 300 acres (121 ha)'],
      ['Land', 'Inside Langol Reserved Forest, owned by the state'],
      ['Looked after by', 'Wildlife and Habitat Protection Society (WAHPS)'],
    ],
    sections: [
      {
        heading: 'Six years in a hut',
        paras: [
          'The slopes Loiya chose had been cleared by burning for shifting cultivation. He began planting in 2002, built a hut on the hill and lived there alone for about six years while the saplings grew. In 2003 he co-founded the Wildlife and Habitat Protection Society to share the work. His funding came from his brother, not the state. He now lives in Phayeng village, about fifteen minutes away, and stays at the forest on and off.',
          'He named it Punshilok, which means “spring of life” in Meitei. Counts differ, but it now holds somewhere between 100 and 250 plant species, among them 20 to 30 kinds of bamboo and around 20 orchids, along with barking deer, porcupines, mongooses, snakes and many birds. In 2019 he received a Nature Conservancy award from the Balipara Foundation, and a 2018 Films Division documentary, The Jungle Man… Loiya, told his story.',
        ],
      },
      {
        heading: 'Water',
        paras: [
          'In 2017 The Better India reported that volunteers had cleaned and de-silted a stream on the hill that now provides drinking water, and that the forest had raised the local water table. In 2024 the Sangai Express reported that the forest’s spring, the society’s only water source, had stopped flowing for a few weeks in each of the previous two dry seasons, and that a project to revive it was under way.',
        ],
      },
      {
        heading: 'Recognition without ownership',
        paras: [
          'Punshilok lies inside the Langol Reserved Forest, which belongs to the state. Settlement there is normally treated as encroachment, but officials did not treat Loiya’s work that way, and the forest department made him part of a joint forest management committee, a local body that helps run reserved forests.',
          'That is real recognition, with real limits. The society cuts a firebreak every November. It has dealt with hunting, rumours that Loiya was grabbing land, illegal small-scale mining and, in 2024, enough trespass and litter from hikers that it closed the forest to visitors without permission. The wider reserve has long suffered from encroachment, illegal mining and felling; in May 2025 forest officials marched through it to curb them.',
        ],
        note: 'No before-and-after view here: Punshilok has no mapped boundary, so the forest cannot be told apart from the rest of the hill range on satellite images.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Punshilok is a forest that exists by permission. The state owns the land, tolerates the work and has given Loiya a seat on a committee. That arrangement has held for two decades, and it could change with a new policy, a new official or a dispute over the hills.',
          'The Liminal Forests Alliance works the other way round: secure the land first, then place it in an independent trust whose job is to keep it wild. Where land is public, as here, the nearest thing is a formal and lasting agreement rather than goodwill. Loiya has built the forest. What it lacks is a guarantee that someone will be responsible for it when he no longer can be.',
        ],
      },
    ],
    sources: [
      { title: 'Mongabay India — Protecting a forest on a hill in Imphal (2021)', url: 'https://india.mongabay.com/2021/10/protecting-a-forest-on-a-hill-in-imphal/' },
      { title: 'EastMojo — Manipur man converts barren land into 300-acre forest (2022)', url: 'https://eastmojo.com/manipur/2022/11/13/manipur-man-converts-barren-land-into-300-acre-forest/' },
      { title: 'The Better India — Punshilok and the Wildlife and Habitat Protection Society (2017)', url: 'https://thebetterindia.com/89522/manipur-punshilok-moirangthem-loiya-ngamba-wildlife-habitat-protection-society' },
      { title: 'The Sangai Express — Punshilok, a 300-acre forest (2024)', url: 'https://www.thesangaiexpress.com/Encyc/2024/8/4/Mangal-Salam-Most-must-have-heard-about-the-breathtaking-300-acre-forest-known-as-Punshilok-nestled-in-th.html' },
      { title: 'EastMojo — Manipur man toiled for 17 years to bring a dying forest back to life (2019)', url: 'https://eastmojo.com/news/2019/09/06/manipur-man-toiled-for-17-years-to-bring-dying-forest-back-to-life/' },
      { title: 'India Today NE — Route march to curb encroachment in Langol reserve forest (2025)', url: 'https://www.indiatodayne.in/manipur/story/manipur-route-march-conducted-by-forest-officials-to-curb-encroachment-in-langol-reserve-forest-1210132-2025-05-07' },
    ],
  }),

  story({
    slug: 'daripalli-ramaiah-vanajeevi',
    title: 'Ten million trees, more or less: Vanajeevi Ramaiah',
    location: 'Reddipalli, Khammam district, Telangana, India',
    region: 'Asia',
    summary:
      'For more than fifty years Daripalli Ramaiah scattered seeds and planted saplings along the roads of Khammam district, and is usually credited with ten million trees. He died in 2025.',
    lead:
      'Daripalli Ramaiah, known as Vanajeevi Ramaiah, planted trees for more than fifty years along the roadsides, canal banks and open ground around his village in Telangana. He is usually credited with about ten million of them. Nobody counted, and he said himself that he did not remember the number.',
    cover: cover(P.ramaiah, '50% 30%'),
    photos: [P.ramaiah],
    glance: [
      ['Planter', 'Daripalli “Vanajeevi” Ramaiah (1937 to 2025)'],
      ['Active', 'More than five decades'],
      ['Trees', 'An estimated 10 million, never counted'],
      ['Where', 'Roadsides and open land, Khammam district'],
      ['Protection', 'None found for his plantings'],
    ],
    sections: [
      {
        heading: 'Seeds from a bicycle',
        paras: [
          'Ramaiah was born in Reddipalli, in Khammam district, on 1 July 1937. He carried seeds in his pockets and scattered them from his bicycle, steering with one hand, and switched to a motorbike as he aged. Reports describe him planting both sides of a canal-bank road of about four kilometres from Khammam, and an eight-kilometre stretch from Khammam to Reddipalli. He favoured native species such as neem, teak, bael, peepal and kadamba. His wife, Janamma, worked alongside him. He wore a headband reading “Vriksho Rakshati Rakshitah”, roughly “protect the trees and they will protect you”.',
          'The figure of ten million, a crore in Indian counting, is how he is usually described, but it is an estimate. Some sources give far smaller numbers, and he once told an interviewer that he did not exactly remember how many he had planted.',
        ],
      },
      {
        heading: 'Honours',
        paras: [
          'He received the Padma Shri from President Pranab Mukherjee on 30 March 2017, after earlier recognition including a Seva Award in 1995 and a Vanamitra Award in 2005. Lessons about his life are taught in school textbooks in Telangana and Maharashtra. He died of a heart attack at his home in Reddipalli on 12 April 2025, aged 87.',
        ],
        photos: [P.ramaiahAward],
      },
      {
        heading: 'What happens to scattered trees',
        paras: [
          'Ramaiah’s work was never one forest that could be fenced or registered. It was spread along roads and over open ground, much of it public land, with no single owner. After his death a former member of India’s upper house of parliament said some of his saplings had already been lost to road expansion and called for replanting. Proposals followed to name a local road and the state’s yearly tree-planting festival after him; we could not confirm that either was adopted. His granddaughter marked his passing by giving away 3,000 saplings. We found no formal programme or protection for what he planted.',
        ],
        note: 'No before-and-after view here: his planting was scattered along roads and open land, not a single block that satellite images can show.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Ramaiah’s life is a reminder that not all restoration produces a place. Much of his legacy is spread out: trees along roads and canals, owned by no one in particular and protected by no one in particular. That is part of why road expansion could take some of them so easily.',
          'The Liminal Forests Alliance works at the other end of the scale, with large, intact wild landscapes, because land that can be held as a whole can be protected as a whole. A trust can hold a forest. It cannot hold a roadside. Ramaiah’s trees show both the value of one person’s effort and the limits of effort that no structure stands behind.',
        ],
      },
    ],
    sources: [
      { title: 'Mongabay India — Telangana green crusader Daripalli Ramaiah dies at 87 (2025)', url: 'https://india.mongabay.com/2025/04/telangana-green-crusader-daripalli-ramaiah-dies-at-87-obituary/' },
      { title: 'The Tribune — Telangana’s tree man dies at 87 (2025)', url: 'https://www.tribuneindia.com/news/india/telanganas-tree-man-dies-at-87' },
      { title: 'The News Minute — Padma Shri for the Telangana man who planted over one crore saplings (2017)', url: 'https://www.thenewsminute.com/article/green-warrior-padma-shri-telangana-man-who-planted-over-one-crore-saplings-56295' },
      { title: 'Telangana Today — A tribute to Vanajeevi Ramaiah (2025)', url: 'https://telanganatoday.com/a-tribute-to-vanajeevi-ramaiah-santosh-kumar-advocates-national-recognition' },
      { title: 'The Hans India — In the footsteps of Vanajeevi Ramaiah (2025)', url: 'https://thehansindia.com/telangana/in-the-footsteps-of-vanajeevi-ramaiah-965644' },
    ],
  }),

  story({
    slug: 'wangari-maathai-green-belt-karura',
    title: 'Wangari Maathai, and a forest that still needs defending',
    location: 'Kenya',
    region: 'Africa',
    summary:
      'Wangari Maathai’s Green Belt Movement has grown more than 51 million trees, mainly in Kenya. Her 1999 fight for Karura Forest is being fought again in court.',
    lead:
      'Wangari Maathai did not plant one forest. She started a movement that, by its own count, has grown more than 51 million trees, mainly in Kenya, and she became the first African woman to receive the Nobel Peace Prize. She also understood earlier than most that planting was only half of the work. The other half was defending the forests that already stood.',
    cover: cover(P.maathai, '50% 35%'),
    photos: [P.maathai, P.karura],
    glance: [
      ['Founder', 'Wangari Maathai (1940 to 2011)'],
      ['Founded', 'Green Belt Movement, 1977'],
      ['Trees', 'More than 51 million, by the movement’s count'],
      ['Nobel', 'Peace Prize, 2004'],
      ['Today', 'The movement is active; Karura Forest is in court'],
    ],
    sections: [
      {
        heading: 'A movement of women',
        paras: [
          'Maathai, born in Nyeri, Kenya, in 1940, founded the Green Belt Movement in 1977 under the National Council of Women of Kenya. It was a response to what rural Kenyan women were reporting: their streams were drying up, their food supply was less secure, and they had to walk further and further for firewood. Her answer was to get them planting trees. The first planting, seven trees in Nairobi’s Kamukunji Park, took place on World Environment Day that year.',
          'The movement worked mainly in Kenya, where it trained tens of thousands of women, and from 1986 a pan-African network carried the model to other countries. It now counts more than 51 million trees grown. In 2004 Maathai received the Nobel Peace Prize “for her contribution to sustainable development, democracy and peace”, the first African woman to do so. She died in Nairobi on 25 September 2011, aged 71.',
        ],
      },
      {
        heading: 'Defending what stands',
        paras: [
          'In 1989 Maathai led opposition to a planned 60-storey tower in Nairobi’s Uhuru Park; its foreign investors pulled out early in 1990. A decade later she took on a larger fight. In 1998 she learned of plans to hand public land in Karura Forest, on Nairobi’s northern edge, to private developers. On 8 January 1999, while she and others were planting trees there in protest, they were attacked and she was injured. In August that year the president banned the allocation of public land.',
          'Karura survived. It has been a forest reserve since 1932 and covers about 1,041 hectares. For years it was run by the Kenya Forest Service together with a community group, Friends of Karura, under whose management more than 200,000 native trees were planted.',
        ],
      },
      {
        heading: 'Contested again',
        paras: [
          'In August 2025 the Kenya Forest Service moved the forest’s entry fees to a government payment system and removed Friends of Karura from its management role; the group went to court. Early in 2026 the government announced barracks for the National Youth Service at a site inside the forest, and trees were cut. On 25 March 2026 Friends of Karura reported a court order that construction should stop pending further directions. The case was brought by Friends of Karura and the Green Belt Movement, so Maathai’s organisation is defending the same forest a quarter of a century later. We found no final judgment.',
        ],
        note: 'No before-and-after view here: Karura has been forest throughout, and recent planned felling of exotic trees for native replanting would muddy any satellite comparison.',
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Karura is the strongest case in this series against the idea that legal protection settles everything. It has been a protected forest reserve for nearly a century, and it still needed defending in 1999 and again in 2026. Protection is not a single act. It is a standing commitment that someone has to hold.',
          'The Liminal Forests Alliance places land in independent trusts so that there is always a party whose job is to hold that commitment, separate from any one owner or government. Maathai built that kind of party for Kenya’s forests in the Green Belt Movement. Her legacy is not only 51 million trees, but an organisation that still turns up in court.',
        ],
      },
    ],
    sources: [
      { title: 'The Green Belt Movement', url: 'https://www.greenbeltmovement.org/' },
      { title: 'The Green Belt Movement — Our history', url: 'https://www.greenbeltmovement.org/history/' },
      { title: 'The Nobel Prize — laureate data for Wangari Maathai', url: 'https://api.nobelprize.org/2.1/laureates?name=Maathai' },
      { title: 'PBS NewsHour — Remembering Wangari Maathai (2011)', url: 'https://www.pbs.org/newshour/nation/remembering-wangari-maathai-first-african-woman-to-win-nobel-peace-prize' },
      { title: 'African Arguments — Karura Forest and the politics of community-based conservation (2025)', url: 'https://africanarguments.org/2025/09/karura-forest-and-the-politics-of-community-based-conservation-in-kenya/' },
      { title: 'Friends of Karura — Court order to halt construction inside Karura Forest (2026)', url: 'https://friendsofkarura.org/friends-of-karura-welcome-the-court-order-to-halt-construction-inside-karura-forest/' },
      { title: 'Wangari Maathai — Wikipedia', url: 'https://en.wikipedia.org/wiki/Wangari_Maathai' },
    ],
  }),

  story({
    slug: 'man-who-planted-trees-bouffier',
    title: 'The man who planted trees never lived',
    location: 'Haute-Provence, France',
    region: 'Europe',
    outcome: 'Fiction',
    summary:
      'Elzéard Bouffier, the shepherd who reforests a valley in Jean Giono’s story, was invented. The hills of Haute-Provence really were replanted, though, and the story still inspires real planting.',
    lead:
      'Many lists of great tree planters end with Elzéard Bouffier, a solitary shepherd who turns a barren valley in Provence into forest. He never existed. He is the hero of Jean Giono’s short story The Man Who Planted Trees, and the story behind the story is almost as interesting as the fiction.',
    cover: cover(P.vergons, '50% 45%'),
    photos: [P.vergons],
    glance: [
      ['Author', 'Jean Giono'],
      ['Written', '1953'],
      ['First published', '1954, in English, in Vogue'],
      ['Real?', 'No; Giono confirmed it in 1957'],
      ['Film', 'Frédéric Back, 1987; Academy Award 1988'],
    ],
    sections: [
      {
        heading: 'The story',
        paras: [
          'In the story, a narrator walking across the barren uplands of Haute-Provence in 1913 meets a shepherd who plants acorns, a hundred at a time. The narrator returns after the First World War and finds young oaks, and later beech and birch. Over decades, and through two world wars, the valley turns green, its streams run again and people come back. Bouffier dies peacefully in a hospice in Banon in 1947.',
        ],
      },
      {
        heading: 'An invented man',
        paras: [
          'Giono wrote the story in 1953 after Reader’s Digest asked him for a piece about the most extraordinary character he had ever met. The magazine turned it down, doubting that Bouffier existed. It first appeared in English, in Vogue, in March 1954, under the title The Man Who Planted Hope and Grew Happiness.',
          'For a while Giono let readers believe the man was real. In 1957 he wrote to the chief forestry official in Digne that Bouffier was an invented character, meant to make people love planting trees. He gave away the rights and said the story did not earn him a cent. In 1987 the animator Frédéric Back made it into a half-hour film for Radio-Canada, narrated in French by Philippe Noiret and in English by Christopher Plummer, which won the Academy Award for animated short film the following year.',
        ],
      },
      {
        heading: 'The real reforestation',
        paras: [
          'The hills Giono described do have a real reforestation history, and it is older than his story. From the second half of the nineteenth century the French state replanted eroded mountain land across the southern Alps, much of it with Austrian black pine and larch, to hold the slopes and calm flash floods. One account puts the planting in this region at around 100,000 hectares before the First World War.',
        ],
        photos: [P.faucon],
      },
      {
        heading: 'The story’s real effect',
        paras: [
          'The story has inspired real planting in turn. France’s national forestry office named a climate project after Giono: from 2011 it collected acorns and beechnuts in Provence and elsewhere, and planted beeches further north, near Verdun, moving southern trees ahead of a warming climate. Some popular lists also say the story inspired famous real planters, including Wangari Maathai. French sources say her movement did not draw on it, and we found no good evidence that it did.',
        ],
      },
      {
        heading: 'Why it matters for the trust model',
        paras: [
          'Bouffier is the ideal forest maker: tireless, selfless and alone. That is also what makes him fiction. The real forest makers in this series grew old, lost land to a town or a road, or died, and the forests that look most secure are the ones whose land ended up in a structure designed to keep them.',
          'In a sense the Liminal Forests Alliance is built for a world without Bouffiers. It does not depend on one extraordinary person living long enough. It secures the land and places it in an independent trust, so that protection comes from how the land is held rather than from who happens to be looking after it.',
        ],
      },
    ],
    sources: [
      { title: 'L’Homme qui plantait des arbres — Wikipedia (French)', url: 'https://fr.wikipedia.org/wiki/L%27Homme_qui_plantait_des_arbres' },
      { title: 'The Man Who Planted Trees — Wikipedia', url: 'https://en.wikipedia.org/wiki/The_Man_Who_Planted_Trees' },
      { title: 'Karl Kehrle bibliography — The Man Who Planted Trees and the reforestation of Haute-Provence', url: 'https://bibliography.karlkehrle.org/?p=200' },
      { title: 'Academy of Motion Picture Arts and Sciences — the 60th Academy Awards (1988)', url: 'https://www.oscars.org/oscars/ceremonies/1988' },
      { title: 'TerraDaily (AFP) — Beeches thrive in France’s Verdun in flight from climate change (2024)', url: 'https://terradaily.com/beeches-thrive-in-frances-verdun-in-flight-from-climate-change-999/' },
    ],
  }),
];

// ---- The hub ------------------------------------------------------------

const hub = {
  slug: SERIES,
  title: 'They planted forests by hand. Who keeps them now?',
  date: DATE,
  location: 'India, Brazil, Burkina Faso, China, Kenya and France',
  region: 'Around the world',
  outcome: 'Restoration',
  featured: true,
  summary:
    'A series of eleven stories about people who grew forests by hand, ten real and one fictional, with photographs and satellite before-and-after views, and what keeps their forests standing now.',
  lead:
    'Most dispatches here are about land that changed hands. This series is about land that changed state: a bare river sandbar, worn-out cattle pasture and crusted Sahel soil turned back into forest by people with seeds, buckets and decades of patience. There are ten real forest makers in it and one fictional shepherd. Several of the real ones have died since 2023, which makes a quieter question hard to avoid. Once the planter is gone, what keeps the forest standing?',
  cover: cover(P.karura, '50% 50%'),
  intro: [
    'Each story has its own page, photographs and sources. Every photograph is freely licensed and credited beside it, mostly from Wikimedia Commons. Where a forest is large enough to see from orbit and its location is known, there is a before-and-after view of the same ground made from public Landsat satellite imagery. Some famous before-and-after photographs, such as Instituto Terra’s, are copyrighted, so they are not reproduced here. Where no honest comparison exists, the story says so.',
    'Several figures that circulate widely about these people turned out to be wrong or overstated, from a forest’s size to the planter’s name. The stories follow their cited sources, and where accounts disagree, they say so.',
  ],
  series: stories.map((s) => s.slug),
  seriesHeading: 'The stories',
  sections: [
    {
      heading: 'What keeps a planted forest standing',
      paras: [
        'Read together, these stories sort themselves less by how many trees went in than by how the land is held. The Salgados’ forest at Instituto Terra has the firmest footing. It was committed to a perpetual private reserve in 1998, before most of it was planted, and its legal status did not change when Sebastião Salgado died. Karura Forest is public and legally protected, yet in 2026 it still needed Wangari Maathai’s movement in court.',
        'Most of the others rest on something thinner. Jadav Payeng’s Molai Forest has no legal protection at all. Yacouba Sawadogo’s forest was carved into housing plots before the state fenced what remained, and no title has been confirmed. Saalumarada Thimmakka’s banyans survived a road-widening plan because she appealed to the chief minister in person. Moirangthem Loiya’s forest grows on state land by official goodwill. The SAI Sanctuary sits in a trust, which was a sound decision, but with both founders gone we could not find out who runs it. Antonio Vicente’s forest, as far as public records show, depends on his family.',
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
    { title: 'Microsoft Planetary Computer — Landsat Collection 2 Level-2 (satellite imagery used for the before-and-after views)', url: 'https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2' },
    { title: 'U.S. Geological Survey — Are there any restrictions on the use or redistribution of Landsat data?', url: 'https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data' },
    { title: 'Microsoft Planetary Computer — Sentinel-2 Level-2A (the Langol hills view)', url: 'https://planetarycomputer.microsoft.com/dataset/sentinel-2-l2a' },
    { title: 'OpenStreetMap — Copyright and licence (outlines on the satellite views)', url: 'https://www.openstreetmap.org/copyright' },
    { title: 'Wikimedia Commons — Reusing content outside Wikimedia (photographs)', url: 'https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia' },
  ],
};

export const plantersPosts = [hub, ...stories];
