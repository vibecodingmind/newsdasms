'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Megaphone,
  Puzzle,
  MessageSquare,
  ImageIcon,
  Reply,
  Bot,
  BarChart3,
  UserPlus,
  ArrowRight,
  Zap,
  Shield,
  Users,
  HandHeart,
  BookOpen,
  Heart,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#7360F2'

const stats = [
  { value: '1B+', label: 'Global Users' },
  { value: 'Rich', label: 'Media Support' },
  { value: 'Chatbot', label: 'API Access' },
  { value: 'East Africa', label: 'Popular Region' },
]

const features = [
  {
    icon: Megaphone,
    title: 'Viber Campaigns',
    description: 'Send broadcast campaigns to your Viber subscribers with rich media, buttons, and branded content. Reach your community in a format that stands out.',
  },
  {
    icon: Puzzle,
    title: 'Chat Extensions',
    description: 'Extend your chatbot with custom functionality — donation processing, event registration, Bible verse lookup, and more — right inside the conversation.',
  },
  {
    icon: MessageSquare,
    title: 'Business Messages',
    description: 'Send transactional and promotional business messages with your verified brand identity. Professional communication that builds trust.',
  },
  {
    icon: ImageIcon,
    title: 'Rich Media',
    description: 'Share images, videos, stickers, and files through Viber. Send sermon graphics, event flyers, and worship recordings with visual impact.',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description: 'Add quick-reply buttons to guide conversations. "Join Bible Study", "Submit Prayer Request", "Get Directions" — one tap to take action.',
  },
  {
    icon: Bot,
    title: 'Chatbot API',
    description: 'Build custom chatbots using our API. Create automated flows for FAQs, prayer requests, event info, and daily devotionals with natural conversation.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track message delivery, read receipts, click-through rates, and subscriber growth. Understand what content resonates with your community.',
  },
  {
    icon: UserPlus,
    title: 'Subscribe Buttons',
    description: 'Add subscribe buttons to your website and social media. Grow your Viber subscriber list organically with easy opt-in mechanisms.',
  },
]

const benefits = [
  {
    icon: Users,
    title: 'Popular in East Africa',
    description: 'Viber has a strong and growing user base across East Africa, particularly in Tanzania and surrounding countries. Reach your community on a platform they trust.',
  },
  {
    icon: Zap,
    title: 'Free to Receive',
    description: 'Viber messages are free for your congregation to receive. No data charges or SMS fees — removing a significant barrier to communication in Africa.',
  },
  {
    icon: MessageSquare,
    title: 'Rich Messaging',
    description: 'Go beyond plain text with stickers, images, videos, and interactive buttons. Create engaging, visually appealing messages that capture attention.',
  },
  {
    icon: Shield,
    title: 'Brand Verification',
    description: 'Your verified Viber business account displays your church name, logo, and verified badge. Members know every message is authentically from your ministry.',
  },
]

const steps = [
  {
    title: 'Create Your Viber Bot',
    description: 'Set up your Viber business account and create your bot through SDASMS. We handle the verification, branding, and configuration process.',
  },
  {
    title: 'Design Your Flows',
    description: 'Use our visual flow builder to create conversation flows, set up quick replies, design message templates, and configure automated responses.',
  },
  {
    title: 'Launch & Grow',
    description: 'Deploy your Viber bot and start growing your subscriber base. Share your Viber link, add subscribe buttons to your website, and invite your congregation.',
  },
]

const useCases = [
  {
    icon: Megaphone,
    title: 'Community Broadcasts',
    description: 'Send important church announcements, event updates, and community news to all your Viber subscribers with rich media and interactive elements.',
  },
  {
    icon: Users,
    title: 'Youth Group Chats',
    description: 'Engage young people on Viber with interactive Bible quizzes, daily verse challenges, and youth event promotions. Meet them on their preferred platform.',
  },
  {
    icon: HandHeart,
    title: 'Fundraising Campaigns',
    description: 'Launch giving campaigns with compelling visuals, progress tracking, and donate buttons. Make it easy for members to contribute to building funds and missions.',
  },
  {
    icon: BookOpen,
    title: 'Bible Verse Subscriptions',
    description: 'Let members subscribe to daily or weekly Bible verse deliveries on Viber. Different subscription tracks: encouragement, wisdom, prophecy, and more.',
  },
]

const faqs = [
  {
    question: 'Is Viber popular in Africa?',
    answer: 'Yes, Viber has a strong and growing presence in East Africa, especially in Tanzania and Kenya where it is one of the top messaging apps. With over 1 billion users worldwide, Viber\'s popularity in the region makes it a valuable channel for churches looking to reach their community on a platform they already use and trust daily.',
  },
  {
    question: 'Can I send campaigns to Viber users?',
    answer: 'Yes, you can send promotional campaigns, transactional messages, and conversational messages to your Viber subscribers. Campaigns support rich media with images, buttons, and carousels that make your church announcements visually engaging. Target specific subscriber segments for relevant messaging that drives higher engagement and response rates.',
  },
  {
    question: 'What message types are supported?',
    answer: 'Viber supports text, images, video, file sharing, and rich media with interactive buttons. You can send everything from simple text announcements to rich card messages with multiple action buttons. Stickers and GIFs are also supported for more casual, youth-oriented communication that feels natural on the platform.',
  },
  {
    question: 'Do recipients need to subscribe?',
    answer: 'Yes, recipients must opt-in to receive business messages on Viber. This ensures your audience is genuinely interested in hearing from your church. We provide subscribe buttons for your website and social media, QR codes for in-person events, and easy sharing links that make growing your subscriber list simple and organic.',
  },
  {
    question: 'Can I automate conversations?',
    answer: 'Yes, build chatbots and auto-replies using our visual builder or RESTful API. Create automated flows for frequently asked questions, prayer request collection, event information, and daily Bible verse delivery. Our visual flow builder requires no coding, while the API provides full flexibility for developers who want custom integrations.',
  },
  {
    question: 'What is the delivery rate?',
    answer: 'Viber delivers high delivery rates with read receipts showing when messages are seen by your subscribers. Messages sent through our platform typically achieve 82%+ read rates, significantly higher than email or SMS. The read receipt feature gives you real-time visibility into message performance, allowing you to follow up with recipients who haven\'t seen important announcements.',
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

export default function ViberPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Smartphone className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Viber for Business' }}
          title="Viber for"
          titleAccent="Business"
          subtitle="Reach your community on Viber with business messaging — send campaigns, chat with members, and automate conversations."
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
                  <Smartphone className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Ministry messaging on Viber
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    Viber is one of the most popular messaging apps in East Africa, with over 1 billion users worldwide. SDASMS Viber for Business lets your church create verified business accounts, send rich media campaigns, build interactive chatbots, and engage your community with stickers, images, videos, and quick-reply buttons. Messages are free for recipients to receive, removing cost barriers that are especially important in African markets. Whether you&apos;re sending community broadcasts, running youth group chats, or launching fundraising campaigns, Viber provides a rich, interactive platform for ministry communication.
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
                Viber Business <span style={{ color: PRODUCT_COLOR }}>features</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Everything you need to create engaging Viber experiences for your ministry community.
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
                  Why choose <span style={{ color: PRODUCT_COLOR }}>Viber</span> for your ministry
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Viber offers unique advantages for African churches, from cost-free receiving to rich media support that brings your messages to life.
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
                      <Smartphone className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Viber Campaign Metrics</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Message Read Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>82%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '82%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Button Click Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>45%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '45%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Subscriber Growth</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>60%/mo</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Bot Resolution Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>72%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '72%' }}
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
                Three steps to launch your church on Viber.
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
                Viber for <span style={{ color: PRODUCT_COLOR }}>your community</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From community broadcasts to youth engagement, Viber provides versatile messaging for every ministry need.
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
                Everything you need to know about Viber. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#7360F2]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Engage your community on
                <br />
                <span className="bg-gradient-to-r from-[#7360F2] to-[#8B5CF6] bg-clip-text text-transparent">
                  Viber today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Join African churches using Viber for Business through SDASMS. Rich messaging, chatbot automation, and free-to-receive campaigns for your ministry.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#7360F2] hover:bg-[#6347E0] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#7360F2]/25 transition-all duration-300"
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
