'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/lib/projects'
import { GithubIcon } from '@/components/ui/icons'

interface MobileWorkCarouselProps {
  projects: Project[]
}

export function MobileWorkCarousel({ projects }: MobileWorkCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<number>(0)

  const total = projects.length
  const activeProject = projects[activeIndex]

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1)
    setActiveIndex(idx)
  }

  // Slide animation variants
  const slideVariants: {
    enter: (dir: number) => any
    center: any
    exit: (dir: number) => any
  } = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      },
    }),
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* 1. Quick Grid Selector - 2x2 Grid of All Case Studies */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
            Select Case Study
          </span>
          <span className="font-mono text-xs text-neutral-400">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {projects.map((p, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`relative flex flex-col text-left p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'border-white/40 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20 opacity-70 hover:opacity-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGridTabIndicator"
                    className="absolute inset-0 border-2 border-white/40 rounded-xl sm:rounded-2xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                    0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold">Active</span>
                    </span>
                  )}
                </div>

                <span className={`font-mono text-xs sm:text-[13px] font-bold tracking-tight truncate w-full ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {p.title}
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 truncate w-full mt-0.5">
                  {p.category}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Carousel Controls Bar */}
      <div className="flex items-center justify-between px-1 py-1">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {projects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => handleSelect(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous case study"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next case study"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Active Case Study Full Showcase Card */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={activeProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                handleNext()
              } else if (info.offset.x > 40) {
                handlePrev()
              }
            }}
            className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-5 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient project-specific background glow */}
            <div
              aria-hidden="true"
              className="absolute -z-10 -top-20 -right-20 w-64 h-64 rounded-full blur-[72px] opacity-20 pointer-events-none"
              style={{
                background:
                  activeIndex === 0
                    ? 'radial-gradient(circle, #d4a373 0%, transparent 70%)'
                    : activeIndex === 1
                    ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
                    : activeIndex === 2
                    ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
                    : 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
              }}
            />

            {/* Edge-to-Edge Image Showcase */}
            <a
              href={activeProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 block cursor-pointer"
            >
              <Image
                src={activeProject.image}
                alt={`${activeProject.title} Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Floating Status Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-wider">
                  0{activeIndex + 1} / 0{total}
                </span>

                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-medium tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Subtle bottom shadow vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </a>

            {/* Metadata & Title */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]">
                <span className="text-neutral-400 font-semibold">{activeProject.category}</span>
              </div>

              <h3 className="font-bold tracking-tight text-white leading-tight text-2xl sm:text-3xl">
                {activeProject.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Engineering Challenge & Solution (Top & Bottom Glass Box) */}
            <div className="flex flex-col gap-3.5 p-3.5 sm:p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-200">
                  Engineering Challenge
                </span>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {activeProject.challenge}
                </p>
              </div>

              <div className="h-px w-full bg-white/[0.06]" />

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-200">
                  Solution
                </span>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {activeProject.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold text-neutral-400">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-white/[0.08] bg-white/[0.02] text-neutral-300 select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={activeProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-white text-black font-medium text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-white/15 bg-white/[0.04] text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MobileWorkCarousel
