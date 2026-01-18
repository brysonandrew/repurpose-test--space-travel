'use client';
import React, { useReducer, useEffect } from "react";
import { TravelersStep } from "../../../components/wizard/TravelersStep";
import { wizardReducer, initialWizardState, saveWizardDraft, loadWizardDraft } from "../../../lib/wizardState";
import { validateDraft } from "../../../lib/validation";
import { useRouter } from "next/navigation";

export default function Step2() {
  const [state, dispatch] = useReducer(
    wizardReducer,
    undefined,
    () => loadWizardDraft() ?? initialWizardState
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
    router.push("/wizard/step-3");
  }
  function handleBack() {
    router.push("/wizard/step-1");
  }

  return (
    <form onSubmit={handleNext}>
      <TravelersStep
        travelers={state.travelers}
        onChange={(idx, traveler) =>
          dispatch({ type: "updateTraveler", index: idx, traveler })
        }
        onAdd={() => dispatch({ type: "addTraveler" })}
        onRemove={idx => dispatch({ type: "removeTraveler", index: idx })}
        errors={errors.travelers}
        countError={errors.travelersCount}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginTop: 36 }}>
        <button type="button" onClick={handleBack}>
          ← Back
        </button>
        <button type="submit">
          Next: Review →
        </button>
      </div>
    </form>
  );
}
