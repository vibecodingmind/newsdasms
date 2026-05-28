'use client'

import {
  Shield,
  Globe,
  Heart,
  Users,
  Zap,
  DollarSign,
  Headphones,
  Smartphone,
  MessageSquare,
  TrendingUp,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Target,
  Lightbulb,
  Megaphone,
  Cross,
  Award,
  ThumbsUp,
  Gift,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const CORE_REASONS = [
  {
    icon: Cross,
    title: 'Built on Faith, for Faith',
    description:
      'SDASMS is not a generic messaging platform retrofitted for churches — it was purpose-built from the ground up for digital evangelism. Every feature, every workflow, and every pricing decision is made with ministry needs at the center. We understand that church communication is fundamentally different from corporate marketing, and our platform reflects that understanding in every detail.',
    color: '#D72444',
  },
  {
    icon: Shield,
    title: '99.2% Delivery Rate',
    description:
      'When you send a gospel message, it must arrive. Our direct carrier connections across Africa ensure industry-leading delivery rates that consistently outperform competitors. We invest heavily in direct network integrations rather than relying on third-party aggregators, which means your messages travel the shortest path from your dashboard to your congregation\'s phones with minimal latency and maximum reliability.',
    color: '#FF8340',
  },
  {
    icon: DollarSign,
    title: 'Lowest Pricing in Africa',
    description:
      'No SMS service provider in the text messaging industry competes with our pricing. We believe that cost should never be a barrier to spreading the Gospel, so we have structured our pricing to be the most affordable on the continent. From our Personal Starter Pack at just Tsh 99,500 to our Business Starter Pack at Tsh 249,500, and our volume discounts that bring per-SMS costs down to Sh 11, every ministry — regardless of size — can access professional messaging tools without straining their budget.',
    color: '#7C3AED',
  },
  {
    icon: Globe,
    title: '100% Country Coverage',
    description:
      'We deliver bulk SMS services to every region in the countries we serve. Unlike providers that only cover major cities, SDASMS reaches rural villages, remote towns, and every corner in between. Our extensive network partnerships ensure that whether your congregation is in a bustling capital or a quiet village, your message will be delivered. No dead zones, no missed regions — just complete coverage you can count on.',
    color: '#10B981',
  },
  {
    icon: Headphones,
    title: 'Ministry-Focused Support',
    description:
      'Our support team doesn\'t just understand technology — they understand ministry. When you call with a question, you\'re speaking with someone who knows the difference between a prayer chain and a promotional blast, who understands why a late delivery matters, and who treats every request with the urgency it deserves. Available around the clock, our team is your partner in ensuring your communication never misses a beat.',
    color: '#F59E0B',
  },
  {
    icon: Smartphone,
    title: 'Simple, Intuitive Platform',
    description:
      'Technology should serve you, not frustrate you. SDASMS is designed with a clean, intuitive interface that anyone can use — from a tech-savvy youth leader to a senior pastor. Compose a message, select your recipients, and hit send. No complex setups, no steep learning curves, and no IT department required. If you can send a text on your phone, you can use SDASMS.',
    color: '#06B6D4',
  },
]

const COMPARISON_POINTS = [
  {
    feature: 'Purpose-Built for Ministry',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Direct Carrier Connections',
    sdasms: true,
    generic: false,
  },
  {
    feature: '99.2% Delivery Rate',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Lowest Pricing in Africa',
    sdasms: true,
    generic: false,
  },
  {
    feature: '100% Regional Coverage',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Free Sender ID with Starter Pack',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Ministry-Trained Support Team',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'WhatsApp, Voice, Email & More',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Non-Expiry SMS Credits',
    sdasms: true,
    generic: false,
  },
  {
    feature: 'Multi-Channel in One Dashboard',
    sdasms: true,
    generic: false,
  },
]

const PLATFORM_FEATURES = [
  {
    icon: Megaphone,
    title: 'Omnichannel Messaging',
    description:
      'Reach your congregation through SMS, WhatsApp, Voice, Email, MMS, RCS, Viber, Messenger, Instagram, and Live Chat — all from a single dashboard. No more juggling between platforms; SDASMS unifies every channel into one seamless experience so your ministry can meet people wherever they are.',
  },
  {
    icon: Clock,
    title: 'Message Scheduling',
    description:
      'Plan your communication in advance with powerful scheduling tools. Set up daily devotionals, weekly announcements, or event reminders to go out at the perfect time — automatically. Timezone-aware scheduling ensures your messages arrive when your congregation is most receptive, whether they are in Arusha or Accra.',
  },
  {
    icon: Target,
    title: 'Smart Contact Groups',
    description:
      'Organize your congregation into meaningful groups — youth ministry, women\'s fellowship, choir, elders, first-time visitors — and send targeted messages that resonate. Smart segmentation increases engagement and ensures every recipient gets content that speaks directly to their spiritual journey and involvement.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description:
      'Know exactly what happens after you hit send. Track delivery rates, open rates, and engagement metrics in real time. Understand which messages resonate most, what time gets the best response, and how your outreach is growing over time. Data-driven ministry starts with SDASMS analytics.',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description:
      'Your data — and your congregation\'s data — is sacred. SDASMS uses end-to-end encryption, two-factor authentication, and strict access controls to protect every piece of information. We comply with data protection regulations and never share your contact lists with third parties. Your trust is our highest priority.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Tools',
    description:
      'Leverage artificial intelligence to craft better messages, optimize send times, and automate responses. Our AI tools help you write compelling content, translate messages into local languages, and predict the best outreach strategies — so you can focus on the message while technology handles the delivery.',
  },
]

const TRUST_STATS = [
  { value: '10M+', label: 'Messages Delivered', icon: MessageSquare, color: '#D72444' },
  { value: '99.2%', label: 'Delivery Rate', icon: Shield, color: '#FF8340' },
  { value: '5K+', label: 'Active Ministries', icon: Users, color: '#7C3AED' },
  { value: '31+', label: 'Countries Reached', icon: Globe, color: '#10B981' },
  { value: '11', label: 'Years of Service', icon: Award, color: '#F59E0B' },
  { value: '24/7', label: 'Support Available', icon: Headphones, color: '#06B6D4' },
]

export default function WhySDASMSPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <Sparkles className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Why SDASMS' }}
          title="Why Choose "
          titleAccent="SDASMS?"
          subtitle="Purpose-built for ministry. Unmatched in reliability. The most affordable messaging platform for digital evangelism in Africa."
          nextSectionBg="light"
        />

        {/* Trust Stats Bar */}
        <section className="py-12 sm:py-16 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {TRUST_STATS.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">{stat.value}</p>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-[11px] sm:text-xs font-medium mt-1">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Core Reasons */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                The SDASMS{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Difference
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                We&apos;re not just another messaging platform. Every aspect of SDASMS is designed
                with one purpose: to ensure the Gospel reaches every corner of Africa — instantly,
                affordably, and reliably.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {CORE_REASONS.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
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

        {/* SDASMS vs Generic — Comparison */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                SDASMS vs.{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Generic Platforms
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                See how a purpose-built ministry platform compares to generic SMS providers.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.15}>
              <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center bg-gradient-to-r from-[#D72444]/5 via-[#FF8340]/5 to-[#7C3AED]/5 border-b border-gray-100 dark:border-white/10 px-6 py-4">
                  <span className="text-sm font-bold text-black dark:text-white">Feature</span>
                  <span className="text-sm font-bold text-center text-[#D72444]">SDASMS</span>
                  <span className="text-sm font-bold text-center text-[#7F7F7F] dark:text-white/40">Others</span>
                </div>
                {/* Table Rows */}
                {COMPARISON_POINTS.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center px-6 py-3.5 ${
                      i < COMPARISON_POINTS.length - 1 ? 'border-b border-gray-50 dark:border-white/5' : ''
                    }`}
                  >
                    <span className="text-sm text-black dark:text-white/80 font-medium">{row.feature}</span>
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-center">
                      <span className="text-[#7F7F7F] dark:text-white/20 text-lg">&mdash;</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                Powerful{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Platform Features
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                Everything you need to run a world-class digital evangelism operation, in one place.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PLATFORM_FEATURES.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#D72444]/10 flex items-center justify-center mb-5 group-hover:bg-[#D72444]/20 transition-colors">
                      <item.icon className="w-7 h-7 text-[#D72444]" />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
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

        {/* Key Benefits */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                What Ministries{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Love About Us
                </span>
              </h2>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: ThumbsUp, title: 'Non-Expiry Credits', desc: 'Your SMS credits never expire. Purchase once and use them whenever your ministry needs to communicate — no pressure, no deadlines.' },
                { icon: Gift, title: 'Free Sender ID', desc: 'Every Starter Pack includes a free custom Sender ID so your messages appear with your church or ministry name, not a random phone number.' },
                { icon: Zap, title: 'Instant Delivery', desc: 'Messages are delivered within seconds across all African networks. Our direct carrier connections ensure speed that matches the urgency of the Gospel.' },
                { icon: TrendingUp, title: 'Volume Discounts', desc: 'As your ministry grows, your per-SMS cost decreases. Our tiered pricing rewards growth — the more you send, the less you pay per message.' },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-4 bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF8340]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-[#FF8340]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-black dark:text-white mb-1.5">{item.title}</h3>
                      <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D72444]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to experience the
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] to-[#D72444] bg-clip-text text-transparent">
                  SDASMS difference?
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Join thousands of churches and ministries across Africa that trust SDASMS
                to deliver their message. Start with our Personal Starter Pack — 2,500 SMS and 1 Sender ID for just Tsh 99,500, or our Business Starter Pack — 5,000 SMS and 2 Sender IDs for Tsh 249,500.
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
                  href="/pricing"
                  className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
                >
                  View Pricing
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
