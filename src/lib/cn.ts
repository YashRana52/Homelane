import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge, taught about this project's custom theme tokens.
 *
 * This configuration is not optional. Out of the box, tailwind-merge only
 * knows Tailwind's own scale names, so it reads `text-display` as a *colour*
 * utility — the same group as `text-white` — and silently drops whichever
 * comes first. `cn('text-display', 'text-white')` would then render body-sized
 * text, with nothing in the markup to explain why.
 *
 * Every custom value added to theme.css under one of these namespaces has to
 * be listed here as well.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // --text-* in theme.css
      'font-size': [
        {
          text: ['display', 'h2', 'h3', 'h4', 'body-lg', 'body', 'caption', 'btn', 'eyebrow'],
        },
      ],
      // --shadow-* in theme.css
      shadow: [{ shadow: ['e1', 'e2', 'e3', 'e4', 'ring'] }],
      // --radius-* in theme.css
      rounded: [{ rounded: ['pill'] }],
      // --container-* in theme.css
      'max-w': [{ 'max-w': ['site', 'narrow'] }],
    },
  },
});

/**
 * Merge Tailwind classes with conflict resolution.
 *
 * clsx handles conditionals; tailwind-merge makes the last conflicting
 * utility win, so a component's default classes can be overridden by a
 * caller's `className` without `!important`.
 *
 *   cn('px-4 py-2', isLarge && 'px-6', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
