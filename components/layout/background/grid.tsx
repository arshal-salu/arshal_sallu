/**
 * components/layout/background/grid.tsx
 *
 * Ultra-subtle dot/line grid overlay. Rendered as a Server
 * Component using a CSS background-image pattern — zero JS,
 * zero runtime cost.
 *
 * The grid uses a radial-gradient mask so it fades out toward
 * the edges, preventing a harsh boundary.
 */
export function Grid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    >
      {/* Dot grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          backgroundImage: `radial-gradient(
            circle,
            hsl(210 30% 80% / 0.08) 1px,
            transparent 1px
          )`,
          backgroundSize: '32px 32px',
          /* Fade the grid toward the edges */
          maskImage: `radial-gradient(
            ellipse 80% 80% at 50% 50%,
            black 30%,
            transparent 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            ellipse 80% 80% at 50% 50%,
            black 30%,
            transparent 100%
          )`,
        }}
      />
    </div>
  )
}
