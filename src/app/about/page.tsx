'use client'

import {
  Target,
  Eye,
  Cross,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  User,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const MISSION_VISION = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To empower churches, ministries, and faith-based organizations across Africa with cutting-edge messaging technology that amplifies the Gospel and connects communities in meaningful ways.',
    color: '#D72444',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become the most trusted digital evangelism platform on the continent, ensuring every church and ministry — regardless of size or location — has access to affordable, reliable communication tools.',
    color: '#7C3AED',
  },
]

const CORE_VALUES = [
  {
    icon: Cross,
    title: 'Faith-Driven Innovation',
    description:
      'We build technology that serves the Kingdom first. Every feature, every update, and every decision is guided by our commitment to spreading the Gospel through innovation.',
    color: '#D72444',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description:
      'Ministries depend on us to deliver their messages on time, every time. We maintain a 99.2% delivery rate because every message matters — especially when it carries the Word.',
    color: '#FF8340',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description:
      'We believe every ministry deserves world-class tools. Our platform is designed to be affordable and easy to use, ensuring even the smallest congregations can communicate effectively.',
    color: '#7C3AED',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description:
      'We measure success not just in messages sent, but in lives touched. Our platform exists to strengthen communities of faith and bring people closer to God.',
    color: '#10B981',
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Joshua Mwangi',
    role: 'Chief Executive Officer',
    description:
      'A passionate advocate for digital evangelism, Joshua leads SDASMS with a vision to transform how ministries communicate across Africa.',
    color: '#D72444',
  },
  {
    name: 'Grace Odhiambo',
    role: 'Chief Technology Officer',
    description:
      'With over a decade in telecom and messaging technology, Grace architects the reliable infrastructure that powers millions of gospel messages.',
    color: '#7C3AED',
  },
  {
    name: 'Samuel Asante',
    role: 'Head of Ministry Relations',
    description:
      'A former pastor turned tech advocate, Samuel bridges the gap between ministry needs and technology solutions, ensuring SDASMS serves the church effectively.',
    color: '#FF8340',
  },
  {
    name: 'Faith Nkosi',
    role: 'Head of Customer Success',
    description:
      'Faith ensures every ministry gets the support they need. Her dedication to customer care reflects our core value of community impact.',
    color: '#10B981',
  },
]

const KEY_STATS = [
  {
    icon: MessageSquare,
    value: '10M+',
    label: 'Messages Delivered',
    description: 'Gospel messages sent across Africa',
    color: '#D72444',
  },
  {
    icon: TrendingUp,
    value: '99.2%',
    label: 'Delivery Rate',
    description: 'Industry-leading reliability',
    color: '#FF8340',
  },
  {
    icon: Users,
    value: '5K+',
    label: 'Active Users',
    description: 'Ministries and organizations',
    color: '#7C3AED',
  },
  {
    icon: Globe,
    value: '31+',
    label: 'Countries Reached',
    description: 'Across the African continent',
    color: '#10B981',
  },
]

const WHY_CHOOSE = [
  {
    icon: Zap,
    title: 'Built for Ministry',
    description: 'Unlike generic platforms, SDASMS is purpose-built for churches and ministries with features tailored to evangelism.',
  },
  {
    icon: Shield,
    title: 'Unmatched Reliability',
    description: 'Our 99.2% delivery rate means your message reaches its destination — because every gospel message counts.',
  },
  {
    icon: Heart,
    title: 'Affordable Pricing',
    description: 'We keep costs low so even the smallest congregation can access professional messaging tools.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Our team understands ministry needs and provides personalized support to help you succeed.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <Sparkles className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Our Story' }}
          title="About "
          titleAccent="SDASMS"
          subtitle="A Digital Evangelism Messaging Platform spreading the Gospel, one message at a time — built in Dar es Salaam for churches and ministries across Africa."
          nextSectionBg="light"
        />

        {/* Mission & Vision */}
        <section className="py-16 sm:py-20 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Mission &{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                Driven by faith, guided by purpose — here&apos;s what motivates everything we do.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MISSION_VISION.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-base leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInWhenVisible direction="left">
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#D72444]/10 via-[#FF8340]/10 to-[#7C3AED]/10 rounded-2xl p-8 sm:p-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#D72444]" />
                        <span className="text-[#7F7F7F] dark:text-white/50 text-sm font-semibold uppercase tracking-widest">
                          Founded 2024
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#FF8340]" />
                        <span className="text-[#7F7F7F] dark:text-white/50 text-sm font-semibold uppercase tracking-widest">
                          Dar es Salaam, Tanzania
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#7C3AED]" />
                        <span className="text-[#7F7F7F] dark:text-white/50 text-sm font-semibold uppercase tracking-widest">
                          Serving 31+ Countries
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-[#D72444]">10M+</p>
                          <p className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium mt-1">Messages</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-[#FF8340]">5K+</p>
                          <p className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium mt-1">Users</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-[#7C3AED]">99.2%</p>
                          <p className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium mt-1">Delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#D72444]/5 rounded-2xl -z-10" />
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="right">
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-6">
                  Our{' '}
                  <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
                <div className="space-y-4 text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium">
                  <p>
                    SDASMS was born in 2024 in the heart of Dar es Salaam, Tanzania, from a simple
                    yet powerful conviction: that the Gospel deserves the best communication
                    technology available.
                  </p>
                  <p>
                    We saw churches and ministries across Africa struggling with outdated tools,
                    unreliable services, and platforms that didn&apos;t understand their unique needs.
                    Ministries were spending more time fighting technology than sharing the Good News.
                  </p>
                  <p>
                    So we built SDASMS — a purpose-driven messaging platform designed specifically for
                    digital evangelism. From SMS and WhatsApp to Voice and Email, we provide
                    affordable, reliable, and easy-to-use tools that help ministries focus on what
                    matters most: spreading the Gospel, one message at a time.
                  </p>
                  <p>
                    Today, SDASMS serves thousands of ministries across 31+ African countries,
                    delivering over 10 million messages with industry-leading reliability. But
                    we&apos;re just getting started — our mission is to ensure every church on the
                    continent has access to world-class communication tools.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Core{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                The principles that guide every decision we make and every feature we build.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_VALUES.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${value.color}15` }}
                    >
                      <value.icon className="w-7 h-7" style={{ color: value.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Team / Leadership */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Meet Our{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Leadership
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                A team dedicated to serving the church through technology and innovation.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="group bg-white dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full text-center">
                    {/* Avatar */}
                    <div className="relative mx-auto mb-5">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                        style={{ backgroundColor: `${member.color}15` }}
                      >
                        <User className="w-10 h-10" style={{ color: member.color }} />
                      </div>
                      <div
                        className="absolute bottom-0 right-1/2 translate-x-6 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1A0A2E]"
                        style={{ backgroundColor: member.color }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: member.color }}
                    >
                      {member.role}
                    </p>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                      {member.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                SDASMS by the{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  Numbers
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                Real impact, real reach — across the African continent and beyond.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {KEY_STATS.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                    <p
                      className="text-4xl sm:text-5xl font-extrabold mb-2"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm font-medium">
                      {stat.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why Choose SDASMS */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#D72444] to-[#FF8340] bg-clip-text text-transparent">
                  SDASMS?
                </span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                We&apos;re not just another messaging platform — we&apos;re your partner in digital evangelism.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {WHY_CHOOSE.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D72444]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-[#D72444]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
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
                Ready to transform your
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] to-[#D72444] bg-clip-text text-transparent">
                  ministry communication?
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Join thousands of churches and ministries across Africa that trust SDASMS
                to deliver their message. Start spreading the Gospel, one message at a time.
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
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
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
