'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Menu,
  ChevronDown,
  MessageSquare,
  Radio,
  Mail,
  Image,
  Mic,
  Headphones,
  Phone,
  Smartphone,
  MessageCircle,
  Instagram,
  Zap,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import ThemeToggle from '@/components/ThemeToggle'

/* ─── Product Data ──────────────────────────────────────────── */

const PRODUCT_CHANNELS = [
  { icon: MessageSquare, label: 'SMS', desc: 'Reach millions instantly', href: '/products/sms', color: '#D72444' },
  { icon: Radio, label: 'RCS', desc: 'Rich messaging experience', href: '/products/rcs', color: '#8B5CF6' },
  { icon: Mail, label: 'Email', desc: 'Scale your email campaigns', href: '/products/email', color: '#F59E0B' },
  { icon: Image, label: 'MMS', desc: 'Send images & media', href: '/products/mms', color: '#10B981' },
  { icon: Mic, label: 'Voice', desc: 'Voice broadcasts at scale', href: '/products/voice', color: '#EF4444' },
  { icon: Headphones, label: 'Live Chat', desc: 'Real-time conversations', href: '/products/live-chat', color: '#06B6D4' },
]

const PRODUCT_APIS = [
  { icon: Phone, label: 'WhatsApp API', desc: 'Business messaging at scale', href: '/products/whatsapp', color: '#25D366' },
  { icon: Smartphone, label: 'Viber for Business', desc: 'Connect on Viber', href: '/products/viber', color: '#7360F2' },
  { icon: MessageCircle, label: 'Messenger API', desc: 'Facebook integration', href: '/products/messenger', color: '#0084FF' },
  { icon: Instagram, label: 'Instagram API', desc: 'DM automation', href: '/products/instagram', color: '#E4405F' },
]

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Coverage', href: '/coverage' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'API Docs', href: '/api-docs' },
]

/* ─── Header Component ─────────────────────────────────────── */

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 250)
  }

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'dark:bg-[#460544]/95 bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/sdasms-logo.png"
              alt="SDASMS Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {/* Products — Mega Menu Trigger */}
            <div
              ref={megaRef}
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <button
                aria-label="Products menu"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-sm transition-all duration-300 font-medium ${
                  megaOpen
                    ? 'text-[#FF8340]'
                    : 'dark:text-white text-gray-800 hover:text-[#FF8340]'
                }`}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    megaOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* ─── Mega Menu ──────────────────────────────── */}
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[820px] rounded-2xl overflow-hidden"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    {/* Light clean background */}
                    <div className="bg-white dark:bg-[#1A0A2E] border border-gray-200/80 dark:border-white/10 shadow-xl shadow-black/8 rounded-2xl">

                      <div className="relative z-10">
                        {/* Top bar with label */}
                        <div className="flex items-center justify-between px-7 pt-6 pb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D72444]" />
                            <span className="text-gray-400 dark:text-white/50 text-[11px] font-semibold uppercase tracking-widest">
                              Products & Integrations
                            </span>
                          </div>
                        </div>

                        {/* Main grid: 3 columns */}
                        <div className="grid grid-cols-[1fr_1fr_220px] gap-0">
                          {/* Column 1 — Channels */}
                          <div className="px-5 pb-6 border-r border-gray-100 dark:border-white/10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 dark:text-white/30 dark:text-white/30 mb-4 px-2">
                              Channels
                            </p>
                            <div className="space-y-0.5">
                              {PRODUCT_CHANNELS.map((item, i) => (
                                <motion.a
                                  key={item.label}
                                  href={item.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04, duration: 0.2 }}
                                  className="group/item flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover/item:scale-105"
                                    style={{ backgroundColor: `${item.color}10` }}
                                  >
                                    <item.icon
                                      className="w-[18px] h-[18px] transition-colors duration-200"
                                      style={{ color: item.color }}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-sm font-semibold text-gray-800 group-hover/item:text-[#D72444] transition-colors block">
                                      {item.label}
                                    </span>
                                    <span className="text-[11px] text-gray-400 group-hover/item:text-gray-500 transition-colors block leading-tight">
                                      {item.desc}
                                    </span>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* Column 2 — Business APIs */}
                          <div className="px-5 pb-6 border-r border-gray-100 dark:border-white/10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 dark:text-white/30 mb-4 px-2">
                              Business APIs
                            </p>
                            <div className="space-y-0.5">
                              {PRODUCT_APIS.map((item, i) => (
                                <motion.a
                                  key={item.label}
                                  href={item.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15 + i * 0.04, duration: 0.2 }}
                                  className="group/item flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover/item:scale-105"
                                    style={{ backgroundColor: `${item.color}10` }}
                                  >
                                    <item.icon
                                      className="w-[18px] h-[18px] transition-colors duration-200"
                                      style={{ color: item.color }}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-sm font-semibold text-gray-800 group-hover/item:text-[#D72444] transition-colors block">
                                      {item.label}
                                    </span>
                                    <span className="text-[11px] text-gray-400 group-hover/item:text-gray-500 transition-colors block leading-tight">
                                      {item.desc}
                                    </span>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* Column 3 — Featured promo sidebar */}
                          <div className="px-5 py-5">
                            <div className="h-full flex flex-col">
                              {/* Featured card */}
                              <div className="flex-1 bg-gradient-to-br from-[#D72444]/5 via-[#FF8340]/5 to-[#7C3AED]/5 dark:from-[#D72444]/10 dark:via-[#FF8340]/10 dark:to-[#7C3AED]/10 rounded-xl p-5 border border-gray-100 dark:border-white/10 flex flex-col justify-between">
                                <div>
                                  <div className="w-8 h-8 rounded-lg bg-[#FF8340]/10 flex items-center justify-center mb-3">
                                    <Sparkles className="w-4 h-4 text-[#FF8340]" />
                                  </div>
                                  <h4 className="text-gray-800 dark:text-white font-bold text-sm mb-1.5 leading-tight">
                                    Omnichannel Platform
                                  </h4>
                                  <p className="text-gray-400 dark:text-white/40 text-[11px] leading-relaxed">
                                    Unify all your messaging channels in one powerful dashboard.
                                  </p>
                                </div>
                                <a
                                  href="/features"
                                  className="inline-flex items-center gap-1.5 text-[#D72444] text-xs font-semibold mt-4 hover:gap-2.5 transition-all duration-300"
                                >
                                  Explore all
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                              </div>

                              {/* Quick stats */}
                              <div className="mt-4 space-y-2.5">
                                <div className="flex items-center gap-2 px-2">
                                  <Zap className="w-3 h-3 text-[#FF8340]" />
                                  <span className="text-gray-400 dark:text-white/40 text-[10px] font-medium">99.2% delivery rate</span>
                                </div>
                                <div className="flex items-center gap-2 px-2">
                                  <MessageSquare className="w-3 h-3 text-[#D72444]" />
                                  <span className="text-gray-400 dark:text-white/40 text-[10px] font-medium">10M+ messages delivered</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="px-7 py-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                          <a
                            href="/features"
                            className="group/link inline-flex items-center gap-2 text-gray-400 dark:text-white/50 hover:text-[#D72444] text-xs font-semibold transition-colors duration-200"
                          >
                            View all platform features
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center gap-1.5 bg-[#D72444] hover:bg-[#E03355] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200"
                          >
                            Get Started
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Regular nav links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors font-medium ${
                  pathname === link.href
                    ? 'text-[#FF8340]'
                    : 'dark:text-white text-gray-800 hover:text-[#FF8340]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://my.sdasms.com/login"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#FF8340] hover:text-[#FF9A5C] transition-colors px-5 py-2.5 rounded-full border border-[#FF8340]/30 hover:border-[#FF8340]/60"
            >
              <ArrowRight className="w-4 h-4" />
              Login
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#F6F6F6] bg-[#D72444] hover:bg-[#E03355] transition-colors px-5 py-2.5 rounded-[30px] shadow-lg"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 h-11 w-11">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#460544] border-white/10 w-72">
                <SheetTitle className="text-white">
                  <div className="flex items-center">
                    <img
                      src="/sdasms-logo.png"
                      alt="SDASMS Logo"
                      className="h-8 w-auto"
                    />
                  </div>
                </SheetTitle>
                <nav aria-label="Mobile navigation" className="flex flex-col gap-1 mt-6">
                  {/* Products — Mobile Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileProductsOpen((v) => !v)}
                      className="w-full flex items-center justify-between transition-colors font-medium px-3 py-3 rounded-lg hover:bg-white/5 text-white"
                    >
                      <span>Products</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          mobileProductsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pb-2 space-y-0.5">
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 pt-2 pb-1">
                              Channels
                            </p>
                            {PRODUCT_CHANNELS.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setOpen(false)}
                              >
                                <div
                                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: `${item.color}20` }}
                                >
                                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                                </div>
                                <div>
                                  <span className="text-white/80 text-sm font-medium block">{item.label}</span>
                                  <span className="text-white/25 text-[10px]">{item.desc}</span>
                                </div>
                              </a>
                            ))}
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 pt-3 pb-1">
                              Business APIs
                            </p>
                            {PRODUCT_APIS.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setOpen(false)}
                              >
                                <div
                                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: `${item.color}20` }}
                                >
                                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                                </div>
                                <div>
                                  <span className="text-white/80 text-sm font-medium block">{item.label}</span>
                                  <span className="text-white/25 text-[10px]">{item.desc}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Regular nav links */}
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`transition-colors font-medium px-3 py-3 rounded-lg hover:bg-white/5 ${
                        pathname === link.href
                          ? 'text-[#FF8340]'
                          : 'text-white hover:text-sda-accent'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/about"
                    className={`transition-colors font-medium px-3 py-3 rounded-lg hover:bg-white/5 ${
                      pathname === '/about'
                        ? 'text-[#FF8340]'
                        : 'text-white hover:text-sda-accent'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className={`transition-colors font-medium px-3 py-3 rounded-lg hover:bg-white/5 ${
                      pathname === '/contact'
                        ? 'text-[#FF8340]'
                        : 'text-white hover:text-sda-accent'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
                  <a
                    href="https://my.sdasms.com/login"
                    className="inline-flex items-center justify-center gap-1 text-sm font-medium text-[#FF8340] border border-[#FF8340]/30 rounded-full px-5 py-2.5 hover:bg-[#FF8340]/10"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Login
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-[#F6F6F6] bg-[#D72444] hover:bg-[#E03355] transition-colors px-5 py-2.5 rounded-[30px]"
                  >
                    Get Started
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
