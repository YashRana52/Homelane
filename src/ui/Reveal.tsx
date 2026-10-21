import { motion } from 'motion/react';
import { useMemo, type ElementType, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type RevealProps = {
  as?: ElementType;
  /** Seconds. Use with the index of a list to stagger a grid. */
  delay?: number;
  /** Travel distance in px. 16 is the house default. */
  y?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fade-and-rise a block into view as it is scrolled to, once.
 *
 * `once` matters: an element that re-animates every time it re-enters the
 * viewport turns a long page into a flicker show. The 120px bottom margin
 * starts the animation slightly before the element is visible, so it has
 * finished by the time it is properly on screen.
 *
 * Under prefers-reduced-motion the content renders in place with no transition
 * at all, rather than a faster one.
 */
export function Reveal({ as = 'div', delay = 0, y = 16, className, children }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  // motion.create() returns a new component type on every call, which would
  // remount the subtree on each render, so it is cached against `as`.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -120px 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger a list of children. Each direct child gets its own Reveal with a
 * delay of `index * step`, capped so a long grid does not take forever.
 */
export function RevealGroup({
  children,
  step = 0.06,
  maxDelay = 0.4,
  className,
}: {
  children: ReactNode[];
  step?: number;
  maxDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, maxDelay)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
