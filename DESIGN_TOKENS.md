# Design tokens

Two files, and the split matters.

| File | Holds |
|---|---|
| `src/styles/tokens.css` | The raw values as `--c-*`, `--e-*`, `--r-*`, plus the `[data-theme="luxe"]` override |
| `src/styles/theme.css` | Maps them into Tailwind's `@theme` namespaces so you get `bg-primary-500`, `text-display`, `shadow-e2` |

`@theme` holds literals (breakpoints, fonts, the type scale) because a media
query cannot read `var()`. `@theme inline` holds colours, radii and shadows,
pointing at `var(--c-*)` — that indirection is what lets the Luxe theme re-skin
every utility at runtime.

> **Handwritten CSS must read `--c-*`, never `--color-*`.** `@theme inline`
> resolves `--color-*` to a literal at build time, so a rule written against it
> keeps the light-theme value inside `[data-theme="luxe"]`. That left every
> heading in the Luxe band at 1.54:1 contrast until it was caught.

---

## Colour

Every pair the UI actually forms meets WCAG 2.1 AA. `npm run check:contrast`
asserts it against the tokens themselves rather than against rendered nodes,
so a failure is reported once, where it can be fixed.

### Primary — coral

| Token | Value | Contrast | Used for |
|---|---|---|---|
| `--c-primary-50` | `#fdeeef` | — | Tints, selected-card fill |
| `--c-primary-200` | `#f8c4c6` | — | Focus ring halo, selection |
| `--c-primary-300` | `#f18b8f` | — | Accent on dark bands |
| `--c-primary-500` | `#c8494e` | 4.65:1 on white | Button fill, focus ring |
| `--c-primary-600` | `#b23c41` | 5.81:1 on white | Links, eyebrows, wordmark, button hover |
| `--c-primary-700` | `#9c363b` | 6.99:1 on white | Button active |

The coral is deeper than the reference palette it started from. The original
`#eb595f` measured 3.43:1 behind white button labels and as link text — below
AA for anything that is not large text, and it was carrying both.

### Secondary — plum

`--c-secondary-700` `#41303e` is the default body and heading colour: 12.23:1
on white, 11.15:1 on the muted band.

### Surface — warm neutral

| Token | Value | Role |
|---|---|---|
| `--c-surface` | `#ffffff` | Page |
| `--c-surface-50` | `#f5f4f5` | Alternating band |
| `--c-surface-100` | `#eceaeb` | Filled chips, inactive steps |
| `--c-surface-200` | `#d9d6d8` | Card seams — decorative, not a control boundary |
| `--c-surface-300` | `#979496` | **Input borders.** 3.00:1, the WCAG 1.4.11 floor |
| `--c-surface-400` | `#9a9198` | Decorative icons and dividers. **Not a text colour** |
| `--c-surface-600` | `#746972` | Secondary text. 5.24:1 white, 4.78:1 muted |
| `--c-surface-800/900` | `#574a54` / `#41303e` | Dark fills |

`surface-400` is deliberately absent from text. At 2.83:1 it failed AA badly,
and every `text-surface-400` in the codebase was moved to `text-surface-600`.

### Accents and semantic

`--c-gold-200/400/600/800` (Luxe — refined champagne brushed bronze and pearl silk) · `--c-mustard` (offers) · `--c-success`
`#3a854a` · `--c-warning` · `--c-error` `#a20b00` · `--c-info`

---

## Type

**Poppins** for display, **Inter** for body, both self-hosted via `@fontsource`
— no Google Fonts request. Poppins is pulled latin-only; the Devanagari
subsets are ~50 kB per weight and the copy is English.

Every size is a `clamp()`, so text scales with the viewport instead of jumping
at a breakpoint.

| Utility | Mobile → Desktop | Weight |
|---|---|---|
| `text-display` | 32 → 56px | 600 |
| `text-h2` | 24 → 40px | 600 |
| `text-h3` | 18 → 22px | 600 |
| `text-h4` | 16 → 18px | 500 |
| `text-body-lg` | 16 → 18px | 400 |
| `text-body` | 14 → 16px | 400 |
| `text-caption` | 12 → 13px | 400 |
| `text-btn` | 14 → 15px | 600 |
| `text-eyebrow` | 11 → 12px | 700, uppercase |

---

## Spacing, radii, elevation

4px scale: `4 8 12 16 20 24 32 40 48 64 80 96 120`.
Section padding: 48px mobile · 64px tablet · 96px desktop.

| Radii | | Elevation | |
|---|---|---|---|
| `rounded-xs` | 4px | `shadow-e1` | hairline |
| `rounded-sm` | 8px | `shadow-e2` | resting card |
| `rounded-md` | 12px | `shadow-e3` | hover / lifted |
| `rounded-lg` | 16px | `shadow-e4` | modal, sticky bar |
| `rounded-xl` | 24px | `shadow-ring` | 1px tonal outline |
| `rounded-pill` | 100px | | |

Shadows are warm (`rgb(65 48 62 / …)`), never neutral black.

---

## Breakpoints and layout

`sm` 480 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536 — mobile-first only,
no `max-width` queries.

| Helper | Use |
|---|---|
| `site-container` | Page gutter + 1280px cap |
| `site-container-narrow` | Same, capped at 896px |
| `full-bleed` | Escape the container, no scrollbar |
| `image-scrim` / `image-scrim-left` | Keep text legible over a photo |
| `card-lift` | The house hover: 4px rise + `shadow-e3`, movement dropped under reduced motion |
| `hero-rise` | Staggered hero entrance, CSS not JS so it does not wait for hydration |

Custom variants: **`touch:`** `(hover: none) and (pointer: coarse)` and
**`hoverable:`** its inverse. Prefer these over `useMediaQuery` for anything
visual — the hook returns `false` on the first render, so an element meant to
be hidden on touch would paint once and then vanish.

---

## Adding a token

1. Add the raw value to `tokens.css`.
2. Map it in `theme.css`.
3. If it is `--text-*`, `--shadow-*`, `--radius-*` or `--container-*`, add it to
   the tailwind-merge config in `src/lib/cn.ts` as well.
4. Run `npm run check:tokens` and `npm run check:contrast`.

Step 3 is not optional. tailwind-merge only knows Tailwind's own scale names,
so an unlisted `text-display` is read as a *colour* and
`cn('text-display', 'text-white')` silently drops the size.

And Tailwind emits **nothing** for a utility whose token does not exist —
`text-surface-500` is not an error, the element just inherits its colour and
the styling never applies. `check:tokens` scans the source for that too.
