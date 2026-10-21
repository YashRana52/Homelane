import type { PhotoKey } from '@/config/images';

export type Project = {
  id: string;
  slug: string;
  title: string;
  city: string;
  /** "3 BHK", "4 BHK Penthouse" — the shorthand every Indian buyer reads first. */
  config: string;
  style: string;
  photo: PhotoKey;
  /** Carpet area in square feet. */
  area: number;
  /** Calendar days from design sign-off to handover. */
  days: number;
};

/**
 * Six completed homes for the homepage showcase.
 *
 * Deliberately spread across cities and sizes: the showcase is answering
 * "have you done a home like mine?", and a row of six 4BHK penthouses in one
 * metro answers that for almost nobody.
 */
export const projects: readonly Project[] = [
  {
    id: 'p1',
    slug: 'modern-4bhk-penthouse-bengaluru',
    title: 'Modern 4 BHK Penthouse',
    city: 'Bengaluru',
    config: '4 BHK',
    style: 'Modern',
    photo: 'project1',
    area: 2840,
    days: 88,
  },
  {
    id: 'p2',
    slug: 'contemporary-3bhk-flat-noida',
    title: 'Contemporary 3 BHK Flat',
    city: 'Noida',
    config: '3 BHK',
    style: 'Contemporary',
    photo: 'project2',
    area: 1620,
    days: 61,
  },
  {
    id: 'p3',
    slug: 'elegant-2bhk-apartment-mumbai',
    title: 'Elegant 2 BHK Apartment',
    city: 'Mumbai',
    config: '2 BHK',
    style: 'Elegant',
    photo: 'project3',
    area: 980,
    days: 45,
  },
  {
    id: 'p4',
    slug: 'minimal-3bhk-villa-gurugram',
    title: 'Minimal 3 BHK Villa',
    city: 'Gurugram',
    config: '3 BHK',
    style: 'Minimal',
    photo: 'project4',
    area: 2110,
    days: 74,
  },
  {
    id: 'p5',
    slug: 'warm-3bhk-flat-ahmedabad',
    title: 'Warm 3 BHK Flat',
    city: 'Ahmedabad',
    config: '3 BHK',
    style: 'Warm Rustic',
    photo: 'project5',
    area: 1480,
    days: 58,
  },
  {
    id: 'p6',
    slug: 'compact-2bhk-home-pune',
    title: 'Compact 2 BHK Home',
    city: 'Pune',
    config: '2 BHK',
    style: 'Space-Saving',
    photo: 'project6',
    area: 860,
    days: 42,
  },
];
