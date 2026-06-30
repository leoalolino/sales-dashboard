import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ReportsPageClient } from '@/components/reports/reports-page-client'

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <ReportsPageClient />
    </DashboardLayout>
  )
}
