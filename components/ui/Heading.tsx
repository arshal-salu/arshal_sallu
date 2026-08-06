/**
 * components/ui/Heading.tsx
 *
 * Semantic heading component with typographic scale control.
 *
 * The `level` prop controls the rendered HTML element (h1–h6)
 * and the `size` prop controls the visual size independently,
 * giving full semantic + visual flexibility.
 *
 * Optionally renders a gradient text highlight and a decorative
 * label above the heading for section eyebrows.
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ─── TYPE DEFINITIONS ──────────────────────────────────────── */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingTag   = `h${HeadingLevel}`

/* ─── VARIANT DEFINITIONS ───────────────────────────────────── */
const headingVariants = cva(
  // Base: always use heading font, tight tracking
  [
    'font-[var(--font-geist)] text-[var(--color-text)]',
    'leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]',
  ],
  {
    variants: {
      size: {
        xs:  'text-[var(--font-size-lg)]',
        sm:  'text-[var(--font-size-2xl)]',
        md:  'text-[var(--font-size-3xl)]',
        lg:  'text-[var(--font-size-4xl)] md:text-[var(--font-size-5xl)]',
        xl:  'text-[var(--font-size-5xl)] md:text-[var(--font-size-6xl)]',
        '2xl': 'text-[var(--font-size-6xl)] md:text-[var(--font-size-7xl)]',
      },
      weight: {
        normal:   'font-normal',
        medium:   'font-medium',
        semibold: 'font-semibold',
        bold:     'font-bold',
        extrabold:'font-extrabold',
      },
    },
    defaultVariants: {
      size:   'lg',
      weight: 'bold',
    },
  }
)

/* ─── COMPONENT TYPES ───────────────────────────────────────── */
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The semantic heading level (h1–h6).
   * Controls the rendered HTML element.
   * @default 2
   */
  level?: HeadingLevel
  /**
   * Optional eyebrow label rendered above the heading.
   * Styled in JetBrains Mono with accent colour.
   */
  eyebrow?: string
  /**
   * When true, applies a brand gradient (primary → accent) to the text.
   */
  gradient?: boolean
}

/* ─── GRADIENT STYLE ────────────────────────────────────────── */
const gradientClass = [
  'bg-gradient-to-r',
  'from-[var(--color-primary)]',
  'via-[var(--color-secondary)]',
  'to-[var(--color-accent)]',
  'bg-clip-text text-transparent',
].join(' ')

/* ─── COMPONENT ─────────────────────────────────────────────── */
function Heading({
  className,
  size,
  weight,
  level = 2,
  eyebrow,
  gradient = false,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as HeadingTag

  return (
    <div className="flex flex-col gap-2">
      {eyebrow && (
        <p
          aria-hidden="true"
          className={[
            'font-[var(--font-jetbrains-mono)] text-[var(--font-size-xs)]',
            'text-[var(--color-accent)] tracking-[var(--letter-spacing-wider)] uppercase',
          ].join(' ')}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          headingVariants({ size, weight }),
          gradient && gradientClass,
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    </div>
  )
}

export { Heading, headingVariants }
