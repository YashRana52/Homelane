import { useLocation, Link } from 'react-router';

import { Breadcrumb, Button, Container, Heading, Section } from '@/ui';

export default function StaticPage() {
  const { pathname } = useLocation();
  const page = pathname.replace(/^\//, '') || 'about';

  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <>
            <Heading as="h1" level="display">About Aangan Interiors</Heading>
            <p className="lead text-lg text-secondary-900 font-medium mt-3">
              We started Aangan Interiors with one relentless mission: to bring complete transparency, scientific precision, and predictable timelines to home interiors in India.
            </p>
            <div className="mt-8 space-y-6 text-body-lg text-surface-600 leading-relaxed">
              <p>
                Building or renovating an Indian home was traditionally fraught with endless delays, opaque pricing markups, and on-site carpenter chaos. We replaced manual sawdust and carpenter hand-cutting with European CNC robotic factories, guaranteed 45-day move-ins, and itemised, transparent quotes with zero hidden surprises.
              </p>
              <h2 className="text-h2 font-display text-secondary-900 pt-6">The Three Guarantees</h2>
              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary-100 text-primary-600 font-bold shrink-0">1</span>
                  <span><strong>45-Day Handover:</strong> We adhere to strict construction schedules with milestone-based delivery or pay a penalty for every day of delay.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary-100 text-primary-600 font-bold shrink-0">2</span>
                  <span><strong>10-Year Flat Warranty:</strong> Our HDHMR and BWP plywood units carry direct manufacturer warranty backed by free replacement service.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary-100 text-primary-600 font-bold shrink-0">3</span>
                  <span><strong>146-Point Quality Audit:</strong> Every drawer slide, hinge alignment, and seal undergoes scientific testing before the keys touch your hands.</span>
                </li>
              </ul>
            </div>
          </>
        );

      case 'careers':
        return (
          <>
            <Heading as="h1" level="display">Careers at Aangan</Heading>
            <p className="lead text-lg text-secondary-900 font-medium mt-3">
              Join 2,000+ designers, project managers, and engineers reshaping the Indian home interior landscape.
            </p>
            <div className="mt-8 space-y-6 text-body-lg text-surface-600 leading-relaxed">
              <p>
                We value creative freedom, design technology, and relentless customer advocacy. We work in fast-paced collaborative teams across Bengaluru, Mumbai, Delhi NCR, and Hyderabad.
              </p>
              <h2 className="text-h3 font-display text-secondary-900 pt-6">Open Roles</h2>
              <div className="space-y-4 not-prose pt-2">
                {[
                  { role: 'Senior Interior Designer', loc: 'Bengaluru / Hybrid', dept: 'Design Council' },
                  { role: 'Principal Architect (Luxe Division)', loc: 'Mumbai', dept: 'Luxe Architecture' },
                  { role: 'Technical Project Manager', loc: 'Delhi NCR', dept: 'Site Operations' },
                  { role: 'Full Stack Engineer (3D Visualization)', loc: 'Bengaluru', dept: 'Design Tech' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-surface-200 bg-surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-secondary-900 text-base">{item.role}</h3>
                      <p className="text-caption text-surface-600 mt-0.5">{item.loc} · {item.dept}</p>
                    </div>
                    <Button to="/contact" variant="outline" size="sm">Apply Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'policies':
        return (
          <>
            <Heading as="h1" level="display">Warranty & Service Policies</Heading>
            <p className="lead text-lg text-secondary-900 font-medium mt-3">
              Transparent terms, written guarantees, and privacy policies you can trust.
            </p>
            <div className="mt-8 space-y-6 text-body text-surface-600 leading-relaxed text-sm">
              <h2 className="text-h3 font-display text-secondary-900">10-Year Warranty Terms</h2>
              <p>
                Aangan Interiors provides a 10-year warranty against manufacturing defects, termite infestation, and delamination on all modular woodwork fabricated from our certified HDHMR and BWP marine ply boards.
              </p>
              <h2 className="text-h3 font-display text-secondary-900 pt-4">45-Day Handover SLA</h2>
              <p>
                The 45-day delivery timeline initiates on the date of final 3D design freeze and confirmation of site readiness. In the unlikely event of unexcused delay, Aangan pays a penalty per day directly credited to the homeowner.
              </p>
              <h2 className="text-h3 font-display text-secondary-900 pt-4">Privacy & Data Security</h2>
              <p>
                We do not sell, rent, or trade your personal contact details to third-party telemarketers. Your phone number is solely utilised by our assigned designer to schedule consultations and project milestones.
              </p>
            </div>
          </>
        );

      case 'sitemap':
        return (
          <>
            <Heading as="h1" level="display">Complete Sitemap</Heading>
            <p className="lead text-lg text-secondary-900 font-medium mt-3">
              Explore every route and section across the Aangan Interiors platform.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 not-prose">
              <div>
                <h3 className="font-display font-bold text-secondary-900 mb-3 text-base">Inspiration & Hubs</h3>
                <ul className="space-y-2 text-sm text-surface-600">
                  <li><Link to="/design-ideas" className="hover:text-primary-600">Design Ideas Hub</Link></li>
                  <li><Link to="/design-ideas/modular-kitchen" className="hover:text-primary-600">Modular Kitchens</Link></li>
                  <li><Link to="/design-ideas/wardrobe" className="hover:text-primary-600">Wardrobes & Storage</Link></li>
                  <li><Link to="/design-ideas/living-room" className="hover:text-primary-600">Living Room Concepts</Link></li>
                  <li><Link to="/projects" className="hover:text-primary-600">Delivered Projects</Link></li>
                  <li><Link to="/magazine" className="hover:text-primary-600">Magazine & Buying Guides</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-display font-bold text-secondary-900 mb-3 text-base">Offerings & Tools</h3>
                <ul className="space-y-2 text-sm text-surface-600">
                  <li><Link to="/offerings/modular" className="hover:text-primary-600">Modular Interiors</Link></li>
                  <li><Link to="/offerings/full-home" className="hover:text-primary-600">Full Home Turnkey</Link></li>
                  <li><Link to="/offerings/value" className="hover:text-primary-600">Value Packages</Link></li>
                  <li><Link to="/luxe" className="hover:text-primary-600">Aangan Luxe Tier</Link></li>
                  <li><Link to="/price-calculator" className="hover:text-primary-600">Cost Calculator Hub</Link></li>
                  <li><Link to="/estimate" className="hover:text-primary-600">30-Second Quick Estimate</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-display font-bold text-secondary-900 mb-3 text-base">Company & Studios</h3>
                <ul className="space-y-2 text-sm text-surface-600">
                  <li><Link to="/about" className="hover:text-primary-600">About Our Company</Link></li>
                  <li><Link to="/store-locator" className="hover:text-primary-600">Studio Experience Centres</Link></li>
                  <li><Link to="/contact" className="hover:text-primary-600">Contact & Support</Link></li>
                  <li><Link to="/careers" className="hover:text-primary-600">Careers & Opportunities</Link></li>
                  <li><Link to="/refer" className="hover:text-primary-600">Refer & Earn ₹10,000</Link></li>
                  <li><Link to="/nri" className="hover:text-primary-600">NRI Design Services</Link></li>
                  <li><Link to="/policies" className="hover:text-primary-600">Warranty Terms</Link></li>
                </ul>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: page.charAt(0).toUpperCase() + page.slice(1) }]} />
      </Container>

      <Section pad="md">
        <Container className="max-w-[72ch]">
          {renderContent()}
        </Container>
      </Section>
    </>
  );
}
