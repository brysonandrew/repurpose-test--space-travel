'use client';

import React, { useMemo, useState } from 'react';
import { TravelersStep } from '@/components/wizard/TravelersStep';
import { FormAlert } from '@/components/shared/FormAlert';
import { WizardFooter } from '@/components/shared/WizardFooter';
import { validateDraft } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import WizardShell from '@/app/wizard/shell';
import { useWizardDraft } from '@/contexts/WizardDraftContext';

export type TravelerTouched = Array<{ fullName?: boolean; age?: boolean }>;

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
  const visibleTravelerErrors = (errors.travelers ?? []).map((tErr, index) => ({
    fullName: shouldShowTravelerError(index, 'fullName') ? tErr?.fullName : undefined,
    age: shouldShowTravelerError(index, 'age') ? tErr?.age : undefined,
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
      <form
        onSubmit={handleNext}
        className="flex flex-col gap-8"
      >
        {hasTriedSubmit && hasErrors && (
          <FormAlert message="Please fix the traveler details before continuing." />
        )}

        <TravelersStep
          touched={touched}
          travelers={state.travelers}
          onChange={(idx, traveler) => dispatch({ type: 'updateTraveler', index: idx, traveler })}
          onAdd={() => dispatch({ type: 'addTraveler' })}
          onRemove={(idx) => dispatch({ type: 'removeTraveler', index: idx })}
          errors={visibleTravelerErrors}
          countError={visibleCountError}
          onNameBlur={(idx) => markTouched(idx, 'fullName')}
          onAgeBlur={(idx) => markTouched(idx, 'age')}
        />

        <WizardFooter
          rightDataTestId="wizard-next"
          leftButtonLabel="← Back"
          onLeftClick={handleBack}
          rightButtonLabel="Next: Review →"
          rightDisabled={hasErrors}
        />
      </form>
    </WizardShell>
  );
}
