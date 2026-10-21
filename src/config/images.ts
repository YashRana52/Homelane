/**
 * Image layer.
 *
 * The project ships with no photography of its own, so every visual is a
 * curated Unsplash photo served through Unsplash's own image CDN. That CDN
 * does the resizing, cropping and format negotiation for us, which is what
 * makes responsive `srcset` cheap here.
 *
 * Rules:
 *   - Never inline an Unsplash URL in a component. Add an entry to PHOTOS and
 *     reference it by key, so a bad photo is swapped in one place.
 *   - Always go through `imageSet()` so every <img> gets a srcSet and the
 *     correct `sizes`, and never through a bare `src`.
 *   - Every id in PHOTOS is checked by `npm run verify:images`.
 */

/** Aspect ratios used across the site, as CSS aspect-ratio strings. */
export const RATIO = {
  /** Hero banners, desktop. */
  cinema: '21 / 9',
  /** Hero banners, mobile; also full-bleed promos. */
  wide: '16 / 9',
  /** Design cards, project cards, article covers. The workhorse. */
  landscape: '4 / 3',
  /** Room category tiles, service cards. */
  square: '1 / 1',
  /** Tall editorial shots, wardrobe elevations. */
  portrait: '3 / 4',
  /** Luxe editorial columns. */
  tall: '2 / 3',
} as const;

export type Ratio = keyof typeof RATIO;

/** Widths we ever request from the CDN, used to build srcSet. */
const WIDTHS = [400, 640, 828, 1080, 1440, 1920, 2560] as const;

type UnsplashOptions = {
  /** Output width in px. */
  w: number;
  /** Crop box ratio; defaults to the photo's own. */
  ratio?: Ratio;
  /** JPEG/WebP quality. 72 is the sweet spot for photography. */
  q?: number;
};

/** Build a single Unsplash CDN URL. */
export function unsplash(id: string, { w, ratio, q = 72 }: UnsplashOptions): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(w),
    q: String(q),
  });

  if (ratio) {
    const [rw, rh] = RATIO[ratio].split('/').map((n) => Number(n.trim()));
    if (rw && rh) params.set('h', String(Math.round((w * rh) / rw)));
  }

  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

export type ImageSet = {
  src: string;
  srcSet: string;
  ratio: Ratio;
};

/**
 * Build the `src` + `srcSet` pair for an <img>.
 *
 * `sizes` is intentionally NOT set here — it depends on the layout the image
 * sits in, so the component passes it. Getting `sizes` wrong is the single
 * biggest cause of over-downloading on mobile.
 */
export function imageSet(id: string, ratio: Ratio = 'landscape', maxWidth = 1920): ImageSet {
  const widths = WIDTHS.filter((w) => w <= maxWidth);
  return {
    src: unsplash(id, { w: widths.at(-1) ?? 1080, ratio }),
    srcSet: widths.map((w) => `${unsplash(id, { w, ratio })} ${w}w`).join(', '),
    ratio,
  };
}

export type PictureSource = {
  media: string;
  srcSet: string;
};

/**
 * Art-directed sources for a `<picture>`.
 *
 * A hero is not the same photo at every size. Letting one 21:9 crop fill a
 * 424px-tall phone viewport means `object-fit: cover` throws away most of the
 * frame and usually centres on nothing; asking the CDN for a squarer crop
 * instead keeps the subject in shot. The widths also drop sharply on mobile,
 * so a phone is never sent a 2560px file.
 */
export function pictureSources(id: string): {
  sources: PictureSource[];
  fallback: string;
} {
  const set = (ratio: Ratio, widths: readonly number[], q?: number) =>
    widths.map((w) => `${unsplash(id, { w, ratio, q })} ${w}w`).join(', ');

  return {
    sources: [
      // Desktop — wide cinematic crop.
      { media: '(min-width: 1024px)', srcSet: set('cinema', [1280, 1600, 1920, 2560]) },
      // Tablet — less extreme, portrait-friendly.
      { media: '(min-width: 768px)', srcSet: set('wide', [828, 1080, 1440]) },
      // Phone — nearly square, so the subject survives the crop. Quality is
      // dropped to 62 here only: a 2x-DPR phone crop is displayed at roughly
      // a third the linear size of the desktop one, where the extra data is
      // invisible but is the single biggest contributor to mobile LCP.
      { media: '(max-width: 767px)', srcSet: set('square', [400, 640, 828], 62) },
    ],
    fallback: unsplash(id, { w: 1600, ratio: 'cinema' }),
  };
}

/**
 * A warm gradient stand-in, used while a photo loads and as the fallback if a
 * key is missing. Matches the surface palette so it never flashes white.
 */
export const PLACEHOLDER_GRADIENT =
  'linear-gradient(135deg, var(--c-surface-100) 0%, var(--c-surface-200) 50%, var(--c-surface-100) 100%)';

/* =============================================================================
   CURATED PHOTO REGISTRY
   Keys are semantic, not descriptive of the photo, so a photo can be replaced
   without touching any component.
   ============================================================================= */

export const PHOTOS = {
  /* ---------- Heroes ---------- */
  heroHome: '1618220179428-22790b461013',
  heroLuxe: '1600607687939-ce8a6c25118c',
  heroGallery: '1600121848594-d8644e57abab',
  heroCity: '1600566753086-00f18fb6b3ea',

  /* ---------- Services (Phase 3) ---------- */
  serviceModular: '1556911220-bff31c812dba',
  serviceFullHome: '1618221195710-dd6b41faaea6',
  serviceLuxury: '1600607687920-4e2a09cf159d',
  serviceValue: '1598928506311-c55ded91a20c',
  serviceRenovation: '1581858726788-75bc0f6a952d',

  /* ---------- Room categories (Phase 3) ---------- */
  roomLiving: '1586023492125-27b2c045efd7',
  roomMasterBedroom: '1616594039964-ae9021a400a0',
  roomKitchen: '1484154218962-a197022b5858',
  roomWardrobe: '1558997519-83ea9252edf8',
  roomKidsRoom: '1555854877-bab0e564b8d5',
  roomHomeOffice: '1493809842364-78817add7ffb',
  roomDining: '1617806118233-18e1de247200',
  roomBathroom: '1620626011761-996317b8d101',
  roomFoyer: '1581858726788-75bc0f6a952d',
  roomFalseCeiling: '1615529182904-14819c35db37',
  roomGuestBedroom: '1522771739844-6a9f6d5f14af',
  roomPooja: '1604014237800-1c9102c219da',

  /* ---------- Kitchens (Phase 4) ---------- */
  kitchen1: '1565538810643-b5bdb714032a',
  kitchen2: '1600489000022-c2086d79f9d4',
  kitchen3: '1600585152220-90363fe7e115',
  kitchen4: '1556909212-d5b604d0c90d',
  kitchen5: '1556912173-3bb406ef7e77',
  kitchen6: '1556911220-bff31c812dba',
  kitchen7: '1588854337236-6889d631faa8',
  kitchen8: '1600607688066-890987f18a86',
  kitchen9: '1556909114-f6e7ad7d3136',
  kitchen10: '1484154218962-a197022b5858',

  /* ---------- Living rooms (Phase 4) ---------- */
  living1: '1556228453-efd6c1ff04f6',
  living2: '1583847268964-b28dc8f51f92',
  living3: '1493809842364-78817add7ffb',
  living4: '1567767292278-a4f21aa2d36e',
  living5: '1605774337664-7a846e9cdf17',
  living6: '1550581190-9c1c48d21d6c',
  living7: '1631679706909-1844bbd07221',
  living8: '1606744824163-985d376605aa',
  living9: '1616137466211-f939a420be84',
  living10: '1522708323590-d24dbb6b0267',

  /* ---------- Wardrobes & bedroom storage (Phase 4) ---------- */
  wardrobe1: '1558997519-83ea9252edf8',
  wardrobe2: '1595428774223-ef52624120d2',
  wardrobe3: '1595526114035-0d45ed16cfbf',
  wardrobe4: '1594026112284-02bb6f3352fe',
  wardrobe5: '1555854877-bab0e564b8d5',
  wardrobe6: '1611892440504-42a792e24d32',
  wardrobe7: '1540518614846-7eded433c457',
  wardrobe8: '1586105251261-72a756497a11',
  wardrobe9: '1616627561839-074385245ff6',
  wardrobe10: '1522771739844-6a9f6d5f14af',

  /* ---------- Completed projects (Phase 4) ---------- */
  project1: '1600607687939-ce8a6c25118c',
  project2: '1600607687920-4e2a09cf159d',
  project3: '1616486338812-3dadae4b4ace',
  project4: '1615875605825-5eb9bb5d52ac',
  project5: '1598928506311-c55ded91a20c',
  project6: '1586023492125-27b2c045efd7',

  /* ---------- Magazine covers (Phase 5) ---------- */
  article1: '1616486338812-3dadae4b4ace',
  article2: '1615875605825-5eb9bb5d52ac',
  article3: '1604709177225-055f99402ea3',

  /* ---------- Luxe editorial (Phase 7) ---------- */
  luxe1: '1616627561839-074385245ff6',
  luxe2: '1600566753376-12c8ab7fb75b',
  luxe3: '1600607688969-a5bfcd646154',
} as const;

export type PhotoKey = keyof typeof PHOTOS;

/** Resolve a registry key straight to an ImageSet. */
export function photo(key: PhotoKey, ratio: Ratio = 'landscape', maxWidth = 1920): ImageSet {
  return imageSet(PHOTOS[key], ratio, maxWidth);
}

/**
 * Common `sizes` strings, matched to the grid behaviour in PLAN.md §4.2.
 * Pass one of these to AspectImage rather than writing `sizes` by hand.
 */
export const SIZES = {
  /** Full-bleed hero. */
  hero: '100vw',
  /** Design/project card: 1 → 2 → 3 → 4 columns. */
  card: '(min-width: 1280px) 304px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw',
  /** Room tile: 2 → 3 → 4 → 6 columns. */
  tile: '(min-width: 1280px) 200px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 45vw',
  /** Service card: 1 → 2 → 3 → 5 columns. */
  service: '(min-width: 1280px) 240px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw',
  /** Half-width split section. */
  half: '(min-width: 768px) 50vw, 100vw',
  /** Article cover inside the prose column. */
  prose: '(min-width: 768px) 720px, 92vw',
} as const;
