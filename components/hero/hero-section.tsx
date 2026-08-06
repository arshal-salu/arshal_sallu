'use client'

/**
 * components/hero/hero-section.tsx
 *
 * World-class hero experience.
 *
 * Layout:
 *   Full viewport height (min-h-dvh), vertically centred.
 *   Two-column on ≥lg: left content · right profile sidebar.
 *   Single column on mobile: content stacked, sidebar beneath.
 *
 * Animation sequence (Framer Motion):
 *   1. Badge           — fade up, 0.2s delay
 *   2. Headline        — fade up, staggered per word, 0.3s delay
 *   3. Description     — fade up, 0.5s delay
 *   4. Profile Card    — fade/scale up, 0.5s delay
 */

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Briefcase, Mail } from 'lucide-react'
import { GithubIcon, XIcon, InstagramIcon } from '@/components/ui/icons'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'
import { ScrambleText } from './scramble-text'
import { DotGrid } from '../layout/background/dot-grid'

/* ─── FRAMER MOTION VARIANTS ─────────────────────────────────── */
// Defined outside component — stable reference, no re-creation on render.

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.5,
    },
  },
}

/* ─── HEADLINE WORDS ─────────────────────────────────────────── */
// Splitting the headline so each word can stagger independently.
const HEADLINE_LINES = [
  'Building Fast,',
  'Scalable &',
  'AI-Driven Web Experiences.',
]

/* ─── COMPONENT ─────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-label="Hero — introduction"
      className="relative min-h-dvh w-full flex items-center overflow-hidden"
    >
      {/* Interactive Dot Grid Background Effect */}
      <DotGrid
        dotSize={3}
        gap={28}
        baseColor="#111111"
        activeColor="#FFFFFF"
        proximity={120}
        shockRadius={200}
        shockStrength={4}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      />
      <Container
        size="2xl"
        className="py-24 lg:py-0 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Text Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0 w-full"
          >
            {/* 1. Sub-headline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[var(--color-text-secondary)]"
            >
              <span className="text-white font-semibold">AI Developer</span>
              <span className="text-neutral-600">•</span>
              <span>Full-Stack Engineer</span>
            </motion.div>

            {/* 2. Headline */}
            <h1
              className={[
                'font-[var(--font-heading)] font-bold',
                'leading-[1.05] tracking-[-0.04em]',
                'flex flex-col gap-0.5 text-center lg:text-left items-center lg:items-start',
              ].join(' ')}
            >
              {HEADLINE_LINES.map((line, i) => {
                const isLastLine = i === HEADLINE_LINES.length - 1
                return (
                  <motion.span
                    key={line}
                    variants={itemVariants}
                    custom={i}
                    className={[
                      'block',
                      'text-[clamp(2.75rem,5.5vw,4.8rem)] lg:text-[clamp(3.5rem,5vw,5rem)]',
                      isLastLine ? '' : 'text-white',
                    ].join(' ')}
                    style={isLastLine ? { color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' } : undefined}
                  >
                    <ScrambleText text={line} delay={100 + i * 150} duration={600} />
                  </motion.span>
                )
              })}
            </h1>

            {/* 3. Description */}
            <motion.p
              variants={itemVariants}
              className={[
                'text-[var(--color-text-secondary)]',
                'font-[var(--font-inter)]',
                'text-[clamp(1rem,1.8vw,1.1rem)]',
                'leading-[1.7]',
                'max-w-[640px] text-center lg:text-left',
              ].join(' ')}
            >
              I create production-ready web applications that combine modern frontend technologies, reliable
              backend systems, and intelligent AI integrations to solve real-world problems.
            </motion.p>
          </motion.div>

          {/* Right Column: About Me Profile Card Sidebar */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-[360px] bg-neutral-950/40 backdrop-blur-md border border-neutral-800 p-6 flex flex-col gap-5 relative overflow-hidden rounded-2xl group hover:border-neutral-700 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.01)]"
            >
              {/* Header Row: Avatar & Beacon */}
              <div className="flex items-center justify-between w-full">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 group-hover:border-neutral-700 transition-all duration-300">
                  <Image
                    src="/images/projects/ChatGPT Image Jul 28, 2026, 08_04_37 AM (1).png"
                    alt="Muhammed Arshal V"
                    fill
                    sizes="80px"
                    priority
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[9px] font-mono tracking-widest text-neutral-400 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  ACTIVE
                </div>
              </div>

              {/* Title & Location details */}
              <div className="flex flex-col gap-1.5">
                <h2 className="font-[var(--font-heading)] font-bold text-white text-lg tracking-wide">
                  Muhammed Arshal V
                </h2>
                <p className="font-mono text-[11px] text-neutral-400 tracking-wider">
                  AI & Full-Stack Developer
                </p>

                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <MapPin size={13} className="text-neutral-600" />
                    <span>Kerala, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <Briefcase size={13} className="text-neutral-600" />
                    <span className="italic">Seeking Internship</span>
                  </div>
                </div>
              </div>

              <hr className="border-neutral-900" />

              {/* About Me Section */}
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[9px] font-bold tracking-[0.2em] text-white uppercase">
                  About Me
                </h3>
                <p className="text-neutral-400 text-xs leading-[1.6]">
                  I design and engineer intelligent software solutions. My focus is on Generative AI integration, clean frontend architectures, and high-performance server logic.
                </p>
              </div>

              <hr className="border-neutral-900" />

              {/* Call to action & socials */}
              <div className="flex flex-col gap-4">
                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider hover:bg-neutral-200 transition-colors duration-300 text-center select-none"
                >
                  LET'S CONNECT
                </a>

                <div className="flex items-center justify-around px-2 text-neutral-500">
                  <a
                    href="https://github.com/arshal-salu"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Profile"
                    className="hover:text-white transition-colors duration-200"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/arshal_salu"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram Profile"
                    className="hover:text-white transition-colors duration-200"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/arshal__salu"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X Profile"
                    className="hover:text-white transition-colors duration-200"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:arshalsallu@gmail.com"
                    title="Send Email"
                    className="hover:text-white transition-colors duration-200"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
