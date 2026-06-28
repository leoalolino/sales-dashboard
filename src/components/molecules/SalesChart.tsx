'use client'

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { ChartType, YearlySales } from '@/lib/types'

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#f59e0b', '#8b5cf6', '#ec4899']

interface SalesChartProps {
  data: YearlySales[]
  chartType: ChartType
  dataKey?: 'revenue' | 'profit' | 'orders'
}

export function SalesChart({ data, chartType, dataKey = 'revenue' }: SalesChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-400">
        No data matches the current filters.
      </div>
    )
  }

  if (chartType === 'pie') {
    const pieData = data.flatMap((year) =>
      year.data.map((d) => ({
        name: `${year.year} ${d.month}`,
        value: d[dataKey],
      }))
    )
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={140}
            label={({ name, value }) => `${name ?? ''}: $${(value ?? 0).toLocaleString()}`}
            dataKey="value"
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  const chartData = data[0]?.data.map((_, i) => {
    const point: Record<string, string | number> = { month: data[0].data[i].month }
    for (const year of data) {
      point[`${year.year}`] = year.data[i][dataKey]
    }
    return point
  }) ?? []

  const years = data.map((d) => String(d.year))

  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
          <Legend />
          {years.map((year, i) => (
            <Line
              key={year}
              type="monotone"
              dataKey={year}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        <Legend />
        {years.map((year, i) => (
          <Bar key={year} dataKey={year} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
