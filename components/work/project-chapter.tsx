'use client'

import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ExternalLink, Check, Cpu, Zap, Shield, Database, Sparkles, type LucideIcon } from 'lucide-react'
import { Project } from '@/lib/projects'
import { BrowserFrame } from './browser-frame'
import { Button } from '@/components/ui/Button'
import { GithubIcon } from '@/components/ui/icons'

interface ProjectChapterProps {
  project: Project
  index: number
}

/**
 * Dynamically parses a raw highlight string into a short title and detailed description.
 */
function parseHighlight(text: string) {
  // 1. Try to split at the first comma
  const commaIndex = text.indexOf(',')
  if (commaIndex !== -1) {
    return {
      title: text.substring(0, commaIndex).trim(),
      description: text.substring(commaIndex + 1).trim()
    }
  }

  // 2. Try to split at common prepositions
  const splitWords = [' using ', ' to ', ' for ', ' with ', ' through ']
  for (const word of splitWords) {
    const idx = text.indexOf(word)
    if (idx !== -1) {
      return {
        title: text.substring(0, idx).trim(),
        description: text.substring(idx).trim()
      }
    }
  }

  // 3. Fallback: split at 4th word
  const words = text.split(' ')
  if (words.length > 4) {
    return {
      title: words.slice(0, 4).join(' '),
      description: words.slice(4).join(' ')
    }
  }

  return {
    title: text,
    description: ''
  }
}

/**
 * Maps highlight content to a corresponding technical Lucide icon.
 */
function getHighlightIcon(title: string, index: number): LucideIcon {
  const lower = title.toLowerCase()
  if (lower.includes('database') || lower.includes('schema') || lower.includes('sql') || lower.includes('sanity') || lower.includes('cms')) {
    return Database
  }
  if (lower.includes('auth') || lower.includes('secure') || lower.includes('role')) {
    return Shield
  }
  if (lower.includes('animation') || lower.includes('framer') || lower.includes('svg') || lower.includes('blueprint') || lower.includes('transition')) {
    return Sparkles
  }
  if (lower.includes('performance') || lower.includes('core web') || lower.includes('vitals') || lower.includes('fast') || lower.includes('speed') || lower.includes('latency')) {
    return Zap
  }
  if (lower.includes('headless') || lower.includes('architecture') || lower.includes('nitro') || lower.includes('route') || lower.includes('static')) {
    return Cpu
  }
  
  const fallbacks = [Cpu, Sparkles, Zap]
  return fallbacks[index % fallbacks.length]
}

export function ProjectChapter({ project, index }: ProjectChapterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Track progress of this specific chapter relative to viewport scroll bounds
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Parallax translation: subtle move between -18px and 18px (36px total range)
  const yParallax = useTransform(scrollYProgress, [0, 1], [18, -18])
  
  // Fade out outgoing/incoming items slightly when scrolling past
  const opacityParallax = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.65, 1, 1, 0.65])

  // Resolve values based on reduced-motion preference
  const yTranslate = shouldReduceMotion ? 0 : yParallax
  const opacityVal = shouldReduceMotion ? 1 : opacityParallax

  const isImageRight = index % 2 === 0

  // Stagger reveal animations on scroll-in
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  }

  // Pre-parse highlight strings into structured feature card objects
  const parsedHighlights = useMemo(() => {
    return project.highlights.map((highlight, idx) => {
      const parsed = parseHighlight(highlight)
      const Icon = getHighlightIcon(parsed.title, idx)
      return {
        ...parsed,
        icon: Icon
      }
    })
  }, [project.highlights])

  return (
    <motion.div
      ref={ref}
      style={{ opacity: opacityVal }}
      data-project-index={index}
      className="min-h-dvh flex items-center py-20 lg:py-36 border-b border-[var(--color-border-subtle)] last:border-0"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Project Content Column */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20% 0px -25% 0px' }}
          className={`col-span-1 lg:col-span-4 flex flex-col gap-8 ${
            isImageRight ? 'lg:order-first' : 'lg:order-last'
          }`}
        >
          {/* Category & Project Name */}
          <div className="flex flex-col gap-4">
            <motion.div variants={fadeUpVariants}>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em]">
                <span className="font-bold text-white">
                  0{index + 1}
                </span>
                <span className="text-neutral-600">•</span>
                <span style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}>
                  {project.category}
                </span>
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <h3 className="font-bold tracking-tight text-[var(--color-text)] leading-tight text-xl sm:text-2xl lg:text-3xl">
                {project.title}
              </h3>
            </motion.div>
            <motion.p 
              variants={fadeUpVariants} 
              className="text-base sm:text-[1.0625rem] text-[var(--color-text-secondary)] leading-relaxed max-w-[540px]"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Details Overview */}
          <motion.div 
            variants={fadeUpVariants} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-[var(--color-border-subtle)]"
          >
            <div className="w-full">
              <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white mb-2">Engineering Challenge</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.challenge}</p>
            </div>
            <div className="w-full">
              <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white mb-2">Solution</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.solution}</p>
            </div>
          </motion.div>

          {/* Engineering Highlights feature cards */}
          <div className="flex flex-col gap-4">
            <motion.h4 variants={fadeUpVariants} className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white">
              Engineering Highlights
            </motion.h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parsedHighlights.map((hl, idx) => {
                const Icon = hl.icon
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    className="flex gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[hsl(222,14%,8%,0.2)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary-muted)] text-[var(--color-primary)] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-semibold text-[var(--color-text)] leading-tight">
                        {hl.title}
                      </span>
                      {hl.description && (
                        <p className="text-[11px] sm:text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          {hl.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Tech Stack Badges (Premium chips styling) */}
          <div className="flex flex-col gap-3">
            <motion.h4 variants={fadeUpVariants} className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-white">
              Technology Stack
            </motion.h4>
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)] hover:shadow-[0_0_12px_rgba(79,126,247,0.12)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] transition-all duration-300 select-none"
                  tabIndex={0}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              as="a"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 border-neutral-800 bg-white/[0.02] cursor-pointer hover:text-white hover:border-neutral-500 hover:bg-white/5 active:scale-[0.98] transition-all duration-300"
            >
              Live Demo
            </Button>
            <Button
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              leftIcon={<GithubIcon className="w-4 h-4" />}
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 border-neutral-800 bg-white/[0.02] cursor-pointer hover:text-white hover:border-neutral-500 hover:bg-white/5 active:scale-[0.98] transition-all duration-300"
            >
              GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Project Preview Column (Parallax Browser Mockup with project-specific backing glow) */}
        <motion.div
          style={{ y: yTranslate }}
          className={`col-span-1 lg:col-span-8 relative flex items-center justify-center ${
            isImageRight ? 'lg:order-last' : 'lg:order-first'
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -z-10 w-[125%] h-[125%] rounded-full blur-[64px] pointer-events-none select-none"
            style={{
              background: index === 0
                ? 'radial-gradient(circle, rgba(212, 163, 115, 0.08) 0%, transparent 70%)'
                : index === 1
                ? 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
                : index === 2
                ? 'radial-gradient(circle, rgba(249, 115, 22, 0.07) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, transparent 70%)'
            }}
          />
          <BrowserFrame
            src={project.image}
            alt={`${project.title} Case Study Preview`}
            url={project.demo}
            className="relative z-10 w-full"
          />
        </motion.div>

      </div>
    </motion.div>
  )
}
export default ProjectChapter
