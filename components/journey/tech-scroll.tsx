'use client'

import React from 'react'

interface TechItem {
  name: string
  color: string
  icon: React.ReactNode
}

export function TechScroll() {
  const techs: TechItem[] = [
    {
      name: 'PostgreSQL',
      color: '#336791',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Supabase',
      color: '#3ecf8e',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M19.1 10.9h-6.2L16.2 2H8.3L4.9 13.1h6.2L8.7 22l10.4-11.1z" />
        </svg>
      )
    },
    {
      name: 'Next.js',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 180 180" className="w-7 h-7 fill-current">
          <path d="M90 0C40.29 0 0 40.29 0 90C0 139.71 40.29 180 90 180C139.71 180 180 139.71 180 90C180 40.29 139.71 0 90 0ZM90 162.77C49.81 162.77 17.23 130.19 17.23 90C17.23 81.33 18.74 72.99 21.52 65.26L77.7 137.9H94.1V74.83H80.52V115.86L34.1 56.12C48.06 44.5 65.88 37.63 85.38 37.63C125.57 37.63 158.15 70.21 158.15 110.38C158.15 125.13 153.76 138.86 146.26 150.36L90 162.77ZM128.84 137.9H115.26V74.83H128.84V137.9Z" />
        </svg>
      )
    },
    {
      name: 'TypeScript',
      color: '#3178c6',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M0 0h24v24H0V0zm22.4 22.4V1.6H1.6v20.8h20.8zM12 18.2c0-1.8 1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2V20h-1.6v-1.8c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6V20H12v-1.8zm-4.8-.8c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6V20H2.4v-2.6c0-1.8 1.4-3.2 3.2-3.2S8.8 15.6 8.8 17.4V20H7.2v-2.6z" />
        </svg>
      )
    },
    {
      name: 'JavaScript',
      color: '#f7df1e',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M0 0h24v24H0V0zm22.4 22.4V1.6H1.6v20.8h20.8zM10.8 18.2c0-1.2-.6-2.2-1.8-2.2s-1.8 1-1.8 2.2V20h-1.6v-1.8c0-1.8 1.4-3.2 3.4-3.2s3.4 1.4 3.4 3.2V20H10.8v-1.8zm3.2.3c0-1 .8-1.5 1.8-1.5s1.8.5 1.8 1.5V20H19v-1.8c0-1.8-1.4-3-3.2-3s-3.2 1.2-3.2 3V20H14v-1.5z" />
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      color: '#38bdf8',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    },
    {
      name: 'HTML',
      color: '#e34f26',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M2.3 2L4 19.5l8 2.2 8-2.2L21.7 2H2.3zm14 7H9.2l.2 2.5h6.9l-.6 6.3-4.5 1.2-4.5-1.2-.3-3.2h2.5l.1 1.4 2.2.6 2.2-.6.3-2.6H6.6l-.6-7.3h10.9l-.6 2.1z" />
        </svg>
      )
    },
    {
      name: 'CSS',
      color: '#1572b6',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M2.3 2L4 19.5l8 2.2 8-2.2L21.7 2H2.3zm14 7h-7l.2 2.5h6.8l-.6 6.3-4.5 1.2-4.5-1.2-.3-3.2h2.5l.1 1.4 2.2.6 2.2-.6.3-2.6H6.4l-.6-7.3h11.1l-.6 2.1z" />
        </svg>
      )
    },
    {
      name: 'Vercel',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M24 22.5H0L12 1.5L24 22.5Z" />
        </svg>
      )
    },
    {
      name: 'Firebase',
      color: '#ffca28',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M3.89 15.75L2.33 5.48c-.14-.94.94-1.57 1.63-.92l8.28 7.82-9.92 3.37zm16.22-3.37L11.83 4.56c-.69-.65-1.77-.65-2.46 0L5.78 8.04l11.45 6.37 2.88-2.03zM21 16.5l-2.06-1.15-2.88 2.03L12 21.5l8.28-7.82c.69-.65 1.77.16 1.63 1.1l-.91 1.72z" />
        </svg>
      )
    },
    {
      name: 'React',
      color: '#61dafb',
      icon: (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-7 h-7 fill-none stroke-current">
          <circle r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )
    },
    {
      name: 'Git',
      color: '#f05032',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 9l3 3M12 12v6" />
        </svg>
      )
    },
    {
      name: 'Docker',
      color: '#2496ed',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M13.9 9.1h2.2v2.2h-2.2V9.1zm-2.8 0h2.2v2.2h-2.2V9.1zm-2.8 0h2.2v2.2H8.3V9.1zm-2.8 0h2.2v2.2H5.5V9.1zm2.8-2.8h2.2v2.2H8.3V6.3zm2.8 0h2.2v2.2h-2.2V6.3zm0-2.8h2.2v2.2h-2.2V3.5z" />
        </svg>
      )
    },
    {
      name: 'Nuxt',
      color: '#00dc82',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M12 2L1 21h22L12 2zm0 4.8L19.2 18H4.8L12 6.8zm-2.8 7.3L7 18h4.4l-2.2-3.9z" />
        </svg>
      )
    }
  ]

  return (
    <div className="w-full py-10 bg-black border-y border-[var(--color-border-subtle)] relative overflow-hidden select-none">
      {/* Fade borders */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Styled loop */}
      <div className="flex w-full items-center overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes tech-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .tech-track {
            display: flex;
            width: max-content;
            animation: tech-scroll 35s linear infinite;
          }
        `}} />
        <div className="tech-track gap-16 sm:gap-24">
          {[...techs, ...techs].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 transition-colors duration-300 pointer-events-auto group text-[#F5F5F5] hover:text-white"
            >
              <div className="shrink-0 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                {tech.icon}
              </div>
              <span className="text-xs font-semibold tracking-wider font-mono transition-colors duration-300 text-current">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TechScroll
