import { Calculator, ShieldCheck, Timer, Wallet } from 'lucide-react';

import {
  AwardsStrip,
  CityLinkGrid,
  ClosingCTA,
  DesignScroller,
  DesignSessionSteps,
  EstimatePromo,
  ExperienceCentres,
  FaqSection,
  HeroBanner,
  LogoStrip,
  LuxePromo,
  MagazinePreview,
  NriSection,
  ProcessStepper,
  ProjectShowcase,
  PromoBanner,
  ReferralBanner,
  RoomTileGrid,
  SeoBlock,
  ServiceGrid,
  SolutionGrid,
  StatsStrip,
  TestimonialCarousel,
  TrustBar,
  VastuPromo,
} from '@/components';
import { trustStats } from '@/config/brand';
import { partnerNames, pressNames } from '@/data/proof';
import { Section } from '@/ui';

/**
 * Homepage.
 *
 * The order is the argument the page is making: what you get, who we are,
 * what it looks like, what it costs, how it is delivered, who says it worked,
 * and finally the ask. Proof sections are interleaved with the sell rather
 * than stacked at the end, so nothing is asked for before something has been
 * shown.
 */
export default function Home() {
  return (
    <>
      {/* ---- The offer ---- */}
      <HeroBanner
        photo="heroHome"
        badge={`${trustStats.deliveryDays}-day delivery guarantee`}
        title={
          <>
            Interiors you&apos;ll love.
            <br />
            Without the stress.
          </>
        }
        subtitle="Modular kitchens, wardrobes and full-home design — drawn, built and installed by one team, for a price agreed up front."
        primary={{ label: 'Get Free Estimate', to: '/estimate' }}
        secondary={{ label: 'Browse design ideas', to: '/design-ideas' }}
        trust={[
          { icon: ShieldCheck, label: `${trustStats.warrantyYears}-year warranty` },
          { icon: Wallet, label: 'No hidden costs' },
          { icon: Timer, label: `${trustStats.qualityChecks} quality checks` },
        ]}
      />

      <StatsStrip />
      <ServiceGrid />

      <PromoBanner
        tone="soft"
        icon={Calculator}
        title="Want to know what your kitchen will cost?"
        subtitle="Pick a layout and a finish — the estimate takes about a minute."
        cta={{ label: 'Calculate now', to: '/price-calculator/kitchen' }}
      />

      {/* ---- What it looks like ---- */}
      <RoomTileGrid />

      <DesignScroller
        category="modular-kitchen"
        eyebrow="Modular kitchens"
        title="Kitchens built around how you cook."
        seeAllTo="/design-ideas/modular-kitchen"
        bg="muted"
      />

      <DesignScroller
        category="living-room"
        eyebrow="Living rooms"
        title="The room everyone sees first."
        seeAllTo="/design-ideas/living-room"
      />

      <LuxePromo />

      <DesignScroller
        category="wardrobe"
        eyebrow="Wardrobes & storage"
        title="Storage that fits the wall you actually have."
        seeAllTo="/design-ideas/wardrobe"
      />

      <ProjectShowcase />

      {/* ---- What it costs, and how it is delivered ---- */}
      <EstimatePromo />
      <SolutionGrid />
      <DesignSessionSteps />
      <ProcessStepper />

      {/* ---- Who says it worked ---- */}
      <TrustBar />
      <TestimonialCarousel />
      <AwardsStrip />

      <LogoStrip title="In the news" names={pressNames} />
      <LogoStrip title="We build with" names={partnerNames} marquee />

      <ExperienceCentres />
      <NriSection />
      <VastuPromo />
      <MagazinePreview />
      <ReferralBanner />

      {/* ---- The ask ---- */}
      <FaqSection />
      <ClosingCTA />
      <CityLinkGrid />

      <Section pad="md">
        <SeoBlock />
      </Section>
    </>
  );
}
