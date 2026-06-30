import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SalesPageClient } from '@/components/sales/sales-page-client'

export default function SalesPage() {
  return (
    <DashboardLayout>
      <SalesPageClient />
    </DashboardLayout>
  )
}
