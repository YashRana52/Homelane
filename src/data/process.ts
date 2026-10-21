import { ClipboardCheck, Factory, Hammer, KeyRound, PenTool, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { PhotoKey } from '@/config/images';

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  /** What the customer pays at this point, as shown on the milestone chip. */
  payment?: string;
  icon: LucideIcon;
  photo: PhotoKey;
};

/**
 * The six-step delivery process.
 *
 * Payment milestones are stated on each step on purpose. "No hidden costs" is
 * the headline promise on this site, and the fastest way to make that concrete
 * is to show exactly when money changes hands before anyone asks.
 */
export const processSteps: readonly ProcessStep[] = [
  {
    id: 'meet',
    title: 'Meet your designer',
    description:
      'Share your floor plan and what you want from the space. You leave with 3D designs and an itemised quote — not a ballpark.',
    payment: 'Free',
    icon: PenTool,
    photo: 'serviceFullHome',
  },
  {
    id: 'book',
    title: 'Book your order',
    description:
      'Happy with the design and the number? A 10% booking amount locks the scope, the price and your slot in the production queue.',
    payment: '10% of woodwork',
    icon: ClipboardCheck,
    photo: 'living1',
  },
  {
    id: 'finalise',
    title: 'Finalise every finish',
    description:
      'Pick laminates, hardware, handles and countertops with your designer at the studio. Site measurements are taken and drawings frozen.',
    payment: 'Next 10%',
    icon: Hammer,
    photo: 'kitchen2',
  },
  {
    id: 'factory',
    title: 'Into production',
    description:
      'Frozen drawings go to the factory. Every panel is cut, edge-banded and quality-checked against your drawing, not a generic template.',
    payment: '30% of woodwork',
    icon: Factory,
    photo: 'kitchen8',
  },
  {
    id: 'dispatch',
    title: 'Dispatch and install',
    description:
      'Your order ships to site and our own installation team fits it. You get a daily update and a named site supervisor.',
    payment: 'Remaining 50%',
    icon: Truck,
    photo: 'wardrobe2',
  },
  {
    id: 'handover',
    title: 'Snag-free handover',
    description:
      'We walk the home with you, fix anything on the snag list, hand over the warranty documents and the keys.',
    icon: KeyRound,
    photo: 'project1',
  },
];

export type SessionStep = {
  id: string;
  title: string;
  description: string;
};

/** What actually happens in the free design session. */
export const sessionSteps: readonly SessionStep[] = [
  {
    id: 'meet',
    title: 'Meet your designer',
    description: 'At a studio or over video. Bring your floor plan and a rough budget.',
  },
  {
    id: 'walkthrough',
    title: 'Walk the studio',
    description: 'Touch the materials and open the drawers before you commit to anything.',
  },
  {
    id: 'designs',
    title: 'See 3D designs',
    description: 'Your actual rooms, drawn to scale, in the session — not a week later.',
  },
  {
    id: 'quote',
    title: 'Get an instant quote',
    description: 'Itemised to the last handle, so you can see what each decision costs.',
  },
];
