import { ArrowRight } from 'lucide-react';

import { SIZES, photo } from '@/config/images';
import { brand } from '@/config/brand';
import { AspectImage, Button, Container, Heading } from '@/ui';

/**
 * The luxury sub-brand band.
 * Clean, editorial, and matching the light aesthetic of the rest of the site.
 */
export function LuxePromo() {
  return (
    <section className="bg-surface-50 border-y border-surface-200">
      <Container className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-12 lg:py-20">
        <div>
          <p className="text-eyebrow text-primary-600 uppercase tracking-wider font-semibold">{brand.name} Luxe</p>
          <Heading as="h2" level="h2" className="mt-3">
            When the catalogue is the starting point, not the answer.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-4 max-w-prose">
            A dedicated principal designer, materials sourced to the project, and
            drawings made for your home rather than adapted to it. Typically from
            ₹25 L.
          </p>
          <Button
            to="/luxe"
            size="lg"
            className="mt-7"
            iconRight={<ArrowRight className="size-4" />}
          >
            Enter the world of Luxe
          </Button>
        </div>

        <AspectImage
          {...photo('luxe1', 'landscape', 1080)}
          sizes={SIZES.half}
          alt="Aangan Luxe Interior Craftsmanship"
          ratio="landscape"
          className="rounded-xl border border-surface-200 shadow-e2"
        />
      </Container>
    </section>
  );
}
