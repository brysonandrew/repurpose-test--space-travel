import React from "react";
import { Traveler } from "../../lib/types";

interface Props {
  travelers: Traveler[];
  onChange: (index: number, traveler: Partial<Traveler>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  errors?: Array<{ fullName?: string; age?: string }>;
  countError?: string;
}

export function TravelersStep({ travelers, onChange, onAdd, onRemove, errors, countError }: Props) {
  return (
    <section>
      <h2>Travelers</h2>
      {countError && <div style={{ color: "red" }}>{countError}</div>}
      {travelers.map((trav, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16, borderRadius: 8 }}>
          <label>
            Full name:
            <input
              type="text"
              value={trav.fullName}
              onChange={e => onChange(i, { fullName: e.target.value })}
              style={{ marginLeft: 8, marginRight: 12 }}
            />
            {errors && errors[i]?.fullName && (
              <span style={{ color: "red", marginLeft: 8 }}>{errors[i].fullName}</span>
            )}
          </label>
          <label style={{ marginLeft: 18 }}>
            Age:
            <input
              type="number"
              min={0}
              max={120}
              value={trav.age ?? ""}
              onChange={e => onChange(i, { age: e.target.value ? parseInt(e.target.value, 10) : undefined })}
              style={{ marginLeft: 8, width: 60 }}
            />
            {errors && errors[i]?.age && (
              <span style={{ color: "red", marginLeft: 8 }}>{errors[i].age}</span>
            )}
          </label>
          {travelers.length > 1 && (
            <button type="button" style={{ marginLeft: 24 }} onClick={() => onRemove(i)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={onAdd}
          disabled={travelers.length >= 5}
          style={{ marginRight: 18 }}
        >
          + Add traveler
        </button>
      </div>
    </section>
  );
}
