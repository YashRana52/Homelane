import { ArrowRight } from 'lucide-react';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';
import { Button, Carousel, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * Six completed homes.
 *
 * A carousel below `lg` and a plain grid above it. Six cards fit a 3 × 2 grid
 * on a laptop with room to read each one, and a grid is easier to scan than a
 * row you have to drag; below that the grid would be a very tall stack, so the
 * carousel takes over.
 */
export function ProjectShowcase() {
  return (
    <Section pad="lg" bg="muted" container={false}>
      <div className="site-container flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Delivered</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2 max-w-[20ch]">
            Homes we handed over this year.
          </Heading>
        </div>
        <Button to="/estimate" className="shrink-0" iconRight={<ArrowRight className="size-4" />}>
          Get Free Quote
        </Button>
      </div>

      {/* Carousel up to lg */}
      <div className="site-container mt-8 lg:hidden">
        <Carousel label="Completed projects" perView="card">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Carousel>
      </div>

      {/* Grid from lg */}
      <div className="site-container mt-8 hidden lg:block">
        <ul className="grid grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={Math.min(i * 0.05, 0.25)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
