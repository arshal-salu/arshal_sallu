'use client'

/**
 * components/hero/scroll-indicator.tsx
 *
 * Minimal, premium scroll indicator positioned at the base of the hero section.
 * Features an interactive click-to-scroll action to navigate to the about section,
 * an animated pulse/dot indicator, and smooth fade-out on window scroll.
 *
 * Respects prefers-reduced-motion.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SECTION_IDS } from '@/constants'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 60)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollDown = () => {
    const nextSection = document.getElementById(SECTION_IDS.about)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleScrollDown}
      aria-label="Scroll to about section"
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 15,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="group absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full p-2"
    >
      {/* Monospace label */}
      <span className="font-[var(--font-jetbrains-mono)] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors duration-300">
        scroll
      </span>

      {/* Pill Capsule with sliding dot */}
      <div className="relative w-5 h-8 sm:w-5 sm:h-9 rounded-full border border-neutral-700/80 bg-neutral-950/40 backdrop-blur-xs flex justify-center p-1 group-hover:border-neutral-500 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <motion.div
          className="w-1 h-2 sm:w-1 sm:h-2.5 rounded-full bg-neutral-300 group-hover:bg-white transition-colors duration-300"
          animate={
            shouldReduce
              ? {}
              : {
                  y: [0, 12, 0],
                  opacity: [0.9, 0.2, 0.9],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Subtle chevron arrow */}
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-500 group-hover:text-white transition-colors duration-300"
        animate={
          shouldReduce
            ? {}
            : {
                y: [0, 3, 0],
              }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.button>
  )
}
