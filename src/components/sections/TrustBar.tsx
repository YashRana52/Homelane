import { trustPoints } from '@/data/stats';
import { Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * The seven-point "why us" block.
 *
 * Seven items do not divide evenly into any column count, so the last one is
 * allowed to span two columns at `lg` rather than sitting alone — an orphaned
 * final cell is the thing that makes a grid look broken.
 */
export function TrustBar() {
  return (
    <Section bg="muted" pad="lg">
      <Eyebrow>Why us</Eyebrow>
      <Heading as="h2" level="h2" className="mt-2 max-w-[20ch]">
        The promises we put in writing.
      </Heading>

      <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map(({ id, icon: Icon, value, label, footnote }, i) => (
          <Reveal
            as="li"
            key={id}
            delay={Math.min(i * 0.05, 0.3)}
            className={i === trustPoints.length - 1 ? 'lg:col-span-2' : undefined}
          >
            <div className="flex gap-4">
              <span className="bg-primary-50 text-primary-600 grid size-11 shrink-0 place-items-center rounded-full">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-h4 font-display">
                  {value}
                  {footnote && (
                    <>
                      <sup aria-hidden="true" className="text-surface-600 ml-0.5">
                        {footnote}
                      </sup>
                      <span className="sr-only"> (see terms in the footer)</span>
                    </>
                  )}
                </p>
                <p className="text-body text-surface-600 mt-1">{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
