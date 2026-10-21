import { ArrowRight } from 'lucide-react';

import { DesignCard } from '@/components/cards/DesignCard';
import { designsByCategory, type DesignCategory } from '@/data/designs';
import { Button, Carousel, Eyebrow, Heading, Section, type SectionBg } from '@/ui';

type DesignScrollerProps = {
  category: DesignCategory;
  eyebrow: string;
  title: string;
  /** Destination for the "See all" link. */
  seeAllTo: string;
  bg?: SectionBg;
};

/**
 * One horizontal row of catalogue designs.
 *
 * `container={false}` on the Section matters: the Carousel bleeds to the
 * viewport edge on mobile so the next slide peeks past the gutter, which is
 * what signals the row scrolls. The heading keeps its own Container so it
 * stays aligned with every other section on the page.
 */
export function DesignScroller({
  category,
  eyebrow,
  title,
  seeAllTo,
  bg = 'none',
}: DesignScrollerProps) {
  const items = designsByCategory(category);

  return (
    <Section pad="lg" bg={bg} container={false}>
      <div className="site-container flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2 max-w-[18ch]">
            {title}
          </Heading>
        </div>
        <Button
          to={seeAllTo}
          variant="link"
          iconRight={<ArrowRight className="size-4" />}
          className="shrink-0"
        >
          See all {items.length > 0 ? `${items.length}+` : ''} designs
        </Button>
      </div>

      <div className="site-container mt-8">
        <Carousel label={title} perView="card">
          {items.map((design) => (
            <DesignCard key={design.id} design={design} className="h-full" />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
