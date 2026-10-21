import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

export type AccordionItem = {
  /** Stable key. Also used in the generated ARIA ids. */
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  /** 'single' closes the open panel when another is opened. */
  mode?: 'single' | 'multiple';
  /** Ids open on first render. */
  defaultOpen?: readonly string[];
  /** Quieter styling for the footer link columns on mobile. */
  variant?: 'card' | 'plain';
  /**
   * Heading level wrapping each trigger. Default h3 suits an FAQ that sits
   * under a section h2; the footer passes h2, because its columns are peers
   * of the desktop column headings, not children of them.
   */
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
};

/**
 * Disclosure list — the FAQ pattern, and the footer columns on mobile.
 *
 * Each header is a real `<button>` carrying `aria-expanded` and
 * `aria-controls`, and each panel points back with `aria-labelledby`. That
 * pairing is what lets a screen reader announce "collapsed/expanded" instead
 * of reading a chevron.
 */
export function Accordion({
  items,
  mode = 'single',
  defaultOpen = [],
  variant = 'card',
  headingLevel: HeadingTag = 'h3',
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>([...defaultOpen]);
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (mode === 'single') return isOpen ? [] : [id];
      return isOpen ? current.filter((x) => x !== id) : [...current, id];
    });
  };

  return (
    <div
      className={cn(
        variant === 'card' ? 'divide-surface-200 divide-y' : 'divide-surface-200/60 divide-y',
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <HeadingTag>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  'group flex w-full items-start justify-between gap-4 text-left',
                  variant === 'card' ? 'py-5' : 'py-3.5',
                  'hover:text-primary-600 transition-colors duration-200',
                )}
              >
                <span
                  className={cn(
                    variant === 'card' ? 'text-h4 font-display' : 'text-body',
                    isOpen && 'text-primary-600',
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'text-surface-600 mt-0.5 size-5 shrink-0 transition-transform duration-300',
                    isOpen && 'text-primary-600 rotate-180',
                  )}
                />
              </button>
            </HeadingTag>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      'text-body text-surface-600 max-w-prose',
                      variant === 'card' ? 'pb-5' : 'pb-3',
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
