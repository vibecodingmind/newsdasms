'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  DollarSign,
  TrendingUp,
  Clock,
  BarChart3,
  Globe2,
  MessageSquare,
  Shield,
  Rocket,
  Flame,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'

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

const PRICING_FAQ = [
  {
    question: 'What is the Starter Pack?',
    answer: 'The Starter Pack is our entry-level package at Tsh 34,900 that includes 2,500 SMS credits and 1 Sender ID. It\'s perfect for individuals or small organizations just getting started with bulk messaging.',
  },
  {
    question: 'How does the recharge pricing work?',
    answer: 'After purchasing the Starter Pack, you can recharge your account with additional SMS credits. The per-SMS price decreases as you buy more units, starting from Sh 14 per SMS for smaller volumes down to Sh 11 per SMS for bulk purchases.',
  },
  {
    question: 'Do my SMS credits expire?',
    answer: 'No, your SMS credits never expire. All recharge packages come with non-expiry validity, so you can use your credits whenever you need them.',
  },
  {
    question: 'What is a Sender ID?',
    answer: 'A Sender ID is a custom name that appears as the sender of your SMS messages instead of a phone number. For example, "GRACECHURCH" or "YOUTHMIN". The Starter Pack includes a free Sender ID.',
  },
  {
    question: 'Can I upgrade my plan?',
    answer: 'Absolutely! You can recharge your account at any time with any volume tier. There\'s no commitment — simply purchase the volume that suits your current needs.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No, SDASMS has transparent pricing with no hidden fees. You only pay for the SMS credits you purchase, and the per-SMS rate is clearly displayed for each tier.',
  },
]

export default function PricingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <DollarSign className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Simple & Transparent' }}
          title="Pricing that"
          titleAccent="scales with you"
          subtitle="Simple & transparent pricing that scales with your ministry. Only pay for what you use."
          nextSectionBg="white"
        />

        {/* Pricing Section */}
        <section className="py-24 sm:py-32 bg-white dark:bg-[#0D0B1A]">
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

            {/* Starter Pack */}
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
                          <span className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium block mt-1">One-time setup</span>
                        </div>
                        <div className="w-px h-12 bg-gray-200 dark:bg-white/10 dark:bg-white/10 hidden sm:block" />
                        <div className="hidden sm:flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-4 h-4 text-[#FF8340]" />
                            </div>
                            <span className="text-black dark:text-white font-bold text-sm">2,500 SMS</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <Shield className="w-4 h-4 text-[#FF8340]" />
                            </div>
                            <span className="text-black dark:text-white font-bold text-sm">1 Sender ID</span>
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
                    <div className="flex sm:hidden items-center justify-center gap-6 mt-5 pt-5 border-t border-gray-200 dark:border-white/10 dark:border-white/10 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#FF8340]" />
                        </div>
                        <span className="text-black dark:text-white font-bold text-sm">2,500 SMS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Shield className="w-4 h-4 text-[#FF8340]" />
                        </div>
                        <span className="text-black dark:text-white font-bold text-sm">1 Sender ID</span>
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
                            <div className="w-12 h-12 rounded-xl bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300 shrink-0">
                              <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
                            </div>
                            <span className="text-black dark:text-white font-bold text-lg">{tier.name}</span>
                          </div>
                          <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-xl p-4 mb-4">
                            <span className="text-[#7F7F7F] dark:text-white/50 text-[10px] font-semibold uppercase tracking-wider block mb-1">Price per SMS</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">{tier.perSms}</span>
                              <span className="text-[#7F7F7F] dark:text-white/50 text-sm font-medium">/SMS</span>
                            </div>
                          </div>
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

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
                Frequently Asked <span className="text-[#D72444]">Questions</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                Everything you need to know about SDASMS pricing and packages.
              </p>
            </FadeInWhenVisible>

            <div className="space-y-4">
              {PRICING_FAQ.map((faq, index) => {
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

        {/* CTA Section */}
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
      </main>
      <Footer />
    </div>
  )
}
