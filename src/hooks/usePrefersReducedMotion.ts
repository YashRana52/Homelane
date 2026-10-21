import { useMediaQuery } from './useMediaQuery';

/**
 * True when the visitor has asked their OS to reduce motion.
 *
 * global.css already neutralises CSS transitions and animations, but anything
 * driven from JS — Motion variants, Embla autoplay, a counter that counts up —
 * has to check this itself.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
