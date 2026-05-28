'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Send,
  Globe2,
  Clock,
  Users,
  BarChart3,
  Link2,
  FileText,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  Bell,
  HandHeart,
  AlertTriangle,
  Zap,
  Shield,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#D72444'

const stats = [
  { value: '10M+', label: 'Messages Delivered' },
  { value: '99.2%', label: 'Delivery Rate' },
  { value: '5K+', label: 'Active Users' },
  { value: '50+', label: 'Countries' },
]

const features = [
  {
    icon: Send,
    title: 'Bulk Messaging',
    description: 'Send thousands of messages simultaneously to your entire congregation with a single click. Perfect for large-scale church announcements and ministry outreach.',
  },
  {
    icon: Shield,
    title: 'Custom Sender IDs',
    description: 'Brand your messages with custom sender IDs like "DAR CHURCH" or "PRAISE MIN." Build trust and recognition with every message you send.',
  },
  {
    icon: Globe2,
    title: 'Unicode & Swahili Support',
    description: 'Send messages in Swahili, Arabic, and any language with full Unicode support. Reach your community in the language they understand best.',
  },
  {
    icon: Clock,
    title: 'Message Scheduling',
    description: 'Schedule messages for the perfect time — Sunday service reminders on Saturday, prayer meeting alerts in the morning, event updates weeks ahead.',
  },
  {
    icon: Users,
    title: 'Contact Groups',
    description: 'Organize your congregation into groups: youth ministry, women\'s fellowship, choir, elders, and more. Target messages to the right audience.',
  },
  {
    icon: BarChart3,
    title: 'Delivery Reports',
    description: 'Track every message with detailed delivery reports. Know who received, who read, and who needs follow-up for better ministry outreach.',
  },
  {
    icon: MessageSquare,
    title: 'Two-Way Messaging',
    description: 'Receive replies from your congregation. Enable prayer requests, RSVPs, and interactive communication directly through SMS.',
  },
  {
    icon: Link2,
    title: 'Link Shortening',
    description: 'Shorten long URLs to save characters and track click-through rates. Perfect for sharing sermon links, event pages, and donation portals.',
  },
  {
    icon: FileText,
    title: 'Template Management',
    description: 'Save frequently used messages as templates. Quickly send recurring announcements, greetings, and seasonal messages without rewriting.',
  },
  {
    icon: UserCheck,
    title: 'Message Personalization',
    description: 'Personalize messages with recipient names, groups, and custom fields. "Dear John, don\'t forget Bible study tonight at 7 PM."',
  },
]

const benefits = [
  {
    icon: CheckCircle2,
    title: '98% Open Rate',
    description: 'SMS boasts the highest open rate of any communication channel. Nearly every message you send gets read within minutes.',
  },
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Messages reach your congregation in seconds, not hours. Perfect for urgent prayer requests and last-minute event changes.',
  },
  {
    icon: Globe2,
    title: 'No Internet Required',
    description: 'Reach members even in areas with limited or no internet connectivity. SMS works on every phone, smartphone or feature phone.',
  },
  {
    icon: HandHeart,
    title: 'Cost-Effective for Africa',
    description: 'Affordable messaging that fits any ministry budget. Our African-optimized routing ensures the best rates across the continent.',
  },
]

const steps = [
  {
    title: 'Upload Your Contacts',
    description: 'Import your congregation\'s phone numbers via CSV, Excel, or manually. Organize them into groups like youth, elders, or choir for targeted messaging.',
  },
  {
    title: 'Compose Your Message',
    description: 'Write your message using our editor with personalization fields, templates, and Unicode support for Swahili and other languages.',
  },
  {
    title: 'Send & Track',
    description: 'Send instantly or schedule for later. Monitor delivery in real-time with detailed reports showing delivered, pending, and failed messages.',
  },
]

const useCases = [
  {
    icon: Bell,
    title: 'Church Announcements',
    description: 'Keep your entire congregation informed about service times, special events, guest speakers, and important church updates with instant SMS alerts.',
  },
  {
    icon: HandHeart,
    title: 'Prayer Chains',
    description: 'Activate prayer chains instantly. Send urgent prayer requests to your intercessory team or entire church with one message.',
  },
  {
    icon: Clock,
    title: 'Event Reminders',
    description: 'Send timely reminders for Bible study, choir practice, women\'s fellowship, youth meetings, and special church events.',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Alerts',
    description: 'Quickly notify your congregation about service cancellations, security concerns, or urgent community needs with emergency SMS alerts.',
  },
]

const faqs = [
  {
    question: 'How fast are SMS messages delivered?',
    answer: 'Messages are delivered within seconds across all African networks. Our direct carrier connections ensure a 99.2% delivery rate with an average delivery time under 3 seconds. Whether you\'re sending to 100 or 100,000 recipients, our platform handles the load with consistent speed and reliability across Tanzania, Kenya, Uganda, and beyond.',
  },
  {
    question: 'Can I use a custom sender ID?',
    answer: 'Yes! You can register custom sender IDs like "DAR CHURCH" or "PRAISE MIN" so recipients immediately recognize who the message is from. Custom sender IDs build trust and increase open rates significantly. Registration typically takes 1-2 business days, and our team handles the entire process with the carriers on your behalf.',
  },
  {
    question: 'Does SDASMS support Swahili and local languages?',
    answer: 'Absolutely. Full Unicode support means you can send messages in Swahili, Arabic, French, and any language that uses special characters. This is especially important for African churches that communicate in multiple languages. Unicode messages support 70 characters per segment, and our platform automatically handles encoding to ensure your messages display correctly on every device.',
  },
  {
    question: 'What is the character limit for SMS?',
    answer: 'Standard SMS supports 160 characters per message using the GSM character set. When using Unicode for languages like Swahili, the limit is 70 characters per segment. Long messages are automatically concatenated, allowing up to 1,000+ characters across multiple segments. Our platform shows a real-time character counter and segment estimator as you compose.',
  },
  {
    question: 'Can I schedule messages for later?',
    answer: 'Yes, you can schedule messages days, weeks, or months in advance. Set up recurring schedules for weekly service reminders, daily devotionals, or monthly newsletters. Our scheduler supports timezone-aware delivery, ensuring your messages arrive at the perfect time regardless of where your recipients are located.',
  },
  {
    question: 'How does two-way messaging work?',
    answer: 'Recipients can reply to your messages, and their responses appear in your SDASMS inbox in real-time. You can set up auto-replies, route messages to specific team members, and create keyword-triggered responses — for example, texting "PRAYER" could automatically forward the message to your intercessory team. Two-way messaging turns one-way announcements into interactive conversations.',
  },
  {
    question: 'Is there a minimum purchase requirement?',
    answer: 'No minimums. Start with as few as 100 messages and scale up as your ministry grows. Credits never expire, so you can purchase in bulk for better rates without worrying about waste. We offer volume discounts that increase automatically as your usage grows, making it affordable for churches of any size.',
  },
]

function FAQItem({ question, answer, color }: { question: string; answer: string; color: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden bg-[#F6F6F6] dark:bg-[#1A0A2E] hover:border-gray-200 dark:border-white/10 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-bold text-black dark:text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function SMSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <MessageSquare className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'SMS Channel' }}
          title="Bulk SMS for"
          titleAccent="Churches & Ministries"
          subtitle="Reach thousands instantly with 99.2% delivery rate across African networks. Custom sender IDs, Swahili support, and powerful scheduling."
        />

        {/* 2. Key Stats Bar */}
        <section className="py-8 bg-white dark:bg-[#0D0B1A] border-y border-gray-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: PRODUCT_COLOR }}>{stat.value}</p>
                  <p className="text-[#999] dark:text-white/40 text-xs sm:text-sm font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Overview Section */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${PRODUCT_COLOR}10` }}>
                  <MessageSquare className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    The most reliable SMS platform for faith-based organizations
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    SDASMS Bulk SMS is built specifically for churches, ministries, and faith-based organizations across Africa. With a 99.2% delivery rate, custom sender IDs like &ldquo;DAR CHURCH&rdquo;, full Unicode support for Swahili and local languages, message scheduling, and personalization — you can reach every member of your congregation instantly, regardless of whether they have a smartphone or internet access. Our platform is optimized for African network routing, ensuring your messages arrive fast and affordably.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* 4. Features Grid */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Powerful features for <span style={{ color: PRODUCT_COLOR }}>ministry messaging</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Everything you need to communicate effectively with your congregation, from bulk messaging to detailed analytics.
              </p>
            </FadeInWhenVisible>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="group bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${PRODUCT_COLOR}10` }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. Benefits Section */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-16">
              <FadeInWhenVisible className="lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                  Why churches choose <span style={{ color: PRODUCT_COLOR }}>SDASMS</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  SMS remains the most effective communication channel for faith-based organizations in Africa. With near-universal phone access and no internet requirements, SMS ensures your message reaches every member of your flock.
                </p>
                <div className="space-y-6">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${PRODUCT_COLOR}10` }}
                      >
                        <benefit.icon className="w-5 h-5" style={{ color: PRODUCT_COLOR }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-black dark:text-white mb-1">{benefit.title}</h3>
                        <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible className="lg:w-1/2" delay={0.2}>
                <div className="bg-white dark:bg-[#0D0B1A] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                  <div className="text-center mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${PRODUCT_COLOR}10` }}
                    >
                      <MessageSquare className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">SMS Delivery Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Delivery Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>99.2%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '99.2%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Open Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>98%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '98%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Response Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>45%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '45%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Avg. Read Time</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>3 min</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '85%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* 6. How It Works */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                How it <span style={{ color: PRODUCT_COLOR }}>works</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
                Get your first SMS campaign running in under 5 minutes with our simple three-step process.
              </p>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.15}>
                  <div className="relative text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: PRODUCT_COLOR }}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200 dark:border-white/10 dark:border-white/10" />
                    )}
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{step.title}</h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium max-w-xs mx-auto">{step.description}</p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Built for <span style={{ color: PRODUCT_COLOR }}>church & ministry</span> needs
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From Sunday service reminders to emergency prayer chains, SDASMS SMS is designed for the unique communication needs of faith-based organizations.
              </p>
            </FadeInWhenVisible>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((uc) => (
                <StaggerItem key={uc.title}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${PRODUCT_COLOR}10` }}
                    >
                      <uc.icon className="w-6 h-6" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">{uc.title}</h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">{uc.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 8. FAQs */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Frequently asked <span style={{ color: PRODUCT_COLOR }}>questions</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
                Everything you need to know about SMS. Can't find what you're looking for? Contact our team.
              </p>
            </FadeInWhenVisible>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} color={PRODUCT_COLOR} />
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D72444]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start reaching your congregation
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] to-[#D72444] bg-clip-text text-transparent">
                  with SMS today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Join 5,000+ churches and ministries across Africa who trust SDASMS to deliver their messages. Set up your account in minutes and send your first campaign today.
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
                  Talk to Us
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
