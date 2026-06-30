interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
}

export function StatCard({ label, value, change, positive }: StatCardProps) {
  return (
    <div className="border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 p-4">
      <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">{label}</p>
      <p className="text-2xl text-stone-800 dark:text-stone-100 mt-1">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${positive ? 'text-stone-600' : 'text-red-600'}`}>
          {change}
        </p>
      )}
    </div>
  )
}
