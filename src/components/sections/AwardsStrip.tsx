import { Trophy } from 'lucide-react';

import { awards } from '@/data/proof';
import { Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * Five awards.
 *
 * Each one names its issuer and year. An award without those is just a shape,
 * and a trophy cabinet of unattributed badges is the oldest trust-washing
 * pattern on the web.
 */
export function AwardsStrip() {
  return (
    <Section pad="lg">
      <Eyebrow>Recognition</Eyebrow>
      <Heading as="h2" level="h2" className="mt-2 max-w-[20ch]">
        The trophy cabinet.
      </Heading>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {awards.map((award, i) => (
          <Reveal as="li" key={award.id} delay={i * 0.05} className="h-full">
            <div className="border-surface-200 flex h-full flex-col rounded-md border p-5">
              <Trophy className="text-primary-600 size-6 shrink-0" aria-hidden="true" />
              <p className="text-h4 font-display mt-3 flex-1">{award.title}</p>
              <p className="text-caption text-surface-600 mt-2">
                {award.issuer} · {award.year}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
