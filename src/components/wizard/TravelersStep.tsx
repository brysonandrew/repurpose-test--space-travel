import React from 'react';
import { Traveler } from '../../lib/types';

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
      <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Travelers</h2>
      {countError && <div className="text-red-500">{countError}</div>}
      <div className="flex flex-col gap-5">
        {travelers.map((trav, i) => (
          <div
            key={i}
            className="flex flex-wrap items-start gap-4 rounded-lg border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
          >
            <label className="flex min-w-[170px] flex-1 flex-col">
              <span className="mb-1 font-medium text-zinc-700 dark:text-zinc-200">Full name</span>
              <input
                type="text"
                value={trav.fullName}
                onChange={(e) => onChange(i, { fullName: e.target.value })}
                className="focus-visible:ring-primary/60 rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 shadow-sm transition-all duration-150 outline-none focus-visible:ring-2 dark:border-zinc-700 dark:bg-zinc-900/70"
              />
              {errors && errors[i]?.fullName && (
                <span className="mt-1 text-xs text-red-500">{errors[i].fullName}</span>
              )}
            </label>
            <label className="flex min-w-[100px] flex-col">
              <span className="mb-1 font-medium text-zinc-700 dark:text-zinc-200">Age</span>
              <input
                type="number"
                min={0}
                max={120}
                value={trav.age ?? ''}
                onChange={(e) =>
                  onChange(i, { age: e.target.value ? parseInt(e.target.value, 10) : undefined })
                }
                className="focus-visible:ring-primary/60 w-24 rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 shadow-sm transition-all duration-150 outline-none focus-visible:ring-2 dark:border-zinc-700 dark:bg-zinc-900/70"
              />
              {errors && errors[i]?.age && (
                <span className="mt-1 text-xs text-red-500">{errors[i].age}</span>
              )}
            </label>
            {travelers.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="w-full h-full grow rounded border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs text-zinc-600 transition-all hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
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
          className="rounded bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-900 disabled:pointer-events-none disabled:opacity-40 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-50"
        >
          + Add traveler
        </button>
      </div>
    </section>
  );
}
