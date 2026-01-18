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
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Travelers</h2>
      {countError && <div className="text-red-500">{countError}</div>}
      <div className="flex flex-col gap-5">
        {travelers.map((trav, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 shadow-sm p-5 flex flex-wrap gap-4 items-center">
            <label className="flex flex-col flex-1 min-w-[170px]">
              <span className="text-zinc-700 dark:text-zinc-200 font-medium mb-1">Full name</span>
              <input
                type="text"
                value={trav.fullName}
                onChange={e => onChange(i, { fullName: e.target.value })}
                className="rounded-lg px-3 py-2 bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all duration-150"
              />
              {errors && errors[i]?.fullName && (
                <span className="text-red-500 text-xs mt-1">{errors[i].fullName}</span>
              )}
            </label>
            <label className="flex flex-col min-w-[100px]">
              <span className="text-zinc-700 dark:text-zinc-200 font-medium mb-1">Age</span>
              <input
                type="number"
                min={0}
                max={120}
                value={trav.age ?? ""}
                onChange={e => onChange(i, { age: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                className="rounded-lg px-3 py-2 w-24 bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all duration-150"
              />
              {errors && errors[i]?.age && (
                <span className="text-red-500 text-xs mt-1">{errors[i].age}</span>
              )}
            </label>
            {travelers.length > 1 && (
              <button type="button" onClick={() => onRemove(i)}
                className="ml-2 text-xs px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={onAdd}
          disabled={travelers.length >= 5}
          className="text-sm font-medium px-4 py-2 rounded bg-zinc-700 dark:bg-zinc-300 text-white dark:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-50 transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          + Add traveler
        </button>
      </div>
    </section>
  );
}
