import { ArrowRight, Check, Download, Phone, Sparkles } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';

import { PHOTOS, SIZES } from '@/config/images';
import { cn } from '@/lib/cn';
import {
  Accordion,
  AspectImage,
  Badge,
  Button,
  Carousel,
  Checkbox,
  Chip,
  Container,
  Eyebrow,
  Heading,
  Input,
  Modal,
  Pagination,
  ProgressBar,
  Radio,
  Rating,
  Reveal,
  Section,
  Select,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  Tabs,
  type AccordionItem,
  type ButtonSize,
  type ButtonVariant,
} from '@/ui';
import { imageSet } from '@/config/images';

/* -----------------------------------------------------------------------------
   Internal showcase for every primitive in src/ui/.
   Not part of the public site — Phase 2 keeps it behind /dev.
   -------------------------------------------------------------------------- */

const groups = [
  ['buttons', 'Buttons'],
  ['type', 'Type & headings'],
  ['badges', 'Badges & chips'],
  ['forms', 'Form fields'],
  ['toggles', 'Checkbox & radio'],
  ['feedback', 'Progress & rating'],
  ['disclosure', 'Accordion & tabs'],
  ['carousel', 'Carousel'],
  ['pagination', 'Pagination'],
  ['media', 'Images'],
  ['loading', 'Loading states'],
  ['overlay', 'Modal'],
  ['motion', 'Reveal'],
] as const;

function Block({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="border-surface-200 scroll-mt-24 border-t py-10 first:border-t-0">
      <Heading as="h2" level="h3" className="font-display">
        {title}
      </Heading>
      {note && <p className="text-body text-surface-600 mt-1.5 max-w-prose">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Swatch({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-caption text-surface-600 font-mono">{label}</p>
      {children}
    </div>
  );
}

const buttonVariants: ButtonVariant[] = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'gold',
  'onImage',
  'link',
];
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg'];

const faqItems: readonly AccordionItem[] = [
  {
    id: 'timeline',
    question: 'What are the project timelines?',
    answer:
      'Modular solutions carry a 45-day move-in guarantee from the date of final design sign-off. A full-home project, which includes civil work, false ceilings and painting, typically runs to 90 days.',
  },
  {
    id: 'cost',
    question: 'How much do home interiors cost?',
    answer:
      'A 2BHK starts at ₹3.57 L and a 3BHK at ₹4.23 L for modular interiors in a new home. Modular kitchens on their own start at ₹1.49 L. Civil work and renovation are quoted separately.',
  },
  {
    id: 'warranty',
    question: 'What does the warranty cover?',
    answer:
      'A flat 10-year warranty on all modular woodwork and hardware, plus a service warranty on installation. Movable furniture and décor carry the manufacturer’s own warranty.',
  },
];

const cityOptions = [
  { value: 'bengaluru', label: 'Bengaluru' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi NCR' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'pune', label: 'Pune', disabled: true },
];

const carouselPhotos = [
  PHOTOS.kitchen1,
  PHOTOS.living1,
  PHOTOS.wardrobe1,
  PHOTOS.roomMasterBedroom,
  PHOTOS.kitchen3,
  PHOTOS.living3,
] as const;

export default function KitchenSink() {
  const [luxe, setLuxe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(7);
  const [step, setStep] = useState(2);
  const [filters, setFilters] = useState<string[]>(['l-shaped']);
  const [phone, setPhone] = useState('');

  const phoneError = phone.length > 0 && phone.replace(/\D/g, '').length !== 10;

  const toggleFilter = (id: string) =>
    setFilters((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div data-theme={luxe ? 'luxe' : undefined} className="bg-surface min-h-dvh">
      <header className="border-surface-200 bg-surface/90 sticky top-0 z-30 border-b backdrop-blur">
        <Container className="flex h-header items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <Link to="/" className="font-display text-h3 text-primary-500 shrink-0">
              Aangan
            </Link>
            <span className="text-caption text-surface-600 truncate">Kitchen sink · Phase 1</span>
          </div>
          <Button size="sm" pill onClick={() => setLuxe((v) => !v)} aria-pressed={luxe}>
            {luxe ? 'Exit Luxe' : 'Preview Luxe'}
          </Button>
        </Container>
      </header>

      <Section pad="sm" container="default">
        <Eyebrow>Component library</Eyebrow>
        <Heading as="h1" level="display" className="mt-2 max-w-[22ch]">
          Every primitive, every state.
        </Heading>
        <p className="text-body-lg text-surface-600 mt-4 max-w-prose">
          Twenty primitives from <code>src/ui/</code>. Resize to 320px, tab through with the
          keyboard, and flip the Luxe switch — all three are the acceptance criteria for this
          phase.
        </p>

        <nav aria-label="Jump to section" className="mt-6 flex flex-wrap gap-2">
          {groups.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-caption rounded-pill bg-surface-50 hover:bg-surface-100 px-3 py-1.5 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </Section>

      <Container className="pb-24">
        {/* ---------------------------------------------------------------- */}
        <Block
          id="buttons"
          title="Button"
          note="Renders an <a> when given href, a router Link when given to, and a real <button> otherwise — so a navigation action is never a button element."
        >
          <div className="space-y-8">
            <Swatch label="variant">
              <div className="flex flex-wrap items-center gap-3">
                {buttonVariants.map((variant) => (
                  <Button key={variant} variant={variant}>
                    {variant}
                  </Button>
                ))}
              </div>
            </Swatch>

            <Swatch label="size · md is the 44px touch minimum">
              <div className="flex flex-wrap items-center gap-3">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size}>
                    Book free consultation
                  </Button>
                ))}
              </div>
            </Swatch>

            <Swatch label="icons · pill · loading · disabled">
              <div className="flex flex-wrap items-center gap-3">
                <Button iconRight={<ArrowRight className="size-4" />}>Get free estimate</Button>
                <Button variant="outline" iconLeft={<Phone className="size-4" />}>
                  Talk to a designer
                </Button>
                <Button variant="secondary" pill iconLeft={<Sparkles className="size-4" />}>
                  Pill
                </Button>
                <Button loading>Submitting</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" iconLeft={<Download className="size-4" />} href="#media">
                  As anchor
                </Button>
              </div>
            </Swatch>

            <Swatch label="fullWidth · the mobile default for form actions">
              <div className="max-w-sm">
                <Button fullWidth size="lg">
                  Book free design session
                </Button>
              </div>
            </Swatch>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="type"
          title="Heading & Eyebrow"
          note="Visual size and semantic tag are separate props. Every size is a clamp(), so nothing jumps at a breakpoint."
        >
          <div className="space-y-5">
            <div>
              <Eyebrow>Eyebrow label</Eyebrow>
              <Heading as="h3" level="display" className="mt-1">
                Display size, h3 semantics
              </Heading>
            </div>
            <Heading as="h3" level="h2">
              Section heading
            </Heading>
            <Heading as="h4" level="h3">
              Card title
            </Heading>
            <Heading as="p" level="h4">
              Sub-label, rendered as a paragraph
            </Heading>
            <p className="text-body-lg max-w-prose">
              Body large — intro copy under a section heading, 16 to 18px.
            </p>
            <p className="text-body text-surface-600 max-w-prose">
              Body — the default. Card descriptions, FAQ answers, long-form text at 14 to 16px.
            </p>
            <p className="text-caption text-surface-600">Caption — meta rows, disclaimers, dates.</p>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block id="badges" title="Badge & Chip" note="Chip reports selection with aria-pressed, not colour alone.">
          <div className="space-y-8">
            <Swatch label="Badge tone">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="new">New</Badge>
                <Badge tone="offer">Flat 15% off</Badge>
                <Badge tone="gold">Luxe</Badge>
                <Badge tone="success" icon={<Check className="size-3" />}>
                  In stock
                </Badge>
                <Badge tone="info">L-Shaped</Badge>
                <Badge tone="neutral">13&apos; × 12&apos;</Badge>
              </div>
            </Swatch>

            <Swatch label="Chip · click to toggle">
              <div className="flex flex-wrap gap-2">
                {[
                  ['l-shaped', 'L-Shaped', 842],
                  ['u-shaped', 'U-Shaped', 517],
                  ['parallel', 'Parallel', 203],
                  ['island', 'Island', 96],
                ].map(([id, label, count]) => (
                  <Chip
                    key={id as string}
                    active={filters.includes(id as string)}
                    count={count as number}
                    onClick={() => toggleFilter(id as string)}
                  >
                    {label as string}
                  </Chip>
                ))}
                <Chip active onDismiss={() => undefined}>
                  Under ₹2 L
                </Chip>
                <Chip disabled>Unavailable</Chip>
              </div>
            </Swatch>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="forms"
          title="Input & Select"
          note="Labels are always rendered — hideLabel moves them off-screen, never drops them. Errors are announced through an aria-live region."
        >
          <div className="grid max-w-3xl gap-x-6 md:grid-cols-2">
            <Input label="Full name" placeholder="Priya Sharma" required autoComplete="name" />
            <Input
              label="Phone number"
              prefix="+91"
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError ? 'Enter a 10-digit mobile number' : undefined}
              helper="We will call once to schedule your design session."
            />
            <Input
              label="Email"
              type="email"
              placeholder="priya@example.com"
              autoComplete="email"
            />
            <Select label="City" options={cityOptions} placeholder="Select your city" required />
            <Select
              label="Property type"
              options={[
                { value: '1bhk', label: '1 BHK' },
                { value: '2bhk', label: '2 BHK' },
                { value: '3bhk', label: '3 BHK' },
                { value: '3plus', label: '3+ BHK' },
              ]}
              helper="Used to pick a starting estimate."
            />
            <Input label="Disabled field" placeholder="Not editable" disabled />
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="toggles"
          title="Checkbox & Radio"
          note="The native input stays in the DOM and is layered under the custom mark, so focus order and form submission behave normally."
        >
          <div className="grid max-w-3xl gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Checkbox label="Tall unit with pull-out pantry" description="Adds ₹24,000" />
              <Checkbox label="Soft-close hinges on all shutters" defaultChecked />
              <Checkbox label="Built-in chimney and hob" />
              <Checkbox label="Disabled option" disabled />
              <Checkbox
                label="I agree to be contacted about this enquiry"
                error="Please accept to continue"
              />
            </div>

            <fieldset className="space-y-4">
              <legend className="text-caption text-surface-600 mb-2 font-semibold">
                Kitchen layout
              </legend>
              <Radio name="layout" label="Straight" description="Single wall, most compact" defaultChecked />
              <Radio name="layout" label="L-Shaped" description="Two adjacent walls" />
              <Radio name="layout" label="U-Shaped" description="Three walls, most storage" />
              <Radio name="layout" label="Island" description="Needs 10 ft of clearance" disabled />
            </fieldset>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block id="feedback" title="ProgressBar & Rating">
          <div className="space-y-10">
            <Swatch label="labels · numbered stepper for a named sequence">
              <div className="max-w-3xl">
                <ProgressBar
                  step={step}
                  total={6}
                  labels={[
                    'Meet designer',
                    'Book order',
                    'Finalise design',
                    'To factory',
                    'Dispatch',
                    'Handover',
                  ]}
                />
                <div className="mt-5 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button size="sm" onClick={() => setStep((s) => Math.min(6, s + 1))} disabled={step === 6}>
                    Next
                  </Button>
                </div>
              </div>
            </Swatch>

            <Swatch label="no labels · plain fill bar for a calculator">
              <div className="max-w-sm">
                <ProgressBar step={step} total={6} />
              </div>
            </Swatch>

            <Swatch label="Rating · 4.5 renders a real half star, not a rounded one">
              <div className="space-y-3">
                <Rating value={4.5} count={35000} />
                <Rating value={4.5} size="lg" showValue={false} />
                <Rating value={3.2} size="sm" showValue />
              </div>
            </Swatch>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="disclosure"
          title="Accordion & Tabs"
          note="Accordion headers carry aria-expanded and aria-controls. Tabs use a roving tabindex, so arrow keys move between tabs and Tab reaches the panel."
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-caption text-surface-600 mb-3 font-mono">mode=&quot;single&quot;</p>
              <Accordion items={faqItems} defaultOpen={['timeline']} />
            </div>

            <div className="min-w-0">
              <p className="text-caption text-surface-600 mb-3 font-mono">variant=&quot;pill&quot;</p>
              <Tabs
                variant="pill"
                items={[
                  {
                    id: 'full-home',
                    label: 'Full Home',
                    content: (
                      <p className="text-body text-surface-600 max-w-prose">
                        Turnkey interiors for the whole home — modular work, civil work, false
                        ceilings, painting and décor, delivered under one project manager.
                      </p>
                    ),
                  },
                  {
                    id: 'kitchen',
                    label: 'Kitchen',
                    content: (
                      <p className="text-body text-surface-600 max-w-prose">
                        Modular kitchens in straight, L, U, parallel and island layouts, with a
                        choice of laminate, acrylic, PU and veneer finishes.
                      </p>
                    ),
                  },
                  {
                    id: 'wardrobe',
                    label: 'Wardrobe',
                    content: (
                      <p className="text-body text-surface-600 max-w-prose">
                        Sliding, hinged and walk-in wardrobes, floor-to-ceiling, with internal
                        organisers specified per shutter.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="carousel"
          title="Carousel"
          note="Embla. Slide width comes from a basis class per breakpoint. Arrows hide on touch devices and disable at the ends; the peeking slide on mobile is what signals the row scrolls."
        >
          <Carousel label="Design inspiration" perView="card">
            {carouselPhotos.map((id, i) => {
              const img = imageSet(id, 'landscape', 828);
              return (
                <div key={id} className="group">
                  <AspectImage
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes={SIZES.card}
                    alt=""
                    ratio="landscape"
                    zoomOnHover
                    className="rounded-md"
                  />
                  <p className="text-h4 font-display mt-3">Slide {i + 1}</p>
                  <p className="text-caption text-surface-600">perView=&quot;card&quot;</p>
                </div>
              );
            })}
          </Carousel>

          <div className="mt-12">
            <p className="text-caption text-surface-600 mb-3 font-mono">
              perView=&quot;tile&quot; · loop · autoplay
            </p>
            <Carousel label="Room categories" perView="tile" loop autoplay={4} dots={false}>
              {carouselPhotos.map((id) => {
                const img = imageSet(id, 'square', 640);
                return (
                  <AspectImage
                    key={id}
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes={SIZES.tile}
                    alt=""
                    ratio="square"
                    className="rounded-sm"
                  />
                );
              })}
            </Carousel>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="pagination"
          title="Pagination"
          note="A gallery category runs to 162 pages, so the range collapses to first, last and a window around the current page."
        >
          <div className="space-y-8">
            <Pagination page={page} totalPages={162} onChange={setPage} />
            <div className="space-y-4">
              <p className="text-caption text-surface-600 font-mono">edges</p>
              <Pagination page={1} totalPages={162} onChange={() => undefined} />
              <Pagination page={162} totalPages={162} onChange={() => undefined} />
              <Pagination page={2} totalPages={4} onChange={() => undefined} />
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="media"
          title="AspectImage"
          note="Reserves its box with aspect-ratio before the file arrives, which is what keeps CLS at zero. The warm gradient fills that box until the photo decodes."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(['cinema', 'landscape', 'square', 'portrait'] as const).map((ratio, i) => {
              const id = carouselPhotos[i] ?? PHOTOS.heroHome;
              const img = imageSet(id, ratio, 828);
              return (
                <div key={ratio}>
                  <AspectImage
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes={SIZES.card}
                    alt=""
                    ratio={ratio}
                    className="rounded-md"
                  />
                  <p className="text-caption text-surface-600 mt-2 font-mono">{ratio}</p>
                </div>
              );
            })}
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block id="loading" title="Skeleton" note="Proportions match the real card, so content arriving does not shift the layout.">
          <div className="grid gap-6 md:grid-cols-3">
            <SkeletonCard />
            <div className="space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <SkeletonText lines={4} />
            </div>
            <div className="space-y-3">
              <Skeleton className="rounded-pill h-11 w-full" />
              <Skeleton className="rounded-sm h-11 w-full" />
              <Skeleton className="rounded-sm h-24 w-full" />
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="overlay"
          title="Modal"
          note="Bottom sheet under 640px, centred dialog above. Focus moves in on open, cycles inside while open, and returns to the opener on close."
        >
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setModalOpen(true)}>Open dialog</Button>
            <Button variant="outline" onClick={() => setSheetOpen(true)}>
              Open with footer
            </Button>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Book a free design session"
            description="A designer will call once to confirm a slot. No obligation."
          >
            <div className="space-y-1">
              <Input label="Full name" placeholder="Priya Sharma" required />
              <Input label="Phone number" prefix="+91" type="tel" inputMode="numeric" required />
              <Select label="City" options={cityOptions} placeholder="Select your city" required />
              <Checkbox label="I agree to be contacted about this enquiry" />
              <Button fullWidth size="lg" className="mt-2">
                Book my session
              </Button>
            </div>
          </Modal>

          <Modal
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Filter designs"
            size="sm"
            footer={
              <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={() => setFilters([])}>
                  Clear all
                </Button>
                <Button fullWidth onClick={() => setSheetOpen(false)}>
                  Show results
                </Button>
              </div>
            }
          >
            <div className="space-y-4 py-1">
              <Checkbox label="L-Shaped" description="842 designs" defaultChecked />
              <Checkbox label="U-Shaped" description="517 designs" />
              <Checkbox label="Parallel" description="203 designs" />
              <Checkbox label="Island" description="96 designs" />
            </div>
          </Modal>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          id="motion"
          title="Reveal"
          note="Fade and rise once as a block scrolls into view. Under prefers-reduced-motion the content renders in place with no transition at all."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-surface-50 rounded-md p-6">
                  <p className="text-h4 font-display">Card {i + 1}</p>
                  <p className="text-caption text-surface-600 mt-1">delay {(i * 0.06).toFixed(2)}s</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <section className="border-surface-200 border-t py-10">
          <Heading as="h2" level="h3">
            Container & Section
          </Heading>
          <p className="text-body text-surface-600 mt-1.5 max-w-prose">
            Every band on the page is a <code>Section</code> (background + vertical padding) wrapping
            a <code>Container</code> (gutter + max width). The gutter is a token, so it widens at md
            and lg on its own.
          </p>
        </section>
      </Container>

      <Section bg="muted" pad="md">
        <p className="text-caption text-surface-600 font-mono">
          Section bg=&quot;muted&quot; — the alternating band
        </p>
      </Section>
      <Section bg="plum" pad="md">
        <p className="text-caption font-mono opacity-80">Section bg=&quot;plum&quot;</p>
      </Section>
      <Section bg="primary" pad="md">
        <p className="text-caption font-mono opacity-90">Section bg=&quot;primary&quot;</p>
      </Section>

      <Section pad="md" container="narrow">
        <div className={cn('text-center')}>
          <Heading as="h2" level="h2">
            Phase 1 done.
          </Heading>
          <p className="text-body text-surface-600 mt-3">
            Phase 2 next: the app shell — sticky header, mega-menu, mobile drawer, footer and the
            route tree.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/dev/tokens" variant="outline">
              Design tokens
            </Button>
            <Button to="/" variant="outline">
              Back to site
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
