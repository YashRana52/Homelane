import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

type UseStepperOptions<T> = {
  totalSteps: number;
  /** sessionStorage key. Namespace it per wizard. */
  storageKey: string;
  initialValues: T;
};

type Stepper<T> = {
  step: number;
  values: T;
  setValues: (update: Partial<T> | ((prev: T) => T)) => void;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  reset: () => void;
  isFirst: boolean;
  isLast: boolean;
};

/**
 * Wizard state for the calculators.
 *
 * The step lives in the URL (`?step=3`) and the answers live in
 * sessionStorage. That split is deliberate:
 *
 * - Step in the URL means the browser Back button goes to the previous
 *   question instead of leaving the calculator, which is the single most
 *   common way people lose their progress — and it costs nothing, because
 *   React Router already manages that history entry.
 * - Answers in sessionStorage means a refresh, or following a link and coming
 *   back, does not wipe five steps of input. They are not in the URL because
 *   a shared link should not carry someone else's half-finished selections.
 */
export function useStepper<T extends object>({
  totalSteps,
  storageKey,
  initialValues,
}: UseStepperOptions<T>): Stepper<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsed = Number(searchParams.get('step'));
  const step =
    Number.isFinite(parsed) && parsed >= 1 && parsed <= totalSteps ? Math.floor(parsed) : 1;

  const [values, setValuesState] = useState<T>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) return { ...initialValues, ...(JSON.parse(saved) as Partial<T>) };
    } catch {
      // Private browsing, or storage disabled. Start clean rather than crash.
    }
    return initialValues;
  });

  // Persist on every change. Writes are small and the alternative — saving on
  // step change only — loses the last answer if someone refreshes mid-step.
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      /* non-fatal */
    }
  }, [storageKey, values]);

  const setValues = useCallback((update: Partial<T> | ((prev: T) => T)) => {
    setValuesState((prev) =>
      typeof update === 'function' ? update(prev) : { ...prev, ...update },
    );
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.min(Math.max(target, 1), totalSteps);
      setSearchParams(
        (params) => {
          const next = new URLSearchParams(params);
          next.set('step', String(clamped));
          return next;
        },
        // A push, not a replace: each step is its own history entry, which is
        // what makes Back behave like "previous question".
        { replace: false },
      );
    },
    [setSearchParams, totalSteps],
  );

  // Landing mid-wizard from a bookmark with no saved answers is a dead end,
  // so send that case back to step 1.
  const checkedEntry = useRef(false);
  useEffect(() => {
    if (checkedEntry.current) return;
    checkedEntry.current = true;
    if (step > 1) {
      let hasSaved = false;
      try {
        hasSaved = sessionStorage.getItem(storageKey) !== null;
      } catch {
        hasSaved = false;
      }
      if (!hasSaved) {
        setSearchParams(
          (params) => {
            const next = new URLSearchParams(params);
            next.set('step', '1');
            return next;
          },
          { replace: true },
        );
      }
    }
  }, [step, storageKey, setSearchParams]);

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      /* non-fatal */
    }
    setValuesState(initialValues);
    goTo(1);
    // initialValues is a literal from the caller and stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo, storageKey]);

  return {
    step,
    values,
    setValues,
    next: () => goTo(step + 1),
    back: () => goTo(step - 1),
    goTo,
    reset,
    isFirst: step === 1,
    isLast: step === totalSteps,
  };
}
