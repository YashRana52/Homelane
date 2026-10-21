import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/cn';
import { estimateEMI, formatINR, formatLakh } from '@/lib/formatINR';
import type { Estimate } from '@/lib/pricing';
import { Button, Heading } from '@/ui';

type EstimateResultProps = {
  estimate: Estimate;
  /** "Modular Kitchen", used in the heading and the download filename. */
  subject: string;
  onBookConsultation: () => void;
  onDownload?: () => void;
  className?: string;
};

/**
 * The number, at the end of the wizard.
 *
 * Shown as a band rather than a single figure. A calculator that answers
 * "₹5,26,483" is claiming a precision it does not have, and every rupee of
 * that false precision is an argument waiting to happen at quotation stage.
 *
 * The line-item table is collapsed by default — the total is the answer, and
 * the breakdown is for the minority who want to argue with it, who will open
 * it anyway.
 */
export function EstimateResult({
  estimate,
  subject,
  onBookConsultation,
  onDownload,
  className,
}: EstimateResultProps) {
  const [open, setOpen] = useState(false);
  const emi = estimateEMI(estimate.low);

  return (
    <div className={cn('bg-surface border-surface-200 rounded-lg border p-6 lg:p-8', className)}>
      <p className="text-eyebrow text-primary-500 uppercase">Your estimate</p>

      <Heading as="h2" level="h3" className="mt-2">
        {subject}
      </Heading>

      <p className="text-display font-display mt-4 leading-none">
        {formatLakh(estimate.low)}
        <span className="text-surface-600"> – </span>
        {formatLakh(estimate.high)}
        <span className="text-surface-600 align-super text-base" aria-hidden="true">
          *
        </span>
      </p>

      <ul className="text-caption text-surface-600 mt-3 flex flex-wrap gap-x-5 gap-y-1">
        <li>
          EMI from <span className="text-secondary-700 font-semibold">{formatINR(emi)}</span>/month
        </li>
        {estimate.perSqft && (
          <li>
            About <span className="text-secondary-700 font-semibold">{formatINR(estimate.perSqft)}</span>{' '}
            per sq ft
          </li>
        )}
      </ul>

      {/* Breakdown */}
      <div className="border-surface-200 mt-6 border-t pt-4">
        <button
          type="button"
          data-print-hide
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="estimate-breakdown"
          className="text-btn text-primary-600 hover:text-primary-700 inline-flex items-center gap-1.5 transition-colors"
        >
          {open ? 'Hide' : 'Show'} the breakdown
          <ChevronDown
            className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        <div id="estimate-breakdown" className={cn(!open && 'hidden print:block')}>
          <table className="mt-4 w-full text-left">
            <caption className="sr-only">Estimate breakdown by line item</caption>
            <thead>
              <tr className="text-caption text-surface-600">
                <th scope="col" className="pb-2 font-semibold">
                  Item
                </th>
                <th scope="col" className="pb-2 text-right font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-surface-200 divide-y">
              {estimate.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5 pr-4">
                    <span className="text-body block">{item.label}</span>
                    {item.detail && (
                      <span className="text-caption text-surface-600 block">{item.detail}</span>
                    )}
                  </td>
                  <td className="text-body py-2.5 text-right tabular-nums whitespace-nowrap">
                    {formatINR(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-surface-200 border-t-2">
                <th scope="row" className="text-body py-3 text-left font-semibold">
                  Indicative total
                </th>
                <td className="text-h4 font-display py-3 text-right tabular-nums">
                  {formatINR(estimate.subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div data-print-hide className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={onBookConsultation} size="lg" iconRight={<ArrowRight className="size-4" />}>
          Book free consultation
        </Button>
        {onDownload && (
          <Button
            onClick={onDownload}
            size="lg"
            variant="outline"
            iconLeft={<Download className="size-4" />}
          >
            Download estimate
          </Button>
        )}
      </div>

      <p className="text-caption text-surface-600 mt-5 max-w-prose">
        * An indicative range based on what you selected, not a quotation. The
        final figure depends on site measurements, the condition of the walls
        and the exact products chosen, and is confirmed in writing before you
        book.
      </p>
    </div>
  );
}
