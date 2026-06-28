export interface Sale {
  month: string
  revenue: number
  profit: number
  orders: number
}

export interface YearlySales {
  year: number
  data: Sale[]
}

export type ChartType = 'bar' | 'line' | 'pie'
