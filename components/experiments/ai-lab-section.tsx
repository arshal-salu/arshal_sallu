import React from 'react'
import { Section, Container, Heading } from '@/components/ui'
import { experiments } from '@/lib/experiments'
import { ExperimentCard } from './experiment-card'
import { SECTION_IDS } from '@/constants'

export function AILabSection() {
  return (
    <Section
      id="experiments"
      className="relative w-full border-t border-[var(--color-border-subtle)]"
      aria-labelledby="experiments-heading"
    >
      {/* Dynamic atmospheric background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[10%] top-[30%] h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />
        <div
          className="absolute -right-[10%] bottom-[20%] h-[600px] w-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
            filter: 'blur(90px)'
          }}
        />
      </div>

      <Container size="2xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-2xl">
          <Heading
            id="experiments-heading"
            level={2}
            size="xl"
            weight="bold"
            eyebrow="R&D Lab"
            className="tracking-tight text-[var(--color-text)]"
          >
            AI{' '}
            <span
              className={[
                'bg-gradient-to-r',
                'from-[var(--color-accent)]',
                'via-[var(--color-primary)]',
                'to-[var(--color-secondary)]',
                'bg-clip-text text-transparent',
              ].join(' ')}
            >
              Lab.
            </span>
          </Heading>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Exploring intelligent systems, modern AI workflows, and experimental ideas.
          </p>
        </div>

        {/* Experiments Grid layout: 2-columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
export default AILabSection
