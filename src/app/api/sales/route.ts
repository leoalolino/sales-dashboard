import { NextResponse } from 'next/server'
import { salesData } from '@/lib/mockData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const minRevenue = searchParams.get('minRevenue')

  let data = salesData

  if (year) {
    data = data.filter((s) => s.year === parseInt(year))
  }

  let result = data.map((s) => ({
    ...s,
    data: s.data.map((d) => ({
      ...d,
    })),
  }))

  if (minRevenue) {
    const threshold = parseInt(minRevenue)
    result = result.map((s) => ({
      ...s,
      data: s.data.filter((d) => d.revenue >= threshold),
    }))
  }

  await new Promise((r) => setTimeout(r, 300))

  return NextResponse.json(result)
}
