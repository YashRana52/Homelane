import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

import { DesignScroller, TrustBar, ClosingCTA } from '@/components';
import { photo, SIZES } from '@/config/images';
import { rooms } from '@/data/rooms';
import { AspectImage, Badge, Breadcrumb, Container, Eyebrow, Heading, Reveal, Section } from '@/ui';

export default function GalleryHub() {
  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Design Ideas' }]} />
      </Container>

      {/* Hero section */}
      <Section pad="sm">
        <Container>
          <div className="max-w-3xl">
            <Badge tone="new" className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Over 15,000+ Verified Designs
            </Badge>
            <Heading as="h1" level="display" className="mt-3">
              Interior Design Ideas for Every Indian Home
            </Heading>
            <p className="text-body-lg text-surface-600 mt-4 leading-relaxed">
              Real layouts, practical storage ideas, and material finishes crafted for modern apartments, villas, and independent floors. Click any room category to filter by layout, budget, and colour.
            </p>
          </div>
        </Container>
      </Section>

      {/* Category Tile Grid */}
      <Section pad="md" bg="surface">
        <Container>
          <div className="flex items-end justify-between mb-8">
            <div>
              <Eyebrow>Rooms & Categories</Eyebrow>
              <Heading as="h2" level="h2" className="mt-1">
                Browse by Room
              </Heading>
            </div>
            <p className="text-caption text-surface-600 hidden sm:block">
              12 categories · Filtered by dimensions and budget
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {rooms.map((room, idx) => (
              <Reveal key={room.id} delay={idx * 0.04}>
                <Link
                  to={room.to}
                  className="group relative flex flex-col overflow-hidden rounded-md border border-surface-200 bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-100">
                    <AspectImage
                      {...photo(room.photo, 'landscape', 720)}
                      sizes={SIZES.card}
                      alt={room.label}
                      ratio="landscape"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="image-scrim absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <span className="text-body font-display font-semibold block leading-tight">
                        {room.label}
                      </span>
                      <span className="text-caption text-white/80 block text-xs mt-0.5">
                        {room.designCount.toLocaleString('en-IN')} Designs
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-surface flex items-center justify-between text-caption text-primary-600 font-semibold group-hover:text-primary-700">
                    <span>Explore</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Kitchen & Living Scrollers */}
      <DesignScroller
        category="modular-kitchen"
        title="Trending Modular Kitchens"
        eyebrow="Explore Kitchens"
        seeAllTo="/design-ideas/modular-kitchen"
      />
      <DesignScroller
        category="living-room"
        title="Popular Living Room Layouts"
        eyebrow="Explore Living Rooms"
        seeAllTo="/design-ideas/living-room"
      />

      {/* Trust bar */}
      <TrustBar />

      {/* Closing CTA */}
      <ClosingCTA />
    </>
  );
}
