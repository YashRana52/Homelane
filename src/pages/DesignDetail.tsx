import {
  Check,
  ChevronRight,
  Heart,
  Maximize2,
  Shield,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';

import { DesignCard } from '@/components/cards/DesignCard';
import { LeadForm } from '@/components/funnel/LeadForm';
import { useLeadModal } from '@/components/funnel/leadModalContext';
import { TrustBar } from '@/components/sections/TrustBar';
import { photo, SIZES, type PhotoKey } from '@/config/images';
import { designs, type Design } from '@/data/designs';
import { formatINR } from '@/lib/formatINR';
import { slugify } from '@/lib/slugify';
import {
  AspectImage,
  Badge,
  Breadcrumb,
  Button,
  Container,
  Eyebrow,
  Heading,
  Modal,
  Section,
} from '@/ui';

export default function DesignDetail() {
  const { category = 'modular-kitchen', slug = '' } = useParams();
  const { open } = useLeadModal();
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find design matching slug or fallback
  const design: Design = useMemo(() => {
    const found = designs.find(
      (d) => d.category === category && slugify(d.title) === slug,
    );
    if (found) return found;
    return designs.find((d) => d.category === category) ?? designs[0]!;
  }, [category, slug]);

  const photos: PhotoKey[] = [
    design.photo,
    'kitchen2',
    'kitchen3',
    'roomKitchen',
  ];

  const similarDesigns = useMemo(() => {
    return designs
      .filter((d) => d.category === design.category && d.id !== design.id)
      .slice(0, 6);
  }, [design]);

  const emi = design.price ? Math.round(design.price * 0.0095) : 3400;

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb
          items={[
            { label: 'Design Ideas', to: '/design-ideas' },
            {
              label: category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              to: `/design-ideas/${category}`,
            },
            { label: design.title },
          ]}
        />
      </Container>

      <Section pad="sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] items-start">
            {/* Left Column: Gallery & Details.
                `min-w-0` is load-bearing: a grid item defaults to
                min-width:auto and will grow past its track rather than let its
                content wrap, which pushed this column to 420px inside a 288px
                container. */}
            <div className="min-w-0 space-y-8">
              {/* Main Image & Lightbox Trigger */}
              <div className="relative overflow-hidden rounded-lg border border-surface-200 bg-surface shadow-xs group">
                <AspectImage
                  {...photo(photos[activeThumb] ?? design.photo, 'landscape', 1280)}
                  sizes={SIZES.hero}
                  alt={design.title}
                  ratio="landscape"
                  className="w-full object-cover"
                />

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Save to wishlist"
                    className="grid size-10 place-items-center rounded-full bg-white/90 text-secondary-700 shadow-md backdrop-blur-xs transition hover:bg-white hover:text-primary-600"
                  >
                    <Heart
                      className={`size-5 ${isWishlisted ? 'fill-primary-500 text-primary-500' : ''}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Expand image fullscreen"
                    className="grid size-10 place-items-center rounded-full bg-white/90 text-secondary-700 shadow-md backdrop-blur-xs transition hover:bg-white hover:text-primary-600"
                  >
                    <Maximize2 className="size-5" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  {design.tags.map((tag) => (
                    <Badge key={tag} tone="neutral" className="bg-white/90 shadow-xs backdrop-blur-xs">
                      {tag}
                    </Badge>
                  ))}
                  {design.size && (
                    <Badge tone="new" className="bg-white/90 shadow-xs backdrop-blur-xs">
                      Size: {design.size}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveThumb(idx)}
                    aria-label={`View photo ${idx + 1}`}
                    className={`relative aspect-4/3 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      activeThumb === idx
                        ? 'border-primary-500 ring-2 ring-primary-500/20'
                        : 'border-surface-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <AspectImage {...photo(p, 'landscape', 240)} sizes="96px" alt="" ratio="landscape" />
                  </button>
                ))}
              </div>

              {/* Title & Price Header */}
              <div>
                <Heading as="h1" level="h2">
                  {design.title}
                </Heading>
                <div className="mt-3 flex flex-wrap items-baseline gap-4">
                  {design.price && (
                    <span className="text-display font-display text-primary-600 font-bold">
                      {formatINR(design.price)}
                      <span className="text-caption text-surface-600 font-normal align-super text-xs ml-0.5">
                        *
                      </span>
                    </span>
                  )}
                  <span className="text-body text-surface-600">
                    EMI starts at <strong className="text-secondary-700 font-semibold">{formatINR(emi)}/mo</strong>
                  </span>
                </div>
                <p className="text-caption text-surface-600 mt-1">
                  * Estimated price includes cabinetry, hardware, and installation. Final quote depends on site measurements.
                </p>
              </div>

              {/* Specifications Table */}
              <div className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs">
                <Heading as="h2" level="h3" className="mb-4">
                  Specifications & Materials
                </Heading>
                <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Room Size</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">{design.size ?? '12 × 10 feet'}</dd>
                  </div>
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Layout Type</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">{design.tags[0] ?? 'L-Shaped'}</dd>
                  </div>
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Base Material</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">Moisture-Resistant HDHMR Ply</dd>
                  </div>
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Shutter Finish</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">{design.tags[1] ?? 'High-Gloss Acrylic'}</dd>
                  </div>
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Countertop</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">18mm Natural Polished Quartz</dd>
                  </div>
                  <div className="border-b border-surface-100 pb-2.5">
                    <dt className="text-caption text-surface-600 uppercase font-semibold text-[11px]">Hardware & Hinges</dt>
                    <dd className="text-secondary-700 font-medium mt-0.5">Soft-Close German Mechanism</dd>
                  </div>
                </dl>
              </div>

              {/* What's Included */}
              <div className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs">
                <Heading as="h2" level="h3" className="mb-4">
                  What's Included in this Scope
                </Heading>
                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-surface-600">
                  {[
                    'Factory-built base & wall storage units',
                    'Soft-close tandem drawers with organisers',
                    'Concealed under-cabinet LED profile lighting',
                    'Integrated cutlery trays & spice pull-outs',
                    'Delivery & on-site assembly by certified crew',
                    '10-Year flat warranty on woodwork & fittings',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-success text-white">
                        <Check className="size-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Designer Note */}
              <div className="rounded-lg bg-surface-50 border border-surface-200 p-6 flex flex-col sm:flex-row items-start gap-4">
                <div className="size-14 rounded-full bg-primary-100 text-primary-600 font-display font-bold grid place-items-center shrink-0 text-xl shadow-inner">
                  AD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-h4 font-display font-semibold text-secondary-700">
                      Designer’s Recommendation
                    </h3>
                    <Badge tone="offer">Aangan Studio Principal</Badge>
                  </div>
                  <p className="text-body text-surface-600 mt-2 text-sm leading-relaxed">
                    "This layout maximises the kitchen work triangle by positioning the hob, sink, and refrigerator within arm's reach while preserving expansive unbroken counter space. The dual-tone finish elevates daylight in compact areas without sacrificing storage capacity."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Lead Capture Card (Desktop) */}
            <aside className="sticky top-28 hidden lg:block rounded-xl border border-surface-200 bg-surface p-6 shadow-md">
              <Badge tone="new">Custom Design Session</Badge>
              <h2 className="text-h3 font-display mt-2 font-bold text-secondary-700">
                Love this design?
              </h2>
              <p className="text-caption text-surface-600 mt-1">
                Get a custom floor plan and accurate quotation tailored to your home measurements.
              </p>

              <div className="mt-6">
                <LeadForm
                  source={`design-detail:${design.id}`}
                  submitLabel="Get Free Quote For This Design"
                />
              </div>

              <div className="mt-6 border-t border-surface-200 pt-4 flex items-center gap-3 text-caption text-surface-600">
                <Shield className="size-4 text-success shrink-0" />
                <span>45-day move-in guarantee & 10-year warranty included</span>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Similar Designs Scroller */}
      {similarDesigns.length > 0 && (
        <Section pad="md" bg="surface">
          <Container>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <Eyebrow>Related Inspiration</Eyebrow>
                <Heading as="h2" level="h2" className="mt-1">
                  Similar Designs You May Like
                </Heading>
              </div>
              <Link
                to={`/design-ideas/${category}`}
                className="text-caption font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarDesigns.slice(0, 3).map((item) => (
                <DesignCard key={item.id} design={item} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Trust bar */}
      <TrustBar />

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-surface border-t border-surface-200 p-4 shadow-e4 z-30 flex items-center justify-between gap-4">
        <div>
          <span className="text-caption text-surface-600 block text-xs">Estimated Price</span>
          <span className="text-h4 font-display font-bold text-primary-600">
            {design.price ? formatINR(design.price) : 'From ₹2.89 L'}
          </span>
        </div>
        <Button
          size="md"
          onClick={() =>
            open({
              source: `design-detail-mobile:${design.id}`,
              title: `Enquire about ${design.title}`,
              description: 'Our design team will share customised 3D drawings and itemised costing.',
            })
          }
        >
          Get Free Quote
        </Button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)} size="lg" title={design.title}>
        <div className="py-2">
          <AspectImage
            {...photo(photos[activeThumb] ?? design.photo, 'landscape', 1600)}
            sizes="100vw"
            alt={design.title}
            ratio="landscape"
            className="w-full rounded-md object-contain max-h-[75vh]"
          />
        </div>
      </Modal>
    </>
  );
}
