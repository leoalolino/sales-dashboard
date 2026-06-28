interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
}

export function StatCard({ label, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      )}
    </div>
  )
}
