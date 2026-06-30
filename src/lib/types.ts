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

export interface Product {
  id: number
  name: string
  category: string
  unitsSold: number
  revenue: number
  stock: 'In Stock' | 'Low' | 'Out of Stock'
}
