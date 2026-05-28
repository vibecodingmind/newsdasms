'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageSquare, Clock, ShieldCheck } from 'lucide-react'

/* ─── Device Fingerprint Generation ─────────────────────── */

function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') return ''

  // Build a fingerprint from browser characteristics that are hard to spoof
  const components: string[] = []

  // Screen characteristics
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`)

  // Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // Language
  components.push(navigator.language)

  // Platform
  components.push(navigator.platform)

  // Hardware concurrency (CPU cores)
  components.push(String(navigator.hardwareConcurrency || 0))

  // Device memory (if available)
  const nav = navigator as Navigator & { deviceMemory?: number }
  components.push(String(nav.deviceMemory || 0))

  // Max touch points
  components.push(String(navigator.maxTouchPoints || 0))

  // Canvas fingerprint (lightweight)
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('SDASMS_FP', 2, 2)
      components.push(canvas.toDataURL().slice(-50))
    }
  } catch {
    components.push('no-canvas')
  }

  // WebGL renderer
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        components.push((gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      }
    }
  } catch {
    components.push('no-webgl')
  }

  // Combine and hash
  const raw = components.join('|||')
  return simpleHash(raw)
}

function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36) + '-' + simpleHash2(str)
}

function simpleHash2(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

/* ─── Storage Keys ──────────────────────────────────────── */

const STORAGE_KEY = 'sdasms-free-sends'
const FINGERPRINT_KEY = 'sdasms-device-fp'
const MAX_FREE_SENDS = 3
const WINDOW_MS = 72 * 60 * 60 * 1000 // 72 hours

interface SendRecord {
  timestamp: number
  fingerprint: string
}

interface FreeSendsState {
  sends: SendRecord[]
  fingerprint: string
}

/* ─── Get or Create Fingerprint ─────────────────────────── */

function getOrCreateFingerprint(): string {
  if (typeof window === 'undefined') return ''

  // Try to get existing fingerprint (persisted in localStorage)
  const existing = localStorage.getItem(FINGERPRINT_KEY)
  if (existing) return existing

  // Generate new fingerprint and persist it
  const fp = generateDeviceFingerprint()
  localStorage.setItem(FINGERPRINT_KEY, fp)
  return fp
}

/* ─── Get Valid Sends (within 72hr window) ──────────────── */

function getValidSends(fingerprint: string): SendRecord[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const data: FreeSendsState = JSON.parse(stored)
    const now = Date.now()
    const cutoff = now - WINDOW_MS

    // Filter sends within the 72hr window AND matching fingerprint
    return data.sends.filter(
      (send) => send.timestamp > cutoff && send.fingerprint === fingerprint
    )
  } catch {
    return []
  }
}

/* ─── Record a Send ─────────────────────────────────────── */

function recordSend(fingerprint: string): void {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const data: FreeSendsState = stored
      ? JSON.parse(stored)
      : { sends: [], fingerprint }

    const now = Date.now()
    const cutoff = now - WINDOW_MS

    // Clean up expired sends
    data.sends = data.sends.filter((send) => send.timestamp > cutoff)

    // Add new send
    data.sends.push({ timestamp: now, fingerprint })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage might be full or blocked
  }
}

/* ─── Component ─────────────────────────────────────────── */

export default function FreeSendsTracker({ onSendsChange }: { onSendsChange?: (remaining: number, fingerprint: string) => void }) {
  const [remaining, setRemaining] = useState(MAX_FREE_SENDS)
  const [fingerprint, setFingerprint] = useState('')
  const [resetIn, setResetIn] = useState('')
  const [mounted, setMounted] = useState(false)

  const refreshState = useCallback(() => {
    const fp = getOrCreateFingerprint()
    setFingerprint(fp)
    const validSends = getValidSends(fp)
    const newRemaining = Math.max(0, MAX_FREE_SENDS - validSends.length)
    setRemaining(newRemaining)
    onSendsChange?.(newRemaining, fp)

    // Calculate time until oldest send expires
    if (validSends.length > 0) {
      const oldest = Math.min(...validSends.map((s) => s.timestamp))
      const resetAt = oldest + WINDOW_MS
      const diff = resetAt - Date.now()
      if (diff > 0) {
        const hours = Math.floor(diff / (60 * 60 * 1000))
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
        setResetIn(`${hours}h ${minutes}m`)
      } else {
        setResetIn('')
      }
    } else {
      setResetIn('')
    }
  }, [onSendsChange])

  useEffect(() => {
    setMounted(true)
    refreshState()

    // Refresh every minute
    const interval = setInterval(refreshState, 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshState])

  // Expose recordSend function via a global so other components can call it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as Record<string, unknown>).__sdasms_record_send = () => {
        const fp = getOrCreateFingerprint()
        recordSend(fp)
        refreshState()
      }
      ;(window as Record<string, unknown>).__sdasms_fingerprint = fingerprint
    }
  }, [fingerprint, refreshState])

  if (!mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-white/10 rounded-xl p-4 h-20" />
    )
  }

  const usedCount = MAX_FREE_SENDS - remaining
  const isExhausted = remaining === 0

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
        isExhausted
          ? 'border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-900/10'
          : 'border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-900/10'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare
              className={`w-4 h-4 ${
                isExhausted ? 'text-red-500' : 'text-green-500'
              }`}
            />
            <span
              className={`text-sm font-bold ${
                isExhausted
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-green-700 dark:text-green-400'
              }`}
            >
              {remaining} of {MAX_FREE_SENDS} free sends remaining
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400 dark:text-white/40" />
            <span className="text-[10px] font-medium text-gray-400 dark:text-white/40">
              Anti-bypass
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isExhausted
                ? 'bg-red-500'
                : remaining === 1
                  ? 'bg-[#FF8340]'
                  : 'bg-green-500'
            }`}
            style={{ width: `${(remaining / MAX_FREE_SENDS) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-gray-400 dark:text-white/40" />
            <span className="text-[11px] text-gray-500 dark:text-white/50">
              {isExhausted
                ? resetIn
                  ? `Resets in ${resetIn}`
                  : 'Limit reached — upgrade to send more'
                : `Resets every 72 hours`}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 dark:text-white/40">
            {usedCount}/{MAX_FREE_SENDS} used
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Utility: Get fingerprint for API calls ────────────── */

export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return ''
  return getOrCreateFingerprint()
}

/* ─── Utility: Record a send from outside component ─────── */

export function recordFreeSend(): void {
  if (typeof window === 'undefined') return
  const fp = getOrCreateFingerprint()
  recordSend(fp)
}
