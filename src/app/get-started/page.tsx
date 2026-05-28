'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Briefcase,
  CreditCard,
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Users,
  Landmark,
  UserCheck,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'

/* ─── Constants ──────────────────────────────────────────── */

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300'

const LABEL_CLASS = 'block text-sm font-semibold text-black dark:text-white mb-2'

const TOTAL_STEPS = 4

const INDUSTRIES = [
  'Church / Ministry',
  'Education',
  'Charities & Non-Profit',
  'Health Insurance',
  'eCommerce',
  'Food Industry',
  'General Trading',
  'Manufacturing',
  'Banking & Finance',
  'Building & Construction',
  'Electronic',
  'Motor Vehicle Industry',
  'Retailing',
  'Telecommunications',
  'Tourism & Hospitality',
  'Transport & Taxi',
  'Others',
]

const MOBILE_MONEY_INFO = [
  { provider: 'TIGO PESA', number: '8008206', color: '#1A9C48' },
  { provider: 'M-PESA', number: '5845779', color: '#E4202E' },
  { provider: 'AIRTEL MONEY', number: '997199', color: '#FF0000' },
]

const STARTER_PACK_FEATURES = [
  'Sender ID Registration',
  'Account Setup & Activation',
  'Dashboard Access',
  'API Credentials',
  'Contact List Upload (up to 10K)',
  'Priority Support',
]

/* ─── Form State Type ────────────────────────────────────── */

interface FormData {
  // Step 1 - Account Type
  accountType: 'personal' | 'organization' | ''
  // Step 2 - Personal / Org Basic Info
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  // Organization-specific
  orgName: string
  orgEmail: string
  orgPhone: string
  orgAddress: string
  orgCity: string
  orgRegion: string
  orgWebsite: string
  // Step 3 - Representative & Org Details
  repName: string
  repEmail: string
  repPhone: string
  repIdType: 'NIDA' | 'Passport'
  repIdNumber: string
  repDesignation: string
  sector: 'Private' | 'Government' | ''
  industries: string[]
  otherIndustry: string
  // Step 4 - Payment
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
  orgName: '',
  orgEmail: '',
  orgPhone: '',
  orgAddress: '',
  orgCity: '',
  orgRegion: '',
  orgWebsite: '',
  repName: '',
  repEmail: '',
  repPhone: '',
  repIdType: 'NIDA',
  repIdNumber: '',
  repDesignation: '',
  sector: '',
  industries: [],
  otherIndustry: '',
  termsAccepted: false,
}

/* ─── Reusable Field Component ───────────────────────────── */

function FormField({
  label,
  id,
  required,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
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

/* ─── Step 1: Account Type ──────────────────────────────── */

function StepAccountType({
  value,
  onChange,
}: {
  value: FormData['accountType']
  onChange: (val: FormData['accountType']) => void
}) {
  const options = [
    {
      id: 'personal' as const,
      icon: User,
      title: 'Personal Account',
      description: 'For individuals, pastors, evangelists, and independent ministers who want to use SDASMS for personal outreach.',
      features: ['Quick setup', 'Individual Sender ID', 'Personal dashboard'],
    },
    {
      id: 'organization' as const,
      icon: Building2,
      title: 'Organization Account',
      description: 'For churches, ministries, NGOs, and businesses that need team access and organizational messaging.',
      features: ['Team management', 'Multiple Sender IDs', 'Organization dashboard'],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Choose Account Type</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Select the type that best describes you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`relative text-left p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
              value === option.id
                ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10 shadow-lg shadow-[#D72444]/10'
                : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-md'
            }`}
          >
            {/* Check indicator */}
            {value === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#D72444] flex items-center justify-center"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              value === option.id
                ? 'bg-[#D72444]/15'
                : 'bg-gray-100 dark:bg-white/5'
            }`}>
              <option.icon className={`w-7 h-7 transition-colors ${
                value === option.id ? 'text-[#D72444]' : 'text-gray-400 dark:text-white/30'
              }`} />
            </div>

            <h4 className="text-lg font-bold text-black dark:text-white mb-2">{option.title}</h4>
            <p className="text-sm text-[#7F7F7F] dark:text-white/50 leading-relaxed mb-4">{option.description}</p>

            <div className="space-y-1.5">
              {option.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${
                    value === option.id ? 'text-[#D72444]' : 'text-gray-300 dark:text-white/20'
                  }`} />
                  <span className="text-xs font-medium text-[#7F7F7F] dark:text-white/50">{feature}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Step 2: Personal / Org Info ────────────────────────── */

function StepInfo({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  const isOrg = data.accountType === 'organization'

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          {isOrg ? <Building2 className="w-6 h-6 text-[#D72444]" /> : <User className="w-6 h-6 text-[#D72444]" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">
            {isOrg ? 'Organization Information' : 'Personal Information'}
          </h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">
            {isOrg ? 'Tell us about your organization' : 'Tell us about yourself'}
          </p>
        </div>
      </div>

      {isOrg ? (
        /* Organization Info */
        <>
          <FormField label="Organization Name" id="orgName" required>
            <input
              id="orgName"
              type="text"
              required
              value={data.orgName}
              onChange={(e) => onChange('orgName', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Your organization name"
            />
          </FormField>

          <FormField label="Organization Email" id="orgEmail" required>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgEmail"
                type="email"
                required
                value={data.orgEmail}
                onChange={(e) => onChange('orgEmail', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="org@example.com"
              />
            </div>
          </FormField>

          <FormField label="Organization Phone" id="orgPhone" required>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgPhone"
                type="tel"
                required
                value={data.orgPhone}
                onChange={(e) => onChange('orgPhone', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="+255 XXX XXX XXX"
              />
            </div>
          </FormField>

          <FormField label="Address" id="orgAddress">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgAddress"
                type="text"
                value={data.orgAddress}
                onChange={(e) => onChange('orgAddress', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="Street address"
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="City" id="orgCity">
              <input
                id="orgCity"
                type="text"
                value={data.orgCity}
                onChange={(e) => onChange('orgCity', e.target.value)}
                className={INPUT_CLASS}
                placeholder="City"
              />
            </FormField>
            <FormField label="Region" id="orgRegion">
              <input
                id="orgRegion"
                type="text"
                value={data.orgRegion}
                onChange={(e) => onChange('orgRegion', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Region"
              />
            </FormField>
          </div>

          <FormField label="Website" id="orgWebsite">
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgWebsite"
                type="url"
                value={data.orgWebsite}
                onChange={(e) => onChange('orgWebsite', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="https://example.com"
              />
            </div>
          </FormField>
        </>
      ) : (
        /* Personal Info */
        <>
          <FormField label="Full Name" id="fullName" required>
            <input
              id="fullName"
              type="text"
              required
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Your full name"
            />
          </FormField>

          <FormField label="Email" id="email" required>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="your@email.com"
              />
            </div>
          </FormField>

          <FormField label="Phone Number" id="phone" required>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="+255 XXX XXX XXX"
              />
            </div>
          </FormField>

          <FormField label="Address" id="address">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="address"
                type="text"
                value={data.address}
                onChange={(e) => onChange('address', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="Street address"
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="City" id="city">
              <input
                id="city"
                type="text"
                value={data.city}
                onChange={(e) => onChange('city', e.target.value)}
                className={INPUT_CLASS}
                placeholder="City"
              />
            </FormField>
            <FormField label="Region" id="region">
              <input
                id="region"
                type="text"
                value={data.region}
                onChange={(e) => onChange('region', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Region"
              />
            </FormField>
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Step 3: Representative & Organization Details ──────── */

function StepDetails({
  data,
  onChange,
  onToggleIndustry,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
  onToggleIndustry: (industry: string) => void
}) {
  const isOrg = data.accountType === 'organization'

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">
            {isOrg ? 'Representative & Organization Details' : 'Account Details'}
          </h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">
            {isOrg ? 'Provide authorized person and organization profile' : 'Confirm your details and preferences'}
          </p>
        </div>
      </div>

      {/* Representative Section - Only for Organization */}
      {isOrg && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-white/10">
            <UserCheck className="w-5 h-5 text-[#D72444]" />
            <h4 className="text-base font-bold text-black dark:text-white">Authorized Representative</h4>
          </div>

          <FormField label="Representative Full Name" id="repName" required>
            <input
              id="repName"
              type="text"
              required
              value={data.repName}
              onChange={(e) => onChange('repName', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Full legal name of authorized person"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Representative Email" id="repEmail" required>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                <input
                  id="repEmail"
                  type="email"
                  required
                  value={data.repEmail}
                  onChange={(e) => onChange('repEmail', e.target.value)}
                  className={`${INPUT_CLASS} pl-11`}
                  placeholder="rep@example.com"
                />
              </div>
            </FormField>
            <FormField label="Representative Phone" id="repPhone" required>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                <input
                  id="repPhone"
                  type="tel"
                  required
                  value={data.repPhone}
                  onChange={(e) => onChange('repPhone', e.target.value)}
                  className={`${INPUT_CLASS} pl-11`}
                  placeholder="+255 XXX XXX XXX"
                />
              </div>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FormField label="ID Type" id="repIdType" required>
              <select
                id="repIdType"
                value={data.repIdType}
                onChange={(e) => onChange('repIdType', e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="NIDA">NIDA</option>
                <option value="Passport">Passport</option>
              </select>
            </FormField>
            <FormField label="ID Number" id="repIdNumber" required>
              <input
                id="repIdNumber"
                type="text"
                required
                value={data.repIdNumber}
                onChange={(e) => onChange('repIdNumber', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Enter your ID number"
              />
            </FormField>
            <FormField label="Designation" id="repDesignation">
              <input
                id="repDesignation"
                type="text"
                value={data.repDesignation}
                onChange={(e) => onChange('repDesignation', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Job title / Role"
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Organization Profile - Only for Organization */}
      {isOrg && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-white/10">
            <Landmark className="w-5 h-5 text-[#D72444]" />
            <h4 className="text-base font-bold text-black dark:text-white">Organization Profile</h4>
          </div>

          <div>
            <label className={LABEL_CLASS}>
              Sector<span className="text-[#D72444] ml-1">*</span>
            </label>
            <div className="flex gap-4">
              {(['Private', 'Government'] as const).map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    data.sector === option
                      ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10'
                      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="sector"
                    value={option}
                    checked={data.sector === option}
                    onChange={(e) => onChange('sector', e.target.value)}
                    className="w-4 h-4 accent-[#D72444]"
                  />
                  <span className="text-sm font-semibold text-black dark:text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS}>
              Industry<span className="text-[#7F7F7F] dark:text-white/40 ml-2 text-xs font-normal">(select all that apply)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INDUSTRIES.map((industry) => (
                <label
                  key={industry}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                    data.industries.includes(industry)
                      ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10'
                      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.industries.includes(industry)}
                    onChange={() => onToggleIndustry(industry)}
                    className="w-4 h-4 accent-[#D72444] rounded"
                  />
                  <span className="text-sm font-medium text-black dark:text-white">{industry}</span>
                </label>
              ))}
            </div>
            {data.industries.includes('Others') && (
              <div className="mt-3">
                <input
                  type="text"
                  value={data.otherIndustry}
                  onChange={(e) => onChange('otherIndustry', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Please specify your industry"
                />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

/* ─── Step 4: Starter Pack & Payment ────────────────────── */

function StepPayment({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: boolean) => void
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Starter Pack & Payment</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Review your package and choose a payment method</p>
        </div>
      </div>

      {/* Starter Pack Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#D72444] via-[#D72444]/90 to-[#7C3AED] rounded-2xl p-6 sm:p-8 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Sparkles className="w-3 h-3" />
                STARTER PACK
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold">Get Started with SDASMS</h4>
              <p className="text-white/70 text-sm mt-1">Everything you need to begin your digital evangelism journey</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="text-4xl sm:text-5xl font-extrabold">94,500</p>
              <p className="text-white/70 text-sm font-semibold">TZS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {STARTER_PACK_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                <span className="text-sm font-medium text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Choose Payment Method</h4>
        <div className="space-y-3">
          {/* Pesapal */}
          <a
            href="https://pay.pesapal.com/sdasms"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#1A9C48]/40 hover:bg-[#1A9C48]/5 dark:hover:bg-[#1A9C48]/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Pay with Pesapal</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">Mobile money & bank cards (East Africa)</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
          </a>

          {/* Stripe */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Pay with Card (Stripe)</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">International debit & credit cards</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </a>

          {/* PayPal */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Pay with PayPal</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">International payments</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* Mobile Money */}
      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Pay via Mobile Money</h4>
        <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
          <p className="text-sm text-[#7F7F7F] dark:text-white/50 mb-4">
            Send payment to any of the following numbers and include &ldquo;SDASMS&rdquo; as the merchant name:
          </p>
          <div className="space-y-3">
            {MOBILE_MONEY_INFO.map((item) => (
              <div
                key={item.provider}
                className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10"
              >
                <span className="font-semibold text-black dark:text-white text-sm">{item.provider}</span>
                <span className="font-mono font-bold text-sm" style={{ color: item.color }}>
                  {item.number}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Merchant Name</span>
            <span className="font-bold text-[#D72444]">SDASMS</span>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
        <p className="text-sm text-[#7F7F7F] dark:text-white/50 leading-relaxed mb-4">
          By proceeding with this registration and payment, you agree to comply with the SDASMS{' '}
          <a href="/policies/terms-of-service" className="text-[#D72444] font-semibold hover:underline">
            Terms & Conditions
          </a>{' '}
          and Code of Conduct, which govern the use of our messaging platform.
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.termsAccepted}
            onChange={(e) => onChange('termsAccepted', e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-[#D72444] rounded shrink-0"
          />
          <span className="text-sm text-black dark:text-white leading-relaxed">
            I confirm reading, understanding and accepting the{' '}
            <a href="/policies/terms-of-service" className="text-[#D72444] font-semibold hover:underline">
              Terms & Conditions
            </a>{' '}
            of the Code of Conduct and Code of Practice.
          </span>
        </label>
      </div>
    </div>
  )
}

/* ─── Main Page Component ────────────────────────────────── */

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToggleIndustry = (industry: string) => {
    setFormData((prev) => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter((i) => i !== industry)
        : [...prev.industries, industry]
      return { ...prev, industries }
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.accountType !== ''
      case 2:
        if (formData.accountType === 'organization') {
          return !!(formData.orgName && formData.orgEmail && formData.orgPhone)
        }
        return !!(formData.fullName && formData.email && formData.phone)
      case 3:
        if (formData.accountType === 'organization') {
          return !!(formData.repName && formData.repEmail && formData.repPhone && formData.repIdNumber && formData.sector)
        }
        return true
      case 4:
        return formData.termsAccepted
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const progressPercent = (currentStep / 4) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={{ icon: <Rocket className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Start Your Journey' }}
          title="Get"
          titleAccent="Started"
          subtitle="Begin your digital evangelism journey with SDASMS. Complete the registration below and make payment to activate your account."
          nextSectionBg="light"
        />

        {/* Form Section */}
        <section className="py-16 sm:py-20 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <FadeInWhenVisible>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3">
                    Registration Submitted!
                  </h3>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-6">
                    Thank you for registering with SDASMS. Our team will review your application and activate your account within 24 hours after payment confirmation.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                    >
                      Back to Home
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/20 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
                    >
                      <MapPin className="w-5 h-5" />
                      Contact Us
                    </a>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ) : (
              <FadeInWhenVisible>
                <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                  {/* Progress Bar */}
                  <div className="px-6 sm:px-8 pt-8 pb-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-black dark:text-white">
                        Step {currentStep} of 4
                      </span>
                      <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">
                        {Math.round(progressPercent)}% Complete
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#D72444] to-[#FF8340] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="px-6 sm:px-8 py-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentStep === 1 && (
                          <StepAccountType
                            value={formData.accountType}
                            onChange={(val) => handleChange('accountType', val)}
                          />
                        )}
                        {currentStep === 2 && (
                          <StepInfo data={formData} onChange={handleChange} />
                        )}
                        {currentStep === 3 && (
                          <StepDetails
                            data={formData}
                            onChange={handleChange}
                            onToggleIndustry={handleToggleIndustry}
                          />
                        )}
                        {currentStep === 4 && (
                          <StepPayment data={formData} onChange={handleChange} />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={prevStep}
                        className={`inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${
                          currentStep === 1
                            ? 'opacity-0 pointer-events-none'
                            : 'text-[#7F7F7F] dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!validateStep(currentStep)}
                          className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-[#D72444]/20 hover:shadow-[#D72444]/40 transition-all duration-300"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting || !validateStep(4)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D72444] to-[#FF8340] hover:from-[#E03355] hover:to-[#FF9A5C] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-[#D72444]/20 hover:shadow-[#D72444]/40 transition-all duration-300"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Registration
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
