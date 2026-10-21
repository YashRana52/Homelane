import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query from JS.
 *
 * Use this only when behaviour must change, not merely appearance — a hidden
 * element, a different component tree, arrows that should not render on touch.
 * Anything purely visual belongs in a Tailwind responsive class, which costs
 * nothing and works before hydration.
 *
 * Returns `false` on the first render, so a component that renders differently
 * either way will flash once. Where that matters, gate on it after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Breakpoint helpers, mirroring the tokens in theme.css. */
export const MQ = {
  sm: '(min-width: 480px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  /** True on devices whose primary input cannot hover — phones, tablets. */
  touch: '(hover: none) and (pointer: coarse)',
} as const;
