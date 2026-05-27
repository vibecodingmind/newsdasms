'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Link2,
  Megaphone,
  Lightbulb,
  Target,
  Globe,
  DollarSign,
  Headphones,
  Smartphone,
  Star,
  Quote,
  ChevronRight,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  TrendingUp,
  Clock,
  BarChart3,
  Lock,
  MessageSquare,
  ChevronDown,
  Bell,
  Rocket,
  Flame,
  Globe2,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'
import { DEMO_API_TOKEN, SDASMS_API_URL } from '@/lib/config'

/* ─── Data ─────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Link2,
    title: 'Connect',
    description: 'Initiate communication and establish meaningful contact with your audience.',
  },
  {
    icon: Megaphone,
    title: 'Engage',
    description: 'Foster active participation and interaction with your message or content.',
  },
  {
    icon: Lightbulb,
    title: 'Inspire',
    description: 'Uplift hearts, strengthen faith, and bring hope through every message.',
  },
  {
    icon: Target,
    title: 'Convert',
    description: 'Encourage your audience to become actively involved and committed to the mission.',
  },
]

const WHY_CHOOSE = [
  {
    icon: DollarSign,
    title: 'Pricing',
    description:
      'We provide lowest pricing, no sms service provider in text messaging industry is in our competition.',
  },
  {
    icon: Globe,
    title: 'Coverage',
    description:
      'We deliver bulk SMS services to 100% of the country regions. Best coverage guaranteed.',
  },
  {
    icon: Headphones,
    title: 'Support',
    description:
      'Our Support Team available any time for your text marketing needs to help you.',
  },
  {
    icon: Smartphone,
    title: 'User Friendly',
    description:
      'Specialized User Interface helps you work quickly and effectively for your text blast campaigns.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Pastor James',
    country: 'Kenya',
    text: 'SDASMS has transformed our ministry! Now, we can reach our congregation instantly and keep them engaged with daily devotionals.',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/review1.jpg',
    metric: '+45% engagement',
  },
  {
    name: 'Evangelist Grace',
    country: 'Nigeria',
    text: 'The reliability of SDASMS is unmatched. Our church events and announcements are delivered on time, every time!',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/review2.jpg',
    metric: '3x faster outreach',
  },
  {
    name: 'Brother Samuel',
    country: 'South Africa',
    text: 'As an evangelist, I needed a simple and effective way to share the Gospel. SDASMS made it possible with their flexible messaging platform.',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/review3.jpg',
    metric: '10K+ messages/month',
  },
  {
    name: 'Pastor Daniel',
    country: 'Uganda',
    text: 'We love the Pay-As-You-Go option! It gives us full control over our messaging costs while ensuring effective outreach.',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/headshot-successful-smiling-cheerful-african-600nw-567772042.webp',
    metric: '60% cost savings',
  },
  {
    name: 'Sister Rebecca',
    country: 'Ghana',
    text: 'The customer support is excellent! The team at SDASMS helped us integrate the system seamlessly into our church communication.',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/study-highlights-barriers-black-women-face-in-corporate-america.jpg',
    metric: '99.5% delivery rate',
  },
  {
    name: 'Evangelist John',
    country: 'Tanzania',
    text: 'With SDASMS, we can now send inspirational messages and prayer reminders to thousands of members effortlessly. A game-changer!',
    rating: 5,
    avatar: 'https://sdasms.com/wp-content/uploads/2025/03/review4.jpg',
    metric: '2x member retention',
  },
]

const USE_CASES = [
  { icon: Megaphone, title: 'Church Announcements', description: 'Keep your congregation informed about service times, schedule changes, and important church updates with instant SMS delivery.' },
  { icon: Lightbulb, title: 'Prayer & Devotional Messages', description: 'Share daily devotionals, prayer requests, and inspirational scripture verses to uplift and strengthen faith within your community.' },
  { icon: Bell, title: 'Event & Conference Promotion', description: 'Drive attendance to church events, conferences, and retreats with targeted SMS campaigns and timely reminders.' },
  { icon: TrendingUp, title: 'Donation & Fundraising Campaigns', description: 'Mobilize your community for giving campaigns, tithe reminders, and special fundraising initiatives with personalized messages.' },
  { icon: Users, title: 'Member Follow-Ups', description: 'Reach out to new visitors, follow up with absent members, and maintain meaningful connections through personalized SMS outreach.' },
  { icon: Zap, title: 'Emergency & Urgent Alerts', description: 'Send time-sensitive alerts for emergencies, cancellations, or critical updates to ensure your community stays safe and informed.' },
]

const FAQ_ITEMS = [
  { question: 'What is bulk SMS and how does it work?', answer: 'Bulk SMS is a service that allows you to send large volumes of text messages to multiple recipients simultaneously. It works through an SMS gateway that connects your application to mobile networks, ensuring fast and reliable delivery to your audience.' },
  { question: 'How reliable is SDASMS for message delivery?', answer: 'SDASMS provides industry-leading delivery rates of 99.2%. We have direct connections to local networks across Africa, ensuring your messages reach their destination quickly and reliably without intermediary delays.' },
  { question: 'What are the pricing options available?', answer: 'SDASMS offers flexible pricing models including Pay-As-You-Go for occasional senders and volume-based discounts for organizations with larger messaging needs. There are no hidden fees and you only pay for what you use.' },
  { question: 'Can I schedule messages for later delivery?', answer: 'Yes! SDASMS supports message scheduling, allowing you to compose messages now and send them at the optimal time. This is perfect for time-sensitive announcements, event reminders, and coordinated campaigns.' },
  { question: 'Is there an API available for integration?', answer: 'Absolutely. SDASMS provides a robust REST API with comprehensive documentation, SDKs for popular programming languages, and webhook support. You can integrate SMS capabilities into your existing applications in minutes.' },
  { question: 'Which African countries does SDASMS cover?', answer: 'SDASMS covers all major African regions including Kenya, Nigeria, South Africa, Uganda, Ghana, Tanzania, and many more. Our direct network connections ensure reliable delivery across the continent.' },
  { question: 'How do I get started with SDASMS?', answer: 'Getting started is simple: create a free account, add credits or choose a pricing plan, import your contacts, and start sending messages immediately. Our intuitive dashboard makes the entire process straightforward.' },
  { question: 'Is my data secure with SDASMS?', answer: 'Yes, SDASMS takes data security seriously. We use end-to-end encryption, comply with data protection regulations, and never share your contact lists with third parties. Your data remains yours at all times.' },
]

const ADVANCED_FEATURES_TABS = [
  {
    id: 'personalization',
    icon: Megaphone,
    title: 'Personalization',
    description: 'Customize every message with dynamic fields to create a personal connection with each recipient.',
    bullets: [
      'Dynamic field substitution for names, dates, and more',
      'Segmented messaging for targeted outreach',
      'Custom sender IDs for brand recognition',
      'Template library for quick message creation',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    description: 'Set up automated workflows that send the right message at the right time without manual intervention.',
    bullets: [
      'Auto-response triggers for incoming messages',
      'Drip campaign sequences for onboarding',
      'Event-driven messaging workflows',
      'API-triggered automated alerts',
    ],
  },
  {
    id: 'scheduling',
    icon: Clock,
    title: 'Scheduling',
    description: 'Plan ahead and schedule messages to be delivered at the perfect time for maximum impact.',
    bullets: [
      'Schedule messages for optimal delivery times',
      'Timezone-aware scheduling for international reach',
      'Recurring message setup for regular communications',
      'Queue management for bulk scheduled sends',
    ],
  },
  {
    id: 'two-way',
    icon: MessageSquare,
    title: 'Two-Way SMS',
    description: 'Enable real-time conversations with your audience through inbound and outbound messaging.',
    bullets: [
      'Receive replies directly in your dashboard',
      'Auto-forward responses to email or webhook',
      'Conversation threading and history',
      'Keyword-based automated responses',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track delivery rates, engagement, and campaign performance with comprehensive analytics.',
    bullets: [
      'Real-time delivery status tracking',
      'Campaign performance dashboards',
      'Click-through rate monitoring for links',
      'Export reports for further analysis',
    ],
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Security',
    description: 'Enterprise-grade security measures to protect your data and ensure compliant messaging.',
    bullets: [
      'End-to-end encryption for all messages',
      'GDPR and data protection compliance',
      'Two-factor authentication for accounts',
      'Audit logs for all account activity',
    ],
  },
]

const TRUSTED_LOGOS = [
  { src: '/logo-awr.png', alt: 'AWR 360' },
  { src: '/logo-bb.png', alt: 'Soma Biblia' },
  { src: '/logo-adra.png', alt: 'ADRA' },
  { src: '/logo-onevoice27.png', alt: 'OneVoice27', large: true },
  { src: '/logo-sdas-church.png', alt: 'SDAS Church' },
]

/* ─── Hero Section with Quick Send Widget ──────────────────── */

function HeroSection() {
  const [senderId, setSenderId] = useState('SDASMS')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)
  const [charCount, setCharCount] = useState(0)
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)
  const [cooldownMinutes, setCooldownMinutes] = useState(0)

  const MAX_USER_CHARS = 60
  const MAX_ATTEMPTS = 3
  const COOLDOWN_MS = 60 * 60 * 1000 // 1 hour
  const SMS_FOOTER = '\nHello! This is a sample SMS from SDASMS. Try sending one now!'
  const FOOTER_LEN = SMS_FOOTER.length
  const TOTAL_SMS_LEN = charCount + FOOTER_LEN
  const SMS_LIMIT = 160

  // Check attempts on mount
  useEffect(() => {
    checkAttempts()
  }, [])

  const checkAttempts = () => {
    try {
      const stored = localStorage.getItem('sdasms_send_attempts')
      if (stored) {
        const data = JSON.parse(stored) as { timestamps: number[] }
        const now = Date.now()
        // Filter out attempts older than 1 hour
        const validAttempts = data.timestamps.filter((t: number) => now - t < COOLDOWN_MS)
        localStorage.setItem('sdasms_send_attempts', JSON.stringify({ timestamps: validAttempts }))
        const remaining = MAX_ATTEMPTS - validAttempts.length
        setAttemptsLeft(remaining)
        if (remaining <= 0 && validAttempts.length > 0) {
          const oldestInWindow = validAttempts[0]
          const minsLeft = Math.ceil((COOLDOWN_MS - (now - oldestInWindow)) / 60000)
          setCooldownMinutes(minsLeft)
        } else {
          setCooldownMinutes(0)
        }
      } else {
        setAttemptsLeft(MAX_ATTEMPTS)
      }
    } catch {
      setAttemptsLeft(MAX_ATTEMPTS)
    }
  }

  const recordAttempt = () => {
    try {
      const stored = localStorage.getItem('sdasms_send_attempts')
      let timestamps: number[] = []
      if (stored) {
        const data = JSON.parse(stored) as { timestamps: number[] }
        timestamps = data.timestamps.filter((t: number) => Date.now() - t < COOLDOWN_MS)
      }
      timestamps.push(Date.now())
      localStorage.setItem('sdasms_send_attempts', JSON.stringify({ timestamps }))
      setAttemptsLeft(MAX_ATTEMPTS - timestamps.length)
      if (MAX_ATTEMPTS - timestamps.length <= 0) {
        const oldestInWindow = timestamps[0]
        const minsLeft = Math.ceil((COOLDOWN_MS - (Date.now() - oldestInWindow)) / 60000)
        setCooldownMinutes(minsLeft)
      }
    } catch {
      // silent fail
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= MAX_USER_CHARS) {
      setMessage(val)
      setCharCount(val.length)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Only allow digits
    if (/^\d*$/.test(val)) {
      setPhoneNumber(val)
    }
  }

  const formatPhoneDisplay = (raw: string) => {
    if (!raw) return ''
    // If starts with 255, format as +255 XXX XXX XXX
    if (raw.startsWith('255')) {
      const rest = raw.slice(3)
      if (rest.length <= 3) return `+255 ${rest}`
      if (rest.length <= 6) return `+255 ${rest.slice(0, 3)} ${rest.slice(3)}`
      return `+255 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 9)}`
    }
    return raw
  }

  const handleSend = async () => {
    if (!phoneNumber || !message) {
      setSendResult({ success: false, message: 'Please fill in all fields' })
      return
    }

    // Build full international number: prepend "255" if user entered local 9-digit number
    let fullNumber = phoneNumber
    if (!fullNumber.startsWith('255')) {
      fullNumber = '255' + fullNumber
    }

    // Validate: must be 255 + 9 digits = 12 digits total
    if (!/^255\d{9}$/.test(fullNumber)) {
      setSendResult({ success: false, message: 'Enter a valid 9-digit Tanzanian number (e.g. 712 345 678)' })
      return
    }
    if (attemptsLeft !== null && attemptsLeft <= 0) {
      setSendResult({ success: false, message: `Limit reached. Try again in ${cooldownMinutes} min.` })
      return
    }

    setSending(true)
    setSendResult(null)

    const fullMessage = message + SMS_FOOTER

    try {
      // Call SDASMS HTTP API directly from client
      const res = await fetch(SDASMS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          api_token: DEMO_API_TOKEN,
          sender: senderId,
          recipient: fullNumber,
          message: fullMessage,
        }),
      })

      const data = await res.json()

      if (data.status === 'success') {
        recordAttempt()
        setSendResult({
          success: true,
          message: `SMS sent to +${fullNumber}! Delivered successfully.`,
        })
        setMessage('')
        setCharCount(0)
      } else {
        setSendResult({
          success: false,
          message: data.message || data.error || 'Failed to send SMS. Please try again.',
        })
      }
    } catch {
      setSendResult({ success: false, message: 'Network error. Please check your connection and try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0518]">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-[#D72444]/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[600px] h-[600px] bg-[#7C3AED]/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF8340]/3 rounded-full blur-[100px]" />
        {/* Radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(215,36,68,0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-0 sm:min-h-screen flex items-start sm:items-center pt-28 sm:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-center w-full">
          {/* Left - Text Content */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2.5 bg-[#D72444]/10 border border-[#D72444]/20 text-white/90 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full">
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#FF8340]" />
                  <Sparkles className="w-3 h-3 text-[#FF8340]" />
                </div>
                AI Powered Messaging Platform
              </span>
            </motion.div>

            {/* Hero Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                For messages
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] via-[#D72444] to-[#7C3AED] bg-clip-text text-transparent">
                  that&apos;s matter
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed"
            >
              Transform digital evangelism with every message sent. Inspire,
              uplift, and share the Gospel instantly across Africa and beyond.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 bg-[#D72444] hover:bg-[#E03355] text-white font-bold text-base px-8 py-4 rounded-full shadow-2xl shadow-[#D72444]/25 transition-all duration-300 hover:shadow-[0_0_50px_rgba(215,36,68,0.4)] hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/features"
                className="group inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300"
              >
                Explore Features
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-10"
            >
              {[
                { value: '10M+', label: 'Messages Delivered', icon: MessageSquare },
                { value: '99.2%', label: 'Delivery Rate', icon: Shield },
                { value: '5K+', label: 'Active Users', icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <stat.icon className="w-4.5 h-4.5 text-[#FF8340]" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-lg leading-none">{stat.value}</p>
                    <p className="text-white/30 text-[11px] font-medium mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>


          </div>

          {/* Right - Quick Send SMS Widget */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Multi-layer glow behind widget */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#D72444]/8 via-[#7C3AED]/5 to-[#FF8340]/8 rounded-[40px] blur-3xl" />
              <div className="absolute -inset-2 bg-gradient-to-br from-[#D72444]/5 to-[#7C3AED]/5 rounded-[32px] blur-xl" />

              <div className="relative bg-[#120A22]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
                {/* Widget Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D72444] to-[#FF8340] flex items-center justify-center shadow-lg shadow-[#D72444]/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Try Sending</h3>
                    <p className="text-white/30 text-[10px] font-medium">Send a sample text instantly</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[10px] font-semibold">Live</span>
                  </div>
                </div>

                {/* Widget Body */}
                <div className="p-6 space-y-4">
                  {/* Sender ID */}
                  <div>
                    <label className="text-white/30 text-[10px] font-bold uppercase tracking-[0.12em] mb-2 block">
                      Sender ID
                    </label>
                    <div className="relative">
                      <select
                        value={senderId}
                        onChange={(e) => setSenderId(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#D72444]/40 focus:ring-1 focus:ring-[#D72444]/20 transition-all duration-200 appearance-none cursor-pointer hover:bg-white/[0.05]"
                      >
                        <option value="SDASMS" className="bg-[#1A0A2E] text-white">SDASMS</option>
                        <option value="HARAMBEE" className="bg-[#1A0A2E] text-white">HARAMBEE</option>
                        <option value="MCHANGO" className="bg-[#1A0A2E] text-white">MCHANGO</option>
                        <option value="HARUSI" className="bg-[#1A0A2E] text-white">HARUSI</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <span className="hidden sm:inline text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-md">
                          VERIFIED
                        </span>
                        <ChevronDown className="w-4 h-4 text-white/20" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-white/30 text-[10px] font-bold uppercase tracking-[0.12em] mb-2 block">
                      Recipient Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <img
                          src="https://flagcdn.com/w20/tz.png"
                          alt="Tanzania"
                          className="w-5 h-auto rounded-sm"
                        />
                        <span className="text-white/40 text-sm font-medium">+255</span>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-[76px] pr-4 py-3 text-white text-sm font-mono placeholder-white/15 focus:outline-none focus:border-[#D72444]/40 focus:ring-1 focus:ring-[#D72444]/20 transition-all duration-200 tracking-wider hover:bg-white/[0.05]"
                        placeholder="7XX XXX XXX"
                        maxLength={9}
                      />
                    </div>
                    <p className="text-white/15 text-[10px] mt-1.5 ml-1">
                      Enter 9-digit number (e.g. 712 345 678)
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white/30 text-[10px] font-bold uppercase tracking-[0.12em]">
                        Your Message
                      </label>
                      <span className={`text-[10px] font-bold ${charCount > 50 ? 'text-[#FF8340]' : 'text-white/15'}`}>
                        {charCount}/{MAX_USER_CHARS}
                      </span>
                    </div>
                    <textarea
                      value={message}
                      onChange={handleMessageChange}
                      rows={2}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder-white/15 focus:outline-none focus:border-[#D72444]/40 focus:ring-1 focus:ring-[#D72444]/20 transition-all duration-200 resize-none leading-relaxed hover:bg-white/[0.05]"
                      placeholder="Type your message (max 60 chars)..."
                    />
                  </div>

                  {/* Result message */}
                  <AnimatePresence>
                    {sendResult && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold ${
                          sendResult.success
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}
                      >
                        {sendResult.success ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <Shield className="w-4 h-4 shrink-0" />
                        )}
                        {sendResult.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Attempts counter */}
                  {attemptsLeft !== null && attemptsLeft > 0 && (
                    <p className="text-white/15 text-[10px] text-center font-medium">
                      {attemptsLeft} of {MAX_ATTEMPTS} free sends remaining this hour
                    </p>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    disabled={sending || !phoneNumber || !message || (attemptsLeft !== null && attemptsLeft <= 0)}
                    className="w-full bg-gradient-to-r from-[#D72444] to-[#FF8340] hover:from-[#E03355] hover:to-[#FF9A5C] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-[#D72444]/20 hover:shadow-[#D72444]/40 hover:-translate-y-px active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (attemptsLeft !== null && attemptsLeft <= 0) ? (
                      <>
                        Limit reached ({cooldownMinutes}m left)
                      </>
                    ) : (
                      <>
                        SEND NOW
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Trusted By Strip ─────────────────────────────────────── */

function TrustedByStrip() {
  // Duplicate logos for seamless infinite loop
  const slidingLogos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS]

  return (
    <section className="py-14 sm:py-16 bg-[#0B0518] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-8">
          <p className="text-white/25 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
            Trusted by leading organizations
          </p>
        </FadeInWhenVisible>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-[#0B0518] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-[#0B0518] to-transparent z-10 pointer-events-none" />

        <div className="logo-marquee flex items-center gap-10 sm:gap-14 lg:gap-16 w-max">
          {slidingLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-2 py-2"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`w-auto object-contain ${logo.large ? 'h-14 sm:h-[6rem] lg:h-[9rem]' : 'h-10 sm:h-14 lg:h-16'}`.trim()}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Features Section ─────────────────────────────────────── */

function FeaturesSection() {
  return (
    <section id="feature" className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Seamless <span className="text-[#D72444]">Evangelism</span>
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
            Discover the transformative power of seamless evangelism, where the
            integration of technology meets effective communication to create a
            profound spiritual impact.
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-[#D72444]/10 flex items-center justify-center mb-5 group-hover:bg-[#D72444]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#D72444]" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─── Coverage Section ─────────────────────────────────────── */

const NETWORK_LOGOS = [
  { src: '/logo-7x.png', alt: 'Network Partner 1' },
  { src: '/logo-15x.png', alt: 'Network Partner 2' },
  { src: '/logo-1x.png', alt: 'Network Partner 3' },
  { src: '/logo-yas.png', alt: 'YAS Tanzania' },
  { src: '/logo-9x.png', alt: 'Network Partner 5' },
  { src: '/logo-10x.png', alt: 'Network Partner 6' },
  { src: '/logo-13x.png', alt: 'Network Partner 7' },
]

function CoverageSection() {
  return (
    <section id="coverage" className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInWhenVisible direction="left" className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
              Stable messaging<br />across Africa...
            </h2>
            <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              Our messaging service is directly connected to local networks in
              key regions across Africa. This direct connection ensures unmatched
              reliability, allowing you to reach your audience with confidence.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" className="order-1 lg:order-2">
            <div className="relative">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5">
                {NETWORK_LOGOS.map((logo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-center bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:border-white/10 hover:shadow-sm transition-all duration-300"
                  >
                    { }
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-full h-auto max-h-12 sm:max-h-14 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

/* ─── Use Cases Section ────────────────────────────────────── */

function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Use <span className="text-[#D72444]">Cases</span>
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
            Discover how ministries across Africa use SDASMS to connect,
            engage, and grow their communities through the power of SMS.
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((useCase) => (
            <StaggerItem key={useCase.title}>
              <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-[#460544]/10 flex items-center justify-center mb-5 group-hover:bg-[#460544]/20 transition-colors">
                  <useCase.icon className="w-7 h-7 text-[#460544]" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-4">
                  {useCase.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#D72444] text-sm font-semibold hover:gap-2 transition-all duration-300"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─── Pricing Section ──────────────────────────────────────── */

function PricingSection() {
  const RECHARGE_TIERS = [
    {
      name: 'Starter',
      volumeRange: 'Sh 1 – Sh 350,000',
      perSms: 'Sh 14',
      units: '0 – 25,000 Units',
      icon: MessageSquare,
      color: '#94A3B8',
    },
    {
      name: 'Growth',
      volumeRange: 'Sh 650,000 – Sh 1,300,000',
      perSms: 'Sh 13',
      units: '50,000 – 100,000 Units',
      icon: TrendingUp,
      color: '#F59E0B',
    },
    {
      name: 'Scale',
      volumeRange: 'Sh 3,000,000 – Sh 6,000,000',
      perSms: 'Sh 12',
      units: '250,000 – 500,000 Units',
      icon: BarChart3,
      color: '#8B5CF6',
    },
    {
      name: 'Enterprise',
      volumeRange: 'Sh 11,000,000 – Sh 55,000,000',
      perSms: 'Sh 11',
      units: '1,000,000 – 5,000,000 Units',
      icon: Globe2,
      color: '#FF8340',
    },
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white dark:bg-[#0D0B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FF8340]/10 border border-[#FF8340]/20 text-[#FF8340] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full mb-6">
            <DollarSign className="w-3.5 h-3.5" />
            Simple & Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black dark:text-white mb-6 leading-[1.1] tracking-tight">
            Pay As You <span className="text-[#D72444]">Grow</span>
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Only pay for what you use. No hidden fees, no surprises — just straightforward per-SMS pricing that scales with your ministry.
          </p>
        </FadeInWhenVisible>

        {/* Starter Pack - Wide Card */}
        <FadeInWhenVisible delay={0.1} className="mb-10 sm:mb-14">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#FF8340]/30 bg-gradient-to-r from-[#FF8340]/5 via-[#D72444]/3 to-[#FF8340]/5">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                  {/* Left - Icon + Badge + Title */}
                  <div className="flex items-center gap-5 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#FF8340]/15 border border-[#FF8340]/20 flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-[#FF8340]" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FF8340] to-[#D72444] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                        <Flame className="w-2.5 h-2.5" />
                        Best Value
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">Starter Pack</h3>
                    </div>
                  </div>

                  {/* Middle - Key details */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <div className="text-center">
                      <div className="flex items-baseline gap-1 justify-center">
                        <span className="text-[#FF8340] text-xs font-semibold uppercase tracking-wider">Tsh</span>
                        <span className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white tracking-tight">34,900</span>
                      </div>
                      <span className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium block mt-1">One-time payment</span>
                    </div>
                    <div className="w-px h-12 bg-gray-200 hidden sm:block" />
                    <div className="hidden sm:flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#FF8340]" />
                        </div>
                        <span className="text-black dark:text-white font-bold text-sm">1,000 SMS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Shield className="w-4 h-4 text-[#FF8340]" />
                        </div>
                        <span className="text-black dark:text-white font-bold text-sm">Sender ID Included</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - CTA */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#D72444]/25 transition-all duration-300 text-sm shrink-0"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                {/* Mobile-only details */}
                <div className="flex sm:hidden items-center justify-center gap-6 mt-5 pt-5 border-t border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-[#FF8340]" />
                    </div>
                    <span className="text-black dark:text-white font-bold text-sm">1,000 SMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-[#FF8340]" />
                    </div>
                    <span className="text-black dark:text-white font-bold text-sm">Sender ID Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Recharge Pricing */}
        <FadeInWhenVisible delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-[#0D0B1A] border border-gray-200 dark:border-white/10 text-[#7F7F7F] dark:text-white/50 text-xs font-semibold px-4 py-2 rounded-full mb-3">
                      <TrendingUp className="w-3.5 h-3.5 text-[#FF8340]" />
                      Recharge Pricing
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">Top-up & Save</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 text-xs font-semibold">Validity: Non Expiry</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[#D72444]/20 text-sm shrink-0"
                  >
                    Custom Pricing
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Recharge tier cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {RECHARGE_TIERS.map((tier, i) => (
                    <div
                      key={i}
                      className="group/card relative bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 dark:border-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300 shrink-0">
                          <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
                        </div>
                        {/* Tier name */}
                        <span className="text-black dark:text-white font-bold text-lg">{tier.name}</span>
                      </div>

                      {/* Price per SMS - prominent */}
                      <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-xl p-4 mb-4">
                        <span className="text-[#7F7F7F] dark:text-white/50 text-[10px] font-semibold uppercase tracking-wider block mb-1">Price per SMS</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">{tier.perSms}</span>
                          <span className="text-[#7F7F7F] dark:text-white/50 text-sm font-medium">/SMS</span>
                        </div>
                      </div>

                      {/* Units range */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium">Number of Units</span>
                          <span className="text-black dark:text-white text-xs font-semibold">{tier.units}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  )
}

/* ─── Powerful Gateway Section ──────────────────────────────── */

function PowerfulGatewaySection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Gateway Dashboard Image */}
          <FadeInWhenVisible direction="left" className="order-1">
            <div className="relative">
              { }
              <img
                src="/gateway-dashboard.png"
                alt="SDASMS Powerful Gateway Dashboard"
                className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 dark:border-white/10"
              />
            </div>
          </FadeInWhenVisible>

          {/* Right - Content */}
          <FadeInWhenVisible direction="right" className="order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
              Powerful <span className="text-[#D72444]">Gateway</span>
            </h2>
            <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              Our robust and scalable SMS gateway is engineered for high-volume
              messaging with enterprise-grade reliability and security. With direct
              connections to local networks across Africa, every message is delivered
              in under three seconds.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

/* ─── Digital Discipleship Section ─────────────────────────── */

function DigitalDiscipleshipSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInWhenVisible direction="left" className="order-2 lg:order-1">
            <Badge
              variant="outline"
              className="border-[#D72444]/30 text-[#D72444] bg-[#D72444]/5 mb-4 px-4 py-1 text-xs font-semibold tracking-widest"
            >
              DIGITAL DISCIPLESHIP
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
              Unleashing Potential
            </h2>
            <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              Empower your ministry to reach new heights by embracing messaging
              evangelism. Witness the growth of a vibrant community as
              individuals engage, share, and deepen their spiritual journey
              through digital connections.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-[#F6F6F6] font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" className="order-1 lg:order-2">
            { }
            <img
              src="/unleashing-potential.png"
              alt="SDASMS Unleashing Potential"
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 dark:border-white/10"
            />
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

/* ─── Why Choose Us Section ────────────────────────────────── */

function WhyChooseSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Why Choosing Us?
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
            We understand our customers rely on our services and expect us to
            deliver scalable and reliable services.
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#D72444]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D72444]/20 transition-colors">
                  <item.icon className="w-8 h-8 text-[#D72444]" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─── Testimonials Section ─────────────────────────────────── */

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const maxIndex = Math.max(0, TESTIMONIALS.length - itemsPerPage)

  const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const goRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))

  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            We couldn&apos;t have said it better
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-4 font-medium">
            Our customers rate us Excellent. That&apos;s an industry-leading
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-black dark:text-white text-sm font-semibold">
              4.94 from 996 reviews
            </span>
          </div>
        </FadeInWhenVisible>

        {/* Cards row with arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={goLeft}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0D0B1A] border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-black dark:text-white rotate-180" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goRight}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0D0B1A] border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-black dark:text-white" />
          </button>

          {/* Cards */}
          <div className="mx-8 sm:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, idx) => (
              <FadeInWhenVisible key={currentIndex + idx} delay={idx * 0.1}>
                <TestimonialCard testimonial={testimonial} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-[#D72444] w-6' : 'bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: {
    name: string
    country: string
    text: string
    rating: number
    avatar: string
    metric: string
  }
}) {
  return (
    <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Metric badge */}
      <div className="inline-flex items-center gap-1.5 bg-[#FF8340]/10 border border-[#FF8340]/20 rounded-full px-3 py-1 mb-4 self-start">
        <TrendingUp className="w-3.5 h-3.5 text-[#FF8340]" />
        <span className="text-[#FF8340] text-xs font-bold">{testimonial.metric}</span>
      </div>
      <Quote className="w-8 h-8 text-[#D72444]/30 mb-3 shrink-0" />
      <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed mb-6 flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          { }
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10"
          />
          <div>
            <div className="text-black dark:text-white font-semibold text-sm">
              {testimonial.name}
            </div>
            <div className="text-[#7F7F7F] dark:text-white/50 text-xs">{testimonial.country}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── FAQ Section ──────────────────────────────────────────── */

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
            Frequently Asked <span className="text-[#D72444]">Questions</span>
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            Everything you need to know about SDASMS and our SMS services.
          </p>
        </FadeInWhenVisible>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFAQ === index
            return (
              <FadeInWhenVisible key={index} delay={index * 0.05}>
                <div
                  className={`bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'shadow-xl shadow-[#D72444]/8 border-[#D72444]/10' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#D72444]/10' : 'bg-gray-100 dark:bg-white/10 group-hover:bg-[#D72444]/5'
                      }`}>
                        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-[#D72444]' : 'text-gray-400 dark:text-white/40'}`}>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="text-base sm:text-lg font-semibold text-black dark:text-white pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#D72444]' : 'text-gray-400 dark:text-white/40'}`} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 ml-12">
                          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInWhenVisible>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Section ──────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInWhenVisible>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            Ready to get started?
            <br />
            <span className="text-[#D72444]">Create your account now</span>
          </h2>
          <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            Ready to transform digital evangelism and reach more souls with
            every message? Join SDASMS and start sharing the Gospel
            effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/10 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

/* ─── Page Component ───────────────────────────────────────── */

export default function SDASMSLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustedByStrip />
        <FeaturesSection />
        <CoverageSection />
        <PowerfulGatewaySection />
        <DigitalDiscipleshipSection />
        <UseCasesSection />
        <PricingSection />
        <WhyChooseSection />
        <FAQSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
