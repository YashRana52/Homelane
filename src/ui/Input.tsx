import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { cn } from '@/lib/cn';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'prefix'> & {
  label: string;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
  /** Error message. Its presence is what puts the field in the error state. */
  error?: string;
  /** Hint shown below the field, replaced by `error` when there is one. */
  helper?: string;
  /** Static text inside the field, e.g. "+91" on a phone input. */
  prefix?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
};

/**
 * Text field with label, helper text and error state.
 *
 * The label is always rendered — `hideLabel` moves it off-screen rather than
 * dropping it, because a placeholder is not a label: it disappears as soon as
 * the field has content, and some screen readers never announce it.
 *
 * The error is wired with `aria-describedby` + `aria-invalid` and lives in an
 * `aria-live` region, so a validation failure is announced rather than only
 * turning the border red.
 */
export function Input({
  label,
  hideLabel,
  error,
  helper,
  prefix,
  className,
  wrapperClassName,
  id: providedId,
  required,
  ref,
  ...rest
}: InputProps) {
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

      <div
        className={cn(
          'rounded-sm bg-surface flex items-center border transition-colors duration-200',
          error
            ? 'border-error focus-within:border-error'
            : 'border-surface-300 focus-within:border-primary-500',
        )}
      >
        {prefix && (
          <span className="text-body text-surface-600 border-surface-200 shrink-0 border-r px-3 py-2.5">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'text-body placeholder:text-surface-600 h-11 w-full min-w-0 bg-transparent px-3.5 outline-none',
            className,
          )}
          {...rest}
        />
      </div>

      {/* Always mounted so a screen reader picks up the change, not the node. */}
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
