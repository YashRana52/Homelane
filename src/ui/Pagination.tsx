import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/cn';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** How many page numbers to show around the current one. */
  siblings?: number;
  className?: string;
};

/**
 * Build the visible page list, with gaps collapsed to an ellipsis.
 * A gallery runs to 162 pages, so first/last plus a window around the
 * current page is the only layout that fits on a phone.
 */
function buildRange(page: number, totalPages: number, siblings: number): (number | 'gap')[] {
  // 1, siblings either side, current, first and last, and two gap slots.
  const slots = siblings * 2 + 5;
  if (totalPages <= slots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, totalPages);
  const showLeftGap = left > 2;
  const showRightGap = right < totalPages - 1;

  const middle = Array.from({ length: right - left + 1 }, (_, i) => left + i).filter(
    (n) => n !== 1 && n !== totalPages,
  );

  return [
    1,
    ...(showLeftGap ? (['gap'] as const) : []),
    ...middle,
    ...(showRightGap ? (['gap'] as const) : []),
    totalPages,
  ];
}

const item =
  'text-btn grid size-11 shrink-0 place-items-center rounded-sm transition-colors duration-200';
const arrow = `${item} hover:bg-surface-100 disabled:pointer-events-none disabled:opacity-40`;

/**
 * Numbered pagination, with a compact form on small screens.
 *
 * The full range needs nine 44px targets plus gaps — about 428px — which does
 * not fit a 320px phone. Rather than shrinking the targets below the 44px
 * minimum, narrow screens get "Page 7 of 162" between the arrows. Both forms
 * are rendered and swapped with CSS, so there is no media-query flash.
 */
export function Pagination({
  page,
  totalPages,
  onChange,
  siblings = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = buildRange(page, totalPages, siblings);

  const prev = (
    <button
      type="button"
      onClick={() => onChange(page - 1)}
      disabled={page === 1}
      className={arrow}
    >
      <ChevronLeft className="size-5" aria-hidden="true" />
      <span className="sr-only">Previous page</span>
    </button>
  );

  const next = (
    <button
      type="button"
      onClick={() => onChange(page + 1)}
      disabled={page === totalPages}
      className={arrow}
    >
      <ChevronRight className="size-5" aria-hidden="true" />
      <span className="sr-only">Next page</span>
    </button>
  );

  return (
    <nav aria-label="Pagination" className={className}>
      {/* Compact — below 480px */}
      <div className="flex items-center justify-center gap-2 sm:hidden">
        {prev}
        <span aria-current="page" className="text-body px-2 font-semibold">
          Page {page}{' '}
          <span className="text-surface-600 font-normal">of {totalPages}</span>
        </span>
        {next}
      </div>

      {/* Full range — 480px and up */}
      <div className="hidden items-center justify-center gap-1 sm:flex">
        {prev}
        {range.map((entry, i) =>
          entry === 'gap' ? (
            <span
              key={`gap-${i}`}
              className="text-surface-600 grid size-11 place-items-center"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => onChange(entry)}
              aria-current={entry === page ? 'page' : undefined}
              aria-label={`Page ${entry}`}
              className={cn(
                item,
                entry === page
                  ? 'bg-secondary-700 text-surface font-semibold'
                  : 'hover:bg-surface-100',
              )}
            >
              {entry}
            </button>
          ),
        )}
        {next}
      </div>
    </nav>
  );
}
