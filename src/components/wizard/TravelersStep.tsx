import { Step2Touched } from "@/app/wizard/step-2/page";
import { Traveler } from "@/lib/types";

interface Props {
  travelers: Traveler[];
  onChange: (index: number, traveler: Partial<Traveler>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  errors?: Array<{ fullName?: string; age?: string }>;
  onNameBlur(index: number): void;
  onAgeBlur(index: number): void;
  countError?: string;
  touched: Step2Touched;
}

export function TravelersStep({
  travelers,
  onChange,
  onAdd,
  onRemove,
  onAgeBlur,
  onNameBlur,
  errors = [],
  countError,
  touched,
}: Props) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Travelers
      </h2>

      {countError && <div className="text-red-500">{countError}</div>}

      <div className="flex flex-col gap-5">
        {travelers.map((trav, i) => {
          const nameTouched = touched[i]?.fullName;
          const ageTouched = touched[i]?.age;

          return (
            <div
              key={i}
              className="gap-4 rounded-lg border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
            >
              <div className="flex w-full gap-4">
                <label
                  htmlFor={`fullName-${i}`}
                  className="flex flex-[1_1_0%] flex-col"
                >
                  <span className="mb-1 font-medium text-zinc-700 dark:text-zinc-200">
                    Full name
                  </span>
                  <input
                    id={`fullName-${i}`}
                    name="fullName"
                    type="text"
                    value={trav.fullName}
                    onBlur={() => onNameBlur(i)}
                    onChange={(e) => onChange(i, { fullName: e.target.value })}
                    className="focus-visible:ring-primary/60 rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 shadow-sm transition-all outline-none focus-visible:ring-2 dark:border-zinc-700 dark:bg-zinc-900/70"
                  />
                  {nameTouched && errors[i]?.fullName && (
                    <span className="mt-1 text-sm text-red-400">
                      {errors[i].fullName}
                    </span>
                  )}
                </label>

                <label
                  htmlFor={`age-${i}`}
                  className="flex w-12 flex-col sm:w-20"
                >
                  <span className="mb-1 font-medium text-zinc-700 dark:text-zinc-200">
                    Age
                  </span>
                  <input
                    id={`age-${i}`}
                    name="age"
                    type="number"
                    min={0}
                    value={trav.age ?? ""}
                    onBlur={() => onAgeBlur(i)}
                    onChange={(e) =>
                      onChange(i, { age: Number(e.target.value) })
                    }
                    className="focus-visible:ring-primary/60 w-full rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 font-mono shadow-sm transition-all outline-none focus-visible:ring-2 dark:border-zinc-700 dark:bg-zinc-900/70"
                  />
                  {ageTouched && errors[i]?.age && (
                    <span className="mt-1 text-sm text-red-400">
                      {errors[i].age}
                    </span>
                  )}
                </label>
              </div>

              {travelers.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="mt-4 w-full rounded border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs text-zinc-600 transition-all hover:bg-zinc-200 sm:w-auto sm:self-end dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
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
