import type { PhotoKey } from '@/config/images';

/**
 * Configuration for the five-step calculator engine.
 *
 * One wizard renders all three calculators. The steps are always the same
 * shape — pick a layout, give dimensions, add fittings, choose a finish, add
 * services — because that is the order a designer asks in. What changes is the
 * vocabulary, so every label a step shows comes from here rather than being
 * hardcoded in the component.
 */

export type LayoutOption = {
  id: string;
  label: string;
  description: string;
  /** Multiplies the cabinetry cost — corners and returns cost more. */
  factor: number;
  /** Prefilled dimensions when this layout is picked. */
  defaults: { primary: number; secondary: number };
  /** Which plan drawing to show in step 2. */
  shape: 'straight' | 'l' | 'u' | 'parallel' | 'island' | 'box';
};

export type MaterialOption = {
  id: string;
  label: string;
  description: string;
  /** Rate per unit of the primary dimension. */
  rate: number;
  tier: 'Value' | 'Popular' | 'Premium' | 'Luxe';
};

export type AddOn = {
  id: string;
  label: string;
  description?: string;
  price: number;
};

export type PackageOption = {
  id: string;
  label: string;
  description: string;
  /** Material ids included, used to preselect step 4. */
  material: string;
  /** Add-on ids included. */
  includes: string[];
};

export type CalculatorConfig = {
  type: 'kitchen' | 'wardrobe' | 'full-home';
  title: string;
  intro: string;
  photo: PhotoKey;
  /** Minutes, shown up front so the length is never a surprise. */
  minutes: number;

  labels: {
    layoutStep: string;
    layoutHelp: string;
    measureStep: string;
    measureHelp: string;
    primary: string;
    secondary: string;
    accessoriesStep: string;
    accessoriesHelp: string;
    materialStep: string;
    materialHelp: string;
    addOnStep: string;
    addOnHelp: string;
    /** "running feet", "sq ft" — used in the estimate breakdown. */
    unit: string;
  };

  primaryRange: { min: number; max: number; step: number };
  secondaryRange: { min: number; max: number; step: number };

  layouts: readonly LayoutOption[];
  materials: readonly MaterialOption[];
  accessories: readonly AddOn[];
  addOns: readonly AddOn[];
  packages: readonly PackageOption[];
};

/* ------------------------------------------------------------------ */

const kitchen: CalculatorConfig = {
  type: 'kitchen',
  title: 'Modular Kitchen Calculator',
  intro: 'Five questions, and you get a costed range for the kitchen you described.',
  photo: 'kitchen3',
  minutes: 2,
  labels: {
    layoutStep: 'Pick your kitchen layout',
    layoutHelp: 'The shape your counter runs along. Not sure? Pick the closest.',
    measureStep: 'How big is the kitchen?',
    measureHelp: 'We have prefilled typical sizes for this layout — drag to adjust.',
    primary: 'Total counter length',
    secondary: 'Wall height',
    accessoriesStep: 'Which fittings do you want inside?',
    accessoriesHelp: 'Everything here is optional, and priced separately so you can see what it costs.',
    materialStep: 'Choose a shutter finish',
    materialHelp: 'This is the single biggest lever on the final number.',
    addOnStep: 'Appliances and on-site work',
    addOnHelp: 'Add only what you want us to supply or do.',
    unit: 'running feet',
  },
  primaryRange: { min: 6, max: 32, step: 1 },
  secondaryRange: { min: 7, max: 12, step: 1 },
  layouts: [
    {
      id: 'straight',
      label: 'Essential Straight',
      description: 'One wall. The most compact and the least expensive.',
      factor: 1,
      defaults: { primary: 10, secondary: 9 },
      shape: 'straight',
    },
    {
      id: 'l',
      label: 'Sleek L-Shaped',
      description: 'Two adjacent walls. The most common Indian layout.',
      factor: 1.12,
      defaults: { primary: 14, secondary: 9 },
      shape: 'l',
    },
    {
      id: 'parallel',
      label: 'Elegant Parallel',
      description: 'Two facing runs, with a walkway between them.',
      factor: 1.18,
      defaults: { primary: 16, secondary: 9 },
      shape: 'parallel',
    },
    {
      id: 'u',
      label: 'Spacious U-Shaped',
      description: 'Three walls. The most storage per square foot.',
      factor: 1.26,
      defaults: { primary: 20, secondary: 9 },
      shape: 'u',
    },
  ],
  materials: [
    {
      id: 'laminate',
      label: 'Laminate',
      description: 'Hard-wearing and the easiest to live with. Widest colour range.',
      rate: 14_000,
      tier: 'Value',
    },
    {
      id: 'acrylic',
      label: 'Acrylic',
      description: 'High gloss, seamless edges. Shows fingerprints on dark shades.',
      rate: 19_000,
      tier: 'Popular',
    },
    {
      id: 'pu',
      label: 'PU (Polyurethane)',
      description: 'Sprayed finish, any colour, matte or gloss. Repairable.',
      rate: 23_000,
      tier: 'Premium',
    },
    {
      id: 'veneer',
      label: 'Natural Veneer',
      description: 'Real wood face with visible grain. Each panel differs.',
      rate: 29_000,
      tier: 'Luxe',
    },
  ],
  accessories: [
    { id: 'tandem', label: 'Tandem drawers', description: 'Soft-close, full extension', price: 38_000 },
    { id: 'pantry', label: 'Tall pull-out pantry', description: 'Six tiers, full height', price: 24_000 },
    { id: 'corner', label: 'Corner carousel', description: 'Reaches the dead corner', price: 16_500 },
    { id: 'cutlery', label: 'Cutlery organisers', price: 7_200 },
    { id: 'bottle', label: 'Bottle pull-out', price: 9_800 },
    { id: 'lighting', label: 'Under-cabinet profile lighting', price: 12_400 },
  ],
  addOns: [
    { id: 'hob', label: 'Built-in hob', price: 28_000 },
    { id: 'chimney', label: 'Chimney', price: 32_000 },
    { id: 'oven', label: 'Built-in oven', price: 46_000 },
    { id: 'sink', label: 'Quartz sink and mixer', price: 18_500 },
    { id: 'electrical', label: 'Electrical rework', description: 'Points, wiring, switchboards', price: 26_000 },
    { id: 'plumbing', label: 'Plumbing rework', price: 19_000 },
    { id: 'tiling', label: 'Backsplash tiling', price: 22_000 },
  ],
  packages: [
    {
      id: 'essentials',
      label: 'Essentials',
      description: 'Laminate shutters, soft-close hinges, the fittings most kitchens need.',
      material: 'laminate',
      includes: ['tandem', 'cutlery'],
    },
    {
      id: 'premium',
      label: 'Premium',
      description: 'Acrylic shutters, tall pantry, corner carousel and profile lighting.',
      material: 'acrylic',
      includes: ['tandem', 'pantry', 'corner', 'cutlery', 'lighting'],
    },
    {
      id: 'luxe',
      label: 'Luxe',
      description: 'Veneer shutters and every fitting, with appliances supplied by us.',
      material: 'veneer',
      includes: ['tandem', 'pantry', 'corner', 'cutlery', 'bottle', 'lighting'],
    },
  ],
};

const wardrobe: CalculatorConfig = {
  type: 'wardrobe',
  title: 'Wardrobe Calculator',
  intro: 'Tell us the wall and the finish, and we will cost the wardrobe on it.',
  photo: 'wardrobe1',
  minutes: 2,
  labels: {
    layoutStep: 'What kind of wardrobe?',
    layoutHelp: 'Sliding doors save walkway space; hinged doors open fully.',
    measureStep: 'How big is the wall?',
    measureHelp: 'Measure the wall the wardrobe will sit against.',
    primary: 'Wardrobe width',
    secondary: 'Wardrobe height',
    accessoriesStep: 'What goes inside?',
    accessoriesHelp: 'Internal organisers are what make a wardrobe usable rather than just large.',
    materialStep: 'Choose a shutter finish',
    materialHelp: 'Mirror and glass fronts are priced with the finish they sit in.',
    addOnStep: 'Anything else?',
    addOnHelp: 'Lighting, lofts and site work.',
    unit: 'running feet',
  },
  primaryRange: { min: 4, max: 20, step: 1 },
  secondaryRange: { min: 7, max: 12, step: 1 },
  layouts: [
    {
      id: 'hinged',
      label: 'Hinged',
      description: 'Doors swing open. Cheapest, and you see everything at once.',
      factor: 1,
      defaults: { primary: 7, secondary: 8 },
      shape: 'straight',
    },
    {
      id: 'sliding',
      label: 'Sliding',
      description: 'No door swing, so it works in a tight bedroom.',
      factor: 1.15,
      defaults: { primary: 9, secondary: 8 },
      shape: 'parallel',
    },
    {
      id: 'walk-in',
      label: 'Walk-In',
      description: 'Open runs down two or three walls, usually with an island.',
      factor: 1.35,
      defaults: { primary: 14, secondary: 9 },
      shape: 'u',
    },
    {
      id: 'corner',
      label: 'Corner',
      description: 'Wraps a corner to use a wall that would otherwise be wasted.',
      factor: 1.22,
      defaults: { primary: 11, secondary: 8 },
      shape: 'l',
    },
  ],
  materials: [
    { id: 'laminate', label: 'Laminate', description: 'Durable and the easiest to clean.', rate: 12_500, tier: 'Value' },
    { id: 'mirror', label: 'Laminate + mirror', description: 'Full-length mirror on one or more shutters.', rate: 15_000, tier: 'Popular' },
    { id: 'acrylic', label: 'Acrylic', description: 'Glossy, seamless, brighter in a small room.', rate: 18_500, tier: 'Premium' },
    { id: 'veneer', label: 'Natural veneer', description: 'Real wood grain, matched across shutters.', rate: 25_000, tier: 'Luxe' },
  ],
  accessories: [
    { id: 'drawers', label: 'Internal drawer bank', price: 14_500 },
    { id: 'trouser', label: 'Pull-out trouser rack', price: 6_800 },
    { id: 'shoe', label: 'Shoe rack unit', price: 9_200 },
    { id: 'safe', label: 'Safe niche', description: 'Lockable compartment behind a shutter', price: 11_000 },
    { id: 'organiser', label: 'Accessory organisers', price: 5_400 },
  ],
  addOns: [
    { id: 'loft', label: 'Loft storage above', price: 21_000 },
    { id: 'lighting', label: 'Internal sensor lighting', price: 8_600 },
    { id: 'dresser', label: 'Integrated dresser unit', price: 24_000 },
    { id: 'civil', label: 'Wall levelling and prep', price: 12_000 },
  ],
  packages: [
    { id: 'essentials', label: 'Essentials', description: 'Laminate shutters with hanging and shelving.', material: 'laminate', includes: ['organiser'] },
    { id: 'premium', label: 'Premium', description: 'Mirror front, drawer bank and internal lighting.', material: 'mirror', includes: ['drawers', 'organiser', 'trouser'] },
    { id: 'luxe', label: 'Luxe', description: 'Veneer shutters with every organiser and a dresser.', material: 'veneer', includes: ['drawers', 'trouser', 'shoe', 'safe', 'organiser'] },
  ],
};

const fullHome: CalculatorConfig = {
  type: 'full-home',
  title: 'Full Home Calculator',
  intro: 'A costed range for the whole home, including the work that is not modular.',
  photo: 'heroGallery',
  minutes: 3,
  labels: {
    layoutStep: 'How big is the home?',
    layoutHelp: 'Pick the configuration — we will prefill a typical carpet area.',
    measureStep: 'Carpet area and ceiling height',
    measureHelp: 'Carpet area is the usable floor area, not the super built-up figure.',
    primary: 'Carpet area',
    secondary: 'Ceiling height',
    accessoriesStep: 'Which rooms should we do?',
    accessoriesHelp: 'Leave out anything you have already done or want to keep.',
    materialStep: 'Choose a specification level',
    materialHelp: 'This sets the finish standard across every room.',
    addOnStep: 'Civil work and services',
    addOnHelp: 'The work beyond modular furniture.',
    unit: 'sq ft',
  },
  primaryRange: { min: 400, max: 3200, step: 50 },
  secondaryRange: { min: 8, max: 14, step: 1 },
  layouts: [
    { id: '1bhk', label: '1 BHK', description: 'One bedroom, living, kitchen.', factor: 1, defaults: { primary: 550, secondary: 10 }, shape: 'box' },
    { id: '2bhk', label: '2 BHK', description: 'Two bedrooms. The most common brief.', factor: 1.05, defaults: { primary: 900, secondary: 10 }, shape: 'box' },
    { id: '3bhk', label: '3 BHK', description: 'Three bedrooms, often with a utility.', factor: 1.1, defaults: { primary: 1_350, secondary: 10 }, shape: 'box' },
    { id: '4bhk', label: '4 BHK+', description: 'Four or more bedrooms, or a duplex.', factor: 1.16, defaults: { primary: 2_000, secondary: 11 }, shape: 'box' },
  ],
  materials: [
    { id: 'value', label: 'Value', description: 'Laminate throughout, essential fittings, standard paint.', rate: 380, tier: 'Value' },
    { id: 'comfort', label: 'Comfort', description: 'Mixed laminate and acrylic, better hardware, textured paint.', rate: 480, tier: 'Popular' },
    { id: 'premium', label: 'Premium', description: 'Acrylic and PU, designer lighting, feature walls.', rate: 650, tier: 'Premium' },
    { id: 'luxe', label: 'Luxe', description: 'Veneer and stone, bespoke joinery, imported hardware.', rate: 950, tier: 'Luxe' },
  ],
  accessories: [
    { id: 'kitchen', label: 'Modular kitchen', price: 165_000 },
    { id: 'wardrobes', label: 'Wardrobes in every bedroom', price: 198_000 },
    { id: 'living', label: 'Living room — TV unit and storage', price: 124_000 },
    { id: 'dining', label: 'Dining — crockery unit', price: 68_000 },
    { id: 'pooja', label: 'Pooja unit', price: 42_000 },
    { id: 'study', label: 'Study or home office', price: 56_000 },
  ],
  addOns: [
    { id: 'ceiling', label: 'False ceiling', price: 92_000 },
    { id: 'painting', label: 'Painting throughout', price: 78_000 },
    { id: 'electrical', label: 'Electrical rework', price: 86_000 },
    { id: 'plumbing', label: 'Plumbing rework', price: 54_000 },
    { id: 'flooring', label: 'Flooring and wall tiling', price: 132_000 },
    { id: 'decor', label: 'Soft furnishing and décor', price: 64_000 },
  ],
  packages: [
    { id: 'essentials', label: 'Essentials', description: 'Modular work only, in a value specification.', material: 'value', includes: ['kitchen', 'wardrobes'] },
    { id: 'premium', label: 'Premium', description: 'Modular plus ceiling and painting, in a better spec.', material: 'comfort', includes: ['kitchen', 'wardrobes', 'living', 'dining'] },
    { id: 'luxe', label: 'Luxe', description: 'Everything, finished to the highest specification.', material: 'luxe', includes: ['kitchen', 'wardrobes', 'living', 'dining', 'pooja', 'study'] },
  ],
};

export const calculators = { kitchen, wardrobe, 'full-home': fullHome } as const;

export type CalculatorType = keyof typeof calculators;

export function isCalculatorType(value: string | undefined): value is CalculatorType {
  return value === 'kitchen' || value === 'wardrobe' || value === 'full-home';
}
