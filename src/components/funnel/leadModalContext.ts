import { createContext, use } from 'react';

export type LeadModalOptions = {
  /** Where the modal was opened from, carried through to the form. */
  source: string;
  title?: string;
  description?: string;
};

export type LeadModalContextValue = {
  open: (options: LeadModalOptions) => void;
  close: () => void;
};

/**
 * Lives in its own module so `LeadModalProvider.tsx` exports only a component.
 * Mixing a hook and a component in one file breaks Fast Refresh for that file,
 * which means every keystroke in the provider remounts the app.
 */
export const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal(): LeadModalContextValue {
  const context = use(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used inside <LeadModalProvider>');
  }
  return context;
}
