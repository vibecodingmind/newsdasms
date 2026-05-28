'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Shield,
  MessageSquare,
  Code2,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
  Link2,
  Zap,
  Sparkles,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const FEATURE_CATEGORIES = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Efficiently organize and manage your audience, ensuring compliance with user preferences and optimizing communication.',
    color: '#D72444',
    features: [
      { icon: CheckCircle2, title: 'Opt-out Management', description: 'Enable recipients to unsubscribe with ease.' },
      { icon: Users, title: 'Contact Management', description: 'Import, export, and organize contacts into groups.' },
      { icon: Shield, title: 'Blacklist Management', description: 'Block unwanted numbers for compliance and control.' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Messaging Capabilities',
    description: 'Deliver impactful messages with advanced features like personalization, Unicode support, and branded sender IDs.',
    color: '#FF8340',
    features: [
      { icon: Zap, title: 'Custom Sender IDs', description: 'Use branded sender names for professional communication.' },
      { icon: MessageSquare, title: 'Unicode Support', description: 'Send messages in diverse languages and character sets.' },
      { icon: Link2, title: 'Message Personalization', description: 'Tailor messages with recipient-specific details.' },
    ],
  },
  {
    icon: Clock,
    title: 'Campaign Management',
    description: 'Streamline your SMS campaigns with tools for scheduling, tracking, and cost optimization.',
    color: '#8B5CF6',
    features: [
      { icon: Clock, title: 'Scheduling', description: 'Schedule SMS delivery for optimal timing.' },
      { icon: BarChart3, title: 'Delivery Reports', description: 'Access detailed status updates for every message sent.' },
      { icon: MessageSquare, title: 'Campaign Management', description: 'Plan and monitor SMS campaigns effectively.' },
    ],
  },
  {
    icon: Code2,
    title: 'API Integration',
    description: 'Enhance usability and extend functionality with seamless integration, templates, and a user-friendly dashboard.',
    color: '#F59E0B',
    features: [
      { icon: Code2, title: 'Integration with CRM', description: 'Seamlessly integrate SMS capabilities into your applications or platforms.' },
      { icon: Zap, title: 'Customizable Integration', description: 'Adapt the API to meet specific business or platform requirements.' },
      { icon: MessageSquare, title: 'Automated Messaging', description: 'Enable automatic SMS responses or alerts triggered by external systems.' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Insights and Usability',
    description: 'Gain actionable insights into your campaigns with delivery reports, performance metrics, and user engagement analysis.',
    color: '#10B981',
    features: [
      { icon: MessageSquare, title: 'Template Management', description: 'Save time with customizable message templates.' },
      { icon: Link2, title: 'Link Shortening', description: 'Improve message presentation and track click-through rates.' },
      { icon: BarChart3, title: 'Analytics and Insights', description: 'Analyze delivery performance and engagement.' },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <Sparkles className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Platform Capabilities' }}
          title="Features that"
          titleAccent="empower your ministry"
          subtitle="Experience a seamless, reliable, and efficient messaging platform designed for ministries, churches, and organizations."
          nextSectionBg="light"
        />

        {/* Feature Categories */}
        {FEATURE_CATEGORIES.map((category, idx) => (
          <section
            key={category.title}
            className={`py-20 sm:py-28 ${idx % 2 === 0 ? 'bg-[#F6F6F6] dark:bg-[#1A0A2E]' : 'bg-white dark:bg-[#0D0B1A]'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeInWhenVisible className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <category.icon className="w-7 h-7" style={{ color: category.color }} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                    {category.title}
                  </h2>
                </div>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                  {category.description}
                </p>
              </FadeInWhenVisible>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {category.features.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${category.color}10` }}
                      >
                        <feature.icon className="w-6 h-6" style={{ color: category.color }} />
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
        ))}

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D72444]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to get started?
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] to-[#D72444] bg-clip-text text-transparent">
                  Create your account now
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
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
