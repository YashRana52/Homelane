import {
  Clock,
  MapPin,
  Sparkles,
  Star,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { useLeadModal } from '@/components/funnel/leadModalContext';
import { ClosingCTA, TrustBar } from '@/components';
import { photo, SIZES } from '@/config/images';
import { projects } from '@/data/projects';
import { studios } from '@/data/proof';
import {
  AspectImage,
  Badge,
  Breadcrumb,
  Button,
  Container,
  Eyebrow,
  Heading,
  Section,
} from '@/ui';

export default function CityLanding() {
  const { city = 'bengaluru' } = useParams();
  const { open } = useLeadModal();

  const cityName = useMemo(() => {
    return city
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [city]);

  // Find nearby studios or display representative local studios
  const cityStudios = useMemo(() => {
    const matched = studios.filter((s) => s.city.toLowerCase() === cityName.toLowerCase());
    if (matched.length > 0) return matched;
    return [
      { id: 'cs1', city: cityName, area: 'Central Experience Centre, Main Commercial Hub', size: 8500 },
      { id: 'cs2', city: cityName, area: 'Metro Studio, Prime Residential Corridor', size: 6200 },
    ];
  }, [cityName]);

  const cityProjects = useMemo(() => {
    const matched = projects.filter((p) => p.city.toLowerCase() === cityName.toLowerCase());
    if (matched.length > 0) return matched;
    return projects.slice(0, 3);
  }, [cityName]);

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Cities', to: '/store-locator' }, { label: cityName }]} />
      </Container>

      {/* City Hero */}
      <Section pad="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <Badge tone="new" className="inline-flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Best Interiors in {cityName}
              </Badge>
              <Heading as="h1" level="display">
                Home Interior Designers in {cityName}
              </Heading>
              <p className="text-body-lg text-surface-600 leading-relaxed">
                Transform your apartment, villa, or independent house in {cityName} with custom modular kitchens, wardrobes, and complete turnkey interiors. Guaranteed 45-day move-in and 10-year warranty.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() =>
                    open({
                      source: `city-hero:${city}`,
                      title: `Book Free Consultation in ${cityName}`,
                      description: `Visit our ${cityName} studio or schedule a video design session.`,
                    })
                  }
                >
                  Book Free Design Consultation
                </Button>
                <Button to="/price-calculator" variant="outline" size="lg">
                  Calculate Cost for {cityName}
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-caption text-surface-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Star className="size-4 text-mustard fill-mustard" /> 4.8/5 (3,200+ {cityName} reviews)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="size-4 text-primary-500" /> 45-Day Handover
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-200 bg-surface shadow-md">
              <AspectImage
                {...photo('heroGallery', 'landscape', 1280)}
                sizes={SIZES.hero}
                alt={`Interiors in ${cityName}`}
                ratio="landscape"
                className="w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Local Stats Strip */}
      <Section pad="sm" bg="surface">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div className="p-4 border-r border-surface-200 last:border-0">
              <span className="text-display font-display text-primary-600 font-bold block">3,500+</span>
              <span className="text-caption text-surface-600 mt-1 block">Homes Delivered in {cityName}</span>
            </div>
            <div className="p-4 border-r border-surface-200 last:border-0">
              <span className="text-display font-display text-secondary-700 font-bold block">45 Days</span>
              <span className="text-caption text-surface-600 mt-1 block">Move-in Guarantee</span>
            </div>
            <div className="p-4 border-r border-surface-200 last:border-0">
              <span className="text-display font-display text-primary-600 font-bold block">10 Years</span>
              <span className="text-caption text-surface-600 mt-1 block">Flat Material Warranty</span>
            </div>
            <div className="p-4">
              <span className="text-display font-display text-secondary-700 font-bold block">146</span>
              <span className="text-caption text-surface-600 mt-1 block">Rigorous Quality Checks</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience Centres in City */}
      <Section pad="md">
        <Container>
          <div className="max-w-2xl mb-8">
            <Eyebrow>Touch & Feel the Quality</Eyebrow>
            <Heading as="h2" level="h2" className="mt-1">
              Experience Centres in {cityName}
            </Heading>
            <p className="text-body text-surface-600 mt-2">
              Walk into our state-of-the-art studios in {cityName} to touch real finish swatches, test soft-close hardware, and explore life-size kitchen and wardrobe mockups.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {cityStudios.map((studio, idx) => (
              <div
                key={idx}
                className="min-w-0 rounded-lg border border-surface-200 bg-surface p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-h4 font-display font-semibold text-secondary-700">
                      Aangan Studio — {studio.area}
                    </span>
                    <Badge tone="new">{studio.size.toLocaleString('en-IN')} sq ft</Badge>
                  </div>
                  <p className="text-body text-surface-600 mt-2 text-sm flex items-start gap-2">
                    <MapPin className="size-4 text-primary-500 mt-0.5 shrink-0" />
                    <span>{studio.area}, {cityName}</span>
                  </p>
                  <p className="text-caption text-surface-600 mt-1 flex items-center gap-2">
                    <Clock className="size-3.5" /> Open all 7 days: 10:00 AM – 8:00 PM
                  </p>
                </div>

                {/* Map Placeholder Graphic */}
                <div className="mt-5 h-36 rounded-md bg-surface-100 border border-surface-200 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5e455a_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="relative text-center p-4">
                    <MapPin className="size-8 text-primary-500 mx-auto animate-bounce" />
                    <span className="text-caption text-secondary-700 font-semibold block mt-1">
                      {studio.area}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Button
                    fullWidth
                    size="sm"
                    onClick={() =>
                      open({
                        source: `studio-visit:${cityName}`,
                        title: `Visit ${studio.area} Studio`,
                        description: 'We will keep a dedicated designer ready for your walkthrough.',
                      })
                    }
                  >
                    Book Studio Visit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    to="/contact"
                  >
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Completed Homes in City */}
      <Section pad="md" bg="surface">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <Eyebrow>Real Homes</Eyebrow>
              <Heading as="h2" level="h2" className="mt-1">
                Completed Projects in {cityName}
              </Heading>
            </div>
            <Link
              to="/projects"
              className="text-caption font-semibold text-primary-600 hover:text-primary-700"
            >
              See all 150+ projects →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cityProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust bar */}
      <TrustBar />

      {/* City SEO Long-Form Content Block */}
      <Section pad="md">
        <Container className="max-w-4xl space-y-6">
          <Heading as="h2" level="h3">
            Interior Design Solutions Tailored for {cityName} Homes
          </Heading>
          <p className="text-body text-surface-600 leading-relaxed text-sm">
            Whether you are moving into a newly handed-over high-rise apartment or renovating an established independent residence in {cityName}, Aangan Interiors offers comprehensive turnkey solutions designed for regional environmental conditions. Our high-density HDHMR boards and termite-resistant boiling waterproof ply ensure your cabinets withstand regional humidity, while our dust-free factory manufacturing guarantees flawless finishes without living room mess.
          </p>
          <p className="text-body text-surface-600 leading-relaxed text-sm">
            With 10-year warranty coverage and dedicated after-sales support across all pin codes in {cityName}, we ensure your dream home is delivered on time, within budget, and built to last generations.
          </p>
        </Container>
      </Section>

      {/* Closing CTA */}
      <ClosingCTA />
    </>
  );
}
