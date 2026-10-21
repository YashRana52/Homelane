import { Filter, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';

import { DesignCard } from '@/components/cards/DesignCard';
import { useLeadModal } from '@/components/funnel/leadModalContext';
import { TrustBar } from '@/components/sections/TrustBar';
import { designs } from '@/data/designs';
import { rooms } from '@/data/rooms';
import {
  Badge,
  Breadcrumb,
  Button,
  Chip,
  Container,
  Heading,
  Modal,
  Pagination,
  Section,
  Select,
} from '@/ui';

const ITEMS_PER_PAGE = 8;

const layoutFilters = ['All', 'L-Shaped', 'Straight', 'Parallel', 'U-Shaped', 'Island'];
const budgetFilters = [
  { label: 'All Budgets', value: 'all' },
  { label: 'Under ₹3 Lakh', value: 'under-3' },
  { label: '₹3L – ₹6 Lakh', value: '3-6' },
  { label: 'Above ₹6 Lakh', value: 'above-6' },
];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function CategoryListing() {
  const { category = 'modular-kitchen' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { open } = useLeadModal();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const room = rooms.find((r) => r.id === category) ?? {
    id: category,
    label: category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    to: `/design-ideas/${category}`,
    photo: 'roomKitchen' as const,
    designCount: 3387,
  };

  const selectedLayout = searchParams.get('layout') ?? 'All';
  const selectedBudget = searchParams.get('budget') ?? 'all';
  const selectedSort = searchParams.get('sort') ?? 'featured';
  const currentPage = Math.max(1, Number(searchParams.get('page') || 1));

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === 'All' || value === 'all' || !value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      next.delete('page'); // Reset to page 1 on filter change
      return next;
    });
  };

  // Filter matching designs
  const filtered = useMemo(() => {
    // If specific designs match the category, use them, otherwise sample from designs catalogue
    let pool = designs.filter((d) => d.category === category);
    if (pool.length === 0) {
      pool = [...designs];
    }

    if (selectedLayout !== 'All') {
      pool = pool.filter((d) => d.tags.some((t) => t.toLowerCase().includes(selectedLayout.toLowerCase())));
    }

    if (selectedBudget === 'under-3') {
      pool = pool.filter((d) => (d.price ?? 400_000) < 300_000);
    } else if (selectedBudget === '3-6') {
      pool = pool.filter((d) => {
        const p = d.price ?? 400_000;
        return p >= 300_000 && p <= 600_000;
      });
    } else if (selectedBudget === 'above-6') {
      pool = pool.filter((d) => (d.price ?? 400_000) > 600_000);
    }

    if (selectedSort === 'price-asc') {
      pool = [...pool].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (selectedSort === 'price-desc') {
      pool = [...pool].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return pool;
  }, [category, selectedLayout, selectedBudget, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Design Ideas', to: '/design-ideas' }, { label: room.label }]} />
      </Container>

      {/* Header */}
      <Section pad="sm">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge tone="new">Verified Catalogue</Badge>
              <Heading as="h1" level="display" className="mt-2">
                {room.label} Designs
              </Heading>
              <p className="text-body text-surface-600 mt-2">
                Showing {filtered.length * 84 + 120} results for {room.label}. Every design is customisable to your exact wall measurements and budget.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setMobileFilterOpen(true)}
                iconLeft={<Filter className="size-4" />}
              >
                Filters
              </Button>
              <div className="w-48">
                <Select
                  label="Sort by"
                  hideLabel
                  options={sortOptions}
                  value={selectedSort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Desktop Filter Chip Row */}
          <div className="mt-6 hidden md:flex flex-wrap items-center gap-2 border-y border-surface-200 py-3">
            <span className="text-caption text-surface-600 font-semibold mr-2">Layout:</span>
            {layoutFilters.map((layout) => (
              <Chip
                key={layout}
                active={selectedLayout === layout}
                onClick={() => updateParam('layout', layout)}
              >
                {layout}
              </Chip>
            ))}

            <span className="text-caption text-surface-600 font-semibold ml-4 mr-2">Budget:</span>
            {budgetFilters.map((b) => (
              <Chip
                key={b.value}
                active={selectedBudget === b.value}
                onClick={() => updateParam('budget', b.value)}
              >
                {b.label}
              </Chip>
            ))}

            {(selectedLayout !== 'All' || selectedBudget !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  updateParam('layout', 'All');
                  updateParam('budget', 'all');
                }}
                className="ml-auto text-primary-600"
                iconLeft={<X className="size-3.5" />}
              >
                Reset filters
              </Button>
            )}
          </div>
        </Container>
      </Section>

      {/* Main Grid with Injected Promo Block */}
      <Section pad="sm">
        <Container>
          <h2 className="sr-only">Design results</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((design, idx) => (
              <div key={design.id} className="contents">
                {/* The first two cards are the largest-contentful paint on a
                    phone. Leaving them lazy puts LCP behind the whole image
                    queue — measured at 4.5s on a throttled connection. */}
                <DesignCard design={design} priority={idx < 2} />

                {/* Injected Promo Block every 4th or 8th card */}
                {idx === 3 && (
                  <div className="col-span-full rounded-lg bg-gradient-to-r from-secondary-700 to-secondary-900 p-6 sm:p-8 text-white my-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <span className="text-caption uppercase tracking-wider text-primary-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="size-4" /> Free 3D Design Session
                      </span>
                      <h2 className="text-h3 font-display mt-2 font-bold text-white">
                        Can't find the exact {room.label.toLowerCase()} size?
                      </h2>
                      <p className="text-body text-surface-200 mt-2 text-sm leading-relaxed">
                        Our interior designers will custom-design your {room.label.toLowerCase()} to your exact floor plan with photorealistic 3D renders and zero obligation.
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() =>
                        open({
                          source: `category-promo:${category}`,
                          title: `Book a Free ${room.label} Design Session`,
                          description: 'Meet an expert designer at a studio or online for custom 3D renders.',
                        })
                      }
                      className="shrink-0"
                    >
                      Book Free Consultation
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={(p) => {
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('page', String(p));
                    return next;
                  });
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* "What are you looking for?" Sub-Category Navigation */}
      <Section pad="md" bg="surface">
        <Container>
          <Heading as="h2" level="h3" className="mb-6">
            What are you looking for in {room.label}?
          </Heading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {rooms.slice(0, 6).map((r) => (
              <Link
                key={r.id}
                to={r.to}
                className="group border border-surface-200 hover:border-primary-400 bg-surface rounded-md p-3 text-center transition-all hover:shadow-xs"
              >
                <span className="text-caption font-semibold text-secondary-700 block group-hover:text-primary-600">
                  {r.label}
                </span>
                <span className="text-[11px] text-surface-600 block mt-0.5">
                  {r.designCount} designs
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust & SEO Block */}
      <TrustBar />

      <Section pad="md">
        <Container className="max-w-4xl prose prose-neutral">
          <Heading as="h2" level="h4">
            How to Choose the Best {room.label} Design
          </Heading>
          <p className="text-body text-surface-600 mt-2 text-sm leading-relaxed">
            When designing your {room.label.toLowerCase()}, balancing aesthetics with durability and smart storage is paramount. Whether you prefer an efficient layout for compact urban apartments or an expansive layout with built-in appliances, Aangan Interiors provides precision factory-cut cabinetry, soft-close hardware, and moisture-resistant finishes tailored specifically for Indian living conditions.
          </p>
        </Container>
      </Section>

      {/* Mobile Filter Bottom Sheet */}
      <Modal
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Designs"
      >
        <div className="space-y-6 py-2">
          <div>
            <h4 className="text-caption font-semibold text-secondary-700 mb-2">Layout Shape</h4>
            <div className="flex flex-wrap gap-2">
              {layoutFilters.map((l) => (
                <Chip
                  key={l}
                  active={selectedLayout === l}
                  onClick={() => updateParam('layout', l)}
                >
                  {l}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-caption font-semibold text-secondary-700 mb-2">Budget Range</h4>
            <div className="flex flex-wrap gap-2">
              {budgetFilters.map((b) => (
                <Chip
                  key={b.value}
                  active={selectedBudget === b.value}
                  onClick={() => updateParam('budget', b.value)}
                >
                  {b.label}
                </Chip>
              ))}
            </div>
          </div>

          <Button fullWidth onClick={() => setMobileFilterOpen(false)} className="mt-4">
            Apply Filters
          </Button>
        </div>
      </Modal>
    </>
  );
}
