'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate progress while resources load
    let frame: number
    let start: number | null = null
    const duration = 1800 // ms

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)

      if (pct < 100) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    // Dismiss after window load + a minimum display time
    const minDisplay = 2000
    const dismiss = () => {
      const elapsed = start ? Date.now() - start : minDisplay
      const remaining = Math.max(minDisplay - elapsed, 0)
      setTimeout(() => {
        setProgress(100)
        setTimeout(() => setLoading(false), 400)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    // Safety: force dismiss after 5s
    const safety = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setLoading(false), 400)
    }, 5000)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(safety)
      window.removeEventListener('load', dismiss)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0518]"
        >
          {/* Background glow orbs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D72444]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#7C3AED]/8 rounded-full blur-[100px]" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/sdasms-logo.png"
                alt="SDASMS"
                className="h-12 sm:h-16 w-auto"
              />
            </motion.div>

            {/* Spinning ring */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative w-12 h-12"
            >
              {/* Outer ring - spinning */}
              <div className="absolute inset-0 rounded-full border-[3px] border-white/[0.06]" />
              <div
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#D72444] border-r-[#FF8340]"
                style={{ animation: 'preloader-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
              />
              {/* Inner dot pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full bg-[#D72444]"
                  style={{ animation: 'preloader-pulse 1.5s ease-in-out infinite' }}
                />
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 180 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-[180px] h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D72444] via-[#FF8340] to-[#7C3AED]"
                  style={{ width: `${progress}%`, transition: 'width 0.15s ease-out' }}
                />
              </div>
              <span className="text-white/20 text-[10px] font-semibold uppercase tracking-[0.2em]">
                Loading
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
