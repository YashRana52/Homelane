import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const tones = {
  /** The "new" flag in navigation. */
  new: 'bg-primary-500 text-on-primary',
  /** Discounts and limited offers. Mustard reads as urgency without alarm. */
  offer: 'bg-mustard text-secondary-900',
  gold: 'bg-gold-600 text-on-gold',
  success: 'bg-success-light text-success',
  info: 'bg-info-light text-info',
  neutral: 'bg-surface-100 text-surface-800',
  /** For a badge sitting on top of a photograph. */
  onImage: 'bg-surface/92 text-secondary-700 backdrop-blur-sm',
} as const;

export type BadgeTone = keyof typeof tones;

type BadgeProps = {
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** A small non-interactive status or category label. */
export function Badge({ tone = 'neutral', icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-caption rounded-xs inline-flex items-center gap-1 px-2 py-0.5 font-semibold',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
