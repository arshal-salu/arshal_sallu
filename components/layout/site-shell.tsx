/**
 * components/layout/site-shell.tsx
 *
 * Global application shell — wraps every page with the
 * background system and the navigation bar.
 *
 * Responsibilities:
 *   1. Render the layered Background (gradients, grid, noise, spotlight)
 *   2. Render the Navbar (fixed, above everything)
 *   3. Provide <main> with correct top-padding to account for the
 *      fixed navbar height
 *   4. Reserve a footer slot for future use
 *
 * Architecture:
 *   • This is a Server Component — it imports client sub-components
 *     (Background, Navbar) that each declare their own 'use client'
 *     boundary at the module level.
 *   • The shell itself has zero client-side JS.
 *   • `children` is passed through as a React.ReactNode, which is
 *     serializable across the server/client boundary.
 */
import { Background } from './background/background'
import { Navbar } from './navbar'
import { WelcomeLoader } from './welcome-loader'

interface SiteShellProps {
  children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      {/* ── Welcome animation loader ── */}
      <WelcomeLoader />

      {/* ── Layered background canvas ── */}
      <Background />

      {/* ── Fixed navigation bar ── */}
      <Navbar />

      {/*
       * ── Page content ──
       * pt-16 accounts for the default navbar height (h-16).
       * When scrolled the navbar shrinks to h-14 but we keep the
       * larger padding so content never jumps on first scroll.
       */}
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-[var(--z-raised)] min-h-dvh pt-16 outline-none"
      >
        {children}
      </main>

      {/*
       * ── Footer slot ──
       * Empty for now — the Footer component will be imported and
       * rendered here once built.
       */}
      <footer
        aria-label="Site footer"
        className="relative z-[var(--z-raised)]"
      />
    </>
  )
}
