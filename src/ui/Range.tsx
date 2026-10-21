import { useId, type ChangeEvent, type CSSProperties } from 'react';

import { cn } from '@/lib/cn';

type RangeProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  /** Appended to the readout, e.g. "ft" or "sq ft". */
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
};

/**
 * Slider with a numeric field beside it.
 *
 * Both controls exist on purpose: a slider is the fast way to explore a range
 * and a hopeless way to enter the one number you already measured. They share
 * a single label through `aria-labelledby`, so a screen reader announces the
 * field rather than reading the label twice.
 *
 * The filled track is a gradient painted onto the native track pseudo-element
 * rather than a second div positioned underneath. An overlay has to be nudged
 * into place with negative margins and drifts the moment the row's height
 * changes; a gradient cannot.
 */
export function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  className,
}: RangeProps) {
  const labelId = useId();
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const clamp = (n: number) => Math.min(Math.max(n, min), max);

  const onNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (!Number.isNaN(next)) onChange(clamp(next));
  };

  const trackStyle = {
    '--track': `linear-gradient(to right, var(--c-primary-500) ${pct}%, var(--c-surface-200) ${pct}%)`,
  } as CSSProperties;

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span id={labelId} className="text-caption text-surface-600 font-semibold">
          {label}
        </span>
        <span className="text-h4 font-display tabular-nums">
          {value.toLocaleString('en-IN')}
          {unit && <span className="text-caption text-surface-600 ml-1">{unit}</span>}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="range"
          aria-labelledby={labelId}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={trackStyle}
          className={cn(
            // 44px row for the touch target; the visible track is 6px.
            'h-11 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-pill [&::-webkit-slider-runnable-track]:bg-[image:var(--track)]',
            '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-pill [&::-moz-range-track]:bg-[image:var(--track)]',
            // Thumb centred on a 6px track: (20 - 6) / 2 = 7px up.
            '[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-e2',
            '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-500',
          )}
        />

        <input
          type="number"
          aria-labelledby={labelId}
          value={value}
          min={min}
          max={max}
          step={step}
          inputMode="numeric"
          onChange={onNumber}
          onBlur={(e) => onChange(clamp(Number(e.target.value) || min))}
          className="text-body border-surface-300 rounded-sm focus:border-primary-500 h-11 w-20 shrink-0 border px-2 text-center tabular-nums outline-none"
        />
      </div>
    </div>
  );
}
