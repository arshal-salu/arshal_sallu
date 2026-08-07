'use client'

import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'
import { ScrambleText } from './scramble-text'

/* ─── FRAMER MOTION VARIANTS ─────────────────────────────────── */
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
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as any, // Custom premium ease-out
    },
  },
}

/* ─── HEADLINE WORDS ─────────────────────────────────────────── */
const HEADLINE_LINES = [
  'Building Fast,',
  'Scalable &',
  'AI-Driven Web Experiences.',
]

export function HeroSection() {
  // Parallax mouse position motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for mouse parallax
  const springConfig = { damping: 30, stiffness: 120 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      // Center the cursor coordinate system
      const x = clientX - window.innerWidth / 2
      const y = clientY - window.innerHeight / 2
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Parallax transform configurations for staggered depth (spheres)
  const sphere1X = useTransform(smoothMouseX, [-800, 800], [-35, 35])
  const sphere1Y = useTransform(smoothMouseY, [-450, 450], [-35, 35])

  const sphere2X = useTransform(smoothMouseX, [-800, 800], [-20, 20])
  const sphere2Y = useTransform(smoothMouseY, [-450, 450], [-20, 20])

  const sphere3X = useTransform(smoothMouseX, [-800, 800], [-45, 45])
  const sphere3Y = useTransform(smoothMouseY, [-450, 450], [-45, 45])

  const sphere4X = useTransform(smoothMouseX, [-800, 800], [-25, 25])
  const sphere4Y = useTransform(smoothMouseY, [-450, 450], [-25, 25])

  const sphere5X = useTransform(smoothMouseX, [-800, 800], [-15, 15])
  const sphere5Y = useTransform(smoothMouseY, [-450, 450], [-15, 15])

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label="Hero — introduction"
      className="relative min-h-dvh w-full flex items-center overflow-hidden bg-transparent select-none"
    >

      {/* Floating 3D Parallax Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* LEFT SIDE (2 Spheres) */}
        {/* Sphere 1 (Large, upper left) */}
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: 'easeInOut',
          }}
          className="absolute left-[8%] top-[25%] z-0"
        >
          <motion.div
            style={{ x: sphere1X, y: sphere1Y }}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-neutral-600 via-neutral-800 to-neutral-950 border border-white/10 opacity-60 blur-[1px] shadow-[inset_-12px_-12px_36px_rgba(0,0,0,0.85),inset_8px_8px_24px_rgba(255,255,255,0.08),0_15px_35px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Sphere 2 (Small, lower left) */}
        <motion.div
          animate={{ y: [0, -35, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4.8,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute left-[18%] top-[65%] z-0"
        >
          <motion.div
            style={{ x: sphere2X, y: sphere2Y }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-neutral-500 via-neutral-700 to-neutral-900 border border-white/10 opacity-55 blur-[2px] shadow-[inset_-6px_-6px_18px_rgba(0,0,0,0.8),inset_4px_4px_12px_rgba(255,255,255,0.06),0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* RIGHT SIDE (3 Spheres diagonal) */}
        {/* Sphere 3 (Large, upper right - hidden on mobile) */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6.2,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="absolute right-[6%] top-[20%] z-0 hidden md:block"
        >
          <motion.div
            style={{ x: sphere3X, y: sphere3Y }}
            className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-neutral-600 via-neutral-800 to-neutral-950 border border-white/10 opacity-50 blur-[3px] shadow-[inset_-14px_-14px_44px_rgba(0,0,0,0.9),inset_10px_10px_30px_rgba(255,255,255,0.08),0_20px_45px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Sphere 4 (Medium, mid right) */}
        <motion.div
          animate={{ y: [0, -28, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5.0,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          className="absolute right-[15%] top-[48%] z-0"
        >
          <motion.div
            style={{ x: sphere4X, y: sphere4Y }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-neutral-500 via-neutral-800 to-neutral-900 border border-white/10 opacity-60 blur-[1px] shadow-[inset_-8px_-8px_24px_rgba(0,0,0,0.8),inset_5px_5px_15px_rgba(255,255,255,0.08),0_12px_24px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Sphere 5 (Small, lower right - hidden on mobile) */}
        <motion.div
          animate={{ y: [0, -32, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5.6,
            ease: 'easeInOut',
            delay: 1.2,
          }}
          className="absolute right-[8%] top-[75%] z-0 hidden md:block"
        >
          <motion.div
            style={{ x: sphere5X, y: sphere5Y }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-neutral-450 via-neutral-700 to-neutral-900 border border-white/10 opacity-65 shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.8),inset_3px_3px_9px_rgba(255,255,255,0.06),0_8px_16px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <Container
        size="2xl"
        className="py-24 lg:py-0 w-full relative z-10"
      >
        <div className="flex flex-col items-center justify-center w-full relative z-10">
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

            {/* 2. Headline with ScrambleText */}
            <h1
              className="font-[var(--font-heading)] font-bold leading-[1.05] tracking-[-0.04em] flex flex-col gap-0.5 text-center items-center"
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
              className="text-[var(--color-text-secondary)] font-[var(--font-inter)] text-[clamp(1rem,1.8vw,1.1rem)] leading-[1.7] max-w-[640px] text-center"
            >
              I create production-ready web applications that combine modern frontend technologies, reliable
              backend systems, and intelligent AI integrations to solve real-world problems.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
