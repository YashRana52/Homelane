import { ArrowRight, Check, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router';

import {
  ClosingCTA,
  ComparisonTable,
  FaqSection,
  ProcessStepper,
  TrustBar,
} from '@/components';
import { useLeadModal } from '@/components/funnel/leadModalContext';
import { photo, SIZES } from '@/config/images';
import { services } from '@/data/services';
import { formatLakh } from '@/lib/formatINR';
import {
  AspectImage,
  Badge,
  Breadcrumb,
  Button,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
} from '@/ui';

const priceCards = [
  {
    bhk: '1 BHK',
    price: 219_000,
    area: '450 – 600 sq ft',
    timeline: '45 Days',
    includes: ['Modular kitchen setup', '1 Master bedroom wardrobe', 'Living room TV unit', 'Basic electrical fittings'],
  },
  {
    bhk: '2 BHK',
    price: 357_000,
    area: '750 – 1,050 sq ft',
    timeline: '45 Days',
    popular: true,
    includes: ['Modular kitchen + tall pantry', '2 Full wardrobes with lofts', 'Living room entertainment center', 'Foyer console unit'],
  },
  {
    bhk: '3 BHK',
    price: 423_000,
    area: '1,200 – 1,600 sq ft',
    timeline: '45–60 Days',
    includes: ['Custom L/U-shaped kitchen', '3 Bedroom wardrobes with dressers', 'Living & dining storage credenza', 'Study table & book ledge'],
  },
  {
    bhk: '4 BHK+',
    price: 481_000,
    area: '1,800 – 2,800 sq ft',
    timeline: '60–75 Days',
    includes: ['Luxury acrylic kitchen with island', '4 Custom wardrobes & walk-ins', 'Pooja room mandir unit', 'Bar unit & vanity cabinets'],
  },
];

export default function OfferingDetail() {
  const { slug = 'modular' } = useParams();
  const { open } = useLeadModal();

  const service = useMemo(() => {
    return (
      services.find((s) => s.id === slug) ?? {
        id: slug,
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Interiors`,
        description: 'End-to-end interior design and turnkey execution designed for modern living.',
        photo: 'heroGallery' as const,
        startingAt: 357_000,
      }
    );
  }, [slug]);

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Offerings' }, { label: service.title }]} />
      </Container>

      {/* Hero Section */}
      <Section pad="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <Badge tone="new" className="inline-flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> 45-Day Move-in Guarantee
              </Badge>
              <Heading as="h1" level="display">
                {service.title}
              </Heading>
              <p className="text-body-lg text-surface-600 leading-relaxed">
                {service.description} From bespoke 3D designs to factory-finished installation and rigorous quality audits, experience hassle-free interiors with complete price transparency.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() =>
                    open({
                      source: `offering:${slug}`,
                      title: `Book Free ${service.title} Consultation`,
                      description: 'Get free 3D design renders and transparent itemised pricing.',
                    })
                  }
                  iconRight={<ArrowRight className="size-4" />}
                >
                  Book Free Consultation
                </Button>
                <Button to="/price-calculator" variant="outline" size="lg">
                  Calculate Instant Estimate
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-caption text-surface-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield className="size-4 text-success" /> 10-Year Flat Warranty
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="size-4 text-primary-500" /> 146 Quality Checks
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-200 bg-surface shadow-md">
              <AspectImage
                {...photo(service.photo, 'landscape', 1280)}
                sizes={SIZES.hero}
                alt={service.title}
                ratio="landscape"
                className="w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Price Cards by BHK */}
      <Section pad="md" bg="surface">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Transparent Pricing</Eyebrow>
            <Heading as="h2" level="h2" className="mt-2">
              Cost Estimates by Apartment Size
            </Heading>
            <p className="text-body-lg text-surface-600 mt-2">
              Clear starting packages based on typical floor plans. Every package can be modified to your exact taste.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {priceCards.map((card, idx) => (
              <Reveal key={card.bhk} delay={idx * 0.05}>
                <div
                  className={`relative flex flex-col justify-between rounded-lg border p-6 transition-all duration-200 h-full ${
                    card.popular
                      ? 'border-primary-500 bg-primary-50/20 shadow-md ring-2 ring-primary-500/20'
                      : 'border-surface-200 bg-surface shadow-xs hover:border-surface-300'
                  }`}
                >
                  {card.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge tone="offer">Most Popular Choice</Badge>
                    </div>
                  )}

                  <div>
                    <h3 className="text-h3 font-display font-bold text-secondary-700">
                      {card.bhk}
                    </h3>
                    <p className="text-caption text-surface-600 mt-1">Carpet: {card.area}</p>

                    <div className="mt-4 border-y border-surface-100 py-3">
                      <span className="text-caption text-surface-600 block uppercase text-[11px] font-semibold">
                        Starting from
                      </span>
                      <span className="text-display font-display text-primary-600 font-bold block">
                        {formatLakh(card.price)}
                      </span>
                      <span className="text-caption text-surface-600 block text-xs">
                        Timeline: {card.timeline}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-surface-600">
                      {card.includes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-caption">
                          <Check className="size-3.5 text-success mt-0.5 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-100 space-y-2">
                    <Button
                      fullWidth
                      variant={card.popular ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() =>
                        open({
                          source: `offering-bhk:${card.bhk}`,
                          title: `Get ${card.bhk} Detailed Quote`,
                          description: 'We will share a room-by-room breakdown tailored to your apartment layout.',
                        })
                      }
                    >
                      Get Quote
                    </Button>
                    <Link
                      to="/price-calculator"
                      className="text-caption text-primary-600 hover:text-primary-700 block text-center font-medium"
                    >
                      Customise in Calculator →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Process Stepper */}
      <ProcessStepper />

      {/* FAQ Section */}
      <FaqSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Closing CTA */}
      <ClosingCTA />
    </>
  );
}
