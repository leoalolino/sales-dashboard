'use client'

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  type?: string
}

export function Input({ value, onChange, placeholder, label, type = 'text' }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-2 border-stone-300 dark:border-stone-700 px-3 py-2 text-sm text-stone-800 dark:text-stone-200 bg-amber-50 dark:bg-stone-900 focus:outline-none focus:border-amber-700 dark:focus:border-amber-500"
      />
    </div>
  )
}
