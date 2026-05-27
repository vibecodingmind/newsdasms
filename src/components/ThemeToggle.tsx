'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // Check stored preference or default to dark
    const stored = localStorage.getItem('sdasms-theme')
    if (stored === 'light') {
      setDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('sdasms-theme', 'light')
      setDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('sdasms-theme', 'dark')
      setDark(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF8340]/40"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`w-5 h-5 absolute transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-[#FF8340]`} />
      <Moon className={`w-5 h-5 absolute transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-gray-700 dark:text-white/70`} />
    </button>
  )
}
