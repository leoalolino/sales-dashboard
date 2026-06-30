'use client'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

interface FilterBarProps {
  selectedYear: string
  onYearChange: (year: string) => void
  threshold: string
  onThresholdChange: (value: string) => void
}

export function FilterBar({ selectedYear, onYearChange, threshold, onThresholdChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Year</label>
        <Select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          options={[
            { label: 'All Years', value: 'all' },
            { label: '2024', value: '2024' },
            { label: '2023', value: '2023' },
            { label: '2022', value: '2022' },
          ]}
          className="w-32"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Min Revenue</label>
        <Input
          value={threshold}
          onChange={(e) => onThresholdChange(e.target.value)}
          placeholder="e.g. 50000"
          type="number"
          className="w-36"
        />
      </div>
    </div>
  )
}
