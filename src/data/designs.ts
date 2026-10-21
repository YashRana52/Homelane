import type { PhotoKey } from '@/config/images';
import { slugify } from '@/lib/slugify';

export type DesignCategory = 'modular-kitchen' | 'living-room' | 'wardrobe';

export type Design = {
  id: string;
  /** Long and descriptive, the way gallery titles actually read. */
  title: string;
  category: DesignCategory;
  photo: PhotoKey;
  /** Layout, finish or dimension chips. Two is the most a card can show. */
  tags: readonly string[];
  /** Quoted price for the scope shown. Omitted where it would mislead. */
  price?: number;
  /** Human-readable room size, e.g. "12 × 10 feet". */
  size?: string;
};

/** Route for a design's detail page. Derived so it cannot drift. */
export function designPath(design: Design): string {
  return `/design-ideas/${design.category}/${slugify(design.title)}`;
}

/**
 * Thirty catalogue designs — ten per homepage carousel.
 *
 * Prices and sizes are deliberately uneven: a real catalogue has entries that
 * are priced, entries that are only sized, and entries that are neither. A
 * card that handles all three without collapsing is the point of the sample.
 */
export const designs: readonly Design[] = [
  /* ---------------- Modular kitchen ---------------- */
  {
    id: 'k1',
    title: 'Classic L-Shaped Kitchen with Light Blue and Black Cabinets',
    category: 'modular-kitchen',
    photo: 'kitchen1',
    tags: ['L-Shaped', 'Laminate'],
    price: 526_000,
    size: '12 × 10 feet',
  },
  {
    id: 'k2',
    title: 'Compact Straight Kitchen in Matte Ivory with Tall Pantry Unit',
    category: 'modular-kitchen',
    photo: 'kitchen2',
    tags: ['Straight', 'Acrylic'],
    price: 289_000,
    size: '9 × 8 feet',
  },
  {
    id: 'k3',
    title: 'Open Island Kitchen with Quartz Countertop and Breakfast Seating',
    category: 'modular-kitchen',
    photo: 'kitchen3',
    tags: ['Island', 'Quartz'],
    price: 874_000,
    size: '16 × 13 feet',
  },
  {
    id: 'k4',
    title: 'Parallel Kitchen in Walnut Veneer with Integrated Appliances',
    category: 'modular-kitchen',
    photo: 'kitchen4',
    tags: ['Parallel', 'Veneer'],
    price: 712_000,
    size: '14 × 9 feet',
  },
  {
    id: 'k5',
    title: 'U-Shaped Kitchen with Glossy White Shutters and Deep Drawers',
    category: 'modular-kitchen',
    photo: 'kitchen5',
    tags: ['U-Shaped', 'Acrylic'],
    price: 648_000,
    size: '13 × 11 feet',
  },
  {
    id: 'k6',
    title: 'Two-Tone L-Shaped Kitchen in Sage Green and Oak',
    category: 'modular-kitchen',
    photo: 'kitchen6',
    tags: ['L-Shaped', 'PU'],
    price: 591_000,
    size: '12 × 11 feet',
  },
  {
    id: 'k7',
    title: 'Minimal Straight Kitchen with Handleless Shutters',
    category: 'modular-kitchen',
    photo: 'kitchen7',
    tags: ['Straight', 'Handleless'],
    price: 334_000,
    size: '10 × 8 feet',
  },
  {
    id: 'k8',
    title: 'Island Kitchen with Dark Granite and Brass Hardware',
    category: 'modular-kitchen',
    photo: 'kitchen8',
    tags: ['Island', 'Granite'],
    price: 936_000,
    size: '17 × 14 feet',
  },
  {
    id: 'k9',
    title: 'Warm Wood U-Shaped Kitchen with Corner Carousel Storage',
    category: 'modular-kitchen',
    photo: 'kitchen9',
    tags: ['U-Shaped', 'Veneer'],
    size: '13 × 12 feet',
  },
  {
    id: 'k10',
    title: 'Monochrome Parallel Kitchen with Tall Unit and Chimney',
    category: 'modular-kitchen',
    photo: 'kitchen10',
    tags: ['Parallel', 'Laminate'],
    price: 468_000,
    size: '12 × 8 feet',
  },

  /* ---------------- Living room ---------------- */
  {
    id: 'l1',
    title: 'Contemporary Living Room with Low Sofa and Panelled TV Wall',
    category: 'living-room',
    photo: 'living1',
    tags: ['Contemporary', '3 BHK'],
    price: 412_000,
    size: '16 × 12 feet',
  },
  {
    id: 'l2',
    title: 'Earthy Living Room with Cane Accents and Terracotta Palette',
    category: 'living-room',
    photo: 'living2',
    tags: ['Bohemian', '2 BHK'],
    price: 318_000,
    size: '14 × 11 feet',
  },
  {
    id: 'l3',
    title: 'Scandinavian Living Room in Oak and Off-White',
    category: 'living-room',
    photo: 'living3',
    tags: ['Scandinavian', '2 BHK'],
    price: 287_000,
    size: '13 × 11 feet',
  },
  {
    id: 'l4',
    title: 'Dark Modern Living Room with Charcoal Walls and Gold Trim',
    category: 'living-room',
    photo: 'living4',
    tags: ['Modern', '3 BHK'],
    price: 524_000,
    size: '18 × 13 feet',
  },
  {
    id: 'l5',
    title: 'Compact Living Room with Wall-Mounted Storage and Bench Seating',
    category: 'living-room',
    photo: 'living5',
    tags: ['Space-Saving', '1 BHK'],
    price: 196_000,
    size: '11 × 9 feet',
  },
  {
    id: 'l6',
    title: 'Pastel Living Room with Arched Niche and Fluted Panelling',
    category: 'living-room',
    photo: 'living6',
    tags: ['Contemporary', '2 BHK'],
    size: '15 × 12 feet',
  },
  {
    id: 'l7',
    title: 'Open-Plan Living and Dining with Full-Height Glazing',
    category: 'living-room',
    photo: 'living7',
    tags: ['Open Plan', '4 BHK'],
    price: 738_000,
    size: '22 × 14 feet',
  },
  {
    id: 'l8',
    title: 'Mid-Century Living Room with Tan Leather and Walnut',
    category: 'living-room',
    photo: 'living8',
    tags: ['Mid-Century', '3 BHK'],
    price: 466_000,
    size: '17 × 12 feet',
  },
  {
    id: 'l9',
    title: 'Neutral Living Room with Layered Textures and Soft Lighting',
    category: 'living-room',
    photo: 'living9',
    tags: ['Minimal', '2 BHK'],
    price: 352_000,
    size: '15 × 11 feet',
  },
  {
    id: 'l10',
    title: 'Jewel-Tone Living Room with Velvet Seating and Marble Table',
    category: 'living-room',
    photo: 'living10',
    tags: ['Luxe', '3 BHK'],
    price: 612_000,
    size: '18 × 14 feet',
  },

  /* ---------------- Wardrobe ---------------- */
  {
    id: 'w1',
    title: 'Floor-to-Ceiling Sliding Wardrobe with Mirror Shutters',
    category: 'wardrobe',
    photo: 'wardrobe1',
    tags: ['Sliding', "8' × 7'"],
    price: 164_000,
    size: "8 × 7 feet",
  },
  {
    id: 'w2',
    title: 'Walk-In Wardrobe with Open Shelving and Island Drawer Unit',
    category: 'wardrobe',
    photo: 'wardrobe2',
    tags: ['Walk-In', "12' × 8'"],
    price: 392_000,
    size: '12 × 8 feet',
  },
  {
    id: 'w3',
    title: 'Hinged Wardrobe in Oak Laminate with Loft Storage',
    category: 'wardrobe',
    photo: 'wardrobe3',
    tags: ['Hinged', "7' × 7'"],
    price: 128_000,
    size: '7 × 7 feet',
  },
  {
    id: 'w4',
    title: 'Two-Tone Sliding Wardrobe with Integrated Dresser',
    category: 'wardrobe',
    photo: 'wardrobe4',
    tags: ['Sliding', "10' × 7'"],
    price: 218_000,
    size: '10 × 7 feet',
  },
  {
    id: 'w5',
    title: 'Kids Wardrobe with Colour-Blocked Shutters and Low Rails',
    category: 'wardrobe',
    photo: 'wardrobe5',
    tags: ['Hinged', 'Kids'],
    price: 109_000,
    size: '6 × 7 feet',
  },
  {
    id: 'w6',
    title: 'Glass-Front Wardrobe with Profile Lighting and Soft-Close Drawers',
    category: 'wardrobe',
    photo: 'wardrobe6',
    tags: ['Glass Front', "9' × 8'"],
    price: 276_000,
    size: '9 × 8 feet',
  },
  {
    id: 'w7',
    title: 'Corner Wardrobe with Pull-Out Trouser Rack and Safe Niche',
    category: 'wardrobe',
    photo: 'wardrobe7',
    tags: ['Corner', "9' × 7'"],
    size: '9 × 7 feet',
  },
  {
    id: 'w8',
    title: 'Guest Bedroom Wardrobe in Matte Grey with Open Niche',
    category: 'wardrobe',
    photo: 'wardrobe8',
    tags: ['Hinged', "7' × 8'"],
    price: 142_000,
    size: '7 × 8 feet',
  },
  {
    id: 'w9',
    title: 'Master Wardrobe with Walnut Veneer and Full-Length Mirror',
    category: 'wardrobe',
    photo: 'wardrobe9',
    tags: ['Sliding', "11' × 8'"],
    price: 304_000,
    size: '11 × 8 feet',
  },
  {
    id: 'w10',
    title: 'Compact Sliding Wardrobe for Rental Homes with Loft',
    category: 'wardrobe',
    photo: 'wardrobe10',
    tags: ['Sliding', 'Value'],
    price: 96_000,
    size: '6 × 7 feet',
  },
];

export const designsByCategory = (category: DesignCategory): readonly Design[] =>
  designs.filter((design) => design.category === category);
