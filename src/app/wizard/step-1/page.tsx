'use client';
import React, { useReducer, useEffect } from 'react';
import { DestinationStep } from '@/components/wizard/DestinationStep';
import { DateInput } from '@/components/ui/DateInput';
import {
  wizardReducer,
  initialWizardState,
  saveWizardDraft,
  loadWizardDraft,
} from '@/lib/wizardState';
import { validateDraft } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import WizardShell from '@/app/wizard/shell';

export default function Step1() {
  const [state, dispatch] = useReducer(
    wizardReducer,
    undefined,
    () => loadWizardDraft() ?? initialWizardState,
  );
  const router = useRouter();
  const errors = validateDraft(state);

  // persist draft to localStorage on state change
  useEffect(() => {
    saveWizardDraft(state);
  }, [state]);

  // Next step navigation
  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (errors.destinationId || errors.departureDate || errors.returnDate) {
      return;
    }
    router.push('/wizard/step-2');
  }

  return (
    <WizardShell>
      <form
        onSubmit={handleNext}
        className="flex flex-col gap-8"
      >
        <DestinationStep
          value={state.destinationId}
          onChange={(destinationId) => dispatch({ type: 'setDestination', destinationId })}
          error={errors.destinationId}
        />
        <div className="mt-2 flex flex-col gap-6 sm:flex-row">
          <DateInput
            label="Departure date"
            value={state.departureDate}
            onChange={(date) =>
              dispatch({ type: 'setDates', departureDate: date, returnDate: state.returnDate })
            }
            error={errors.departureDate}
          />
          <DateInput
            label="Return date"
            value={state.returnDate}
            onChange={(date) =>
              dispatch({ type: 'setDates', departureDate: state.departureDate, returnDate: date })
            }
            min={state.departureDate || undefined}
            error={errors.returnDate}
          />
        </div>
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="mt-6 rounded-lg bg-zinc-900/80 px-6 py-2 font-bold text-white transition-all hover:bg-zinc-900"
          >
            Next: Travelers →
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
