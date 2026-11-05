// Real footage and photography used on the page, with credits.
// Files live in public/media/. Every item here is credited in the footer.
// All come from free-licence libraries (Pixabay Content License, Unsplash
// License): free commercial use, no permission needed; we credit anyway.

export const media = {
  hero: {
    video: '/media/film/hero-1080.mp4',
    sd: '/media/film/hero-720.mp4',
    poster: '/media/film/hero-poster.webp',
    width: 1920,
    height: 1080,
    alt: 'Aerial view of rainforest-covered hills at dawn, with golden mist rising through the canopy.',
    credit: 'haruudu',
    source: 'https://pixabay.com/videos/mountains-birds-fog-mist-morning-210305/',
    licence: 'Pixabay licence',
  },
  closing: {
    src: '/media/photo/closing.webp',
    width: 1920,
    height: 1235,
    alt: 'Torres del Paine, Chile, lit orange at sunrise beneath a lenticular cloud.',
    credit: 'Marc Thunis',
    source: 'https://unsplash.com/photos/rocky-mountain-under-orange-sky-Dw3APludDpE',
    licence: 'Unsplash licence',
  },
  ways: [
    {
      src: '/media/photo/way-fund.webp',
      width: 900,
      height: 600,
      alt: 'An intact tropical rainforest canopy seen from directly above.',
      credit: 'Bernd Dittrich',
      source: 'https://unsplash.com/photos/an-aerial-view-of-a-forest-with-lots-of-trees-RWDqA18oLEA',
      licence: 'Unsplash licence',
    },
    {
      src: '/media/photo/way-land.webp',
      width: 900,
      height: 530,
      alt: 'A dark river meandering through a wet floodplain inside unbroken forest.',
      credit: 'Adam Śmigielski',
      source: 'https://unsplash.com/photos/aerial-view-of-green-trees-and-plants-SWa6EYLCac0',
      licence: 'Unsplash licence',
    },
    {
      src: '/media/photo/way-partner.webp',
      width: 900,
      height: 675,
      alt: 'Old-growth conifer forest in soft mist, with moss-covered trunks and fallen logs.',
      credit: 'David Baker',
      source: 'https://unsplash.com/photos/view-of-forest-during-daytime-IIutLJ2bMs4',
      licence: 'Unsplash licence',
    },
  ],
};

/** Credits for everything above, for the footer. */
export function mediaCredits() {
  const items = [media.hero, media.closing, ...media.ways].filter(Boolean);
  const seen = new Set();
  return items.filter((m) => {
    const key = `${m.credit}|${m.source}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
