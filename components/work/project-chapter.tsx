'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Project, projects } from '@/lib/projects'
import { GithubIcon } from '@/components/ui/icons'

interface ProjectChapterProps {
  project: Project
  index: number
}

export function ProjectChapter({ project, index }: ProjectChapterProps) {
  const totalProjects = projects.length
  const projectNumber = `0${index + 1}`
  const totalNumber = `0${totalProjects}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-neutral-950/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Ambient background glow behind each card */}
      <div
        aria-hidden="true"
        className="absolute -z-10 -top-20 -right-20 w-64 h-64 rounded-full blur-[72px] opacity-20 pointer-events-none"
        style={{
          background:
            index === 0
              ? 'radial-gradient(circle, #d4a373 0%, transparent 70%)'
              : index === 1
              ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
              : index === 2
              ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
              : 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
        }}
      />

      {/* 1. Frameless Edge-to-Edge Screenshot Frame */}
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 block cursor-pointer"
      >
        <Image
          src={project.image}
          alt={`${project.title} Preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index === 0}
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {/* Index Counter Pill */}
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-wider">
            {projectNumber} / {totalNumber}
          </span>

          {/* Live Status Badge */}
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] sm:text-xs font-medium tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Subtle bottom shadow vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </a>

      {/* 2. Metadata & Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]">
          <span className="text-neutral-400 font-semibold">{project.category}</span>
        </div>

        <h3 className="font-bold tracking-tight text-white leading-tight text-2xl sm:text-3xl">
          {project.title}
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* 3. Engineering Challenge & Solution (Top & Bottom Glass Box) */}
      <div className="flex flex-col gap-3.5 p-3.5 sm:p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-200">
            Engineering Challenge
          </span>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="h-px w-full bg-white/[0.06]" />

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-200">
            Solution
          </span>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* 4. Tech Stack */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold text-neutral-400">
          Technology Stack
        </span>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-white/[0.08] bg-white/[0.02] text-neutral-300 select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-white text-black font-medium text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Demo</span>
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-white/15 bg-white/[0.04] text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
      </div>
    </motion.article>
  )
}

export default ProjectChapter

