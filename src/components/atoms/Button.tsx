'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  active?: boolean
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, active, onClick, variant = 'primary' }: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400'
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        className={`${base} ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      {children}
    </button>
  )
}
