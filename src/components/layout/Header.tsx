import { ChevronDown, Menu, Phone } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { brand } from '@/config/brand';
import { headerItems, type MenuKey } from '@/config/nav';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/cn';
import { Button, Container } from '@/ui';

import { MegaMenu } from './MegaMenu';
import { UtilityBar } from './UtilityBar';

/** Grace period so the panel survives the pointer crossing the gap to it. */
const CLOSE_DELAY = 140;

type HeaderProps = {
  onOpenDrawer: () => void;
};

/**
 * Site header: a utility strip that scrolls away, over a main row that sticks.
 *
 * The utility strip is left in normal flow rather than being collapsed with JS
 * on scroll. Collapsing a fixed header changes its height, which either shifts
 * the page content or leaves a gap under it; letting the strip scroll off and
 * sticking only the row below gets the same result with no height maths and no
 * jump.
 */
export function Header({ onOpenDrawer }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const { scrolled } = useScrollDirection();
  const location = useLocation();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  }, [cancelClose]);

  const close = useCallback(
    (returnFocusTo?: MenuKey) => {
      cancelClose();
      setOpenMenu(null);
      if (returnFocusTo) triggerRefs.current[returnFocusTo]?.focus();
    },
    [cancelClose],
  );

  // Navigating away must not leave a panel hanging open.
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  // A click anywhere outside the header dismisses the panel.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openMenu]);

  /** Open a menu and drop focus onto its first link, for keyboard users. */
  const openAndFocus = (key: MenuKey) => {
    setOpenMenu(key);
    requestAnimationFrame(() => {
      document.getElementById(panelId)?.querySelector<HTMLAnchorElement>('a')?.focus();
    });
  };

  return (
    <header ref={headerRef}>
      <UtilityBar />

      <div
        className={cn(
          'bg-surface/95 sticky top-0 z-40 backdrop-blur transition-shadow duration-200',
          scrolled ? 'shadow-e2' : 'border-surface-200 border-b',
        )}
        onPointerLeave={scheduleClose}
      >
        <Container className="flex h-header items-center justify-between gap-4 lg:h-16">
          {/* Left: hamburger + wordmark */}
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={onOpenDrawer}
              className="hover:bg-surface-100 -ml-2 grid size-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>

            <Link to="/" className="font-display text-h3 text-primary-600 shrink-0 font-semibold">
              {brand.name}
            </Link>
          </div>

          {/* Centre: desktop navigation */}
          <nav aria-label="Main" className="hidden min-w-0 lg:block">
            <ul className="flex items-center">
              {headerItems.map((item) =>
                item.kind === 'link' ? (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onPointerEnter={scheduleClose}
                      className="text-btn text-secondary-700 hover:text-primary-600 inline-flex h-16 items-center px-3 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.key}>
                    <button
                      type="button"
                      ref={(node) => {
                        triggerRefs.current[item.key] = node;
                      }}
                      aria-expanded={openMenu === item.key}
                      aria-controls={openMenu === item.key ? panelId : undefined}
                      aria-haspopup="true"
                      onPointerEnter={() => {
                        cancelClose();
                        setOpenMenu(item.key);
                      }}
                      onClick={() =>
                        openMenu === item.key ? close(item.key) : setOpenMenu(item.key)
                      }
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          openAndFocus(item.key);
                        } else if (event.key === 'Escape' && openMenu === item.key) {
                          close(item.key);
                        }
                      }}
                      className={cn(
                        'text-btn inline-flex h-16 items-center gap-1 px-3 transition-colors',
                        openMenu === item.key
                          ? 'text-primary-600'
                          : 'text-secondary-700 hover:text-primary-600',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'size-4 transition-transform duration-200',
                          openMenu === item.key && 'rotate-180',
                        )}
                      />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Right: actions */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={brand.phoneHref}
              className="hover:bg-surface-100 grid size-11 place-items-center rounded-full transition-colors lg:hidden"
            >
              <Phone className="size-5" aria-hidden="true" />
              <span className="sr-only">Call {brand.phone}</span>
            </a>
            <Button to="/estimate" size="sm" className="hidden sm:inline-flex lg:h-11 lg:px-5">
              Get Free Estimate
            </Button>
          </div>
        </Container>

        <MegaMenu
          open={openMenu}
          panelId={panelId}
          onClose={() => close(openMenu ?? undefined)}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
        />
      </div>
    </header>
  );
}
