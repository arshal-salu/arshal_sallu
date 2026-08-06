'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Briefcase, Mail } from 'lucide-react'
import { GithubIcon, XIcon, InstagramIcon } from '@/components/ui/icons'

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
            
            {/* Left Column: About Me Profile Card */}
            {isMounted && (
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full max-w-[350px] bg-neutral-950/60 backdrop-blur-md border border-neutral-800 p-6 flex flex-col gap-5 relative overflow-hidden rounded-2xl group hover:border-neutral-700 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.01)]"
                >
                  {/* Header Row: Avatar & Beacon */}
                  <div className="flex items-center justify-between w-full">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 group-hover:border-neutral-700 transition-all duration-300">
                      <Image
                        src="/images/projects/ChatGPT Image Jul 28, 2026, 08_04_37 AM (1).png"
                        alt="Muhammed Arshal V"
                        fill
                        sizes="80px"
                        priority
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[9px] font-mono tracking-widest text-neutral-400 select-none">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      ACTIVE
                    </div>
                  </div>

                  {/* Title & Location details */}
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-[var(--font-heading)] font-bold text-white text-lg tracking-wide">
                      Muhammed Arshal V
                    </h2>
                    <p className="font-mono text-[11px] text-neutral-400 tracking-wider">
                      AI & Full-Stack Developer
                    </p>

                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2 text-neutral-500 text-xs">
                        <MapPin size={13} className="text-neutral-600" />
                        <span>Kerala, India</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500 text-xs">
                        <Briefcase size={13} className="text-neutral-600" />
                        <span className="italic">Seeking Internship</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-neutral-900" />

                  {/* About Me Section */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-mono text-[9px] font-bold tracking-[0.2em] text-white uppercase">
                      About Me
                    </h3>
                    <p className="text-neutral-400 text-xs leading-[1.6]">
                      I design and engineer intelligent software solutions. My focus is on Generative AI integration, clean frontend architectures, and high-performance server logic.
                    </p>
                  </div>

                  <hr className="border-neutral-900" />

                  {/* Social Profile Anchors */}
                  <div className="flex items-center justify-around px-2 text-neutral-500">
                    <a
                      href="https://github.com/arshal-salu"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Profile"
                      className="hover:text-white transition-colors duration-200"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com/arshal_salu"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram Profile"
                      className="hover:text-white transition-colors duration-200"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://x.com/arshal__salu"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="X Profile"
                      className="hover:text-white transition-colors duration-200"
                    >
                      <XIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:arshalsallu@gmail.com"
                      title="Send Email"
                      className="hover:text-white transition-colors duration-200"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Right Column: Main welcome details & Explore Button */}
            {isMounted && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 max-w-xl mx-auto lg:mx-0 w-full"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
                    Introduction Page
                  </span>
                  <h1 className="font-[var(--font-heading)] font-bold text-5xl sm:text-7xl tracking-wide text-white leading-none">
                    ARSHAL
                  </h1>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)] mt-1.5 block">
                    AI Developer Portfolio
                  </span>
                </div>

                <p className="text-[var(--color-text-secondary)] font-[var(--font-inter)] text-sm sm:text-base leading-[1.7] max-w-md">
                  Welcome to my interactive space. I build high-performance web applications powered by generative artificial intelligence, clean modular code designs, and secure server infrastructures.
                </p>

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
