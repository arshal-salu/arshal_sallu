'use client'

/**
 * components/hero/scroll-indicator.tsx
 *
 * Minimal scroll indicator shown below the hero CTA buttons.
 * Renders a vertical line with an animated dot travelling down it.
 *
 * Fades out when the user scrolls past 80px so it doesn't compete
 * with subsequent sections.
 *
 * Respects prefers-reduced-motion — dot freezes mid-path.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion }     from 'framer-motion'

export function ScrollIndicator() {
  const [visible, setVisible]       = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-1.5 pt-2"
    >
      {/* Label */}
      <span
        className="font-[var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]"
      >
        scroll
      </span>

      {/* Vertical track + travelling dot */}
      <div className="relative h-10 w-px overflow-hidden bg-[var(--color-border)]">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full bg-[var(--color-primary)]"
          style={{ height: '40%' }}
          animate={shouldReduce ? {} : { y: ['-100%', '250%'] }}
          transition={{
            duration:   1.6,
            ease:       'easeInOut',
            repeat:     Infinity,
            repeatType: 'loop',
            repeatDelay: 0.4,
          }}
        />
      </div>
    </motion.div>
  )
}
