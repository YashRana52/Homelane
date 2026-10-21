import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router';

import { studios } from '@/data/proof';
import { slugify } from '@/lib/slugify';
import { formatIndianNumber } from '@/lib/formatINR';
import { Badge, Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * The five experience centres, plus an honest "more on the way".
 *
 * Studios are listed with their floor area because the question people
 * actually have is whether it is a real showroom with working drawers or a
 * desk in an office.
 */
export function ExperienceCentres() {
  return (
    <Section pad="lg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <Eyebrow>Come and see</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2">
            Open the drawers before you buy them.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3">
            Full kitchens, wardrobes and finishes, built out at full size.
          </p>
        </div>
        <Button
          to="/store-locator"
          variant="link"
          iconRight={<ArrowRight className="size-4" />}
          className="shrink-0"
        >
          All studios
        </Button>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio, i) => (
          <Reveal as="li" key={studio.id} delay={i * 0.05} className="h-full">
            <Link
              to={`/interiors/${slugify(studio.city)}`}
              className="group card-lift border-surface-200 hover:border-primary-500 flex h-full items-start gap-4 rounded-md border p-5"
            >
              <span className="bg-primary-50 text-primary-600 grid size-10 shrink-0 place-items-center rounded-full">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="text-h4 font-display group-hover:text-primary-600 block transition-colors">
                  {studio.city}
                </span>
                <span className="text-caption text-surface-600 block">{studio.area}</span>
                <span className="text-caption text-surface-600 mt-1 block">
                  {formatIndianNumber(studio.size)} sq ft studio
                </span>
              </span>
            </Link>
          </Reveal>
        ))}

        <li className="border-surface-200 flex items-center justify-center rounded-md border border-dashed p-5">
          <span className="text-center">
            <Badge tone="neutral">More on the way</Badge>
            <span className="text-caption text-surface-600 mt-2 block">
              Six more studios opening this year
            </span>
          </span>
        </li>
      </ul>
    </Section>
  );
}
