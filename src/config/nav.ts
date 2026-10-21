import { slugify } from '@/lib/slugify';

/**
 * Navigation data — one source of truth for the header mega-menu, the mobile
 * drawer and the footer.
 *
 * Each surface renders the same arrays in a different shape, which is the only
 * way three navigations with ~200 links between them stay in agreement.
 */

export type NavLink = {
  label: string;
  to: string;
  /** Small flag beside the label, e.g. "new". */
  badge?: string;
  description?: string;
};

export type NavColumn = {
  heading?: string;
  links: readonly NavLink[];
};

/* ---------------------------------------------------------------------------
   Design ideas — the gallery categories (28)
   ------------------------------------------------------------------------ */

const designIdeaLabels = [
  'Modular Kitchen',
  'Wardrobe',
  'Living Room',
  'Master Bedroom',
  'Kids Room',
  'Guest Bedroom',
  'Bathroom',
  'False Ceiling',
  'Pooja Room',
  'Foyer',
  'Dining Room',
  'Home Office',
  'Balcony',
  'Kitchen Cabinets',
  'Crockery Unit',
  'TV Unit',
  'Study Table',
  'Space-Saving Furniture',
  'Wallpaper',
  'Wall Paint',
  'Flooring',
  'Lighting',
  'Curtains',
  'Walk-in Wardrobe',
  'Sliding Wardrobe',
  'Kitchen Accessories',
  '2BHK Interiors',
  '3BHK Interiors',
] as const;

export const designIdeaLinks: readonly NavLink[] = designIdeaLabels.map((label) => ({
  label,
  to: `/design-ideas/${slugify(label)}`,
}));

/* ---------------------------------------------------------------------------
   Guides (7)
   ------------------------------------------------------------------------ */

const guideLabels = [
  'Modular Kitchen Guide',
  'Wardrobe Guide',
  'Bedroom Guide',
  'Living Room Guide',
  'Home Interior Guide',
  'Home Décor Trends',
  'Bathroom Design Ideas',
] as const;

export const guideLinks: readonly NavLink[] = guideLabels.map((label) => ({
  label,
  to: `/magazine/${slugify(label)}`,
}));

/* ---------------------------------------------------------------------------
   Cities (110)
   ------------------------------------------------------------------------ */

export const cities = [
  'Agra', 'Ahmedabad', 'Ajmer', 'Aligarh', 'Allahabad', 'Alwar', 'Ambala', 'Amravati',
  'Amritsar', 'Anand', 'Asansol', 'Aurangabad', 'Bareilly', 'Bathinda', 'Belgaum',
  'Bengaluru', 'Bhavnagar', 'Bhilai', 'Bhopal', 'Bhubaneswar', 'Bikaner', 'Bilaspur',
  'Chandigarh', 'Chennai', 'Coimbatore', 'Cuttack', 'Darbhanga', 'Davanagere', 'Dehradun',
  'Delhi NCR', 'Dhanbad', 'Dindigul', 'Durgapur', 'Erode', 'Faridabad', 'Gandhinagar',
  'Gaya', 'Ghaziabad', 'Goa', 'Gorakhpur', 'Greater Noida', 'Gulbarga', 'Guntur',
  'Gurugram', 'Guwahati', 'Gwalior', 'Haridwar', 'Hisar', 'Hubli', 'Hyderabad', 'Indore',
  'Jabalpur', 'Jaipur', 'Jalandhar', 'Jammu', 'Jamnagar', 'Jamshedpur', 'Jhansi',
  'Jodhpur', 'Kakinada', 'Kanpur', 'Karnal', 'Kochi', 'Kolhapur', 'Kolkata', 'Kollam',
  'Kota', 'Kozhikode', 'Lucknow', 'Ludhiana', 'Madurai', 'Mangaluru', 'Meerut', 'Mohali',
  'Moradabad', 'Mumbai', 'Mysuru', 'Nagpur', 'Nashik', 'Navi Mumbai', 'Nellore', 'Noida',
  'Panipat', 'Patiala', 'Patna', 'Puducherry', 'Pune', 'Raipur', 'Rajahmundry', 'Rajkot',
  'Ranchi', 'Rourkela', 'Salem', 'Shimla', 'Siliguri', 'Solapur', 'Srinagar', 'Surat',
  'Thane', 'Thiruvananthapuram', 'Thrissur', 'Tiruchirappalli', 'Tirupati', 'Tiruppur',
  'Udaipur', 'Ujjain', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam', 'Warangal',
] as const;

export const cityLinks: readonly NavLink[] = cities.map((label) => ({
  label,
  to: `/interiors/${slugify(label)}`,
}));

/** The handful shown first in the drawer, before "View all cities". */
export const topCities: readonly NavLink[] = [
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
].map((label) => ({ label, to: `/interiors/${slugify(label)}` }));

/* ---------------------------------------------------------------------------
   Offerings & calculators
   ------------------------------------------------------------------------ */

export const offeringLinks: readonly NavLink[] = [
  {
    label: 'Full Home Interiors',
    to: '/offerings/full-home',
    description: 'Turnkey interiors, one project manager',
  },
  {
    label: 'Modular Interiors',
    to: '/offerings/modular',
    description: 'Kitchens, wardrobes and storage',
  },
  {
    label: 'Value Interiors',
    to: '/offerings/value',
    description: 'Quality interiors on a tighter budget',
  },
  {
    label: 'Renovation',
    to: '/offerings/renovation',
    description: 'Upgrade a home you already live in',
  },
  {
    label: 'Aangan Luxe',
    to: '/luxe',
    description: 'Bespoke luxury interiors',
    badge: 'new',
  },
];

export const calculatorLinks: readonly NavLink[] = [
  {
    label: 'Full Home Calculator',
    to: '/price-calculator/full-home',
    description: 'Estimate a whole home',
  },
  {
    label: 'Kitchen Calculator',
    to: '/price-calculator/kitchen',
    description: 'Layout, finish and accessories',
  },
  {
    label: 'Wardrobe Calculator',
    to: '/price-calculator/wardrobe',
    description: 'Sliding, hinged or walk-in',
  },
];

/* ---------------------------------------------------------------------------
   Header
   ------------------------------------------------------------------------ */

export type MenuKey = 'design-ideas' | 'offerings' | 'calculators' | 'cities' | 'guides';

export type HeaderItem =
  | { kind: 'link'; label: string; to: string }
  | { kind: 'menu'; label: string; key: MenuKey };

export const headerItems: readonly HeaderItem[] = [
  { kind: 'menu', label: 'Design Ideas', key: 'design-ideas' },
  { kind: 'menu', label: 'Offerings', key: 'offerings' },
  { kind: 'menu', label: 'Price Calculators', key: 'calculators' },
  { kind: 'menu', label: 'Cities', key: 'cities' },
  { kind: 'menu', label: 'Guides', key: 'guides' },
  { kind: 'link', label: 'Projects', to: '/projects' },
  { kind: 'link', label: 'Magazine', to: '/magazine' },
];

/**
 * Panel contents, keyed by menu. `wide` panels span the full container and lay
 * their columns out in a grid; the rest sit in a narrower card under the
 * trigger.
 */
export const megaPanels: Record<
  MenuKey,
  { columns: readonly NavColumn[]; wide: boolean; footerLink?: NavLink; cardStyle?: boolean }
> = {
  'design-ideas': {
    wide: true,
    footerLink: { label: 'Browse all design ideas', to: '/design-ideas' },
    columns: [
      { heading: 'Rooms', links: designIdeaLinks.slice(0, 7) },
      { heading: 'Spaces', links: designIdeaLinks.slice(7, 14) },
      { heading: 'Furniture', links: designIdeaLinks.slice(14, 21) },
      { heading: 'Finishes & more', links: designIdeaLinks.slice(21) },
    ],
  },
  offerings: {
    wide: false,
    cardStyle: true,
    columns: [{ links: offeringLinks }],
  },
  calculators: {
    wide: false,
    cardStyle: true,
    footerLink: { label: 'All calculators', to: '/price-calculator' },
    columns: [{ links: calculatorLinks }],
  },
  cities: {
    wide: true,
    footerLink: { label: 'View all cities', to: '/store-locator' },
    columns: [
      { heading: 'A – D', links: cityLinks.filter((c) => /^[A-D]/.test(c.label)) },
      { heading: 'E – K', links: cityLinks.filter((c) => /^[E-K]/.test(c.label)) },
      { heading: 'L – R', links: cityLinks.filter((c) => /^[L-R]/.test(c.label)) },
      { heading: 'S – Z', links: cityLinks.filter((c) => /^[S-Z]/.test(c.label)) },
    ],
  },
  guides: {
    wide: false,
    columns: [{ links: guideLinks }],
  },
};

/** Top strip, desktop only. */
export const utilityLinks: readonly NavLink[] = [
  { label: 'Own a Franchise', to: '/franchise' },
  { label: 'Refer and Earn', to: '/refer' },
  { label: 'Careers', to: '/careers' },
];

/* ---------------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------------ */

export const footerColumns: readonly NavColumn[] = [
  {
    heading: 'Offerings',
    links: [
      ...offeringLinks.map(({ label, to }) => ({ label, to })),
      { label: 'Modular Kitchen', to: '/design-ideas/modular-kitchen' },
      { label: 'Wardrobe', to: '/design-ideas/wardrobe' },
      { label: 'False Ceiling', to: '/design-ideas/false-ceiling' },
    ],
  },
  {
    heading: 'Get inspired',
    links: [
      { label: 'All Design Ideas', to: '/design-ideas' },
      { label: 'Completed Projects', to: '/projects' },
      { label: 'Living Room', to: '/design-ideas/living-room' },
      { label: 'Master Bedroom', to: '/design-ideas/master-bedroom' },
      { label: 'Kids Room', to: '/design-ideas/kids-room' },
      { label: 'Bathroom', to: '/design-ideas/bathroom' },
      { label: 'Pooja Room', to: '/design-ideas/pooja-room' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      ...calculatorLinks.map(({ label, to }) => ({ label, to })),
      { label: 'Get Free Estimate', to: '/estimate' },
      { label: 'VastuSense', to: '/vastu' },
      { label: 'Store Locator', to: '/store-locator' },
      { label: 'NRI Services', to: '/nri' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Careers', to: '/careers' },
      { label: 'Magazine', to: '/magazine' },
      { label: 'Refer and Earn', to: '/refer' },
      { label: 'Own a Franchise', to: '/franchise' },
      { label: 'Policies', to: '/policies' },
    ],
  },
];
