'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChartTypeSwitcher } from './chart-type-switcher'
import { FilterBar } from './filter-bar'
import { StatCard } from './stat-card'
import { SalesChart } from './sales-chart'
import { ChartType, YearlySales } from '@/lib/types'
import { salesData } from '@/lib/mockData'
import { DollarSign, ShoppingCart, BarChart3, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SalesDashboard() {
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [selectedYear, setSelectedYear] = useState('all')
  const [threshold, setThreshold] = useState('')
  const [apiData, setApiData] = useState<YearlySales[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [useApi, setUseApi] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
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
    }, 0)
    return () => clearTimeout(id)
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

    const totalRevenueCurrent = current.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.revenue, 0), 0)
    const totalRevenuePrev = prev.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.revenue, 0), 0)

    const totalProfitCurrent = current.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.profit, 0), 0)
    const totalProfitPrev = prev.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.profit, 0), 0)

    const ordersCurrent = current.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.orders, 0), 0)
    const ordersPrev = prev.reduce((sum, y) => sum + y.data.reduce((s, d) => s + d.orders, 0), 0)

    const avgRevenue = current.length > 0 && current[0].data.length > 0
      ? Math.round(totalRevenueCurrent / (current.length * current[0].data.length))
      : 0

    const revenueChange = totalRevenuePrev > 0 ? ((totalRevenueCurrent - totalRevenuePrev) / totalRevenuePrev * 100).toFixed(1) : '0'
    const profitChange = totalProfitPrev > 0 ? ((totalProfitCurrent - totalProfitPrev) / totalProfitPrev * 100).toFixed(1) : '0'
    const ordersChange = ordersPrev > 0 ? ((ordersCurrent - ordersPrev) / ordersPrev * 100).toFixed(1) : '0'

    return {
      totalRevenue: totalRevenueCurrent,
      totalProfit: totalProfitCurrent,
      totalOrders: ordersCurrent,
      avgRevenue,
      revenueChange,
      profitChange,
      ordersChange,
    }
  }, [filteredData, selectedYear])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl uppercase tracking-wider text-stone-800 dark:text-stone-100">Dashboard</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            sales performance overview for {selectedYear === 'all' ? '2022-2024' : selectedYear}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FilterBar
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            threshold={threshold}
            onThresholdChange={setThreshold}
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useApi}
                onChange={(e) => setUseApi(e.target.checked)}
                className="border-stone-300 dark:border-stone-600 text-amber-700" />
              API
            </label>
            <ChartTypeSwitcher active={chartType} onChange={setChartType} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={`${stats.revenueChange}% vs prev`}
          positive={parseFloat(stats.revenueChange) >= 0}
          icon={DollarSign}
          iconColor="text-stone-600 dark:text-stone-400"
          iconBg="bg-stone-200 dark:bg-stone-800"
        />
        <StatCard
          label="Total Profit"
          value={`$${stats.totalProfit.toLocaleString()}`}
          change={`${stats.profitChange}% vs prev`}
          positive={parseFloat(stats.profitChange) >= 0}
          icon={TrendingUp}
          iconColor="text-stone-600 dark:text-stone-400"
          iconBg="bg-stone-200 dark:bg-stone-800"
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={`${stats.ordersChange}% vs prev`}
          positive={parseFloat(stats.ordersChange) >= 0}
          icon={ShoppingCart}
          iconColor="text-stone-600 dark:text-stone-400"
          iconBg="bg-stone-200 dark:bg-stone-800"
        />
        <StatCard
          label="Avg Monthly Revenue"
          value={`$${stats.avgRevenue.toLocaleString()}`}
          icon={BarChart3}
          iconColor="text-stone-600 dark:text-stone-400"
          iconBg="bg-stone-200 dark:bg-stone-800"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-80 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-stone-500 border-t-transparent" />
                loading...
              </div>
            </div>
          ) : (
            <SalesChart data={filteredData} chartType={chartType} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
