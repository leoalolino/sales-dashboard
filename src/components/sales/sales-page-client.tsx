'use client'

import { useState, useMemo } from 'react'
import { salesData } from '@/lib/mockData'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CHART_COLOR = '#c45a3c'

export function SalesPageClient() {
  const [selectedYear, setSelectedYear] = useState('2024')

  const filteredData = useMemo(() => {
    return salesData.find((s) => s.year === parseInt(selectedYear))?.data ?? []
  }, [selectedYear])

  const tableData = useMemo(() => {
    return filteredData.map((d, i, arr) => ({
      ...d,
      growth: i > 0 ? ((d.revenue - arr[i - 1].revenue) / arr[i - 1].revenue * 100) : null,
    }))
  }, [filteredData])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl uppercase tracking-wider text-stone-800 dark:text-stone-100">Sales</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">monthly sales breakdown</p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-9 border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 px-3 text-sm text-stone-700 dark:text-stone-300"
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <Card>
        <CardHeader>
              <CardTitle>Monthly Revenue - {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="2 2" stroke="#d6d3c8" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#78716c', fontSize: 12, fontFamily: 'inherit' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fill: '#78716c', fontSize: 12, fontFamily: 'inherit' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                contentStyle={{
                  border: '2px solid #d6d3c8',
                  background: '#faf6ef',
                  borderRadius: 0,
                }}
              />
              <Bar dataKey="revenue" fill={CHART_COLOR} radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-700">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Month</th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Revenue</th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Profit</th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Orders</th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Growth</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr
                    key={row.month}
                    className="border-b border-stone-200 dark:border-stone-800 last:border-0"
                  >
                    <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                      {row.month}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-700 dark:text-stone-300">
                      ${row.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-700 dark:text-stone-300">
                      ${row.profit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-700 dark:text-stone-300">
                      {row.orders.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {row.growth !== null ? (
                        <span
                          className={
                            row.growth >= 0
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }
                        >
                          {row.growth >= 0 ? '+' : ''}
                          {row.growth.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-stone-400">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
