'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Headphones,
  MessageSquare,
  Route,
  ClipboardList,
  Reply,
  FileUp,
  ScrollText,
  Eye,
  Inbox,
  ArrowRight,
  Zap,
  Users,
  HandHeart,
  Globe2,
  Bell,
  CalendarCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#06B6D4'

const stats = [
  { value: '2min', label: 'Avg. Response' },
  { value: '24/7', label: 'Support' },
  { value: 'Chat Widget', label: 'Embeddable' },
  { value: 'Real-time', label: 'Messaging' },
]

const features = [
  {
    icon: MessageSquare,
    title: 'Live Chat Widget',
    description: 'Embed a customizable chat widget on your church website. Visitors can start a conversation with just one click — no registration or downloads required.',
  },
  {
    icon: Route,
    title: 'Chat Routing',
    description: 'Automatically route chats to the right team member — prayer requests to the prayer team, visitor inquiries to hospitality, and general questions to admin.',
  },
  {
    icon: ClipboardList,
    title: 'Pre-Chat Forms',
    description: 'Collect visitor information before the chat starts. Know their name, inquiry type, and how you can help — so you\'re prepared before saying hello.',
  },
  {
    icon: Reply,
    title: 'Canned Responses',
    description: 'Save frequently used responses for common questions like service times, directions, and event details. Reply instantly with consistent, accurate information.',
  },
  {
    icon: FileUp,
    title: 'File Sharing',
    description: 'Share documents, sermon notes, event flyers, and resources directly in the chat. Send PDFs, images, and links without switching to email.',
  },
  {
    icon: ScrollText,
    title: 'Chat Transcripts',
    description: 'Every conversation is automatically saved and transcribed. Review past chats for follow-up, training, and ensuring no prayer request falls through the cracks.',
  },
  {
    icon: Eye,
    title: 'Visitor Insights',
    description: 'See which pages visitors are browsing, how they found your site, and their location. Engage proactively with visitors who seem interested but haven\'t reached out.',
  },
  {
    icon: Inbox,
    title: 'Offline Messages',
    description: 'When your team is offline, visitors can leave messages that become tickets. Respond to prayer requests and inquiries first thing when you\'re back online.',
  },
]

const benefits = [
  {
    icon: Zap,
    title: 'Instant Connection',
    description: 'Connect with website visitors the moment they need you. No waiting for email replies or phone callbacks — real-time support when it matters most.',
  },
  {
    icon: Users,
    title: 'Visitor Engagement',
    description: 'Turn passive website visitors into engaged community members. Proactive chat invitations and instant responses increase engagement by up to 40%.',
  },
  {
    icon: HandHeart,
    title: 'Prayer Support 24/7',
    description: 'Even when your team is offline, the chat widget collects prayer requests and urgent needs. Automated responses acknowledge receipt and promise follow-up.',
  },
  {
    icon: Globe2,
    title: 'Lead Capture',
    description: 'Every chat is an opportunity to capture visitor information, invite them to services, and add them to your ministry contact list for ongoing communication.',
  },
]

const steps = [
  {
    title: 'Install the Widget',
    description: 'Add a single line of code to your church website. Customize the widget colors, greeting, and position to match your brand. No technical skills needed.',
  },
  {
    title: 'Set Up Your Team',
    description: 'Add team members, define chat routing rules, and create canned responses. Set business hours and offline message collection.',
  },
  {
    title: 'Start Chatting',
    description: 'Go live and start engaging visitors in real-time. Monitor chats, review transcripts, and track visitor insights from your dashboard.',
  },
]

const useCases = [
  {
    icon: Headphones,
    title: 'Website Visitor Support',
    description: 'Help visitors find service times, get directions, learn about ministries, and answer questions about your church — all in real-time while they browse your site.',
  },
  {
    icon: HandHeart,
    title: 'Prayer Request Intake',
    description: 'Provide an immediate, personal way for people to submit prayer requests. Your prayer team receives requests instantly and can respond with encouragement.',
  },
  {
    icon: Sparkles,
    title: 'New Visitor Welcome',
    description: 'Automatically greet first-time website visitors with a warm welcome message. Guide them to service information, directions, and what to expect on Sunday.',
  },
  {
    icon: CalendarCheck,
    title: 'Event Registration Help',
    description: 'Help visitors register for events, conferences, and programs in real-time. Answer questions about event details, pricing, and logistics instantly.',
  },
]

const faqs = [
  {
    question: 'How do I add the chat widget to my website?',
    answer: 'Simply add one line of JavaScript code to your website\'s HTML, and the chat widget appears instantly. We provide step-by-step guides for WordPress, Wix, Squarespace, and custom websites. No technical skills are required — if you can copy and paste, you can install the widget. Our team also offers free installation assistance for any church that needs help.',
  },
  {
    question: 'Can multiple team members handle chats?',
    answer: 'Yes, you can add unlimited agents depending on your plan. Each agent gets their own login, and our intelligent routing distributes chats evenly across available team members. You can assign specific agents to handle specific topics — prayer requests, visitor inquiries, or general questions — ensuring every conversation reaches the right person.',
  },
  {
    question: 'What happens when we\'re offline?',
    answer: 'When your team is offline, visitors can leave messages that automatically become tickets for follow-up. You can also set up an auto-responder that acknowledges receipt and provides helpful information like service times and church address. When your team comes back online, all pending messages are queued and ready for response.',
  },
  {
    question: 'Can I customize the chat widget?',
    answer: 'Yes, you can fully customize colors, greeting messages, position on the page, branding, and even the avatar. Match the widget perfectly to your church website\'s design. You can also set different greetings for different pages — for example, a "Welcome to our church" message on the homepage and a "Questions about giving?" message on the donations page.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer: 'Yes, the chat widget is fully responsive and works seamlessly on all devices — smartphones, tablets, and desktops. On mobile, the widget adapts to a full-screen chat experience that feels native. Over 60% of website visitors browse on mobile in Africa, so we\'ve optimized the mobile experience to be fast, smooth, and easy to use.',
  },
  {
    question: 'Can I see what pages visitors are browsing?',
    answer: 'Yes, our visitor insights show the current page, referrer source, location, and browsing history in real-time. This helps your team understand the visitor\'s context before engaging. If someone is on the "Give" page, your agent can proactively offer help with donations. If they\'re on "Service Times," you can share directions and parking information.',
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

export default function LiveChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Headphones className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Live Chat Channel' }}
          title="Live Chat for"
          titleAccent="Church Websites"
          subtitle="Engage visitors instantly with live support, prayer requests, and counseling. Real-time conversations that build community."
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
                  <Headphones className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Real-time connection with every website visitor
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    SDASMS Live Chat adds a powerful real-time communication channel to your church website. Visitors can ask questions, submit prayer requests, and get immediate support — all without picking up the phone or waiting for an email reply. With intelligent chat routing, canned responses for common questions, visitor insights, and offline message collection, your team can provide warm, personal support around the clock. Turn your website from a static brochure into an interactive ministry tool.
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
                Chat features for <span style={{ color: PRODUCT_COLOR }}>ministry engagement</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Every feature designed to help your church connect with visitors and members in real-time.
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
                  Why churches need <span style={{ color: PRODUCT_COLOR }}>live chat</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Today&apos;s visitors expect instant answers. Live chat transforms your church website from a one-way information source into a two-way ministry conversation.
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
                      <Headphones className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Chat Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Avg. Response Time</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>2 min</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Visitor Satisfaction</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>94%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '94%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Chat-to-Visit Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>38%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '38%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Prayer Request Capture</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>85%</span>
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
                Get live chat running on your church website in under 10 minutes.
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
                Live chat for <span style={{ color: PRODUCT_COLOR }}>every ministry touchpoint</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From first-time visitors to long-time members, live chat provides instant, personal connection at every point in the ministry journey.
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
                Everything you need to know about Live Chat. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Connect with every visitor
                <br />
                <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">
                  in real time
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Add live chat to your church website today. Start engaging visitors, capturing prayer requests, and building community — one conversation at a time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#06B6D4]/25 transition-all duration-300"
                >
                  Start Free Trial
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
