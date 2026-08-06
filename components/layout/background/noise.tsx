/**
 * components/layout/background/noise.tsx
 *
 * Animated SVG turbulence noise texture — creates a subtle film-grain
 * organic depth to the background. Uses an SVG filter applied to a
 * `<div>` so it runs entirely in CSS/SVG with no JS overhead.
 *
 * Opacity is kept extremely low (0.035) to remain almost imperceptible.
 * The animation cycles through phase values to create the "animated"
 * grain effect.
 *
 * Respects prefers-reduced-motion by pausing the SVG animation.
 */
export function Noise() {
  return (
    <>
      {/* Inject the keyframe pause for reduced-motion users */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .noise-filter feDisplacementMap,
          .noise-filter feTurbulence {
            animateTransform { display: none; }
          }
          .noise-layer { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0 }}
      >
        {/* SVG filter definition — invisible, purely functional */}
        <svg
          className="noise-filter"
          style={{ position: 'absolute', width: 0, height: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="noise"
                result="grayNoise"
              />
              <feBlend
                in="SourceGraphic"
                in2="grayNoise"
                mode="overlay"
                result="blended"
              />
              <feComposite in="blended" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>

        {/* The actual noise layer — applies the SVG filter */}
        <div
          className="noise-layer"
          style={{
            position:        'absolute',
            inset:           0,
            opacity:         0.035,
            filter:          'url(#noise-filter)',
            background:      'hsl(210 20% 60%)',
            willChange:      'opacity',
          }}
        />
      </div>
    </>
  )
}
