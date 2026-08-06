'use client'

/**
 * components/layout/navbar.tsx
 *
 * Floating capsule dock navigation.
 * Displays clean, professional Lucide icons with native hover tooltips.
 * Includes a scroll spy that highlights the active section automatically.
 */

import { useEffect, useState } from 'react'
import { Home, Briefcase, Cpu, Mail } from 'lucide-react'
import { SECTION_IDS } from '@/constants'
import { cn } from '@/lib/utils'

interface NavLink {
  label:     string
  href:      string
  sectionId: string
  icon:      React.ComponentType<{ className?: string }>
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: `#${SECTION_IDS.hero}`,    sectionId: SECTION_IDS.hero,    icon: Home },
  { label: 'Projects', href: `#${SECTION_IDS.work}`,    sectionId: SECTION_IDS.work,    icon: Briefcase },
  { label: 'Tools',    href: `#${SECTION_IDS.stack}`,   sectionId: SECTION_IDS.stack,   icon: Cpu },
  { label: 'Contact',  href: `#${SECTION_IDS.contact}`, sectionId: SECTION_IDS.contact, icon: Mail },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  // Scroll listener for background opacity
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy to highlight active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <header
      role="banner"
      className="fixed top-5 inset-x-0 z-[var(--z-sticky)] flex justify-center pointer-events-none"
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-auto transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]',
          isScrolled
            ? 'bg-black/75 backdrop-blur-xl border border-[var(--color-border-subtle)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border border-transparent'
        )}
      >
        {NAV_LINKS.map((link) => {
          const Icon = link.icon
          const isActive = activeSection === link.sectionId
          return (
            <a
              key={link.sectionId}
              href={link.href}
              title={link.label}
              aria-label={link.label}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'relative p-2.5 rounded-full transition-all duration-300 flex items-center justify-center group',
                isActive
                  ? 'text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                  : 'nav-icon hover:bg-white/[0.04]'
              )}
            >
              <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-105" />
            </a>
          )
        })}
      </nav>
    </header>
  )
}
