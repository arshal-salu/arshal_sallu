'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function WelcomeLoader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Block document scrolling during the load animation sequence
    document.body.style.overflow = 'hidden'

    let intervalId: NodeJS.Timeout

    const startLoading = () => {
      let currentProgress = 0

      intervalId = setInterval(() => {
        // Organic loading simulation (rapid start, slows in the middle, snaps to end)
        const rand = Math.random()
        if (currentProgress < 30) {
          currentProgress += Math.floor(rand * 8) + 4
        } else if (currentProgress < 75) {
          currentProgress += Math.floor(rand * 4) + 1
        } else if (currentProgress < 99) {
          currentProgress += Math.floor(rand * 2) + 0.5
        } else {
          currentProgress = 100
        }

        const nextProgress = Math.min(Math.floor(currentProgress), 100)
        setProgress(nextProgress)

        if (nextProgress === 100) {
          clearInterval(intervalId)
          // Brief pause for visual check, then unblock scroll and slide out loader
          setTimeout(() => {
            setIsComplete(true)
            document.body.style.overflow = ''
          }, 350)
        }
      }, 40)
    }

    startLoading()

    return () => {
      clearInterval(intervalId)
      document.body.style.overflow = ''
    }
  }, [])

  const handleAnimationComplete = () => {
    setShouldRender(false)
  }

  if (!shouldRender) return null

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isComplete && (
        <motion.div
          key="welcome-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black"
          style={{ zIndex: 99999 }} // Overlay above navbar and layout layers
        >
          {/* Loader Centered Box */}
          <div className="flex flex-col items-center">
            {/* Wordmark logo */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[var(--font-heading)] font-bold text-3xl sm:text-4xl tracking-[0.25em] text-white text-center"
            >
              ARSHAL
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-white mt-1.5"
            >
              AI Developer Portfolio
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-40 h-[1.5px] bg-neutral-900 rounded-full overflow-hidden mt-8 relative">
              <motion.div
                className="h-full bg-[var(--color-primary)] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage count indicator */}
            <span className="font-mono text-[10px] text-neutral-500 mt-3 select-none">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
