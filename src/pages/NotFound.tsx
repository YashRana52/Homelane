import { Link } from 'react-router';

import { designIdeaLinks } from '@/config/nav';
import { Button, Eyebrow, Heading, Section } from '@/ui';

export default function NotFound() {
  return (
    <Section pad="lg" container="narrow">
      <Eyebrow>Error 404</Eyebrow>
      <Heading as="h1" level="display" className="mt-2">
        We could not find that page.
      </Heading>
      <p className="text-body-lg text-surface-600 mt-4 max-w-prose">
        The link may be out of date, or the page may have moved. Here are a few places people
        usually want instead.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Back home</Button>
        <Button to="/design-ideas" variant="outline">
          Browse design ideas
        </Button>
        <Button to="/estimate" variant="outline">
          Get a free estimate
        </Button>
      </div>

      <div className="mt-12">
        <p className="text-eyebrow text-surface-600 mb-3 uppercase">Popular categories</p>
        <ul className="flex flex-wrap gap-2">
          {designIdeaLinks.slice(0, 10).map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-caption rounded-pill bg-surface-50 hover:bg-surface-100 inline-flex min-h-9 items-center px-3 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
