import { ChevronDown } from 'lucide-react';
import { useId, type Ref, type SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'children'> & {
  label: string;
  hideLabel?: boolean;
  options: readonly SelectOption[];
  /** Shown as a disabled first option when no value is selected. */
  placeholder?: string;
  error?: string;
  helper?: string;
  className?: string;
  wrapperClassName?: string;
  ref?: Ref<HTMLSelectElement>;
};

/**
 * A native `<select>` with the project's chrome.
 *
 * Deliberately native rather than a custom listbox: it gets mobile's wheel
 * picker, keyboard type-ahead and screen-reader support for free, and a city
 * list 100 entries long is far better served by the OS control than by a div.
 * A searchable combobox comes later, only where the list genuinely needs it.
 */
export function Select({
  label,
  hideLabel,
  options,
  placeholder,
  error,
  helper,
  className,
  wrapperClassName,
  id: providedId,
  required,
  defaultValue,
  ref,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const messageId = `${id}-message`;
  const message = error ?? helper;

  return (
    <div className={cn('w-full', wrapperClassName)}>
      <label
        htmlFor={id}
        className={cn(
          'text-caption text-surface-600 mb-1.5 block font-semibold',
          hideLabel && 'sr-only',
        )}
      >
        {label}
        {required && (
          <span className="text-primary-600 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'text-body bg-surface rounded-sm h-11 w-full appearance-none border pr-10 pl-3.5 outline-none transition-colors duration-200',
            error
              ? 'border-error focus:border-error'
              : 'border-surface-300 focus:border-primary-500',
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="text-surface-600 pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>

      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          'text-caption mt-1.5 min-h-4',
          error ? 'text-error font-medium' : 'text-surface-600',
        )}
      >
        {message}
      </p>
    </div>
  );
}
