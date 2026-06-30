import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  className?: string
}

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`border-2 border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 p-6 ${className}`}>
      {title && <h3 className="text-lg uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-4">{title}</h3>}
      {children}
    </div>
  )
}
