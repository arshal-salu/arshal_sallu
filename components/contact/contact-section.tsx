'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Section, Container } from '@/components/ui'
import { socialLinks } from './social-links'
import { ContactCard } from './contact-card'
import { GithubIcon, XIcon, InstagramIcon } from '@/components/ui/icons'
import { SECTION_IDS } from '@/constants'

export function ContactSection() {
  const statementRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isStatementInView = useInView(statementRef, { once: true, margin: '-15% 0px' })
  const isContentInView = useInView(contentRef, { once: true, margin: '-10% 0px' })

  // Stagger reveal variants
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const fadeUp = {
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

  // Social icon mapper
  const renderSocialIcon = (name: string) => {
    const iconClass = "w-4 h-4 transition-transform duration-300 group-hover:scale-110"
    switch (name) {
      case 'GitHub':
        return <GithubIcon className={iconClass} />
      case 'Instagram':
        return <InstagramIcon className={iconClass} />
      case 'X':
        return <XIcon className={iconClass} />
      default:
        return <Mail className={iconClass} />
    }
  }

  return (
    <Section
      id={SECTION_IDS.contact}
      className="relative w-full border-t border-[var(--color-border-subtle)] overflow-hidden py-0"
      aria-labelledby="contact-heading"
    >
      {/* Blueprint schematic geometric line pattern in the background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.08,
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }}
      />

      {/* Ambient background glow spotlights */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[15%] bottom-[10%] h-[500px] w-[500px] rounded-full opacity-[0.03] bg-[var(--color-primary)]"
          style={{ filter: 'blur(90px)' }}
        />
        <div
          className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full opacity-[0.02] bg-[var(--color-accent)]"
          style={{ filter: 'blur(70px)' }}
        />
      </div>

      <Container size="2xl">
        {/* 1. Centered Transition Statement Block */}
        <div
          ref={statementRef}
          className="flex flex-col items-center justify-center text-center py-12 lg:py-16 border-b border-[var(--color-border-subtle)]/40"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white mb-6 select-none"
          >
            Every project has been a step forward.
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-[var(--font-heading)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-tight flex flex-row flex-wrap items-baseline justify-center gap-x-2.5 sm:gap-x-3 text-center max-w-3xl"
          >
            <span className="text-white">
              The next one
            </span>
            <span
              style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
            >
              could be yours.
            </span>
          </motion.h3>
        </div>

        {/* 2. Main Closing Section Content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center pt-16 pb-16 lg:pb-24 relative z-10"
        >
          {/* Left Column: Heading, Description, Availability */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isContentInView ? 'visible' : 'hidden'}
            className="col-span-1 lg:col-span-6 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">

              {/* Title */}
              <motion.div variants={fadeUp}>
                <h2
                  id="contact-heading"
                  className="font-[var(--font-heading)] font-bold tracking-[-0.04em] text-4xl sm:text-5xl lg:text-6xl leading-tight flex flex-row flex-wrap items-baseline gap-x-2.5 sm:gap-x-3 text-left"
                >
                  <span className="text-white">
                    Let&apos;s Build
                  </span>
                  <span
                    style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
                  >
                    Together.
                  </span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[540px]"
              >
                I&apos;m always excited to discuss AI, modern web applications, and meaningful software projects. Whether it&apos;s an opportunity, collaboration, or simply a conversation, I&apos;d love to hear from you.
              </motion.p>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
              <motion.span variants={fadeUp} className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] select-none">
                Connect Elsewhere
              </motion.span>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={[
                      'group flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] text-xs font-mono font-medium',
                      'border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
                      'hover:border-[var(--color-primary)] hover:text-[var(--color-text)]',
                      'hover:shadow-[0_0_12px_rgba(79,126,247,0.12)]',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]',
                      'transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]',
                    ].join(' ')}
                  >
                    {renderSocialIcon(link.name)}
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 text-[var(--color-muted)] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Glass Contact Card */}
          <div className="col-span-1 lg:col-span-6 relative">
            <ContactCard />
          </div>
        </div>
      </Container>
    </Section>
  )
}
export default ContactSection
