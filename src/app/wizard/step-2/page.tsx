'use client';
import React, { useReducer, useEffect } from 'react';
import { TravelersStep } from '@/components/wizard/TravelersStep';
import {
  wizardReducer,
  initialWizardState,
  saveWizardDraft,
  loadWizardDraft,
} from '@/lib/wizardState';
import { validateDraft } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import WizardShell from '@/app/wizard/shell';

export default function Step2() {
  const [state, dispatch] = useReducer(
    wizardReducer,
    undefined,
    () => loadWizardDraft() ?? initialWizardState,
  );
  const router = useRouter();
  const errors = validateDraft(state);

  useEffect(() => {
    saveWizardDraft(state);
  }, [state]);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (errors.travelers || errors.travelersCount) {
      return;
    }
    router.push('/wizard/step-3');
  }
  function handleBack() {
    router.push('/wizard/step-1');
  }

  return (
    <WizardShell>
      <form
        onSubmit={handleNext}
        className="flex flex-col gap-8"
      >
        <TravelersStep
          travelers={state.travelers}
          onChange={(idx, traveler) => dispatch({ type: 'updateTraveler', index: idx, traveler })}
          onAdd={() => dispatch({ type: 'addTraveler' })}
          onRemove={(idx) => dispatch({ type: 'removeTraveler', index: idx })}
          errors={errors.travelers}
          countError={errors.travelersCount}
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
            className="rounded-lg bg-zinc-900/80 px-6 py-2 font-bold text-white transition-all hover:bg-zinc-900"
          >
            Next: Review →
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
