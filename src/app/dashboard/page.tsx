import { SalesDashboard } from '@/components/organisms'

export const metadata = {
  title: 'Dashboard | Sales Analytics',
  description: 'Sales analytics dashboard for 2022-2024',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Annual sales performance for 2022, 2023 & 2024
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SalesDashboard />
      </main>
    </div>
  )
}
