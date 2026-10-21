import {
  Armchair,
  Baby,
  Bath,
  BookOpen,
  ChefHat,
  DoorOpen,
  Flower2,
  Lamp,
  LayoutPanelTop,
  PaintRoller,
  Rows3,
  Shirt,
  Sofa,
  Tv,
  Wallpaper,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Solution = {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
};

/**
 * The fifteen scopes a project can include.
 *
 * This grid does a different job from the room tiles above it: those sell
 * inspiration, these answer "will you also do my false ceiling and painting,
 * or do I need a second contractor?". Hence icons and labels, not photos.
 */
export const solutions: readonly Solution[] = [
  { id: 'kitchen', label: 'Modular Kitchen', to: '/design-ideas/modular-kitchen', icon: ChefHat },
  { id: 'wardrobe', label: 'Storage & Wardrobe', to: '/design-ideas/wardrobe', icon: Shirt },
  { id: 'crockery', label: 'Crockery Unit', to: '/design-ideas/crockery-unit', icon: Rows3 },
  { id: 'space-saving', label: 'Space-Saving Furniture', to: '/design-ideas/space-saving-furniture', icon: Armchair },
  { id: 'tv-unit', label: 'TV Unit', to: '/design-ideas/tv-unit', icon: Tv },
  { id: 'study', label: 'Study Table', to: '/design-ideas/study-table', icon: BookOpen },
  { id: 'false-ceiling', label: 'False Ceiling', to: '/design-ideas/false-ceiling', icon: LayoutPanelTop },
  { id: 'lighting', label: 'Lighting', to: '/design-ideas/lighting', icon: Lamp },
  { id: 'wallpaper', label: 'Wallpaper', to: '/design-ideas/wallpaper', icon: Wallpaper },
  { id: 'paint', label: 'Wall Paint', to: '/design-ideas/wall-paint', icon: PaintRoller },
  { id: 'bathroom', label: 'Bathroom', to: '/design-ideas/bathroom', icon: Bath },
  { id: 'pooja', label: 'Pooja Unit', to: '/design-ideas/pooja-room', icon: Flower2 },
  { id: 'foyer', label: 'Foyer', to: '/design-ideas/foyer', icon: DoorOpen },
  { id: 'movable', label: 'Movable Furniture', to: '/design-ideas/space-saving-furniture', icon: Sofa },
  { id: 'kids', label: 'Kids Bedroom', to: '/design-ideas/kids-room', icon: Baby },
];
