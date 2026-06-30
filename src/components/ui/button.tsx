import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap border-2 text-sm uppercase tracking-wider transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-stone-800 text-amber-50 border-stone-800 hover:bg-stone-700',
        destructive:
          'bg-red-700 text-amber-50 border-red-700 hover:bg-red-600',
        outline:
          'border-stone-300 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 hover:bg-amber-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300',
        secondary:
          'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700',
        ghost:
          'border-transparent hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300',
        link:
          'border-transparent text-amber-700 dark:text-amber-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
