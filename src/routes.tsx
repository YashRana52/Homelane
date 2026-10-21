import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layout';
import Home from '@/pages/Home';

/**
 * Route tree.
 *
 * Every public page is lazy — the gallery, the calculators and the magazine
 * have nothing in common, and loading all of them to render the homepage is
 * what turns an SPA into a slow first paint. RootLayout holds the Suspense
 * boundary, so the chrome stays on screen while a route's chunk arrives.
 *
 * Pages marked with `Placeholder` are routed and reachable but built in a
 * later phase; the phase number on each is the one in PLAN.md §7.
 */

/**
 * Home is imported eagerly, unlike every other page.
 *
 * Behind a lazy chunk it cost a measured 0.59 CLS: the shell painted at 206ms
 * with a short Suspense fallback, the chunk landed at 498ms, and the footer
 * dropped 3,308px in one frame. Splitting the route almost every visitor lands
 * on buys a request waterfall and saves 5kB gzipped — the wrong trade.
 */
const NotFound = lazy(() => import('@/pages/NotFound'));
const TokenSheet = lazy(() => import('@/pages/TokenSheet'));
const KitchenSink = lazy(() => import('@/pages/KitchenSink'));

/* The funnel. Split out because the wizard engine, the pricing model and
   three config files are dead weight on every page that is not a calculator. */
const CalculatorHub = lazy(() => import('@/pages/CalculatorHub'));
const Calculator = lazy(() => import('@/pages/Calculator'));
const Estimate = lazy(() => import('@/pages/Estimate'));

/* ---- Phase 7: Real Inner Pages ---- */
const GalleryHub = lazy(() => import('@/pages/GalleryHub'));
const CategoryListing = lazy(() => import('@/pages/CategoryListing'));
const DesignDetail = lazy(() => import('@/pages/DesignDetail'));

const OfferingDetail = lazy(() => import('@/pages/OfferingDetail'));
const LuxeLanding = lazy(() => import('@/pages/LuxeLanding'));

const CityLanding = lazy(() => import('@/pages/CityLanding'));
const StoreLocator = lazy(() => import('@/pages/StoreLocator'));

const ProjectsHub = lazy(() => import('@/pages/ProjectsHub'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const MagazineHub = lazy(() => import('@/pages/MagazineHub'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));

const PromoLanding = lazy(() => import('@/pages/PromoLanding'));

const StaticPage = lazy(() => import('@/pages/StaticPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

/**
 * The /dev pages render outside RootLayout, so they need their own boundary;
 * the public routes use the one inside RootLayout.
 */
const bare = (node: ReactNode) => (
  <Suspense fallback={<div className="grid min-h-dvh place-items-center" />}>{node}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      /* ---- Design gallery (Phase 7) ---- */
      { path: 'design-ideas', element: <GalleryHub /> },
      { path: 'design-ideas/:category', element: <CategoryListing /> },
      { path: 'design-ideas/:category/:slug', element: <DesignDetail /> },

      /* ---- Offerings (Phase 7) ---- */
      { path: 'offerings/:slug', element: <OfferingDetail /> },
      { path: 'luxe', element: <LuxeLanding /> },

      /* ---- Funnel (Phase 6) ---- */
      { path: 'price-calculator', element: <CalculatorHub /> },
      { path: 'price-calculator/:type', element: <Calculator /> },
      { path: 'estimate', element: <Estimate /> },

      /* ---- Location (Phase 7) ---- */
      { path: 'interiors/:city', element: <CityLanding /> },
      { path: 'store-locator', element: <StoreLocator /> },

      /* ---- Content (Phase 7) ---- */
      { path: 'projects', element: <ProjectsHub /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'magazine', element: <MagazineHub /> },
      { path: 'magazine/:slug', element: <ArticleDetail /> },

      /* ---- Promos (Phase 7) ---- */
      { path: 'refer', element: <PromoLanding /> },
      { path: 'nri', element: <PromoLanding /> },
      { path: 'vastu', element: <PromoLanding /> },
      { path: 'franchise', element: <PromoLanding /> },

      /* ---- Static (Phase 7) ---- */
      { path: 'about', element: <StaticPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'careers', element: <StaticPage /> },
      { path: 'policies', element: <StaticPage /> },
      { path: 'sitemap', element: <StaticPage /> },
      { path: 'login', element: <LoginPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },

  /* ---- Internal, outside the public chrome ---- */
  { path: '/dev/tokens', element: bare(<TokenSheet />) },
  { path: '/dev/kitchen-sink', element: bare(<KitchenSink />) },
]);
