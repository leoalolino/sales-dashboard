'use client'

import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-end border-b-2 border-stone-300 dark:border-stone-700 bg-amber-50/90 dark:bg-stone-900/90 px-6">
      <ThemeToggle />
    </header>
  )
}
