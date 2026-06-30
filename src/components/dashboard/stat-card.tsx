import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
}

export function StatCard({
  label,
  value,
  change,
  positive = true,
  icon: Icon,
  iconColor = 'text-stone-600 dark:text-stone-400',
  iconBg = 'bg-stone-200 dark:bg-stone-800',
}: StatCardProps) {
  return (
    <div className="border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {label}
          </p>
          <p className="text-2xl text-stone-800 dark:text-stone-100">
            {value}
          </p>
          {change && (
            <div className="flex items-center gap-1">
              {positive ? (
                <TrendingUp className="h-3.5 w-3.5 text-stone-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  positive ? 'text-stone-600 dark:text-stone-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </div>
    </div>
  )
}
