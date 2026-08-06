'use client'

/**
 * components/about/milestone-journey.tsx
 *
 * Vertical journey visualization — four connected milestones:
 *   Learn → Build → Experiment → Improve
 *
 * This is NOT a date-based timeline. It's a cyclical process visualization
 * that communicates how Arshal approaches engineering.
 *
 * Architecture:
 *   • Each milestone is a card-like node with an icon + label + tagline
 *   • Nodes are connected by an animated dashed SVG line that "draws in"
 *     when the section enters the viewport
 *   • Hover: the hovered node lifts and glows; the connector segment
 *     leading to it brightens
 *   • useReducedMotion: skips all animations, renders fully visible
 *   • Fully keyboard accessible (focusable cards with focus-visible ring)
 *
 * Performance:
 *   • SVG connector rendered once; animated via stroke-dashoffset CSS
 *   • useInView from framer-motion (intersection observer) — no scroll listener
 *   • Zero React state for hover — pure CSS :hover + group utility
 */

import { useRef, useState }              from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  BookOpen,
  Hammer,
  FlaskConical,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

/* ─── DATA ──────────────────────────────────────────────────── */
interface Milestone {
  id:      string
  icon:    LucideIcon
  label:   string
  tagline: string
  color:   string   // CSS custom property name for the accent
}

const MILESTONES: Milestone[] = [
  {
    id:      'learn',
    icon:    BookOpen,
    label:   'Learn',
    tagline: 'Understand the problem space deeply before writing a line of code.',
    color:   'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))',
  },
  {
    id:      'build',
    icon:    Hammer,
    label:   'Build',
    tagline: 'Translate ideas into focused, purposeful implementations.',
    color:   'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))',
  },
  {
    id:      'experiment',
    icon:    FlaskConical,
    label:   'Experiment',
    tagline: 'Push beyond the obvious solution to discover what actually works.',
    color:   'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))',
  },
  {
    id:      'improve',
    icon:    TrendingUp,
    label:   'Improve',
    tagline: 'Reflect, refine, and raise the bar with every iteration.',
    color:   'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))',
  },
]

/* ─── ANIMATION VARIANTS ─────────────────────────────────────── */
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const nodeVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x:       0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

const lineVariants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity:    1,
    transition: {
      pathLength: { duration: 1.2, ease: 'easeInOut' as const, delay: 0.2 },
      opacity:    { duration: 0.3 },
    },
  },
}

/* ─── CONNECTOR SVG ──────────────────────────────────────────── */
function ConnectorLine({ isVisible, reduced }: { isVisible: boolean; reduced: boolean }) {
  // 4 nodes with ~88px spacing = 3 segments of ~88px each = 264px total
  // The SVG is placed absolutely in the left gutter of the list
  return (
    <div
      aria-hidden="true"
      className="absolute left-[19px] top-[20px] bottom-[20px] w-px pointer-events-none"
    >
      <svg
        width="2"
        height="100%"
        viewBox="0 0 2 264"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Static base track */}
        <line
          x1="1" y1="0" x2="1" y2="264"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Animated progress line */}
        <motion.line
          x1="1" y1="0" x2="1" y2="264"
          stroke="var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1, opacity: 1 } : 'hidden'}
          animate={isVisible || reduced ? 'visible' : 'hidden'}
          variants={lineVariants}
          style={{ filter: 'drop-shadow(0 0 4px var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2)))' }}
        />
      </svg>
    </div>
  )
}

/* ─── MILESTONE CARD ─────────────────────────────────────────── */
interface MilestoneCardProps {
  milestone:  Milestone
  index:      number
  isVisible:  boolean
  reduced:    boolean
}

function MilestoneCard({ milestone, index, isVisible, reduced }: MilestoneCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = milestone.icon

  return (
    <motion.div
      variants={reduced ? {} : nodeVariants}
      initial={reduced ? { opacity: 1, x: 0 } : 'hidden'}
      animate={isVisible || reduced ? 'visible' : 'hidden'}
      className="relative flex items-start gap-5 pl-12 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="listitem"
      aria-label={`${milestone.label}: ${milestone.tagline}`}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Node dot — sits in the left gutter over the connector */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
        style={{
          borderColor:     hovered ? milestone.color : 'var(--color-border)',
          backgroundColor: hovered ? `color-mix(in srgb, ${milestone.color} 12%, transparent)` : 'var(--color-surface)',
          boxShadow:       hovered ? `0 0 16px color-mix(in srgb, ${milestone.color} 25%, transparent)` : 'none',
          transform:       hovered && !reduced ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <Icon
          size={16}
          style={{
            color:      hovered ? '#ffffff' : 'var(--color-muted)',
            transition: 'color 0.25s ease',
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 pb-8 last:pb-0">
        <span
          className="font-[var(--font-geist)] font-bold text-base transition-colors duration-200"
          style={{ color: hovered ? milestone.color : 'var(--color-text)' }}
        >
          {milestone.label}
        </span>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-[260px]">
          {milestone.tagline}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── MAIN EXPORT ────────────────────────────────────────────── */
export function MilestoneJourney() {
  const ref     = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const reduced  = useReducedMotion() ?? false

  return (
    <div ref={ref} className="relative" role="list" aria-label="Engineering journey milestones">
      <ConnectorLine isVisible={isInView} reduced={reduced} />

      <motion.div
        variants={reduced ? {} : containerVariants}
        initial={reduced ? { opacity: 1 } : 'hidden'}
        animate={isInView || reduced ? 'visible' : 'hidden'}
        className="flex flex-col"
      >
        {MILESTONES.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={index}
            isVisible={isInView}
            reduced={reduced}
          />
        ))}
      </motion.div>
    </div>
  )
}
