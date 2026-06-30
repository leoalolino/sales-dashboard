'use client'

import { Input, Select } from '@/components/atoms'

interface FilterBarProps {
  selectedYear: string
  onYearChange: (year: string) => void
  threshold: string
  onThresholdChange: (value: string) => void
}

export function FilterBar({ selectedYear, onYearChange, threshold, onThresholdChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <Select
        label="YEAR"
        value={selectedYear}
        onChange={onYearChange}
        options={[
          { label: 'All Years', value: 'all' },
          { label: '2024', value: '2024' },
          { label: '2023', value: '2023' },
          { label: '2022', value: '2022' },
        ]}
      />
      <Input
        label="MIN REVENUE ($)"
        value={threshold}
        onChange={onThresholdChange}
        placeholder="e.g. 50000"
        type="number"
      />
    </div>
  )
}
