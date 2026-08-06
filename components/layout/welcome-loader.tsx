'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function WelcomeLoader() {
  const [isComplete, setIsComplete] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Check session storage so reload doesn't force intro overlay
    if (typeof window !== 'undefined') {
      const introSeen = sessionStorage.getItem('intro_seen')
      if (introSeen === 'true') {
        setIsComplete(true)
        setShouldRender(false)
        return
      }
    }

    setIsMounted(true)
    // Block document scrolling during intro screen
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleExplore = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intro_seen', 'true')
    }
    setIsComplete(true)
    document.body.style.overflow = ''
  }

  const handleAnimationComplete = () => {
    setShouldRender(false)
  }

  if (!shouldRender) return null

  // Framer Motion entry animations
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: {
      y: '-100%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.35 }
    }
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isComplete && (
        <motion.div
          key="intro-overlay"
          variants={overlayVariants}
          initial="visible"
          exit="hidden"
          className="fixed inset-0 bg-black flex items-center justify-center p-6 sm:p-12 overflow-y-auto"
          style={{ zIndex: 99999 }} // Overlay above navbar and layout layers
        >
          {/* Centered responsive layout grid */}
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mx-auto my-auto py-12">
            
            {/* Left Column: Profile Card Sidebar (White Box with Big Image) */}
            {isMounted && (
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full max-w-[340px] bg-white border border-neutral-200 flex flex-col relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  {/* Top Half: Big Bold Flush Image */}
                  <div className="relative w-full aspect-square bg-neutral-100 border-b border-neutral-200 overflow-hidden">
                    <Image
                      src="/images/projects/avatar.png"
                      alt="Muhammed Arshal V"
                      fill
                      sizes="340px"
                      priority
                      className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Half: Title details with padding */}
                  <div className="p-8 flex flex-col items-center text-center gap-2">
                    <h2 className="font-[var(--font-heading)] font-bold text-neutral-900 text-xl tracking-wide">
                      Muhammed Arshal V
                    </h2>
                    <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                      AI Full Stack Developer
                    </p>
                    <span className="text-xs text-neutral-600 font-medium italic mt-1">
                      Seeking for Internship
                    </span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Right Column: About Me presentation & Explore Button */}
            {isMounted && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl mx-auto lg:mx-0 w-full"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
                    Introduction
                  </span>
                  <h1 className="font-[var(--font-heading)] font-bold text-4xl sm:text-5xl tracking-wide text-white leading-none">
                    About Me
                  </h1>
                </div>

                <div className="flex flex-col gap-4 text-[var(--color-text-secondary)] font-[var(--font-inter)] text-sm sm:text-base leading-[1.7] max-w-md">
                  <p>
                    I am a Full Stack Developer passionate about crafting highly responsive, performant, and premium web applications. I specialize in building type-safe database schemas, optimizing dashboard analytics, and integrating high-end user interface interactions.
                  </p>
                  <p>
                    Combining front-end creativity with solid backend architecture, my work focuses on robust state management, clean database models, and micro-interactions that elevate the overall digital experience.
                  </p>
                </div>

                {/* Explore Portfolio CTA Button */}
                <button
                  onClick={handleExplore}
                  className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] select-none mt-4 border border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
                >
                  EXPLORE PORTFOLIO
                </button>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
