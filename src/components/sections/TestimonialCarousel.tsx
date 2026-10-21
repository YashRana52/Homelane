import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { brand, trustStats } from '@/config/brand';
import { testimonials } from '@/data/testimonials';
import { Carousel, Eyebrow, Heading, Rating, Section } from '@/ui';

/**
 * Sixteen reviews, plus the aggregate rating.
 *
 * The rating block sits beside the heading rather than in its own band: a
 * score is only meaningful next to the reviews it summarises, and splitting
 * them makes the number look like a badge rather than a summary.
 */
export function TestimonialCarousel() {
  const average =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <Section pad="lg" container={false}>
      <div className="site-container flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>In their words</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2">
            No sales pitch. Just the homes.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3">
            Every review below is from a delivered project, including the ones
            that did not go perfectly.
          </p>
        </div>

        <div className="bg-surface-50 rounded-md shrink-0 p-5">
          <p className="text-display font-display leading-none">{average.toFixed(1)}</p>
          <Rating value={average} size="sm" showValue={false} className="mt-2" />
          <p className="text-caption text-surface-600 mt-2">
            {trustStats.googleReviewCount.toLocaleString('en-IN')}+ reviews
          </p>
          <p className="text-caption text-surface-600">across {brand.name} studios</p>
        </div>
      </div>

      <div className="site-container mt-8">
        <Carousel label="Customer reviews" perView="testimonial">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
