import { ArrowRight, Compass, Globe2, Gift } from 'lucide-react';

import { SIZES, photo } from '@/config/images';
import { formatINR } from '@/lib/formatINR';
import { AspectImage, Button, Container, Eyebrow, Heading, Section } from '@/ui';

/**
 * Referral programme.
 *
 * The amount is the whole message, so it is the largest thing in the band.
 */
export function ReferralBanner() {
  return (
    <section className="bg-mustard-light">
      <Container className="flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-start gap-4">
          <span className="bg-secondary-900/10 text-secondary-900 grid size-12 shrink-0 place-items-center rounded-full">
            <Gift className="size-6" aria-hidden="true" />
          </span>
          <div>
            <Heading as="h2" level="h3" className="text-secondary-900">
              Liked it? Earn {formatINR(10_000)} for telling a friend.
            </Heading>
            <p className="text-body text-secondary-700/80 mt-1.5 max-w-prose">
              Paid out when their project is booked — not when they merely enquire.
            </p>
          </div>
        </div>

        <Button
          to="/refer"
          variant="secondary"
          className="shrink-0 max-md:w-full"
          iconRight={<ArrowRight className="size-4" />}
        >
          Refer now
        </Button>
      </Container>
    </section>
  );
}

/**
 * NRI section — a split band, image on one side.
 *
 * The objection being answered is specific: can this be run from another
 * country without a relative having to supervise it.
 */
export function NriSection() {
  return (
    <Section pad="lg" bg="muted">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <span className="bg-primary-50 text-primary-600 grid size-11 place-items-center rounded-full">
            <Globe2 className="size-5" aria-hidden="true" />
          </span>
          <Eyebrow className="mt-4">From anywhere</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2">
            Setting up a home in India from abroad.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3 max-w-prose">
            Video design sessions in your timezone, a named project manager on
            site, twice-weekly walkthrough videos, and international payments
            handled properly. No relative has to take time off work.
          </p>
          <Button to="/nri" size="lg" className="mt-7" iconRight={<ArrowRight className="size-4" />}>
            How it works for NRIs
          </Button>
        </div>

        <AspectImage
          {...photo('heroGallery', 'landscape', 1080)}
          sizes={SIZES.half}
          alt=""
          ratio="landscape"
          className="rounded-lg"
        />
      </div>
    </Section>
  );
}

/** Vastu tool promo. */
export function VastuPromo() {
  return (
    <section className="bg-secondary-700">
      <Container className="flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-start gap-4">
          <span className="bg-surface/10 text-surface grid size-12 shrink-0 place-items-center rounded-full">
            <Compass className="size-6" aria-hidden="true" />
          </span>
          <div>
            <Heading as="h2" level="h3" className="text-surface">
              VastuSense
            </Heading>
            <p className="text-body text-surface/75 mt-1.5 max-w-prose">
              Room-by-room Vastu analysis of your floor plan, with what to change
              and what genuinely does not matter.
            </p>
          </div>
        </div>

        <Button
          to="/vastu"
          variant="onImage"
          className="shrink-0 max-md:w-full"
          iconRight={<ArrowRight className="size-4" />}
        >
          Analyse my home
        </Button>
      </Container>
    </section>
  );
}
