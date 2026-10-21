import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type TabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  items: readonly TabItem[];
  defaultTab?: string;
  /** 'underline' for content switches, 'pill' for filter-style switches. */
  variant?: 'underline' | 'pill';
  className?: string;
  panelClassName?: string;
};

/**
 * Tab switcher with full keyboard support.
 *
 * Only the active tab is tabbable; Left/Right (plus Home/End) move between
 * them and wrap around. That is the roving-tabindex pattern the ARIA spec
 * expects — without it, a keyboard user has to tab through every tab to reach
 * the panel, which is exactly the thing tabs are supposed to avoid.
 *
 * The tab strip scrolls horizontally on narrow screens rather than wrapping,
 * so the row never becomes two ragged lines on a phone.
 */
export function Tabs({
  items,
  defaultTab,
  variant = 'underline',
  className,
  panelClassName,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id ?? '');
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = items.findIndex((item) => item.id === active);

  const focusTab = (index: number) => {
    const next = items[(index + items.length) % items.length];
    if (!next) return;
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={className}>
      {/* The handler sits on each tab, not on the tablist: with a roving
          tabindex the focused element is always a tab, and a focusable
          tablist would add a dead stop to the tab order. */}
      <div
        role="tablist"
        className={cn(
          // `min-w-0` is load-bearing: a grid or flex item defaults to
          // min-width:auto and will push past its track rather than let this
          // strip scroll. Note there is no negative-margin bleed here — that
          // only lines up when the element sits directly inside the page
          // container, and Tabs can be nested anywhere.
          'flex min-w-0 gap-1 overflow-x-auto',
          // Hides the scrollbar on the tab strip without hiding overflow.
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          variant === 'underline' && 'border-surface-200 border-b',
        )}
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${item.id}-tab`}
              aria-controls={`${baseId}-${item.id}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={onKeyDown}
              className={cn(
                'text-btn shrink-0 whitespace-nowrap transition-colors duration-200',
                variant === 'underline' && [
                  'min-h-11 border-b-2 px-4 py-2.5',
                  selected
                    ? 'border-primary-500 text-primary-600'
                    : 'text-surface-600 hover:text-secondary-700 border-transparent',
                ],
                variant === 'pill' && [
                  'rounded-pill min-h-11 px-4 py-2',
                  selected
                    ? 'bg-secondary-700 text-surface'
                    : 'text-secondary-700 hover:bg-surface-100',
                ],
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-${item.id}-panel`}
          aria-labelledby={`${baseId}-${item.id}-tab`}
          hidden={item.id !== active}
          tabIndex={0}
          className={cn('pt-6 focus-visible:outline-offset-4', panelClassName)}
        >
          {item.id === active && item.content}
        </div>
      ))}
    </div>
  );
}
