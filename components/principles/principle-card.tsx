'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Principle } from './principles-data'

interface PrincipleCardProps {
  principle: Principle
  index: number
}

export function PrincipleCard({ principle, index }: PrincipleCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Reveal animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
        delay: shouldReduceMotion ? 0 : index * 0.08,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      tabIndex={0}
      role="article"
      aria-label={`Principle ${principle.number}: ${principle.title}`}
      className={[
        // Glassmorphic styling with structured margins and paddings
        'relative flex flex-col gap-6 p-8 rounded-[var(--radius-xl)]',
        'border border-[var(--color-border-subtle)] bg-[hsl(222,14%,11%,0.3)] backdrop-blur-md',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]',
        'transition-all duration-300 ease-[var(--ease-out)]',
        // Hover: lift card slightly, deepen shadows, and light up borders
        'hover:-translate-y-1.5 hover:border-[var(--color-border-strong)] hover:bg-[hsl(222,14%,11%,0.5)]',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]',
      ].join(' ')}
    >
      {/* Large index number with mono font */}
      <div className="flex items-baseline justify-between select-none">
        <span className="font-mono text-3xl font-bold text-[var(--color-primary-hover)] opacity-95">
          {principle.number}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-60" />
      </div>

      {/* Subtle Divider line */}
      <div className="h-[1px] w-12 bg-gradient-to-r from-[var(--color-primary)] to-transparent opacity-40" aria-hidden="true" />

      {/* Title & Description */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg sm:text-xl font-bold font-[var(--font-heading)] text-[var(--color-text)] tracking-tight">
          {principle.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {principle.description}
        </p>
      </div>
    </motion.div>
  )
}
export default PrincipleCard
