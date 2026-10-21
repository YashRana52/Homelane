import { ArrowRight } from 'lucide-react';

import { faqs } from '@/data/proof';
import { Accordion, Button, Eyebrow, Heading, Section } from '@/ui';

/**
 * Six questions.
 *
 * Single-open mode: with six long answers, letting them all expand turns the
 * section into a wall of text that pushes everything below it off screen.
 */
export function FaqSection() {
  return (
    <Section pad="lg">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2">
            The things people ask first.
          </Heading>
          <p className="text-body text-surface-600 mt-3">
            Still unsure about something? A designer can answer it in the free
            session.
          </p>
          <Button
            to="/contact"
            variant="outline"
            className="mt-6"
            iconRight={<ArrowRight className="size-4" />}
          >
            Ask us directly
          </Button>
        </div>

        <Accordion
          mode="single"
          defaultOpen={['start']}
          items={faqs.map((faq) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
          }))}
        />
      </div>
    </Section>
  );
}
