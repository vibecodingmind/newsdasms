'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Bot,
  Megaphone,
  Menu,
  Reply,
  Layout,
  ArrowRightLeft,
  FileText,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  Globe2,
  BookOpen,
  CalendarCheck,
  HandHeart,
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#0084FF'

const stats = [
  { value: '1.3B+', label: 'Global Users' },
  { value: 'Chatbot', label: 'Automation' },
  { value: 'Auto-Reply', label: 'Instant Response' },
  { value: 'Facebook', label: 'Integration' },
]

const features = [
  {
    icon: Bot,
    title: 'Messenger Chatbot',
    description: 'Build intelligent chatbots that handle prayer requests, provide service information, share daily verses, and answer common questions — all automatically.',
  },
  {
    icon: Megaphone,
    title: 'Broadcast Messages',
    description: 'Send broadcast messages to your subscribers with updates, event invitations, and ministry news. Reach your Facebook audience directly in Messenger.',
  },
  {
    icon: Menu,
    title: 'Persistent Menu',
    description: 'Create a persistent menu at the bottom of conversations with key options: "Service Times", "Prayer Request", "Give Online", "Contact Us" — always accessible.',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description: 'Present quick-tap reply options in conversations. "I\'m new here", "Need prayer", "Want to serve" — guide conversations with structured responses.',
  },
  {
    icon: Layout,
    title: 'Webview Integration',
    description: 'Open full-screen web experiences inside Messenger. Donation forms, event registration, sermon archives — all without leaving the conversation.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Handover Protocol',
    description: 'Seamlessly transfer conversations from bot to human agents. When a chatbot encounters a sensitive prayer request, it routes to a real pastoral team member.',
  },
  {
    icon: FileText,
    title: 'Template Messages',
    description: 'Create reusable message templates for common communications: welcome messages, event confirmations, and follow-up sequences.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track conversation volume, bot performance, response times, and user engagement. Understand how your Messenger ministry is performing.',
  },
]

const benefits = [
  {
    icon: Globe2,
    title: 'Facebook Integration',
    description: 'Your Messenger bot connects directly to your church\'s Facebook Page. Respond to messages from your Page automatically and reach followers where they already engage.',
  },
  {
    icon: Bot,
    title: 'Auto-Responses',
    description: 'Never leave a message unanswered. Your chatbot responds instantly 24/7, providing information and collecting prayer requests even when your team is offline.',
  },
  {
    icon: Users,
    title: '1.3B+ Users',
    description: 'Messenger is one of the most widely used messaging platforms globally. In Africa, Facebook and Messenger are often the primary online platforms for communities.',
  },
  {
    icon: Zap,
    title: 'Rich Interactions',
    description: 'Go beyond text with carousel cards, buttons, images, and webviews. Create engaging, interactive experiences that guide users toward meaningful actions.',
  },
]

const steps = [
  {
    title: 'Connect Your Page',
    description: 'Link your church\'s Facebook Page to SDASMS. We handle the Messenger API setup, permissions, and verification process — usually completed within 24 hours.',
  },
  {
    title: 'Build Your Chatbot',
    description: 'Use our visual flow builder to design conversation flows, set up auto-replies, create persistent menus, and configure handover rules for your pastoral team.',
  },
  {
    title: 'Go Live & Grow',
    description: 'Activate your Messenger bot and start engaging your Facebook audience. Promote your bot on your Page, in posts, and through Facebook ads.',
  },
]

const useCases = [
  {
    icon: Bot,
    title: 'Facebook Page Auto-Responder',
    description: 'Automatically respond to every message your church Facebook Page receives. Provide instant answers about service times, location, and upcoming events — 24/7.',
  },
  {
    icon: BookOpen,
    title: 'Bible Verse Bot',
    description: 'Let members request Bible verses by topic or book. "Send me a verse about hope" triggers an instant response with a relevant scripture and brief devotional.',
  },
  {
    icon: CalendarCheck,
    title: 'Event Ticketing',
    description: 'Sell tickets and manage registrations for conferences, concerts, and special events directly inside Messenger with webview integration and payment processing.',
  },
  {
    icon: HelpCircle,
    title: 'Community Q&A',
    description: 'Provide an always-on Q&A service where members can ask about church programs, membership, baptism, weddings, and counseling — answered by bot or routed to staff.',
  },
]

const faqs = [
  {
    question: 'How does Messenger API work?',
    answer: 'Connect your church\'s Facebook Page to SDASMS and manage conversations at scale through the Messenger API. Once connected, you can automate responses, build chatbots, send broadcast messages, and handle thousands of conversations simultaneously. Our platform handles all the technical complexity of the Messenger Platform while giving you full control over the conversation experience.',
  },
  {
    question: 'Can I send broadcast messages?',
    answer: 'Yes, you can send broadcast messages within the 24-hour message window to subscribers who have recently interacted with your Page. Broadcasts are perfect for event announcements, sermon series updates, and urgent prayer requests. For messages outside the 24-hour window, we support sponsored messages and message tags for specific use cases like account updates and event reminders.',
  },
  {
    question: 'What are persistent menus?',
    answer: 'Persistent menus are always-visible navigation menus at the bottom of Messenger conversations with your church. They provide quick access to common actions like "Service Times", "Prayer Request", "Give Online", and "Contact Us". Members can access these options anytime without typing, making it incredibly easy to find information or take action within the conversation.',
  },
  {
    question: 'Can I automate responses?',
    answer: 'Yes, build chatbots that handle common questions automatically using our visual flow builder or API. Set up keyword triggers, create conversation flows with buttons and quick replies, and configure smart routing rules. Your chatbot can answer questions about service times, collect prayer requests, provide directions, and share event details 24/7 without human intervention.',
  },
  {
    question: 'How does the handover protocol work?',
    answer: 'Seamlessly transfer conversations between bot and human agents when personal attention is needed. When your chatbot detects a sensitive topic like a prayer request, counseling need, or complex question, it automatically routes the conversation to a live team member. The transition is smooth — the member experiences no interruption, and your agent gets full conversation context.',
  },
  {
    question: 'Do I need a Facebook Page?',
    answer: 'Yes, you need an active Facebook Page connected to your church to use the Messenger API. Your Page serves as the identity for your Messenger bot. If you don\'t have a Page yet, we can guide you through creating and optimizing one. Most churches already have an active Facebook Page, making the setup process quick and straightforward.',
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

export default function MessengerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <MessageCircle className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Messenger API' }}
          title="Facebook Messenger"
          titleAccent="API"
          subtitle="Automate conversations, send broadcasts, and connect with your church community on Messenger."
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
                  <MessageCircle className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Your church on Messenger
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    Facebook Messenger is where millions of Africans connect with communities and businesses. SDASMS Messenger API gives your church a powerful presence on this platform — with intelligent chatbots that answer questions 24/7, automated responses that never leave a message unanswered, rich template messages with buttons and carousels, and seamless handover to your pastoral team when personal attention is needed. Connected directly to your church&apos;s Facebook Page, Messenger becomes a 24/7 ministry tool.
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
                Messenger API <span style={{ color: PRODUCT_COLOR }}>features</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Build powerful, automated Messenger experiences that serve your congregation around the clock.
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
                  Why Messenger matters <span style={{ color: PRODUCT_COLOR }}>for churches</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  With deep Facebook integration and massive adoption in Africa, Messenger is a natural channel for church communication and engagement.
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
                      <MessageCircle className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Messenger Bot Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Auto-Response Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>96%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '96%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Bot Resolution Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>70%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '70%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">User Satisfaction</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>88%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '88%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Handover Success</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>95%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '95%' }}
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
                From Facebook Page to live Messenger bot in three steps.
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
                Messenger for <span style={{ color: PRODUCT_COLOR }}>ministry</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Transform your church Facebook Page from a broadcast channel into an interactive ministry platform.
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
                Everything you need to know about Messenger API. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0084FF]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Automate your church
                <br />
                <span className="bg-gradient-to-r from-[#0084FF] to-[#0066CC] bg-clip-text text-transparent">
                  Messenger experience
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Turn your Facebook Page into a 24/7 ministry tool. Chatbots, auto-replies, and rich interactions — all through SDASMS Messenger API.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#0084FF] hover:bg-[#0066CC] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#0084FF]/25 transition-all duration-300"
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
