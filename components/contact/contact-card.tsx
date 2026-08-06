'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ContactCard() {
  const shouldReduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !message) return

    const formattedMessage = `Hi Arshal, my name is ${name}.\n\n${message}`
    const whatsappUrl = `https://wa.me/919895919742?text=${encodeURIComponent(formattedMessage)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      className={[
        'relative flex flex-col gap-6 p-8 sm:p-10 rounded-[var(--radius-2xl)]',
        'border border-[var(--color-border-subtle)] bg-[hsl(0,0%,4%,0.4)] backdrop-blur-md',
        'shadow-[var(--shadow-xl)]',
        'before:absolute before:inset-x-0 before:top-0 before:h-px',
        'before:bg-gradient-to-r before:from-transparent',
        'before:via-[var(--color-border)] before:to-transparent',
        'before:rounded-t-[var(--radius-2xl)]',
      ].join(' ')}
    >
      {/* Schematic glow indicator */}
      <div
        aria-hidden="true"
        className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 bg-[var(--color-primary)] blur-xl pointer-events-none"
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[var(--color-text)]">Send a Message</h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Fill out the details below to chat with me directly on WhatsApp.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[hsl(0,0%,0%,0.5)] text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300"
          />
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            placeholder="Hey Arshal, I'd love to chat about..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[hsl(0,0%,0%,0.5)] text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300 min-h-[120px] resize-y"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        rightIcon={
          <motion.span
            animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        }
        className="text-xs font-semibold uppercase tracking-wider shadow-[var(--shadow-glow-primary)] hover:shadow-[0_8px_24px_rgba(79,126,247,0.3)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-2"
      >
        Send on WhatsApp
      </Button>
    </motion.form>
  )
}

export default ContactCard
