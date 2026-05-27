'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MousePointer,
  FileText,
  Repeat,
  Split,
  Users,
  BarChart3,
  Globe2,
  Droplets,
  ArrowRight,
  Zap,
  Sparkles,
  Bell,
  Newspaper,
  HandHeart,
  BookOpen,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#F59E0B'

const stats = [
  { value: '95%', label: 'Deliverability' },
  { value: '10K+', label: 'Emails Sent Daily' },
  { value: '50+', label: 'Templates' },
  { value: 'Automated', label: 'Sequences' },
]

const features = [
  {
    icon: MousePointer,
    title: 'Drag-and-Drop Editor',
    description: 'Build beautiful emails with our intuitive drag-and-drop editor. No HTML skills needed — create professional church newsletters and bulletins in minutes.',
  },
  {
    icon: FileText,
    title: 'Newsletter Templates',
    description: 'Choose from 50+ professionally designed templates for weekly newsletters, monthly bulletins, event invitations, and donation appeals — all customizable to your brand.',
  },
  {
    icon: Repeat,
    title: 'Automated Sequences',
    description: 'Set up automated email sequences for new visitor follow-ups, membership onboarding, and discipleship journeys that run on autopilot.',
  },
  {
    icon: Split,
    title: 'A/B Testing',
    description: 'Test subject lines, content, and send times to discover what resonates most with your congregation. Optimize every campaign for maximum engagement.',
  },
  {
    icon: Users,
    title: 'Subscriber Management',
    description: 'Organize subscribers into segments: active members, new visitors, donors, volunteers. Target each group with relevant, personalized content.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track opens, clicks, unsubscribes, and conversions in real-time. Understand what content your congregation engages with most.',
  },
  {
    icon: Globe2,
    title: 'Custom Domains',
    description: 'Send emails from your own church domain like news@yourchurch.org. Build credibility and avoid spam filters with authenticated sending.',
  },
  {
    icon: Droplets,
    title: 'Drip Campaigns',
    description: 'Create automated drip campaigns for sermon follow-ups, Bible reading plans, and new believer journeys that nurture faith over time.',
  },
]

const benefits = [
  {
    icon: Sparkles,
    title: 'Professional Branding',
    description: 'Every email you send reflects your ministry. Custom templates, branded headers, and consistent design ensure a professional image that builds trust.',
  },
  {
    icon: Repeat,
    title: 'Automated Follow-Ups',
    description: 'Never miss following up with a new visitor again. Automated sequences welcome, inform, and invite — even when your team is busy with ministry.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Know exactly how your emails perform. Track open rates, click-through rates, and conversions to continuously improve your communication strategy.',
  },
  {
    icon: Users,
    title: 'Segment Targeting',
    description: 'Send the right message to the right people. Segment by membership status, giving history, ministry involvement, and more for relevant communication.',
  },
]

const steps = [
  {
    title: 'Choose a Template',
    description: 'Browse our library of 50+ church-specific templates or start from scratch with our drag-and-drop editor. Customize colors, fonts, and images to match your brand.',
  },
  {
    title: 'Compose & Personalize',
    description: 'Write your content with personalization fields like first name, church location, and membership status. Preview across desktop and mobile devices.',
  },
  {
    title: 'Send & Measure',
    description: 'Send immediately or schedule for the optimal time. Track opens, clicks, and engagement in real-time with our analytics dashboard.',
  },
]

const useCases = [
  {
    icon: Newspaper,
    title: 'Weekly Newsletters',
    description: 'Keep your congregation informed with beautifully designed weekly newsletters featuring sermon recaps, upcoming events, prayer requests, and ministry highlights.',
  },
  {
    icon: FileText,
    title: 'Monthly Bulletins',
    description: 'Create and distribute monthly church bulletins digitally. Save printing costs while reaching more members with interactive content and clickable links.',
  },
  {
    icon: HandHeart,
    title: 'Donation Reports',
    description: 'Send personalized giving statements and donation impact reports. Show members how their contributions are making a difference in the community.',
  },
  {
    icon: BookOpen,
    title: 'Sermon Series Recaps',
    description: 'Extend the impact of your sermon series with weekly recap emails including key scriptures, discussion questions, and links to recordings.',
  },
]

const faqs = [
  {
    question: 'Can I use my own church domain?',
    answer: 'Yes, you can send emails from your own domain like news@yourchurch.org. We handle the DNS configuration, SPF, DKIM, and DMARC setup to ensure your emails are properly authenticated and avoid spam filters. Using your own domain builds credibility and makes your communications look professional and trustworthy to your congregation.',
  },
  {
    question: 'How many templates are available?',
    answer: 'We offer 50+ professionally designed church-specific templates covering weekly newsletters, monthly bulletins, event invitations, donation appeals, new visitor welcome sequences, prayer request follow-ups, and seasonal greetings. All templates are fully customizable with your church branding, colors, and logo through our drag-and-drop editor.',
  },
  {
    question: 'Can I automate email sequences?',
    answer: 'Yes, you can set up drip campaigns, autoresponders, and triggered sequences that run automatically. Create welcome series for new visitors, discipleship journeys for new believers, event follow-up sequences, and giving acknowledgment emails. Our automation builder supports time-based triggers, action-based triggers, and conditional logic for personalized journeys.',
  },
  {
    question: 'What is the deliverability rate?',
    answer: 'We maintain a 95% deliverability rate with authenticated sending through SPF, DKIM, and DMARC protocols. Our infrastructure is optimized for inbox placement across all major African and international email providers. We continuously monitor sender reputation, manage bounce rates, and follow best practices to ensure your church emails reach the inbox, not the spam folder.',
  },
  {
    question: 'Can I segment my email list?',
    answer: 'Yes, you can segment your email list by membership status, giving history, ministry involvement, attendance frequency, location, and custom fields you define. Create targeted campaigns for first-time visitors, regular attendees, donors, volunteers, or any combination. Segmented campaigns see 2-3x higher engagement than generic broadcasts.',
  },
  {
    question: 'Does it work with my existing church management software?',
    answer: 'Yes, you can integrate via our RESTful API or use import/export with CSV files. We support connections with popular church management platforms and can set up automated data syncing. If your current system exports contact data, we can work with it. Our team also provides custom integration support for larger ministries with specific requirements.',
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

export default function EmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <Mail className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'Email Channel' }}
          title="Email Campaigns for"
          titleAccent="Ministries"
          subtitle="Professional newsletters, bulletins, and donation updates with beautiful templates and powerful automation for your church."
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
                  <Mail className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Professional email made for ministry
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    SDASMS Email gives churches and ministries everything they need to create, send, and track professional email campaigns. From beautifully designed weekly newsletters to automated follow-up sequences for new visitors, our platform combines powerful automation with an intuitive drag-and-drop editor. With 95% deliverability, custom domain support, and 50+ church-specific templates, you can communicate with your congregation in a way that&apos;s both professional and personal.
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
                Everything you need for <span style={{ color: PRODUCT_COLOR }}>church email</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From beautiful templates to powerful automation, our email platform is built for the unique needs of ministries.
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
                  Why ministries choose <span style={{ color: PRODUCT_COLOR }}>SDASMS Email</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Email remains one of the most effective channels for ministry communication. With the right tools, your emails become a powerful extension of your pastoral care and community engagement.
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
                      <Mail className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Email Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Deliverability</span>
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
                        <span className="text-[#7F7F7F] dark:text-white/50">Open Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>42%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '42%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Click Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>28%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '28%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Automation Trigger Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>78%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '78%' }}
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
                Create stunning email campaigns in three easy steps — from template to inbox.
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
                Email for every <span style={{ color: PRODUCT_COLOR }}>ministry need</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                From weekly updates to automated discipleship journeys, SDASMS Email handles every aspect of your church communication.
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
                Everything you need to know about Email. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#F59E0B]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start sending beautiful
                <br />
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#D72444] bg-clip-text text-transparent">
                  church emails today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                From weekly newsletters to automated follow-ups, SDASMS Email helps your ministry communicate with excellence. Set up your first campaign in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#F59E0B]/25 transition-all duration-300"
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
