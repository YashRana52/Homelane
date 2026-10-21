import { Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

import { SIZES, photo } from '@/config/images';
import { processSteps } from '@/data/process';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { AspectImage, Badge, Eyebrow, Heading, Section } from '@/ui';

/**
 * The six-step delivery process, as an interactive stepper.
 *
 * Two layouts from one state. Above `lg` it is a tablist: a numbered rail with
 * a roving tabindex, arrow-key navigation, and a panel that cross-fades. Below
 * `lg` the same six steps become an accordion, because a horizontal rail of
 * six labels on a phone is either unreadable or needs scrolling, and the
 * content panel would push the rail off screen anyway.
 *
 * Both layouts are in the DOM and swapped with CSS. They do not share ARIA —
 * duplicating `role="tab"` ids across two trees would give a screen reader two
 * competing tablists for one control.
 */
export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();

  const go = (index: number) => {
    const next = (index + processSteps.length) % processSteps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        go(active + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        go(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        go(0);
        break;
      case 'End':
        event.preventDefault();
        go(processSteps.length - 1);
        break;
      default:
        break;
    }
  };

  const current = processSteps[active];

  return (
    <Section pad="lg" bg="muted">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <Heading as="h2" level="h2" className="mt-2">
          From first sketch to the keys.
        </Heading>
        <p className="text-body-lg text-surface-600 mt-3">
          Six steps, and you know what you owe at each one before it starts.
        </p>
      </div>

      {/* ---------------- Desktop: rail + panel ---------------- */}
      <div className="mt-10 hidden lg:block">
        <p className="text-eyebrow text-surface-600 mb-4 uppercase">
          Step {active + 1} of {processSteps.length}
        </p>

        <div role="tablist" aria-label="Delivery process" className="flex items-start">
          {processSteps.map((step, i) => {
            const done = i < active;
            const isActive = i === active;

            return (
              <div key={step.id} className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <span
                      className={cn(
                        'h-0.5 flex-1 transition-colors duration-300',
                        done || isActive ? 'bg-primary-500' : 'bg-surface-200',
                      )}
                      aria-hidden="true"
                    />
                  )}

                  <button
                    ref={(node) => {
                      tabRefs.current[i] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${i}`}
                    aria-controls={`${baseId}-panel-${i}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    className={cn(
                      'text-btn grid size-11 shrink-0 place-items-center rounded-full font-semibold transition-colors duration-300',
                      done && 'bg-primary-500 text-on-primary',
                      isActive && 'bg-primary-500 text-on-primary ring-primary-200 ring-4',
                      !done && !isActive && 'bg-surface border-surface-300 text-surface-600 border',
                    )}
                  >
                    {done ? <Check className="size-4" aria-hidden="true" /> : i + 1}
                    <span className="sr-only">{step.title}</span>
                  </button>

                  {i < processSteps.length - 1 && (
                    <span
                      className={cn(
                        'h-0.5 flex-1 transition-colors duration-300',
                        done ? 'bg-primary-500' : 'bg-surface-200',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <span
                  className={cn(
                    'text-caption mt-3 px-2 text-center transition-colors',
                    isActive ? 'text-secondary-700 font-semibold' : 'text-surface-600',
                  )}
                  aria-hidden="true"
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {current && (
          <div
            role="tabpanel"
            id={`${baseId}-panel-${active}`}
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            className="bg-surface rounded-lg mt-10 overflow-hidden focus-visible:outline-offset-4"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <div className="p-8 lg:p-10">
                  <span className="bg-primary-50 text-primary-600 grid size-12 place-items-center rounded-full">
                    <current.icon className="size-6" aria-hidden="true" />
                  </span>

                  <Heading as="h3" level="h3" className="mt-5">
                    {current.title}
                  </Heading>
                  <p className="text-body text-surface-600 mt-3 max-w-prose">
                    {current.description}
                  </p>

                  {current.payment && (
                    <p className="mt-5">
                      <Badge tone="offer">You pay: {current.payment}</Badge>
                    </p>
                  )}
                </div>

                <AspectImage
                  {...photo(current.photo, 'landscape', 1080)}
                  sizes={SIZES.half}
                  alt=""
                  ratio="landscape"
                  className="h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ---------------- Mobile: accordion ---------------- */}
      <ul className="divide-surface-200 border-surface-200 mt-8 divide-y border-y lg:hidden">
        {processSteps.map((step, i) => {
          const isOpen = openMobile === i;
          return (
            <li key={step.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-m-${i}`}
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 py-4 text-left"
                >
                  <span
                    className={cn(
                      'text-caption grid size-8 shrink-0 place-items-center rounded-full font-semibold',
                      isOpen
                        ? 'bg-primary-500 text-on-primary'
                        : 'bg-surface border-surface-300 text-surface-600 border',
                    )}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className={cn('text-body flex-1 font-semibold', isOpen && 'text-primary-600')}>
                    {step.title}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'text-surface-600 size-5 shrink-0 transition-transform duration-300',
                      isOpen && 'text-primary-600 rotate-180',
                    )}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${baseId}-m-${i}`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-11">
                      <AspectImage
                        {...photo(step.photo, 'landscape', 828)}
                        sizes="92vw"
                        alt=""
                        ratio="landscape"
                        className="rounded-md"
                      />
                      <p className="text-body text-surface-600 mt-3">{step.description}</p>
                      {step.payment && (
                        <p className="mt-3">
                          <Badge tone="offer">You pay: {step.payment}</Badge>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
