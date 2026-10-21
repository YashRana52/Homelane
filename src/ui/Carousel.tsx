import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

/**
 * Slide widths per breakpoint.
 *
 * Written out as complete class strings because Tailwind scans source text —
 * a composed string would never be generated. The fractional basis values on
 * mobile are deliberate: showing 86% of a slide leaves the next one peeking
 * past the edge, which is what tells a visitor the row scrolls at all.
 */
const perViewClasses = {
  /** Design, project and article cards: ~1 → 2 → 3 → 4 across. */
  card: 'basis-[86%] sm:basis-[60%] md:basis-[47%] lg:basis-[32%] xl:basis-[24.5%]',
  /** Room and solution tiles: 2 → 3 → 4 → 6 across. */
  tile: 'basis-[45%] sm:basis-[38%] md:basis-[31%] lg:basis-[23.5%] xl:basis-[15.8%]',
  /** Testimonials: 1 → 2 → 3 across. */
  testimonial: 'basis-[88%] md:basis-[48%] lg:basis-[32.5%]',
  /** Wide editorial or project hero slides: 1 → 2 across. */
  wide: 'basis-[92%] md:basis-[60%] lg:basis-[48%]',
  /** One full slide at every size — hero banners. */
  full: 'basis-full',
} as const;

export type CarouselPerView = keyof typeof perViewClasses;

type CarouselProps = {
  children: ReactNode[];
  perView?: CarouselPerView;
  /** Arrow buttons. Hidden on touch devices, where dragging is natural. */
  arrows?: boolean;
  dots?: boolean;
  loop?: boolean;
  /** Seconds between auto-advances. Omit to disable. Off under reduced motion. */
  autoplay?: number;
  /** Where a slide settles when it stops. 'start' for rows, 'center' for heroes. */
  align?: 'start' | 'center';
  /** Accessible name for the carousel region. */
  label: string;
  className?: string;
  /** Extra classes for the arrow+dots control row. */
  controlsClassName?: string;
};

/**
 * Horizontal slider built on Embla.
 *
 * The track is a plain flex row and each slide's width comes from a basis
 * class, which is how it stays responsive without JS measuring anything.
 *
 * The whole thing is a labelled `region` with `aria-roledescription`, and the
 * arrows disable at the ends when not looping instead of silently doing
 * nothing — a disabled control tells you where you are, a dead one does not.
 */
export function Carousel({
  children,
  perView = 'card',
  arrows = true,
  dots = true,
  loop = false,
  autoplay,
  align = 'start',
  label,
  className,
  controlsClassName,
}: CarouselProps) {
  const reduceMotion = usePrefersReducedMotion();

  const plugins =
    autoplay && !reduceMotion
      ? [Autoplay({ delay: autoplay * 1000, stopOnInteraction: true, stopOnMouseEnter: true })]
      : [];

  const [emblaRef, embla] = useEmblaCarousel(
    { align, loop, containScroll: 'trimSnaps', duration: reduceMotion ? 0 : 24 },
    plugins,
  );

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  const showArrows = arrows && snaps.length > 1;
  const showDots = dots && snaps.length > 1;
  // Past about ten slides a dot row stops being scannable and starts being a
  // layout problem: sixteen dots plus two arrows do not fit a 320px screen.
  // A counter reads better at any length and costs a fixed width.
  const useCounter = snaps.length > 10;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('relative', className)}
    >
      {/* The viewport bleeds to the gutter so a peeking slide is not clipped
          by the container's padding on mobile. */}
      <div ref={emblaRef} className="-mx-gutter px-gutter overflow-hidden md:mx-0 md:px-0">
        <div className="flex gap-4 md:gap-5">
          {children.map((child, i) => (
            <div
              key={i}
              className={cn('min-w-0 shrink-0 grow-0', perViewClasses[perView])}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${children.length}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {(showArrows || showDots) && (
        <div
          className={cn(
            'mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3',
            controlsClassName,
          )}
        >
          {showDots && !useCounter && (
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selected ? 'true' : undefined}
                  className={cn(
                    'rounded-pill h-2 transition-all duration-300',
                    i === selected ? 'bg-primary-500 w-6' : 'bg-surface-300 hover:bg-surface-400 w-2',
                  )}
                />
              ))}
            </div>
          )}

          {showDots && useCounter && (
            <p className="text-caption text-surface-600 tabular-nums" aria-live="polite">
              <span className="text-secondary-700 font-semibold">{selected + 1}</span>
              {' / '}
              {snaps.length}
            </p>
          )}

          {!showDots && <span />}

          {showArrows && (
            // touch: hidden — on a phone the row is dragged, so arrows are
            // dead weight. CSS, not a JS media query, so they never flash in.
            <div className="flex items-center gap-2 touch:hidden">
              <CarouselArrow
                direction="prev"
                onClick={() => embla?.scrollPrev()}
                disabled={!loop && !canPrev}
              />
              <CarouselArrow
                direction="next"
                onClick={() => embla?.scrollNext()}
                disabled={!loop && !canNext}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-surface border-surface-200 shadow-e2 grid size-10 place-items-center rounded-full border transition-colors duration-200',
        'hover:border-primary-500 hover:text-primary-600',
        'disabled:pointer-events-none disabled:opacity-35',
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
      <span className="sr-only">{direction === 'prev' ? 'Previous slide' : 'Next slide'}</span>
    </button>
  );
}
