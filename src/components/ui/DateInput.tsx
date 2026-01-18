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
    <div>
      <label>
        {label}
        <input
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={e => onChange(e.target.value)}
          style={{ display: "block", marginTop: 4, marginBottom: 4 }}
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
