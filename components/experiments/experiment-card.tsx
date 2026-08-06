'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Beaker, ArrowRight } from 'lucide-react'
import { Experiment } from '@/lib/experiments'
import { StatusBadge } from './status-badge'

interface ExperimentCardProps {
  experiment: Experiment
  index: number
}

export function ExperimentCard({ experiment, index }: ExperimentCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Reveal animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
      aria-label={`AI Lab Experiment: ${experiment.title}`}
      className={[
        // High-end glass card with subtle border and strong hover transitions
        'relative flex flex-col gap-6 p-6 sm:p-8 rounded-[var(--radius-xl)]',
        'border border-[var(--color-border-subtle)] bg-[hsl(222,14%,11%,0.4)] backdrop-blur-md',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]',
        'transition-all duration-300 ease-[var(--ease-out)]',
        // Hover: lift container, soft shadow, subtle border highlight
        'hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[hsl(222,14%,11%,0.6)]',
        'hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]',
      ].join(' ')}
    >
      {/* Decorative ambient corner glow */}
      <div 
        aria-hidden="true" 
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-[var(--color-primary)] blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity duration-300" 
      />

      {/* Card Header (Category & Status) */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
          {experiment.category}
        </span>
        <StatusBadge status={experiment.status} />
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base sm:text-lg font-bold font-[var(--font-heading)] text-[var(--color-text)] tracking-tight">
          {experiment.title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {experiment.description}
        </p>
      </div>

      {/* Planned Features / Exploration Vectors */}
      <div className="flex flex-col gap-3 py-4 border-y border-[var(--color-border-subtle)]">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary)] select-none">
          <Beaker className="w-3.5 h-3.5 animate-pulse" />
          <span>Currently Exploring</span>
        </span>
        <ul className="flex flex-col gap-2 font-mono text-[11px] text-[var(--color-text-secondary)]" role="list">
          {experiment.plannedFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5" role="listitem">
              <ArrowRight className="w-3 h-3 text-[var(--color-muted)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies Chips */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {experiment.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[10px] font-mono rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
export default ExperimentCard
