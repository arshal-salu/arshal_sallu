'use client'

import React, { useState } from 'react'
import { motion, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion'

interface ProjectProgressIndicatorProps {
  scrollYProgress: MotionValue<number>
  total: number
}

export function ProjectProgressIndicator({ scrollYProgress, total }: ProjectProgressIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Track the active index via scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveIndex(0)
    } else if (latest < 0.50) {
      setActiveIndex(1)
    } else if (latest < 0.75) {
      setActiveIndex(2)
    } else {
      setActiveIndex(3)
    }
  })

  // Dynamic segment line height progress values
  const lineProgress0 = useTransform(scrollYProgress, [0.10, 0.29], [0, 1])
  const lineProgress1 = useTransform(scrollYProgress, [0.35, 0.54], [0, 1])
  const lineProgress2 = useTransform(scrollYProgress, [0.60, 0.79], [0, 1])

  const handleScrollToProject = (index: number) => {
    const scrollContainer = document.querySelector('[data-work-container]')
    if (!scrollContainer) return

    const rect = scrollContainer.getBoundingClientRect()
    const containerHeight = rect.height
    const windowHeight = window.innerHeight

    // Targets corresponding to the midpoints of each project's visibility zone
    const progressTargets = [0, 0.375, 0.625, 0.90]
    const targetScrollY = window.scrollY + rect.top + (progressTargets[index] * (containerHeight - windowHeight))

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className="hidden lg:flex fixed left-8 xl:left-12 top-1/2 -translate-y-1/2 flex-col items-center z-[var(--z-sticky)] select-none pointer-events-auto"
      role="navigation"
      aria-label="Selected Work Navigation"
    >
      <div className="flex flex-col items-center gap-1">
        {Array.from({ length: total }).map((_, idx) => {
          const isCurrent = idx === activeIndex
          const isCompleted = idx <= activeIndex
          const isLast = idx === total - 1
          const labelNumber = `0${idx + 1}`

          // Select the scroll-linked scaleY transform for each vertical connection segment
          let scaleYVal: any = 0
          if (idx === 0) scaleYVal = lineProgress0
          else if (idx === 1) scaleYVal = lineProgress1
          else if (idx === 2) scaleYVal = lineProgress2

          return (
            <React.Fragment key={idx}>
              {/* Indicator Item Button */}
              <button
                onClick={() => handleScrollToProject(idx)}
                className="group flex flex-col items-center relative focus-visible:outline-none py-1"
                aria-label={`Scroll to project ${idx + 1}`}
                aria-current={isCurrent ? 'true' : 'false'}
              >
                {/* Visual Number Label */}
                <motion.span
                  animate={{
                    scale: isCurrent ? 1.25 : 1.0,
                    color: isCurrent
                      ? 'var(--color-primary)'
                      : isCompleted
                      ? 'var(--color-text)'
                      : 'var(--color-muted)',
                    opacity: isCurrent ? 1 : isCompleted ? 0.9 : 0.35
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="font-mono text-xs tracking-wider font-bold"
                >
                  {labelNumber}
                </motion.span>
              </button>

              {/* Connecting vertical line segment */}
              {!isLast && (
                <div className="w-[1.5px] h-10 bg-[var(--color-border-subtle)] relative my-1">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-[var(--color-primary)] origin-top"
                    style={{ scaleY: scaleYVal }}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
export default ProjectProgressIndicator
