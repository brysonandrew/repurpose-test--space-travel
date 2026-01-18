'use client'
import React, { useReducer, useEffect } from "react";
import { DestinationStep } from "../../../components/wizard/DestinationStep";
import { DateInput } from "../../../components/ui/DateInput";
import { wizardReducer, initialWizardState, saveWizardDraft, loadWizardDraft, WizardState } from "../../../lib/wizardState";
import { validateDraft } from "../../../lib/validation";
import { useRouter } from "next/navigation";

export default function Step1() {
  const [state, dispatch] = useReducer(
    wizardReducer,
    undefined,
    () => loadWizardDraft() ?? initialWizardState
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
    router.push("/wizard/step-2");
  }

  return (
    <form onSubmit={handleNext}>
      <DestinationStep
        value={state.destinationId}
        onChange={destinationId => dispatch({ type: "setDestination", destinationId })}
        error={errors.destinationId}
      />
      <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
        <DateInput
          label="Departure date"
          value={state.departureDate}
          onChange={date => dispatch({ type: "setDates", departureDate: date, returnDate: state.returnDate })}
          error={errors.departureDate}
        />
        <DateInput
          label="Return date"
          value={state.returnDate}
          onChange={date => dispatch({ type: "setDates", departureDate: state.departureDate, returnDate: date })}
          min={state.departureDate || undefined}
          error={errors.returnDate}
        />
      </div>
      <button type="submit" style={{ marginTop: 30, fontWeight: 700 }}>
        Next: Travelers →
      </button>
    </form>
  );
}
