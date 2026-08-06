'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Section, Container } from '@/components/ui'
import { journeyMilestones } from './journey-data'
import { JourneyItem } from './journey-item'
import { SECTION_IDS } from '@/constants'

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Smooth out progress updates using spring physics
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  })

  return (
    <Section
      id={SECTION_IDS.journey}
      className="relative w-full border-t border-[var(--color-border-subtle)]"
      aria-labelledby="journey-heading"
    >
      {/* Subtle ambient blur spots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[15%] top-[20%] h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute -left-[15%] bottom-[20%] h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <Container size="2xl">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 lg:mb-16 max-w-2xl">
          <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
            My Story
          </span>
          <h2
            id="journey-heading"
            className="font-[var(--font-heading)] font-bold leading-tight tracking-[-0.04em] flex flex-row items-baseline gap-2 text-left text-4xl sm:text-5xl lg:text-6xl"
          >
            <span className="text-white">
              Learning
            </span>
            <span
              style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
            >
              Journey.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mt-2">
            The milestones that shaped how I learn, build, and think about software.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative flex flex-col pt-4 pb-12">
          
          {/* Central Vertical Track Line (Dashed base layout) */}
          <div 
            aria-hidden="true"
            className="absolute left-[31px] lg:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[var(--color-border-subtle)] via-[var(--color-border)] to-[var(--color-border-subtle)] -translate-x-1/2"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '1px 8px',
            }}
          />

          {/* Dynamic Scroll-driven Progress Fill Line */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute left-[31px] lg:left-1/2 top-4 bottom-4 w-[1px] origin-top -translate-x-1/2"
              style={{ 
                scaleY,
                backgroundColor: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))'
              }}
            />
          )}

          {/* Fallback Static Fill if Reduced Motion is enabled */}
          {shouldReduceMotion && (
            <div
              aria-hidden="true"
              className="absolute left-[31px] lg:left-1/2 top-4 bottom-4 w-[1px] opacity-60 -translate-x-1/2"
              style={{
                backgroundColor: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))'
              }}
            />
          )}

          {/* Journey Milestone Items List */}
          <div className="flex flex-col relative z-20" role="list" aria-label="Journey milestones">
            {journeyMilestones.map((milestone, index) => (
              <JourneyItem
                key={index}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>

        </div>
      </Container>
    </Section>
  )
}
export default JourneySection
