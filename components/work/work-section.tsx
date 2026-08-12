import React from 'react'
import { Section, Container } from '@/components/ui'
import { projects } from '@/lib/projects'
import { SelectedWorkSticky } from './selected-work-sticky'
import { MobileWorkDrawer } from './mobile-work-drawer'
import { SECTION_IDS } from '@/constants'

export function WorkSection() {
  return (
    <Section
      id={SECTION_IDS.work}
      className="relative w-full border-t border-[var(--color-border-subtle)] p-0"
      aria-labelledby="work-heading"
    >
      {/* 1. Desktop version: Sticky Scroll */}
      <div className="hidden lg:block">
        <SelectedWorkSticky projects={projects} />
      </div>

      {/* 2. Mobile/Tablet version: Bottom Sheet Deep Dive Drawer */}
      <div className="block lg:hidden">
        <Container size="2xl" className="py-12 sm:py-16">
          <div className="flex flex-col gap-3 mb-8 sm:mb-10">
            <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Case Studies
            </span>
            <h2
              id="work-heading-mobile"
              className="font-[var(--font-heading)] font-bold leading-tight tracking-[-0.04em] flex flex-row items-baseline gap-2 text-left text-3xl sm:text-4xl"
            >
              <span className="text-white">
                Selected
              </span>
              <span
                style={{ color: 'var(--token-71db196f-61cb-4b9d-a4b8-20a87c24d842, rgba(182, 180, 189, 0.2))' }}
              >
                Work
              </span>
            </h2>
          </div>

          <MobileWorkDrawer projects={projects} />
        </Container>
      </div>
    </Section>
  )
}

export default WorkSection
