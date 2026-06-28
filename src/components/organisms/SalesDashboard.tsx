'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/atoms'
import { ChartTypeSwitcher, FilterBar, StatCard, SalesChart } from '@/components/molecules'
import { ChartType, YearlySales } from '@/lib/types'
import { salesData } from '@/lib/mockData'

export function SalesDashboard() {
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [selectedYear, setSelectedYear] = useState('all')
  const [threshold, setThreshold] = useState('')
  const [apiData, setApiData] = useState<YearlySales[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [useApi, setUseApi] = useState(false)

  useEffect(() => {
    if (!useApi) {
      setApiData(null)
      return
    }
    const params = new URLSearchParams()
    if (selectedYear !== 'all') params.set('year', selectedYear)
    if (threshold) params.set('minRevenue', threshold)

    setLoading(true)
    fetch(`/api/sales?${params.toString()}`)
      .then((r) => r.json())
      .then(setApiData)
      .finally(() => setLoading(false))
  }, [selectedYear, threshold, useApi])

  const filteredData = useMemo(() => {
    if (apiData) return apiData
    let data = salesData
    if (selectedYear !== 'all') {
      data = data.filter((s) => s.year === parseInt(selectedYear))
    }
    if (threshold) {
      const min = parseInt(threshold)
      if (!isNaN(min)) {
        data = data.map((s) => ({
          ...s,
          data: s.data.filter((d) => d.revenue >= min),
        }))
      }
    }
    return data
  }, [selectedYear, threshold, apiData])

  const stats = useMemo(() => {
    const current = filteredData
    const prev = selectedYear === 'all'
      ? salesData
      : salesData.filter((s) => s.year === parseInt(selectedYear))

    const totalCurrent = current.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.revenue, 0), 0)
    const totalPrev = prev.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.revenue, 0), 0)

    const ordersCurrent = current.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.orders, 0), 0)
    const ordersPrev = prev.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.orders, 0), 0)

    const avgRevenue = current.length > 0 && current[0].data.length > 0
      ? Math.round(totalCurrent / (current.length * current[0].data.length))
      : 0

    const change = totalPrev > 0 ? ((totalCurrent - totalPrev) / totalPrev * 100).toFixed(1) : '0'

    return { totalRevenue: totalCurrent, totalOrders: ordersCurrent, avgRevenue, change }
  }, [filteredData, selectedYear])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterBar
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          threshold={threshold}
          onThresholdChange={setThreshold}
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={useApi}
              onChange={(e) => setUseApi(e.target.checked)}
              className="rounded"
            />
            Use API
          </label>
          <ChartTypeSwitcher active={chartType} onChange={setChartType} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={`${stats.change}% vs prev`}
          positive={parseFloat(stats.change) >= 0}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
        />
        <StatCard
          label="Avg Monthly Revenue"
          value={`$${stats.avgRevenue.toLocaleString()}`}
        />
      </div>

      <Card title="Sales Overview">
        {loading ? (
          <div className="flex items-center justify-center h-80 text-gray-400">Loading...</div>
        ) : (
          <SalesChart data={filteredData} chartType={chartType} />
        )}
      </Card>
    </div>
  )
}
