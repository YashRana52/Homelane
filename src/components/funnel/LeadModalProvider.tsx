import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { Modal } from '@/ui';

import { LeadForm } from './LeadForm';
import { LeadModalContext, type LeadModalOptions } from './leadModalContext';

/**
 * One lead modal for the whole app.
 *
 * Mounting a dialog per call-to-action would mean a dozen copies of the same
 * form on the homepage, each with its own state. Instead one lives at the root
 * and any component opens it through `useLeadModal()`, passing the source so
 * the enquiry can be attributed to the section that produced it.
 */
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<LeadModalOptions | null>(null);

  const open = useCallback((next: LeadModalOptions) => setOptions(next), []);
  const close = useCallback(() => setOptions(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext value={value}>
      {children}

      <Modal
        open={options !== null}
        onClose={close}
        title={options?.title ?? 'Book a free design session'}
        description={
          options?.description ??
          'A designer calls once to agree a slot. You leave the session with 3D designs and a quote, with no obligation.'
        }
        size="md"
      >
        {options && <LeadForm source={options.source} />}
      </Modal>
    </LeadModalContext>
  );
}
