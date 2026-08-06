'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { JourneyMilestone } from './journey-data'

interface JourneyItemProps {
  milestone: JourneyMilestone
  index: number
}

export function JourneyItem({ milestone, index }: JourneyItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -15% 0px' })

  const isLeft = index % 2 === 0
  const isNext = milestone.year.toLowerCase() === 'next'

  // Entry animation configurations
  const textVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isLeft ? -24 : 24), y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 140,
        damping: 15,
        delay: 0.1,
      },
    },
  }

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center min-h-[140px] py-8 lg:py-12"
      role="listitem"
    >
      {/* Central Timeline Dot Marker (Desktop layout centered, Mobile layout absolute left) */}
      <div 
        className="absolute left-4 lg:left-1/2 top-10 lg:top-1/2 -translate-y-1/2 lg:-translate-x-1/2 flex items-center justify-center w-8 h-8 z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={[
            'w-4 h-4 rounded-full border-2 transition-colors duration-300',
            isNext
              ? 'bg-[var(--color-background)] border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
              : 'bg-white border-[var(--color-background)] shadow-[0_0_8px_rgba(255,255,255,0.2)]',
          ].join(' ')}
        />
      </div>

      {/* Alternating Card Detail Layout */}
      {/* 
        On desktop, the card occupies the left or right column depending on the alternating index.
        On mobile, the card is always pushed to the right, shifted to make space for the left timeline line.
      */}
      <div
        className={[
          'col-span-1 pl-12 lg:pl-0 flex flex-col',
          // Desktop positioning
          isLeft ? 'lg:col-start-1 lg:items-end lg:text-right' : 'lg:col-start-2 lg:items-start lg:text-left',
        ].join(' ')}
      >
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          tabIndex={0}
          className={[
            'flex flex-col gap-3 max-w-[480px] p-6 rounded-[var(--radius-lg)]',
            'border border-[var(--color-border-subtle)] bg-[hsl(222,14%,11%,0.2)] backdrop-blur-md',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]',
            'transition-colors duration-300 hover:bg-[hsl(222,14%,11%,0.3)] hover:border-[var(--color-border-strong)]',
          ].join(' ')}
        >


          {/* Heading & Paragraph */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base sm:text-lg font-bold font-[var(--font-heading)] text-[var(--color-text)] tracking-tight">
              {milestone.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default JourneyItem
