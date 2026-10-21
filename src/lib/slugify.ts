/**
 * URL-safe slug from a display label.
 *
 *   "Modular Kitchen"  → "modular-kitchen"
 *   "Delhi NCR"        → "delhi-ncr"
 *   "Thiruvananthapuram" → "thiruvananthapuram"
 *
 * City and category links are generated from their labels rather than stored
 * twice, so a label can never drift out of sync with its route.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
