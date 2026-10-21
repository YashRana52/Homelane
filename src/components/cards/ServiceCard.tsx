import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { SIZES, photo } from '@/config/images';
import type { Service } from '@/data/services';
import { formatLakh } from '@/lib/formatINR';
import { AspectImage, Badge, Heading } from '@/ui';

type ServiceCardProps = {
  service: Service;
};

/**
 * One of the five ways into the business.
 *
 * The whole card is a single link rather than a div with a link inside it, so
 * there is one tab stop and one large touch target instead of a small one
 * buried in the corner. `group` drives the image zoom and the chevron slide
 * from that one hover.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const img = photo(service.photo, 'landscape', 828);

  return (
    <Link
      to={service.to}
      className="group card-lift border-surface-200 hover:border-primary-500 flex h-full flex-col overflow-hidden rounded-md border"
    >
      <div className="relative">
        <AspectImage
          src={img.src}
          srcSet={img.srcSet}
          sizes={SIZES.service}
          alt=""
          ratio="landscape"
          zoomOnHover
        />
        {service.badge && (
          <span className="absolute top-3 left-3">
            <Badge tone="new">{service.badge}</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Heading as="h3" level="h3" className="group-hover:text-primary-600 transition-colors">
          {service.title}
        </Heading>

        <p className="text-body text-surface-600 mt-1.5 flex-1">{service.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {service.startingAt ? (
            <span className="text-caption text-surface-600">
              from <span className="text-body text-secondary-700 font-semibold">
                {formatLakh(service.startingAt)}
              </span>
              <span aria-hidden="true">*</span>
            </span>
          ) : (
            <span />
          )}
          <ChevronRight
            className="text-primary-600 size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
