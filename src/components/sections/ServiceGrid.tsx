import { ArrowRight } from 'lucide-react';

import { ServiceCard } from '@/components/cards/ServiceCard';
import { services } from '@/data/services';
import { Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * The five service cards.
 *
 * 1 → 2 → 3 → 5 columns. Five across only at `xl`, where there is room for
 * each card to keep a readable title; below that they fall to three and the
 * last two wrap, which is fine because the order is by demand.
 */
export function ServiceGrid() {
  return (
    <Section pad="lg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>What we do</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2 max-w-[18ch]">
            One team, from first sketch to handover.
          </Heading>
        </div>
        <Button
          to="/offerings/full-home"
          variant="link"
          iconRight={<ArrowRight className="size-4" />}
          className="shrink-0"
        >
          Compare everything
        </Button>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service, i) => (
          <Reveal as="li" key={service.id} delay={Math.min(i * 0.06, 0.3)} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>

      <p className="text-caption text-surface-600 mt-5">
        * Starting prices are for modular scopes in a new home, and exclude civil work.
      </p>
    </Section>
  );
}
