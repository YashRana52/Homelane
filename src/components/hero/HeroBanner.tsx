import type { LucideIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { PHOTOS, PLACEHOLDER_GRADIENT, pictureSources, type PhotoKey } from '@/config/images';
import { cn } from '@/lib/cn';
import { Badge, Button, Heading } from '@/ui';

export type HeroTrustItem = {
  icon: LucideIcon;
  label: string;
};

type HeroBannerProps = {
  photo: PhotoKey;
  /** Describe the photo, or pass "" when the heading already says it. */
  photoAlt?: string;
  badge?: string;
  title: ReactNode;
  subtitle: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  /** Small icon row under the actions. Three items is the most that fits. */
  trust?: readonly HeroTrustItem[];
  className?: string;
};

/**
 * Full-bleed hero.
 *
 * The photo is a `<picture>` with three art-directed crops rather than one
 * image stretched by `object-fit`: a 21:9 frame cropped to a 424px-tall phone
 * viewport loses most of the room, so phones get a near-square crop and a much
 * smaller file.
 *
 * Two scrims, not one. The vertical scrim covers the copy at the bottom on
 * every size; the horizontal one only appears from `lg`, where the copy moves
 * to the left half and the right side of the photo should stay visible.
 * Interior photography is bright and warm, so a single gentle wash leaves
 * white text short of 4.5:1 over a pale wall.
 */
export function HeroBanner({
  photo,
  photoAlt = '',
  badge,
  title,
  subtitle,
  primary,
  secondary,
  trust,
  className,
}: HeroBannerProps) {
  const [loaded, setLoaded] = useState(false);
  const { sources, fallback } = pictureSources(PHOTOS[photo]);

  return (
    <section
      className={cn(
        'relative isolate flex min-h-[424px] items-end overflow-hidden',
        'md:min-h-[520px] lg:min-h-[min(87vh,800px)]',
        className,
      )}
      style={{ background: loaded ? undefined : PLACEHOLDER_GRADIENT }}
    >
      <picture className="absolute inset-0 -z-10">
        {sources.map((source) => (
          <source
            key={source.media}
            media={source.media}
            srcSet={source.srcSet}
            sizes="100vw"
          />
        ))}
        <img
          src={fallback}
          alt={photoAlt}
          // The hero is the largest-contentful paint on this page; it must not
          // wait behind lazy images further down.
          fetchPriority="high"
          decoding="sync"
          onLoad={() => setLoaded(true)}
          ref={(node) => {
            if (node?.complete) setLoaded(true);
          }}
          className={cn(
            'size-full object-cover',
            // Settles from 1.08 to 1 once decoded. A slow ease over 1.2s
            // reads as the frame coming to rest rather than as an animation,
            // and because it is a transform it cannot shift the layout.
            'ease-soft transition-transform duration-[1200ms] will-change-transform',
            loaded ? 'scale-100' : 'scale-[1.08]',
            'motion-reduce:transition-none motion-reduce:scale-100',
          )}
        />
      </picture>

      <div className="image-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="image-scrim-left absolute inset-0 -z-10 hidden lg:block"
        aria-hidden="true"
      />

      <div className="site-container pt-24 pb-12 lg:pb-20">
        {/* Staggered entrance. `heroRise` is a plain CSS animation rather than
            a Motion variant: this is the largest-contentful paint, and a
            JS-driven animation would hold the text until hydration. */}
        <div className="max-w-2xl">
          {badge && (
            <span className="hero-rise block" style={{ animationDelay: '40ms' }}>
              <Badge tone="onImage">{badge}</Badge>
            </span>
          )}

          <Heading
            as="h1"
            level="display"
            className={cn('hero-rise text-white', badge && 'mt-4')}
            style={{ animationDelay: '120ms' }}
          >
            {title}
          </Heading>

          <p
            className="hero-rise text-body-lg mt-4 max-w-prose text-white/90"
            style={{ animationDelay: '220ms' }}
          >
            {subtitle}
          </p>

          <div
            className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: '320ms' }}
          >
            <Button to={primary.to} size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} size="lg" variant="onImage">
                {secondary.label}
              </Button>
            )}
          </div>

          {trust && trust.length > 0 && (
            <ul
              className="hero-rise mt-7 flex flex-wrap gap-x-6 gap-y-3"
              style={{ animationDelay: '420ms' }}
            >
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="text-caption flex items-center gap-2 text-white/90">
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
