import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const widths = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
} as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Rendered as the dialog's accessible name. */
  title: string;
  /** Hide the title visually while keeping it as the accessible name. */
  hideTitle?: boolean;
  description?: string;
  size?: keyof typeof widths;
  /** Pinned action row at the bottom — thumb-reachable on mobile. */
  footer?: ReactNode;
  /** Block closing on backdrop click and Escape. Use sparingly. */
  dismissible?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Centred dialog on desktop, bottom sheet on mobile.
 *
 * Focus is moved into the panel on open, cycled inside it while open, and
 * returned to the element that opened it on close — without that last part, a
 * keyboard user lands back at the top of the document every time they dismiss
 * something. Background scrolling is locked, Escape closes, and the backdrop
 * is inert to the screen reader via `aria-modal`.
 */
export function Modal({
  open,
  onClose,
  title,
  hideTitle,
  description,
  size = 'md',
  footer,
  dismissible = true,
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = usePrefersReducedMotion();

  useLockBodyScroll(open);

  const close = useCallback(() => {
    if (dismissible) onClose();
  }, [dismissible, onClose]);

  // Remember the opener, then give focus to the panel.
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    return () => {
      // Returning focus synchronously fights the unmount, so defer a frame.
      const opener = openerRef.current;
      if (opener instanceof HTMLElement) requestAnimationFrame(() => opener.focus());
    };
  }, [open]);

  // Escape to close, Tab to cycle within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            className="absolute inset-0 bg-secondary-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              'bg-surface relative flex max-h-[92dvh] w-full flex-col overflow-hidden shadow-e4',
              'rounded-t-xl sm:rounded-lg',
              widths[size],
              className,
            )}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Grab handle — a mobile affordance only. */}
            <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
              <span className="bg-surface-200 rounded-pill h-1 w-10" />
            </div>

            <div className="flex items-start gap-4 px-5 pt-4 pb-3 sm:px-6 sm:pt-6">
              <div className="min-w-0 flex-1">
                <h2
                  id={titleId}
                  className={cn('text-h3 font-display', hideTitle && 'sr-only')}
                >
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="text-body text-surface-600 mt-1">
                    {description}
                  </p>
                )}
              </div>

              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:bg-surface-100 -mt-1 -mr-1 grid size-11 shrink-0 place-items-center rounded-full transition-colors"
                >
                  <X className="size-5" aria-hidden="true" />
                  <span className="sr-only">Close dialog</span>
                </button>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6">{children}</div>

            {footer && (
              <div className="border-surface-200 bg-surface border-t px-5 py-4 sm:px-6">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
