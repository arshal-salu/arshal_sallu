import React from 'react'
import { Section, Container, Heading } from '@/components/ui'
import { principles } from './principles-data'
import { PrincipleCard } from './principle-card'

export function PrinciplesSection() {
  return (
    <Section
      id="principles"
      className="relative w-full border-t border-[var(--color-border-subtle)] overflow-hidden"
      aria-labelledby="principles-heading"
    >
      {/* Almost invisible blueprint/grid geometric line pattern in the background */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border-subtle) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, var(--color-border-subtle) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.18,
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
        }}
      />

      {/* Blueprint schematic diagonal crosshair details for added design depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 10%, var(--color-primary) 1px, transparent 1px),
            radial-gradient(circle at 90% 90%, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Ambient background glow dots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[15%] top-[20%] h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute -left-[15%] bottom-[20%] h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <Container size="2xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-2xl">
          <Heading
            id="principles-heading"
            level={2}
            size="xl"
            weight="bold"
            eyebrow="Philosophy"
            className="tracking-tight text-[var(--color-text)]"
          >
            Everything I Learned in{' '}
            <span className="text-[var(--color-primary)]">
              2026.
            </span>
          </Heading>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The key technical takeaways and core principles that shaped my software design, AI integration, and development methodology in 2026.
          </p>
        </div>

        {/* 2x2 Grid Layout for Desktop, Single Column for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {principles.map((principle, index) => (
            <PrincipleCard
              key={principle.number}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
export default PrinciplesSection
