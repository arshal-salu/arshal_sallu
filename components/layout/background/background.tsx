/**
 * components/layout/background/background.tsx
 *
 * Orchestrates all background layers into a single composited
 * fixed-position canvas behind all page content.
 *
 * Layer order (bottom → top):
 *   1. Deep base colour (via body CSS)
 *   2. Radial gradients        [Gradients]  — Server Component
 *   3. Dot grid overlay        [Grid]       — Server Component
 *   4. Film-grain noise        [Noise]      — Server Component
 *   5. Cursor spotlight        [Spotlight]  — Client Component
 *   6. Edge vignette           (CSS only)   — inline style
 *
 * This component itself is a Server Component — only Spotlight
 * crosses the client boundary.
 */
import { Gradients } from './gradients'
import { Grid } from './grid'
import { Noise } from './noise'
import { Spotlight } from './spotlight'

export function Background() {
  return (
    <>
      {/* Layers 2–4: pure CSS / SVG, Server Components */}
      <Gradients />
      <Grid />
      <Noise />

      {/* Layer 5: cursor-driven spotlight, Client Component */}
      <Spotlight />

      {/* Layer 6: radial vignette around viewport edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background: `radial-gradient(
            ellipse 100% 100% at 50% 50%,
            transparent 50%,
            hsl(0 0% 0% / 0.6) 100%
          )`,
        }}
      />
    </>
  )
}
