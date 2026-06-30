'use client'

import { useState, useCallback } from 'react'
import { salesData } from '@/lib/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileDown, CheckCircle } from 'lucide-react'

export function ReportsPageClient() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const yearlyData = salesData.map((year) => ({
    year: year.year,
    totalRevenue: year.data.reduce((s, d) => s + d.revenue, 0),
    totalProfit: year.data.reduce((s, d) => s + d.profit, 0),
    totalOrders: year.data.reduce((s, d) => s + d.orders, 0),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl uppercase tracking-wider text-stone-800 dark:text-stone-100">Reports</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            annual performance summaries
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => showToast('Report exported as CSV')}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {yearlyData.map((year) => (
          <Card key={year.year}>
            <CardHeader>
              <CardTitle>{year.year}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Total Revenue</p>
                <p className="text-xl text-stone-800 dark:text-stone-100">
                  ${year.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Total Profit</p>
                <p className="text-lg text-stone-800 dark:text-stone-100">
                  ${year.totalProfit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Total Orders</p>
                <p className="text-lg text-stone-800 dark:text-stone-100">
                  {year.totalOrders.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 border-2 border-stone-600 bg-stone-800 text-amber-50 px-4 py-3">
          <CheckCircle className="h-4 w-4 text-amber-400" />
          <span className="text-sm">{toast}</span>
        </div>
      )}
    </div>
  )
}
