interface DateInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  min?: string;
  max?: string;
  error?: string;
}

export function DateInput({ id, name, label, value, onChange, min, max, error }: DateInputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor={id}
        className="mb-1 font-medium text-zinc-700 dark:text-zinc-200"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="dark-date-icon focus-visible:ring-primary/60 w-full rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 shadow-sm transition-all duration-150 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60"
      />
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
}
