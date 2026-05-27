'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, RotateCcw, Cookie, FileText, ChevronRight } from 'lucide-react'

const POLICY_NAV = [
  { icon: Shield, label: 'Privacy Policy', href: '/policies/privacy-policy' },
  { icon: RotateCcw, label: 'Refund Policy', href: '/policies/refund-policy' },
  { icon: Cookie, label: 'Cookies Policy', href: '/policies/cookies-policy' },
  { icon: FileText, label: 'Terms of Service', href: '/policies/terms-of-service' },
]

interface PolicyLayoutProps {
  title: string
  lastUpdated: string
  children: ReactNode
  activeHref: string
}

export default function PolicyLayout({ title, lastUpdated, children, activeHref }: PolicyLayoutProps) {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#460544]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D72444]/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#999] mb-5">
            <Link href="/policies" className="hover:text-[#D72444] transition-colors">Policies</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#555] font-medium">{title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">{title}</h1>
            <p className="text-[#999] text-sm pb-1">Last updated: {lastUpdated}</p>
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-[#D72444]/30 via-[#FF8340]/20 to-transparent" />
        </div>
      </section>

      {/* Content with sidebar nav */}
      <section className="py-12 sm:py-16 bg-[#F6F6F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar nav */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:sticky lg:top-24">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-3 px-3">All Policies</p>
                <nav className="space-y-1">
                  {POLICY_NAV.map((item) => {
                    const isActive = item.href === activeHref
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#D72444]/5 text-[#D72444]'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-[#D72444]' : 'text-gray-300'}`} />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/policies"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D72444] transition-colors px-3"
                  >
                    <ChevronRight className="w-3 h-3 rotate-180" />
                    View all policies
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12">
                <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:first:mt-0 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-3 [&_h3]:mt-8 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:leading-relaxed">
                  {children}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
