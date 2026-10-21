import { Check, Minus, X } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Badge, Container, Heading } from '@/ui';

export type ComparisonRow = {
  feature: string;
  category: 'Price' | 'Convenience' | 'Design' | 'Timeline' | 'Quality' | 'Warranty' | 'Support';
  aangan: string;
  contractor: string;
  others: string;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Pricing & Quotation',
    category: 'Price',
    aangan: '100% transparent itemised quote with 0 hidden costs',
    contractor: 'Vague lump-sum, 30–50% cost escalation mid-way',
    others: 'Estimate changes after measurement and site check',
  },
  {
    feature: 'Design Experience',
    category: 'Design',
    aangan: 'Free 3D photorealistic walkthroughs before you pay a rupee',
    contractor: 'Hand-drawn rough sketches on wall or paper',
    others: 'Limited standard 2D layouts; paid revisions',
  },
  {
    feature: 'Delivery Timeline',
    category: 'Timeline',
    aangan: '45-day move-in guarantee with rent penalty clause',
    contractor: 'Indefinite delays (typically 4–8 months)',
    others: '60–90 days estimated with no delay penalty',
  },
  {
    feature: 'Manufacturing & Precision',
    category: 'Quality',
    aangan: 'German robotic factory-cut precision, edge-banded ply',
    contractor: 'Manual saw-cutting and hand-gluing on living room floor',
    others: 'Semi-automated local workshop fabrication',
  },
  {
    feature: 'Quality Inspections',
    category: 'Quality',
    aangan: '146-point scientific audit before site handover',
    contractor: 'Visual self-check by head carpenter only',
    others: 'Generic 20-point checklist',
  },
  {
    feature: 'Warranty Coverage',
    category: 'Warranty',
    aangan: 'Flat 10-year warranty on modular woodwork & hardware',
    contractor: 'Zero written warranty once final payment is made',
    others: '5-year conditional warranty with high service charges',
  },
  {
    feature: 'Coordination & PM',
    category: 'Convenience',
    aangan: 'Single dedicated project manager for turnkey execution',
    contractor: 'Homeowner must coordinate plumbers, electricians, painters',
    others: 'Multiple vendor handoffs across phases',
  },
  {
    feature: 'After-Sales Support',
    category: 'Support',
    aangan: 'Dedicated concierge and 48-hour service visit SLA',
    contractor: 'Dependent on carpenter availability / uncontactable',
    others: 'Call center queue with slow turnaround',
  },
];

export function ComparisonTable({ className }: { className?: string }) {
  return (
    <div className={cn('py-12', className)}>
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="new">The Aangan Difference</Badge>
          <Heading as="h2" level="h2" className="mt-3">
            Why Homeowners Choose Us
          </Heading>
          <p className="text-body-lg text-surface-600 mt-3">
            See how Aangan compares with traditional contractors and other interior platforms.
          </p>
        </div>

        <div tabIndex={0}
          role="region"
          aria-label="Comparison table, scrolls horizontally"
          className="mt-10 overflow-x-auto rounded-lg border border-surface-200 bg-surface shadow-xs focus-visible:outline-offset-2">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-surface-200 bg-surface-50 text-caption font-semibold">
                <th scope="col" className="p-4 sm:p-5 w-1/4 text-secondary-700">
                  Feature
                </th>
                <th scope="col" className="p-4 sm:p-5 w-1/3 bg-primary-50/70 border-x border-primary-200 text-primary-700">
                  <div className="flex items-center gap-2">
                    <span className="text-h4 font-display font-bold">Aangan Interiors</span>
                    <Badge tone="offer">Recommended</Badge>
                  </div>
                </th>
                <th scope="col" className="p-4 sm:p-5 w-1/4 text-surface-600">
                  Traditional Contractors
                </th>
                <th scope="col" className="p-4 sm:p-5 w-1/4 text-surface-600">
                  Other Platforms
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 text-body">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-secondary-700">
                    <span className="text-caption text-surface-600 block font-normal uppercase text-[10px] tracking-wider">
                      {row.category}
                    </span>
                    <span className="text-sm font-semibold">{row.feature}</span>
                  </td>

                  {/* Aangan column */}
                  <td className="p-4 sm:p-5 bg-primary-50/30 border-x border-primary-200">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success text-white">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-secondary-900 leading-snug">
                        {row.aangan}
                      </span>
                    </div>
                  </td>

                  {/* Contractor column */}
                  <td className="p-4 sm:p-5 text-surface-600">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-200 text-surface-600">
                        <X className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-snug">{row.contractor}</span>
                    </div>
                  </td>

                  {/* Others column */}
                  <td className="p-4 sm:p-5 text-surface-600">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-200 text-surface-600">
                        <Minus className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-snug">{row.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
