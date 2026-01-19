import { FocusEventHandler, useEffect, useState } from 'react';
import { Destination } from '@/lib/types';
import clsx from 'clsx';
import { Skeleton } from '@/components/ui/Skeleton';

interface Props {
  value: string;
  onChange: (id: string) => void;
  error?: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
}

export function DestinationStep({ value, onBlur, onChange, error }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch('/api/destinations');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Destination[] = await res.json();
        setDestinations(data);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (e: any) {
        setLoadError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="mb-2 text-xl font-semibold text-zinc-100">Choose your destination</h2>
      {loading && <Skeleton count={4} />}
      {loadError && <div className="text-red-500">Error: {loadError}</div>}
      {!loading && !loadError && (
        <ul className="flex flex-col gap-4">
          {destinations.map((d) => (
            <li key={d.id}>
              <label className="block cursor-pointer">
                <div
                  className={clsx(
                    value === d.id
                      ? 'ring-primary/40 border-primary bg-zinc-900/70 ring-2'
                      : 'border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900/80',
                    'flex items-center gap-3 rounded-lg border px-5 py-4 shadow-sm backdrop-blur-sm transition-all duration-150 select-none',
                  )}
                >
                  <input
                    type="radio"
                    name="destination"
                    value={d.id}
                    checked={value === d.id}
                    onChange={() => onChange(d.id)}
                    onBlur={onBlur}
                    className="accent-primary focus-visible:ring-primary/60 mr-4 focus:outline-none focus-visible:ring-2"
                  />
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium text-zinc-100">{d.name}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-zinc-400">{d.distance}</span>
                      <span className="text-sm text-zinc-400">{d.travelTime}</span>
                    </div>
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </section>
  );
}
