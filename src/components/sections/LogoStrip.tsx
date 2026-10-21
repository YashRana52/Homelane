import { cn } from '@/lib/cn';
import { Container } from '@/ui';

type LogoStripProps = {
  /** Section label, e.g. "In the news". */
  title: string;
  names: readonly string[];
  /** Scroll the row continuously. Off for short strips. */
  marquee?: boolean;
  className?: string;
};

/**
 * A row of wordmarks.
 *
 * These are set in type rather than loaded as images, because the brand has no
 * logo files yet and a row of grey boxes tells you nothing about the layout.
 *
 * The marquee renders its list twice and translates by exactly -50%, which is
 * what makes the loop seamless.
 *
 * Reduced motion needs explicit handling here. The global kill-switch in
 * global.css collapses animations to 0.01ms, which for a marquee means it
 * finishes instantly and parks at -50% — the row ends up shifted rather than
 * stopped. So the animation is turned off properly, the track reflows to a
 * centred wrap, and the duplicate copy is hidden so no name appears twice.
 */
export function LogoStrip({ title, names, marquee = false, className }: LogoStripProps) {
  const item = (name: string, key: string, extra?: string) => (
    <li
      key={key}
      className={cn(
        'text-surface-600 hover:text-secondary-700 font-display shrink-0 text-lg font-semibold tracking-wide whitespace-nowrap transition-colors',
        extra,
      )}
    >
      {name}
    </li>
  );

  return (
    <section className={cn('border-surface-200 border-y py-8', className)} aria-label={title}>
      <Container>
        <p className="text-eyebrow text-surface-600 mb-5 text-center uppercase">{title}</p>
      </Container>

      {marquee ? (
        <div className="relative overflow-hidden" aria-hidden="true">
          {/* Fades the row into the page edges instead of cutting it off. */}
          <div className="from-surface pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
          <div className="from-surface pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />

          <ul
            className={cn(
              'animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]',
              'motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-4 motion-reduce:px-gutter',
            )}
          >
            {names.map((n) => item(n, `a-${n}`))}
            {/* Second copy: the -50% translate lands exactly here. */}
            {names.map((n) => item(n, `b-${n}`, 'motion-reduce:hidden'))}
          </ul>
        </div>
      ) : (
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {names.map((n) => item(n, n))}
          </ul>
        </Container>
      )}

      {/* Readable equivalent for assistive tech when the row is a marquee. */}
      {marquee && <p className="sr-only">{names.join(', ')}</p>}
    </section>
  );
}
