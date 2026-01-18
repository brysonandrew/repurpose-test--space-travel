import { useEffect, useState } from "react";
import { Destination } from "../../lib/types";
import clsx from "clsx";

interface Props {
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

export function DestinationStep({ value, onChange, error }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch("/api/destinations");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Destination[] = await res.json();
        setDestinations(data);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (e: any) {
        setLoadError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Choose your destination</h2>
      {loading && <div className="text-zinc-500">Loading destinations…</div>}
      {loadError && <div className="text-red-500">Error: {loadError}</div>}
      {!loading && !loadError && (
        <ul className="flex flex-col gap-4">
          {destinations.map((d) => (
            <li key={d.id}>
              <label className="block cursor-pointer">
                <div className={
                  clsx(value === d.id
                    ? "ring-2 ring-primary/40 border-primary bg-white/80 dark:bg-zinc-900/70"
                    : "border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 hover:bg-white/80 dark:hover:bg-zinc-900/80",
                  " flex items-center border rounded-lg px-5 py-4 transition-all duration-150 gap-3 backdrop-blur-sm shadow-sm select-none")}>
                  <input
                    type="radio"
                    name="destination"
                    value={d.id}
                    checked={value === d.id}
                    onChange={() => onChange(d.id)}
                    className="accent-primary focus-visible:ring-2 focus-visible:ring-primary/60 focus:outline-none mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{d.name}</span>
                    {d.description && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{d.description}</span>
                    )}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </section>
  );
}
