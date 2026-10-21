import { useEffect, useState } from 'react';

export type ScrollState = {
  /** Which way the page last moved. Starts as 'up'. */
  direction: 'up' | 'down';
  /** True once the page has scrolled past `threshold`. */
  scrolled: boolean;
  y: number;
};

/**
 * Track scroll position and direction for the sticky header.
 *
 * `scrolled` drives the header's shadow; `direction` collapses the utility row
 * when reading downward and brings it back on the way up.
 *
 * Two details keep this from thrashing: reads happen inside
 * requestAnimationFrame so layout is never forced mid-scroll, and a direction
 * flip needs `delta` pixels of travel, which stops the row flickering on the
 * small bounces a trackpad produces.
 */
export function useScrollDirection({ threshold = 8, delta = 6 } = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({ direction: 'up', scrolled: false, y: 0 });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      const diff = y - lastY;

      if (Math.abs(diff) >= delta) {
        setState({ direction: diff > 0 ? 'down' : 'up', scrolled: y > threshold, y });
        lastY = y;
      } else {
        setState((prev) =>
          prev.scrolled === y > threshold ? prev : { ...prev, scrolled: y > threshold, y },
        );
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, delta]);

  return state;
}
