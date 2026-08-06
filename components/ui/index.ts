/**
 * components/ui/index.ts
 *
 * Barrel export for all UI primitives.
 * Import from '@/components/ui' instead of individual files.
 *
 * @example
 * import { Button, Badge, Heading } from '@/components/ui'
 */
export { Button, buttonVariants }   from './Button'
export type { ButtonProps }         from './Button'

export { Container, containerVariants } from './Container'
export type { ContainerProps }          from './Container'

export { Section, sectionVariants } from './Section'
export type { SectionProps }        from './Section'

export { Badge, badgeVariants }     from './Badge'
export type { BadgeProps }          from './Badge'

export { Heading, headingVariants } from './Heading'
export type { HeadingProps }        from './Heading'
