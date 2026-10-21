import { useId, useState } from 'react';
import { Link } from 'react-router';

import { cityLinks } from '@/config/nav';
import { Button, Heading, Section } from '@/ui';

const COLLAPSED_COUNT = 24;

/**
 * City directory.
 *
 * Collapsed to 24 by default. All 110 are useful to a search engine but
 * nobody scrolls past a hundred town names to reach the footer, so the rest
 * are behind a toggle — rendered, not lazy-loaded, so the expand is instant
 * and the links are in the initial HTML.
 */
export function CityLinkGrid() {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const visible = expanded ? cityLinks : cityLinks.slice(0, COLLAPSED_COUNT);
  const hidden = cityLinks.length - COLLAPSED_COUNT;

  return (
    <Section pad="md" bg="muted">
      <Heading as="h2" level="h3">
        Interior designers near you
      </Heading>

      <ul
        id={listId}
        className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        {visible.map((city) => (
          <li key={city.to}>
            <Link
              to={city.to}
              className="text-caption text-surface-600 hover:text-primary-600 block truncate py-1 transition-colors"
            >
              Interior designers in {city.label}
            </Link>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <Button
          variant="link"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={listId}
          className="mt-4"
        >
          {expanded ? 'Show fewer cities' : `Show all ${cityLinks.length} cities`}
        </Button>
      )}
    </Section>
  );
}
