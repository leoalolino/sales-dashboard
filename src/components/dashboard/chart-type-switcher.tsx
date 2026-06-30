'use client'

import { ChartType } from '@/lib/types'

interface ChartTypeSwitcherProps {
  active: ChartType
  onChange: (type: ChartType) => void
}

const TYPES: { label: string; value: ChartType }[] = [
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
  { label: 'Pie', value: 'pie' },
]

export function ChartTypeSwitcher({ active, onChange }: ChartTypeSwitcherProps) {
  return (
    <div className="flex border-2 border-stone-300 dark:border-stone-700">
      {TYPES.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
            active === t.value
              ? 'bg-stone-800 text-amber-50 dark:bg-amber-50 dark:text-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
