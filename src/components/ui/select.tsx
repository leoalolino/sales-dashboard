'use client'

import { cn } from '@/lib/utils'
import { forwardRef, SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-9 w-full border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 px-3 py-1 text-sm text-stone-800 dark:text-stone-200 focus-visible:outline-none focus-visible:border-amber-700 dark:focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
)
Select.displayName = 'Select'

export { Select }
