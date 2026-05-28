'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface PageHeroProps {
  badge?: { icon: ReactNode; text: string }
  title: string
  titleAccent?: string
  subtitle: string
  accentColor?: string
  nextSectionBg?: 'light' | 'white'
}

export default function PageHero({
  badge,
  title,
  titleAccent,
  subtitle,
  accentColor = '#D72444',
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white dark:bg-[#0D0B1A] overflow-hidden">
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}80, transparent)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb-style badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}08`,
                borderColor: `${accentColor}18`,
              }}
            >
              {badge.icon}
              {badge.text}
              <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left: Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-[1.08] tracking-tight">
              {title}
              {titleAccent && (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #FF8340)` }}
                >
                  {' '}{titleAccent}
                </span>
              )}
            </h1>
          </motion.div>

          {/* Right: Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-md leading-relaxed lg:text-right lg:pb-1"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 h-px origin-left"
          style={{ background: `linear-gradient(to right, ${accentColor}40, ${accentColor}15, transparent)` }}
        />
      </div>
    </section>
  )
}
