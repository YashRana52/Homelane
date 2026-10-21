import { ArrowRight } from 'lucide-react';

import { sessionSteps } from '@/data/process';
import { Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * What happens in the free design session.
 *
 * A vertical timeline on mobile and a horizontal one from `md`. The connector
 * line is drawn with a pseudo-element on each item rather than a single
 * absolutely-positioned rule, so it cannot drift out of alignment when the
 * labels wrap to different heights.
 */
export function DesignSessionSteps() {
  return (
    <Section pad="lg">
      <div className="max-w-2xl">
        <Eyebrow>Before you commit</Eyebrow>
        <Heading as="h2" level="h2" className="mt-2">
          What is a design session?
        </Heading>
        <p className="text-body-lg text-surface-600 mt-3">
          Ninety minutes, free, and you leave with drawings and a number whether
          or not you go ahead.
        </p>
      </div>

      <ol className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-4">
        {sessionSteps.map((step, i) => (
          <Reveal as="li" key={step.id} delay={i * 0.07}>
            <div className="flex gap-4 md:block">
              <div className="flex shrink-0 flex-col items-center md:w-full md:flex-row">
                <span className="bg-primary-500 text-on-primary text-btn grid size-10 shrink-0 place-items-center rounded-full font-semibold">
                  {i + 1}
                </span>
                {/* Connector: vertical on mobile, horizontal from md. */}
                <span
                  aria-hidden="true"
                  className={
                    i === sessionSteps.length - 1
                      ? 'bg-surface-200 mt-2 w-0.5 flex-1 md:hidden'
                      : 'bg-surface-200 mt-2 w-0.5 flex-1 md:mt-0 md:ml-3 md:h-0.5 md:w-auto md:flex-1'
                  }
                />
              </div>

              <div className="pb-2 md:mt-4">
                <Heading as="h3" level="h4">
                  {step.title}
                </Heading>
                <p className="text-body text-surface-600 mt-1.5">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Button to="/estimate" size="lg" className="mt-8" iconRight={<ArrowRight className="size-4" />}>
        Book a free design session
      </Button>
    </Section>
  );
}
