/**
 * components/ui/Button.tsx
 *
 * Production-ready Button component.
 *
 * Variants:   primary | secondary | outline | ghost | danger
 * Sizes:      sm | md | lg | icon
 *
 * Built with:
 *  - class-variance-authority (CVA) for variant logic
 *  - clsx + tailwind-merge via `cn` for className merging
 *  - Polymorphic `as` prop — renders as any element (<a>, <div>, etc.)
 *  - Accessible: aria-*, disabled state, loading spinner
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ─── VARIANT DEFINITIONS ───────────────────────────────────── */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium leading-none whitespace-nowrap',
    'select-none cursor-pointer',
    'border border-transparent',
    'transition-all duration-[var(--duration-default)] ease-[var(--ease-default)]',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-white text-black',
          'hover:bg-neutral-200',
          'shadow-[0_4px_16px_rgba(255,255,255,0.12)]',
        ],
        secondary: [
          'bg-[var(--color-secondary)] text-white',
          'hover:bg-[var(--color-secondary-hover)]',
        ],
        outline: [
          'border-[var(--color-border)] bg-transparent text-[var(--color-text)]',
          'hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]',
        ],
        ghost: [
          'bg-transparent text-[var(--color-text-secondary)]',
          'hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]',
        ],
        danger: [
          'bg-[var(--color-danger)] text-white',
          'hover:opacity-90',
          'shadow-[0_0_16px_var(--color-danger-muted)]',
        ],
      },
      size: {
        sm:   'h-8  px-3    text-xs    rounded-[var(--radius-md)]',
        md:   'h-10 px-4    text-sm    rounded-[var(--radius-lg)]',
        lg:   'h-12 px-6    text-base  rounded-[var(--radius-xl)]',
        icon: 'h-10 w-10   text-sm    rounded-[var(--radius-lg)] p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

/* ─── COMPONENT TYPES ───────────────────────────────────────── */

/**
 * ButtonProps uses a two-overload strategy:
 *   • Default: standard <button> with all its native HTML attributes.
 *   • With `as`: accepts any element type and its corresponding attrs
 *     via a loose intersection — this avoids breaking forwardRef generics.
 *
 * The `[key: string]: unknown` index signature is intentionally NOT used
 * here because it breaks React.forwardRef<HTMLButtonElement> inference.
 * Instead, callers using `as="a"` are expected to provide href etc.
 * directly — TypeScript may show a mild warning on unknown keys, which
 * is acceptable for a polymorphic component without full generic inference.
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  /** Render as a different HTML element (e.g. "a"). */
  as?:        React.ElementType
  children?:  React.ReactNode
  /** Renders a loading spinner and disables interaction when true. */
  isLoading?: boolean
  /** Icon placed before the button label. */
  leftIcon?:  React.ReactNode
  /** Icon placed after the button label. */
  rightIcon?: React.ReactNode
  // Allow anchor props and any other pass-through attrs when using `as`
  href?:    string
  target?:  string
  rel?:     string
  download?: string | boolean
}

/* ─── COMPONENT ─────────────────────────────────────────────── */
function Button({
  className,
  variant,
  size,
  as,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  href,
  target,
  rel,
  download,
  ...rest
}: ButtonProps) {
  const tag    = as ?? 'button'
  const isBtn  = tag === 'button'

  const innerContent = isLoading
    ? React.createElement('span', {
        'aria-hidden': true,
        className: 'h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent',
      })
    : [leftIcon, children, rightIcon]

  return React.createElement(
    tag,
    {
      className: cn(buttonVariants({ variant, size }), className),
      disabled:  isBtn ? (disabled ?? isLoading) : undefined,
      'aria-busy': isLoading || undefined,
      href,
      target,
      rel,
      download,
      ...rest,
    },
    ...(Array.isArray(innerContent) ? innerContent : [innerContent]),
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants }
