/**
 * types/index.ts
 *
 * Shared TypeScript types used across the portfolio.
 * All types are exported from this barrel file.
 */

/** Common props shared by all primitive UI components. */
export interface BaseProps {
  /** Additional class names merged via `cn`. */
  className?: string
}

/** Props for components that may render different HTML elements. */
export interface PolymorphicProps<T extends React.ElementType> extends BaseProps {
  /** The HTML element or React component to render. */
  as?: T
}

/** Icon component signature. */
export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>

/** Navigation item. */
export interface NavItem {
  label: string
  href:  string
  icon?: IconComponent
}

/** Social link. */
export interface SocialLink {
  platform: string
  href:     string
  icon:     IconComponent
}
