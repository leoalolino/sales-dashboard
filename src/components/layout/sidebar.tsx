'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, BarChart3, Package, FileText, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Sales', icon: BarChart3, href: '/sales' },
  { label: 'Products', icon: Package, href: '/products' },
  { label: 'Reports', icon: FileText, href: '/reports' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6 text-stone-700 dark:text-stone-300" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-amber-50 dark:bg-sidebar border-r-2 border-stone-300 dark:border-sidebar-border transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex h-14 items-center border-b-2 border-stone-300 dark:border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-stone-800 bg-amber-50 dark:border-amber-50 dark:bg-transparent">
            <BarChart3 className="h-4 w-4 text-stone-800 dark:text-amber-50" />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-stone-400 dark:text-sidebar-foreground hover:text-stone-600 dark:hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm uppercase tracking-wider transition-colors',
                  active
                    ? 'bg-stone-200 dark:bg-sidebar-accent text-stone-900 dark:text-sidebar-accent-foreground'
                    : 'text-stone-600 dark:text-sidebar-foreground hover:bg-stone-200 dark:hover:bg-sidebar-accent hover:text-stone-900 dark:hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
