'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Megaphone,
  Lightbulb,
  Bell,
  TrendingUp,
  Users,
  Zap,
  Music,
  CheckCircle2,
  Send,
  Shield,
  Clock,
  Globe,
  BarChart3,
  MessageCircle,
  Sparkles,
  Phone,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─── Data ─────────────────────────────────────────────────── */

const USE_CASES = [
  {
    id: 'church-announcements',
    icon: Megaphone,
    title: 'Church Announcements',
    subtitle: 'Keep your congregation informed',
    description:
      'Keep your congregation updated with important information in real time. Whether it is a change in service schedule, a special guest speaker, or an upcoming conference, SMS ensures your message reaches every member instantly — no internet required.',
    longDescription:
      'In today\'s fast-paced world, congregations need timely updates that cut through the noise. Traditional bulletins and word-of-mouth are no longer enough. With SDASMS, church leaders can broadcast announcements directly to every member\'s phone within seconds. From last-minute venue changes to weekly service reminders, every message is delivered with 99.2% reliability across all mobile networks in Africa. Schedule announcements in advance, personalize messages with member names, and track delivery in real time — all from a simple dashboard.',
    examples: ['Sunday service reminders', 'Midweek fellowship announcements', 'Event schedule changes', 'Special guest speaker notifications', 'Holiday and conference updates'],
    exampleSms: 'DAR CHURCH: Sun service at 9AM. Pastor John preaching on Grace. Come expectant & bring a friend. God bless!',
    replySms: 'Thank you Pastor! We will be there. God bless!',
    color: '#D72444',
    bgLight: '#D7244408',
    stats: { label: 'Messages sent weekly', value: '50K+' },
  },
  {
    id: 'prayer-devotional',
    icon: Lightbulb,
    title: 'Prayer & Devotional',
    subtitle: 'Daily inspiration to their phones',
    description:
      'Send daily inspiration and spiritual encouragement directly to members\' phones. Automated devotionals, scripture verses, and prayer points help your community stay spiritually nourished throughout the week, fostering deeper connections with faith.',
    longDescription:
      'Spiritual growth doesn\'t stop when members leave the church building. Daily devotionals delivered straight to their phones keep faith at the center of everyday life. SDASMS allows you to schedule an entire week or month of devotionals in advance — Bible verses at dawn, prayer points at noon, and evening reflections before bed. Each message is a gentle reminder of God\'s presence, delivered at the perfect moment. Members report feeling more connected to their church community and more consistent in their spiritual disciplines when they receive regular devotional messages.',
    examples: ['Morning devotionals', 'Bible verses', 'Prayer points', 'Weekly encouragement', 'Fasting reminders'],
    exampleSms: 'DAR CHURCH: Psalm 23:1 — The Lord is my shepherd, I shall not want. Walk in His peace today. Good morning!',
    replySms: 'Amen! This was exactly what I needed today. Thank you!',
    color: '#FF8340',
    bgLight: '#FF834008',
    stats: { label: 'Devotionals delivered daily', value: '25K+' },
  },
  {
    id: 'event-conference',
    icon: Bell,
    title: 'Events & Conferences',
    subtitle: 'Increase attendance & engagement',
    description:
      'Increase attendance and engagement for your church events. Targeted SMS campaigns deliver event details, reminders, and follow-ups directly to your audience, ensuring maximum participation and seamless coordination for crusades, revivals, and conferences.',
    longDescription:
      'Event attendance often hinges on timely communication. A well-timed SMS reminder can boost turnout by up to 40%. SDASMS lets you create multi-step campaigns: send a save-the-date weeks ahead, a detailed invitation with time and venue, a day-before reminder, and a same-day final call. After the event, follow up with thank-you messages and feedback requests. For large conferences, segment your audience and send targeted messages to different groups — speakers, volunteers, VIPs, and general attendees — all from one platform.',
    examples: ['Crusades', 'Revivals', 'Youth conferences', 'Worship nights', 'Seminars and workshops'],
    exampleSms: 'DAR CHURCH: Night of Worship this Fri 7PM. Come experience powerful praise & prayer. Invite someone!',
    replySms: 'Praise God! Bringing 2 friends. Can\'t wait!',
    color: '#8B5CF6',
    bgLight: '#8B5CF608',
    stats: { label: 'Events promoted monthly', value: '1,200+' },
  },
  {
    id: 'donation-fundraising',
    icon: TrendingUp,
    title: 'Donations & Fundraising',
    subtitle: 'Encourage giving & support',
    description:
      'Encourage giving and support church projects through timely communication. Personalized SMS campaigns for tithe reminders, building fund updates, and special offerings help your congregation stay informed about how their contributions make a real impact.',
    longDescription:
      'Generosity grows when members see the impact of their giving. SDASMS helps you communicate the vision behind every fundraising initiative with clarity and conviction. Send personalized giving reminders aligned with pay cycles, share progress updates on building projects with photos via MMS, and celebrate milestones with the entire congregation. For special campaigns like harvest festivals or Christmas offerings, create urgency with countdown messages and real-time progress updates. Churches using SDASMS for giving campaigns report an average 45% increase in contributions compared to announcement-only approaches.',
    examples: ['Tithe reminders', 'Building project updates', 'Charity campaigns', 'Special offerings', 'Fundraising drives'],
    exampleSms: 'DAR CHURCH: Building fund at 72%! Your contribution brings us closer. Give via M-Pesa 0712345678. God bless!',
    replySms: 'Just sent my contribution via M-Pesa. Blessed to be part of this vision!',
    color: '#F59E0B',
    bgLight: '#F59E0B08',
    stats: { label: 'Average increase in giving', value: '45%' },
  },
  {
    id: 'member-followups',
    icon: Users,
    title: 'Member Follow-Ups',
    subtitle: 'Stay connected consistently',
    description:
      'Stay connected with members and visitors consistently. Automated follow-up messages for first-time visitors, absent member check-ins, and birthday greetings show your congregation that every individual matters and is valued in the community.',
    longDescription:
      'The personal touch makes all the difference in building a thriving church community. When a first-time visitor receives a warm follow-up message within 24 hours, they are three times more likely to return. When an absent member gets a caring check-in, they feel seen and valued. SDASMS automates these critical touchpoints so no one falls through the cracks. Set up birthday greetings that go out automatically, absent-member sequences that trigger after missed services, and new-believer discipleship messages that nurture spiritual growth week by week. Every message reinforces that your church is a family that cares.',
    examples: ['First-time visitor follow-up', 'Missed service check-ins', 'Birthday wishes', 'Membership engagement', 'Pastoral care communication'],
    exampleSms: 'DAR CHURCH: We missed you this Sunday! We pray you\'re well. Hope to see you next week. You are loved!',
    replySms: 'Thank you for checking on me. I was unwell but doing better now. See you Sunday!',
    color: '#10B981',
    bgLight: '#10B98108',
    stats: { label: 'Follow-up rate increase', value: '3x' },
  },
  {
    id: 'emergency-alerts',
    icon: Zap,
    title: 'Emergency Alerts',
    subtitle: 'Communicate instantly',
    description:
      'Communicate urgent information instantly to your entire congregation. When every second counts, SMS is the fastest and most reliable way to notify members about venue changes, emergency prayer meetings, weather updates, or security notices.',
    longDescription:
      'Emergencies don\'t wait for Sunday morning. When a crisis hits — whether it\'s a sudden venue change, a security concern, an urgent prayer request, or a weather emergency — you need to reach every member immediately. SDASMS delivers emergency alerts in under 3 seconds to all connected devices, even when internet services are down. Unlike social media posts that get buried in feeds, SMS messages are opened within 90 seconds on average. With one click, you can alert your entire congregation or target specific groups. Priority sending ensures your most critical messages are delivered first, even during peak traffic periods.',
    examples: ['Venue changes', 'Emergency prayer meetings', 'Weather-related updates', 'Funeral announcements', 'Security notices'],
    exampleSms: 'DAR CHURCH URGENT: Evening fellowship moved online due to heavy rain. Join via Zoom. Link sent by email.',
    replySms: 'Received, thank you. Will join online. Stay safe!',
    color: '#EF4444',
    bgLight: '#EF444408',
    stats: { label: 'Delivery in under', value: '3 sec' },
  },
  {
    id: 'youth-ministry',
    icon: Music,
    title: 'Youth & Ministry',
    subtitle: 'Improve department communication',
    description:
      'Improve communication within departments and ministry groups. Coordinate choir rehearsals, youth meetings, volunteer schedules, and outreach programs effortlessly with targeted group messaging that keeps every team member informed and engaged.',
    longDescription:
      'A vibrant church runs on the coordination of many ministries working together. From choir rehearsals and youth meetings to usher schedules and outreach programs, every team needs clear and timely communication. SDASMS lets you create dedicated groups for each ministry and send targeted messages that only reach the relevant members. Remind the choir about rehearsal times, notify volunteers about schedule changes, coordinate prayer chain rotations, and rally the outreach team for community events — all without cluttering the main congregation\'s inbox. Ministry leaders report saving hours each week on coordination after switching to SDASMS.',
    examples: ['Choir rehearsals', 'Youth meetings', 'Volunteer schedules', 'Leadership meetings', 'Outreach programs'],
    exampleSms: 'DAR CHURCH: Choir practice at 5PM today. Please arrive early for sound check. God bless the practice!',
    replySms: 'On my way! Should be there by 4:45. Blessings!',
    color: '#06B6D4',
    bgLight: '#06B6D408',
    stats: { label: 'Ministries coordinated', value: '2,000+' },
  },
]

const WHY_POINTS = [
  { icon: Zap, title: 'Lightning Fast', description: 'Messages delivered in under 3 seconds across all networks' },
  { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security with 99.2% delivery rate' },
  { icon: Users, title: 'Easy Dashboard', description: 'Intuitive interface that requires zero technical expertise' },
  { icon: Globe, title: 'Africa Coverage', description: 'Direct connections to all major African mobile networks' },
  { icon: BarChart3, title: 'Real-time Analytics', description: 'Track delivery, engagement, and campaign performance live' },
  { icon: Clock, title: 'Scheduling', description: 'Plan messages ahead with timezone-aware scheduling' },
  { icon: MessageCircle, title: 'Two-Way SMS', description: 'Receive replies and have real conversations with members' },
  { icon: Sparkles, title: 'Personalization', description: 'Dynamic fields for names, groups, and custom messages' },
]

/* ─── Main Page ─────────────────────────────────────────────── */

export default function UseCasesPage() {
  const [activeCase, setActiveCase] = useState(0)
  const currentCase = USE_CASES[activeCase]

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">

        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#460544]/[0.03] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D72444]/[0.04] rounded-full blur-[160px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 bg-[#D72444]/[0.06] border border-[#D72444]/10 text-[#D72444] text-xs font-semibold px-4 py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Built for Faith-Based Organizations
              </span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-[1.08] tracking-tight"
              >
                Every message,{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  a ministry moment
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[#777] dark:text-white/50 text-base sm:text-lg max-w-md leading-relaxed lg:text-right lg:pb-1"
              >
                Whether you lead a church, mosque, ministry, or faith-based organization — reach your members instantly.
              </motion.p>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 h-px bg-gradient-to-r from-[#D72444]/30 via-[#FF8340]/20 to-transparent origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8"
            >
              {[
                { value: '10M+', label: 'SMS Delivered' },
                { value: '99.2%', label: 'Delivery Rate' },
                { value: '5K+', label: 'Active Users' },
                { value: '7', label: 'Use Cases' },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="text-xl sm:text-2xl font-extrabold text-black dark:text-white">{stat.value}</span>
                  <span className="text-[#999] dark:text-white/40 text-xs sm:text-sm font-medium ml-1.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Use Cases — 3-Column Pro Layout ──────────────── */}
        <section className="py-16 sm:py-24 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                How ministries use <span className="text-[#D72444]">SDASMS</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                Explore real-world use cases that help religious institutions connect, engage, and grow their communities through the power of SMS.
              </p>
            </div>

            {/* 3-column layout */}
            <div className="flex flex-col lg:flex-row gap-0 rounded-2xl border border-gray-200 dark:border-white/10/80 overflow-hidden shadow-lg bg-white dark:bg-[#0D0B1A]">

              {/* ─── Column 1: Left Tabs ──────────────────────── */}
              <div className="lg:w-[260px] xl:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-white/10 bg-[#FAFAFA] dark:bg-white/5">
                <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
                  {USE_CASES.map((useCase, i) => (
                    <button
                      key={useCase.id}
                      onClick={() => setActiveCase(i)}
                      className={`group relative flex items-center gap-3 px-4 lg:px-5 py-4 text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal border-b lg:border-b-0 lg:border-b border-gray-100 dark:border-white/10/60 last:border-b-0 ${
                        activeCase === i
                          ? 'bg-white dark:bg-[#0D0B1A]'
                          : 'hover:bg-white/70 dark:hover:bg-white/10'
                      }`}
                    >
                      {/* Active left bar */}
                      <div
                        className={`hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-300 ${
                          activeCase === i ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundColor: useCase.color }}
                      />

                      {/* Colored icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: activeCase === i ? `${useCase.color}15` : `${useCase.color}08`,
                          boxShadow: activeCase === i ? `0 4px 12px ${useCase.color}15` : 'none',
                        }}
                      >
                        <useCase.icon
                          className="w-4.5 h-4.5 transition-colors duration-300"
                          style={{ color: activeCase === i ? useCase.color : '#999' }}
                        />
                      </div>

                      <div className="min-w-0">
                        <span
                          className={`text-[13px] font-bold block transition-colors duration-300 leading-tight ${
                            activeCase === i ? 'text-black dark:text-white' : 'text-[#888] dark:text-white/50 group-hover:text-gray-600'
                          }`}
                        >
                          {useCase.title}
                        </span>
                        <span className="hidden lg:block text-[11px] text-[#AAA] dark:text-white/30 leading-tight mt-0.5 truncate">
                          {useCase.subtitle}
                        </span>
                      </div>

                      {/* Active dot on mobile */}
                      <div
                        className={`lg:hidden w-1.5 h-1.5 rounded-full shrink-0 transition-opacity duration-300 ${
                          activeCase === i ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundColor: useCase.color }}
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {/* ─── Column 2: Middle Content ─────────────────── */}
              <div className="flex-1 min-w-0 lg:border-r border-gray-100 dark:border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCase.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 sm:p-8 lg:p-10"
                  >
                    {/* Header with colored accent */}
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${currentCase.color}12` }}
                      >
                        <currentCase.icon className="w-7 h-7" style={{ color: currentCase.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white leading-tight">
                          {currentCase.title}
                        </h3>
                        <p className="text-[#999] dark:text-white/40 text-sm font-medium mt-0.5">
                          {currentCase.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Primary description */}
                    <p className="text-[#555] dark:text-white/70 text-[15px] sm:text-base leading-relaxed mb-4">
                      {currentCase.description}
                    </p>

                    {/* Extended description */}
                    <p className="text-[#777] dark:text-white/50 text-sm leading-relaxed mb-6">
                      {currentCase.longDescription}
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-6" style={{ backgroundColor: `${currentCase.color}15` }} />

                    {/* Examples */}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: currentCase.color }}>
                        Common Use Cases
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentCase.examples.map((example, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${currentCase.color}10` }}
                            >
                              <CheckCircle2 className="w-3 h-3" style={{ color: currentCase.color }} />
                            </div>
                            <span className="text-[13px] text-[#555] dark:text-white/70 font-medium">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat badge */}
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border"
                      style={{
                        backgroundColor: `${currentCase.color}08`,
                        borderColor: `${currentCase.color}18`,
                      }}
                    >
                      <span className="text-sm font-extrabold" style={{ color: currentCase.color }}>
                        {currentCase.stats.value}
                      </span>
                      <span className="text-[#999] dark:text-white/40 text-xs font-medium">
                        {currentCase.stats.label}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ─── Column 3: Phone Preview ──────────────────── */}
              <div className="hidden lg:flex flex-col items-center justify-center p-8 xl:p-10 bg-[#F8F8FC] dark:bg-white/5 min-w-[320px] xl:min-w-[360px]">
                <div className="relative">
                  {/* Glow behind phone */}
                  <div
                    className="absolute -inset-8 rounded-[60px] blur-3xl transition-all duration-700"
                    style={{ backgroundColor: `${currentCase.color}12` }}
                  />

                  {/* Phone frame */}
                  <div className="relative bg-[#0A0A1A] rounded-[2.5rem] p-3 shadow-2xl shadow-black/30 border border-white/[0.06]" style={{ width: '290px' }}>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#0A0A1A] rounded-b-2xl z-20" />

                    {/* Screen */}
                    <div className="relative bg-[#111127] rounded-[2rem] overflow-hidden" style={{ minHeight: '520px' }}>
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-6 pt-8 pb-1">
                        <span className="text-white/40 text-[10px] font-medium">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1.5 rounded-full bg-white/20" />
                          <div className="w-1 h-2 rounded-full bg-white/20" />
                          <div className="w-1 h-2.5 rounded-full bg-white/30" />
                          <div className="w-3.5 h-2 rounded-sm border border-white/30 ml-1">
                            <div className="w-2.5 h-full bg-green-400 rounded-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* Chat header */}
                      <div className="px-4 pt-2 pb-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${currentCase.color}20` }}
                          >
                            <currentCase.icon className="w-4 h-4" style={{ color: currentCase.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-bold">DAR CHURCH</p>
                            <p className="text-white/25 text-[9px]">Verified Sender</p>
                          </div>
                          <Phone className="w-4 h-4 text-white/20" />
                        </div>
                      </div>

                      {/* Messages area */}
                      <div className="px-4 pt-4 pb-20 space-y-3">
                        {/* Delivered message (from DAR CHURCH) */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`sent-${currentCase.id}`}
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                          >
                            <div
                              className="rounded-2xl rounded-tl-md p-3.5 max-w-[230px]"
                              style={{ backgroundColor: `${currentCase.color}15` }}
                            >
                              <p className="text-white/90 text-[13px] leading-relaxed">
                                {currentCase.exampleSms}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 ml-1">
                              <span className="text-white/15 text-[9px]">9:41 AM</span>
                              <svg className="w-3 h-3 text-blue-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Reply message (member response) */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`reply-${currentCase.id}`}
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex justify-end"
                          >
                            <div>
                              <div className="bg-[#1C1C3A] rounded-2xl rounded-tr-md p-3.5 max-w-[200px]">
                                <p className="text-white/80 text-[13px] leading-relaxed">
                                  {currentCase.replySms}
                                </p>
                              </div>
                              <p className="text-white/15 text-[9px] mt-1 text-right mr-1">9:42 AM</p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Input bar */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-gradient-to-t from-[#111127] via-[#111127]/95 to-transparent">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5">
                            <span className="text-white/15 text-[11px]">Type a message...</span>
                          </div>
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: currentCase.color }}
                          >
                            <Send className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SMS character count badge */}
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full bg-white dark:bg-[#0D0B1A] shadow-md border border-gray-100 dark:border-white/10"
                    style={{ color: currentCase.color }}
                  >
                    {currentCase.exampleSms.length}/160 chars
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile navigation dots */}
            <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
              {USE_CASES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCase(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeCase ? 'w-8 h-2.5' : 'w-2.5 h-2.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400'
                  }`}
                  style={
                    i === activeCase
                      ? { background: `linear-gradient(to right, ${USE_CASES[i].color}, ${USE_CASES[i].color}90)` }
                      : {}
                  }
                  aria-label={`View ${USE_CASES[i].title}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Choose Section ─────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Everything you need for<br />
                <span className="text-[#D72444]">ministry communication</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                Why religious institutions choose SDASMS for their messaging needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_POINTS.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#FF834010' }}
                  >
                    <item.icon className="w-5 h-5 text-[#FF8340]" />
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-xs leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section ────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#D72444]/10 border border-[#D72444]/20 text-[#D72444] text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Send className="w-3.5 h-3.5" />
              Start Today
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
              Empower your ministry through{' '}
              <span className="text-[#D72444]">better communication</span>
            </h2>
            <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              Build stronger connections with your congregation through timely, impactful, and reliable messaging. Join thousands of ministries already using SDASMS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/10 text-black dark:text-white hover:bg-white dark:bg-[#0D0B1A] hover:border-gray-300 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
