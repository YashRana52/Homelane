import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

type ProgressBarProps = {
  /** 1-based current step. */
  step: number;
  total: number;
  /** "STEP 1 OF 2" above the bar. */
  showLabel?: boolean;
  /** Per-step titles. When given, renders numbered dots instead of a bar. */
  labels?: readonly string[];
  className?: string;
};

/**
 * Wizard progress, in two forms.
 *
 * With `labels` it renders numbered dots joined by a rail — right for a short,
 * named sequence like the 6-step delivery process. Without them it renders a
 * plain fill bar, which is what a calculator with unnamed steps needs.
 */
export function ProgressBar({
  step,
  total,
  showLabel = true,
  labels,
  className,
}: ProgressBarProps) {
  const current = Math.min(Math.max(step, 1), total);
  const pct = (current / total) * 100;

  return (
    <div className={className}>
      {showLabel && (
        <p className="text-eyebrow text-surface-600 mb-2 uppercase">
          Step {current} of {total}
        </p>
      )}

      {labels ? (
        <ol className="flex items-start">
          {labels.map((label, i) => {
            const index = i + 1;
            const done = index < current;
            const active = index === current;

            return (
              <li
                key={label}
                className={cn('flex min-w-0 flex-1 flex-col items-center', i === 0 && 'flex-none')}
                aria-current={active ? 'step' : undefined}
              >
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <span
                      className={cn(
                        'h-0.5 min-w-4 flex-1 transition-colors duration-300',
                        done || active ? 'bg-primary-500' : 'bg-surface-200',
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      'text-caption grid size-8 shrink-0 place-items-center rounded-full font-semibold transition-colors duration-300',
                      done && 'bg-primary-500 text-on-primary',
                      active && 'bg-primary-500 text-on-primary ring-primary-200 ring-4',
                      !done && !active && 'bg-surface-100 text-surface-600',
                    )}
                  >
                    {done ? <Check className="size-4" aria-hidden="true" /> : index}
                  </span>
                  {i < labels.length - 1 && (
                    <span
                      className={cn(
                        'h-0.5 min-w-4 flex-1 transition-colors duration-300',
                        done ? 'bg-primary-500' : 'bg-surface-200',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span
                  className={cn(
                    'text-caption mt-2 hidden text-center md:block',
                    active ? 'text-secondary-700 font-semibold' : 'text-surface-600',
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <div
          className="bg-surface-100 rounded-pill h-1.5 w-full overflow-hidden"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Step ${current} of ${total}`}
        >
          <div
            className="bg-primary-500 h-full rounded-pill transition-[width] duration-400 ease-soft"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}
