'use client';

import React, { useMemo, useState } from 'react';
import { TravelersStep } from '@/components/wizard/TravelersStep';
import { validateDraft } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import WizardShell from '@/app/wizard/shell';
import { useWizardDraft } from '@/contexts/WizardDraftContext';

type TravelerTouched = Array<{ fullName?: boolean; age?: boolean }>;

export default function Step2() {
  const { state, dispatch } = useWizardDraft();
  const router = useRouter();

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [touched, setTouched] = useState<TravelerTouched>([]);

  const errors = useMemo(() => validateDraft(state), [state]);

  const hasErrors = Boolean(
    errors.travelersCount ||
      (errors.travelers && errors.travelers.some((t) => Boolean(t?.fullName || t?.age))),
  );

  const markTouched = (index: number, field: 'fullName' | 'age') => {
    setTouched((prev) => {
      const next = [...prev];
      next[index] = { ...(next[index] ?? {}), [field]: true };
      return next;
    });
  };

  const shouldShowTravelerError = (index: number, field: 'fullName' | 'age') =>
    hasTriedSubmit || Boolean(touched[index]?.[field]);

  // Filter down errors passed to TravelersStep so it only shows touched fields (or submit attempted)
  const visibleTravelerErrors = (errors.travelers ?? []).map((tErr, idx) => ({
    fullName: shouldShowTravelerError(idx, 'fullName') ? tErr?.fullName : undefined,
    age: shouldShowTravelerError(idx, 'age') ? tErr?.age : undefined,
  }));

  const visibleCountError = hasTriedSubmit ? errors.travelersCount : undefined;

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setHasTriedSubmit(true);

    if (hasErrors) {
      const firstBadIndex =
        errors.travelers?.findIndex((t) => Boolean(t?.fullName || t?.age)) ?? -1;

      if (firstBadIndex >= 0) {
        document.getElementById(`fullName-${firstBadIndex}`)?.focus();
      }
      return;
    }

    router.push('/wizard/step-3');
  }

  function handleBack() {
    router.push('/wizard/step-1');
  }

  return (
    <WizardShell>
      <form onSubmit={handleNext} className="flex flex-col gap-8">
        {hasTriedSubmit && hasErrors && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200"
          >
            Please fix the traveler details before continuing.
          </div>
        )}

        <TravelersStep
          travelers={state.travelers}
          onChange={(idx, traveler) => dispatch({ type: 'updateTraveler', index: idx, traveler })}
          onAdd={() => dispatch({ type: 'addTraveler' })}
          onRemove={(idx) => dispatch({ type: 'removeTraveler', index: idx })}
          errors={visibleTravelerErrors}
          countError={visibleCountError}
          onNameBlur={(idx) => markTouched(idx, 'fullName')}
          onAgeBlur={(idx) => markTouched(idx, 'age')}
        />

        <div className="mt-7 flex w-full justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-zinc-200 bg-white/70 px-6 py-2 font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={hasErrors}
            className="rounded-lg bg-zinc-900/80 px-6 py-2 font-bold text-white transition-all hover:bg-zinc-900 disabled:opacity-40"
          >
            Next: Review →
          </button>
        </div>
      </form>
    </WizardShell>
  );
}