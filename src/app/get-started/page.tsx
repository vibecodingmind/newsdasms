'use client'

import { useState } from 'react'
import {
  Rocket,
  Building2,
  User,
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Users,
  Landmark,
  UserCheck,
  CreditCard,
  Loader2,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'

/* ─── Constants ──────────────────────────────────────────── */

const INPUT_CLASS =
  'w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300 text-base'

const LABEL_CLASS = 'block text-sm font-semibold text-black dark:text-white mb-2.5'

const ORG_TYPES = [
  { value: 'church', label: 'Church / Ministry' },
  { value: 'school', label: 'School / Education' },
  { value: 'hospital', label: 'Hospital / Health Center' },
  { value: 'company', label: 'Company / Business' },
  { value: 'ngo', label: 'NGO / Non-Profit' },
  { value: 'government', label: 'Government Agency' },
  { value: 'media', label: 'Media / Broadcasting' },
  { value: 'conference', label: 'Conference / Union' },
  { value: 'other', label: 'Other' },
]

const BANK_INFO = {
  bank: 'Equity Bank Tanzania',
  accountName: 'SDASMS Marketing Agency',
  accountNumber: '3002211802039',
}

const PRICING = {
  personal: { amount: 99500, display: '99,500', label: 'Personal Starter Pack' },
  organization: { amount: 249500, display: '249,500', label: 'Business Starter Pack' },
} as const

const COUNTRIES = [
  { value: 'TZ', label: 'Tanzania' },
  { value: 'KE', label: 'Kenya' },
  { value: 'UG', label: 'Uganda' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'BI', label: 'Burundi' },
  { value: 'CD', label: 'DR Congo' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'SO', label: 'Somalia' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'GH', label: 'Ghana' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'SN', label: 'Senegal' },
  { value: 'CI', label: "Côte d'Ivoire" },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IN', label: 'India' },
  { value: 'OTHER', label: 'Other' },
]

/* ─── Form Data ──────────────────────────────────────────── */

interface FormData {
  accountType: 'personal' | 'organization' | ''
  // Personal
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  country: string
  repIdType: 'NIDA' | 'Passport'
  repIdNumber: string
  // Organization
  orgName: string
  orgEmail: string
  orgPhone: string
  orgAddress: string
  orgCity: string
  orgRegion: string
  orgCountry: string
  orgWebsite: string
  orgType: string
  orgTypeOther: string
  repName: string
  repEmail: string
  repPhone: string
  repDesignation: string
  // Payment
  paymentMethod: '' | 'mpesa' | 'bank'
  paymentConfirmed: boolean
  termsAccepted: boolean
}

const INITIAL_FORM: FormData = {
  accountType: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  country: '',
  repIdType: 'NIDA',
  repIdNumber: '',
  orgName: '',
  orgEmail: '',
  orgPhone: '',
  orgAddress: '',
  orgCity: '',
  orgRegion: '',
  orgCountry: '',
  orgWebsite: '',
  orgType: '',
  orgTypeOther: '',
  repName: '',
  repEmail: '',
  repPhone: '',
  repDesignation: '',
  paymentMethod: '',
  paymentConfirmed: false,
  termsAccepted: false,
}

/* ─── Reusable Field ─────────────────────────────────────── */

function FormField({ label, id, required, children }: {
  label: string; id: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required && <span className="text-[#D72444] ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

/* ─── Section Divider ────────────────────────────────────── */

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 pt-6 pb-4 border-b border-gray-200 dark:border-white/10">
      <div className="w-10 h-10 rounded-xl bg-[#D72444]/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#D72444]" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-black dark:text-white">{title}</h3>
        <p className="text-[#7F7F7F] dark:text-white/50 text-sm">{subtitle}</p>
      </div>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */

export default function GetStartedPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const isOrg = formData.accountType === 'organization'

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.')
      return
    }
    if (!formData.paymentConfirmed) {
      setError('Please confirm your payment to proceed.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await res.json()
      if (!result.success) {
        setError(result.message || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageHero
            badge={{ icon: <Rocket className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Start Your Journey' }}
            title="Get"
            titleAccent="Started"
            subtitle="Begin your digital evangelism journey with SDASMS."
            nextSectionBg="light"
          />
          <section className="py-16 sm:py-20 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
            <div className="max-w-xl mx-auto px-4">
              <FadeInWhenVisible>
                <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3">
                    Registration Received!
                  </h3>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-6">
                    Thank you for registering with SDASMS. We will review your details and payment, then get in touch with you shortly. Account activation typically takes 24-48 hours after verification.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/" className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300">
                      Back to Home
                    </a>
                    <a href="/contact" className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/20 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300">
                      Contact Us
                    </a>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    )
  }

  /* ─── Form ─── */
  const pricing = isOrg ? PRICING.organization : PRICING.personal

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          badge={{ icon: <Rocket className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Start Your Journey' }}
          title="Get"
          titleAccent="Started"
          subtitle="Complete the registration form below and make payment to activate your account."
          nextSectionBg="light"
        />

        <section className="py-16 sm:py-20 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">

                {/* ── Section 1: Account Type ── */}
                <div className="px-6 sm:px-10 pt-10 pb-6">
                  <SectionHeader icon={Users} title="Account Type" subtitle="Select the type that best describes you" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    {([
                      { id: 'personal' as const, icon: User, title: 'Personal Account', desc: 'For individuals, pastors, evangelists' },
                      { id: 'organization' as const, icon: Building2, title: 'Organization Account', desc: 'For churches, ministries, NGOs, businesses' },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleChange('accountType', opt.id)}
                        className={`relative text-left p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.accountType === opt.id
                            ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10 shadow-md'
                            : 'border-gray-200 dark:border-white/10 hover:border-gray-300'
                        }`}
                      >
                        {formData.accountType === opt.id && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#D72444] flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <opt.icon className={`w-6 h-6 mb-2 ${formData.accountType === opt.id ? 'text-[#D72444]' : 'text-gray-400'}`} />
                        <h4 className="text-base font-bold text-black dark:text-white">{opt.title}</h4>
                        <p className="text-xs text-[#7F7F7F] dark:text-white/50 mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Section 2: Contact Info ── */}
                {formData.accountType && (
                  <div className="px-6 sm:px-10 pb-6">
                    <SectionHeader
                      icon={isOrg ? Building2 : User}
                      title={isOrg ? 'Organization Information' : 'Personal Information'}
                      subtitle={isOrg ? 'Tell us about your organization' : 'Tell us about yourself'}
                    />

                    <div className="space-y-4 mt-5">
                      {isOrg ? (
                        <>
                          <FormField label="Organization Name" id="orgName" required>
                            <input id="orgName" type="text" required value={formData.orgName} onChange={(e) => handleChange('orgName', e.target.value)} className={INPUT_CLASS} placeholder="Your organization name" />
                          </FormField>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Organization Email" id="orgEmail" required>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="orgEmail" type="email" required value={formData.orgEmail} onChange={(e) => handleChange('orgEmail', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="org@example.com" />
                              </div>
                            </FormField>
                            <FormField label="Organization Phone" id="orgPhone" required>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="orgPhone" type="tel" required value={formData.orgPhone} onChange={(e) => handleChange('orgPhone', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="+255 XXX XXX XXX" />
                              </div>
                            </FormField>
                          </div>
                          <FormField label="Address" id="orgAddress" required>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                              <input id="orgAddress" type="text" required value={formData.orgAddress} onChange={(e) => handleChange('orgAddress', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="Street address" />
                            </div>
                          </FormField>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="City" id="orgCity" required>
                              <input id="orgCity" type="text" required value={formData.orgCity} onChange={(e) => handleChange('orgCity', e.target.value)} className={INPUT_CLASS} placeholder="City" />
                            </FormField>
                            <FormField label="Region" id="orgRegion" required>
                              <input id="orgRegion" type="text" required value={formData.orgRegion} onChange={(e) => handleChange('orgRegion', e.target.value)} className={INPUT_CLASS} placeholder="Region" />
                            </FormField>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Country" id="orgCountry" required>
                              <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <select id="orgCountry" required value={formData.orgCountry} onChange={(e) => handleChange('orgCountry', e.target.value)} className={`${INPUT_CLASS} pl-11`}>
                                  <option value="">Select country</option>
                                  {COUNTRIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                              </div>
                            </FormField>
                            <FormField label="Website" id="orgWebsite" required>
                              <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="orgWebsite" type="url" required value={formData.orgWebsite} onChange={(e) => handleChange('orgWebsite', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="https://example.com" />
                              </div>
                            </FormField>
                          </div>
                        </>
                      ) : (
                        <>
                          <FormField label="Full Name" id="fullName" required>
                            <input id="fullName" type="text" required value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className={INPUT_CLASS} placeholder="Your full name" />
                          </FormField>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Email" id="email" required>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="email" type="email" required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="your@email.com" />
                              </div>
                            </FormField>
                            <FormField label="Phone Number" id="phone" required>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="phone" type="tel" required value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="+255 XXX XXX XXX" />
                              </div>
                            </FormField>
                          </div>
                          <FormField label="Address" id="address" required>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                              <input id="address" type="text" required value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="Street address" />
                            </div>
                          </FormField>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <FormField label="City" id="city" required>
                              <input id="city" type="text" required value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={INPUT_CLASS} placeholder="City" />
                            </FormField>
                            <FormField label="Region" id="region" required>
                              <input id="region" type="text" required value={formData.region} onChange={(e) => handleChange('region', e.target.value)} className={INPUT_CLASS} placeholder="Region" />
                            </FormField>
                            <FormField label="Country" id="country" required>
                              <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <select id="country" required value={formData.country} onChange={(e) => handleChange('country', e.target.value)} className={`${INPUT_CLASS} pl-11`}>
                                  <option value="">Select</option>
                                  {COUNTRIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                              </div>
                            </FormField>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Section 3: ID / Representative ── */}
                {formData.accountType && (
                  <div className="px-6 sm:px-10 pb-6">
                    <SectionHeader
                      icon={UserCheck}
                      title={isOrg ? 'Authorized Representative' : 'Identification'}
                      subtitle={isOrg ? 'Provide authorized person details' : 'Provide your ID details'}
                    />

                    <div className="space-y-4 mt-5">
                      {isOrg && (
                        <>
                          <FormField label="Representative Full Name" id="repName" required>
                            <input id="repName" type="text" required value={formData.repName} onChange={(e) => handleChange('repName', e.target.value)} className={INPUT_CLASS} placeholder="Full legal name of authorized person" />
                          </FormField>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Representative Email" id="repEmail" required>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="repEmail" type="email" required value={formData.repEmail} onChange={(e) => handleChange('repEmail', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="rep@example.com" />
                              </div>
                            </FormField>
                            <FormField label="Representative Phone" id="repPhone" required>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                                <input id="repPhone" type="tel" required value={formData.repPhone} onChange={(e) => handleChange('repPhone', e.target.value)} className={`${INPUT_CLASS} pl-11`} placeholder="+255 XXX XXX XXX" />
                              </div>
                            </FormField>
                          </div>
                          <FormField label="Designation" id="repDesignation" required>
                            <input id="repDesignation" type="text" required value={formData.repDesignation} onChange={(e) => handleChange('repDesignation', e.target.value)} className={INPUT_CLASS} placeholder="Job title / Role" />
                          </FormField>
                        </>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="ID Type" id="repIdType" required>
                          <select id="repIdType" required value={formData.repIdType} onChange={(e) => handleChange('repIdType', e.target.value)} className={INPUT_CLASS}>
                            <option value="NIDA">NIDA</option>
                            <option value="Passport">Passport</option>
                          </select>
                        </FormField>
                        <FormField label="ID Number" id="repIdNumber" required>
                          <input id="repIdNumber" type="text" required value={formData.repIdNumber} onChange={(e) => handleChange('repIdNumber', e.target.value)} className={INPUT_CLASS} placeholder="Enter your ID number" />
                        </FormField>
                      </div>

                      {isOrg && (
                        <div>
                          <label className={LABEL_CLASS}>
                            Organization Type<span className="text-[#D72444] ml-1">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {ORG_TYPES.map((type) => (
                              <label key={type.value} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                                formData.orgType === type.value
                                  ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10'
                                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300'
                              }`}>
                                <input type="radio" name="orgType" value={type.value} checked={formData.orgType === type.value} onChange={(e) => handleChange('orgType', e.target.value)} className="w-3.5 h-3.5 accent-[#D72444]" />
                                <span className="font-medium text-black dark:text-white">{type.label}</span>
                              </label>
                            ))}
                          </div>
                          {formData.orgType === 'other' && (
                            <input type="text" required value={formData.orgTypeOther} onChange={(e) => handleChange('orgTypeOther', e.target.value)} className={`${INPUT_CLASS} mt-3`} placeholder="Please specify your organization type" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Section 4: Payment ── */}
                {formData.accountType && (
                  <div className="px-6 sm:px-10 pb-6">
                    <SectionHeader icon={CreditCard} title="Starter Pack & Payment" subtitle="Review your package and choose a payment method" />

                    {/* Pack Card */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#D72444] via-[#D72444]/90 to-[#7C3AED] rounded-2xl p-6 text-white mt-5">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-2">
                              <Sparkles className="w-3 h-3" />
                              {isOrg ? 'BUSINESS PACK' : 'STARTER PACK'}
                            </div>
                            <h4 className="text-xl sm:text-2xl font-extrabold">{isOrg ? 'Business Starter Pack' : 'Personal Starter Pack'}</h4>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <p className="text-3xl sm:text-4xl font-extrabold">{pricing.display}</p>
                            <p className="text-white/70 text-sm font-semibold">TZS</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-5 space-y-3">
                      <h4 className="text-sm font-bold text-black dark:text-white">Choose Payment Method</h4>

                      {/* M-PESA */}
                      <button type="button" onClick={() => { handleChange('paymentMethod', 'mpesa'); handleChange('paymentConfirmed', false) }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                          formData.paymentMethod === 'mpesa' ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10' : 'border-gray-200 dark:border-white/10 hover:border-gray-300'
                        }`}>
                        {formData.paymentMethod === 'mpesa' && <CheckCircle2 className="w-5 h-5 text-[#D72444] shrink-0" />}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#E4202E15' }}>
                          <Phone className="w-5 h-5" style={{ color: '#E4202E' }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-black dark:text-white">M-PESA</p>
                          <p className="text-sm text-[#7F7F7F] dark:text-white/50">Send via M-PESA Lipa Number</p>
                        </div>
                      </button>

                      {/* Bank */}
                      <button type="button" onClick={() => { handleChange('paymentMethod', 'bank'); handleChange('paymentConfirmed', false) }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                          formData.paymentMethod === 'bank' ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10' : 'border-gray-200 dark:border-white/10 hover:border-gray-300'
                        }`}>
                        {formData.paymentMethod === 'bank' && <CheckCircle2 className="w-5 h-5 text-[#D72444] shrink-0" />}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#7C3AED15' }}>
                          <Landmark className="w-5 h-5" style={{ color: '#7C3AED' }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-black dark:text-white">Bank Transfer</p>
                          <p className="text-sm text-[#7F7F7F] dark:text-white/50">Transfer directly to our bank account</p>
                        </div>
                      </button>
                    </div>

                    {/* Payment Details */}
                    {formData.paymentMethod && (
                      <div className="mt-4 bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-5 border border-gray-200 dark:border-white/10">
                        <h5 className="text-sm font-bold text-black dark:text-white mb-3">
                          Payment Instructions — {formData.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'}
                        </h5>

                        {formData.paymentMethod === 'bank' ? (
                          <div className="space-y-2">
                            {[
                              ['Bank', BANK_INFO.bank],
                              ['Account Name', BANK_INFO.accountName],
                              ['Account Number', BANK_INFO.accountNumber],
                            ].map(([label, value]) => (
                              <div key={label} className="flex items-center justify-between py-2.5 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                                <span className="text-sm text-[#7F7F7F] dark:text-white/50">{label}</span>
                                <span className="text-sm font-semibold text-black dark:text-white font-mono">{value}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {[
                              ['Provider', 'M-PESA'],
                              ['Lipa Number', '51720044'],
                              ['Merchant Name', 'SDASMS'],
                            ].map(([label, value]) => (
                              <div key={label} className="flex items-center justify-between py-2.5 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                                <span className="text-sm text-[#7F7F7F] dark:text-white/50">{label}</span>
                                <span className={`text-sm font-bold font-mono ${label === 'Lipa Number' ? 'text-[#E4202E]' : 'text-black dark:text-white'}`}>{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10">
                          <p className="text-sm text-[#7F7F7F] dark:text-white/50 mb-3">
                            Send <strong className="text-black dark:text-white">{pricing.display} TZS</strong> via {formData.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'} and include &ldquo;SDASMS&rdquo; as reference.
                          </p>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={formData.paymentConfirmed} onChange={(e) => handleChange('paymentConfirmed', e.target.checked)} className="w-5 h-5 mt-0.5 accent-[#D72444] rounded shrink-0" />
                            <span className="text-sm text-black dark:text-white">
                              I have completed the payment of <strong>{pricing.display} TZS</strong> via {formData.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'}
                              {formData.paymentMethod === 'bank' ? ` to ${BANK_INFO.accountNumber}` : ' to 51720044'}
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Terms & Submit ── */}
                {formData.accountType && (
                  <div className="px-6 sm:px-10 pb-10">
                    <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-5 border border-gray-200 dark:border-white/10 mb-6">
                      <p className="text-sm text-[#7F7F7F] dark:text-white/50 mb-3">
                        By proceeding with this registration and payment, you agree to comply with the SDASMS{' '}
                        <a href="/policies/terms-of-service" className="text-[#D72444] font-semibold hover:underline">Terms & Conditions</a>{' '}
                        and Code of Conduct.
                      </p>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.termsAccepted} onChange={(e) => handleChange('termsAccepted', e.target.checked)} className="w-5 h-5 mt-0.5 accent-[#D72444] rounded shrink-0" />
                        <span className="text-sm text-black dark:text-white">
                          I accept the <a href="/policies/terms-of-service" className="text-[#D72444] font-semibold hover:underline">Terms & Conditions</a> of the Code of Conduct and Code of Practice.
                        </span>
                      </label>
                    </div>

                    {error && (
                      <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting || !formData.termsAccepted || !formData.paymentConfirmed}
                      className="w-full bg-[#D72444] hover:bg-[#E03355] disabled:bg-gray-300 disabled:dark:bg-white/10 disabled:cursor-not-allowed text-white font-bold rounded-full py-4 text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <Rocket className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Prompt if no account type selected */}
                {!formData.accountType && (
                  <div className="px-6 sm:px-10 pb-10 text-center">
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Please select an account type above to continue.</p>
                  </div>
                )}
              </form>
            </FadeInWhenVisible>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}
