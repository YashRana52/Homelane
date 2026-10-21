import { ArrowRight, Headphones, ShieldCheck, Timer, Users } from 'lucide-react';

import { brand, trustStats } from '@/config/brand';
import { formatStat } from '@/lib/formatINR';
import { Button, Container, Heading } from '@/ui';

const features = [
  { icon: ShieldCheck, label: `Flat ${trustStats.warrantyYears}-year warranty` },
  { icon: Timer, label: `${trustStats.deliveryDays}-day delivery` },
  { icon: Users, label: `${formatStat(trustStats.designers)} design experts` },
  { icon: Headphones, label: 'Post-installation service' },
] as const;

/**
 * The last ask on the page.
 *
 * Named after the state the visitor is actually in by this point — they have
 * scrolled nine thousand pixels of options and are deciding, not browsing — so
 * the offer is a person to talk to rather than another catalogue.
 */
export function ClosingCTA() {
  return (
    <section className="bg-secondary-700 text-surface">
      <Container className="py-14 text-center lg:py-20">
        <Heading as="h2" level="display" className="mx-auto max-w-[18ch] text-surface">
          Confused between styles, layouts and costs?
        </Heading>
        <p className="text-body-lg text-surface/80 mx-auto mt-4 max-w-prose">
          Meet a designer who will bring it all together — free, with no
          obligation to book anything afterwards.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/estimate" size="lg" iconRight={<ArrowRight className="size-4" />}>
            Meet a designer
          </Button>
          <Button href={brand.phoneHref} size="lg" variant="onImage">
            Call {brand.phone}
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2">
              <Icon className="text-primary-300 size-6" aria-hidden="true" />
              <span className="text-caption text-surface/85">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Long-form copy for the footer.
 *
 * Capped at 72 characters per line. Search engines want the words; a human who
 * reaches this far wants to be able to read them, and a 1,280px line of body
 * text is unreadable.
 */
export function SeoBlock() {
  return (
    <div className="space-y-4">
      <Heading as="h2" level="h3">
        Home interior design with {brand.fullName}
      </Heading>
      <div className="text-body text-surface-600 max-w-prose space-y-3">
        <p>
          {brand.fullName} designs, builds and installs home interiors across{' '}
          {trustStats.cities}+ Indian cities — modular kitchens, wardrobes and
          storage, full-home turnkey projects, and renovations of homes already
          lived in. Every project is drawn to your floor plan by an in-house
          designer, manufactured to that drawing, and installed by our own
          fitting teams rather than subcontracted out.
        </p>
        <p>
          Modular scopes carry a {trustStats.deliveryDays}-day delivery
          guarantee from final design sign-off and a flat{' '}
          {trustStats.warrantyYears}-year warranty on woodwork and hardware.
          Pricing is itemised before you book, with payments split across four
          milestones, so the figure you sign is the figure you pay.
        </p>
        <p>
          Not sure where to start? The price calculators give a realistic range
          in about two minutes without a phone call, and the free design session
          ends with 3D views of your own rooms and a quote you can take away.
        </p>
      </div>
    </div>
  );
}
