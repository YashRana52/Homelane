import { ArrowRight, Crown, Diamond, ShieldCheck, Sparkles } from 'lucide-react';

import { LeadForm } from '@/components/funnel/LeadForm';
import { photo, SIZES } from '@/config/images';
import { AspectImage, Breadcrumb, Container } from '@/ui';

const luxeProjects = [
  {
    title: 'The Skyline Penthouse',
    location: 'Worli Sea Face, Mumbai',
    type: '5,400 sq ft Penthouse',
    photo: 'project1' as const,
    highlights: 'Bookmatched Statuario Marble · Bespoke Walnut Joinery · Bang & Olufsen Automation',
  },
  {
    title: 'Contemporary Villa One',
    location: 'Jubilee Hills, Hyderabad',
    type: '7,800 sq ft Independent Villa',
    photo: 'heroGallery' as const,
    highlights: 'Double-height Fluted Panelling · Italian Poliform Wardrobes · Minimalist Pivot Doors',
  },
  {
    title: 'The Orchard Estate',
    location: 'Sadashivanagar, Bengaluru',
    type: '4,200 sq ft Luxury Residence',
    photo: 'project2' as const,
    highlights: 'Custom Champagne Brass Accents · Hand-scraped Oak Flooring · Wine Cellar',
  },
];

export default function LuxeLanding() {
  return (
    <div data-theme="luxe" className="min-h-screen bg-surface text-surface-900 transition-colors duration-500">
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Aangan Luxe' }]} className="text-surface-600" />
      </Container>

      {/* Editorial Full-Bleed Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Ambient atmospheric champagne glow */}
        <div className="pointer-events-none absolute -top-40 right-1/4 size-[600px] rounded-full bg-gold-600/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 size-[400px] rounded-full bg-gold-800/10 blur-[120px]" />

        <div className="absolute inset-0 z-0 opacity-20">
          <AspectImage
            {...photo('heroGallery', 'landscape', 1920)}
            sizes="100vw"
            alt="Luxe Interiors"
            ratio="landscape"
            className="h-full w-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-600/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 shadow-sm shadow-gold-600/10">
              <Crown className="size-3.5 text-gold-400" /> High Architectural Tier
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-surface-900 leading-[1.1]">
              The Art of <span className="italic font-normal bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 bg-clip-text text-transparent">Bespoke</span> Living.
            </h1>

            <p className="text-lg sm:text-xl font-light text-surface-600 leading-relaxed max-w-2xl">
              Curated for discerning homeowners who seek architectural distinction, rare materials, and uncompromising craftsmanship. Handled exclusively by our Principal Design Council.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#luxe-enquiry"
                className="inline-flex items-center gap-2.5 rounded-sm bg-gradient-to-r from-gold-600 to-[#c5995e] px-7 py-3.5 text-sm font-semibold text-on-gold shadow-lg shadow-gold-600/20 transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-gold-600/30 active:scale-[0.99]"
              >
                <span>Request Private Consultation</span>
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#luxe-portfolio"
                className="inline-flex items-center gap-2 rounded-sm border border-gold-400/30 bg-surface-50/40 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-gold-400 transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-600/10 hover:text-gold-200"
              >
                Explore Curated Residences
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars of Luxe */}
      <section className="border-y border-gold-400/15 bg-surface-50 py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="grid size-12 place-items-center rounded-sm border border-gold-400/25 bg-gold-600/10 text-gold-400 shadow-sm">
                <Diamond className="size-6" />
              </div>
              <h2 className="font-display text-xl font-medium text-surface-900">Rare Material Sourcing</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Direct quarry-sourced Italian Statuario, natural smoked timber veneers, and architectural bronze metalwork curated globally.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid size-12 place-items-center rounded-sm border border-gold-400/25 bg-gold-600/10 text-gold-400 shadow-sm">
                <Sparkles className="size-6" />
              </div>
              <h2 className="font-display text-xl font-medium text-surface-900">Principal Architect Lead</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Every Luxe project is personally spearheaded by an award-winning Principal Architect and dedicated site concierge team.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid size-12 place-items-center rounded-sm border border-gold-400/25 bg-gold-600/10 text-gold-400 shadow-sm">
                <ShieldCheck className="size-6" />
              </div>
              <h2 className="font-display text-xl font-medium text-surface-900">White-Glove Turnkey</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                From structural revisions and automated climate acoustic control to custom art curation, fully delivered without compromise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Showcase */}
      <section id="luxe-portfolio" className="py-24">
        <Container>
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold block">
              Curated Residences
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-surface-900 mt-2">
              Spaces Designed to Outlast Trends
            </h2>
          </div>

          <div className="space-y-16">
            {luxeProjects.map((proj, idx) => (
              <div
                key={idx}
                className="grid gap-8 lg:grid-cols-2 items-center rounded-lg border border-gold-400/15 bg-surface-50/90 backdrop-blur-sm p-6 sm:p-10 shadow-xl transition-all duration-300 hover:border-gold-400/30 hover:shadow-2xl"
              >
                <div className={`overflow-hidden rounded-md border border-gold-400/20 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <AspectImage
                    {...photo(proj.photo, 'landscape', 1280)}
                    sizes={SIZES.hero}
                    alt={proj.title}
                    ratio="landscape"
                    className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                    {proj.location} · {proj.type}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-surface-900">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-surface-600 leading-relaxed border-t border-gold-400/15 pt-4">
                    {proj.highlights}
                  </p>
                  <div className="pt-2">
                    <a
                      href="#luxe-enquiry"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-colors duration-200 hover:text-gold-200"
                    >
                      <span>Commission a Similar Brief</span>
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bespoke Enquiry Form */}
      <section id="luxe-enquiry" className="border-t border-gold-400/15 bg-surface-50 py-24">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold block">
              Private Commission
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-surface-900 mt-2">
              Initiate Your Luxe Consultation
            </h2>
            <p className="text-sm text-surface-600 mt-2 max-w-lg mx-auto">
              Share details about your upcoming property. A Principal Consultant will reach out within one business day.
            </p>
          </div>

          <div className="relative rounded-xl border border-gold-400/20 bg-surface p-8 sm:p-10 shadow-2xl overflow-hidden">
            {/* Elegant champagne hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
            <LeadForm
              source="luxe:bespoke-enquiry"
              submitLabel="Request Private Design Consultation"
              compact={false}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
