/**
 * app/page.tsx
 *
 * Root page — Server Component.
 * Composes portfolio sections top-to-bottom.
 * Additional sections (Work, Stack, etc.) will be added here as built.
 */
import { HeroSection } from '@/components/hero'
import { MissionSection } from '@/components/about'
import { WorkSection } from '@/components/work'
import { JourneySection, TechScroll } from '@/components/journey'
import { ContactSection } from '@/components/contact'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <WorkSection />
      <JourneySection />
      <TechScroll />
      <ContactSection />
    </>
  )
}
