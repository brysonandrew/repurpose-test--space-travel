import React from "react";
import { WizardState } from "../../lib/wizardState";
import { Destination } from "../../lib/types";

interface Props {
  state: WizardState;
  destinations: Destination[];
}

export function ReviewStep({ state, destinations }: Props) {
  const dest = destinations.find(d => d.id === state.destinationId);
  return (
    <section>
      <h2>Booking Review</h2>
      <div style={{marginBottom:16}}>
        <strong>Destination:</strong> {dest ? dest.name : "-"}
      </div>
      <div style={{marginBottom:16}}>
        <strong>Departure:</strong> {state.departureDate || "-"}<br/>
        <strong>Return:</strong> {state.returnDate || "-"}
      </div>
      <div>
        <strong>Travelers:</strong>
        <ol>
          {state.travelers.map((trav, i) => (
            <li key={i}>{trav.fullName} (age {trav.age})</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
