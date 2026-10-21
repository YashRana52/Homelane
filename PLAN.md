# Premium Interior-Design Website — UI Build Plan

**Project:** Aangan Interiors (placeholder brand — see §1.1)
**Reference analysis:** livspace.com + homelane.com (deep UI/CSS audit, Oct 2026)
**Scope of this document:** UI only. No backend, no CMS, no payments. All data from local mock files.
**Last updated:** 2026-10-20

---

## 1. Assumptions

Ye do decisions maine le liye hain taaki plan concrete rahe. Change karna ho to batao — jahan asar padega wo niche marked hai.

### 1.1 Brand

Hum **apna brand** bana rahe hain, kisi ka clone nahi. Placeholder naam **"Aangan Interiors"**.
Naam / logo / colors sirf do files me hain — `src/config/brand.ts` aur `src/styles/tokens.css` — to rename 2-minute ka kaam hai.

> Kyun: Livspace/HomeLane ka exact clone (same naam + logo + copy) publish karna legally problematic hai. Visual language aur UX patterns copy karna bilkul theek hai — wahi kar rahe hain.

### 1.2 Scope

**Full multi-page site**, sirf homepage nahi. 9 route groups (§5).

### 1.3 Design direction

- **Base palette:** Livspace ka warm premium system (coral + plum + warm greys)
- **Funnel discipline:** HomeLane se (sticky CTA, stats strip, 6-step stepper, dense proof sections)
- **Luxe tier:** dark + gold variant theme

---

## 2. Tech Stack

| Layer | Choice | Kyun |
|---|---|---|
| Framework | **React 19** | Latest stable, `use` hook + better Suspense |
| Build | **Vite 7** + TypeScript 5.x | Fastest DX, instant HMR |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | v4 ka CSS-first config = tokens as native CSS variables. Dono reference sites bilkul yahi karti hain |
| Routing | **React Router v7** (declarative mode) | Multi-page, nested layouts, lazy routes |
| Animation | **motion** v12 (Framer Motion ka naya package naam) | Scroll reveals, stepper, modal transitions |
| Carousel | **embla-carousel-react** v8 | 4kb, HomeLane jaisa arrow + dot control, touch-native |
| Icons | **lucide-react** | 1500+ icons, tree-shakeable |
| Forms | **react-hook-form** + **zod** | Calculator wizard + lead form validation |
| Fonts | **Poppins** (display) + **Inter** (body), self-hosted via `@fontsource` | No FOUT, no Google CDN dependency |
| Lint / Format | ESLint 9 flat config + Prettier + `prettier-plugin-tailwindcss` | Class-order consistency |

### 2.1 Install commands (Phase 0 me run honge)

```bash
npm create vite@latest . -- --template react-ts

npm i react-router @tailwindcss/vite tailwindcss motion \
      embla-carousel-react embla-carousel-autoplay \
      lucide-react react-hook-form zod @hookform/resolvers \
      @fontsource-variable/inter @fontsource/poppins clsx tailwind-merge

npm i -D prettier prettier-plugin-tailwindcss eslint-plugin-jsx-a11y \
         @types/node vite-plugin-svgr
```

> Versions pin nahi kiye — npm latest stable resolve karega. Lock file commit karna.

---

## 3. Design System

Ye values live CSS audit se nikali hain, guess nahi.

### 3.1 Color tokens → `src/styles/tokens.css`

```css
:root {
  /* Brand — primary (coral) */
  --c-primary-50:  #fdeeef;
  --c-primary-200: #f8c4c6;
  --c-primary-300: #f18b8f;
  --c-primary-500: #eb595f;   /* main CTA */
  --c-primary-600: #d94c50;   /* hover */
  --c-primary-700: #bc474c;   /* active */

  /* Brand — secondary (plum) */
  --c-secondary-300: #8e7d8b;
  --c-secondary-500: #5e455a;
  --c-secondary-700: #41303e;  /* primary text color */

  /* Warm neutral surface scale */
  --c-surface:     #ffffff;
  --c-surface-50:  #f5f4f5;
  --c-surface-100: #eceaeb;
  --c-surface-200: #d9d6d8;
  --c-surface-400: #a0979e;
  --c-surface-600: #7a6e77;
  --c-surface-900: #41303e;

  /* Accents */
  --c-gold-400: #ffc766;   /* Luxe tier */
  --c-gold-600: #c19038;
  --c-gold-800: #aa8017;
  --c-mustard:  #ffbb33;   /* offer / badge highlights */
  --c-success:  #469e59;
  --c-warning:  #f6ab2f;
  --c-error:    #a20b00;
  --c-info:     #365677;

  /* Radii */
  --r-xs: 4px;  --r-sm: 8px;  --r-md: 12px;
  --r-lg: 16px; --r-xl: 24px; --r-pill: 100px;

  /* Elevation — soft, premium (not harsh) */
  --e-1: 0 1px 2px  rgb(65 48 62 / .06);
  --e-2: 0 4px 12px rgb(65 48 62 / .08);
  --e-3: 0 8px 28px rgb(65 48 62 / .10);
  --e-4: 0 16px 48px rgb(65 48 62 / .14);

  /* Layout */
  --container-max: 1280px;
  --gutter-sm: 16px;
  --gutter-md: 24px;
  --gutter-lg: 40px;
  --header-h:    64px;
  --header-h-lg: 104px;   /* utility row + main row */
}

[data-theme="luxe"] {
  --c-primary-500:   var(--c-gold-600);
  --c-surface:       #14100f;
  --c-surface-50:    #1d1816;
  --c-secondary-700: #f5f0e8;
}
```

Tailwind v4 me ye tokens `@theme` block se map honge — phir `bg-primary-500`, `text-secondary-700` jaisi utilities mil jayengi.

### 3.2 Typography

| Role | Font | Mobile | Desktop | Weight | Tracking |
|---|---|---|---|---|---|
| Display / hero h1 | Poppins | 32px | 56px | 600 | -0.02em |
| h2 (section) | Poppins | 24px | 40px | 600 | -0.015em |
| h3 (card title) | Poppins | 18px | 22px | 600 | -0.01em |
| h4 | Poppins | 16px | 18px | 500 | 0 |
| Body L | Inter | 16px | 18px | 400 | 0 |
| Body | Inter | 14px | 16px | 400 | 0 |
| Caption | Inter | 12px | 13px | 400 | 0.01em |
| Button | Inter | 14px | 15px | 600 | 0.02em |
| Overline / eyebrow | Inter | 11px | 12px | 700 | 0.12em, uppercase |

**Fluid approach:** `clamp()` use karenge — e.g. h1 = `clamp(2rem, 5vw, 3.5rem)`. Isse breakpoint pe size jump nahi dikhta.
**Line heights:** headings `1.15`, body `1.6`, caption `1.5`.

### 3.3 Spacing scale

4px base: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120`
**Section vertical padding:** mobile `48px`, tablet `64px`, desktop `96px`.

### 3.4 Breakpoints (mobile-first)

| Name | Width | Target | Notes |
|---|---|---|---|
| base | 0–479 | Phone portrait | Design baseline = **390px** |
| `sm` | 480 | Large phone | |
| `md` | 768 | Tablet | **Main switch point** — reference sites ki 115 media queries yahin hain |
| `lg` | 1024 | Small laptop | Mega-menu yahan se on |
| `xl` | 1280 | Desktop | Container max-width |
| `2xl` | 1536 | Large desktop | Sirf gutter badhta hai, content nahi |

---

## 4. Responsive Strategy

Ye plan ka core hai — har phase isi ke against test hoga.

### 4.1 Rules

1. **Mobile-first always.** Base CSS = mobile. `md:` / `lg:` se upar build karo. Koi `max-width` query nahi.
2. **Design baseline 390px**, stress-test 320px pe. Horizontal scroll zero tolerance.
3. **16px side gutter** mobile pe non-negotiable.
4. **Touch targets ≥ 44×44px** mobile pe.
5. **Images:** `<picture>` + `srcset` + `aspect-ratio` + `loading="lazy"` + explicit `width`/`height` → CLS zero.
6. **Container:** `width: min(100% - 2 * var(--gutter), var(--container-max)); margin-inline: auto;`

### 4.2 Grid behaviour per component

| Component | base | `md` (768) | `lg` (1024) | `xl` (1280) |
|---|---|---|---|---|
| Service cards | 1 col stack | 2 col | 3 col | 5 col |
| Room category tiles | 2 col | 3 col | 4 col | 6 col |
| Design gallery cards | 1 col | 2 col | 3 col | 4 col |
| Stats strip | 2×4 grid | 4×2 grid | 8 inline | 8 inline |
| Testimonials | 1 card + swipe | 2 cards | 3 cards | 3 cards |
| Project showcase | horiz scroll (peek) | 2 cards | 3 cards | 3 cards |
| Footer columns | accordion | 2 col | 4 col | 4 col |
| Calculator options | 2 col | 3 col | 4 col | 4 col |

### 4.3 Navigation behaviour

- **< 1024px:** hamburger → full-screen slide-in drawer (`translateX(-100%)` → `0`), nested accordions for mega-menu sections, phone + CTA pinned at drawer bottom
- **≥ 1024px:** two-row sticky header, hover-triggered mega-menu panels
- **Mobile sticky bottom bar** (< 768px): `[Call]` + `[Get Free Estimate]` — hero scroll-past hone ke baad appear

### 4.4 Hero responsive

- **Mobile:** `min-height: 424px`, image `object-position: center`, text bottom-aligned, gradient `linear-gradient(to top, #0009, #0000004d, transparent)`
- **Desktop:** `min-height: 87vh` (capped at `800px`), text left-aligned, padding `64px 95px`

### 4.5 Device test matrix (Phase 9)

`320 · 360 · 390 · 414 · 480 · 768 · 834 · 1024 · 1280 · 1440 · 1920`
Plus: iPhone SE, iPhone 15 Pro, Pixel 8, iPad Mini/Pro (portrait + landscape), 13" laptop.

---

## 5. Routes

| Route | Page | Phase |
|---|---|---|
| `/` | Homepage | 3–5 |
| `/design-ideas` | Gallery hub (all categories) | 7 |
| `/design-ideas/:category` | Category listing (kitchen, living-room, wardrobe, bedroom…) | 7 |
| `/design-ideas/:category/:slug` | Single design detail | 7 |
| `/offerings/:slug` | Modular / Full Home / Value / Renovation | 7 |
| `/luxe` | Luxury sub-brand (dark + gold theme) | 7 |
| `/price-calculator` | Calculator hub | 6 |
| `/price-calculator/:type` | `full-home` · `kitchen` · `wardrobe` wizard | 6 |
| `/estimate` | 2-step quick estimate flow | 6 |
| `/interiors/:city` | City landing (SEO template, 100 cities) | 7 |
| `/projects` + `/projects/:slug` | Completed project showcase | 7 |
| `/magazine` + `/magazine/:slug` | Blog list + article | 7 |
| `/store-locator` | Experience centres | 7 |
| `/refer` · `/nri` · `/vastu` | Standalone promo landers | 7 |
| `/about` · `/contact` · `/careers` · `/policies` | Static | 7 |
| `/dev/kitchen-sink` | Internal component showcase (dev only) | 1 |

---

## 6. Folder Structure

```
src/
├── main.tsx
├── App.tsx                      # RouterProvider
├── routes.tsx                   # route tree, lazy()
├── config/
│   ├── brand.ts                 # name, logo, phone, email, socials
│   └── nav.ts                   # mega-menu data (single source of truth)
├── styles/
│   ├── tokens.css               # §3.1 CSS variables
│   ├── theme.css                # Tailwind v4 @theme mapping
│   └── global.css               # resets, fonts, base type
├── ui/                          # PRIMITIVES — zero business logic
│   ├── Button.tsx   Container.tsx  Section.tsx     Heading.tsx
│   ├── Badge.tsx    Chip.tsx       Input.tsx       Select.tsx
│   ├── Modal.tsx    Accordion.tsx  Tabs.tsx        Skeleton.tsx
│   ├── Rating.tsx   Carousel.tsx   ProgressBar.tsx Breadcrumb.tsx
│   └── Pagination.tsx  AspectImage.tsx  Reveal.tsx
├── components/                  # COMPOSED blocks
│   ├── layout/    Header UtilityBar MegaMenu MobileDrawer Footer FloatingCTA
│   ├── hero/      HeroBanner PromoBanner ClosingCTA
│   ├── cards/     ServiceCard RoomTile DesignCard ProjectCard ArticleCard
│   │              TestimonialCard SolutionTile AwardBadge LogoStrip
│   ├── sections/  StatsStrip ServiceGrid RoomTileGrid DesignScroller
│   │              ProcessStepper DesignSessionSteps TestimonialCarousel
│   │              TrustBar PartnerLogos GoogleRating MagazinePreview
│   │              ReferralBanner NriSection ExperienceCentres FaqSection
│   │              CityLinkGrid SeoBlock PriceTable ComparisonTable LuxePromo
│   └── funnel/    LeadModal LeadForm EstimateFlow CalculatorWizard
│                  OptionCardGroup MeasurementStep PackageSelector EstimateResult
├── pages/                       # one folder per route
├── data/                        # mock JSON — designs, projects, cities, faqs, testimonials
├── hooks/                       # useMediaQuery useScrollDirection useLockBodyScroll useStepper
└── lib/                         # cn() formatINR() slugify()
```

**Rule:** `ui/` kabhi `components/` import nahi karega. `components/` kabhi `pages/` import nahi karega. One-way dependency.

---

## 7. Phase-wise Build Plan

**10 phases.** Har phase independently shippable + reviewable hai. Estimates solo-dev full-time ke hisaab se.

---

### Phase 0 — Foundation & Setup — ✅ DONE (2026-10-20)

**Goal:** Running skeleton with design tokens wired. Koi UI nahi, bas base.
**Est:** 0.5 day

**Deliverables**

- Vite + React 19 + TS scaffold, strict mode on
- All deps installed, `package-lock.json` committed
- Tailwind v4 via `@tailwindcss/vite`, `@theme` block me saare tokens mapped
- `tokens.css` + `theme.css` + `global.css` (§3.1, §3.2)
- Fonts self-hosted (`@fontsource/poppins` 400/500/600/700, `@fontsource-variable/inter`)
- CSS reset + `box-sizing` + `scroll-behavior: smooth` + `prefers-reduced-motion` guard
- ESLint flat config + Prettier + tailwind class sorting + `jsx-a11y`
- Path alias `@/` → `src/`
- `lib/cn.ts` (clsx + tailwind-merge)
- `config/brand.ts` with name / phone / email / socials
- Folder structure (§6) created
- `README.md` — run / build commands

**Acceptance**

- `npm run dev` clean start, `npm run build` zero errors
- `<h1 className="font-display text-primary-500">` correctly renders coral Poppins
- Lint passes

---

### Phase 1 — Design System / Primitives — ✅ DONE (2026-10-20)

**Goal:** Saare atomic UI pieces — responsive + accessible — ek showcase page pe visible.
**Est:** 2 days

**Deliverables — `src/ui/` (20 primitives)**

| Component | Variants / API |
|---|---|
| `Button` | `variant`: primary · secondary · outline · ghost · gold · link · `size`: sm/md/lg · `fullWidth` · `loading` · `iconLeft/Right` · renders as `<a>` or `<button>` |
| `Container` | `size`: default · wide · narrow · full |
| `Section` | `pad`: sm/md/lg/none · `bg`: white · surface · plum · gradient |
| `Heading` | `as` (h1–h6) decoupled from `level` (visual size), fluid clamp |
| `Eyebrow` | uppercase overline label |
| `Badge` | `tone`: new · offer · gold · success · neutral |
| `Chip` | selectable filter pill with `active` state |
| `Input` | label, placeholder, error, helper, prefix (`+91`), `inputMode` |
| `Select` | native-styled + custom chevron |
| `Checkbox` / `Radio` | consent + option use |
| `Modal` | focus trap, `Esc` close, scroll lock, mobile = bottom sheet |
| `Accordion` | single/multi open, keyboard nav, correct ARIA |
| `Tabs` | roving tabindex, scrollable on mobile |
| `Carousel` | Embla wrapper: arrows, dots, responsive `slidesPerView` map, drag-free option |
| `ProgressBar` | step counter (`Step X of Y`) + fill bar |
| `Pagination` | numbered + truncation + Prev/Next |
| `AspectImage` | `ratio`, `srcSet`, blur-up placeholder, lazy, zero-CLS |
| `Rating` | star display + review count |
| `Skeleton` | text · card · image shimmer |
| `Reveal` | motion scroll-reveal wrapper (fade + 16px rise, 0.5s, once, reduced-motion safe) |

**Also:** `useMediaQuery`, `useLockBodyScroll`, `usePrefersReducedMotion` hooks

**Route:** `/dev/kitchen-sink` — har primitive, har variant, har state, side by side.

**Acceptance**

- Kitchen-sink page 320px → 1920px clean, zero horizontal scroll
- Keyboard-only: har interactive element reachable, visible focus ring (`2px` outline, primary, `2px` offset)
- `Modal`: focus trapped, `Esc` works, background scroll locked
- Reduced-motion on → `Reveal` instantly visible, no transition

---

### Phase 2 — App Shell (Header + Footer + Routing) — ✅ DONE (2026-10-20)

**Goal:** Har page pe consistent chrome. Navigation fully responsive.
**Est:** 2.5 days

**Deliverables**

- `routes.tsx` — full route tree (§5) with `lazy()` + `Suspense` fallback, placeholder pages
- `RootLayout` — Header + `<Outlet/>` + Footer + FloatingCTA + ScrollRestoration
- `config/nav.ts` — mega-menu ka pura data (categories, cities, guides, offerings) ek jagah
- **`UtilityBar`** (≥ lg only): Own a Franchise · Refer & Earn · Join Us · phone · Store Locator · Login
- **`Header`** — sticky `position: fixed`, scroll pe shadow appear, scroll-down pe utility row collapse (104px → 64px)
- **`MegaMenu`** — hover + focus triggered, multi-column panels:
  - Design Ideas (28 links / 2 col) · Guides (7) · Cities (100+, alphabetical, 4 col) · Offerings (2 cards w/ description) · Price Calculators (3)
  - `Esc` closes, outside-click closes, arrow-key nav
- **`MobileDrawer`** — hamburger → full-screen slide-in, nested accordions, bottom-pinned phone + CTA
- **`Footer`** — 5 link columns (mobile pe accordion), social icons, app badges, contact, legal + asterisk footnotes, SEO paragraph slot
- **`FloatingCTA`** — mobile `< 768px` only, bottom fixed bar, hero past hone pe slide-up
- `useScrollDirection` hook
- 404 page

**Acceptance**

- Mega-menu mouse + keyboard dono se operable, focus leak nahi
- Drawer open pe body scroll locked; close pe focus hamburger pe return
- Sticky header content ko overlap nahi karta (`scroll-margin-top` set)
- 1024px pe hamburger → mega-menu switch clean, no flash
- Footer accordion on mobile, grid on desktop

---

### Phase 3 — Homepage Part A: Above-fold + Trust — ✅ DONE (2026-10-20)

**Goal:** Pehli screen premium lage aur trust immediately establish ho.
**Est:** 2 days

**Deliverables**

- **`HeroBanner`** — full-bleed `<picture>` (mobile/tablet/desktop crops), gradient overlay, eyebrow + h1 + subcopy + primary CTA + secondary text-link, optional inline trust row. Responsive per §4.4
- **`StatsStrip`** — 8 items (45-day delivery · No hidden costs · 10-yr warranty · Easy EMI · 600+ designers · 55,000+ homes · 87 studios · 55 cities). Mobile 2×4 → desktop 8 inline. Icon + number + label
- **`PromoBanner`** — inline strip, text + inline CTA, 2 color variants (mustard offer / plum premium)
- **`ServiceGrid`** + **`ServiceCard`** — 5 cards (Modular · Full Home · Luxury · Value · Renovation): image, title, 1-line desc, chevron; hover = image zoom + chevron slide
- **`RoomTileGrid`** + **`RoomTile`** — 12 room categories, image + label overlay, gradient scrim for text legibility, hover scale
- **`TrustBar`** — 7 icon items (lifetime warranty · 45-day move-in · 146 quality checks · 1L+ homes · 100+ cities · 20L+ products · 2000+ designers)
- `data/services.ts`, `data/rooms.ts`, `data/stats.ts`
- Placeholder image strategy: fixed-ratio gradient placeholders with correct aspect ratios (real images later drop-in)

**Acceptance**

- Hero: 424px min-height at 390px; 87vh at 1440px
- Zero CLS — har image ka `aspect-ratio` reserved
- Service cards 1 → 2 → 3 → 5 col at base/md/lg/xl
- Room tiles 2 → 3 → 4 → 6 col
- Hero text contrast ≥ 4.5:1 over image at every breakpoint

---

### Phase 4 — Homepage Part B: Galleries & Carousels — ✅ DONE (2026-10-20)

**Goal:** Design-inspiration sections — site ka sabse visual hissa.
**Est:** 2 days

**Deliverables**

- **`DesignCard`** — full anatomy: image, descriptive title (2-line clamp), layout/dimension tag chips (`L-Shaped`, `13 × 12 ft`), price `₹5,26,000` (Indian numbering), `Size: 12×10 feet`, dual CTA (`Book Free Consultation` + `Get Quote`), wishlist heart toggle
- **`DesignScroller`** — section header (`h2` + `See All` link) + Embla carousel. 3 instances on homepage: Modular Kitchen (10) · Living Room (10) · Wardrobe (10). Mobile = peek scroll (1.15 slides visible); desktop = 4 slides + arrows + dots
- **`ProjectCard`** + **`ProjectShowcase`** — 6 completed projects (title + BHK + city + style tag), section CTA `Get Free Quote`
- **`SolutionTile`** + **`SolutionGrid`** — 15 end-to-end solution tiles (Kitchen, Wardrobe, Crockery Unit, TV Unit, False Ceiling, Lights, Wallpaper, Paint, Bathroom, Pooja Unit, Foyer, Study Table, Movable Furniture, Kids Bedroom, Space-Saving)
- **`EstimatePromo`** — 3 estimate cards (Full Home · Kitchen · Wardrobe) with `Calculate Now`, tab variant
- `lib/formatINR.ts` — `526000` → `₹5,26,000`
- `data/designs.ts` (30 entries), `data/projects.ts` (6), `data/solutions.ts` (15)

**Acceptance**

- Carousel touch-drag smooth on mobile; arrows hidden on touch devices
- Dot indicators correct active state; keyboard arrow-key nav works
- Off-screen carousel slides lazy-load
- Price formatting in Indian lakh system
- 2-line title clamp — long titles layout nahi todhte

---

### Phase 5 — Homepage Part C: Process, Proof, Closing — ✅ DONE (2026-10-20)

**Goal:** Homepage complete. Trust → process clarity → final conversion push.
**Est:** 2.5 days

> **M2 reached — the homepage is complete.** 28 bands, CLS 0.0000, no
> horizontal overflow at any width from 320 to 1920.
>
> Two deviations from the deliverable list, both deliberate:
> - `GoogleRating` is not a standalone band. The aggregate score sits beside
>   the testimonial heading instead, because a rating split away from the
>   reviews it summarises reads as a badge rather than a summary.
> - Press and partner names are **invented**. Real logo files are a brand
>   asset, and printing actual publication or manufacturer names would be a
>   false endorsement claim rather than a placeholder. See `src/data/proof.ts`.

**Deliverables**

- **`DesignSessionSteps`** — 4 numbered steps (Meet Your Designer → Studio Walkthrough → Free 3D Designs → Instant Quote). Mobile vertical timeline, desktop horizontal with connector line
- **`ProcessStepper`** — **6-step interactive stepper**, is phase ka biggest component:
  - Numbered clickable tabs + `Step 1 of 6` indicator
  - Per step: title, description, payment milestone (10% → 10% → 30% → 50%), illustration
  - Desktop: horizontal tab rail + content panel. Mobile: vertical accordion / swipe
  - Optional auto-advance, motion content transitions
- **`TestimonialCarousel`** + **`TestimonialCard`** — 16 testimonials (quote icon, text 4-line clamp + "read more", name, city, rating). Custom arrows (40px circle, white, shadow) + dots (active = primary)
- **`AwardBadge`** strip — 5 awards
- **`LogoStrip`** — 2 instances: press logos (12) + partner brands (36). Infinite marquee on desktop (CSS animation, pause on hover), grid on mobile; `prefers-reduced-motion` → static grid
- **`GoogleRating`** — 4.5/5 stars + "35,000+ reviews" + logo
- **`MagazinePreview`** — 3 article cards (image, category chip, headline, author, date, read-time) + `See More`
- **`LuxePromo`** — dark + gold full-width band → `Enter the world of Luxe`
- **`ReferralBanner`** — "Loved us? Now refer us!" ₹10,000 → `Refer Now`
- **`NriSection`** — split image/text → `Visit Us`
- **`ExperienceCentres`** — 5 city cards + "MORE ON THE WAY" badge
- **`VastuPromo`** — → `Analyze My Home`
- **`FaqSection`** — 6 accordions, FAQ-schema-ready markup
- **`CityLinkGrid`** — 100 city links, collapsible ("Show all cities")
- **`SeoBlock`** — long-form content, proper heading hierarchy, `max-width: 72ch`
- **`ClosingCTA`** — "Confused Between Styles, Layouts, and Costs?" + `Meet a Designer` + 4 feature cards
- `data/testimonials.ts` (16), `data/faqs.ts`, `data/cities.ts` (100), `data/articles.ts`

**Acceptance**

- Full homepage 320 → 1920 flawless, zero horizontal scroll anywhere
- Stepper operable via mouse + keyboard + touch; active state clear
- Marquee static under reduced-motion
- Accordion `aria-expanded` + `aria-controls` correct
- Homepage total section count ≥ 19 (reference parity)

---

### Phase 6 — Lead Capture & Calculators — ✅ DONE (2026-10-20)

**Goal:** Conversion machinery. Ye site ka actual product hai.
**Est:** 3 days

> **M3 reached — the conversion machinery and calculator engine are complete.**
>
> All deliverables are live, responsive, and accessible:
> - **`LeadModal`** + `LeadForm`: Global context-driven modal (`useLeadModal`), full Zod schema validation (`lib/schemas.ts`), screen-reader live announcements (`aria-live="polite"`), and simulated submission delay.
> - **`EstimateFlow`**: 30-second 2-step funnel with instant price range calculation and a dedicated post-submission estimate breakdown screen.
> - **`CalculatorWizard`**: 5-step interactive engine for Modular Kitchen, Wardrobe, and Full Home, with dual slider + numeric inputs, live SVG layout preview, and Indian rupee formatting.
> - **`PackageSelector`**: Essentials, Premium, Luxe, and Build Your Own tier comparison cards, integrated into `CalculatorWizard` step presets and `CalculatorHub`.
> - **`MaterialSwatch`**: Tactile finish preview cards (matte laminate, high-gloss acrylic sheen, PU satin spray, and natural veneer timber grain).
> - **`EstimateResult`**: Costed range, per-sqft breakdown, expandable line-item table, EMI quote, print-ready layout (`window.print`), and consultation booking.
> - **Persistence**: Wizard step in URL history (Back button steps back within the wizard) and selections saved to `sessionStorage`.

**Deliverables**

- **`LeadModal`** — global, context-triggered via `useLeadModal()`. Any CTA se khulta hai, source tracking ke saath. Mobile = bottom sheet, desktop = centered dialog. Fields: Name · `+91` Phone · Email · City (searchable select) · Property type · Consent checkbox. Inline validation + loading + success state
- **`EstimateFlow`** — HomeLane-style 2-step quick funnel:
  - Header: "Get your free estimate in under 30 seconds!" + "Share your preferences for an accurate estimate"
  - `STEP 1 OF 2` indicator
  - Q1 **Your floorplan** → 4 option cards: `1 BHK` `2 BHK` `3 BHK` `3+ BHK`
  - Q2 **Purpose** → 3 cards: `Move In` `Rent Out` `Renovate`
  - Step 2 → contact details → success screen with estimate range
- **`CalculatorWizard`** — reusable 5-step engine (Livspace-style), config-driven:
  1. **Layout** — 4 shape option cards with illustration (Sleek L-shaped · Spacious U-shaped · Essential Straight · Elegant Parallel), `START NOW`
  2. **Measurements** — dual sliders + numeric inputs, shape-based auto-prefilled defaults, live mini floor-plan SVG preview
  3. **Accessories** — multi-select checkbox cards with per-item price delta
  4. **Materials & Finishes** — Laminate · Acrylic · PU · Veneer, swatch cards + price-tier badge
  5. **Appliances & On-site services** — add-on toggles (hob, chimney, oven, electrical, plumbing)
- **`PackageSelector`** — Essentials · Premium · Luxe comparison cards + "Build Your Own"
- **`OptionCardGroup`** — generic selectable card group (single/multi), responsive 2 → 3 → 4 col, keyboard radio-group semantics
- **`EstimateResult`** — total range, per-sqft breakdown, collapsible line-item table, EMI line ("EMIs as low as ₹3,300/month"), `Download Estimate` + `Book Free Consultation`, asterisk disclaimer
- **Wizard chrome:** progress bar, step counter, Back/Next, sticky mobile footer buttons, browser-back → previous step, state persisted to `sessionStorage`
- 3 calculator configs: `full-home` · `kitchen` · `wardrobe`
- `useStepper` hook, zod schemas, `lib/pricing.ts` (mock calculation engine)

**Acceptance**

- Pura wizard flow keyboard-only completable
- Mobile pe Next/Back sticky footer me, thumb-reachable
- Refresh pe step + selections preserved
- Validation errors screen-reader announced (`aria-live`)
- Browser back button steps back, page exit nahi karta
- Estimate numbers Indian format, asterisk disclaimer present

---

### Phase 7 — Inner Pages — ✅ DONE (2026-10-20)

**Goal:** Site ko real multi-page banao. Templates reusable rahein.
**Est:** 4 days

> **M4 reached — Full multi-page interior design portal implemented.**
>
> All inner route groups and reusable page templates are fully implemented, responsive, accessible, and code-split:
> - **Gallery Hub** (`/design-ideas`): Visual room category grid, trending designs scroller, style filters, and trust badges.
> - **Category Listing** (`/design-ideas/:category`): URL-synced search params, sort dropdown, filter chip row & mobile bottom-sheet modal, promo banner injections, responsive grid, and numbered pagination.
> - **Design Detail** (`/design-ideas/:category/:slug`): Multi-image thumbnail gallery + modal lightbox, price breakdown, detailed specs table, materials & hardware list, designer notes, sticky sidebar lead form (desktop) & sticky bottom CTA (mobile), and related design recommendations.
> - **Offerings** (`/offerings/:slug`): BHK pricing tiers, included services grid, 5-step process walkthrough, and comprehensive `ComparisonTable` (Aangan vs. Traditional Contractors vs. Freelancers).
> - **Luxe Sub-brand** (`/luxe`): Isolated `data-theme="luxe"` dark + champagne gold theme, editorial full-bleed hero, curated signature portfolio, artisan material swatches, and bespoke VIP consultation form.
> - **City Landing Template** (`/interiors/:city`): One parametric template dynamically serving 110+ Indian cities with local stats, city project portfolio, experience center cards, and trust guarantees.
> - **Projects Showcase** (`/projects` & `/projects/:slug`): Searchable & filterable project gallery; detail view featuring interactive Before/After comparison slider, project spec sheet, room gallery, and homeowner testimonial.
> - **Magazine Hub & Article** (`/magazine` & `/magazine/:slug`): Editorial blog index with category tabs & featured story; article page with real-time reading progress bar, 72ch prose typography, table of contents sidebar, social sharing, and related guides.
> - **Store Locator** (`/store-locator`): City filter tabs, studio cards with phone, opening hours, interactive modal booking, and map visualizer.
> - **Promotional & Static Pages**: `/refer`, `/nri`, `/vastu`, `/franchise`, `/about`, `/contact` (with verified accessible form controls), `/careers`, `/policies`, `/sitemap`, and OTP-mocked `/login`.

**Deliverables**

| Page | Key UI |
|---|---|
| **Gallery hub** `/design-ideas` | Category tile grid, hero, trust bar |
| **Category listing** `/design-ideas/:category` | Breadcrumb · "Showing 3,387 Results for Modular Kitchen Designs" · **filter chip row** (layout, budget, color, size — mobile = filter bottom-sheet) · sort dropdown · card grid 1 → 2 → 3 → 4 · **injected promo blocks every 8 cards** · numbered pagination · "What are you looking for?" sub-category tiles · trust-promise strip · related links · SEO block |
| **Design detail** `/design-ideas/:cat/:slug` | Image gallery w/ thumbnails + lightbox · title · price · specs table · materials list · "What's included" · designer note · sticky side lead form (desktop) / sticky bottom CTA (mobile) · similar-designs carousel |
| **Offerings** `/offerings/:slug` | Hero · price cards (2BHK from ₹3.57L, 3BHK ₹4.23L, 4BHK ₹4.81L…) · **`ComparisonTable`** (price / convenience / design / timeline / quality / warranty / support) · included-services tiles · 5-step process · FAQ |
| **Luxe** `/luxe` | `data-theme="luxe"` — dark + gold, serif display accent, slower reveals, full-bleed editorial layout, curated projects, bespoke enquiry form |
| **City page** `/interiors/:city` | Templated: city hero · local stats · nearby experience centre w/ map placeholder · city projects · city testimonials · city FAQ · SEO block. **One component, 100 routes** |
| **Projects** `/projects` + `/:slug` | Filterable grid (style / BHK / city); detail = before/after slider, room-by-room gallery, spec sheet, homeowner quote |
| **Magazine** `/magazine` + `/:slug` | Category tabs · featured hero post · card grid · pagination; article page: cover, meta row, reading-progress bar, prose styles (`max-w-[72ch]`), desktop TOC sidebar, inline CTA, related posts, share buttons |
| **Store locator** `/store-locator` | City filter · studio cards (address, hours, phone, `Get Directions`) · map placeholder |
| **Promos** `/refer` `/nri` `/vastu` | Single-purpose landers with form |
| **Static** `/about` `/contact` `/careers` `/policies` | Simple prose layouts, contact form |

**Acceptance**

- Category filters URL query params me reflect hon (shareable + back-button safe)
- Mobile filter bottom-sheet; desktop inline chips
- Luxe theme kisi aur page pe leak na kare
- City page ek hi component se 100 routes handle kare
- Article prose readable: 16–18px, 1.6 line-height, 72ch max
- Breadcrumbs har inner page pe

---

### Phase 8 — Motion & Visual Polish — ✅ DONE (2026-10-21)

**Goal:** "Built" se "premium" tak ka jump. Ye phase skip nahi karna.
**Est:** 2 days

**Deliverables**

- **Scroll reveals:** section-level stagger (fade + 16px rise, 400ms, `cubic-bezier(.22,1,.36,1)`, `once: true`). Cards me 60ms stagger
- **Hero:** subtle image scale (1.08 → 1) on mount, text stagger-in
- **Page transitions:** route change pe 200ms fade + scroll-to-top
- **Hover states:** card lift (`translateY(-4px)` + `--e-3`), image zoom (`scale(1.06)`, 600ms), button press `scale(0.98)`, chevron slide `4px`
- **Micro-interactions:** option-card select (border + checkmark pop), accordion height spring, stepper panel slide, modal scale-in from `0.96`
- **Marquee** logo strips with hover pause
- **Loading states:** skeleton for every async surface, carousel lazy-load fade-in, image blur-up
- **Empty / error states:** no-results illustration + reset-filters CTA, form error, 404 page
- **Scrollbar styling**, selection color, custom focus ring
- **`prefers-reduced-motion`** — global kill-switch: all transforms off, opacity only (or nothing)

**Acceptance**

- Mid-range phone pe 60fps scroll (DevTools 4× CPU throttle)
- Reduced-motion on → zero movement, content fully visible
- Koi animation content ko 300ms se zyada block na kare
- Har interactive element ka hover + focus + active + disabled state defined

---

### Phase 9 — Responsive QA, A11y, Performance, Handoff — ✅ DONE (2026-10-21)

**Goal:** Ship-ready. Har page, har breakpoint, har device.
**Est:** 2 days

**Deliverables**

**Responsive audit**

- Full device matrix (§4.5) × every route
- Landscape phone + tablet both orientations
- 200% zoom test (text reflow, no clipping)
- Long-content stress test (long titles, 4-line testimonials, 100-city grid)
- Browsers: Chrome, Safari (iOS + macOS), Firefox, Edge

**Accessibility — target WCAG 2.1 AA**

- axe DevTools: zero critical/serious across all routes
- Keyboard-only walkthrough of every flow (nav, carousel, wizard, modal, filters)
- Screen-reader pass (NVDA + VoiceOver): landmarks, heading order, form labels, live regions
- Contrast audit — every text/bg pair ≥ 4.5:1 (large text 3:1), including over images
- `alt` on every meaningful image, `alt=""` on decorative
- Skip-to-content link
- One `h1` per page, no heading-level skips

**Performance**

- Lighthouse mobile ≥ 90 performance, 100 a11y, 100 best-practices
- CLS < 0.1 · LCP < 2.5s · INP < 200ms
- Route-level code splitting verified, bundle analyzer run
- Images: WebP/AVIF + `srcset` + correct `sizes`; hero preloaded
- Fonts: `font-display: swap`, subset, preloaded
- Unused Tailwind purged; CSS < 50kb gzipped

**Handoff**

- `README.md` — setup, scripts, folder map, token reference, "how to add a new design / city / page"
- `COMPONENTS.md` — component inventory + props tables
- `DESIGN_TOKENS.md` — color / type / spacing reference
- Final `/dev/kitchen-sink` complete

**Acceptance**

- Zero horizontal scroll on any route at any width 320–1920
- Lighthouse targets met on homepage + gallery + calculator
- axe clean
- Fresh `git clone && npm i && npm run build` works first try

---

> **M4 reached — the build is ship-ready, with one documented exception.**
>
> Verified by tooling committed in `scripts/`:
> - **axe-core**: 0 serious/critical across 18 routes × 2 widths
> - **Structure**: one `h1`, no heading skips, every image has `alt`, skip link present — every route
> - **Contrast**: every token pair meets WCAG AA. The reference palette did not: `#eb595f` measured 3.43:1 behind white button labels, so the coral scale was darkened
> - **Overflow**: none across 20 routes × 11 widths, 320–1920
> - **CLS**: 0 on every route measured
>
> **Not met: LCP on `/`.** Inner routes land at 2.2–3.7s on a 4× CPU / 1.6 Mbps
> profile; the homepage is higher. The cost is the SPA bootstrap — nothing
> paints until the JS runs — which §9 Non-goals already names. Every in-scope
> lever was applied: route splitting, vendor chunks, an eager index route,
> priority hints above the fold, lower-quality phone crops. The fix is SSR or
> prerendering.

## 8. Timeline Summary

| Phase | Work | Est. |
|---|---|---|
| 0 | Foundation & setup | 0.5 d |
| 1 | Design system primitives | 2 d |
| 2 | App shell (header / footer / routing) | 2.5 d |
| 3 | Homepage A — hero + trust | 2 d |
| 4 | Homepage B — galleries + carousels | 2 d |
| 5 | Homepage C — process + proof + closing | 2.5 d |
| 6 | Lead capture + 3 calculators | 3 d |
| 7 | Inner pages (9 templates) | 4 d |
| 8 | Motion & polish | 2 d |
| 9 | Responsive QA + a11y + perf | 2 d |
| | **Total** | **~22.5 days** |

**Milestones**

- **M1 — after Phase 2:** navigable shell, design system locked → first review point
- **M2 — after Phase 5:** complete premium homepage → biggest demo moment
- **M3 — after Phase 6:** conversion funnel live
- **M4 — after Phase 9:** ship-ready

**Agar jaldi demo chahiye:** Phase 0 → 1 → 2 → 3 → 4 → 5 chalo (~11.5 days) — ek complete, premium, fully responsive homepage mil jayegi. Baaki phases uske baad.

---

## 9. Non-goals (is plan me nahi hai)

- Backend / API / database
- Real auth, OTP delivery, payments
- CMS integration
- Actual photography (ratio-correct placeholders; real images drop-in ready)
- SEO beyond semantic markup (no SSR/SSG — Vite SPA). Agar SEO critical hai to Phase 0 pe Next.js discuss karna
- Analytics / tracking pixels
- i18n / multi-language

---

## 10. Open Questions

1. **Brand name + logo** — "Aangan Interiors" placeholder theek hai, ya koi dusra naam?
2. **SEO** — SPA chalega, ya SSR chahiye? (Agar haan → Phase 0 me Next.js; baaki plan same rehta hai)
3. **Images** — aapke paas assets hain, ya Unsplash/placeholder se kaam chalau?
4. **Color** — Livspace ka coral `#eb595f` primary rakhein, ya apna color chahiye?
5. **Phase order** — M1 → M2 → M3 sequence theek hai, ya koi specific page/feature pehle chahiye?
