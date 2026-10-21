import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/**
 * Accessible Breadcrumb navigation for inner pages.
 *
 * Conforms to WAI-ARIA Breadcrumb Pattern:
 * - <nav aria-label="Breadcrumb">
 * - <ol> list structure
 * - aria-current="page" on the current terminal link
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [{ label: 'Home', to: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn('py-3 text-caption', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-surface-600">
        {fullItems.map((item, idx) => {
          const isLast = idx === fullItems.length - 1;

          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="size-3.5 text-surface-600 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-medium text-secondary-700 truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-primary-600 transition-colors inline-flex items-center gap-1"
                >
                  {idx === 0 && <Home className="size-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
