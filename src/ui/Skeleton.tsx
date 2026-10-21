import { cn } from '@/lib/cn';

const shimmer =
  'animate-shimmer bg-[linear-gradient(90deg,var(--c-surface-100)_25%,var(--c-surface-200)_37%,var(--c-surface-100)_63%)] bg-[length:400%_100%]';

type SkeletonProps = {
  className?: string;
};

/** A single shimmering block. Size it with className. */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn('rounded-xs', shimmer, className)} />;
}

/**
 * A run of text lines. The last line is short, which is what makes a loading
 * block read as a paragraph rather than a grey rectangle.
 */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn('h-3.5', i === lines - 1 ? 'w-3/5' : 'w-full')} />
      ))}
    </div>
  );
}

/**
 * Stand-in for a DesignCard. The proportions match the real card so the layout
 * does not shift when content arrives.
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('space-y-3', className)}>
      <Skeleton className="rounded-md aspect-4/3 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="rounded-sm h-9 flex-1" />
        <Skeleton className="rounded-sm h-9 flex-1" />
      </div>
    </div>
  );
}
