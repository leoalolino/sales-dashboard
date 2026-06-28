'use client'

import { Button } from '@/components/atoms'
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
    <div className="flex gap-2">
      {TYPES.map((t) => (
        <Button key={t.value} active={active === t.value} onClick={() => onChange(t.value)}>
          {t.label}
        </Button>
      ))}
    </div>
  )
}
