import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const sizes = {
  /** 1280px — the page default. */
  default: 'site-container',
  /** 896px — long-form text and narrow forms. */
  narrow: 'site-container-narrow',
  /** Gutters only, no max width. For edge-to-edge carousels. */
  wide: 'w-full px-gutter',
  /** No gutter, no max width. The caller handles its own padding. */
  full: 'w-full',
} as const;

export type ContainerSize = keyof typeof sizes;

type ContainerProps = {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

/**
 * Horizontal page frame: gutter plus max width.
 *
 * The gutter is the `--gutter` token, which widens at md and lg on its own, so
 * a Container never needs responsive padding classes.
 */
export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return <Tag className={cn(sizes[size], className)}>{children}</Tag>;
}
