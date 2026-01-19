"use client";

import React, { useState } from "react";
import { DestinationStep } from "@/components/wizard/DestinationStep";
import { FormAlert } from "@/components/shared/FormAlert";
import { WizardFooter } from "@/components/shared/WizardFooter";
import { DateInput } from "@/components/ui/DateInput";
import { validateDraft } from "@/lib/validation";
import { useRouter } from "next/navigation";
import WizardShell from "@/app/wizard/shell";
import { useWizardDraft } from "@/contexts/WizardDraftContext";

type Step1Touched = {
  destinationId?: boolean;
  departureDate?: boolean;
  returnDate?: boolean;
};

export default function Step1() {
  const { state, dispatch } = useWizardDraft();
  const router = useRouter();

  const [touched, setTouched] = useState<Step1Touched>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const errors = validateDraft(state);
  const hasErrors = Boolean(
    errors.destinationId || errors.departureDate || errors.returnDate
  );
  const showError = (key: keyof Step1Touched) => hasTriedSubmit || touched[key];

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setHasTriedSubmit(true);
    if (hasErrors) return;
    router.push("/wizard/step-2");
  }

  return (
    <WizardShell>
      <form onSubmit={handleNext} className="flex flex-col gap-8">
        {hasTriedSubmit && hasErrors && (
          <FormAlert message="Please fix the highlighted fields to continue." />
        )}

        <DestinationStep
          value={state.destinationId}
          onChange={(destinationId: string) =>
            dispatch({ type: "setDestination", destinationId })
          }
          onBlur={() => setTouched((t) => ({ ...t, destinationId: true }))}
          error={showError("destinationId") ? errors.destinationId : undefined}
        />

        <div className="mt-2 flex flex-col gap-6 sm:flex-row">
          <DateInput
            id="departureDate"
            label="Departure date"
            name="departureDate"
            value={state.departureDate ?? ""}
            onChange={(value) =>
              dispatch({ type: "setDepartureDate", departureDate: value })
            }
            onBlur={() => setTouched((t) => ({ ...t, departureDate: true }))}
            error={
              showError("departureDate") ? errors.departureDate : undefined
            }
          />

          <DateInput
            id="returnDate"
            label="Return date"
            name="returnDate"
            value={state.returnDate ?? ""}
            onChange={(value) =>
              dispatch({ type: "setReturnDate", returnDate: value })
            }
            onBlur={() => setTouched((t) => ({ ...t, returnDate: true }))}
            min={state.departureDate || undefined}
            error={showError("returnDate") ? errors.returnDate : undefined}
          />
        </div>

        <WizardFooter
          hideLeftButton
          rightButtonLabel="Next: Travelers →"
          rightDisabled={hasErrors}
          rightDataTestId="wizard-next"
        />
      </form>
    </WizardShell>
  );
}
