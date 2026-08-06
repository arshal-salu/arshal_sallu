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
      style={{ zIndex: 0 }}
    >
      {/* Primary gradient — top-left, brand indigo */}
      <div
        style={{
          position:        'absolute',
          top:             '-20%',
          left:            '-15%',
          width:           '60vw',
          height:          '60vw',
          maxWidth:        '800px',
          maxHeight:       '800px',
          borderRadius:    '50%',
          background:      'radial-gradient(ellipse at center, hsl(224 83% 63% / 0.07) 0%, transparent 70%)',
          filter:          'blur(60px)',
          willChange:      'transform',
        }}
      />

      {/* Secondary gradient — bottom-right, brand indigo */}
      <div
        style={{
          position:        'absolute',
          bottom:          '-20%',
          right:           '-15%',
          width:           '50vw',
          height:          '50vw',
          maxWidth:        '700px',
          maxHeight:       '700px',
          borderRadius:    '50%',
          background:      'radial-gradient(ellipse at center, hsl(224 83% 63% / 0.06) 0%, transparent 70%)',
          filter:          'blur(60px)',
          willChange:      'transform',
        }}
      />

      {/* Tertiary gradient — center, very faint brand indigo warmth */}
      <div
        style={{
          position:        'absolute',
          top:             '35%',
          left:            '40%',
          width:           '40vw',
          height:          '40vw',
          maxWidth:        '500px',
          maxHeight:       '500px',
          borderRadius:    '50%',
          background:      'radial-gradient(ellipse at center, hsl(224 83% 63% / 0.03) 0%, transparent 70%)',
          filter:          'blur(80px)',
          willChange:      'transform',
        }}
      />
    </div>
  )
}
