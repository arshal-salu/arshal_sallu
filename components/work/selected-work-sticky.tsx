'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useReducedMotion, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Project } from '@/lib/projects'
import { BrowserFrame } from './browser-frame'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { GithubIcon } from '@/components/ui/icons'

interface SelectedWorkStickyProps {
  projects: Project[]
}

export function SelectedWorkSticky({ projects }: SelectedWorkStickyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Stable hysteresis scroll thresholds to prevent boundary flickering
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let newIndex = activeIndex
    if (activeIndex === 0) {
      if (latest >= 0.26) newIndex = 1
    } else if (activeIndex === 1) {
      if (latest < 0.24) newIndex = 0
      else if (latest >= 0.51) newIndex = 2
    } else if (activeIndex === 2) {
      if (latest < 0.49) newIndex = 1
      else if (latest >= 0.76) newIndex = 3
    } else if (activeIndex === 3) {
      if (latest < 0.74) newIndex = 2
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  })

  const activeProject = projects[activeIndex]

  return (
    <div
      ref={containerRef}
      data-work-container="true"
      className="relative w-full h-[400vh]"
    >

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        <Container size="2xl" className="relative h-full flex flex-col justify-center py-6 sm:py-8 lg:py-12">

          {/* Title block - Static layout flow to prevent overlaps */}
          <div className="flex flex-col gap-1 sm:gap-2 max-w-xl mb-4 sm:mb-6 lg:mb-8">
            <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Case Studies
            </span>
            <h2
              id="work-heading"
              className="font-[var(--font-heading)] font-bold leading-tight tracking-[-0.04em] flex flex-row items-baseline gap-2 text-left text-[clamp(1.75rem,3.5vw,2.75rem)]"
            >
              <span className="text-white">
                Selected
              </span>
              <span
                style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
              >
                Work
              </span>
            </h2>
          </div>

          {/* Main Grid: Visual content and anchored frame */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center min-h-[55vh] lg:min-h-[60vh] py-4 relative">

            {/* Left Column: Content Canvas */}
            <div className="col-span-1 lg:col-span-4 relative flex flex-col justify-center py-4">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98, y: 30, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.98, y: -30, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center"
                >
                  {/* Project Header Info */}
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em]">
                      <span className="font-bold text-white">
                        0{activeIndex + 1}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}>
                        {activeProject.category}
                      </span>
                    </div>
                    <h3 className="font-bold tracking-tight text-[var(--color-text)] leading-tight text-xl sm:text-2xl lg:text-3xl">
                      {activeProject.title}
                    </h3>
                     <p className="text-sm sm:text-base lg:text-[1.0625rem] text-[var(--color-text-secondary)] leading-relaxed max-w-[540px]">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Details - Engineering Challenge (Top) & Solution (Bottom) */}
                  <div className="flex flex-col gap-4 sm:gap-5 py-5 border-y border-[var(--color-border-subtle)]">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white">
                        Engineering Challenge
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {activeProject.challenge}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white">
                        Solution
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs font-mono rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-neutral-400 hover:text-[var(--color-text)] hover:shadow-[0_0_12px_rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-all duration-300 select-none"
                          tabIndex={0}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button
                      as="a"
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 border-neutral-800 bg-white/[0.02] cursor-pointer hover:text-white hover:border-neutral-500 hover:bg-white/5 active:scale-[0.98] transition-all duration-300"
                    >
                      Live Demo
                    </Button>
                    <Button
                      as="a"
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      leftIcon={<GithubIcon className="w-3.5 h-3.5" />}
                      className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 border-neutral-800 bg-white/[0.02] cursor-pointer hover:text-white hover:border-neutral-500 hover:bg-white/5 active:scale-[0.98] transition-all duration-300"
                    >
                      GitHub
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Anchored Browser frame (Visually anchored, only image transitions) */}
            <div className="col-span-1 lg:col-span-8 relative flex items-center justify-center w-full max-w-[600px] lg:max-w-none mx-auto lg:mx-0">
              <BrowserFrame
                src={activeProject.image}
                alt={`${activeProject.title} Case Study Preview`}
                url={activeProject.demo}
                className="relative z-10 w-full"
              />
            </div>

          </div>
        </Container>
      </div>
    </div>
  )
}
export default SelectedWorkSticky
