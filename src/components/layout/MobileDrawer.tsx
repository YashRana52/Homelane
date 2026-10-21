import { ChevronDown, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { brand } from '@/config/brand';
import { headerItems, megaPanels, topCities, utilityLinks } from '@/config/nav';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { Badge, Button } from '@/ui';

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen navigation for small screens.
 *
 * The desktop mega-menu's columns are flattened into nested accordions —
 * a 110-city panel is fine as four columns on a laptop and unusable as one
 * long list on a phone, so Cities collapses to the eight busiest plus a link
 * to the rest.
 *
 * The phone number and the primary action are pinned to the bottom of the
 * sheet, inside the safe-area inset, because that is where a thumb rests.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const location = useLocation();

  useLockBodyScroll(open);

  // Close on navigation — tapping a link should not leave the sheet up.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    requestAnimationFrame(() => panelRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      const opener = openerRef.current;
      if (opener instanceof HTMLElement) requestAnimationFrame(() => opener.focus());
    };
  }, [open, onClose]);

  const toggle = (key: string) => setExpanded((cur) => (cur === key ? null : key));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="bg-secondary-900/50 absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface absolute inset-y-0 left-0 flex w-[min(88%,380px)] flex-col shadow-e4"
          >
            {/* Header */}
            <div className="border-surface-200 flex h-header shrink-0 items-center justify-between border-b px-4">
              <Link to="/" className="font-display text-h3 text-primary-600 font-semibold">
                {brand.name}
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="hover:bg-surface-100 -mr-2 grid size-11 place-items-center rounded-full transition-colors"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            {/* Scrollable links */}
            <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <ul className="divide-surface-200 divide-y px-4">
                {headerItems.map((item) => {
                  if (item.kind === 'link') {
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="text-body flex min-h-12 items-center font-semibold"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  const panel = megaPanels[item.key];
                  const isOpen = expanded === item.key;
                  // Cities would be 110 rows; show the busiest and link out.
                  const links =
                    item.key === 'cities'
                      ? topCities
                      : panel.columns.flatMap((column) => column.links);

                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => toggle(item.key)}
                        aria-expanded={isOpen}
                        className="text-body flex min-h-12 w-full items-center justify-between gap-3 text-left font-semibold"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            'text-surface-600 size-5 shrink-0 transition-transform duration-300',
                            isOpen && 'text-primary-600 rotate-180',
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.26,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <ul className="border-surface-200 mb-3 ml-1 space-y-0.5 border-l pl-3">
                              {links.map((link) => (
                                <li key={link.to}>
                                  <Link
                                    to={link.to}
                                    className="text-body text-surface-600 flex min-h-10 items-center gap-2"
                                  >
                                    {link.label}
                                    {link.badge && <Badge tone="new">{link.badge}</Badge>}
                                  </Link>
                                </li>
                              ))}
                              {panel.footerLink && (
                                <li>
                                  <Link
                                    to={panel.footerLink.to}
                                    className="text-btn text-primary-600 flex min-h-10 items-center"
                                  >
                                    {panel.footerLink.label}
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {utilityLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-body text-surface-600 flex min-h-12 items-center">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Pinned actions — thumb-reachable, clear of the home indicator */}
            <div className="border-surface-200 bg-surface shrink-0 space-y-2 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button to="/estimate" fullWidth size="lg">
                Get Free Estimate
              </Button>
              <a
                href={brand.phoneHref}
                className="text-btn text-secondary-700 hover:text-primary-600 flex min-h-11 items-center justify-center gap-2 transition-colors"
              >
                <Phone className="size-4" aria-hidden="true" />
                {brand.phone}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
