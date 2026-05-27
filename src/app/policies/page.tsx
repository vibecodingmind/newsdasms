'use client'

import { motion } from 'framer-motion'
import { Shield, RotateCcw, Cookie, FileText, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'
import Link from 'next/link'

const POLICIES = [
  {
    icon: Shield,
    title: 'Privacy Policy',
    description:
      'Learn how SDASMS collects, uses, stores, and protects your personal information. We are committed to safeguarding your data and ensuring transparency in every interaction you have with our platform.',
    href: '/policies/privacy-policy',
    color: '#D72444',
    lastUpdated: 'May 27, 2026',
  },
  {
    icon: RotateCcw,
    title: 'Refund Policy',
    description:
      'Understand our refund and cancellation terms for SMS credits, subscription plans, and service fees. We aim to provide fair and transparent policies that protect both our users and our platform.',
    href: '/policies/refund-policy',
    color: '#FF8340',
    lastUpdated: 'May 27, 2026',
  },
  {
    icon: Cookie,
    title: 'Cookies Policy',
    description:
      'Discover how SDASMS uses cookies and similar tracking technologies to improve your browsing experience, analyze platform performance, and deliver personalized content across our services.',
    href: '/policies/cookies-policy',
    color: '#8B5CF6',
    lastUpdated: 'May 27, 2026',
  },
  {
    icon: FileText,
    title: 'Terms of Service',
    description:
      'Review the terms and conditions that govern your use of the SDASMS platform, including acceptable use policies, service limitations, intellectual property rights, and dispute resolution procedures.',
    href: '/policies/terms-of-service',
    color: '#10B981',
    lastUpdated: 'May 27, 2026',
  },
]

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <PageHero
        badge={{ icon: <Shield className="w-4 h-4" />, text: 'Legal & Compliance' }}
        title="Our Policies"
        titleAccent="Transparency First"
        subtitle="We believe in full transparency. Review our policies to understand how we protect your data, handle refunds, manage cookies, and govern the use of our platform."
      />

      <section className="py-20 sm:py-28 bg-[#F6F6F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8">
            {POLICIES.map((policy, i) => (
              <FadeInWhenVisible key={policy.title}>
                <Link href={policy.href} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-8"
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${policy.color}10` }}
                    >
                      <policy.icon
                        className="w-7 h-7"
                        style={{ color: policy.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#D72444] transition-colors">
                          {policy.title}
                        </h3>
                        <span className="text-[11px] text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                          Updated {policy.lastUpdated}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        {policy.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 self-center hidden sm:flex">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                        style={{ backgroundColor: `${policy.color}08` }}
                      >
                        <ArrowRight
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: policy.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Bottom note */}
          <FadeInWhenVisible>
            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                By using SDASMS, you agree to these policies. If you have any questions about our policies, please{' '}
                <Link href="/contact" className="text-[#D72444] hover:underline font-medium">
                  contact our team
                </Link>.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  )
}
