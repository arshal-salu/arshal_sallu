import React from 'react'
import { ExperimentStatus } from '@/lib/experiments'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: ExperimentStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // Map statuses to semantic design token colors
  const statusStyles: Record<
    ExperimentStatus,
    {
      badgeClass: string
      dotClass: string
    }
  > = {
    Building: {
      badgeClass: 'bg-[var(--color-primary-muted)] text-[var(--color-primary)] border-[var(--color-primary-muted)]',
      dotClass: 'bg-[var(--color-primary)]',
    },
    Prototype: {
      badgeClass: 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] border-[var(--color-accent-muted)]',
      dotClass: 'bg-[var(--color-accent)]',
    },
    Research: {
      badgeClass: 'bg-[var(--color-secondary-muted)] text-[var(--color-secondary)] border-[var(--color-secondary-muted)]',
      dotClass: 'bg-[var(--color-secondary)]',
    },
    Planning: {
      badgeClass: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)] border-[var(--color-warning-muted)]',
      dotClass: 'bg-[var(--color-warning)]',
    },
  }

  const activeStyle = statusStyles[status] || statusStyles.Planning

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-medium rounded-[var(--radius-sm)] border select-none',
        activeStyle.badgeClass,
        className
      )}
    >
      {/* Animated Ping Dot Indicator */}
      <span className="relative flex h-1.5 w-1.5">
        <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-60', activeStyle.dotClass)} />
        <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', activeStyle.dotClass)} />
      </span>
      <span>{status}</span>
    </span>
  )
}
export default StatusBadge
