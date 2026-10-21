import { Link } from 'react-router';

import { solutions } from '@/data/solutions';
import { Eyebrow, Heading, Section } from '@/ui';

/**
 * The fifteen scopes, as an icon grid.
 *
 * 2 → 3 → 5 columns. Five at `lg` divides fifteen into exactly three rows, so
 * the grid never ends with an orphan; three columns does the same on a tablet.
 */
export function SolutionGrid() {
  return (
    <Section pad="lg">
      <Eyebrow>End to end</Eyebrow>
      <Heading as="h2" level="h2" className="mt-2 max-w-[22ch]">
        Everything your home needs, under one contract.
      </Heading>
      <p className="text-body text-surface-600 mt-3 max-w-prose">
        No second contractor, no gaps between trades, no arguments about whose
        job the ceiling was.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {solutions.map(({ id, label, to, icon: Icon }) => (
          <li key={id}>
            <Link
              to={to}
              className="group card-lift border-surface-200 hover:border-primary-500 hover:bg-primary-50 flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border p-4 text-center"
            >
              <Icon
                className="text-primary-600 size-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="text-caption font-semibold">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
