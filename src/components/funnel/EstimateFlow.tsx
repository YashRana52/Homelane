import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react';

import { useStepper } from '@/hooks/useStepper';
import { formatLakh } from '@/lib/formatINR';
import { Button, Container, Heading, ProgressBar, Section } from '@/ui';

import { LeadForm } from './LeadForm';
import { OptionCardGroup } from './OptionCardGroup';

const floorplans = [
  { id: '1bhk', label: '1 BHK', from: 219_000 },
  { id: '2bhk', label: '2 BHK', from: 357_000 },
  { id: '3bhk', label: '3 BHK', from: 423_000 },
  { id: '3plus', label: '3+ BHK', from: 481_000 },
] as const;

const purposes = [
  { id: 'move-in', label: 'Move In', description: 'You will live here yourself.', factor: 1 },
  { id: 'rent-out', label: 'Rent Out', description: 'Hard-wearing and lower cost.', factor: 0.82 },
  { id: 'renovate', label: 'Renovate', description: 'Already lived in, being upgraded.', factor: 1.15 },
] as const;

type EstimateValues = {
  floorplan: string | null;
  purpose: string | null;
};

/**
 * The thirty-second funnel.
 *
 * Two questions before any contact details are asked, both answerable in one
 * tap. The range appears as soon as both are picked, so the form on step two
 * is asking for a phone number *in exchange for* something already given
 * rather than ahead of it.
 */
export function EstimateFlow() {
  const { step, values, setValues, next, back, reset, isFirst } = useStepper<EstimateValues>({
    totalSteps: 2,
    storageKey: 'aangan.estimate',
    initialValues: { floorplan: null, purpose: null },
  });

  const plan = floorplans.find((f) => f.id === values.floorplan);
  const purpose = purposes.find((p) => p.id === values.purpose);
  const range =
    plan && purpose
      ? { low: Math.round(plan.from * purpose.factor), high: Math.round(plan.from * purpose.factor * 1.45) }
      : null;

  const canAdvance = Boolean(values.floorplan && values.purpose);

  return (
    <Section pad="lg" bg="muted" container={false}>
      <Container className="max-w-3xl">
        <div className="text-center">
          <Heading as="h1" level="h2">
            Get your free estimate in under 30 seconds.
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3">
            Share your preferences and we will show you a realistic range.
          </p>
        </div>

        <div className="bg-surface border-surface-200 rounded-lg mt-8 border p-6 lg:p-8">
          <ProgressBar step={step} total={2} />

          {step === 1 ? (
            <div className="mt-6 space-y-8">
              <div>
                <Heading as="h2" level="h3">
                  Your floorplan
                </Heading>
                <OptionCardGroup
                  legend="Your floorplan"
                  className="mt-4"
                  options={floorplans.map((f) => ({ id: f.id, label: f.label }))}
                  value={values.floorplan}
                  onChange={(floorplan) => setValues({ floorplan })}
                  columns="wide"
                />
              </div>

              <div>
                <Heading as="h2" level="h3">
                  Purpose
                </Heading>
                <OptionCardGroup
                  legend="Purpose"
                  className="mt-4"
                  options={purposes.map((p) => ({
                    id: p.id,
                    label: p.label,
                    description: p.description,
                  }))}
                  value={values.purpose}
                  onChange={(purpose) => setValues({ purpose })}
                  columns="wide"
                />
              </div>

              {range && (
                <div className="bg-primary-50 rounded-md p-5 text-center">
                  <p className="text-caption text-surface-600">
                    {plan?.label} · {purpose?.label} — indicative range
                  </p>
                  <p className="text-h2 font-display mt-1">
                    {formatLakh(range.low)} – {formatLakh(range.high)}
                    <span className="text-surface-600 align-super text-base" aria-hidden="true">
                      *
                    </span>
                  </p>
                </div>
              )}

              <Button
                size="lg"
                fullWidth
                onClick={next}
                disabled={!canAdvance}
                iconRight={<ArrowRight className="size-4" />}
              >
                {canAdvance ? 'Get my detailed estimate' : 'Pick both to continue'}
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <Button variant="link" onClick={back} iconLeft={<ArrowLeft className="size-4" />}>
                Back to your choices
              </Button>

              {range && (
                <p className="text-body text-surface-600 mt-4">
                  Your {plan?.label} estimate is{' '}
                  <span className="text-secondary-700 font-semibold">
                    {formatLakh(range.low)} – {formatLakh(range.high)}
                  </span>
                  . Leave your number and a designer will break it down room by room.
                </p>
              )}

              <div className="mt-6">
                <LeadForm
                  source={`estimate-flow:${values.floorplan}:${values.purpose}`}
                  submitLabel="Send me the detailed estimate"
                  renderSuccess={(lead) => (
                    <div className="py-4 text-center">
                      <div className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
                        <Check className="size-6" />
                      </div>
                      <Heading as="h3" level="h3" className="mt-4">
                        Here is your estimate, {lead.name.split(' ')[0]}!
                      </Heading>
                      <p className="text-body text-surface-600 mx-auto mt-2 max-w-md">
                        We have sent the indicative estimate and room-by-room breakdown to{' '}
                        <span className="text-secondary-700 font-semibold">{lead.phone}</span>.
                      </p>

                      {range && (
                        <div className="bg-primary-50 border-primary-200 mt-6 rounded-md border p-6 text-center">
                          <p className="text-caption text-surface-600 uppercase tracking-wider font-semibold">
                            {plan?.label} ({purpose?.label}) · Indicative Estimate Range
                          </p>
                          <p className="text-display font-display text-primary-600 mt-2">
                            {formatLakh(range.low)} – {formatLakh(range.high)}
                            <span className="text-surface-600 align-super text-base" aria-hidden="true">
                              *
                            </span>
                          </p>
                          <p className="text-caption text-surface-600 mt-2">
                            Estimated EMI from ₹{Math.round((range.low * 0.0095)).toLocaleString('en-IN')}/month
                          </p>
                        </div>
                      )}

                      <div className="bg-surface-50 border-surface-200 mt-6 rounded-md border p-4 text-left">
                        <p className="text-caption text-surface-600 font-semibold uppercase">What happens next?</p>
                        <ul className="text-body text-surface-600 mt-2 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">1.</span>
                            <span>A dedicated designer will call you within 24 hours to understand your exact floor plan.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">2.</span>
                            <span>Get free 3D design renders and a transparent line-item quote with 0 obligation.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button to="/design-ideas" variant="outline">
                          Browse Design Ideas
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            reset();
                          }}
                        >
                          Calculate another
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-caption text-surface-600 mt-5 flex items-center justify-center gap-2">
          <Clock className="size-3.5" aria-hidden="true" />
          Two questions, then your number. Nothing before that.
        </p>

        <p className="text-caption text-surface-600 mt-3 text-center">
          * Indicative only. The calculators and a design session give a tighter figure.
        </p>

        {isFirst && <span className="sr-only">Step 1 of 2</span>}
      </Container>
    </Section>
  );
}
