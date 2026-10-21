import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import { useLocation } from 'react-router';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Fades each route in on arrival.
 *
 * Keyed on the pathname, not the full location, so moving between steps of a
 * calculator (`?step=3`) does not re-fade the page — that would read as a
 * navigation when it is one form advancing.
 *
 * Fade in only, with no exit animation. An exit would mean holding the old
 * page on screen while the new one loads, which delays content for the sake
 * of a flourish; and because this wraps a Suspense boundary, the fade lands on
 * the skeleton first and then the content, exactly as it should.
 *
 * Opacity alone, so nothing moves and CLS stays at zero.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
