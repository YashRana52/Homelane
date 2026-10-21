import { MapPin, Ruler, Timer } from 'lucide-react';
import { Link } from 'react-router';

import { SIZES, photo } from '@/config/images';
import type { Project } from '@/data/projects';
import { formatIndianNumber } from '@/lib/formatINR';
import { AspectImage, Badge } from '@/ui';

type ProjectCardProps = {
  project: Project;
};

/**
 * A completed home.
 *
 * Unlike DesignCard this one has no actions, so the whole card can be a single
 * link — one tab stop, one large target. The meta row answers the question the
 * showcase exists for: has this company done a home my size, in my city, and
 * how long did it take?
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const img = photo(project.photo, 'landscape', 1080);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-md focus-visible:outline-offset-4"
    >
      <div className="relative">
        <AspectImage
          src={img.src}
          srcSet={img.srcSet}
          sizes={SIZES.card}
          alt=""
          ratio="landscape"
          zoomOnHover
        />
        <span className="pointer-events-none absolute top-3 left-3">
          <Badge tone="onImage">{project.style}</Badge>
        </span>
      </div>

      <div className="pt-3">
        <h3 className="text-h4 font-display group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>

        <ul className="text-caption text-surface-600 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {project.city}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Ruler className="size-3.5 shrink-0" aria-hidden="true" />
            {formatIndianNumber(project.area)} sq ft
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5 shrink-0" aria-hidden="true" />
            {project.days} days
          </li>
        </ul>
      </div>
    </Link>
  );
}
