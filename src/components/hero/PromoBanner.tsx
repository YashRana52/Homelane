import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Button, Container } from '@/ui';

const tones = {
  /** Mustard. Offers and deadlines — reads as urgency without alarm. */
  offer: {
    band: 'bg-mustard-light',
    text: 'text-secondary-900',
    sub: 'text-secondary-700/80',
    button: 'secondary' as const,
  },
  /** Plum. Quieter, for a tool or a service rather than a deal. */
  premium: {
    band: 'bg-secondary-700',
    text: 'text-surface',
    sub: 'text-surface/75',
    button: 'onImage' as const,
  },
  /** Coral tint. The default nudge towards the calculators. */
  soft: {
    band: 'bg-primary-50',
    text: 'text-secondary-900',
    sub: 'text-surface-600',
    button: 'primary' as const,
  },
} as const;

export type PromoTone = keyof typeof tones;

type PromoBannerProps = {
  tone?: PromoTone;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  cta: { label: string; to: string };
  className?: string;
};

/**
 * A single-line prompt between sections.
 *
 * Stacks on mobile and goes inline from `md`. The action keeps its full width
 * on a phone, where a button sharing a row with two lines of text ends up too
 * narrow to read.
 */
export function PromoBanner({
  tone = 'soft',
  icon: Icon,
  title,
  subtitle,
  cta,
  className,
}: PromoBannerProps) {
  const style = tones[tone];

  return (
    <aside className={cn(style.band, className)}>
      <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-start gap-3 md:items-center">
          {Icon && (
            <Icon className={cn('mt-0.5 size-6 shrink-0 md:mt-0', style.text)} aria-hidden="true" />
          )}
          <div>
            <p className={cn('text-h4 font-display', style.text)}>{title}</p>
            {subtitle && <p className={cn('text-caption mt-0.5', style.sub)}>{subtitle}</p>}
          </div>
        </div>

        <Button
          to={cta.to}
          variant={style.button}
          className="shrink-0 max-md:w-full"
          iconRight={<ArrowRight className="size-4" />}
        >
          {cta.label}
        </Button>
      </Container>
    </aside>
  );
}
