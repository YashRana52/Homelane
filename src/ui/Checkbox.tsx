import { Check } from 'lucide-react';
import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { cn } from '@/lib/cn';

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
  label: ReactNode;
  /** Secondary line under the label. */
  description?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
};

/**
 * Checkbox with a custom mark.
 *
 * The real `<input>` stays in the DOM and keeps its native semantics — it is
 * made transparent and stretched over the box rather than hidden, so keyboard
 * focus, the tab order and form submission all behave normally. The visible
 * square is driven from `peer-checked` and `peer-focus-visible`.
 */
export function Checkbox({
  label,
  description,
  error,
  className,
  id: providedId,
  ref,
  ...rest
}: ToggleProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const messageId = `${id}-message`;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-start gap-3">
        <span className="relative grid shrink-0 place-items-center pt-0.5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? messageId : undefined}
            className="peer size-5 cursor-pointer appearance-none"
            {...rest}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 top-0.5 grid size-5 place-items-center rounded-xs border transition-colors duration-150',
              'peer-checked:bg-primary-500 peer-checked:border-primary-500',
              // The tick is a child of this span, not a sibling of the input,
              // so peer-checked has to reach into it with a child selector.
              'peer-checked:[&>svg]:opacity-100',
              'peer-focus-visible:outline-primary-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
              'peer-disabled:opacity-50',
              error ? 'border-error' : 'border-surface-400',
            )}
          >
            <Check className="text-on-primary size-3.5 opacity-0 transition-opacity duration-150" />
          </span>
        </span>

        <label htmlFor={id} className="text-body cursor-pointer select-none">
          {label}
          {description && <span className="text-caption text-surface-600 block">{description}</span>}
        </label>
      </div>

      {error && (
        <p id={messageId} aria-live="polite" className="text-caption text-error mt-1.5 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Radio input. Give every radio in a group the same `name`, which is what
 * makes arrow keys move between them.
 */
export function Radio({ label, description, className, id: providedId, ref, ...rest }: ToggleProps) {
  const autoId = useId();
  const id = providedId ?? autoId;

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <span className="relative grid shrink-0 place-items-center pt-0.5">
        <input
          ref={ref}
          id={id}
          type="radio"
          className="peer size-5 cursor-pointer appearance-none"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            'border-surface-400 pointer-events-none absolute inset-0 top-0.5 grid size-5 place-items-center rounded-full border transition-colors duration-150',
            'peer-checked:border-primary-500 peer-checked:border-[6px]',
            'peer-focus-visible:outline-primary-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
            'peer-disabled:opacity-50',
          )}
        />
      </span>

      <label htmlFor={id} className="text-body cursor-pointer select-none">
        {label}
        {description && <span className="text-caption text-surface-600 block">{description}</span>}
      </label>
    </div>
  );
}
