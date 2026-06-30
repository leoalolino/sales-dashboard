import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProductsPageClient } from '@/components/products/products-page-client'

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductsPageClient />
    </DashboardLayout>
  )
}
