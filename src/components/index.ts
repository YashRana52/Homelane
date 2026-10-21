/**
 * Composed blocks. These may use `@/ui` primitives and `@/data`, but never
 * import from `@/pages` — the dependency runs one way only.
 */

export { DesignCard } from './cards/DesignCard';
export { ProjectCard } from './cards/ProjectCard';
export { RoomTile } from './cards/RoomTile';
export { ServiceCard } from './cards/ServiceCard';
export { TestimonialCard } from './cards/TestimonialCard';

export { HeroBanner, type HeroTrustItem } from './hero/HeroBanner';
export { PromoBanner, type PromoTone } from './hero/PromoBanner';

export { AwardsStrip } from './sections/AwardsStrip';
export { CityLinkGrid } from './sections/CityLinkGrid';
export { ClosingCTA, SeoBlock } from './sections/ClosingCTA';
export { ComparisonTable } from './sections/ComparisonTable';
export { DesignScroller } from './sections/DesignScroller';
export { DesignSessionSteps } from './sections/DesignSessionSteps';
export { EstimatePromo } from './sections/EstimatePromo';
export { ExperienceCentres } from './sections/ExperienceCentres';
export { FaqSection } from './sections/FaqSection';
export { LogoStrip } from './sections/LogoStrip';
export { LuxePromo } from './sections/LuxePromo';
export { MagazinePreview } from './sections/MagazinePreview';
export { ProcessStepper } from './sections/ProcessStepper';
export { ProjectShowcase } from './sections/ProjectShowcase';
export { NriSection, ReferralBanner, VastuPromo } from './sections/ReferralNriVastu';
export { RoomTileGrid } from './sections/RoomTileGrid';
export { ServiceGrid } from './sections/ServiceGrid';
export { SolutionGrid } from './sections/SolutionGrid';
export { StatsStrip } from './sections/StatsStrip';
export { TestimonialCarousel } from './sections/TestimonialCarousel';
export { TrustBar } from './sections/TrustBar';

export {
  CalculatorWizard,
  EstimateFlow,
  EstimateResult,
  LayoutPlan,
  LeadForm,
  LeadModalProvider,
  useLeadModal,
  MaterialSwatch,
  OptionCardGroup,
  PackageSelector,
  WizardChrome,
} from './funnel';
