import React, { useEffect, useState } from "react";
import { Destination } from "../../lib/types";

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
      } catch (e: any) {
        setLoadError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <section>
      <h2>Choose your destination</h2>
      {loading && <div>Loading destinations…</div>}
      {loadError && <div style={{ color: "red" }}>Error: {loadError}</div>}
      {!loading && !loadError && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {destinations.map((d) => (
            <li key={d.id} style={{marginBottom: 12}}>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="destination"
                  value={d.id}
                  checked={value === d.id}
                  onChange={() => onChange(d.id)}
                  style={{marginRight: 8}}
                />
                <b>{d.name}</b> – <span>{d.description || ''}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
