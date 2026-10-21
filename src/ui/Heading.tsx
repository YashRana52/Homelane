import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const levels = {
  display: 'text-display',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const;

export type HeadingLevel = keyof typeof levels;

type HeadingProps = {
  /**
   * The semantic tag. Chosen by document outline, not by how big the text
   * should look — a page has exactly one h1 and never skips a level.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /** The visual size. Deliberately independent of `as`. */
  level?: HeadingLevel;
  className?: string;
  id?: string;
  /** For one-off values a class cannot carry, such as an animation delay. */
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * A heading whose size and whose semantics are set separately.
 *
 * This split exists because the two genuinely diverge: a card title inside a
 * section is an `h3` in the outline but wants display-size type on a hero, and
 * a visually small label can still be the section's `h2`.
 */
export function Heading({
  as: Tag = 'h2',
  level = 'h2',
  className,
  id,
  style,
  children,
}: HeadingProps) {
  return (
    <Tag id={id} style={style} className={cn(levels[level], className)}>
      {children}
    </Tag>
  );
}

type EyebrowProps = {
  as?: 'p' | 'span' | 'div';
  className?: string;
  children: ReactNode;
};

/**
 * The small uppercase label that sits above a section heading. Coral by
 * default, because it is doing the work of a visual anchor.
 */
export function Eyebrow({ as: Tag = 'p', className, children }: EyebrowProps) {
  return <Tag className={cn('text-eyebrow text-primary-600 uppercase', className)}>{children}</Tag>;
}
