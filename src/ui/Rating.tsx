import { Star } from 'lucide-react';

import { cn } from '@/lib/cn';
import { formatIndianNumber } from '@/lib/formatINR';

const starSizes = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
} as const;

type RatingProps = {
  /** Out of `max`. Fractional values render a partially filled star. */
  value: number;
  max?: number;
  size?: keyof typeof starSizes;
  /** Review count, shown as "(35,000+ reviews)". */
  count?: number;
  /** Show the numeric value beside the stars. */
  showValue?: boolean;
  className?: string;
};

/**
 * Star rating display — read-only.
 *
 * A 4.5 is drawn by overlaying a clipped row of filled stars on a row of empty
 * ones, so a half star is a real half rather than a rounded-up whole one.
 * The stars are decorative; the accessible value comes from the text label.
 */
export function Rating({
  value,
  max = 5,
  size = 'md',
  count,
  showValue = true,
  className,
}: RatingProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const label = `${clamped} out of ${max}${count ? `, ${formatIndianNumber(count)} reviews` : ''}`;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative inline-flex shrink-0" role="img" aria-label={label}>
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: max }, (_, i) => (
            <Star key={i} className={cn(starSizes[size], 'text-surface-300')} />
          ))}
        </span>

        <span
          className="absolute inset-0 flex gap-0.5 overflow-hidden"
          style={{ width: `${(clamped / max) * 100}%` }}
          aria-hidden="true"
        >
          {Array.from({ length: max }, (_, i) => (
            <Star
              key={i}
              className={cn(starSizes[size], 'fill-warning text-warning shrink-0')}
            />
          ))}
        </span>
      </span>

      {showValue && <span className="text-body font-semibold">{clamped}</span>}
      {count !== undefined && (
        <span className="text-caption text-surface-600">
          ({formatIndianNumber(count)}+ reviews)
        </span>
      )}
    </div>
  );
}
