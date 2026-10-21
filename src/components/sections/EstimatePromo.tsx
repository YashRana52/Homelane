import { ArrowRight, ChefHat, Home, Shirt } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { formatLakh } from '@/lib/formatINR';
import { Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

type Estimator = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  from: number;
  /** Rough time to complete the wizard, which is the real objection. */
  minutes: number;
};

const estimators: readonly Estimator[] = [
  {
    id: 'full-home',
    icon: Home,
    title: 'Full Home Interiors',
    description: 'Room by room, including civil work and finishes.',
    to: '/price-calculator/full-home',
    from: 357_000,
    minutes: 3,
  },
  {
    id: 'kitchen',
    icon: ChefHat,
    title: 'Modular Kitchen',
    description: 'Layout, size, finish, accessories and appliances.',
    to: '/price-calculator/kitchen',
    from: 149_000,
    minutes: 2,
  },
  {
    id: 'wardrobe',
    icon: Shirt,
    title: 'Wardrobe',
    description: 'Sliding, hinged or walk-in, with internal organisers.',
    to: '/price-calculator/wardrobe',
    from: 96_000,
    minutes: 2,
  },
];

/**
 * Three calculators, as cards.
 *
 * Each card leads with what the thing starts at and how long the estimate
 * takes. Those are the two questions that stop people starting a calculator —
 * "will this be out of my range" and "how long is this going to take" — so
 * they are answered before the click, not after.
 */
export function EstimatePromo() {
  return (
    <Section pad="lg" bg="muted">
      <div className="max-w-2xl">
        <Eyebrow>Plan the budget</Eyebrow>
        <Heading as="h2" level="h2" className="mt-2">
          Get an estimate for your home.
        </Heading>
        <p className="text-body-lg text-surface-600 mt-3">
          No site visit needed, and no phone number until you want the detailed
          quote.
        </p>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {estimators.map((estimator, i) => {
          const { icon: Icon } = estimator;
          return (
            <Reveal as="li" key={estimator.id} delay={i * 0.06} className="h-full">
              <div className="bg-surface border-surface-200 flex h-full flex-col rounded-md border p-6">
                <span className="bg-primary-50 text-primary-600 grid size-11 place-items-center rounded-full">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <Heading as="h3" level="h3" className="mt-4">
                  {estimator.title}
                </Heading>
                <p className="text-body text-surface-600 mt-1.5 flex-1">
                  {estimator.description}
                </p>

                <p className="text-caption text-surface-600 mt-4">
                  Starts at{' '}
                  <span className="text-body text-secondary-700 font-semibold">
                    {formatLakh(estimator.from)}
                  </span>
                  <span aria-hidden="true">*</span> · about {estimator.minutes} min
                </p>

                <Button
                  to={estimator.to}
                  className="mt-4"
                  fullWidth
                  iconRight={<ArrowRight className="size-4" />}
                >
                  Calculate now
                </Button>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
