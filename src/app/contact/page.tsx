'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@sdasms.com',
    description: 'Send us an email anytime',
    href: 'mailto:hello@sdasms.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+255 658 600 302',
    description: 'Mon-Fri, 9am-6pm EAT',
    href: 'tel:+255658600302',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'PAPU Tower 6th Floor, 10636 Moshi Rd, Arusha, Tanzania',
    description: 'Visit our office',
    href: 'https://www.google.com/maps/search/PAPU+Tower+Moshi+Road+Arusha+Tanzania',
  },
]

const OFFICE_HOURS = [
  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        // Fallback: open mailto link
        const mailtoLink = `mailto:hello@sdasms.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
        window.open(mailtoLink, '_blank')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch {
      // Fallback: open mailto link on network error
      const mailtoLink = `mailto:hello@sdasms.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.open(mailtoLink, '_blank')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <PageHero
          badge={{ icon: <MessageSquare className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'We\'re Here to Help' }}
          title="Get In"
          titleAccent="Touch"
          subtitle="Have questions or need help? We'd love to hear from you. Our team is ready to assist."
          nextSectionBg="light"
        />

        {/* Contact Info Cards */}
        <section className="py-16 sm:py-20 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CONTACT_INFO.map((info) => (
                <StaggerItem key={info.title}>
                  <a
                    href={info.href}
                    className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full block"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#D72444]/10 flex items-center justify-center mb-5 group-hover:bg-[#D72444]/20 transition-colors">
                      <info.icon className="w-7 h-7 text-[#D72444]" />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-[#D72444] font-semibold text-base mb-1">
                      {info.value}
                    </p>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm font-medium">
                      {info.description}
                    </p>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Contact Form + Office Hours */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <FadeInWhenVisible direction="left" className="lg:col-span-3">
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
                  Send us a <span className="text-[#D72444]">message</span>
                </h2>
                <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-2xl p-8 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Message Sent!</h3>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      Thank you for reaching out. We&apos;ll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-black dark:text-white mb-2">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-black dark:text-white mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-black dark:text-white mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-black dark:text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300 resize-none"
                        placeholder="Tell us more about your needs..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                    >
                      <Send className={`w-5 h-5 ${submitting ? 'animate-pulse' : ''}`} />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </FadeInWhenVisible>

              {/* Office Hours + Map Placeholder */}
              <FadeInWhenVisible direction="right" className="lg:col-span-2">
                <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-[#D72444]" />
                    <h3 className="text-xl font-bold text-black dark:text-white">Office Hours</h3>
                  </div>
                  <div className="space-y-4">
                    {OFFICE_HOURS.map((item) => (
                      <div key={item.day} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10 last:border-0">
                        <span className="text-black dark:text-white font-medium text-sm">{item.day}</span>
                        <span className={`text-sm font-semibold ${item.time === 'Closed' ? 'text-red-500' : 'text-[#7F7F7F] dark:text-white/50'}`}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl overflow-hidden">
                  <div className="w-full h-64 relative">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=36.6800%2C-3.3800%2C36.7000%2C-3.3600&layer=mapnik&marker=-3.3702%2C36.6880"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SDASMS Office - PAPU Tower, Arusha"
                      className="dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-90"
                    />
                    {/* Overlay with address info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF8340] shrink-0" />
                        <div>
                          <p className="text-white font-semibold text-sm">PAPU Tower, 6th Floor</p>
                          <p className="text-white/60 text-xs">10636 Moshi Rd, Arusha</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Need immediate help?
              </h2>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Our support team is available to assist you. Get started with SDASMS today and transform your ministry communication.
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
                  href="mailto:hello@sdasms.com"
                  className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
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
