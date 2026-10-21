import { Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { brand } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Button } from '@/ui';

/**
 * Sticky action bar for phones.
 *
 * It stays out of the way until the hero has been scrolled past — showing it
 * immediately would cover the hero's own call to action with a duplicate of
 * itself. 600px is roughly one hero height, above the 424px minimum.
 *
 * Hidden at md and up, where the header's button is always on screen anyway.
 */
export function FloatingCTA() {
  const { y } = useScrollDirection();
  const reduceMotion = usePrefersReducedMotion();
  const visible = y > 600;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { y: '110%' }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: '110%' }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface border-surface-200 shadow-e4 fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href={brand.phoneHref}
            className="border-surface-300 text-secondary-700 hover:border-primary-500 hover:text-primary-600 grid size-12 shrink-0 place-items-center rounded-sm border transition-colors"
          >
            <Phone className="size-5" aria-hidden="true" />
            <span className="sr-only">Call {brand.phone}</span>
          </a>
          <Button to="/estimate" size="lg" fullWidth>
            Get Free Estimate
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
