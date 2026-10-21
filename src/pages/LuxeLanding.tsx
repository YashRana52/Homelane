import { ArrowRight, Crown, Diamond, ShieldCheck, Sparkles } from 'lucide-react';

import { LeadForm } from '@/components/funnel/LeadForm';
import { photo, SIZES } from '@/config/images';
import { AspectImage, Breadcrumb, Button, Container } from '@/ui';

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
    <div className="min-h-screen bg-surface text-secondary-700">
      <div className="border-b border-surface-200 bg-surface">
        <Container className="py-3">
          <Breadcrumb items={[{ label: 'Aangan Luxe' }]} />
        </Container>
      </div>

      {/* Hero Section — Clean, Professional, Editorial */}
      <section className="relative overflow-hidden bg-surface py-14 sm:py-20 border-b border-surface-200">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              <Crown className="size-3.5 text-primary-600" />
              <span>Architectural Tier</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-secondary-700 leading-[1.15]">
              The Art of <span className="text-primary-600">Bespoke</span> Living.
            </h1>

            <p className="text-body-lg text-surface-600 leading-relaxed max-w-xl">
              Curated for discerning homeowners who seek architectural distinction, rare materials, and uncompromising craftsmanship. Handled exclusively by our Principal Design Council.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                to="#luxe-enquiry"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="size-4" />}
              >
                Request Consultation
              </Button>
              <Button
                to="#luxe-portfolio"
                variant="outline"
                size="lg"
              >
                Explore Residences
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-surface-200">
              <div>
                <p className="font-display text-2xl font-bold text-secondary-700">100%</p>
                <p className="text-caption text-surface-600 mt-0.5">Bespoke Drawings</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-secondary-700">1-on-1</p>
                <p className="text-caption text-surface-600 mt-0.5">Principal Architect</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-secondary-700">₹25L+</p>
                <p className="text-caption text-surface-600 mt-0.5">Typical Project Size</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-surface-200 shadow-e3">
              <AspectImage
                {...photo('heroGallery', 'portrait', 1080)}
                sizes={SIZES.half}
                alt="Aangan Luxe Interior Design"
                ratio="portrait"
                className="w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Worli Residence</p>
                <p className="font-display text-lg font-medium text-white">Bookmatched Italian Marble & Smoked Oak</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars of Luxe — Clean Light 3-Grid */}
      <section className="bg-surface-50 py-16 border-b border-surface-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-eyebrow text-primary-600 uppercase tracking-wider">The Luxe Standard</p>
            <h2 className="font-display text-3xl font-semibold text-secondary-700 mt-2">
              Why Discerning Homeowners Choose Luxe
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-surface-200 bg-surface p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-lg bg-primary-50 text-primary-600 mb-5">
                <Diamond className="size-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-secondary-700">Rare Material Sourcing</h3>
              <p className="text-body text-surface-600 mt-2 leading-relaxed">
                Direct quarry-sourced Italian Statuario, natural smoked timber veneers, and architectural bronze metalwork curated globally.
              </p>
            </div>

            <div className="rounded-xl border border-surface-200 bg-surface p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-lg bg-primary-50 text-primary-600 mb-5">
                <Sparkles className="size-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-secondary-700">Principal Architect Lead</h3>
              <p className="text-body text-surface-600 mt-2 leading-relaxed">
                Every Luxe project is personally spearheaded by an award-winning Principal Architect and dedicated site concierge team.
              </p>
            </div>

            <div className="rounded-xl border border-surface-200 bg-surface p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-lg bg-primary-50 text-primary-600 mb-5">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-secondary-700">White-Glove Turnkey</h3>
              <p className="text-body text-surface-600 mt-2 leading-relaxed">
                From structural revisions and automated climate acoustic control to custom art curation, fully delivered without compromise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Showcase — Clean Professional Cards */}
      <section id="luxe-portfolio" className="py-20 bg-surface">
        <Container>
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow text-primary-600 uppercase tracking-wider">Curated Portfolio</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-secondary-700 mt-2">
              Spaces Designed to Outlast Trends
            </h2>
            <p className="text-body-lg text-surface-600 mt-3">
              Explore bespoke private residences engineered to custom architectural specifications.
            </p>
          </div>

          <div className="space-y-12">
            {luxeProjects.map((proj, idx) => (
              <div
                key={idx}
                className="grid gap-8 lg:grid-cols-12 items-center rounded-xl border border-surface-200 bg-surface p-6 sm:p-8 shadow-e2 transition hover:shadow-e3"
              >
                <div className={`overflow-hidden rounded-lg lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <AspectImage
                    {...photo(proj.photo, 'landscape', 1280)}
                    sizes={SIZES.hero}
                    alt={proj.title}
                    ratio="landscape"
                    className="w-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                </div>

                <div className="space-y-4 lg:col-span-6">
                  <span className="text-caption font-semibold uppercase tracking-wider text-primary-600">
                    {proj.location} · {proj.type}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-secondary-700">
                    {proj.title}
                  </h3>
                  <p className="text-body text-surface-600 leading-relaxed border-t border-surface-200 pt-4">
                    {proj.highlights}
                  </p>
                  <div className="pt-2">
                    <Button
                      to="#luxe-enquiry"
                      variant="outline"
                      size="md"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      Commission a Similar Brief
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Enquiry Form Section — Clean and Simple */}
      <section id="luxe-enquiry" className="border-t border-surface-200 bg-surface-50 py-20">
        <Container className="max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-eyebrow text-primary-600 uppercase tracking-wider">Private Commission</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-secondary-700 mt-2">
              Initiate Your Luxe Consultation
            </h2>
            <p className="text-body text-surface-600 mt-3">
              Share details about your upcoming property. A Principal Consultant will reach out within one business day.
            </p>
          </div>

          <div className="rounded-xl border border-surface-200 bg-surface p-6 sm:p-10 shadow-e3">
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
