/**
 * components/hero/index.ts
 *
 * Barrel export for hero section components.
 *
 * NeuralNetwork is intentionally NOT re-exported here because it is
 * always dynamically imported with ssr:false inside hero-section.tsx.
 * Re-exporting it could cause Next.js to attempt server-side evaluation.
 *
 * @example
 * import { HeroSection } from '@/components/hero'
 */
export { HeroSection }      from './hero-section'
export { ScrollIndicator }  from './scroll-indicator'
export { ScrambleText }     from './scramble-text'
