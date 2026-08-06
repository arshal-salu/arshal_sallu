/**
 * components/ui/Container.tsx
 *
 * Responsive max-width container with configurable width and padding.
 * Uses CSS custom property values from the design system.
 *
 * Size options map directly to --container-* tokens:
 *   sm → 640px  |  md → 768px  |  lg → 1024px
 *   xl → 1280px |  2xl → 1400px (default)
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ─── VARIANT DEFINITIONS ───────────────────────────────────── */
const containerVariants = cva(
  // Base: horizontally centred, full-width, responsive horizontal padding
  'w-full mx-auto px-[var(--container-pad)]',
  {
    variants: {
      size: {
        sm:  'max-w-[var(--container-sm)]',
        md:  'max-w-[var(--container-md)]',
        lg:  'max-w-[var(--container-lg)]',
        xl:  'max-w-[var(--container-xl)]',
        '2xl': 'max-w-[var(--container-2xl)]',
        full:  'max-w-none',
      },
    },
    defaultVariants: {
      size: '2xl',
    },
  }
)

/* ─── COMPONENT TYPES ───────────────────────────────────────── */
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** Render as a semantic HTML element instead of `div`. */
  as?: React.ElementType
}

/* ─── COMPONENT ─────────────────────────────────────────────── */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Tag = 'div', children, ...props }, ref) => {
    return React.createElement(
      Tag,
      {
        ref,
        className: cn(containerVariants({ size }), className),
        ...props,
      },
      children,
    )
  }
)

Container.displayName = 'Container'

export { Container, containerVariants }
