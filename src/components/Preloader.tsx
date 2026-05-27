'use client'

import { useState, useEffect } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const dismiss = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 500) // match CSS transition
    }

    if (document.readyState === 'complete') {
      const t = setTimeout(dismiss, 600)
      return () => clearTimeout(t)
    }

    window.addEventListener('load', dismiss, { once: true })
    const safety = setTimeout(dismiss, 4000)
    return () => {
      clearTimeout(safety)
      window.removeEventListener('load', dismiss)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      id="sdasms-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0B0518',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {/* Spinning circle with texting icon inside */}
        <div style={{ position: 'relative', width: 56, height: 56 }}>
          {/* Spinning ring */}
          <div className="preloader-ring" style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#D72444',
            borderRightColor: '#FF8340',
          }} />
          {/* Text message icon in center */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle className="preloader-dot1" cx="8" cy="10" r="1" fill="rgba(255,255,255,0.7)" stroke="none" />
              <circle className="preloader-dot2" cx="12" cy="10" r="1" fill="rgba(255,255,255,0.7)" stroke="none" />
              <circle className="preloader-dot3" cx="16" cy="10" r="1" fill="rgba(255,255,255,0.7)" stroke="none" />
            </svg>
          </div>
        </div>
        <span style={{
          color: 'rgba(255,255,255,0.2)',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
        }}>
          Loading
        </span>
      </div>

      {/* Scoped animations via global style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .preloader-ring {
          animation: sdasms-preloader-spin 0.9s linear infinite;
        }
        .preloader-dot1 {
          animation: sdasms-preloader-blink 1.4s ease-in-out infinite;
        }
        .preloader-dot2 {
          animation: sdasms-preloader-blink 1.4s ease-in-out 0.2s infinite;
        }
        .preloader-dot3 {
          animation: sdasms-preloader-blink 1.4s ease-in-out 0.4s infinite;
        }
        @keyframes sdasms-preloader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sdasms-preloader-blink {
          0%, 60%, 100% { opacity: 0.2; }
          30% { opacity: 1; }
        }
      `}} />
    </div>
  )
}
