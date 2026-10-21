import type { PhotoKey } from '@/config/images';

/**
 * Awards, press and partner names.
 *
 * All of these are invented. Real logo files are an asset the brand has to
 * supply, and putting actual publication or manufacturer names on a page that
 * claims their endorsement would be a false claim rather than a placeholder.
 * They render as styled wordmarks so the layout is real even though the names
 * are not.
 */

export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: number;
};

export const awards: readonly Award[] = [
  { id: 'a1', title: 'Most Trusted Interiors Brand', issuer: 'Design Council India', year: 2026 },
  { id: 'a2', title: 'Best Modular Solutions', issuer: 'Interiors & Living Awards', year: 2025 },
  { id: 'a3', title: 'Innovative Startup of the Year', issuer: 'BuildTech Forum', year: 2025 },
  { id: 'a4', title: 'Excellence in Customer Service', issuer: 'Retail Quality Index', year: 2024 },
  { id: 'a5', title: 'Top 100 Workplaces', issuer: 'Careers Review', year: 2024 },
];

/** Invented publication names for the press strip. */
export const pressNames: readonly string[] = [
  'The Daily Ledger',
  'Interiors Weekly',
  'Metro Business',
  'Home & Craft',
  'The Urban Review',
  'Design Quarterly',
  'Enterprise Today',
  'The Morning Brief',
  'Living Spaces',
  'Market Watchpost',
  'The Build Journal',
  'City Chronicle',
];

/** Invented supplier names for the partner strip. */
export const partnerNames: readonly string[] = [
  'Veltora',
  'Northfield',
  'Kaveri Ply',
  'Luminark',
  'Sagewood',
  'Orenda',
  'Bluecrest',
  'Trimline',
  'Aurelia Stone',
  'Hinge & Co.',
  'Marbella',
  'Softclose',
  'Praxis Tools',
  'Enfield Glass',
  'Verdant Surfaces',
  'Copperleaf',
  'Stonewright',
  'Hallmark Fittings',
  'Clearspan',
  'Ironwood',
  'Nimbus Lighting',
  'Terra Laminates',
  'Quillon',
  'Basalt & Birch',
];

export type Studio = {
  id: string;
  city: string;
  area: string;
  /** Square feet of the experience centre. */
  size: number;
};

export const studios: readonly Studio[] = [
  { id: 's1', city: 'Bengaluru', area: 'Indiranagar', size: 9200 },
  { id: 's2', city: 'Delhi NCR', area: 'Gurugram Sector 29', size: 11400 },
  { id: 's3', city: 'Mumbai', area: 'Andheri West', size: 8600 },
  { id: 's4', city: 'Hyderabad', area: 'Jubilee Hills', size: 7800 },
  { id: 's5', city: 'Chennai', area: 'Nungambakkam', size: 6900 },
];

export type Article = {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readMinutes: number;
  photo: PhotoKey;
  slug: string;
};

export const articles: readonly Article[] = [
  {
    id: 'ar1',
    title: 'Storage ideas for a 2BHK that actually get used',
    category: 'Storage',
    author: 'Ananya Rao',
    date: '3 September 2026',
    readMinutes: 7,
    photo: 'article1',
    slug: 'storage-ideas-2bhk',
  },
  {
    id: 'ar2',
    title: 'What a turnkey interior contract should include',
    category: 'Buying guide',
    author: 'Imran Qureshi',
    date: '1 September 2026',
    readMinutes: 9,
    photo: 'article2',
    slug: 'turnkey-interior-contract',
  },
  {
    id: 'ar3',
    title: 'Laminate, acrylic, PU or veneer: how to actually choose',
    category: 'Materials',
    author: 'Divya Menon',
    date: '28 August 2026',
    readMinutes: 6,
    photo: 'article3',
    slug: 'laminate-acrylic-pu-veneer',
  },
];

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: readonly Faq[] = [
  {
    id: 'start',
    question: 'How do I get started?',
    answer:
      'Book a free design session. A designer calls once to agree a slot, then you meet at a studio or over video. You leave that session with 3D designs and an itemised quote, with no obligation to proceed.',
  },
  {
    id: 'timeline',
    question: 'What are the project timelines?',
    answer:
      'Modular scopes — kitchens, wardrobes, storage — carry a 45-day delivery guarantee from the date you sign off the final design. A full home including civil work, false ceilings and painting typically runs to 90 days.',
  },
  {
    id: 'cost',
    question: 'How much do home interiors cost?',
    answer:
      'Modular interiors start at ₹1.49 L for a kitchen, ₹3.57 L for a 2BHK and ₹4.23 L for a 3BHK. Those are starting prices for a new home and exclude civil work. The calculators give a tighter range in about two minutes.',
  },
  {
    id: 'payment',
    question: 'When do I pay?',
    answer:
      'In four parts: 10% to book, 10% when the design is frozen, 30% when the order goes to the factory, and the remaining 50% before dispatch. Nothing is charged before you have seen a quote.',
  },
  {
    id: 'warranty',
    question: 'What does the warranty cover?',
    answer:
      'A flat 10-year warranty on modular woodwork and the hardware we install, plus a service warranty on installation. Movable furniture and décor carry the manufacturer’s own warranty.',
  },
  {
    id: 'customise',
    question: 'Can I change the designs?',
    answer:
      'Yes. Nothing in the catalogue is fixed — every design is redrawn to your floor plan, and you can change materials, finishes and layout until you sign the design off.',
  },
];
