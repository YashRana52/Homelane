# Component inventory

Three layers, and the dependency runs one way only:

```
ui/          primitives        — no business logic, no data imports
components/  composed blocks   — may use ui/ and data/
pages/       routes            — may use everything
```

`ui/` never imports from `components/`, and `components/` never imports from
`pages/`. Breaking that is how a component library turns into a knot.

---

## `src/ui/` — primitives (21)

| Component | Key props | Notes |
|---|---|---|
| `Accordion` | `items` · `mode` 'single' \| 'multiple' · `defaultOpen` · `variant` 'card' \| 'plain' · `headingLevel` | `headingLevel` exists so the footer's columns can be `h2` and match their desktop counterparts. Wrong level = a heading-order violation |
| `AspectImage` | `src` · `srcSet` · **`sizes` (required)** · `alt` · `ratio` · `priority` · `zoomOnHover` | Reserves its box with `aspect-ratio` before the file lands. `sizes` is required on purpose — a wrong one is the main cause of a phone pulling a desktop image |
| `Badge` | `tone` new \| offer \| gold \| success \| info \| neutral \| onImage | Non-interactive label |
| `Breadcrumb` | `items` | |
| `Button` | `variant` · `size` · `fullWidth` · `pill` · `loading` · `iconLeft/Right` · `to` \| `href` | Picks its element from props: `to` → router `Link`, `href` → `<a>`, neither → `<button>`. Never make a navigation a `<button>` |
| `Carousel` | `children` · `perView` · `arrows` · `dots` · `loop` · `autoplay` · `label` | Embla. Over 10 slides the dot row becomes an `n / total` counter — 16 dots plus arrows do not fit 320px. Arrows hide via the `touch:` variant, not JS |
| `Checkbox` / `Radio` | `label` · `description` · `error` | Native input under a custom mark |
| `Chip` | `active` · `count` · `onDismiss` | Reports state with `aria-pressed`, not colour |
| `Container` | `size` default \| narrow \| wide \| full | Gutter + max width. The gutter is a token, so it widens on its own |
| `Heading` / `Eyebrow` | `as` (semantics) · `level` (size) · `style` | The two are separate on purpose: pick `as` from the document outline, never from how big the text should look |
| `Input` | `label` · `error` · `helper` · `prefix` · `hideLabel` | Label always rendered; `hideLabel` moves it off-screen. Errors sit in an always-mounted `aria-live` region |
| `Modal` | `open` · `onClose` · `title` · `size` · `footer` · `dismissible` | Bottom sheet under 640px. Focus moves in, cycles inside, and returns to the opener |
| `Pagination` | `page` · `totalPages` · `onChange` · `siblings` | Compact "Page 7 of 162" below 480px — the full range needs ~428px |
| `ProgressBar` | `step` · `total` · `labels` | With `labels` it renders a numbered rail, without them a fill bar |
| `Range` | `label` · `value` · `min` · `max` · `unit` | Slider plus a number field, sharing one label. Filled track is a gradient on the native pseudo-element |
| `Rating` | `value` · `max` · `count` · `size` | 4.5 renders a real half star |
| `Reveal` / `RevealGroup` | `delay` · `y` · `as` | Scroll reveal, once. Renders in place under reduced motion |
| `Section` | `pad` · `bg` · `container` | One full-width band. `container={false}` to bleed |
| `Select` | `label` · `options` · `placeholder` · `error` | Native `<select>` — gets the mobile wheel picker and type-ahead free |
| `Skeleton` / `SkeletonText` / `SkeletonCard` | `lines` · `className` | Card proportions match the real card |
| `Tabs` | `items` · `variant` · `defaultTab` | Roving tabindex, arrow keys. No negative-margin bleed — it only lines up at the page container |

---

## `src/components/`

### `layout/` — the chrome every page shares

`RootLayout` · `Header` · `UtilityBar` · `MegaMenu` · `MobileDrawer` ·
`Footer` · `FloatingCTA` · `PageTransition`

The utility strip is in normal flow and scrolls away; only the row beneath it
is sticky. Collapsing a fixed header with JS changes its height, which either
shifts the page or leaves a gap.

### `cards/`

`DesignCard` · `ProjectCard` · `RoomTile` · `ServiceCard` · `TestimonialCard`

`DesignCard` carries two actions, so it is not one big link. The photo and the
title are two links to the same place; the photo is `aria-hidden` with
`tabIndex={-1}`, which keeps the card to four tab stops instead of six.

### `sections/` — homepage and inner-page bands (21)

`AwardsStrip` · `CityLinkGrid` · `ClosingCTA` + `SeoBlock` · `ComparisonTable` ·
`DesignScroller` · `DesignSessionSteps` · `EstimatePromo` · `ExperienceCentres` ·
`FaqSection` · `LogoStrip` · `LuxePromo` · `MagazinePreview` · `ProcessStepper` ·
`ProjectShowcase` · `ReferralBanner`/`NriSection`/`VastuPromo` · `RoomTileGrid` ·
`ServiceGrid` · `SolutionGrid` · `StatsStrip` · `TestimonialCarousel` · `TrustBar`

`ProcessStepper` is two layouts from one state: a tablist with roving tabindex
above `lg`, an accordion below. They do **not** share ARIA — two `role="tab"`
trees would give a screen reader two competing tablists for one control.

### `funnel/` — lead capture and the calculators

| Component | Notes |
|---|---|
| `LeadModalProvider` + `useLeadModal()` | One modal at the root; any CTA opens it with a `source` for attribution. The hook lives in `leadModalContext.ts` so the provider file exports only a component — mixing them breaks Fast Refresh |
| `LeadForm` | Validates on submit, re-validates on change once a field has failed. Moves focus to the first error |
| `EstimateFlow` | The two-question funnel. The range appears before the form, so the number is asked for in exchange for something already given |
| `CalculatorWizard` | One component for all three calculators; everything that differs comes from `data/calculators.ts` |
| `WizardChrome` | Progress, heading, Back/Next. Sticky action bar on phones |
| `OptionCardGroup` | Native radio/checkbox under a stretched transparent input — arrow keys and "2 of 4" announcements come free |
| `PackageSelector` | Same pattern. A `<div role="radio">` containing a focusable button is a `nested-interactive` violation |
| `MaterialSwatch` · `LayoutPlan` | `LayoutPlan` draws the chosen layout as a diagram, not a floor plan — the job is "yes, that shape" at card size |
| `EstimateResult` | A band, never a single figure. One rupee number implies precision the model does not have |

---

## `src/hooks/`

| Hook | Purpose |
|---|---|
| `useMediaQuery` / `MQ` | Only when *behaviour* must change. Anything visual belongs in a Tailwind class — the hook returns `false` on first render |
| `usePrefersReducedMotion` | For JS-driven motion. CSS is handled globally |
| `useLockBodyScroll` | Reference-counted, pays back the scrollbar width, pins scroll for iOS |
| `useScrollDirection` | Header shadow and the floating CTA. rAF-batched with a travel threshold |
| `useStepper` | Step in the URL (`?step=3`) so Back is "previous question"; answers in `sessionStorage` so a refresh does not wipe them, and a shared link carries nobody's data |

---

## `src/data/`

`calculators` · `designs` · `process` · `projects` · `proof` · `rooms` ·
`services` · `solutions` · `stats` · `testimonials`

All mock. No network calls anywhere in the app.

---

## Two traps worth knowing

**1. Grid and flex items default to `min-width: auto`.** They will grow past
their track rather than let content wrap. This caused three separate
horizontal-overflow bugs — the Tabs strip, the design-detail column, the city
studio card. If an item contains anything wide, give it `min-w-0`.

**2. Tailwind silently emits nothing for an undefined token.** `text-surface-500`
is not an error; the element just inherits its colour and the styling you wrote
never applies. `npm run check:tokens` catches it.
