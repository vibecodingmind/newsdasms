'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mic,
  Volume2,
  Type,
  PhoneCall,
  Clock,
  Languages,
  AudioLines,
  PhoneForwarded,
  PhoneIncoming,
  ArrowRight,
  Zap,
  Users,
  HandHeart,
  Bell,
  BookOpen,
  AlertTriangle,
  Heart,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#EF4444'

const stats = [
  { value: '95%', label: 'Completion Rate' },
  { value: 'Multi-Language', label: 'Swahili & English' },
  { value: '10K+', label: 'Calls Per Day' },
  { value: 'IVR', label: 'Menu Support' },
]

const features = [
  {
    icon: Volume2,
    title: 'Voice Broadcasting',
    description: 'Deliver pre-recorded voice messages to thousands of recipients simultaneously. Perfect for reaching your entire congregation with a personal pastor\'s greeting.',
  },
  {
    icon: Type,
    title: 'Text-to-Speech',
    description: 'Convert any text message into natural-sounding speech in Swahili and English. Type your message and let our AI voice deliver it with warmth and clarity.',
  },
  {
    icon: PhoneCall,
    title: 'IVR Menus',
    description: 'Create interactive voice response menus: "Press 1 for service times, 2 for prayer request, 3 to speak with a pastor." Route callers automatically.',
  },
  {
    icon: Clock,
    title: 'Call Scheduling',
    description: 'Schedule voice broadcasts for the perfect time — morning devotions, evening prayer reminders, or Sunday service follow-ups at your chosen time.',
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Record messages in Swahili, English, or any local dialect. Reach every member of your community in their preferred language.',
  },
  {
    icon: AudioLines,
    title: 'Call Recording',
    description: 'Record and store all voice interactions for quality assurance and training. Review prayer hotlines and counseling calls for pastoral follow-up.',
  },
  {
    icon: PhoneForwarded,
    title: 'Live Transfer',
    description: 'Transfer incoming calls to the right person — prayer team, pastoral care, or administration. Ensure every caller reaches the help they need.',
  },
  {
    icon: PhoneIncoming,
    title: 'Toll-Free Numbers',
    description: 'Provide toll-free numbers so members can call your church without cost. Remove barriers to reaching out for prayer, counseling, or information.',
  },
]

const benefits = [
  {
    icon: Users,
    title: 'Reaches Non-Smartphone Users',
    description: 'Voice messaging works on every phone — feature phones, landlines, and smartphones alike. Reach elderly members and rural communities who may not have internet access.',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    description: 'Nothing conveys care like a human voice. A pastor\'s recorded greeting feels personal and pastoral in a way that text simply cannot match.',
  },
  {
    icon: Languages,
    title: 'Multi-Language (Swahili/English)',
    description: 'Africa is multilingual. Voice messaging lets you communicate naturally in Swahili, English, or local dialects without worrying about literacy levels.',
  },
  {
    icon: Zap,
    title: 'High Completion Rates',
    description: 'With a 95% call completion rate, you can trust that your voice messages are reaching your congregation. More reliable than any other channel for urgent communication.',
  },
]

const steps = [
  {
    title: 'Record Your Message',
    description: 'Record your voice message by phone, upload an audio file, or use text-to-speech to convert your written message into natural-sounding speech in Swahili or English.',
  },
  {
    title: 'Set Your Audience & Schedule',
    description: 'Select which contact groups receive the call, choose your caller ID, and schedule the broadcast for the optimal time — or send immediately.',
  },
  {
    title: 'Broadcast & Monitor',
    description: 'Your message is delivered simultaneously to all recipients. Monitor live call progress, completion rates, and IVR responses in your dashboard.',
  },
]

const useCases = [
  {
    icon: HandHeart,
    title: 'Prayer Request Hotlines',
    description: 'Set up toll-free prayer hotlines where members can call in with prayer requests. IVR menus route them to the right prayer team, and calls are recorded for pastoral follow-up.',
  },
  {
    icon: BookOpen,
    title: 'Sermon Excerpts Delivery',
    description: 'Send 30-60 second sermon highlights directly to your congregation\'s phones. A powerful way to extend Sunday\'s message throughout the week.',
  },
  {
    icon: Bell,
    title: 'Event Voice Reminders',
    description: 'Send warm, personal voice reminders for upcoming events, conferences, and special services. Voice reminders feel more personal and get higher attendance than text alone.',
  },
  {
    icon: Heart,
    title: 'Pastoral Care Messages',
    description: 'Deliver pastoral care voice messages to shut-ins, hospital patients, and homebound members. A pastor\'s voice brings comfort and connection when they can\'t attend in person.',
  },
]

const faqs = [
  {
    question: 'How does voice broadcasting work?',
    answer: 'Upload or record a voice message, select your audience from your contact groups, and broadcast simultaneously to thousands of recipients across African networks. Messages are delivered as phone calls — when the recipient answers, they hear your pre-recorded message. You can schedule broadcasts for optimal times and monitor live delivery progress from your dashboard.',
  },
  {
    question: 'Can I use text-to-speech?',
    answer: 'Yes, our text-to-speech engine converts any written text into natural-sounding speech in both Swahili and English. Simply type your message and our AI voice delivers it with warmth and clarity. This is perfect for quickly creating voice messages without recording equipment, and the speech quality is natural enough for pastoral greetings and announcements.',
  },
  {
    question: 'What are IVR menus?',
    answer: 'Interactive Voice Response (IVR) menus let callers navigate options by pressing number keys on their phone. For example: "Press 1 for service times, 2 for prayer request, 3 to speak with a pastor." IVR routes callers automatically to the right department or provides self-service information, reducing the burden on your staff while improving the caller experience.',
  },
  {
    question: 'Does it support Swahili?',
    answer: 'Yes, you can record messages in any language including Swahili, English, and local dialects. Our text-to-speech engine also supports Swahili output. This multilingual capability is essential for African churches that serve diverse communities. Record separate messages in different languages and target them to specific contact groups for maximum relevance.',
  },
  {
    question: 'What is the call completion rate?',
    answer: 'We achieve a 95% average call completion rate across African networks. This means 95 out of 100 calls are successfully delivered and answered. Our platform uses intelligent retry logic for unanswered calls, automatically redialing at optimal intervals. We also detect voicemail and can leave messages, ensuring your voice broadcast reaches its audience.',
  },
  {
    question: 'Can recipients call back?',
    answer: 'Yes, you can provide toll-free numbers and enable live transfer to your team. When a recipient hears your broadcast and wants to follow up, they can call the number back and be connected to a live person. You can also set up IVR menus that route callbacks to the appropriate ministry team — prayer, counseling, or administration.',
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

export default function VoicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Mic className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Voice Channel' }}
          title="Voice Broadcasting"
          titleAccent="for Ministry"
          subtitle="Deliver pre-recorded voice messages to thousands simultaneously. Perfect for reaching members who prefer audio or have limited literacy."
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
                  <Mic className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    The power of voice for ministry outreach
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    SDASMS Voice Broadcasting delivers pre-recorded voice messages to thousands of recipients simultaneously across African networks. With 95% call completion rates, multi-language support for Swahili and English, interactive IVR menus, and text-to-speech capabilities — voice messaging reaches everyone, including those without smartphones or internet access. A pastor&apos;s voice carries warmth, authority, and pastoral care that no text message can replicate.
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
                Voice features built for <span style={{ color: PRODUCT_COLOR }}>ministry impact</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From voice broadcasting to IVR menus, every feature is designed for how churches and ministries actually communicate.
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
                  Why voice is <span style={{ color: PRODUCT_COLOR }}>essential</span> for Africa
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  In many African communities, voice is the most natural and trusted form of communication. Voice messaging bridges the digital divide and reaches everyone.
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
                      <Mic className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Voice Campaign Metrics</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Call Completion Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>95%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '95%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Listen-Through Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>88%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '88%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">IVR Engagement</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>72%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '72%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Callback Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>34%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '34%' }}
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
                From recording to broadcasting — get your voice message to thousands in three simple steps.
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
                Voice for every <span style={{ color: PRODUCT_COLOR }}>pastoral need</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Voice messaging is uniquely powerful for ministry — it carries emotion, warmth, and authority that text cannot convey.
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
                Everything you need to know about Voice. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#EF4444]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let your voice reach
                <br />
                <span className="bg-gradient-to-r from-[#EF4444] to-[#FF8340] bg-clip-text text-transparent">
                  every member of your flock
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Start broadcasting voice messages today. Your pastoral voice, delivered to thousands — in Swahili, English, or any language your community speaks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#EF4444]/25 transition-all duration-300"
                >
                  Start Broadcasting
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
