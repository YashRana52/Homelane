import { Quote } from 'lucide-react';
import { useId, useState } from 'react';

import type { Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/cn';
import { Rating } from '@/ui';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

/**
 * One customer review.
 *
 * Long quotes clamp to four lines with a "read more" toggle rather than being
 * truncated in the data — the full text stays in the DOM, so it is available
 * to a screen reader and to find-in-page either way, and a row of cards keeps
 * a consistent height until someone asks for more.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();

  return (
    <figure className="bg-surface border-surface-200 flex h-full flex-col rounded-md border p-6">
      <Quote className="text-primary-200 size-8 shrink-0" aria-hidden="true" />

      <blockquote className="mt-3 flex-1">
        <p id={quoteId} className={cn('text-body text-surface-600', !expanded && 'line-clamp-4')}>
          {testimonial.quote}
        </p>
      </blockquote>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className="text-caption text-primary-600 hover:text-primary-700 mt-2 self-start font-semibold transition-colors"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>

      <figcaption className="border-surface-200 mt-5 border-t pt-4">
        <Rating value={testimonial.rating} size="sm" showValue={false} />
        <p className="text-body mt-2 font-semibold">{testimonial.name}</p>
        <p className="text-caption text-surface-600">
          {testimonial.city} · {testimonial.scope}
        </p>
      </figcaption>
    </figure>
  );
}
