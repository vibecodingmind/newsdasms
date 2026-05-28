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
  Radio,
  CreditCard,
  FileCheck,
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'

/* ─── Constants ──────────────────────────────────────────── */

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300'

const LABEL_CLASS = 'block text-sm font-semibold text-black dark:text-white mb-2'

const STEPS = [
  { id: 1, label: 'Organization', icon: Building2 },
  { id: 2, label: 'Contact', icon: User },
  { id: 3, label: 'Profile', icon: Briefcase },
  { id: 4, label: 'Sender ID', icon: Radio },
  { id: 5, label: 'Payment', icon: CreditCard },
  { id: 6, label: 'Terms', icon: FileCheck },
]

const INDUSTRIES = [
  'eCommerce',
  'Food Industry',
  'General Trading',
  'Health Insurance',
  'Manufacturing',
  'Banking & Finance',
  'Building & Construction',
  'Charities & Non-Profit Organizations',
  'Education',
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

/* ─── Form State Type ────────────────────────────────────── */

interface FormData {
  // Section A - Organization
  orgName: string
  orgAddress: string
  orgCity: string
  orgRegion: string
  orgEmail: string
  orgPhone: string
  orgWebsite: string
  // Section B - Contact
  contactName: string
  contactAddress: string
  contactCity: string
  contactRegion: string
  contactEmail: string
  contactPhone: string
  contactWebsite: string
  contactIdType: 'NIDA' | 'Passport'
  contactIdNumber: string
  // Section C - Profile
  sector: 'Private' | 'Government' | ''
  industries: string[]
  otherIndustry: string
  // Section D - Sender ID
  senderIds: string[]
  sampleMessages: string[]
  // Section E - Package
  packageChoice: string
  // Section G - Terms
  termsAccepted: boolean
  signatory: string
  signatoryName: string
  designation: string
  signDate: string
}

const INITIAL_FORM: FormData = {
  orgName: '',
  orgAddress: '',
  orgCity: '',
  orgRegion: '',
  orgEmail: '',
  orgPhone: '',
  orgWebsite: '',
  contactName: '',
  contactAddress: '',
  contactCity: '',
  contactRegion: '',
  contactEmail: '',
  contactPhone: '',
  contactWebsite: '',
  contactIdType: 'NIDA',
  contactIdNumber: '',
  sector: '',
  industries: [],
  otherIndustry: '',
  senderIds: ['', '', ''],
  sampleMessages: ['', '', ''],
  packageChoice: 'Starter - Tsh 94,500',
  termsAccepted: false,
  signatory: '',
  signatoryName: '',
  designation: '',
  signDate: '',
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

/* ─── Step Components ────────────────────────────────────── */

function StepOrganization({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Organization Details</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Tell us about your organization</p>
        </div>
      </div>

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

      <FormField label="Address" id="orgAddress">
        <input
          id="orgAddress"
          type="text"
          value={data.orgAddress}
          onChange={(e) => onChange('orgAddress', e.target.value)}
          className={INPUT_CLASS}
          placeholder="Street address"
        />
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

      <FormField label="Email" id="orgEmail" required>
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

      <FormField label="Phone" id="orgPhone" required>
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
    </div>
  )
}

function StepContact({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <User className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Contact Details</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Admin / Authorized Person information</p>
        </div>
      </div>

      <FormField label="Full Name" id="contactName" required>
        <input
          id="contactName"
          type="text"
          required
          value={data.contactName}
          onChange={(e) => onChange('contactName', e.target.value)}
          className={INPUT_CLASS}
          placeholder="Full legal name"
        />
      </FormField>

      <FormField label="Address" id="contactAddress">
        <input
          id="contactAddress"
          type="text"
          value={data.contactAddress}
          onChange={(e) => onChange('contactAddress', e.target.value)}
          className={INPUT_CLASS}
          placeholder="Street address"
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="City" id="contactCity">
          <input
            id="contactCity"
            type="text"
            value={data.contactCity}
            onChange={(e) => onChange('contactCity', e.target.value)}
            className={INPUT_CLASS}
            placeholder="City"
          />
        </FormField>
        <FormField label="Region" id="contactRegion">
          <input
            id="contactRegion"
            type="text"
            value={data.contactRegion}
            onChange={(e) => onChange('contactRegion', e.target.value)}
            className={INPUT_CLASS}
            placeholder="Region"
          />
        </FormField>
      </div>

      <FormField label="Email" id="contactEmail" required>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
          <input
            id="contactEmail"
            type="email"
            required
            value={data.contactEmail}
            onChange={(e) => onChange('contactEmail', e.target.value)}
            className={`${INPUT_CLASS} pl-11`}
            placeholder="contact@example.com"
          />
        </div>
      </FormField>

      <FormField label="Phone" id="contactPhone" required>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
          <input
            id="contactPhone"
            type="tel"
            required
            value={data.contactPhone}
            onChange={(e) => onChange('contactPhone', e.target.value)}
            className={`${INPUT_CLASS} pl-11`}
            placeholder="+255 XXX XXX XXX"
          />
        </div>
      </FormField>

      <FormField label="Website" id="contactWebsite">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
          <input
            id="contactWebsite"
            type="url"
            value={data.contactWebsite}
            onChange={(e) => onChange('contactWebsite', e.target.value)}
            className={`${INPUT_CLASS} pl-11`}
            placeholder="https://example.com"
          />
        </div>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="ID Type" id="contactIdType" required>
          <select
            id="contactIdType"
            value={data.contactIdType}
            onChange={(e) => onChange('contactIdType', e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="NIDA">NIDA</option>
            <option value="Passport">Passport</option>
          </select>
        </FormField>
        <FormField label="ID Number" id="contactIdNumber" required>
          <input
            id="contactIdNumber"
            type="text"
            required
            value={data.contactIdNumber}
            onChange={(e) => onChange('contactIdNumber', e.target.value)}
            className={INPUT_CLASS}
            placeholder="Enter your ID number"
          />
        </FormField>
      </div>
    </div>
  )
}

function StepProfile({
  data,
  onChange,
  onToggleIndustry,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
  onToggleIndustry: (industry: string) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Organization Profile</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Tell us about your sector and industry</p>
        </div>
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
  )
}

function StepSenderId({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  const updateSenderId = (index: number, value: string) => {
    const newVal = value.slice(0, 11)
    const updated = [...data.senderIds]
    updated[index] = newVal
    onChange('senderIds', JSON.stringify(updated))
  }

  const updateSampleMessage = (index: number, value: string) => {
    const updated = [...data.sampleMessages]
    updated[index] = value
    onChange('sampleMessages', JSON.stringify(updated))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <Radio className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Sender ID Request</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Provide up to 3 Sender IDs and sample messages</p>
        </div>
      </div>

      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Sender IDs</h4>
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={`sender-${i}`}>
              <label className="block text-sm font-medium text-[#7F7F7F] dark:text-white/50 mb-1.5">
                Sender ID {i + 1}
                {i === 0 && <span className="text-[#D72444] ml-1">*</span>}
              </label>
              <input
                type="text"
                maxLength={11}
                value={data.senderIds[i] || ''}
                onChange={(e) => updateSenderId(i, e.target.value)}
                className={INPUT_CLASS}
                placeholder={`Max 11 characters (e.g. MYCHURCH)`}
              />
              <p className="text-xs text-[#7F7F7F] dark:text-white/30 mt-1">
                {(data.senderIds[i] || '').length}/11 characters
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Sample Messages</h4>
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={`message-${i}`}>
              <label className="block text-sm font-medium text-[#7F7F7F] dark:text-white/50 mb-1.5">
                Sample Message {i + 1}
                {i === 0 && <span className="text-[#D72444] ml-1">*</span>}
              </label>
              <textarea
                rows={3}
                value={data.sampleMessages[i] || ''}
                onChange={(e) => updateSampleMessage(i, e.target.value)}
                className={`${INPUT_CLASS} resize-none`}
                placeholder="Type a sample message you plan to send..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepPayment() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Payment</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Choose your payment method</p>
        </div>
      </div>

      {/* Package Display */}
      <div className="bg-gradient-to-br from-[#D72444]/5 via-[#FF8340]/5 to-[#7C3AED]/5 dark:from-[#D72444]/10 dark:via-[#FF8340]/10 dark:to-[#7C3AED]/10 rounded-2xl p-6 border border-[#D72444]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-black dark:text-white">Starter Package</h4>
            <p className="text-sm text-[#7F7F7F] dark:text-white/50">Perfect for getting started with SDASMS</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-[#D72444]">94,500</p>
            <p className="text-sm text-[#7F7F7F] dark:text-white/50">Tsh</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Includes Sender ID registration and setup</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Pay Online</h4>
        <div className="space-y-3">
          {/* Pesapal */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#D72444]/40 hover:bg-[#D72444]/5 dark:hover:bg-[#D72444]/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-[#D72444] transition-colors">Pay with Pesapal</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">Popular in East Africa (Tanzania)</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-[#D72444] transition-colors" />
          </a>

          {/* Stripe */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#D72444]/40 hover:bg-[#D72444]/5 dark:hover:bg-[#D72444]/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-[#D72444] transition-colors">Pay with Card (Stripe)</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">International debit & credit cards</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-[#D72444] transition-colors" />
          </a>

          {/* PayPal */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#D72444]/40 hover:bg-[#D72444]/5 dark:hover:bg-[#D72444]/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black dark:text-white group-hover:text-[#D72444] transition-colors">Pay with PayPal</p>
              <p className="text-sm text-[#7F7F7F] dark:text-white/50">International payments</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-white/20 group-hover:text-[#D72444] transition-colors" />
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
    </div>
  )
}

function StepTerms({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string | boolean) => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#D72444]/10 flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-[#D72444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white">Terms & Conditions</h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">Review and accept our terms</p>
        </div>
      </div>

      <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
        <p className="text-sm text-[#7F7F7F] dark:text-white/50 leading-relaxed">
          By proceeding with this registration, you agree to comply with the SDASMS Code of Conduct and Code of Practice,
          which govern the use of our messaging platform. These codes ensure responsible, ethical, and lawful use of
          bulk messaging services, protecting both senders and recipients.
        </p>
        <a
          href="/policies/terms-of-service"
          className="inline-flex items-center gap-1 text-[#D72444] text-sm font-semibold mt-3 hover:gap-2 transition-all duration-300"
        >
          Read Full Terms & Conditions
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

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

      <div className="border-t border-gray-200 dark:border-white/10 pt-6 mt-6">
        <h4 className="text-base font-bold text-black dark:text-white mb-4">Authorized Signatory</h4>
        <div className="space-y-5">
          <FormField label="Authorized Signatory" id="signatory">
            <input
              id="signatory"
              type="text"
              value={data.signatory}
              onChange={(e) => onChange('signatory', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Signatory title or name"
            />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Name" id="signatoryName">
              <input
                id="signatoryName"
                type="text"
                value={data.signatoryName}
                onChange={(e) => onChange('signatoryName', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Full name"
              />
            </FormField>
            <FormField label="Designation" id="designation">
              <input
                id="designation"
                type="text"
                value={data.designation}
                onChange={(e) => onChange('designation', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Job title / Role"
              />
            </FormField>
          </div>
          <FormField label="Date" id="signDate">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="signDate"
                type="date"
                value={data.signDate}
                onChange={(e) => onChange('signDate', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
              />
            </div>
          </FormField>
        </div>
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
        return !!(formData.orgName && formData.orgEmail && formData.orgPhone)
      case 2:
        return !!(formData.contactName && formData.contactEmail && formData.contactPhone && formData.contactIdNumber)
      case 3:
        return !!formData.sector
      case 4:
        return !!(formData.senderIds[0] && formData.sampleMessages[0])
      case 5:
        return true
      case 6:
        return formData.termsAccepted
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 6) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) return
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

  const progressPercent = (currentStep / 6) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={{ icon: <Rocket className="w-3.5 h-3.5 text-[#FF8340]" />, text: 'Start Your Journey' }}
          title="Get"
          titleAccent="Started"
          subtitle="Begin your digital evangelism journey with SDASMS. Fill out the registration form below and we'll get you set up."
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
                    Thank you for registering with SDASMS. Our team will review your application and get back to you within 24 hours.
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
                        Step {currentStep} of 6
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

                  {/* Step Indicators */}
                  <div className="px-6 sm:px-8 py-4">
                    <div className="flex items-center justify-between">
                      {STEPS.map((step, index) => (
                        <button
                          key={step.id}
                          onClick={() => {
                            // Can only navigate to completed steps or current
                            if (step.id <= currentStep) {
                              setCurrentStep(step.id)
                            }
                          }}
                          className="flex flex-col items-center gap-1.5 group"
                          disabled={step.id > currentStep}
                        >
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              step.id === currentStep
                                ? 'bg-[#D72444] text-white shadow-lg shadow-[#D72444]/25'
                                : step.id < currentStep
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-white/10 text-gray-300 dark:text-white/20'
                            }`}
                          >
                            {step.id < currentStep ? (
                              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-semibold hidden sm:block ${
                              step.id === currentStep
                                ? 'text-[#D72444]'
                                : step.id < currentStep
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-300 dark:text-white/20'
                            }`}
                          >
                            {step.label}
                          </span>
                          {index < STEPS.length - 1 && (
                            <div
                              className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-[calc(100%/5-40px)] ${
                                step.id < currentStep
                                  ? 'bg-green-300 dark:bg-green-700'
                                  : 'bg-gray-200 dark:bg-white/10'
                              }`}
                            />
                          )}
                        </button>
                      ))}
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
                          <StepOrganization data={formData} onChange={handleChange} />
                        )}
                        {currentStep === 2 && (
                          <StepContact data={formData} onChange={handleChange} />
                        )}
                        {currentStep === 3 && (
                          <StepProfile
                            data={formData}
                            onChange={handleChange}
                            onToggleIndustry={handleToggleIndustry}
                          />
                        )}
                        {currentStep === 4 && (
                          <StepSenderId data={formData} onChange={handleChange} />
                        )}
                        {currentStep === 5 && <StepPayment />}
                        {currentStep === 6 && (
                          <StepTerms data={formData} onChange={handleChange} />
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
                        disabled={currentStep === 1}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#7F7F7F] dark:text-white/50 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      {currentStep < 6 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!validateStep(currentStep)}
                          className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-full px-8 py-3.5 shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting || !validateStep(6)}
                          className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-full px-8 py-4 shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Registration
                              <CheckCircle2 className="w-5 h-5" />
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

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Need help with registration?
              </h2>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Our team is available to guide you through the registration process. Reach out to us and we&apos;ll assist you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5" />
                  Contact Us
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
