'use client'

import { useEffect, useState } from 'react'

interface ScrambleTextProps {
  /** The final text to display. */
  text: string
  /** Delay in milliseconds before the scrambling animation begins. */
  delay?: number
  /** Duration in milliseconds of the animation. */
  duration?: number
  /** Speed of character changes in milliseconds. */
  scrambleSpeed?: number
}

const CHARS = 'ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijkmnopqrstuvwxyz0123456789$#@%&'

export function ScrambleText({
  text,
  delay = 0,
  duration = 800,
  scrambleSpeed = 30,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    let active = true
    let intervalId: NodeJS.Timeout

    const startScramble = () => {
      const startTime = Date.now()

      intervalId = setInterval(() => {
        const timeElapsed = Date.now() - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Calculate how many characters are resolved
        const resolvedCount = Math.floor(text.length * progress)

        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < resolvedCount) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        if (active) {
          setDisplayText(scrambled)
        }

        if (progress >= 1) {
          clearInterval(intervalId)
          if (active) {
            setDisplayText(text)
          }
        }
      }, scrambleSpeed)
    }

    // Immediately upon client mount, show initial scrambled characters
    const initialScrambled = text
      .split('')
      .map((char) => (char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('')

    // Defer setting the initial scrambled characters to avoid synchronous state warning in effect body
    const initialTimeoutId = setTimeout(() => {
      if (active) {
        setDisplayText(initialScrambled)
      }
    }, 0)

    // Trigger the scramble progression after the specified delay
    const animationTimeoutId = setTimeout(startScramble, delay)

    return () => {
      active = false
      clearTimeout(initialTimeoutId)
      clearTimeout(animationTimeoutId)
      clearInterval(intervalId)
    }
  }, [text, delay, duration, scrambleSpeed])

  // SSR renders the final text for SEO. The client hydrates and animates.
  return <span aria-label={text}>{displayText}</span>
}
