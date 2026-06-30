'use client'

import { productsData } from '@/lib/mockData'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function stockVariant(status: string): 'success' | 'warning' | 'destructive' | 'secondary' {
  switch (status) {
    case 'In Stock':
      return 'success'
    case 'Low':
      return 'warning'
    case 'Out of Stock':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export function ProductsPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl uppercase tracking-wider text-stone-800 dark:text-stone-100">Products</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          inventory and sales performance
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-700">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Units Sold
                  </th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-stone-200 dark:border-stone-800 last:border-0"
                  >
                    <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-700 dark:text-stone-300">
                      {product.unitsSold.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-700 dark:text-stone-300">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={stockVariant(product.stock)}>{product.stock}</Badge>
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
