import { MapPin, Phone, UserRound } from 'lucide-react';
import { Link } from 'react-router';

import { brand } from '@/config/brand';
import { utilityLinks } from '@/config/nav';
import { Container } from '@/ui';

/**
 * The thin strip above the main header row.
 *
 * Desktop only, and the first thing to go when the page is scrolled — it
 * carries secondary links that nobody needs while reading, but the phone
 * number is the one thing a high-intent visitor looks for first, so it sits
 * here rather than being buried in the footer.
 */
export function UtilityBar() {
  return (
    <div className="border-surface-200 bg-surface-50 hidden border-b lg:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-5">
          {utilityLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-caption text-surface-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <a
            href={brand.phoneHref}
            className="text-caption hover:text-primary-600 inline-flex items-center gap-1.5 font-semibold transition-colors"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {brand.phone}
          </a>
          <Link
            to="/store-locator"
            className="text-caption text-surface-600 hover:text-primary-600 inline-flex items-center gap-1.5 transition-colors"
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            Store Locator
          </Link>
          <Link
            to="/login"
            className="text-caption text-surface-600 hover:text-primary-600 inline-flex items-center gap-1.5 transition-colors"
          >
            <UserRound className="size-3.5" aria-hidden="true" />
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
}
