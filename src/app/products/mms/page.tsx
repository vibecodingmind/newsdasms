'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Image as ImageIcon,
  Music,
  Video,
  CreditCard,
  QrCode,
  MapPin,
  Presentation,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Eye,
  Bell,
  CalendarCheck,
  Users,
  HandHeart,
  BarChart3,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const PRODUCT_COLOR = '#10B981'

const stats = [
  { value: '15%', label: 'Higher CTR' },
  { value: 'Visual', label: 'Impact' },
  { value: '160+', label: 'Characters' },
  { value: 'Media', label: 'Support' },
]

const features = [
  {
    icon: ImageIcon,
    title: 'Image Messaging',
    description: 'Send high-quality images directly to your congregation\'s phones. Share church event flyers, sermon graphics, and community photos with ease.',
  },
  {
    icon: Music,
    title: 'Audio Messages',
    description: 'Deliver audio clips of worship songs, sermon excerpts, and spoken blessings. Perfect for members who prefer listening over reading.',
  },
  {
    icon: Video,
    title: 'Video Clips',
    description: 'Share short video clips of worship sessions, testimonies, and ministry highlights. Engage your congregation with dynamic visual content.',
  },
  {
    icon: CreditCard,
    title: 'vCard Sharing',
    description: 'Send digital contact cards for pastors, ministry leaders, and church staff. Members can save contact info directly to their phone with one tap.',
  },
  {
    icon: QrCode,
    title: 'QR Code Delivery',
    description: 'Embed QR codes in MMS messages for instant access to donation pages, event registrations, sermon links, and church websites.',
  },
  {
    icon: MapPin,
    title: 'Map Locations',
    description: 'Share interactive map locations for your church, outreach venues, and community events. Help visitors find you with built-in navigation.',
  },
  {
    icon: Presentation,
    title: 'Slideshow MMS',
    description: 'Create multi-slide MMS presentations that tell a story. Showcase ministry milestones, building projects, or mission trip highlights in sequence.',
  },
  {
    icon: Globe2,
    title: 'Unicode Support',
    description: 'Send MMS messages with Swahili, Arabic, and special characters. Communicate visually in any language your congregation speaks.',
  },
]

const benefits = [
  {
    icon: Eye,
    title: 'Visual Engagement',
    description: 'Images and media capture attention far more effectively than text alone. Visual messages are processed 60,000x faster by the brain, making your church communications instantly impactful.',
  },
  {
    icon: Zap,
    title: 'Higher Conversion',
    description: 'MMS messages with images see 15% higher click-through rates than plain SMS. When your congregation sees an event flyer, they\'re more likely to attend.',
  },
  {
    icon: ImageIcon,
    title: 'Brand Recognition',
    description: 'Consistent visual branding in every message reinforces your church identity. Your logo, colors, and design style build familiarity and trust.',
  },
  {
    icon: CheckCircle2,
    title: 'Stand Out in Inbox',
    description: 'MMS messages are rare and attention-grabbing. While everyone sends text, a visual message from your church stands out and gets noticed.',
  },
]

const steps = [
  {
    title: 'Upload Your Media',
    description: 'Upload images, audio, or video files to our platform. Use our built-in editor to crop, resize, and optimize media for mobile delivery.',
  },
  {
    title: 'Add Your Message',
    description: 'Write a compelling text message to accompany your media. Add personalization, URLs, and calls-to-action to drive engagement.',
  },
  {
    title: 'Send & Track',
    description: 'Send your MMS campaign to selected contact groups. Track delivery, views, and click-through rates with detailed analytics.',
  },
]

const useCases = [
  {
    icon: CalendarCheck,
    title: 'Church Event Flyers',
    description: 'Send vibrant event flyers directly to your congregation\'s phones. Include event details, dates, venue maps, and RSVP links — all in one visual message.',
  },
  {
    icon: ImageIcon,
    title: 'Sermon Thumbnail Previews',
    description: 'Build anticipation for upcoming sermons by sending preview images with sermon titles, scriptures, and speaker photos every week.',
  },
  {
    icon: Users,
    title: 'Community Project Photos',
    description: 'Share photos from outreach programs, community service, and mission trips. Show your congregation the impact of their participation and giving.',
  },
  {
    icon: BarChart3,
    title: 'Fundraising Progress Charts',
    description: 'Visualize your building fund, missions offering, or charity campaign progress with charts and infographics sent directly via MMS.',
  },
]

const faqs = [
  {
    question: 'What file types can I send via MMS?',
    answer: 'You can send images (JPG, PNG, GIF), audio files (MP3, WAV), video clips (MP4), vCards (digital contact cards), and QR codes through MMS. Our platform automatically optimizes media files for mobile delivery, ensuring compatibility across all devices and networks while maintaining the best possible quality for your congregation.',
  },
  {
    question: 'What is the maximum file size for MMS?',
    answer: 'Up to 500KB per MMS message for optimal delivery across all African networks. Our built-in media optimizer automatically compresses larger files while maintaining visual quality. For files that exceed carrier limits, we provide smart cropping and resizing tools so your media always looks great when it arrives on your congregation\'s phones.',
  },
  {
    question: 'Can I send MMS to any phone?',
    answer: 'MMS works on virtually all smartphones and most feature phones with data capability. Our platform detects device capabilities in real-time and ensures proper formatting for each recipient. If a device cannot receive MMS, we automatically fall back to SMS with a link to view the media online, ensuring your message is never lost.',
  },
  {
    question: 'How is MMS different from SMS?',
    answer: 'MMS supports multimedia content (images, audio, video, vCards) while SMS is limited to plain text only. MMS messages see 15% higher click-through rates and are much more engaging visually. Think of SMS as a text-only postcard and MMS as a full-color brochure — both reach the same audience, but MMS makes a much stronger impression.',
  },
  {
    question: 'Does MMS cost more than SMS?',
    answer: 'MMS typically costs 2-3x more per message than SMS due to the data transmission required for media files. However, the higher engagement rates often make MMS more cost-effective per interaction. We recommend using MMS strategically for high-impact communications like event flyers and sermon previews, while using SMS for routine text announcements.',
  },
  {
    question: 'Can I track MMS delivery?',
    answer: 'Yes, you can track delivery status, views, and click-through rates for all MMS campaigns. Our analytics dashboard shows which recipients opened your message, viewed the media, and clicked any embedded links. You can also see device-specific delivery rates and optimize your media formats based on real performance data.',
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

export default function MMSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6] dark:bg-[#1A0A2E]">
      <Header />
      <main className="flex-1">
        {/* 1. PageHero */}
        <PageHero
          badge={{ icon: <ImageIcon className="w-3.5 h-3.5" style={{ color: PRODUCT_COLOR }} />, text: 'MMS Channel' }}
          title="Multimedia"
          titleAccent="Messaging"
          subtitle="Send images, audio, and media files directly to phones. Perfect for visual church communication that captures attention."
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
                  <ImageIcon className="w-12 h-12" style={{ color: PRODUCT_COLOR }} />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                    Visual messaging that captures hearts and minds
                  </h2>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                    MMS (Multimedia Messaging Service) lets your church go beyond text. Send vibrant event flyers, sermon preview images, worship audio clips, community project photos, and fundraising progress charts directly to your congregation&apos;s phones. With 15% higher click-through rates than plain SMS, MMS ensures your ministry messages don&apos;t just arrive — they make an impression. Our platform supports images, audio, video clips, vCards, QR codes, and interactive maps.
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
                Rich media <span style={{ color: PRODUCT_COLOR }}>features</span> for your ministry
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Every media type your church needs to communicate visually and effectively.
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
                  Why visual messaging <span style={{ color: PRODUCT_COLOR }}>matters</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  In a world of information overload, visual content cuts through the noise. MMS gives your ministry the power to communicate with impact.
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
                      <ImageIcon className="w-10 h-10" style={{ color: PRODUCT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">MMS vs SMS Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">MMS Click-Through Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>15%+</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '65%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Engagement vs SMS</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>2x</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '50%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Brand Recall</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>80%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '80%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-[#7F7F7F] dark:text-white/50">Forward Rate</span>
                        <span className="font-bold" style={{ color: PRODUCT_COLOR }}>35%</span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: PRODUCT_COLOR }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '35%' }}
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
                Three simple steps from media file to your congregation&apos;s phones.
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
                Visual communication for <span style={{ color: PRODUCT_COLOR }}>every ministry</span>
              </h2>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                When words aren&apos;t enough, MMS delivers the visual impact your ministry needs to inspire, inform, and engage.
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
                Everything you need to know about MMS. Can't find what you're looking for? Contact our team.
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Make your messages
                <br />
                <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">
                  visually unforgettable
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Images, audio, and video — delivered straight to your congregation&apos;s phones. Start sending MMS campaigns that inspire action.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#10B981]/25 transition-all duration-300"
                >
                  Start with MMS
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
