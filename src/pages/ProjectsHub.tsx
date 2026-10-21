import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { ClosingCTA, TrustBar } from '@/components';
import { projects } from '@/data/projects';
import { Badge, Breadcrumb, Button, Chip, Container, Heading, Section, Select } from '@/ui';

const bhkFilters = ['All', '2 BHK', '3 BHK', '4 BHK'];
const styleFilters = ['All', 'Modern', 'Contemporary', 'Elegant'];
const cityOptions = [
  { value: 'all', label: 'All Cities' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Noida', label: 'Noida' },
  { value: 'Delhi NCR', label: 'Delhi NCR' },
  { value: 'Hyderabad', label: 'Hyderabad' },
];

export default function ProjectsHub() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedBhk = searchParams.get('bhk') ?? 'All';
  const selectedStyle = searchParams.get('style') ?? 'All';
  const selectedCity = searchParams.get('city') ?? 'all';

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === 'All' || value === 'all' || !value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (selectedBhk !== 'All' && !p.config.includes(selectedBhk)) return false;
      if (selectedStyle !== 'All' && p.style.toLowerCase() !== selectedStyle.toLowerCase()) return false;
      if (selectedCity !== 'all' && p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      return true;
    });
  }, [selectedBhk, selectedStyle, selectedCity]);

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Projects' }]} />
      </Container>

      {/* Header */}
      <Section pad="sm">
        <Container>
          <div className="max-w-3xl">
            <Badge tone="new">Delivered Homes</Badge>
            <Heading as="h1" level="display" className="mt-2">
              Homes Designed & Delivered by Aangan
            </Heading>
            <p className="text-body-lg text-surface-600 mt-3 leading-relaxed">
              Explore completed real-life homes across India. Filter by apartment configuration, architectural style, and city to find inspiration for your own floor plan.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-surface-200 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-caption text-surface-600 font-semibold mr-1">BHK:</span>
              {bhkFilters.map((b) => (
                <Chip key={b} active={selectedBhk === b} onClick={() => updateParam('bhk', b)}>
                  {b}
                </Chip>
              ))}

              <span className="text-caption text-surface-600 font-semibold ml-3 mr-1">Style:</span>
              {styleFilters.map((s) => (
                <Chip key={s} active={selectedStyle === s} onClick={() => updateParam('style', s)}>
                  {s}
                </Chip>
              ))}
            </div>

            <div className="w-48">
              <Select
                label="City"
                hideLabel
                options={cityOptions}
                value={selectedCity}
                onChange={(e) => updateParam('city', e.target.value)}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Grid */}
      <Section pad="sm">
        <Container>
          {filtered.length === 0 ? (
            <div className="text-center py-16 border rounded-lg border-surface-200 bg-surface-50">
              <Heading as="h2" level="h3">No matching projects found</Heading>
              <p className="text-body text-surface-600 mt-2">Try clearing your filters to see all completed homes.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  updateParam('bhk', 'All');
                  updateParam('style', 'All');
                  updateParam('city', 'all');
                }}
              >
                Reset all filters
              </Button>
            </div>
          ) : (
            <>
              {/* The cards are h3. Without a heading for the region they would
                  sit directly under the page h1, skipping a level. */}
              <h2 className="sr-only">Completed projects</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* Trust bar */}
      <TrustBar />

      {/* Closing CTA */}
      <ClosingCTA />
    </>
  );
}
