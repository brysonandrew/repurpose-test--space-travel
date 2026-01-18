import React from "react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  min?: string;
  max?: string;
  error?: string;
}

export function DateInput({ label, value, onChange, min, max, error }: DateInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-zinc-700 dark:text-zinc-200 font-medium mb-1">{label}</label>
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2 bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
