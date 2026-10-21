import type { PhotoKey } from '@/config/images';

export type Service = {
  id: string;
  title: string;
  /** One line. If it needs two, the card is carrying too much. */
  description: string;
  to: string;
  photo: PhotoKey;
  /** Entry price, shown as "from ₹1.49 L". Omit where it would mislead. */
  startingAt?: number;
  badge?: string;
};

/**
 * The five ways into the business.
 *
 * Ordered by how many visitors want each one, not by margin: most people
 * arrive wanting a kitchen or a wardrobe, and only some want the whole home.
 */
export const services: readonly Service[] = [
  {
    id: 'modular',
    title: 'Modular Interiors',
    description: 'Kitchens, wardrobes and storage, built to your floor plan.',
    to: '/offerings/modular',
    photo: 'serviceModular',
    startingAt: 149_000,
  },
  {
    id: 'full-home',
    title: 'Full Home Interiors',
    description: 'Everything from civil work to the last cushion, one team.',
    to: '/offerings/full-home',
    photo: 'serviceFullHome',
    startingAt: 357_000,
  },
  {
    id: 'luxe',
    title: 'Aangan Luxe',
    description: 'Bespoke design, rare materials and a dedicated principal.',
    to: '/luxe',
    photo: 'serviceLuxury',
    badge: 'New',
  },
  {
    id: 'value',
    title: 'Value Interiors',
    description: 'A tighter budget, without cutting the things that last.',
    to: '/offerings/value',
    photo: 'serviceValue',
    startingAt: 249_000,
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description: 'Upgrade the home you already live in, room by room.',
    to: '/offerings/renovation',
    photo: 'serviceRenovation',
  },
];
