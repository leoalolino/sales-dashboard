'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  active?: boolean
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, active, onClick, variant = 'primary' }: ButtonProps) {
  const base = 'px-4 py-2 text-sm uppercase tracking-wider transition-colors border-2'
  const inactive = 'border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        className={`${base} ${active ? 'bg-stone-800 text-amber-50 border-stone-800' : inactive}`}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? 'bg-stone-800 text-amber-50 border-stone-800' : inactive}`}
    >
      {children}
    </button>
  )
}
