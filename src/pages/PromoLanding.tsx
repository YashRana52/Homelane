import { Gift } from 'lucide-react';
import { useLocation } from 'react-router';

import { LeadForm } from '@/components/funnel/LeadForm';
import {
  Badge,
  Breadcrumb,
  Container,
  Heading,
  Section,
} from '@/ui';

type PromoConfig = {
  badge: string;
  title: string;
  subtitle: string;
  reward?: string;
  points: { title: string; desc: string }[];
  formTitle: string;
  formSource: string;
};

const promoMap: Record<string, PromoConfig> = {
  refer: {
    badge: 'Referral Programme',
    title: 'Refer a Friend & Earn ₹10,000 Cashback',
    subtitle:
      'Loved your Aangan home? Refer your friends, family, or neighbours. They get an exclusive ₹15,000 design discount, and you get ₹10,000 direct bank transfer when their project starts.',
    reward: '₹10,000 Reward per friend',
    points: [
      { title: 'Share the Link', desc: 'Enter your friend’s details or share your personal invite link.' },
      { title: 'They Book a Session', desc: 'Our design team contacts them and prepares custom 3D designs.' },
      { title: 'Instant Reward', desc: 'As soon as their order is confirmed, ₹10,000 is transferred directly to your bank account.' },
    ],
    formTitle: 'Submit a Friend’s Referral',
    formSource: 'promo:refer-and-earn',
  },
  nri: {
    badge: 'Dedicated NRI Services',
    title: 'Design Your Dream Home in India from Anywhere in the World',
    subtitle:
      'Setting up a new apartment in India while living overseas? We manage the entire project turnkey with weekly video walkthroughs, transparent milestones, and keys delivered into your hands.',
    reward: 'Zero Physical Travel Required',
    points: [
      { title: 'Virtual 3D Studios', desc: 'Meet your architect over high-definition video with real-time screen sharing and 3D floor plan walk-throughs.' },
      { title: 'Transparent Milestones', desc: 'Track daily construction progress through our mobile portal with photo and video logs.' },
      { title: 'Hassle-free Key Handover', desc: 'We coordinate with your society estate office, builder representatives, and family members for smooth handover.' },
    ],
    formTitle: 'Schedule an NRI Video Consultation',
    formSource: 'promo:nri-services',
  },
  vastu: {
    badge: 'Aangan VastuSense',
    title: 'Scientific Vastu Compliance for Modern Living',
    subtitle:
      'Harmonise cosmic energy, natural daylight, and magnetic orientation without demolishing existing walls or compromising on contemporary European aesthetics.',
    reward: '100% Non-destructive Advice',
    points: [
      { title: 'Kitchen in Agni Zone', desc: 'Optimising hob and sink placement for southeast quadrant vitality.' },
      { title: 'Master Bedroom Stability', desc: 'Southwest grounding placement for sound sleep, stability, and peaceful rest.' },
      { title: 'Pooja & Foyer Sanctity', desc: 'Northeast orientation for positive energy flow and serene worship corners.' },
    ],
    formTitle: 'Request Free Vastu Design Review',
    formSource: 'promo:vastu-sense',
  },
  franchise: {
    badge: 'Partner With Us',
    title: 'Own an Aangan Interiors Experience Centre',
    subtitle:
      'Join India’s fastest growing branded interior network. High margin business model, zero inventory risk, and turnkey showroom design support from day one.',
    reward: 'High ROI & Marketing Support',
    points: [
      { title: 'Turnkey Studio Setup', desc: 'Complete architecture and display mock-up design provided by our central team.' },
      { title: 'Qualified Leads Delivered', desc: 'We run targeted citywide campaigns to send qualified homeowners directly to your studio.' },
      { title: 'Automated Factory Supply', desc: 'Zero manufacturing headaches — German machinery cuts every piece with precision.' },
    ],
    formTitle: 'Submit Franchise Partner Enquiry',
    formSource: 'promo:franchise-partner',
  },
};

export default function PromoLanding() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\//, '') || 'refer';
  const config: PromoConfig = promoMap[key] ?? promoMap.refer!;

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: config.badge }]} />
      </Container>

      <Section pad="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-6">
              <Badge tone="offer">{config.badge}</Badge>
              <Heading as="h1" level="display">
                {config.title}
              </Heading>
              <p className="text-body-lg text-surface-600 leading-relaxed">
                {config.subtitle}
              </p>

              {config.reward && (
                <div className="rounded-lg bg-primary-50 border border-primary-200 p-4 inline-flex items-center gap-3">
                  <Gift className="size-6 text-primary-500" />
                  <span className="font-display font-bold text-secondary-900 text-sm">
                    {config.reward}
                  </span>
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-4 pt-4 border-t border-surface-200">
                <h2 className="text-h4 font-display font-semibold text-secondary-700">
                  How It Works
                </h2>
                <div className="space-y-4">
                  {config.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-600 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-secondary-900 text-sm">{pt.title}</h3>
                        <p className="text-caption text-surface-600 mt-0.5">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dedicated Lead Form Card */}
            <div className="rounded-xl border border-surface-200 bg-surface p-6 sm:p-8 shadow-md">
              <Badge tone="new">Quick Enquiry</Badge>
              <h2 className="text-h3 font-display font-bold text-secondary-700 mt-2">
                {config.formTitle}
              </h2>
              <p className="text-caption text-surface-600 mt-1">
                Fill out the details below. Our team will get back to you within 24 business hours.
              </p>

              <div className="mt-6">
                <LeadForm source={config.formSource} submitLabel="Submit Request" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
