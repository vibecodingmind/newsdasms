'use client'

import { useSyncExternalStore, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'

const CONSENT_KEY = 'sdasms_cookie_consent'

/* ─── External store helpers for useSyncExternalStore ─── */

function getConsentSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

function getServerConsentSnapshot(): string | null {
  return null
}

function consentSubscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('consent-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('consent-change', callback)
  }
}

/* ─── Component ─── */

export default function CookieConsent() {
  const consent = useSyncExternalStore(consentSubscribe, getConsentSnapshot, getServerConsentSnapshot)
  const visible = consent === null

  const setConsentAndNotify = useCallback((value: string) => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // silent fail
    }
    // Dispatch custom event so useSyncExternalStore re-reads the snapshot
    window.dispatchEvent(new Event('consent-change'))
  }, [])

  const handleAccept = () => {
    setConsentAndNotify('accepted')
  }

  const handleDecline = () => {
    setConsentAndNotify('declined')
  }

  const handleDismiss = () => {
    setConsentAndNotify('dismissed')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1A0A2E] border-t border-gray-200 dark:border-white/10 shadow-2xl"
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Icon + Text */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#D72444]/10 dark:bg-[#D72444]/15 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-[#D72444]" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed pt-2">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                  <Link
                    href="/policies/cookies-policy"
                    className="text-[#D72444] hover:underline font-medium"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-500 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#D72444] hover:bg-[#E03355] shadow-lg shadow-[#D72444]/20 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
