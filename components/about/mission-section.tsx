'use client'

/**
 * components/about/mission-section.tsx
 *
 * "Mission" section — replaces the conventional "About Me" page.
 *
 * Communicates mindset, purpose, and engineering philosophy through:
 *   • A precise, opinionated mission statement
 *   • Three guiding principles (icon + title + sentence)
 *   • A vertical milestone journey (Learn → Build → Experiment → Improve)
 *
 * Layout:
 *   Desktop (≥lg): 60/40 split — content left, journey right
 *   Mobile:         single column, content first then journey
 *
 * Animation:
 *   Viewport-triggered reveal via useInView (intersection observer).
 *   Left content staggers in; right journey has its own internal stagger.
 *   All animations respect prefers-reduced-motion.
 *
 * Performance:
 *   'use client' only because Framer Motion requires it.
 *   No unnecessary state — purely declarative animations.
 */

import { useRef }                              from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  RefreshCw,
  Target,
  Lightbulb,
  type LucideIcon,
}                                              from 'lucide-react'

import { SECTION_IDS }    from '@/constants'
import { Container }      from '@/components/ui/Container'
import { MilestoneJourney } from './milestone-journey'

/* ─── PRINCIPLES DATA ────────────────────────────────────────── */
interface Principle {
  icon:        LucideIcon
  title:       string
  description: string
}

const PRINCIPLES: Principle[] = [
  {
    icon:        Lightbulb,
    title:       'Learn Continuously',
    description: 'Every domain holds something worth understanding — curiosity is the only prerequisite.',
  },
  {
    icon:        Target,
    title:       'Build with Purpose',
    description: "Good software solves a real problem clearly and doesn't apologise for its constraints.",
  },
  {
    icon:        RefreshCw,
    title:       'Keep Improving',
    description: 'The gap between what you built and what you know now is always worth closing.',
  },
]

/* ─── ANIMATION VARIANTS ─────────────────────────────────────── */
const sectionVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:       0,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

const rightVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x:       0,
    transition: {
      duration: 0.6,
      delay:    0.2,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

/* ─── PRINCIPLE CARD ─────────────────────────────────────────── */
function PrincipleCard({ principle }: { principle: Principle }) {
  const Icon = principle.icon

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 group"
    >
      {/* Icon container */}
      <div
        aria-hidden="true"
        className={[
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-lg)]',
          'bg-white/[0.04] border border-white/[0.06] transition-all duration-300',
          'text-neutral-500 group-hover:bg-white/[0.1] group-hover:text-white',
        ].join(' ')}
      >
        <Icon size={16} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <span
          className="text-sm font-bold font-[var(--font-geist)] transition-colors duration-200 group-hover:text-white"
          style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
        >
          {principle.title}
        </span>
        <p className="text-sm leading-[1.65] text-[var(--color-text-secondary)]">
          {principle.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── SECTION DIVIDER LINE ───────────────────────────────────── */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full bg-gradient-to-r from-[var(--color-primary-muted)] via-[var(--color-border)] to-transparent my-2"
    />
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export function MissionSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const reduced  = useReducedMotion() ?? false

  const animateIn = isInView || reduced

  return (
    <section
      ref={ref}
      id={SECTION_IDS.about}
      aria-labelledby="mission-heading"
      className="relative w-full py-20 lg:py-32 flex items-center border-t border-[var(--color-border-subtle)]"
    >
      {/*
       * Subtle ambient glow — positioned behind the section content.
       * Mirrors the background gradient system established in the shell.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-[20%] top-[20%] h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
            filter:     'blur(60px)',
          }}
        />
      </div>

      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-16 lg:gap-20 items-center">

          {/* ══════════════════════════════════
              LEFT — CONTENT
          ══════════════════════════════════ */}
          <motion.div
            variants={reduced ? {} : sectionVariants}
            initial={reduced ? { opacity: 1, y: 0 } : 'hidden'}
            animate={animateIn ? 'visible' : 'hidden'}
            className="flex flex-col gap-10"
          >


            {/* Headline */}
            <motion.div variants={reduced ? {} : itemVariants}>
              <h2
                id="mission-heading"
                className="font-[var(--font-heading)] font-bold leading-[1.15] tracking-[-0.04em] flex flex-col gap-1 text-left items-start max-w-[520px]"
              >
                <span className="block text-[clamp(1.75rem,3.5vw,2.5rem)] text-white">
                  I build
                </span>
                <span className="block text-[clamp(1.75rem,3.5vw,2.5rem)] text-white">
                  intelligent software
                </span>
                <span
                  className="block text-[clamp(1.75rem,3.5vw,2.5rem)]"
                  style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
                >
                  that solves real problems.
                </span>
              </h2>
            </motion.div>

            {/* Supporting copy */}
            <motion.div variants={reduced ? {} : itemVariants} className="flex flex-col gap-4">
              <p className="text-[var(--color-text-secondary)] font-[var(--font-inter)] leading-[1.75] text-[1.0625rem] max-w-[520px]">
                I enjoy combining AI, modern web technologies, and thoughtful product
                design to create applications that are practical, scalable, and enjoyable
                to use. Every project is an opportunity to learn, improve, and build
                something meaningful.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={reduced ? {} : itemVariants}>
              <SectionDivider />
            </motion.div>

            {/* Principles */}
            <div className="flex flex-col gap-7">
              {PRINCIPLES.map((principle) => (
                <PrincipleCard key={principle.title} principle={principle} />
              ))}
            </div>

          </motion.div>

          {/* ══════════════════════════════════
              RIGHT — MILESTONE JOURNEY
          ══════════════════════════════════ */}
          <motion.div
            variants={reduced ? {} : rightVariants}
            initial={reduced ? { opacity: 1, x: 0 } : 'hidden'}
            animate={animateIn ? 'visible' : 'hidden'}
            className="relative"
          >
            {/*
             * Journey container card — subtle glass surface to distinguish
             * the visualization from the raw page background.
             */}
            <div
              className={[
                'relative rounded-[var(--radius-2xl)] p-8 sm:p-10',
                'border border-[var(--color-border-subtle)]',
                'bg-[var(--color-surface)]',
                'shadow-[var(--shadow-card)]',
                // Subtle inner highlight on top edge
                'before:absolute before:inset-x-0 before:top-0 before:h-px',
                'before:bg-gradient-to-r before:from-transparent',
                'before:via-[var(--color-border)] before:to-transparent',
                'before:rounded-t-[var(--radius-2xl)]',
              ].join(' ')}
            >
              {/* Section eyebrow */}
              <p
                className="mb-8 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white"
                aria-hidden="true"
              >
                How I work
              </p>

              <MilestoneJourney />

              {/* Bottom cycle indicator */}
              <div
                className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex items-center gap-2.5"
                aria-hidden="true"
              >
                <RefreshCw
                  size={12}
                  className="text-[var(--color-muted)] animate-spin"
                  style={{ animationDuration: '8s' }}
                />
                <span className="font-[var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Continuous cycle
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </Container>
    </section>
  )
}
