import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sales Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore annual sales performance across 2022, 2023, and 2024 with
          interactive charts, custom filters, and real-time API integration.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Year View</h3>
            <p className="text-sm text-gray-500">
              Compare revenue, profit, and orders across 2022, 2023, and 2024 side by side.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Custom Filters</h3>
            <p className="text-sm text-gray-500">
              Filter by year and set a minimum revenue threshold to focus on top-performing months.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Charts</h3>
            <p className="text-sm text-gray-500">
              Switch between bar, line, and pie charts to visualize data your way.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
