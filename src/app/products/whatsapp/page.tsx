'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  MessageSquare,
  Bot,
  FileText,
  Image as ImageIcon,
  Reply,
  Users,
  Megaphone,
  Webhook,
  ArrowRight,
  Zap,
  Shield,
  BookOpen,
  HandHeart,
  CalendarCheck,
  Bell,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#25D366'

const stats = [
  { value: '2B+', label: 'Global Users' },
  { value: '98%', label: 'Open Rate' },
  { value: 'API-first', label: 'Integration' },
  { value: 'Verified', label: 'Business Account' },
]

const features = [
  {
    icon: FileText,
    title: 'WhatsApp Templates',
    description: 'Create pre-approved message templates for notifications, reminders, and alerts. Send structured messages that are consistent and professional.',
  },
  {
    icon: Bot,
    title: 'Chatbot Automation',
    description: 'Build intelligent chatbots that answer common questions, provide service times, share daily devotionals, and collect prayer requests automatically.',
  },
  {
    icon: MessageSquare,
    title: 'Message Templates',
    description: 'Design reusable message templates for recurring communications — weekly announcements, event reminders, and follow-up messages.',
  },
  {
    icon: ImageIcon,
    title: 'Media Messages',
    description: 'Send images, documents, audio, and video through WhatsApp. Share sermon graphics, event flyers, worship recordings, and ministry resources.',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description: 'Provide quick-tap reply options in conversations. "Amen!", "I\'ll attend", "Prayer request", and more — making it easy for members to respond.',
  },
  {
    icon: Users,
    title: 'Group Messaging',
    description: 'Create and manage WhatsApp groups for youth ministry, women\'s fellowship, Bible study, and committees — all from one dashboard.',
  },
  {
    icon: Megaphone,
    title: 'Broadcast Lists',
    description: 'Send broadcast messages to up to 256 recipients at once. Perfect for church-wide announcements that need to reach everyone personally.',
  },
  {
    icon: Webhook,
    title: 'Webhook Events',
    description: 'Receive real-time webhook notifications for message deliveries, reads, replies, and opt-ins. Build custom workflows and integrations.',
  },
]

const benefits = [
  {
    icon: MessageSquare,
    title: 'Familiar Interface',
    description: 'WhatsApp is already on virtually every phone in Africa. Your congregation doesn\'t need to learn anything new — they just open WhatsApp and chat.',
  },
  {
    icon: ImageIcon,
    title: 'Rich Media Support',
    description: 'Send images, videos, documents, and audio files natively. Share sermon recordings, event flyers, and Bible study materials with a single message.',
  },
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Every message is protected with end-to-end encryption. Prayer requests, counseling conversations, and personal information stay completely private.',
  },
  {
    icon: Users,
    title: '2B+ Global Users',
    description: 'WhatsApp is the most widely used messaging app in Africa. Reach your congregation on the platform they already check dozens of times daily.',
  },
]

const steps = [
  {
    title: 'Register Your Business',
    description: 'Apply for a WhatsApp Business API account through SDASMS. We handle the verification process and set up your official business profile with your church name and logo.',
  },
  {
    title: 'Configure & Build',
    description: 'Set up message templates, create chatbot flows, configure auto-replies, and integrate with your existing systems using our RESTful API or visual builder.',
  },
  {
    title: 'Launch & Engage',
    description: 'Start sending messages and engaging your congregation on WhatsApp. Monitor conversations, track delivery, and optimize your messaging strategy.',
  },
]

const useCases = [
  {
    icon: BookOpen,
    title: 'Daily Devotionals on WhatsApp',
    description: 'Send daily Bible verses, devotionals, and reflection questions directly to your congregation\'s WhatsApp. Build a daily spiritual habit that members look forward to.',
  },
  {
    icon: Users,
    title: 'Bible Study Groups',
    description: 'Create interactive Bible study groups on WhatsApp where members discuss scriptures, share insights, and ask questions — with chatbot moderation and resources.',
  },
  {
    icon: Bot,
    title: 'Prayer Request Bot',
    description: 'Deploy an automated prayer request bot that collects, categorizes, and routes prayer requests to your intercessory team — available 24/7.',
  },
  {
    icon: CalendarCheck,
    title: 'Event RSVP Collection',
    description: 'Send event invitations with interactive buttons for RSVP. Automatically collect responses, send reminders, and manage attendance — all on WhatsApp.',
  },
]

const faqs = [
  {
    question: 'How do I get a WhatsApp Business API account?',
    answer: 'Apply through SDASMS and we handle the entire verification and setup process on your behalf. You\'ll need a Facebook Business Manager account, a valid business phone number, and basic business documentation. Our team guides you through every step, from application to approval, typically completing the entire process within 1-3 business days.',
  },
  {
    question: 'What are WhatsApp message templates?',
    answer: 'Message templates are pre-approved message formats used for notifications, reminders, and alerts sent outside the 24-hour conversation window. Each template must be approved by WhatsApp before use. We provide a library of church-specific templates for service reminders, event invitations, donation acknowledgments, and prayer updates that have high approval rates.',
  },
  {
    question: 'Can I build a chatbot?',
    answer: 'Yes, you can build intelligent chatbots for prayer requests, devotionals, and Q&A using our visual flow builder or RESTful API. Create multi-step conversation flows with buttons, quick replies, and rich media. Our chatbot builder requires no coding and includes pre-built templates for common church interactions like service info, event registration, and prayer submissions.',
  },
  {
    question: 'What are the message costs?',
    answer: 'WhatsApp uses conversation-based pricing where costs depend on who initiates the conversation. Template messages (business-initiated) and session messages (user-initiated) have different rates. We offer transparent per-conversation pricing with no hidden fees, and volume discounts are available for ministries sending large volumes. Contact our team for a customized quote based on your expected usage.',
  },
  {
    question: 'Can I send media files?',
    answer: 'Yes, WhatsApp Business API supports images, documents, audio, video, and stickers. Share sermon graphics as images, worship recordings as audio, event flyers as PDFs, and sermon clips as video — all delivered natively within the WhatsApp conversation. Media messages see significantly higher engagement than text-only messages on the platform.',
  },
  {
    question: 'How long does verification take?',
    answer: 'Typically 1-3 business days for business verification through our streamlined process. We pre-review your application to catch any issues before submission, which significantly reduces rejection rates. Once verified, your WhatsApp Business profile displays your church name, logo, and verified badge, building trust with your congregation from the very first message.',
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

export default function WhatsAppPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Phone className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'WhatsApp API' }}
          title="WhatsApp Business"
          titleAccent="API"
          subtitle="Official WhatsApp Business API integration — connect with your congregation on the world's most popular messaging app in Africa."
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
                  <Phone className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Reach your flock where they already are
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    WhatsApp is the most popular messaging platform across Africa, with over 2 billion users worldwide. SDASMS WhatsApp Business API gives your church an official, verified presence on WhatsApp — enabling rich media messaging, automated chatbots, broadcast lists, and interactive message templates. With 98% open rates and end-to-end encryption, it&apos;s the most effective and secure way to connect with your congregation on the app they already use every day.
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
                Powerful WhatsApp <span style={{ color: PRODUCT_COLOR }}>API features</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Everything you need to build engaging, automated WhatsApp experiences for your ministry.
              </p>
            </FadeInWhenVisible>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  Why WhatsApp is <span style={{ color: PRODUCT_COLOR }}>essential</span> for African churches
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  In Africa, WhatsApp isn&apos;t just a messaging app — it&apos;s the primary way people communicate, share, and stay connected. Your church needs to be there.
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
                      <Phone className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">WhatsApp API Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Message Open Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>98%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '98%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Response Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>75%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '75%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Template Approval</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>92%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Bot Resolution Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>68%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '68%' }}
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
                Get your church on WhatsApp Business API in three straightforward steps.
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
                WhatsApp for <span style={{ color: PRODUCT_COLOR }}>ministry</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From daily devotionals to prayer bots, WhatsApp API enables powerful ministry experiences that meet your congregation where they are.
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
                Everything you need to know about WhatsApp API. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#25D366]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Connect with your church on
                <br />
                <span className="bg-gradient-to-r from-[#25D366] to-[#128C7E] bg-clip-text text-transparent">
                  WhatsApp today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Join hundreds of African churches using WhatsApp Business API through SDASMS. Set up your verified account and start engaging your congregation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#25D366]/25 transition-all duration-300"
                >
                  Get API Access
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
