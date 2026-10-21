import { Suspense, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { LeadModalProvider } from '@/components/funnel/LeadModalProvider';
import { Container, SkeletonText } from '@/ui';

import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { PageTransition } from './PageTransition';

/**
 * The chrome every public page shares.
 *
 * `ScrollRestoration` is what makes the back button return to where the
 * visitor was in a 3,000-item gallery instead of to the top of it.
 */
/**
 * Reserves a full viewport while a route's chunk arrives.
 *
 * The height is the point, and 70vh was not enough. On a throttled connection
 * the fallback is on screen long enough to matter, and a footer sitting just
 * above the fold drops the moment real content lands — measured at 0.128 CLS,
 * the only shift on the whole page. A full-viewport fallback keeps the footer
 * below the fold before and after, so the move happens off screen and costs
 * nothing.
 */
function RouteFallback() {
  return (
    <Container className="min-h-screen py-16">
      <div className="max-w-prose space-y-6">
        <SkeletonText lines={2} />
        <SkeletonText lines={4} />
      </div>
    </Container>
  );
}

export function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <LeadModalProvider>
      <a
        href="#main"
        className="sr-only-focusable bg-primary-500 text-on-primary text-btn absolute top-2 left-2 z-50 rounded-sm px-4 py-2"
      >
        Skip to main content
      </a>

      <Header onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Bottom padding clears the floating CTA on phones. */}
      <main id="main" className="pb-20 md:pb-0">
        {/* The boundary sits inside the chrome, so a route's chunk loads
            without the header and footer blinking out. */}
        <PageTransition>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>

      <Footer />
      <FloatingCTA />
      <ScrollRestoration />
    </LeadModalProvider>
  );
}
