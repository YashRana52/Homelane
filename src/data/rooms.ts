import type { PhotoKey } from '@/config/images';

export type Room = {
  id: string;
  label: string;
  to: string;
  photo: PhotoKey;
  /** Rough catalogue size, shown under the label on larger tiles. */
  designCount: number;
};

/**
 * The twelve room categories, in the order people browse them.
 *
 * Kitchen and wardrobe lead because they are what most enquiries start with;
 * the ceiling, pooja and foyer tiles sit last but stay on the homepage,
 * because they are the categories that signal "this company does Indian homes"
 * rather than imported catalogue interiors.
 */
export const rooms: readonly Room[] = [
  { id: 'modular-kitchen', label: 'Modular Kitchen', to: '/design-ideas/modular-kitchen', photo: 'roomKitchen', designCount: 3387 },
  { id: 'wardrobe', label: 'Wardrobe', to: '/design-ideas/wardrobe', photo: 'roomWardrobe', designCount: 2140 },
  { id: 'living-room', label: 'Living Room', to: '/design-ideas/living-room', photo: 'roomLiving', designCount: 2916 },
  { id: 'master-bedroom', label: 'Master Bedroom', to: '/design-ideas/master-bedroom', photo: 'roomMasterBedroom', designCount: 1874 },
  { id: 'kids-room', label: 'Kids Room', to: '/design-ideas/kids-room', photo: 'roomKidsRoom', designCount: 962 },
  { id: 'guest-bedroom', label: 'Guest Bedroom', to: '/design-ideas/guest-bedroom', photo: 'roomGuestBedroom', designCount: 731 },
  { id: 'bathroom', label: 'Bathroom', to: '/design-ideas/bathroom', photo: 'roomBathroom', designCount: 1109 },
  { id: 'false-ceiling', label: 'False Ceiling', to: '/design-ideas/false-ceiling', photo: 'roomFalseCeiling', designCount: 1452 },
  { id: 'pooja-room', label: 'Pooja Room', to: '/design-ideas/pooja-room', photo: 'roomPooja', designCount: 608 },
  { id: 'foyer', label: 'Foyer', to: '/design-ideas/foyer', photo: 'roomFoyer', designCount: 417 },
  { id: 'dining-room', label: 'Dining Room', to: '/design-ideas/dining-room', photo: 'roomDining', designCount: 1283 },
  { id: 'home-office', label: 'Home Office', to: '/design-ideas/home-office', photo: 'roomHomeOffice', designCount: 845 },
];
