import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center border-2 px-2.5 py-0.5 text-xs uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-stone-800 bg-amber-50 text-stone-800 dark:border-amber-50 dark:bg-transparent dark:text-amber-50',
        secondary:
          'border-stone-300 bg-stone-200 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300',
        destructive:
          'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-transparent dark:text-red-400',
        outline:
          'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300',
        success:
          'border-stone-600 bg-stone-200 text-stone-800 dark:border-stone-500 dark:bg-transparent dark:text-stone-300',
        warning:
          'border-amber-600 bg-amber-50 text-amber-800 dark:border-amber-500 dark:bg-transparent dark:text-amber-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
