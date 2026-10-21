import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container, type ContainerSize } from './Container';

/** Vertical rhythm: 48 → 64 → 96px (PLAN.md §3.3). */
const pads = {
  none: '',
  sm: 'py-8 md:py-10 lg:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-12 md:py-16 lg:py-24',
} as const;

const backgrounds = {
  none: '',
  surface: 'bg-surface',
  /** The default alternating band. */
  muted: 'bg-surface-50',
  plum: 'bg-secondary-700 text-surface',
  primary: 'bg-primary-500 text-on-primary',
  /** Warm wash, used behind trust and stats strips. */
  gradient: 'bg-gradient-to-b from-surface-50 to-surface',
} as const;

export type SectionPad = keyof typeof pads;
export type SectionBg = keyof typeof backgrounds;

type SectionProps = {
  as?: ElementType;
  pad?: SectionPad;
  bg?: SectionBg;
  /** Set to "full" to opt out of the inner Container. */
  container?: ContainerSize | false;
  id?: string;
  className?: string;
  /** Classes for the inner Container rather than the outer band. */
  innerClassName?: string;
  children: ReactNode;
};

/**
 * One full-width horizontal band of the page: background + vertical padding,
 * with the content framed by a Container.
 *
 * Pass `container={false}` when the band's content must reach the viewport
 * edge — a carousel that bleeds, or a full-bleed image.
 */
export function Section({
  as: Tag = 'section',
  pad = 'md',
  bg = 'none',
  container = 'default',
  id,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(backgrounds[bg], pads[pad], className)}>
      {container === false ? (
        children
      ) : (
        <Container size={container} className={innerClassName}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
