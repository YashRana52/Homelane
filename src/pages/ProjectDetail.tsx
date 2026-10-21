import { Compass, MapPin, Quote } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { useLeadModal } from '@/components/funnel/leadModalContext';
import { ClosingCTA, TrustBar } from '@/components';
import { photo, SIZES, type PhotoKey } from '@/config/images';
import { projects, type Project } from '@/data/projects';
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

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const { open } = useLeadModal();
  const [sliderPos, setSliderPos] = useState(50);
  const [activeRoom, setActiveRoom] = useState<'living' | 'kitchen' | 'bedroom'>('living');

  const project: Project = useMemo(() => {
    const found = projects.find((p) => p.slug === slug);
    if (found) return found;
    return projects[0]!;
  }, [slug]);

  const roomPhotos: Record<'living' | 'kitchen' | 'bedroom', PhotoKey> = {
    living: 'roomLiving',
    kitchen: 'roomKitchen',
    bedroom: 'roomMasterBedroom',
  };

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Projects', to: '/projects' }, { label: project.title }]} />
      </Container>

      {/* Hero Header */}
      <Section pad="sm">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge tone="new">{project.style} Style</Badge>
              <Heading as="h1" level="display" className="mt-2">
                {project.title}
              </Heading>
              <p className="text-body-lg text-surface-600 mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="size-4 text-primary-500" /> {project.city}
                </span>
                <span>·</span>
                <span>{project.config}</span>
                <span>·</span>
                <span>{project.area.toLocaleString('en-IN')} sq ft</span>
              </p>
            </div>

            <Button
              size="lg"
              onClick={() =>
                open({
                  source: `project-detail:${project.slug}`,
                  title: `Consultation inspired by ${project.title}`,
                  description: `Our team will design a similar ${project.style.toLowerCase()} concept for your layout.`,
                })
              }
            >
              Get Free Design Consultation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Before / After Interactive Slider */}
      <Section pad="sm">
        <Container>
          <div className="mb-4">
            <Heading as="h2" level="h3">
              Before & After Transformation
            </Heading>
            <p className="text-caption text-surface-600 mt-1">
              Drag the slider handle to compare the empty builder handover with the completed Aangan home.
            </p>
          </div>

          <div className="relative aspect-16/9 w-full max-h-[560px] overflow-hidden rounded-xl border border-surface-200 bg-surface shadow-md select-none">
            {/* "After" Image (Full background) */}
            <div className="absolute inset-0">
              <AspectImage
                {...photo(project.photo, 'landscape', 1600)}
                sizes={SIZES.hero}
                alt="After Transformation"
                ratio="landscape"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-4 right-4 rounded-sm bg-black/60 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                After: Completed Home
              </span>
            </div>

            {/* "Before" Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative h-full w-[100vw] max-w-[1280px]">
                <AspectImage
                  {...photo('roomLiving', 'landscape', 1600)}
                  sizes={SIZES.hero}
                  alt="Before Transformation"
                  ratio="landscape"
                  className="h-full w-full object-cover filter grayscale contrast-75 brightness-90"
                />
              </div>
              <span className="absolute top-4 left-4 rounded-sm bg-black/60 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                Before: Bare Shell
              </span>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 z-10 w-1 bg-white shadow-2xl"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -left-4 size-9 -translate-y-1/2 rounded-full bg-white shadow-lg grid place-items-center text-secondary-700 cursor-ew-resize">
                <Compass className="size-4 animate-spin-slow" />
              </div>
            </div>

            {/* Invisible Range Input for Drag interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before and after comparison slider"
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Container>
      </Section>

      {/* Room-by-room Walkthrough */}
      <Section pad="md" bg="surface">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <Eyebrow>Virtual Walkthrough</Eyebrow>
              <Heading as="h2" level="h2" className="mt-1">
                Room-by-Room Tour
              </Heading>
            </div>

            {/* Room Tabs */}
            <div className="flex gap-2">
              {(['living', 'kitchen', 'bedroom'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveRoom(r)}
                  className={`rounded-sm px-4 py-2 text-sm font-semibold transition ${
                    activeRoom === r
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface border border-surface-200 text-secondary-700 hover:border-surface-400'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-surface-200 bg-surface shadow-xs">
            <AspectImage
              {...photo(roomPhotos[activeRoom], 'landscape', 1280)}
              sizes={SIZES.hero}
              alt={`${activeRoom} room tour`}
              ratio="landscape"
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        </Container>
      </Section>

      {/* Specification Sheet & Homeowner Quote */}
      <Section pad="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Specification Sheet */}
            <div className="rounded-lg border border-surface-200 bg-surface p-6 sm:p-8 shadow-xs">
              <Heading as="h2" level="h3" className="mb-6">
                Project Specification Sheet
              </Heading>
              <dl className="grid gap-4 text-sm divide-y divide-surface-100">
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Property Configuration</dt>
                  <dd className="font-semibold text-secondary-700">{project.config}</dd>
                </div>
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Total Carpet Area</dt>
                  <dd className="font-semibold text-secondary-700">{project.area.toLocaleString('en-IN')} sq ft</dd>
                </div>
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Turnaround Timeline</dt>
                  <dd className="font-semibold text-secondary-700">{project.days} Calendar Days</dd>
                </div>
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Primary Core Material</dt>
                  <dd className="font-semibold text-secondary-700">HDHMR + Calibrated BWP Marine Ply</dd>
                </div>
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Finishes Used</dt>
                  <dd className="font-semibold text-secondary-700">Gloss Acrylic, Natural Veneer & Matte Laminate</dd>
                </div>
                <div className="pt-3 flex justify-between">
                  <dt className="text-surface-600">Hardware & Mechanisms</dt>
                  <dd className="font-semibold text-secondary-700">Hettich & Blum Soft-Close Systems</dd>
                </div>
              </dl>
            </div>

            {/* Homeowner Quote */}
            <div className="rounded-lg bg-surface-50 border border-surface-200 p-6 sm:p-8 relative">
              <Quote className="size-12 text-primary-200 mb-4" />
              <blockquote className="text-lg font-display text-secondary-700 italic leading-relaxed">
                "Our biggest fear was delayed timelines and unexpected cost additions mid-way through the project. Aangan completed our entire home in exactly {project.days} days, precisely as promised on the contract. The 3D render matched the finished reality down to the millimetre."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary-500 text-white font-bold grid place-items-center text-sm">
                  HS
                </div>
                <div>
                  <span className="font-semibold text-secondary-700 block">The Sharma Family</span>
                  <span className="text-caption text-surface-600 block">Homeowners, {project.city}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust bar */}
      <TrustBar />

      {/* Closing CTA */}
      <ClosingCTA />
    </>
  );
}
