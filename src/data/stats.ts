import {
  BadgeIndianRupee,
  Building2,
  CreditCard,
  Home,
  MapPin,
  ShieldCheck,
  Timer,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { trustStats } from '@/config/brand';
import { formatStat } from '@/lib/formatINR';

export type Stat = {
  id: string;
  icon: LucideIcon;
  /** The number or short phrase that carries the claim. */
  value: string;
  label: string;
  /** Marks a claim that the footer footnotes qualify. */
  footnote?: number;
};

/**
 * The eight-item strip directly under the hero.
 *
 * Order is deliberate: the first four are promises about the deal, the last
 * four are evidence that the company can keep them. A visitor who reads only
 * the first row still gets the offer.
 */
export const stats: readonly Stat[] = [
  {
    id: 'delivery',
    icon: Timer,
    value: `${trustStats.deliveryDays} days`,
    label: 'Delivery guarantee',
    footnote: 2,
  },
  { id: 'pricing', icon: BadgeIndianRupee, value: 'No hidden', label: 'Costs, ever' },
  {
    id: 'warranty',
    icon: ShieldCheck,
    value: `${trustStats.warrantyYears} years`,
    label: 'Flat warranty',
    footnote: 1,
  },
  { id: 'emi', icon: CreditCard, value: 'Easy', label: 'EMIs available' },
  { id: 'designers', icon: Users, value: formatStat(trustStats.designers), label: 'In-house designers' },
  { id: 'homes', icon: Home, value: formatStat(trustStats.homesDelivered), label: 'Homes delivered' },
  { id: 'studios', icon: Building2, value: formatStat(trustStats.studios), label: 'Experience studios' },
  { id: 'cities', icon: MapPin, value: formatStat(trustStats.cities), label: 'Cities served' },
];

/**
 * The "why choose us" row further down the page. Longer-form than the stats
 * strip, and about process rather than scale.
 */
export const trustPoints: readonly Stat[] = [
  {
    id: 'warranty',
    icon: ShieldCheck,
    value: `${trustStats.warrantyYears}-year warranty`,
    label: 'On all modular woodwork and hardware',
    footnote: 1,
  },
  {
    id: 'move-in',
    icon: Timer,
    value: `${trustStats.deliveryDays}-day move-in`,
    label: 'From final design sign-off',
    footnote: 2,
  },
  {
    id: 'qc',
    icon: BadgeIndianRupee,
    value: `${trustStats.qualityChecks} quality checks`,
    label: 'Before anything reaches your home',
  },
  {
    id: 'homes',
    icon: Home,
    value: `${formatStat(trustStats.homesDelivered)} homes`,
    label: 'Designed, built and handed over',
  },
  {
    id: 'cities',
    icon: MapPin,
    value: `${formatStat(trustStats.cities)} cities`,
    label: 'With local teams and site supervisors',
  },
  {
    id: 'catalogue',
    icon: Building2,
    value: `${formatStat(trustStats.catalogueProducts)} products`,
    label: 'Finishes, hardware and fittings to choose from',
  },
  {
    id: 'designers',
    icon: Users,
    value: `${formatStat(trustStats.designers)} designers`,
    label: 'On staff — never outsourced',
  },
];
