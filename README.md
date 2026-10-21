# Aangan Interiors — UI

A premium, fully responsive interior-design website UI. React SPA, no backend —
all content comes from local mock data in `src/data/`.

Build plan and phase breakdown: **[PLAN.md](PLAN.md)**.
Current state: **complete** — all nine phases. 20 routes, the full homepage,
the lead funnel and three calculators, every inner page, motion polish, and a
QA pass covering accessibility, responsive behaviour and Core Web Vitals.


| Route | What |
|---|---|
| `/` | Homepage — 28 bands |
| `/design-ideas`, `/design-ideas/:category`, `/design-ideas/:category/:slug` | Gallery hub, filtered listing, design detail |
| `/offerings/:slug`, `/luxe` | Service pages and the dark-and-gold luxury sub-brand |
| `/price-calculator`, `/price-calculator/:type`, `/estimate` | The funnel: hub, five-step wizard, two-question estimate |
| `/interiors/:city` | One template, 111 cities |
| `/projects`, `/projects/:slug`, `/magazine`, `/magazine/:slug` | Showcase and editorial |
| `/store-locator`, `/refer`, `/nri`, `/vastu`, `/franchise` | Studios and promos |
| `/about`, `/contact`, `/careers`, `/policies`, `/sitemap`, `/login` | Static |
| `/dev/tokens`, `/dev/kitchen-sink` | Internal: token sheet and the component library |

Every public route renders inside `RootLayout`, so the header, mega-menu,
mobile drawer, footer and floating CTA are exercised everywhere.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `src/` (incl. `jsx-a11y`) |
| `npm run lint:fix` | ESLint with autofix |
| `npm run format` | Prettier + Tailwind class sorting |
| `npm run typecheck` | TypeScript only, no emit |
| `npm run verify:images` | Checks every photo id in the registry resolves |
| `npm run check:overflow` | Drives headless Chrome across 11 widths and fails on any horizontal overflow |
| `npm run check:tokens` | Fails on a token missing from tailwind-merge, or a utility pointing at a token that does not exist |
| `npm run check:contrast` | Audits every colour pair the UI forms against WCAG AA |
| `npm run check:a11y` | axe-core over 18 routes × 2 widths, plus heading order, alt text and skip link |
| `npm run check:perf` | LCP and CLS per route on a throttled mobile profile |

`check:overflow` needs a server running, and takes the base URL plus the paths
to test:

```bash
npm run build && npm run preview       # in one terminal
npm run check:overflow -- http://localhost:4173 / /dev/kitchen-sink
```

It measures elements rather than trusting `overflow-x: hidden`, and skips any
node clipped by an ancestor — so a carousel slide that is deliberately wider
than the screen is not reported, but a genuinely too-wide element is.

---

## Stack

React 19 · Vite 7 · TypeScript (strict) · Tailwind CSS v4 · React Router v7 ·
Motion 12 · Embla Carousel 8 · lucide-react · react-hook-form + zod

---

## Design tokens

Colour lives in exactly two files:

- **`src/styles/tokens.css`** — the raw brand values as `--c-*` custom
  properties, plus the `[data-theme="luxe"]` dark-and-gold override.
- **`src/styles/theme.css`** — maps those into Tailwind's `@theme` namespaces
  so you get `bg-primary-500`, `rounded-md`, `shadow-e2`, `text-display` etc.

The split between the two `@theme` blocks is deliberate:

| Block | Holds | Why |
|---|---|---|
| `@theme` | breakpoints, fonts, type scale | Media queries cannot read `var()`, so these must be literal |
| `@theme inline` | colours, radii, shadows | `inline` keeps utilities pointing at `var(--c-*)`, which is what lets the Luxe theme re-skin every utility at runtime |

**Never hardcode a hex value in a component.** Add a token instead.

### Adding a theme token — two files, not one

A new `--text-*`, `--shadow-*`, `--radius-*` or `--container-*` token must also
be listed in `src/lib/cn.ts`. tailwind-merge only knows Tailwind's own scale
names, so an unlisted `text-display` is read as a *colour* utility and
`cn('text-display', 'text-white')` silently drops the size — the heading just
renders at body size, with nothing in the markup to explain why.

`npm run check:tokens` compares the two files and fails on any drift.

### Palette

| Role | Token | Value |
|---|---|---|
| Primary CTA | `--c-primary-500` | `#eb595f` coral |
| Primary hover | `--c-primary-600` | `#d94c50` |
| Body text | `--c-secondary-700` | `#41303e` plum |
| Page surface | `--c-surface` | `#ffffff` |
| Section surface | `--c-surface-50` | `#f5f4f5` |
| Luxe accent | `--c-gold-600` | `#c19038` |

### Type

Poppins for display, Inter for body — both self-hosted via `@fontsource`, so
there is no Google Fonts request. Every size is a `clamp()`, so text scales
smoothly with the viewport and never jumps at a breakpoint.

`text-display` `text-h2` `text-h3` `text-h4` `text-body-lg` `text-body`
`text-caption` `text-btn` `text-eyebrow`

### Breakpoints

`sm` 480 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536 — mobile-first only,
no `max-width` queries. See PLAN.md §4 for the per-component grid table.

---

## Layout helpers

| Class | Use |
|---|---|
| `site-container` | Page gutter + 1280px max width. The default wrapper |
| `site-container-narrow` | Same, capped at 896px |
| `full-bleed` | Escape the container to full viewport width, no scrollbar |
| `image-scrim` | Dark top-up gradient so text stays legible over a photo |
| `sr-only-focusable` | Hidden until focused — skip links |

The gutter is a token (`--gutter`), so it widens at `md` and `lg` on its own.

---

## Images

No in-house photography. Every visual is a curated Unsplash photo served
through Unsplash's image CDN, which handles resizing and format negotiation.

```ts
import { photo, SIZES, RATIO } from '@/config/images';

const img = photo('roomKitchen', 'landscape');
<img src={img.src} srcSet={img.srcSet} sizes={SIZES.card} style={{ aspectRatio: RATIO.landscape }} />
```

Rules:

1. Photo ids live only in the `PHOTOS` registry in `src/config/images.ts`.
   Swapping a bad photo is then a one-line change.
2. Always go through `photo()` / `imageSet()` so an image gets a real `srcSet`.
3. Always pass a `sizes` preset from `SIZES`. A wrong `sizes` is the biggest
   cause of over-downloading on mobile.
4. Always reserve the box with `aspect-ratio` — that is what keeps CLS at zero.
5. Run `npm run verify:images` after editing the registry.

`verify:images` only proves an id **resolves** — not what it depicts. To check
the photos actually match their keys, render a contact sheet and look at it:

```bash
node -e "…"   # see scripts/ for the generator used in Phase 4
```

That pass found the registry badly scrambled — kitchens that were living rooms,
a wardrobe row with a bathroom in it — and is worth repeating whenever photos
are added. Known gap: **pooja room** has no genuine match in the current set,
and most wardrobe entries are bedrooms rather than wardrobes. Both are
one-line swaps in `PHOTOS` once real photography exists.

---

## Structure

```
src/
├── config/     brand.ts · images.ts · nav.ts        — content that is not data
├── styles/     tokens.css · theme.css · global.css
├── ui/         primitives — no business logic        (Phase 1)
├── components/ composed blocks: layout, cards, sections, funnel
├── pages/      one folder per route
├── data/       mock content
├── hooks/      useMediaQuery, useScrollDirection, …
└── lib/        cn() · formatINR() · slugify()
```

**Import direction is one-way:** `ui/` never imports from `components/`, and
`components/` never imports from `pages/`. Keeping this true is what stops the
component layer turning into a dependency knot.

---

## Primitives

Everything in `src/ui/`, exported from one barrel:

| | |
|---|---|
| **Layout** | `Container` · `Section` |
| **Type** | `Heading` · `Eyebrow` |
| **Action** | `Button` · `Chip` |
| **Display** | `Badge` · `Rating` · `AspectImage` · `Skeleton` |
| **Form** | `Input` · `Select` · `Checkbox` · `Radio` |
| **Disclosure** | `Accordion` · `Tabs` · `Modal` |
| **Navigation** | `Pagination` · `ProgressBar` · `Carousel` |
| **Motion** | `Reveal` · `RevealGroup` |

A few that are easy to misuse:

- **`Button`** picks its element from its props — `to` renders a router `Link`,
  `href` renders an `<a>`, neither renders a `<button>`. Never make a
  navigation action a `<button>`.
- **`AspectImage`** requires `sizes`. Pass a preset from `SIZES`; a wrong
  `sizes` is the main cause of a phone downloading a desktop-sized image.
- **`Heading`** takes `as` (semantics) and `level` (size) separately. Pick `as`
  from the document outline, never from how big the text should look.
- **`Carousel`** sets slide width from a `perView` preset. Those are complete
  class strings on purpose — Tailwind scans source text, so a composed class
  name would never be generated.

## Layout shift

CLS is held at zero by three rules, and all three matter:

1. **Every image reserves its box** before the file arrives — `AspectImage`
   does this with `aspect-ratio`, and the hero's `<picture>` is absolutely
   positioned inside a container with a `min-height`.
2. **The index route is not lazy.** `routes.tsx` imports `Home` eagerly while
   every other page is `lazy()`. Behind a chunk it measured 0.59 CLS: the
   shell painted at 206ms with a short Suspense fallback, the chunk landed at
   498ms, and the footer dropped 3,308px in one frame.
3. **`RouteFallback` reserves 70vh**, so navigating to a lazy route does not
   yank the footer up and then back down.

Measure it with the `layout-shift` PerformanceObserver against a production
build — a dev build's timing hides the problem.

## Custom variants

| Variant | Applies when |
|---|---|
| `touch:` | `(hover: none) and (pointer: coarse)` — phones and tablets |
| `hoverable:` | `(hover: hover) and (pointer: fine)` — a real pointer |

Prefer these over the `useMediaQuery` hook for anything purely visual. A hook
returns `false` on the first render, so an element meant to be hidden on touch
would paint once and then disappear.

## Conventions

- Path alias `@/` → `src/`.
- Types are imported with `import type`, enforced by ESLint.
- Tailwind class order is handled by Prettier — don't hand-sort.
- Use `cn()` for conditional classes so a caller's `className` can override a
  component's defaults without `!important`.
- Every interactive element needs a visible `:focus-visible` state. The global
  ring is set in `global.css`; don't remove it per-component.
- Honour `prefers-reduced-motion`. The global kill-switch in `global.css`
  neutralises transitions, but JS-driven animation must check it too.


---

## Quality gates

Four of the six scripts need a server; `build` then `preview` first.

```bash
npm run check:tokens                                   # static
npm run check:contrast                                 # static
npm run verify:images                                  # network
npm run check:a11y     -- http://localhost:4173
npm run check:overflow -- http://localhost:4173 / /luxe /estimate
npm run check:perf     -- http://localhost:4173
```

Where the build stands:

| Gate | Result |
|---|---|
| axe-core, 18 routes × 2 widths | 0 serious or critical violations |
| Heading order, alt text, skip link, single `h1` | clean on every route |
| Colour contrast | every token pair meets AA |
| Horizontal overflow, 20 routes × 11 widths | none, 320–1920 |
| CLS | 0 on every route measured |
| CSS | 15 kB gzipped, against a 50 kB budget |
| LCP | 2.2–3.7s on inner routes, higher on `/`, against a 2.5s budget |

**LCP on the homepage does not meet the budget.** It is the longest and most
image-heavy route, and the cost is the SPA bootstrap: nothing paints until the
JavaScript has downloaded, parsed and run. Everything available inside that
constraint has been done — route-level splitting, vendor chunks, an eager index
route, priority hints on above-the-fold images, lower-quality phone crops. The
structural fix is server-rendered or prerendered HTML, which PLAN.md §9 lists
as a non-goal for this build. Moving to Next.js would address it; the rest of
the plan is unaffected by that choice.

A hero `<link rel="preload">` was tried and removed: `index.html` is served for
every route, so it pulled ~110 kB of the homepage hero on pages that never show
it. Scoping it per route needs server-rendered HTML too.
