'use client'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  label?: string
}

export function Select({ value, onChange, options, label }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 border-stone-300 dark:border-stone-700 px-3 py-2 text-sm text-stone-800 dark:text-stone-200 bg-amber-50 dark:bg-stone-900 focus:outline-none focus:border-amber-700 dark:focus:border-amber-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
