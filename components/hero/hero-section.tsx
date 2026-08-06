'use client'

/**
 * components/hero/hero-section.tsx
 *
 * World-class hero experience.
 *
 * Layout:
 *   Full viewport height (min-h-dvh), vertically centred.
 *   Two-column on ≥lg: left content · right neural visualization.
 *   Single column on mobile: content stacked, visualization beneath.
 *
 * Animation sequence (Framer Motion):
 *   1. Badge           — fade up, 0.2s delay
 *   2. Headline        — fade up, staggered per word, 0.3s delay
 *   3. Description     — fade up, 0.5s delay
 *   4. Buttons         — fade up, 0.65s delay
 *   5. Scroll indicator — fade up, 0.8s delay
 *   6. Neural viz      — fade in, 0.4s delay
 *
 * Performance:
 *   • NeuralNetwork is dynamically imported (ssr:false) so Three.js
 *     never runs on the server — critical for build time.
 *   • Framer Motion variants defined outside the component to avoid
 *     recreation on every render.
 *   • No useState for animation state — purely declarative variants.
 */

import { motion } from 'framer-motion'
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
        className="py-24 lg:py-0 w-full"
      >
        <div className="flex flex-col items-center justify-center w-full relative z-10">
          {/* Main information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-8 text-center items-center max-w-3xl mx-auto"
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
                'flex flex-col gap-0.5 text-center items-center',
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
                'max-w-[640px] text-center',
              ].join(' ')}
            >
              Engineering web solutions that are I create production-ready web
              applications that combine modern frontend technologies, reliable
              backend systems, and intelligent AI integrations to solve
              real-world problems.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
