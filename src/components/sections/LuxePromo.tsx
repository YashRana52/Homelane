import { ArrowRight } from 'lucide-react';

import { SIZES, photo } from '@/config/images';
import { brand } from '@/config/brand';
import { AspectImage, Button, Container, Heading } from '@/ui';

/**
 * The luxury sub-brand band.
 *
 * Wrapped in `data-theme="luxe"`, which re-points every colour token to the
 * dark-and-gold palette. Because theme.css maps colours with `@theme inline`,
 * the Button inside turns gold without being told to — the same markup that is
 * coral everywhere else on the page.
 */
export function LuxePromo() {
  return (
    <section data-theme="luxe" className="bg-surface">
      <Container className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-12 lg:py-20">
        <div>
          <p className="text-eyebrow text-gold-400 uppercase tracking-[0.2em] font-semibold">{brand.name} Luxe</p>
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
          alt=""
          ratio="landscape"
          className="rounded-lg"
        />
      </Container>
    </section>
  );
}
