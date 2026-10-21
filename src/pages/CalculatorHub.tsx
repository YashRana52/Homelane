import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

import { PackageSelector } from '@/components/funnel/PackageSelector';
import { SIZES, photo } from '@/config/images';
import { calculators } from '@/data/calculators';
import { formatLakh } from '@/lib/formatINR';
import { AspectImage, Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

const order = ['full-home', 'kitchen', 'wardrobe'] as const;

export default function CalculatorHub() {
  const navigate = useNavigate();
  return (
    <Section pad="lg">
      <div className="max-w-2xl">
        <Eyebrow>Plan the budget</Eyebrow>
        <Heading as="h1" level="display" className="mt-2">
          What will it actually cost?
        </Heading>
        <p className="text-body-lg text-surface-600 mt-4">
          Three calculators, no phone number until you want the detailed quote.
          Each one ends with a costed range and a breakdown you can argue with.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {order.map((key, i) => {
          const config = calculators[key];
          const cheapest = Math.min(...config.materials.map((m) => m.rate));
          const from =
            key === 'full-home'
              ? cheapest * (config.layouts[0]?.defaults.primary ?? 550)
              : cheapest * (config.layouts[0]?.defaults.primary ?? 8);

          return (
            <Reveal as="li" key={key} delay={i * 0.06} className="h-full">
              <div className="border-surface-200 bg-surface flex h-full flex-col overflow-hidden rounded-md border">
                <AspectImage
                  {...photo(config.photo, 'landscape', 1080)}
                  sizes={SIZES.card}
                  alt=""
                  ratio="landscape"
                />

                <div className="flex flex-1 flex-col p-6">
                  <Heading as="h2" level="h3">
                    {config.title.replace(' Calculator', '')}
                  </Heading>
                  <p className="text-body text-surface-600 mt-2 flex-1">{config.intro}</p>

                  <p className="text-caption text-surface-600 mt-4 flex items-center gap-3">
                    <span>
                      From{' '}
                      <span className="text-body text-secondary-700 font-semibold">
                        {formatLakh(from)}
                      </span>
                      <span aria-hidden="true">*</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {config.minutes} min
                    </span>
                  </p>

                  <Button
                    to={`/price-calculator/${key}`}
                    className="mt-5"
                    fullWidth
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <p className="text-caption text-surface-600 mt-6">
        * Starting figures for the smallest configuration in the entry
        specification. The calculator gives a range for what you actually want.
      </p>

      {/* Package comparison tier section */}
      <div className="mt-16 border-t border-surface-200 pt-12">
        <div className="max-w-2xl">
          <Eyebrow>Specification Tiers</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2">
            Compare Our Interior Packages
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3">
            Choose a pre-bundled specification tier with verified materials and hardware, or build your own custom setup from scratch.
          </p>
        </div>

        <div className="mt-8">
          <PackageSelector
            packages={calculators.kitchen.packages}
            selectedId="premium"
            onSelect={(pkgId) => {
              navigate(`/price-calculator/kitchen?package=${pkgId}`);
            }}
          />
        </div>
      </div>
    </Section>
  );
}
