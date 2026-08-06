/**
 * components/ui/Badge.tsx
 *
 * Compact label / pill for status, tags, and tech stack chips.
 *
 * Variants:  default | primary | secondary | accent |
 *            success | warning | danger | outline
 * Sizes:     sm | md
 *
 * Optionally renders a leading dot indicator.
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ─── VARIANT DEFINITIONS ───────────────────────────────────── */
const badgeVariants = cva(
  // Base
  [
    'inline-flex items-center gap-1.5',
    'font-[var(--font-jetbrains-mono)] font-medium',
    'border select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default:   'bg-[var(--color-surface)]   text-[var(--color-text-secondary)] border-[var(--color-border)]',
        primary:   'bg-[var(--color-primary-muted)]   text-[var(--color-primary)]   border-[var(--color-primary-muted)]',
        secondary: 'bg-[var(--color-secondary-muted)] text-[var(--color-secondary)] border-[var(--color-secondary-muted)]',
        accent:    'bg-[var(--color-accent-muted)]    text-[var(--color-accent)]    border-[var(--color-accent-muted)]',
        success:   'bg-[var(--color-success-muted)]   text-[var(--color-success)]   border-[var(--color-success-muted)]',
        warning:   'bg-[var(--color-warning-muted)]   text-[var(--color-warning)]   border-[var(--color-warning-muted)]',
        danger:    'bg-[var(--color-danger-muted)]    text-[var(--color-danger)]    border-[var(--color-danger-muted)]',
        outline:   'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)]',
      },
      size: {
        sm: 'text-[10px] leading-none px-2   py-1   rounded-[var(--radius-sm)]',
        md: 'text-xs     leading-none px-2.5 py-1.5 rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size:    'md',
    },
  }
)

/* ─── COMPONENT TYPES ───────────────────────────────────────── */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * When true, renders a pulsing dot indicator before the label.
   * Useful for "live" or "active" status badges.
   */
  dot?: boolean
}

/* ─── COMPONENT ─────────────────────────────────────────────── */
function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="relative flex h-1.5 w-1.5 shrink-0"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
