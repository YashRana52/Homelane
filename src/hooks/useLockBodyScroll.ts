import { useEffect } from 'react';

/**
 * Freeze background scrolling while an overlay is open.
 *
 * Setting `overflow: hidden` on its own makes the page jump sideways by the
 * scrollbar width on desktop, so the lost width is paid back as padding. The
 * scroll position is also pinned with `top`, which is what stops iOS Safari
 * scrolling the page behind a fixed sheet.
 *
 * Nested locks are reference-counted, so two stacked overlays unlock correctly.
 */

let lockCount = 0;
let restore: (() => void) | null = null;

function lock() {
  if (lockCount++ > 0) return;

  const { body, documentElement: html } = document;
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  const previous = {
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  };

  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

  restore = () => {
    body.style.position = previous.position;
    body.style.top = previous.top;
    body.style.width = previous.width;
    body.style.overflow = previous.overflow;
    body.style.paddingRight = previous.paddingRight;
    // Jumping back must not animate, whatever scroll-behavior says.
    const htmlBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollY);
    html.style.scrollBehavior = htmlBehavior;
  };
}

function unlock() {
  if (--lockCount > 0) return;
  lockCount = 0;
  restore?.();
  restore = null;
}

export function useLockBodyScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    lock();
    return unlock;
  }, [enabled]);
}
