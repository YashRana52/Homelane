import { stats } from '@/data/stats';
import { cn } from '@/lib/cn';
import { Section } from '@/ui';

type StatsStripProps = {
  className?: string;
};

/**
 * The eight-item proof strip under the hero.
 *
 * 2 × 4 on a phone, 4 × 2 on a tablet, one row of eight from `lg` — the counts
 * are chosen so the grid never leaves an orphan on a half-empty last row.
 *
 * Footnote markers are `aria-hidden` and paired with visually hidden text,
 * because a screen reader reading "45 days superscript two" is noise; the
 * qualifying sentence it points at lives in the footer.
 */
export function StatsStrip({ className }: StatsStripProps) {
  return (
    <Section bg="muted" pad="sm" className={className}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-8">
        {stats.map(({ id, icon: Icon, value, label, footnote }) => (
          <li key={id} className="flex flex-col items-start gap-1.5 lg:items-center lg:text-center">
            <Icon className="text-primary-500 size-5 shrink-0" aria-hidden="true" />
            <p className={cn('text-h4 font-display leading-tight')}>
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
            <p className="text-caption text-surface-600">{label}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
