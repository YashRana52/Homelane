import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';

import { brand, trustStats } from '@/config/brand';
import { PHOTOS, SIZES, imageSet } from '@/config/images';
import { estimateEMI, formatINR, formatLakh, formatStat } from '@/lib/formatINR';
import { AspectImage, Button, Container, Eyebrow, Heading, Section } from '@/ui';

/* -----------------------------------------------------------------------------
   Design-token reference. Proves every token in tokens.css resolves, that the
   type scale is fluid, and that the Luxe theme re-skins live.
   -------------------------------------------------------------------------- */

const primaryScale = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const surfaceScale = ['50', '100', '200', '300', '400', '600', '800', '900'] as const;

const typeScale = [
  { cls: 'text-display', label: 'display', note: '32 → 56px · Poppins 600' },
  { cls: 'text-h2', label: 'h2', note: '24 → 40px · Poppins 600' },
  { cls: 'text-h3', label: 'h3', note: '18 → 22px · Poppins 600' },
  { cls: 'text-h4', label: 'h4', note: '16 → 18px · Poppins 500' },
  { cls: 'text-body-lg', label: 'body-lg', note: '16 → 18px · Inter 400' },
  { cls: 'text-body', label: 'body', note: '14 → 16px · Inter 400' },
  { cls: 'text-caption', label: 'caption', note: '12 → 13px · Inter 400' },
  { cls: 'text-btn', label: 'btn', note: '14 → 15px · Inter 600' },
] as const;

const radii = ['xs', 'sm', 'md', 'lg', 'xl', 'pill'] as const;

// Spelled out, because Tailwind scans source text — `shadow-${s}` is never
// generated.
const shadows = [
  ['e1', 'shadow-e1'],
  ['e2', 'shadow-e2'],
  ['e3', 'shadow-e3'],
  ['e4', 'shadow-e4'],
] as const;

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-surface-200 border-t py-10 first:border-t-0 md:py-12">
      <h2 className="text-eyebrow text-surface-600 mb-5 uppercase">{title}</h2>
      {children}
    </section>
  );
}

export default function TokenSheet() {
  const [luxe, setLuxe] = useState(false);
  const hero = imageSet(PHOTOS.heroHome, 'wide', 1440);

  return (
    <div data-theme={luxe ? 'luxe' : undefined} className="bg-surface min-h-dvh">
      <header className="border-surface-200 bg-surface/90 sticky top-0 z-30 border-b backdrop-blur">
        <Container className="flex h-header items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="font-display text-h3 text-primary-500 shrink-0">{brand.name}</span>
            <span className="text-caption text-surface-600 hidden truncate sm:inline">
              {brand.tagline}
            </span>
          </div>
          <Button size="sm" pill onClick={() => setLuxe((v) => !v)} aria-pressed={luxe}>
            {luxe ? 'Exit Luxe' : 'Preview Luxe'}
          </Button>
        </Container>
      </header>

      <Container className="pb-24">
        <section className="py-12 md:py-16">
          <Eyebrow>Design tokens</Eyebrow>
          <Heading as="h1" level="display" className="mt-2 max-w-[20ch]">
            Foundation is wired.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-4 max-w-prose">
            Resize the window — every size below is a <code>clamp()</code>, so nothing jumps at a
            breakpoint. Flip Luxe to re-theme every token at once.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/dev/kitchen-sink">Open the component library</Button>
            <Button variant="outline" href="https://unsplash.com" target="_blank">
              Photo source
            </Button>
          </div>
        </section>

        <Row title="Type scale">
          <ul className="space-y-4">
            {typeScale.map(({ cls, label, note }) => (
              <li key={cls} className="md:flex md:items-baseline md:gap-6">
                <span className="text-caption text-surface-600 shrink-0 md:w-28">{label}</span>
                <span className={cls}>Interiors you will actually live in</span>
                <span className="text-caption text-surface-600 ml-auto hidden shrink-0 lg:block">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </Row>

        <Row title="Primary — coral">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {primaryScale.map((step) => (
              <div key={step}>
                <div
                  className="rounded-sm shadow-ring aspect-square w-full"
                  style={{ backgroundColor: `var(--c-primary-${step})` }}
                />
                <span className="text-caption text-surface-600 mt-1 block">{step}</span>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Surface — warm neutral">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {surfaceScale.map((step) => (
              <div key={step}>
                <div
                  className="rounded-sm shadow-ring aspect-square w-full"
                  style={{ backgroundColor: `var(--c-surface-${step})` }}
                />
                <span className="text-caption text-surface-600 mt-1 block">{step}</span>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Accent & semantic">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {(
              [
                ['secondary-500', 'Plum'],
                ['secondary-700', 'Text'],
                ['gold-600', 'Gold'],
                ['mustard', 'Mustard'],
                ['success', 'Success'],
                ['error', 'Error'],
              ] as const
            ).map(([token, label]) => (
              <div key={token} className="rounded-sm overflow-hidden">
                <div className="h-16 w-full" style={{ backgroundColor: `var(--c-${token})` }} />
                <div className="bg-surface-50 px-2 py-1.5">
                  <p className="text-caption font-semibold">{label}</p>
                  <p className="text-caption text-surface-600">--c-{token}</p>
                </div>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Radii & elevation">
          <div className="flex flex-wrap gap-3">
            {radii.map((r) => (
              <div
                key={r}
                className="bg-surface-50 shadow-ring text-caption text-surface-600 grid h-20 w-20 place-items-center"
                style={{ borderRadius: `var(--radius-${r})` }}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-5">
            {shadows.map(([label, shadowClass]) => (
              <div
                key={label}
                className={`bg-surface rounded-md text-caption text-surface-600 grid h-20 w-24 place-items-center ${shadowClass}`}
              >
                {label}
              </div>
            ))}
          </div>
        </Row>

        <Row title="Image layer">
          <figure>
            <AspectImage
              src={hero.src}
              srcSet={hero.srcSet}
              sizes={SIZES.hero}
              alt="A naturally lit living room with a low sofa and warm timber flooring"
              ratio="wide"
              priority
              className="rounded-lg"
            />
            <figcaption className="text-caption text-surface-600 mt-2">
              Served from the Unsplash CDN with a 7-step <code>srcSet</code> and a reserved
              aspect-ratio box, so layout shift is zero. Run <code>npm run verify:images</code> to
              check every id in the registry.
            </figcaption>
          </figure>
        </Row>

        <Row title="Indian currency formatting">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ['formatINR(526000)', formatINR(526_000)],
                ['formatLakh(357000)', formatLakh(357_000)],
                ['formatStat(55000)', formatStat(trustStats.homesDelivered)],
                ['estimateEMI(200000)', `${formatINR(estimateEMI(200_000))}/mo`],
              ] as const
            ).map(([call, out]) => (
              <div key={call} className="bg-surface-50 rounded-sm p-4">
                <dt className="text-caption text-surface-600">{call}</dt>
                <dd className="text-h3 mt-1">{out}</dd>
              </div>
            ))}
          </dl>
        </Row>
      </Container>

      <Section bg="muted" pad="md" container="narrow">
        <div className="text-center">
          <Heading as="h2" level="h2">
            Next: the app shell
          </Heading>
          <p className="text-body text-surface-600 mt-3">
            Phase 2 builds the sticky header, mega-menu, mobile drawer, footer and route tree.
          </p>
          <p className="text-caption text-surface-600 mt-6">
            <Link to="/dev/kitchen-sink" className="underline underline-offset-4">
              Component library
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
