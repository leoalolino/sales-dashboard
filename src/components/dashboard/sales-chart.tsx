'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { ChartType, YearlySales } from '@/lib/types'

const CHART_COLORS = ['#c45a3c', '#2d5a5e', '#d4a040']

interface SalesChartProps {
  data: YearlySales[]
  chartType: ChartType
  dataKey?: 'revenue' | 'profit' | 'orders'
}

interface TooltipPayload {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 px-3 py-2">
      <p className="text-sm text-stone-800 dark:text-stone-200 mb-1">{label}</p>
      {payload.map((p: TooltipPayload) => (
        <p key={p.name} className="text-xs text-stone-600 dark:text-stone-400">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: p.color }}
          />
          {p.name}: ${Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  )
}

interface LegendPayload {
  value: string
  color: string
}

function CustomLegend({ payload }: { payload?: LegendPayload[] }) {
  if (!payload) return null
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload.map((entry: LegendPayload) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-slate-600 dark:text-slate-400">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export function SalesChart({ data, chartType, dataKey = 'revenue' }: SalesChartProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : false
  const gridColor = isDark ? '#44403c' : '#d6d3c8'
  const textColor = isDark ? '#a8a29e' : '#78716c'

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-stone-400 uppercase tracking-wider">
        no data matches the current filters.
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
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
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
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: gridColor }}
          />
          <YAxis
            tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`}
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: gridColor }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {years.map((year, i) => (
            <Line
              key={year}
              type="monotone"
              dataKey={year}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4, fill: CHART_COLORS[i % CHART_COLORS.length], strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: CHART_COLORS[i % CHART_COLORS.length],
                stroke: isDark ? '#0f172a' : '#ffffff',
                strokeWidth: 2,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="month"
          tick={{ fill: textColor, fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: gridColor }}
        />
        <YAxis
          tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`}
          tick={{ fill: textColor, fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: gridColor }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        {years.map((year, i) => (
          <Bar
            key={year}
            dataKey={year}
            fill={CHART_COLORS[i % CHART_COLORS.length]}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
