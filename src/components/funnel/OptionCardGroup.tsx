import { Check } from 'lucide-react';
import { useId, type ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/formatINR';
import { Badge } from '@/ui';

export type Option = {
  id: string;
  label: string;
  description?: string;
  /** Shown as "+ ₹24,000" on the card. */
  price?: number;
  badge?: string;
  /** Optional illustration, e.g. a layout plan. */
  art?: ReactNode;
};

type SingleProps = {
  multiple?: false;
  value: string | null;
  onChange: (id: string) => void;
};

type MultipleProps = {
  multiple: true;
  value: string[];
  onChange: (ids: string[]) => void;
};

type OptionCardGroupProps = (SingleProps | MultipleProps) & {
  legend: string;
  options: readonly Option[];
  /** Grid density. 'wide' for four illustrated layout cards. */
  columns?: 'wide' | 'dense';
  className?: string;
};

/**
 * A group of selectable cards.
 *
 * Built on real `<input type="radio">` / `<input type="checkbox">` elements
 * rather than divs with `role="radio"`. The native controls bring arrow-key
 * navigation within a radio group, the correct "2 of 4" announcements, and
 * form semantics for free — all of which have to be hand-rolled, and are
 * usually hand-rolled wrong, when the card is a div.
 *
 * The input is transparent and stretched across the card, so the whole card is
 * the hit target and the visible styling is driven by `peer-checked`.
 */
export function OptionCardGroup(props: OptionCardGroupProps) {
  const { legend, options, columns = 'dense', className } = props;
  const name = useId();

  const isSelected = (id: string) =>
    props.multiple ? props.value.includes(id) : props.value === id;

  const toggle = (id: string) => {
    if (props.multiple) {
      props.onChange(
        props.value.includes(id) ? props.value.filter((x) => x !== id) : [...props.value, id],
      );
    } else {
      props.onChange(id);
    }
  };

  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>

      <div
        className={cn(
          'grid gap-3',
          columns === 'wide'
            ? 'sm:grid-cols-2 lg:grid-cols-4'
            : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        {options.map((option) => {
          const selected = isSelected(option.id);
          return (
            <label
              key={option.id}
              className={cn(
                'group relative flex cursor-pointer flex-col rounded-md border p-4 transition-colors duration-200',
                selected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-surface-200 hover:border-surface-400 bg-surface',
                'has-[:focus-visible]:outline-primary-500 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2',
              )}
            >
              <input
                type={props.multiple ? 'checkbox' : 'radio'}
                name={props.multiple ? undefined : name}
                checked={selected}
                onChange={() => toggle(option.id)}
                className="peer absolute inset-0 cursor-pointer appearance-none"
              />

              {option.art && (
                <span className="mb-3 block" aria-hidden="true">
                  {option.art}
                </span>
              )}

              <span className="flex items-start justify-between gap-2">
                <span className="text-h4 font-display">{option.label}</span>
                <span
                  className={cn(
                    'mt-0.5 grid size-5 shrink-0 place-items-center transition-colors',
                    props.multiple ? 'rounded-xs' : 'rounded-full',
                    selected
                      ? 'bg-primary-500 text-on-primary'
                      : 'border-surface-400 border bg-transparent',
                  )}
                  aria-hidden="true"
                >
                  {selected && <Check className="size-3.5" />}
                </span>
              </span>

              {option.badge && (
                <span className="mt-2">
                  <Badge tone={selected ? 'new' : 'neutral'}>{option.badge}</Badge>
                </span>
              )}

              {option.description && (
                <span className="text-caption text-surface-600 mt-1.5">{option.description}</span>
              )}

              {option.price !== undefined && (
                <span className="text-body mt-3 font-semibold">
                  + {formatINR(option.price)}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
