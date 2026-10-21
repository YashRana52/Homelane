import {
  Check,
  Clock,
  Copy,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';

import { useLeadModal } from '@/components/funnel/leadModalContext';
import { photo, SIZES } from '@/config/images';
import { articles, type Article } from '@/data/proof';
import {
  AspectImage,
  Badge,
  Breadcrumb,
  Button,
  Container,
  Heading,
  Section,
} from '@/ui';

export default function ArticleDetail() {
  const { slug = '' } = useParams();
  const { open } = useLeadModal();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article: Article = useMemo(() => {
    return articles.find((a) => a.slug === slug) ?? articles[0]!;
  }, [slug]);

  const related = useMemo(() => {
    return articles.filter((a) => a.id !== article.id).slice(0, 2);
  }, [article]);

  // Track window scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyUrl = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-surface-200">
        <div
          className="h-full bg-primary-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Magazine', to: '/magazine' }, { label: article.title }]} />
      </Container>

      {/* Article Header */}
      <Section pad="sm">
        <Container className="max-w-4xl">
          <Badge tone="new">{article.category}</Badge>
          <Heading as="h1" level="display" className="mt-3">
            {article.title}
          </Heading>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-caption text-surface-600 border-b border-surface-200 pb-6">
            <span>By <strong className="text-secondary-700">{article.author}</strong></span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="size-3.5" /> {article.readMinutes} min read
            </span>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-surface-200 bg-surface shadow-md">
            <AspectImage
              {...photo(article.photo, 'landscape', 1280)}
              sizes={SIZES.hero}
              alt={article.title}
              ratio="landscape"
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        </Container>
      </Section>

      {/* Article Content with TOC Sidebar */}
      <Section pad="sm">
        <Container className="max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_260px] items-start">
            {/* Main Long-Form Prose */}
            <article className="prose prose-neutral max-w-[72ch] text-body-lg text-surface-600 leading-relaxed space-y-6">
              <p className="lead text-lg font-medium text-secondary-900 leading-relaxed">
                When moving into a new apartment, planning storage and interior finishes is often treated as an afterthought to aesthetic choices like paint and soft furnishings. However, living comfortably requires an understanding of ergonomics, work triangles, and long-term durability.
              </p>

              <h2 id="planning-layouts" className="text-h3 font-display font-bold text-secondary-900 pt-4 scroll-mt-24">
                1. Plan Storage for Everyday Accessibility
              </h2>
              <p>
                In Indian homes, kitchen and bedroom clutter typically stems from poor vertical volume utilisation. Standard builder wardrobes leave 2 to 3 feet of wasted space above the lintel level. Designing floor-to-ceiling lofts with push-to-open latches stores seasonal quilts, luggage, and festival utensils out of sight while keeping daily clothing at eye level.
              </p>

              <div className="rounded-lg bg-surface-50 border-l-4 border-primary-500 p-5 my-6 text-sm">
                <p className="font-semibold text-secondary-900 m-0">Pro Tip from Our Lead Architect:</p>
                <p className="text-surface-600 m-0 mt-1">
                  "Always opt for tandem drawers in the kitchen base rather than deep shelves. You shouldn't have to bend down and fish out heavy pressure cookers from the dark depths of a 24-inch shelf."
                </p>
              </div>

              <h2 id="material-science" className="text-h3 font-display font-bold text-secondary-900 pt-4 scroll-mt-24">
                2. Match the Material to Room Moisture Levels
              </h2>
              <p>
                Not all engineered boards behave equally when exposed to water or steam. For wet areas such as the under-sink cabinet or bathroom vanities, Boiling Waterproof (BWP) marine grade ply is essential. For living room TV units, display credenzas, and bedroom wardrobes, High-Density High-Moisture-Resistance (HDHMR) boards provide superior screw-holding strength and a flatter substrate for high-gloss acrylic finishes.
              </p>

              {/* In-article Lead CTA Box */}
              <div className="rounded-xl bg-primary-50 border border-primary-200 p-6 sm:p-8 my-8 text-center not-prose">
                <Sparkles className="size-8 text-primary-500 mx-auto" />
                <h3 className="text-h3 font-display font-bold text-secondary-900 mt-2">
                  Want expert guidance on your floor plan?
                </h3>
                <p className="text-body text-surface-600 mt-2 text-sm max-w-md mx-auto">
                  Book a free design consultation with an Aangan interior designer. Get instant 3D renders and cost estimates with zero obligation.
                </p>
                <Button
                  size="md"
                  className="mt-4"
                  onClick={() =>
                    open({
                      source: `article:${article.slug}`,
                      title: 'Consult an Interior Expert',
                      description: 'We will review your floor plan and share practical advice.',
                    })
                  }
                >
                  Book Free Design Consultation
                </Button>
              </div>

              <h2 id="contracts-and-warranty" className="text-h3 font-display font-bold text-secondary-900 pt-4 scroll-mt-24">
                3. Ensure Fixed Contracts and Written Warranties
              </h2>
              <p>
                The single biggest complaint homeowners have with unorganised contractors is unexpected cost escalation mid-way through execution. Ensure that your quotation explicitly itemises board thickness, hardware brands (such as Hettich or Blum), and includes a signed 10-year warranty with a strict 45-day handover penalty clause.
              </p>

              {/* Share Bar */}
              <div className="pt-8 border-t border-surface-200 not-prose flex flex-wrap items-center justify-between gap-4">
                <span className="text-caption font-semibold text-secondary-700">Share this guide:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="flex items-center gap-1.5 rounded-sm border border-surface-200 px-3 py-1.5 text-caption text-surface-600 hover:border-surface-400"
                  >
                    {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                    <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-items-center rounded-sm bg-success text-white hover:opacity-90"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="size-4" />
                  </a>
                </div>
              </div>
            </article>

            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block sticky top-28 rounded-lg border border-surface-200 bg-surface p-5 shadow-xs">
              <span className="text-caption font-semibold uppercase tracking-wider text-surface-600 block mb-3 text-xs">
                In this article
              </span>
              <nav className="space-y-2 text-sm">
                <a
                  href="#planning-layouts"
                  className="block text-surface-600 hover:text-primary-600 transition leading-snug py-1 border-l-2 border-transparent hover:border-primary-500 pl-2"
                >
                  1. Plan Storage
                </a>
                <a
                  href="#material-science"
                  className="block text-surface-600 hover:text-primary-600 transition leading-snug py-1 border-l-2 border-transparent hover:border-primary-500 pl-2"
                >
                  2. Material Science
                </a>
                <a
                  href="#contracts-and-warranty"
                  className="block text-surface-600 hover:text-primary-600 transition leading-snug py-1 border-l-2 border-transparent hover:border-primary-500 pl-2"
                >
                  3. Contracts & Warranty
                </a>
              </nav>

              <div className="mt-8 border-t border-surface-100 pt-4">
                <Button to="/price-calculator" variant="outline" size="sm" fullWidth>
                  Price Calculators
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      <Section pad="md" bg="surface">
        <Container className="max-w-5xl">
          <Heading as="h2" level="h3" className="mb-6">
            Related Guides
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((art) => (
              <div key={art.id} className="rounded-lg border border-surface-200 bg-surface p-5 flex gap-4 items-center">
                <div className="aspect-square w-24 rounded-md overflow-hidden bg-surface-100 shrink-0">
                  <AspectImage {...photo(art.photo, 'square', 200)} sizes="96px" alt={art.title} ratio="square" />
                </div>
                <div>
                  <span className="text-caption font-semibold uppercase text-primary-600 text-xs">{art.category}</span>
                  <h4 className="text-body font-display font-bold text-secondary-700 mt-1 line-clamp-2">
                    <Link to={`/magazine/${art.slug}`} className="hover:text-primary-600">{art.title}</Link>
                  </h4>
                  <span className="text-caption text-surface-600 mt-1 block">{art.readMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
