/**
 * components/ui/Section.tsx
 *
 * Full-width page section wrapper.
 *
 * Applies consistent vertical rhythm via `--space-section`,
 * supports background variants, and renders semantic <section>
 * or any other HTML element via the `as` prop.
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ─── VARIANT DEFINITIONS ───────────────────────────────────── */
const sectionVariants = cva(
  // Base: full-width, consistent vertical padding
  'w-full py-[var(--space-section)] relative',
  {
    variants: {
      background: {
        /** Transparent — inherits page background. */
        none: '',
        /** Slightly elevated surface colour. */
        surface: 'bg-[var(--color-surface)]',
        /** Card-level elevation. */
        card: 'bg-[var(--color-card)]',
        /** Subtle primary tint for featured sections. */
        primary: 'bg-[var(--color-primary-muted)]',
        /** Subtle accent tint. */
        accent: 'bg-[var(--color-accent-muted)]',
      },
    },
    defaultVariants: {
      background: 'none',
    },
  }
)

/* ─── COMPONENT TYPES ───────────────────────────────────────── */
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Render as a semantic HTML element. Defaults to `section`. */
  as?: React.ElementType
}

/* ─── COMPONENT ─────────────────────────────────────────────── */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background, as: Tag = 'section', children, ...props }, ref) => {
    return React.createElement(
      Tag,
      {
        ref,
        className: cn(sectionVariants({ background }), className),
        ...props,
      },
      children,
    )
  }
)

Section.displayName = 'Section'

export { Section, sectionVariants }
