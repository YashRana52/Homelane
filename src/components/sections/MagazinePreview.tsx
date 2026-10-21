import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router';

import { SIZES, photo } from '@/config/images';
import { articles } from '@/data/proof';
import { AspectImage, Badge, Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * Three recent articles.
 *
 * The read time is shown because it is the thing that decides whether someone
 * opens a buying guide at all, and a nine-minute read labelled as such gets
 * more completions than an unlabelled one.
 */
export function MagazinePreview() {
  return (
    <Section pad="lg" bg="muted">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>The magazine</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2 max-w-[20ch]">
            Worth reading before you spend.
          </Heading>
        </div>
        <Button
          to="/magazine"
          variant="link"
          iconRight={<ArrowRight className="size-4" />}
          className="shrink-0"
        >
          See more
        </Button>
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal as="li" key={article.id} delay={i * 0.06}>
            <Link
              to={`/magazine/${article.slug}`}
              className="group block overflow-hidden rounded-md focus-visible:outline-offset-4"
            >
              <div className="relative">
                <AspectImage
                  {...photo(article.photo, 'landscape', 1080)}
                  sizes={SIZES.card}
                  alt=""
                  ratio="landscape"
                  zoomOnHover
                />
                <span className="pointer-events-none absolute top-3 left-3">
                  <Badge tone="onImage">{article.category}</Badge>
                </span>
              </div>

              <div className="pt-4">
                <h3 className="text-h4 font-display group-hover:text-primary-600 line-clamp-2 transition-colors">
                  {article.title}
                </h3>
                <p className="text-caption text-surface-600 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{article.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {article.readMinutes} min
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
