'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Radio,
  Image as ImageIcon,
  MousePointerClick,
  LayoutGrid,
  Eye,
  Type,
  BadgeCheck,
  MapPin,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
  HandHeart,
  CalendarCheck,
  BookOpen,
  Users,
  Heart,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#8B5CF6'

const stats = [
  { value: '3x', label: 'Higher Engagement' },
  { value: '80%', label: 'Read Rate' },
  { value: 'Rich', label: 'Media Support' },
  { value: 'Interactive', label: 'Messaging' },
]

const features = [
  {
    icon: ImageIcon,
    title: 'Rich Media Cards',
    description: 'Send stunning visual cards with images, titles, and descriptions. Share sermon graphics, event flyers, and ministry highlights in a beautiful format.',
  },
  {
    icon: MousePointerClick,
    title: 'Interactive Buttons',
    description: 'Add clickable action buttons to your messages. Let recipients RSVP, donate, sign up, or navigate directly — all from within the message.',
  },
  {
    icon: LayoutGrid,
    title: 'Carousel Messages',
    description: 'Display multiple cards in a swipeable carousel. Showcase an entire sermon series, upcoming events, or ministry programs in a single message.',
  },
  {
    icon: Eye,
    title: 'Read Receipts',
    description: 'Know exactly when your message has been read. Track engagement in real-time and follow up with members who haven\'t seen important announcements.',
  },
  {
    icon: Type,
    title: 'Typing Indicators',
    description: 'See when your congregation is composing a reply. Enables more natural, conversational communication between church leadership and members.',
  },
  {
    icon: BadgeCheck,
    title: 'Branded Messaging',
    description: 'Display your church name, logo, and verified badge on every message. Build trust and brand recognition with verified sender identity.',
  },
  {
    icon: MapPin,
    title: 'Location Sharing',
    description: 'Share your church location with interactive maps. Help visitors find your service, outreach events, or community projects with a single tap.',
  },
  {
    icon: MessageSquare,
    title: 'Suggested Replies',
    description: 'Provide quick-tap reply options like "I\'ll be there!", "Praying for you", or "Sign me up". Reduce friction and increase response rates.',
  },
]

const benefits = [
  {
    icon: Zap,
    title: '3x Higher Engagement',
    description: 'RCS messages with rich media and interactive elements drive 3x more engagement than standard SMS, ensuring your congregation actually interacts with your messages.',
  },
  {
    icon: CheckCircle2,
    title: 'No App Download Needed',
    description: 'RCS works natively on most Android devices — no additional app installation required. Your members already have everything they need built into their phones.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Sender Branding',
    description: 'Your church name and logo appear with a verified checkmark, building trust and ensuring members know the message is authentically from your ministry.',
  },
  {
    icon: MousePointerClick,
    title: 'Interactive Responses',
    description: 'Members can RSVP to events, submit prayer requests, or donate — all without leaving the messaging app. Frictionless engagement that drives action.',
  },
]

const steps = [
  {
    title: 'Design Your Rich Message',
    description: 'Use our drag-and-drop RCS builder to create stunning messages with images, carousels, buttons, and suggested replies — no coding required.',
  },
  {
    title: 'Select Your Audience',
    description: 'Choose which contact groups receive your rich message. Target specific ministries, age groups, or your entire congregation.',
  },
  {
    title: 'Engage & Analyze',
    description: 'Send your message and watch engagement in real-time. Track button clicks, carousel swipes, replies, and read receipts with detailed analytics.',
  },
]

const useCases = [
  {
    icon: CalendarCheck,
    title: 'Event Invitations with RSVP',
    description: 'Send beautiful event cards with images, details, and RSVP buttons. Members can confirm attendance with a single tap — no forms or phone calls needed.',
  },
  {
    icon: BookOpen,
    title: 'Sermon Series Promotion',
    description: 'Promote upcoming sermon series with carousel cards featuring each week\'s theme, scripture, and speaker. Build anticipation and increase attendance.',
  },
  {
    icon: Users,
    title: 'Church Directory Cards',
    description: 'Share contact cards for pastors, elders, and ministry leaders with tap-to-call and tap-to-email buttons. Help members connect with leadership easily.',
  },
  {
    icon: Heart,
    title: 'Donation Campaigns',
    description: 'Launch giving campaigns with compelling visuals, progress bars, and donate buttons. Make it effortless for members to contribute to building funds and outreach.',
  },
]

const faqs = [
  {
    question: 'What devices support RCS?',
    answer: 'RCS works natively on most Android devices with Google Messages or Samsung Messages as the default messaging app. This covers the vast majority of smartphones in Africa. As of 2024, over 1 billion Android devices globally support RCS, and the number continues to grow as more manufacturers adopt the standard.',
  },
  {
    question: 'Do recipients need to download an app?',
    answer: 'No! RCS works in the native messaging app that comes pre-installed on Android phones. Your congregation doesn\'t need to download anything or create new accounts. If their phone supports RCS, they\'ll automatically receive rich messages just like regular text messages — no extra steps required.',
  },
  {
    question: 'Can I add buttons and carousels to messages?',
    answer: 'Yes, RCS supports rich cards, carousels, suggested replies, and interactive buttons. You can add "RSVP" buttons, "Get Directions" links, "Donate Now" actions, and swipeable image carousels — all within the messaging app. These interactive elements drive 3x higher engagement compared to plain SMS messages.',
  },
  {
    question: 'What happens if a device doesn\'t support RCS?',
    answer: 'Messages automatically fallback to standard SMS when a recipient\'s device doesn\'t support RCS. This means your message is always delivered — it just arrives as a plain text SMS instead of a rich media message. Our platform detects device capabilities in real-time and routes accordingly, so you never have to worry about compatibility.',
  },
  {
    question: 'How is RCS different from SMS?',
    answer: 'RCS adds rich media support (images, video, audio), interactive buttons, carousels, read receipts, typing indicators, and verified sender branding — all features that SMS cannot provide. Think of RCS as the evolution of SMS: it works in the same messaging app your congregation already uses, but with a vastly enhanced experience that feels more like a messaging app than a text message.',
  },
  {
    question: 'Can I track engagement on RCS messages?',
    answer: 'Yes, you can track reads, button clicks, carousel interactions, and suggested reply selections in real-time. Our analytics dashboard shows exactly how your congregation engages with each rich media element, allowing you to optimize your messaging strategy for maximum impact and continually improve your communication approach.',
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

export default function RCSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Radio className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'RCS Channel' }}
          title="Rich Communication"
          titleAccent="Services"
          subtitle="The evolution of SMS with images, carousels, buttons, and interactive elements. Enhanced church communication with rich media."
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
                  <Radio className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    The next generation of church messaging
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    Rich Communication Services (RCS) transforms how churches connect with their congregations. Go beyond plain text with stunning images, interactive carousels, actionable buttons, and verified branding — all delivered directly to your members&apos; messaging app. No downloads, no apps to install. RCS brings app-like experiences to the native messaging experience your congregation already uses every day.
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
                Rich features for <span style={{ color: PRODUCT_COLOR }}>engaging messaging</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Create immersive, interactive messages that captivate your congregation and drive meaningful engagement.
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
                  Why ministries love <span style={{ color: PRODUCT_COLOR }}>RCS</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  RCS combines the simplicity of SMS with the power of a messaging app. Your congregation gets a rich, interactive experience without downloading anything.
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
                      <Radio className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">RCS vs SMS Engagement</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">RCS Read Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>80%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '80%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">RCS Engagement</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>3x SMS</span>
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
                        <span className="text-[#7F7F7F] dark:text-white/50">Button Click Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>62%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '62%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Carousel Interaction</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>55%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '55%' }}
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
                Create stunning RCS messages in three simple steps — no design skills needed.
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
                Transform how your <span style={{ color: PRODUCT_COLOR }}>church communicates</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                RCS opens up entirely new ways for churches and ministries to engage their congregation with rich, interactive experiences.
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
                Everything you need to know about RCS. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Elevate your church messaging
                <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D72444] bg-clip-text text-transparent">
                  with RCS today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Step into the future of church communication. Rich media, interactive buttons, and verified branding — all in your members&apos; native messaging app.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#8B5CF6]/25 transition-all duration-300"
                >
                  Start with RCS
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
