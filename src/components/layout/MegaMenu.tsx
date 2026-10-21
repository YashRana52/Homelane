import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { megaPanels, type MenuKey } from '@/config/nav';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { Badge, Container } from '@/ui';

type MegaMenuProps = {
  open: MenuKey | null;
  panelId: string;
  onClose: () => void;
  /** Keeps the panel open while the pointer is inside it. */
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

/**
 * The desktop dropdown panel.
 *
 * One full-width bar under the header renders whichever menu is open, rather
 * than a panel anchored to each trigger. With a 110-city menu needing the
 * whole container and a 3-item one needing very little, a single bar avoids
 * measuring trigger positions and keeps every panel aligned to the same grid.
 *
 * Escape closes from anywhere inside; the header owns returning focus to the
 * trigger, because it is the thing that knows which trigger opened this.
 */
export function MegaMenu({
  open,
  panelId,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: MegaMenuProps) {
  const reduceMotion = usePrefersReducedMotion();
  const panel = open ? megaPanels[open] : null;

  return (
    <AnimatePresence>
      {open && panel && (
        <motion.div
          id={panelId}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              onClose();
            }
          }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface border-surface-200 shadow-e3 absolute inset-x-0 top-full border-t"
        >
          <Container className="py-8">
            {panel.cardStyle ? (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {panel.columns[0]?.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="group border-surface-200 hover:border-primary-500 hover:bg-primary-50 flex h-full flex-col rounded-md border p-4 transition-colors duration-200"
                    >
                      <span className="text-h4 font-display flex items-center gap-2">
                        {link.label}
                        {link.badge && <Badge tone="new">{link.badge}</Badge>}
                      </span>
                      {link.description && (
                        <span className="text-caption text-surface-600 mt-1">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
                {panel.columns.map((column, i) => (
                  <div key={column.heading ?? i} className="min-w-0">
                    {column.heading && (
                      <p className="text-eyebrow text-surface-600 mb-3 uppercase">
                        {column.heading}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {column.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            onClick={onClose}
                            className="text-body text-surface-600 hover:text-primary-600 block truncate rounded-xs py-1 transition-colors duration-150"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {panel.footerLink && (
              <div className={cn('border-surface-200 mt-6 border-t pt-5')}>
                <Link
                  to={panel.footerLink.to}
                  onClick={onClose}
                  className="text-btn text-primary-600 hover:text-primary-700 inline-flex items-center gap-1.5"
                >
                  {panel.footerLink.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
