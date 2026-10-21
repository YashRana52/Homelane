/**
 * Brand configuration — the only place the company identity is written down.
 *
 * Renaming the product means editing this file and the colour tokens in
 * src/styles/tokens.css. Nothing else should hardcode the name, phone or email.
 */

export const brand = {
  name: 'Aangan',
  legalName: 'Aangan Interiors Pvt. Ltd.',
  fullName: 'Aangan Interiors',
  tagline: 'Home interiors, designed around you',

  /** Shown in the header utility row and the mobile drawer footer. */
  phone: '1800-123-4567',
  phoneHref: 'tel:+9118001234567',
  email: 'hello@aangan.com',
  emailHref: 'mailto:hello@aangan.com',

  /** Used for the "we are NRI-friendly" and estimate flows. */
  whatsapp: '+91 98765 43210',
  whatsappHref: 'https://wa.me/919876543210',

  socials: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
    { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  ],
} as const;

/**
 * Headline trust numbers. These drive the stats strip (Phase 3) and the
 * closing CTA feature cards (Phase 5), so they live in one place.
 */
export const trustStats = {
  deliveryDays: 45,
  warrantyYears: 10,
  qualityChecks: 146,
  homesDelivered: 55_000,
  designers: 600,
  studios: 87,
  cities: 55,
  catalogueProducts: 2_000_000,
  googleRating: 4.5,
  googleReviewCount: 35_000,
} as const;

export type Brand = typeof brand;
