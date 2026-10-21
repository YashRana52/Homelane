import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Button, Container, Heading, ProgressBar } from '@/ui';

type WizardChromeProps = {
  step: number;
  total: number;
  title: string;
  help?: string;
  /** Running total, shown once there is enough input to compute one. */
  runningTotal?: ReactNode;
  canAdvance: boolean;
  nextLabel?: string;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  children: ReactNode;
};

/**
 * Frame around one wizard step: progress, heading, and the Back/Next pair.
 *
 * The actions are a sticky bar at the bottom on phones and sit inline on
 * desktop. On a phone the step content is usually taller than the viewport,
 * so an inline Next button is below the fold — people fill the step in, see
 * nothing to press, and leave. The sticky bar also keeps the primary action
 * in the thumb zone rather than at the top of a long page.
 *
 * `aria-live` on the step counter announces "Step 3 of 5" on each advance,
 * which is the only cue a screen-reader user gets that the view changed.
 */
export function WizardChrome({
  step,
  total,
  title,
  help,
  runningTotal,
  canAdvance,
  nextLabel,
  onNext,
  onBack,
  isFirst,
  children,
}: WizardChromeProps) {
  return (
    <>
      <Container className="py-8 lg:py-12">
        <div className="max-w-2xl">
          <div aria-live="polite" aria-atomic="true">
            <ProgressBar step={step} total={total} />
          </div>

          <Heading as="h1" level="h2" className="mt-5">
            {title}
          </Heading>
          {help && <p className="text-body-lg text-surface-600 mt-2">{help}</p>}
        </div>

        <div className="mt-8">{children}</div>

        {/* Desktop actions */}
        <div className="mt-10 hidden items-center justify-between gap-4 md:flex">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={isFirst}
            iconLeft={<ArrowLeft className="size-4" />}
          >
            Back
          </Button>

          <div className="flex items-center gap-5">
            {runningTotal}
            <Button
              size="lg"
              onClick={onNext}
              disabled={!canAdvance}
              iconRight={<ArrowRight className="size-4" />}
            >
              {nextLabel ?? 'Next'}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile actions — pinned, clear of the home indicator */}
      <div
        className={cn(
          'bg-surface border-surface-200 shadow-e3 sticky bottom-0 z-20 border-t md:hidden',
          'px-gutter py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        )}
      >
        {runningTotal && <div className="mb-2 text-center">{runningTotal}</div>}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack} disabled={isFirst} className="shrink-0">
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="sr-only">Back</span>
          </Button>
          <Button
            fullWidth
            size="lg"
            onClick={onNext}
            disabled={!canAdvance}
            iconRight={<ArrowRight className="size-4" />}
          >
            {nextLabel ?? 'Next'}
          </Button>
        </div>
      </div>
    </>
  );
}
