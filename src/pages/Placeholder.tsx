import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router';

import { Badge, Button, Eyebrow, Heading, Section } from '@/ui';

type PlaceholderProps = {
  title: string;
  /** Which phase of PLAN.md builds this page for real. */
  phase: number;
  description: string;
  /** Route params worth echoing back, to prove the route matched. */
  showParams?: boolean;
};

/**
 * Stand-in for a route whose page is built in a later phase.
 *
 * It renders inside the real layout, so the header, footer and floating CTA
 * are exercised on every route from Phase 2 onward rather than only on the
 * pages that happen to exist yet.
 */
export function Placeholder({ title, phase, description, showParams }: PlaceholderProps) {
  const params = useParams();
  const entries = Object.entries(params).filter(([, value]) => value);

  return (
    <Section pad="lg" container="narrow">
      <Eyebrow>Phase {phase}</Eyebrow>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Heading as="h1" level="display">
          {title}
        </Heading>
        <Badge tone="offer">Not built yet</Badge>
      </div>

      <p className="text-body-lg text-surface-600 mt-4 max-w-prose">{description}</p>

      {showParams && entries.length > 0 && (
        <dl className="bg-surface-50 rounded-md mt-6 grid gap-2 p-4 sm:grid-cols-2">
          {entries.map(([key, value]) => (
            <div key={key}>
              <dt className="text-caption text-surface-600 font-mono">{key}</dt>
              <dd className="text-body font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="text-caption text-surface-600 mt-6">
        The header, footer and floating CTA on this page are the real ones — see PLAN.md §7 for
        what fills the middle.
      </p>

      <Button to="/" variant="outline" iconLeft={<ArrowLeft className="size-4" />} className="mt-8">
        Back home
      </Button>
    </Section>
  );
}
