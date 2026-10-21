import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { brand, trustStats } from '@/config/brand';
import { footerColumns } from '@/config/nav';
import { Accordion, Container, Heading } from '@/ui';

const socialIcons: Record<string, ReactNode> = {
  instagram: <Instagram className="size-4" aria-hidden="true" />,
  youtube: <Youtube className="size-4" aria-hidden="true" />,
  facebook: <Facebook className="size-4" aria-hidden="true" />,
  linkedin: <Linkedin className="size-4" aria-hidden="true" />,
};

type FooterProps = {
  /** Page-specific SEO prose, rendered above the link columns. */
  seoBlock?: ReactNode;
};

/**
 * Site footer.
 *
 * The link columns are a grid on desktop and accordions on mobile — four
 * stacked lists of eight links each would be a very long scroll past, and the
 * legal row below them is what people are usually scrolling to reach.
 */
export function Footer({ seoBlock }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-50 border-surface-200 border-t">
      {seoBlock && (
        <Container className="border-surface-200 border-b py-10">{seoBlock}</Container>
      )}

      <Container className="py-10 md:py-14">
        <div className="gap-10 md:grid md:grid-cols-[1.2fr_2.8fr]">
          {/* Brand block */}
          <div>
            <Link to="/" className="font-display text-h3 text-primary-600 font-semibold">
              {brand.name}
            </Link>
            <p className="text-body text-surface-600 mt-2 max-w-xs">{brand.tagline}</p>

            <ul className="mt-5 flex items-center gap-2">
              {brand.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-surface-300 text-surface-600 hover:border-primary-500 hover:text-primary-600 grid size-10 place-items-center rounded-full border transition-colors"
                  >
                    {socialIcons[social.icon] ?? social.label.charAt(0)}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <a
                href={brand.phoneHref}
                className="text-body hover:text-primary-600 flex items-center gap-2 font-semibold transition-colors"
              >
                <Phone className="size-4" aria-hidden="true" />
                {brand.phone}
              </a>
              <a
                href={brand.emailHref}
                className="text-body text-surface-600 hover:text-primary-600 flex items-center gap-2 transition-colors"
              >
                <Mail className="size-4" aria-hidden="true" />
                {brand.email}
              </a>
            </div>
          </div>

          {/* Link columns — accordion below md, grid above */}
          <div className="mt-8 md:mt-0">
            <div className="md:hidden">
              <Accordion
                mode="multiple"
                variant="plain"
                headingLevel="h2"
                items={footerColumns.map((column) => ({
                  id: column.heading ?? '',
                  question: column.heading,
                  answer: (
                    <ul className="space-y-0.5">
                      {column.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className="text-body text-surface-600 hover:text-primary-600 flex min-h-10 items-center transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ),
                }))}
              />
            </div>

            <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <Heading as="h2" level="h4" className="mb-3">
                    {column.heading}
                  </Heading>
                  <ul className="space-y-1.5">
                    {column.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="text-body text-surface-600 hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Legal */}
      <div className="border-surface-200 border-t">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-surface-600">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: 'Privacy Policy', to: '/policies' },
              { label: 'Terms of Use', to: '/policies' },
              { label: 'Sitemap', to: '/sitemap' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-caption text-surface-600 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>

        <Container className="pb-8">
          <p className="text-caption text-surface-600 max-w-prose">
            <sup>1</sup> The {trustStats.warrantyYears}-year warranty covers modular woodwork and
            hardware, subject to the terms of service. <sup>2</sup> The {trustStats.deliveryDays}
            -day delivery guarantee applies to modular scopes from the date of final design
            sign-off, and excludes civil work.
          </p>
        </Container>
      </div>
    </footer>
  );
}
