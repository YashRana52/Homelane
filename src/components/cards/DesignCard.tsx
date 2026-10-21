import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { SIZES, photo } from '@/config/images';
import { designPath, type Design } from '@/data/designs';
import { cn } from '@/lib/cn';
import { estimateEMI, formatINR } from '@/lib/formatINR';
import { AspectImage, Badge, Button } from '@/ui';

type DesignCardProps = {
  design: Design;
  /** Eager-load the first card or two of an above-the-fold row. */
  priority?: boolean;
  className?: string;
};

/**
 * A catalogue design.
 *
 * The card carries two actions, so it is not wrapped in one big link — a link
 * inside a link is invalid and a button inside one swallows its own clicks.
 *
 * Instead there are two links to the same place: the photo, which is a large
 * mouse target but is `aria-hidden` and removed from the tab order, and the
 * title, which is the real one. That keeps the card to three tab stops rather
 * than five, without the brittle offset maths a stretched `::after` needs to
 * avoid covering the buttons.
 */
export function DesignCard({ design, priority = false, className }: DesignCardProps) {
  const [saved, setSaved] = useState(false);
  const img = photo(design.photo, 'landscape', 1080);
  const emi = design.price ? estimateEMI(design.price) : null;

  return (
    <article
      className={cn(
        'group card-lift border-surface-200 bg-surface relative flex h-full flex-col overflow-hidden rounded-md border',
        className,
      )}
    >
      <div className="relative">
        <Link to={designPath(design)} tabIndex={-1} aria-hidden="true" className="block">
          <AspectImage
            src={img.src}
            srcSet={img.srcSet}
            sizes={SIZES.card}
            alt=""
            ratio="landscape"
            priority={priority}
            zoomOnHover
          />
        </Link>

        {design.tags.length > 0 && (
          <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
            {design.tags.map((tag) => (
              <Badge key={tag} tone="onImage">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Sits above the stretched title link, so it stays clickable. */}
      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        aria-pressed={saved}
        className="bg-surface/92 hover:bg-surface absolute top-2.5 right-2.5 z-10 grid size-9 place-items-center rounded-full backdrop-blur-sm transition-colors"
      >
        <Heart
          className={cn(
            'size-4 transition-colors',
            saved ? 'fill-primary-500 text-primary-500' : 'text-secondary-700',
          )}
          aria-hidden="true"
        />
        <span className="sr-only">
          {saved ? 'Remove' : 'Save'} “{design.title}”
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-h4 font-display">
          <Link
            to={designPath(design)}
            className="group-hover:text-primary-600 line-clamp-2 transition-colors"
          >
            {design.title}
          </Link>
        </h3>

        <dl className="mt-2 flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
          {design.price && (
            <>
              <dt className="sr-only">Price</dt>
              <dd className="text-h4 font-display">
                {formatINR(design.price)}
                <span aria-hidden="true" className="text-surface-600">
                  *
                </span>
              </dd>
            </>
          )}
          {design.size && (
            <>
              <dt className="sr-only">Room size</dt>
              <dd className="text-caption text-surface-600">Size: {design.size}</dd>
            </>
          )}
        </dl>

        {emi && (
          <p className="text-caption text-surface-600 mt-1">
            EMI from <span className="font-semibold">{formatINR(emi)}</span>/month
          </p>
        )}

        {/* Stacked, not side by side: at card width a two-up row cannot hold
            "Book Free Consultation" without truncating it, and shortening the
            label to fit would weaken the one action that converts. */}
        <div className="mt-4 space-y-2">
          <Button to="/estimate" size="sm" fullWidth>
            Book Free Consultation
          </Button>
          <Button to="/price-calculator/kitchen" size="sm" variant="outline" fullWidth>
            Get Quote
          </Button>
        </div>
      </div>
    </article>
  );
}
