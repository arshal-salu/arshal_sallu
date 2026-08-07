'use client'

/**
 * components/layout/background/gradients.tsx
 *
 * Renders two large, soft radial gradients fixed to the viewport.
 * Primary sits top-left, secondary bottom-right.
 * Both use a very low opacity so content always dominates.
 *
 * SERVER BOUNDARY: 'use client' required for CSS custom properties
 * that must resolve on the client side — but this component has
 * zero JS after mount and renders purely via CSS.
 */

export function Gradients() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        background: 'radial-gradient(circle at center, #161618 0%, #000000 100%)',
      }}
    />
  )
}
