import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';

const variants = {
  /** The one that converts. Used for the single main action in a view. */
  primary: 'bg-primary-500 text-on-primary hover:bg-primary-600 active:bg-primary-700 shadow-e1',
  /** Plum. For the secondary action beside a primary one. */
  secondary: 'bg-secondary-700 text-surface hover:bg-secondary-500 active:bg-secondary-900',
  /** Quiet but still clearly a button. The most-used variant on cards. */
  outline:
    'border border-surface-300 text-secondary-700 hover:border-primary-500 hover:text-primary-600 active:bg-primary-50',
  /** No chrome until hovered. Toolbars, carousel controls, menu items. */
  ghost: 'text-secondary-700 hover:bg-surface-100 active:bg-surface-200',
  /** Luxe tier only. */
  gold: 'bg-gold-600 text-on-gold hover:bg-gold-400 active:bg-gold-800',
  /** Reads as a link but behaves as a button. */
  link: 'text-primary-600 underline decoration-primary-300 decoration-1 underline-offset-4 hover:decoration-primary-600 px-0 py-0',
  /** White on photography. Pairs with image-scrim. */
  onImage: 'bg-surface text-secondary-700 hover:bg-surface-50 shadow-e2',
} as const;

const sizes = {
  /** 36px tall. Only for desktop-only chrome — below the 44px touch target. */
  sm: 'h-9 px-3.5 gap-1.5',
  /** 44px tall. The default, and the minimum for anything tappable. */
  md: 'h-11 px-5 gap-2',
  /** 52px tall. Hero and form-submit actions. */
  lg: 'h-13 px-7 gap-2.5',
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container. The default on mobile for form actions. */
  fullWidth?: boolean;
  /** Pill instead of the 8px radius. Used for chips and carousel arrows. */
  pill?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Swaps the label for a spinner and blocks interaction. */
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never;
    to?: never;
  };

type ButtonAsAnchor = CommonProps & {
  /** External or non-router destination — renders an <a>. */
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  /** In-app destination — renders a router Link. */
  to: string;
  href?: never;
  'aria-label'?: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

const base =
  'inline-flex items-center justify-center whitespace-nowrap text-btn font-semibold ' +
  'transition-[color,background-color,border-color,transform] duration-200 ' +
  // A press needs to be felt, not just seen. 2% is enough to register under a
  // thumb and small enough not to reflow anything around it.
  'active:scale-[0.98] motion-reduce:active:scale-100 ' +
  'disabled:pointer-events-none disabled:opacity-50';

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The project's only button.
 *
 * It picks its element from the props rather than taking an `as`: pass `to`
 * for an in-app route, `href` for an external link, neither for a real button.
 * That keeps a navigation action from rendering as a `<button>`, which is the
 * usual way these components end up inaccessible.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth,
    pill,
    iconLeft,
    iconRight,
    loading,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    variant !== 'link' && sizes[size],
    pill ? 'rounded-pill' : 'rounded-sm',
    fullWidth && 'w-full',
    loading && 'pointer-events-none',
    className,
  );

  const content = (
    <>
      {loading ? <Spinner /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, ...anchorRest } = rest as ButtonAsAnchor;
    // An external target without noopener leaks window.opener to the new page.
    const rel = target === '_blank' ? (anchorRest.rel ?? 'noopener noreferrer') : anchorRest.rel;
    return (
      <a href={href} target={target} {...anchorRest} rel={rel} className={classes}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button
      type={buttonRest.type ?? 'button'}
      {...buttonRest}
      className={classes}
      aria-busy={loading || undefined}
      disabled={buttonRest.disabled || loading}
    >
      {content}
    </button>
  );
}
