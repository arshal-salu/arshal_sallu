'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ChevronRight, ChevronLeft, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Project } from '@/lib/projects'
import { GithubIcon } from '@/components/ui/icons'

interface MobileWorkDrawerProps {
  projects: Project[]
}

export function MobileWorkDrawer({ projects }: MobileWorkDrawerProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

  const activeProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null
  const totalProjects = projects.length

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProjectIndex])

  // Handle keyboard ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNextProject = () => {
    if (selectedProjectIndex === null) return
    setSelectedProjectIndex((selectedProjectIndex + 1) % totalProjects)
  }

  const handlePrevProject = () => {
    if (selectedProjectIndex === null) return
    setSelectedProjectIndex((selectedProjectIndex - 1 + totalProjects) % totalProjects)
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* List of Compact Project Cards */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {projects.map((project, idx) => {
          const projectNum = `0${idx + 1}`

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-neutral-950/70 backdrop-blur-xl p-4 sm:p-5 flex flex-col gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Ambient backdrop glow */}
              <div
                aria-hidden="true"
                className="absolute -z-10 -top-16 -right-16 w-56 h-56 rounded-full blur-[64px] opacity-20 pointer-events-none"
                style={{
                  background:
                    idx === 0
                      ? 'radial-gradient(circle, #d4a373 0%, transparent 70%)'
                      : idx === 1
                      ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
                      : idx === 2
                      ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
                      : 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
                }}
              />

              {/* Frameless Screenshot (Tap to open drawer) */}
              <button
                type="button"
                onClick={() => setSelectedProjectIndex(idx)}
                className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 block cursor-pointer text-left"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} Preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx === 0}
                />

                {/* Floating Index and Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-wider">
                    {projectNum} / 0{totalProjects}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-medium tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </button>

              {/* Title & Category */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]">
                  <span className="text-neutral-400">{project.category}</span>
                </div>

                <h3 className="font-bold tracking-tight text-white leading-tight text-xl sm:text-2xl">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills (Compact preview) */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[10px] font-mono rounded-md border border-white/[0.08] bg-white/[0.02] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* Deep Dive Button (Triggers Drawer) */}
                <button
                  type="button"
                  onClick={() => setSelectedProjectIndex(idx)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                >
                  <span>Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {/* Direct Live Demo Link */}
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-4 h-10 rounded-xl border border-white/15 bg-white/[0.04] text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/30 active:scale-[0.98] transition-all cursor-pointer"
                  title="Open Live Website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* NATIVE BOTTOM SHEET / DRAWER MODAL                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProjectIndex(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Bottom Sheet Modal Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 400) {
                  setSelectedProjectIndex(null)
                }
              }}
              className="relative z-10 w-full max-h-[88vh] bg-neutral-950/95 border-t border-x border-white/15 rounded-t-[28px] sm:rounded-t-[32px] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Drawer Top Handle / Grab Bar */}
              <div className="w-full pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-neutral-600/80" />
              </div>

              {/* Drawer Top Navigation Header */}
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.08] shrink-0">
                {/* Prev / Next Project Switcher */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    aria-label="Previous case study"
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs font-semibold text-neutral-300 px-1">
                    0{(selectedProjectIndex ?? 0) + 1} / 0{totalProjects}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextProject}
                    aria-label="Next case study"
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProjectIndex(null)}
                  aria-label="Close case study drawer"
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.08] text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
                {/* Full-width Screenshot */}
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 block cursor-pointer shrink-0"
                >
                  <Image
                    src={activeProject.image}
                    alt={`${activeProject.title} Preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </a>

                {/* Project Titles & Category */}
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

                {/* Engineering Challenge & Solution (Top-and-Bottom Glass Box) */}
                <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                      Engineering Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div className="h-px w-full bg-white/[0.06]" />

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                      Solution
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Key Engineering Highlights */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white">
                    Key Highlights
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {activeProject.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl border border-white/[0.06] bg-white/[0.01]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-neutral-300 leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="flex flex-col gap-2.5 pb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono rounded-lg border border-white/[0.08] bg-white/[0.02] text-neutral-300 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Actions Bar */}
              <div className="p-4 sm:p-5 bg-neutral-950 border-t border-white/[0.1] flex items-center gap-3 shrink-0">
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Demo</span>
                </a>
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-white/20 bg-white/[0.04] text-white font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/35 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileWorkDrawer
