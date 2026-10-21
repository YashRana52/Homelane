import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ChipProps = {
  active?: boolean;
  /** Shown after the label, e.g. a result count for a filter. */
  count?: number;
  /** Renders a clear button inside the chip and calls this on click. */
  onDismiss?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * A selectable pill, used for gallery filters and category switches.
 *
 * It reports state with `aria-pressed` rather than colour alone, so the
 * selection is available to a screen reader and not just visible.
 */
export function Chip({
  active = false,
  count,
  onDismiss,
  onClick,
  disabled,
  className,
  children,
}: ChipProps) {
  return (
    <span
      className={cn(
        'rounded-pill inline-flex items-center transition-colors duration-200',
        active
          ? 'bg-secondary-700 text-surface'
          : 'bg-surface border-surface-300 text-secondary-700 border',
        !disabled && !active && 'hover:border-secondary-700',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        className={cn(
          'text-btn inline-flex min-h-11 items-center gap-1.5 px-4 py-2',
          onDismiss && 'pr-1.5',
        )}
      >
        {children}
        {count !== undefined && (
          <span className={cn('text-caption', active ? 'text-surface/70' : 'text-surface-600')}>
            {count}
          </span>
        )}
      </button>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          disabled={disabled}
          className={cn(
            'mr-1.5 grid size-7 shrink-0 place-items-center rounded-full transition-colors',
            active ? 'hover:bg-surface/20' : 'hover:bg-surface-100',
          )}
        >
          <X className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Remove filter</span>
        </button>
      )}
    </span>
  );
}
