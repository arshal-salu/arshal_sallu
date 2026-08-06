'use client'

/**
 * components/layout/background/spotlight.tsx
 *
 * Mouse-tracking cursor spotlight — a large, very-low-opacity radial
 * light that follows the cursor using requestAnimationFrame for
 * smooth, lag-free interpolation.
 *
 * Design decisions:
 * • Uses lerp (linear interpolation) so movement feels weighted,
 *   not instant — similar to the Linear.app spotlight.
 * • Hidden on touch devices via a CSS class toggled by pointer type.
 * • Completely inert (pointer-events: none) — never interferes with
 *   any clickable element.
 * • Respects prefers-reduced-motion: stops updating position when
 *   the user has requested reduced motion.
 */

import { useEffect, useRef } from 'react'

/** Linear interpolation between two values. */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Smoothing factor — lower = more lag, higher = snappier. */
const LERP_FACTOR = 0.08

export function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Current interpolated position
  const currentX = useRef(0)
  const currentY = useRef(0)
  // Target position (raw mouse coords)
  const targetX  = useRef(0)
  const targetY  = useRef(0)

  const rafId = useRef<number>(0)
  const isVisible = useRef(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY

      if (!isVisible.current && spotlightRef.current) {
        spotlightRef.current.style.opacity = '1'
        isVisible.current = true
      }
    }

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0'
        isVisible.current = false
      }
    }

    const animate = () => {
      if (mediaQuery.matches) {
        // Reduced motion: snap directly, no interpolation
        currentX.current = targetX.current
        currentY.current = targetY.current
      } else {
        currentX.current = lerp(currentX.current, targetX.current, LERP_FACTOR)
        currentY.current = lerp(currentY.current, targetY.current, LERP_FACTOR)
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform =
          `translate(${currentX.current}px, ${currentY.current}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    /*
     * The outer wrapper is hidden on touch devices via the CSS class.
     * We detect touch via the 'hover: none' media feature rather than
     * JS feature detection — more reliable and SSR-safe.
     */
    <div
      aria-hidden="true"
      className="spotlight-wrapper pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <style>{`
        /* Hide spotlight on touch/hover-none devices */
        @media (hover: none) {
          .spotlight-wrapper { display: none !important; }
        }
      `}</style>

      <div
        ref={spotlightRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '600px',
          height:          '600px',
          borderRadius:    '50%',
          background:      'radial-gradient(circle at center, hsl(210 40% 98% / 0.04) 0%, transparent 70%)',
          opacity:         0,
          /* Transition only opacity, transform is handled by rAF */
          transition:      'opacity 0.6s ease',
          pointerEvents:   'none',
          willChange:      'transform, opacity',
        }}
      />
    </div>
  )
}
