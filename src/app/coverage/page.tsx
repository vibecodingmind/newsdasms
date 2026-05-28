'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Globe, Shield, TrendingUp, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const COVERAGE_HIGHLIGHTS = [
  {
    icon: Shield,
    title: 'Reliable Delivery',
    description: 'We partner with top telecom providers to guarantee fast and secure message delivery.',
  },
  {
    icon: Globe,
    title: 'Broad Network Access',
    description: 'Our service supports major and local mobile networks across African countries.',
  },
  {
    icon: TrendingUp,
    title: 'Growing Coverage',
    description: 'We are continuously expanding to reach even more regions and unlock new networks.',
  },
]

const COUNTRIES: { name: string; code: string }[] = [
  { name: 'Algeria', code: 'dz' },
  { name: 'Angola', code: 'ao' },
  { name: 'Benin', code: 'bj' },
  { name: 'Botswana', code: 'bw' },
  { name: 'Burkina Faso', code: 'bf' },
  { name: 'Burundi', code: 'bi' },
  { name: "Cote d'Ivoire", code: 'ci' },
  { name: 'Egypt', code: 'eg' },
  { name: 'Eswatini', code: 'sz' },
  { name: 'Ethiopia', code: 'et' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Guinea', code: 'gn' },
  { name: 'Guinea Bissau', code: 'gw' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Madagascar', code: 'mg' },
  { name: 'Malawi', code: 'mw' },
  { name: 'Mali', code: 'ml' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Mozambique', code: 'mz' },
  { name: 'Namibia', code: 'na' },
  { name: 'Niger', code: 'ne' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Rwanda', code: 'rw' },
  { name: 'Senegal', code: 'sn' },
  { name: 'South Africa', code: 'za' },
  { name: 'Sri Lanka', code: 'lk' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Togo', code: 'tg' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Zambia', code: 'zm' },
  { name: 'Zimbabwe', code: 'zw' },
]

const NETWORK_LOGOS = [
  { src: '/logo-7x.png', alt: 'Network Partner 1' },
  { src: '/logo-15x.png', alt: 'Network Partner 2' },
  { src: '/logo-1x.png', alt: 'Network Partner 3' },
  { src: '/logo-yas.png', alt: 'YAS Tanzania' },
  { src: '/logo-9x.png', alt: 'Network Partner 5' },
  { src: '/logo-10x.png', alt: 'Network Partner 6' },
  { src: '/logo-13x.png', alt: 'Network Partner 7' },
]

/* ─── Country Flag Component ────────────────────────────────── */

function CountryFlag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={`${code.toUpperCase()} flag`}
      className={`rounded-sm object-cover ${className}`}
      loading="lazy"
    />
  )
}

export default function CoveragePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <Globe className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Africa & Beyond' }}
          title="SMS Coverage"
          titleAccent="across the continent"
          subtitle="Our coverage is always growing, and we're always adding new networks. Reach your audience wherever they are."
          nextSectionBg="light"
        />

        {/* Coverage Highlights */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {COVERAGE_HIGHLIGHTS.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-[#D72444]/10 flex items-center justify-center mb-5 group-hover:bg-[#D72444]/20 transition-colors">
                      <item.icon className="w-7 h-7 text-[#D72444]" />
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

        {/* Countries Grid with Flags */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Countries We <span className="text-[#D72444]">Cover</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                SDASMS delivers messages across Africa and beyond. Our direct network connections ensure reliable delivery in every region.
              </p>
              {/* Country count badge */}
              <div className="inline-flex items-center gap-2 bg-[#D72444]/10 border border-[#D72444]/20 text-[#D72444] text-xs font-semibold px-4 py-2 rounded-full mt-6">
                <MapPin className="w-3.5 h-3.5" />
                {COUNTRIES.length} Countries & Growing
              </div>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {COUNTRIES.map((country) => (
                <StaggerItem key={country.code}>
                  <div className="group bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-xl p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 hover:border-[#D72444]/20 transition-all duration-300">
                    <CountryFlag code={country.code} className="w-8 h-6 shrink-0" />
                    <span className="text-black dark:text-white text-sm font-semibold truncate">{country.name}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Network Providers */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Network <span className="text-[#D72444]">Partners</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                Connected to leading mobile networks for reliable message delivery
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
                {NETWORK_LOGOS.map((logo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-center bg-white dark:bg-[#0D0B1A] rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:border-white/10 hover:shadow-sm transition-all duration-300"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-full h-auto max-h-12 sm:max-h-14 object-contain"
                      key={logo.src}
                    />
                  </motion.div>
                ))}
              </div>
            </FadeInWhenVisible>
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
                  href="/get-started"
                  className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/contact"
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
