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
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  )
}
