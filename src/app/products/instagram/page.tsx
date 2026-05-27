'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Instagram,
  MessageSquare,
  MessageCircle,
  Star,
  FileText,
  ImageIcon,
  Reply,
  Webhook,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  Heart,
  CalendarCheck,
  Sparkles,
  Megaphone,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#E4405F'

const stats = [
  { value: '2B+', label: 'Global Users' },
  { value: 'DM', label: 'Automation' },
  { value: 'Visual', label: 'Platform' },
  { value: 'Youth', label: 'Demographic' },
]

const features = [
  {
    icon: MessageSquare,
    title: 'DM Automation',
    description: 'Automatically respond to Instagram Direct Messages. Handle FAQs, prayer requests, event inquiries, and welcome new followers — all on autopilot.',
  },
  {
    icon: MessageCircle,
    title: 'Comment Replies',
    description: 'Auto-reply to comments on your posts with helpful information or DM follow-ups. Engage your audience right where they interact with your content.',
  },
  {
    icon: Star,
    title: 'Story Mentions',
    description: 'Detect when your church is mentioned in Instagram Stories. Automatically engage with user-generated content and build community connections.',
  },
  {
    icon: FileText,
    title: 'Message Templates',
    description: 'Create reusable message templates for common responses: service info, event details, welcome messages, and thank-you notes for new followers.',
  },
  {
    icon: ImageIcon,
    title: 'Media Messages',
    description: 'Send images, videos, and carousel posts through DM. Share sermon graphics, event flyers, and ministry highlights with rich visual content.',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description: 'Present quick-tap reply options in DMs. "Tell me more", "I want to visit", "Prayer request" — guide conversations with structured responses.',
  },
  {
    icon: Webhook,
    title: 'Webhook Events',
    description: 'Receive real-time notifications for new DMs, comments, mentions, and follower events. Build custom workflows and trigger actions automatically.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track DM volume, response rates, follower growth, and engagement metrics. Understand how your Instagram ministry is performing and optimize.',
  },
]

const benefits = [
  {
    icon: ImageIcon,
    title: 'Visual Platform',
    description: 'Instagram is the visual storytelling platform. Share your church\'s story through images and videos, then engage interested people through automated DMs.',
  },
  {
    icon: Zap,
    title: 'DM Automation',
    description: 'Never miss a DM again. Automated responses handle inquiries instantly, even at 2 AM. Every message gets a response, building trust and engagement.',
  },
  {
    icon: Users,
    title: 'Young Demographic',
    description: 'Instagram reaches the next generation. If your ministry wants to connect with youth and young adults, Instagram is where they spend their time.',
  },
  {
    icon: Heart,
    title: 'Brand Presence',
    description: 'A strong Instagram presence with automated DM support shows your church is modern, accessible, and tech-savvy — attracting younger members.',
  },
]

const steps = [
  {
    title: 'Connect Your Account',
    description: 'Link your church\'s Instagram Business account to SDASMS. We handle the API authorization, permissions, and webhook configuration.',
  },
  {
    title: 'Configure Automation',
    description: 'Set up auto-reply rules, create message templates, configure keyword triggers, and design conversation flows for your Instagram DMs.',
  },
  {
    title: 'Engage & Grow',
    description: 'Go live with automated DMs and comment responses. Monitor engagement, optimize your flows, and watch your Instagram community grow.',
  },
]

const useCases = [
  {
    icon: MessageSquare,
    title: 'DM Auto-Responses',
    description: 'Automatically reply to every DM your church receives. Whether it\'s a question about service times, a prayer request, or a visitor inquiry — every message gets an instant, helpful response.',
  },
  {
    icon: Megaphone,
    title: 'Event Promotion',
    description: 'When followers comment on event posts, automatically DM them with registration links, event details, and personalized invitations — turning interest into attendance.',
  },
  {
    icon: Users,
    title: 'Youth Engagement',
    description: 'Connect with young people on their preferred platform. Use Instagram automation to share youth group updates, Bible challenges, and mentorship opportunities.',
  },
  {
    icon: Sparkles,
    title: 'Community Management',
    description: 'Manage your Instagram community at scale. Auto-respond to story mentions, acknowledge comments, and nurture relationships with followers through personalized DMs.',
  },
]

const faqs = [
  {
    question: 'Can I automate Instagram DMs?',
    answer: 'Yes, you can automate responses to direct messages and comment replies using our visual flow builder or API. Set up keyword triggers that detect specific words or phrases and respond with relevant information automatically. Whether it\'s service times, event details, or prayer request collection, your Instagram DMs are answered instantly, 24 hours a day, 7 days a week.',
  },
  {
    question: 'Does it support story mentions?',
    answer: 'Yes, our platform detects and responds when your church is mentioned in Instagram Stories. When someone tags your church in a story, you can automatically send them a thank-you DM, add them to a follow-up list, or trigger a personalized response. This helps you engage with user-generated content and build stronger community connections.',
  },
  {
    question: 'Can I reply to comments automatically?',
    answer: 'Yes, you can set up auto-replies for comments on your Instagram posts. When someone comments on an event post, they can automatically receive a DM with registration details. You can configure different auto-reply rules for different post types, keywords, or hashtags, ensuring every commenter gets a relevant and timely response.',
  },
  {
    question: 'What are message templates?',
    answer: 'Message templates are pre-formatted responses for common inquiries like service times, directions, event details, and new visitor information. Create a library of templates that your chatbot uses to respond consistently and accurately. Templates save time, ensure message quality, and can include rich media like images, carousels, and quick reply buttons.',
  },
  {
    question: 'How does DM automation work?',
    answer: 'Set up keyword triggers and auto-response rules that detect specific words in incoming DMs and respond accordingly. For example, "service" triggers service times, "pray" routes to the prayer team, and "visit" sends directions and parking info. Our AI-powered system understands context and variations, so "when do you meet?" and "what time is service?" both get the right response.',
  },
  {
    question: 'Is it approved by Instagram?',
    answer: 'Yes, we use the official Instagram Messaging API approved by Meta for business communication. This means your automation runs on a legitimate, sanctioned platform with full compliance to Instagram\'s policies. Your account remains in good standing, and you get access to the full suite of Instagram messaging features without any risk of penalties or restrictions.',
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

export default function InstagramPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Instagram className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Instagram API' }}
          title="Instagram"
          titleAccent="API"
          subtitle="DM automation — manage messages, automate responses, and connect with your community through Instagram Direct."
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
                  <Instagram className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Reach the next generation on Instagram
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    Instagram is where Africa&apos;s youth and young adults spend their time — and it&apos;s where your ministry needs to be. SDASMS Instagram API enables your church to automate Direct Message responses, auto-reply to post comments, detect Story mentions, and build engaging DM chatbot experiences. With 2 billion users globally and a skew toward younger demographics, Instagram is the ideal platform for youth ministry, event promotion, and community building. Our API handles the complexity so you can focus on ministry.
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
                Instagram API <span style={{ color: PRODUCT_COLOR }}>features</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Automate and scale your Instagram community engagement with powerful API features.
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
                  Why Instagram is <span style={{ color: PRODUCT_COLOR }}>vital</span> for ministry
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Instagram isn&apos;t just a social media platform — it&apos;s where the next generation discovers communities, explores faith, and connects with purpose.
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
                      <Instagram className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Instagram DM Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">DM Response Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>100%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Comment-to-DM Conversion</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>35%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '35%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Youth Engagement</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>78%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '78%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Story Mention Detection</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>92%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
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
                Three steps to automate your Instagram ministry engagement.
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
                Instagram for <span style={{ color: PRODUCT_COLOR }}>ministry outreach</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Instagram&apos;s visual nature and young audience make it the perfect platform for reaching the next generation with the Gospel.
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
                Everything you need to know about Instagram API. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E4405F]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Reach the next generation on
                <br />
                <span className="bg-gradient-to-r from-[#E4405F] to-[#F77737] bg-clip-text text-transparent">
                  Instagram
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Automate your Instagram DMs, engage youth, and build a vibrant online ministry community. Get started with SDASMS Instagram API today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#E4405F] hover:bg-[#C13584] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#E4405F]/25 transition-all duration-300"
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
