import { ArrowRight, Clock } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';

import { photo, SIZES } from '@/config/images';
import { articles } from '@/data/proof';
import {
  AspectImage,
  Badge,
  Breadcrumb,
  Button,
  Chip,
  Container,
  Heading,
  Section,
} from '@/ui';

const categories = ['All', 'Buying guide', 'Storage', 'Materials', 'Design Trends'];

export default function MagazineHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCat = searchParams.get('category') ?? 'All';

  const updateCategory = (cat: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (cat === 'All') next.delete('category');
      else next.set('category', cat);
      next.delete('page');
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (selectedCat === 'All') return articles;
    return articles.filter((a) => a.category.toLowerCase() === selectedCat.toLowerCase());
  }, [selectedCat]);

  const featured = articles[0];

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Magazine' }]} />
      </Container>

      {/* Header */}
      <Section pad="sm">
        <Container>
          <div className="max-w-2xl">
            <Badge tone="new">Aangan Living Journal</Badge>
            <Heading as="h1" level="display" className="mt-2">
              Interior Design Guides & Expert Tips
            </Heading>
            <p className="text-body-lg text-surface-600 mt-3 leading-relaxed">
              Actionable buying guides, layout wisdom, material comparisons, and budget breakdowns written by our architects and interior designers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-surface-200 pb-4">
            {categories.map((cat) => (
              <Chip
                key={cat}
                active={selectedCat === cat}
                onClick={() => updateCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Hero Post */}
      {selectedCat === 'All' && featured && (
        <Section pad="sm">
          <Container>
            <div className="overflow-hidden rounded-xl border border-surface-200 bg-surface shadow-md grid gap-8 lg:grid-cols-2 items-center">
              <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-100">
                <AspectImage
                  {...photo(featured.photo, 'landscape', 1280)}
                  sizes={SIZES.card}
                  alt={featured.title}
                  ratio="landscape"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-10 space-y-4">
                <Badge tone="offer">Featured Story</Badge>
                <Heading as="h2" level="h2">
                  <Link to={`/magazine/${featured.slug}`} className="hover:text-primary-600 transition">
                    {featured.title}
                  </Link>
                </Heading>
                <p className="text-body text-surface-600 leading-relaxed text-sm">
                  Smart storage isn't about packing more boxes into a room — it's about engineering dead corners, vertical runs, and multi-functional joinery that leaves walkways open.
                </p>

                <div className="pt-2 flex items-center justify-between text-caption text-surface-600">
                  <span>By {featured.author} · {featured.date}</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="size-3.5" /> {featured.readMinutes} min read
                  </span>
                </div>

                <div className="pt-2">
                  <Button to={`/magazine/${featured.slug}`} iconRight={<ArrowRight className="size-4" />}>
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Articles Grid */}
      <Section pad="md">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-surface-200 bg-surface shadow-xs transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
              >
                <div>
                  <div className="aspect-16/10 w-full overflow-hidden bg-surface-100">
                    <AspectImage
                      {...photo(art.photo, 'landscape', 720)}
                      sizes={SIZES.card}
                      alt={art.title}
                      ratio="landscape"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-caption font-semibold uppercase text-primary-600 tracking-wider text-xs">
                      {art.category}
                    </span>
                    <h3 className="text-h4 font-display font-bold text-secondary-700 mt-2 group-hover:text-primary-600 transition line-clamp-2">
                      <Link to={`/magazine/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-caption text-surface-600 mt-3 flex items-center gap-2">
                      <span>{art.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {art.readMinutes} min read
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/magazine/${art.slug}`}
                    className="text-caption font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
