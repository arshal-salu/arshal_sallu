'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  src: string
  alt: string
  url?: string
  className?: string
}

export function BrowserFrame({ src, alt, url = 'https://muhammedarshal.vercel.app', className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        // High-end glassmorphic container with custom ease transitions
        'relative w-full rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-subtle)] bg-[hsl(222,14%,11%,0.4)] backdrop-blur-md transition-all duration-300 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.25)]',
        'hover:-translate-y-1.5 hover:border-neutral-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]',
        className
      )}
    >
      {/* Browser Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[hsl(222,14%,8%,0.5)] select-none">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[var(--color-danger)] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-warning)] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)] opacity-80" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-4 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[hsl(222,18%,5%,0.6)] text-[10px] sm:text-xs text-[var(--color-text-secondary)] font-mono truncate hover:bg-[hsl(222,18%,8%,0.8)] hover:text-white hover:border-[var(--color-border-strong)] transition-all cursor-pointer select-none"
          >
            <span className="opacity-40 mr-1">https://</span>
            <span className="opacity-90">{url.replace(/^https?:\/\//, '')}</span>
          </a>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5 opacity-40 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text)]" />
        </div>
      </div>

      {/* Browser Viewport Area */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-[16/10] bg-[hsl(222,18%,5%)] overflow-hidden cursor-pointer"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              className="object-cover object-top transition-all duration-300"
              priority={false}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {/* Glass reflection overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0" />
      </a>
    </div>
  )
}
export default BrowserFrame
