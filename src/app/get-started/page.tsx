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
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Users,
  Landmark,
  UserCheck,
  Upload,
  X,
  FileText,
  Plus,
  Trash2,
  CreditCard,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible } from '@/components/AnimationHelpers'

/* ─── Constants ──────────────────────────────────────────── */

const INPUT_CLASS =
  'w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F6F6F6] dark:bg-[#1A0A2E] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D72444]/30 focus:border-[#D72444] transition-all duration-300 text-base'

const LABEL_CLASS = 'block text-sm font-semibold text-black dark:text-white mb-2.5'

const TOTAL_STEPS = 4

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

const STARTER_PACK_FEATURES = [
  'Sender ID Registration',
  'Account Setup & Activation',
  'Dashboard Access',
  'API Credentials',
  'Contact List Upload (up to 10K)',
  'Priority Support',
]

const MAX_LEGAL_DOCS = 5
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

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
  { value: 'CI', label: 'Côte d\'Ivoire' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IN', label: 'India' },
  { value: 'OTHER', label: 'Other' },
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
  country: string
  // Organization-specific
  orgName: string
  orgEmail: string
  orgPhone: string
  orgAddress: string
  orgCity: string
  orgRegion: string
  orgCountry: string
  orgWebsite: string
  // Step 3 - Representative & Org Details
  repName: string
  repEmail: string
  repPhone: string
  repIdType: 'NIDA' | 'Passport'
  repIdNumber: string
  repDesignation: string
  orgType: string
  orgTypeOther: string
  // File uploads (organization only)
  repIdCopy: File | null
  legalDocs: File[]
  authLetter: File | null
  // Step 4 - Payment
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
  orgName: '',
  orgEmail: '',
  orgPhone: '',
  orgAddress: '',
  orgCity: '',
  orgRegion: '',
  orgCountry: '',
  orgWebsite: '',
  repName: '',
  repEmail: '',
  repPhone: '',
  repIdType: 'NIDA',
  repIdNumber: '',
  repDesignation: '',
  orgType: '',
  orgTypeOther: '',
  repIdCopy: null,
  legalDocs: [],
  authLetter: null,
  paymentMethod: '',
  paymentConfirmed: false,
  termsAccepted: false,
}

/* ─── Reusable File Upload Component ─────────────────────── */

function FileUpload({
  label,
  id,
  required,
  file,
  onFileChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  helpText,
}: {
  label: string
  id: string
  required?: boolean
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  helpText?: string
}) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFileChange(dropped)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required && <span className="text-[#D72444] ml-1">*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[#D72444]/30 bg-[#D72444]/5 dark:bg-[#D72444]/10">
          <div className="w-10 h-10 rounded-lg bg-[#D72444]/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#D72444]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black dark:text-white truncate">{file.name}</p>
            <p className="text-xs text-[#7F7F7F] dark:text-white/50">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-red-500 dark:text-red-400" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById(id)?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-6 text-center hover:border-[#D72444]/40 hover:bg-[#D72444]/5 dark:hover:bg-[#D72444]/5 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-5 h-5 text-gray-400 dark:text-white/30" />
          </div>
          <p className="text-sm font-semibold text-black dark:text-white mb-1">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-[#7F7F7F] dark:text-white/40">
            {helpText || 'PDF, JPG, PNG (max 5MB)'}
          </p>
          <input
            id={id}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                if (f.size > 5 * 1024 * 1024) {
                  alert('File size must be under 5MB')
                  return
                }
                onFileChange(f)
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

/* ─── Multi-File Upload Component ────────────────────────── */

function MultiFileUpload({
  label,
  id,
  required,
  files,
  onFilesChange,
  maxFiles = MAX_LEGAL_DOCS,
  accept = '.pdf,.jpg,.jpeg,.png',
  helpText,
}: {
  label: string
  id: string
  required?: boolean
  files: File[]
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  accept?: string
  helpText?: string
}) {
  const inputId = `${id}-input`

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files)
    addFiles(dropped)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const addFiles = (newFiles: File[]) => {
    const remaining = maxFiles - files.length
    if (remaining <= 0) return

    const valid: File[] = []
    for (const f of newFiles) {
      if (valid.length >= remaining) break
      if (f.size > MAX_FILE_SIZE) {
        alert(`"${f.name}" exceeds 5MB limit and was skipped.`)
        continue
      }
      valid.push(f)
    }

    if (valid.length > 0) {
      onFilesChange([...files, ...valid])
    }
  }

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const canAddMore = files.length < maxFiles

  return (
    <div>
      <label className={LABEL_CLASS}>
        {label}
        {required && <span className="text-[#D72444] ml-1">*</span>}
        <span className="text-xs font-normal text-[#7F7F7F] dark:text-white/40 ml-2">
          ({files.length}/{maxFiles} uploaded)
        </span>
      </label>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="space-y-2 mb-3">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[#D72444]/30 bg-[#D72444]/5 dark:bg-[#D72444]/10"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D72444]/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#D72444]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-black dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-[#7F7F7F] dark:text-white/50">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById(inputId)?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-5 text-center hover:border-[#D72444]/40 hover:bg-[#D72444]/5 dark:hover:bg-[#D72444]/5 transition-all duration-300"
        >
          <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-2">
            <Plus className="w-4 h-4 text-gray-400 dark:text-white/30" />
          </div>
          <p className="text-sm font-semibold text-black dark:text-white mb-1">
            Add {files.length === 0 ? 'documents' : 'more documents'}
          </p>
          <p className="text-xs text-[#7F7F7F] dark:text-white/40">
            {helpText || `PDF, JPG, PNG (max 5MB each, up to ${maxFiles} files)`}
          </p>
          <input
            id={inputId}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files ? Array.from(e.target.files) : []
              if (selected.length > 0) addFiles(selected)
              // Reset input so the same file can be selected again
              e.target.value = ''
            }}
          />
        </div>
      )}
    </div>
  )
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

          <FormField label="Address" id="orgAddress" required>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgAddress"
                type="text"
                required
                value={data.orgAddress}
                onChange={(e) => onChange('orgAddress', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="Street address"
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="City" id="orgCity" required>
              <input
                id="orgCity"
                type="text"
                required
                value={data.orgCity}
                onChange={(e) => onChange('orgCity', e.target.value)}
                className={INPUT_CLASS}
                placeholder="City"
              />
            </FormField>
            <FormField label="Region" id="orgRegion" required>
              <input
                id="orgRegion"
                type="text"
                required
                value={data.orgRegion}
                onChange={(e) => onChange('orgRegion', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Region"
              />
            </FormField>
          </div>

          <FormField label="Country" id="orgCountry" required>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <select
                id="orgCountry"
                required
                value={data.orgCountry}
                onChange={(e) => onChange('orgCountry', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
              >
                <option value="">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </FormField>

          <FormField label="Website" id="orgWebsite" required>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="orgWebsite"
                type="url"
                required
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

          <FormField label="Address" id="address" required>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <input
                id="address"
                type="text"
                required
                value={data.address}
                onChange={(e) => onChange('address', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
                placeholder="Street address"
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="City" id="city" required>
              <input
                id="city"
                type="text"
                required
                value={data.city}
                onChange={(e) => onChange('city', e.target.value)}
                className={INPUT_CLASS}
                placeholder="City"
              />
            </FormField>
            <FormField label="Region" id="region" required>
              <input
                id="region"
                type="text"
                required
                value={data.region}
                onChange={(e) => onChange('region', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Region"
              />
            </FormField>
          </div>

          <FormField label="Country" id="country" required>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
              <select
                id="country"
                required
                value={data.country}
                onChange={(e) => onChange('country', e.target.value)}
                className={`${INPUT_CLASS} pl-11`}
              >
                <option value="">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </FormField>
        </>
      )}
    </div>
  )
}

/* ─── Step 3: Representative & Organization Details ──────── */

function StepDetails({
  data,
  onChange,
  onFileChange,
  onLegalDocsChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
  onFileChange: (field: keyof FormData, file: File | null) => void
  onLegalDocsChange: (files: File[]) => void
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
            {isOrg ? 'Representative & Organization Details' : 'Your Details'}
          </h3>
          <p className="text-[#7F7F7F] dark:text-white/50 text-sm">
            {isOrg ? 'Provide authorized person and organization profile' : 'Provide your ID and additional details'}
          </p>
        </div>
      </div>

      {/* For Personal Accounts - ID & Details */}
      {!isOrg && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-white/10">
            <UserCheck className="w-5 h-5 text-[#D72444]" />
            <h4 className="text-base font-bold text-black dark:text-white">Personal Identification</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="ID Type" id="repIdType" required>
              <select
                id="repIdType"
                required
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
          </div>

          <FileUpload
            label="ID Copy"
            id="repIdCopy"
            required
            file={data.repIdCopy}
            onFileChange={(f) => onFileChange('repIdCopy', f)}
            helpText="Upload a clear copy of your NIDA or Passport (PDF, JPG, PNG max 5MB)"
          />
        </div>
      )}

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
                required
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
            <FormField label="Designation" id="repDesignation" required>
              <input
                id="repDesignation"
                type="text"
                required
                value={data.repDesignation}
                onChange={(e) => onChange('repDesignation', e.target.value)}
                className={INPUT_CLASS}
                placeholder="Job title / Role"
              />
            </FormField>
          </div>

          <FileUpload
            label="ID Copy"
            id="repIdCopy"
            required
            file={data.repIdCopy}
            onFileChange={(f) => onFileChange('repIdCopy', f)}
            helpText="Upload a clear copy of NIDA or Passport (PDF, JPG, PNG max 5MB)"
          />
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
              Organization Type<span className="text-[#D72444] ml-1">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ORG_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    data.orgType === type.value
                      ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10'
                      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="orgType"
                    value={type.value}
                    checked={data.orgType === type.value}
                    onChange={(e) => onChange('orgType', e.target.value)}
                    className="w-4 h-4 accent-[#D72444]"
                  />
                  <span className="text-sm font-medium text-black dark:text-white">{type.label}</span>
                </label>
              ))}
            </div>
            {data.orgType === 'other' && (
              <div className="mt-3">
                <input
                  type="text"
                  required
                  value={data.orgTypeOther}
                  onChange={(e) => onChange('orgTypeOther', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Please specify your organization type"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-white/10 mt-6">
            <FileText className="w-5 h-5 text-[#D72444]" />
            <h4 className="text-base font-bold text-black dark:text-white">Organization Documents</h4>
          </div>

          <MultiFileUpload
            label="Legal Documents (Registration, Licence, etc.)"
            id="legalDocs"
            required
            files={data.legalDocs}
            onFilesChange={onLegalDocsChange}
            helpText="Upload registration, licence, or other legal documents (PDF, JPG, PNG max 5MB each, up to 5 files)"
          />

          <FileUpload
            label="Request & Authorization Letter"
            id="authLetter"
            required
            file={data.authLetter}
            onFileChange={(f) => onFileChange('authLetter', f)}
            helpText="Upload signed request & authorization letter on organization letterhead (PDF, JPG, PNG max 5MB)"
          />
        </div>
      )}

    </div>
  )
}

/* ─── Step 4: Starter Pack & Payment ────────────────────── */

const MANUAL_PAYMENT_METHODS = [
  {
    id: 'mpesa' as const,
    title: 'M-PESA',
    detail: '51720044',
    color: '#E4202E',
    icon: Phone,
    description: 'Send via M-PESA Lipa Number',
  },
  {
    id: 'bank' as const,
    title: 'Bank Transfer',
    detail: BANK_INFO.bank,
    color: '#7C3AED',
    icon: Landmark,
    description: 'Transfer directly to our bank account',
  },
]

function StepPayment({
  data,
  onChange,
}: {
  data: FormData
  onChange: (field: keyof FormData, value: string | boolean) => void
}) {
  // All payments are manual (Bank + M-PESA only)

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

      {/* Payment Method Selection */}
      <div>
        <h4 className="text-base font-bold text-black dark:text-white mb-2">Choose Payment Method</h4>
        <p className="text-sm text-[#7F7F7F] dark:text-white/50 mb-5">
          All payment details are sent to{' '}
          <a href="mailto:hello@sdasms.com" className="text-[#D72444] font-semibold hover:underline">hello@sdasms.com</a>{' '}
          for admin verification.
        </p>

        <div className="space-y-3">
          {MANUAL_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => {
                onChange('paymentMethod', method.id)
                onChange('paymentConfirmed', false)
              }}
              className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer text-left ${
                data.paymentMethod === method.id
                  ? 'border-[#D72444] bg-[#D72444]/5 dark:bg-[#D72444]/10 shadow-md'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-sm'
              }`}
            >
              {data.paymentMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="shrink-0"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D72444]" />
                </motion.div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${method.color}15` }}>
                <method.icon className="w-6 h-6" style={{ color: method.color }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-black dark:text-white">{method.title}</p>
                <p className="text-sm text-[#7F7F7F] dark:text-white/50">{method.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Payment Details - shown when a method is selected */}
        {isManualPayment && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5"
          >
            <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h5 className="text-sm font-bold text-black dark:text-white mb-4">
                Payment Instructions — {data.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'}
              </h5>

              {data.paymentMethod === 'bank' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Bank</span>
                    <span className="text-sm font-semibold text-black dark:text-white">{BANK_INFO.bank}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Account Name</span>
                    <span className="text-sm font-semibold text-black dark:text-white">{BANK_INFO.accountName}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Account Number</span>
                    <span className="text-base font-mono font-bold text-[#D72444]">{BANK_INFO.accountNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Provider</span>
                    <span className="text-sm font-semibold text-black dark:text-white">M-PESA</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Lipa Number</span>
                    <span className="text-base font-mono font-bold text-[#E4202E]">51720044</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-white dark:bg-[#0D0B1A] rounded-xl border border-gray-100 dark:border-white/10">
                    <span className="text-sm font-medium text-[#7F7F7F] dark:text-white/50">Merchant Name</span>
                    <span className="text-sm font-bold text-[#D72444]">SDASMS</span>
                  </div>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/10">
                <p className="text-sm text-[#7F7F7F] dark:text-white/50 leading-relaxed mb-4">
                  Send <strong className="text-black dark:text-white">94,500 TZS</strong> via {data.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'} and include &ldquo;SDASMS&rdquo; as reference.
                  After payment, confirm below.
                </p>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={data.paymentConfirmed}
                    onChange={(e) => onChange('paymentConfirmed', e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-[#D72444] rounded shrink-0"
                  />
                  <span className="text-sm text-black dark:text-white leading-relaxed">
                    I have completed the payment of <strong>94,500 TZS</strong> via {data.paymentMethod === 'bank' ? 'Bank Transfer' : 'M-PESA'}
                    {data.paymentMethod === 'bank' ? ` to ${BANK_INFO.accountNumber}` : ' to 51720044'}
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

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

  const handleChange = (field: keyof FormData, value: string | boolean | File | File[] | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.accountType !== ''
      case 2:
        if (formData.accountType === 'organization') {
          return !!(formData.orgName && formData.orgEmail && formData.orgPhone && formData.orgAddress && formData.orgCity && formData.orgRegion && formData.orgCountry && formData.orgWebsite)
        }
        return !!(formData.fullName && formData.email && formData.phone && formData.address && formData.city && formData.region && formData.country)
      case 3:
        if (formData.accountType === 'organization') {
          return !!(formData.repName && formData.repEmail && formData.repPhone && formData.repIdNumber && formData.repDesignation && formData.orgType && formData.repIdCopy && formData.legalDocs.length >= 1 && formData.authLetter)
        }
        // Personal: requires ID number and ID copy
        return !!(formData.repIdNumber && formData.repIdCopy)
      case 4:
        if (!formData.paymentMethod) return false
        // All payments are manual — require user confirmation
        if (!formData.paymentConfirmed) return false
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

    // Submit registration with payment details
    try {
      await submitRegistration()
      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const submitRegistration = async () => {
    // Use FormData multipart to support file uploads
    const fd = new FormData()

    // Add all text fields
    fd.append('accountType', formData.accountType)
    if (formData.accountType === 'personal') {
      fd.append('fullName', formData.fullName)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('address', formData.address)
      fd.append('city', formData.city)
      fd.append('region', formData.region)
      fd.append('country', formData.country)
    } else {
      fd.append('orgName', formData.orgName)
      fd.append('orgEmail', formData.orgEmail)
      fd.append('orgPhone', formData.orgPhone)
      fd.append('orgAddress', formData.orgAddress)
      fd.append('orgCity', formData.orgCity)
      fd.append('orgRegion', formData.orgRegion)
      fd.append('orgCountry', formData.orgCountry)
      fd.append('orgWebsite', formData.orgWebsite)
      fd.append('repName', formData.repName)
      fd.append('repEmail', formData.repEmail)
      fd.append('repPhone', formData.repPhone)
      fd.append('repIdType', formData.repIdType)
      fd.append('repIdNumber', formData.repIdNumber)
      fd.append('repDesignation', formData.repDesignation)
      fd.append('orgType', formData.orgType)
      fd.append('orgTypeOther', formData.orgTypeOther)
      if (formData.repIdCopy) fd.append('repIdCopy', formData.repIdCopy)
      formData.legalDocs.forEach((file) => fd.append('legalDocs', file))
      if (formData.authLetter) fd.append('authLetter', formData.authLetter)
    }
    fd.append('termsAccepted', String(formData.termsAccepted))
    fd.append('paymentMethod', formData.paymentMethod)
    fd.append('paymentConfirmed', String(formData.paymentConfirmed))

    const response = await fetch('/api/onboard', {
      method: 'POST',
      body: fd,
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Something went wrong. Please try again.')
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
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <div className="px-6 sm:px-10 pt-8 pb-2">
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
                  <div className="px-6 sm:px-10 py-8">
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
                            onFileChange={handleFileChange}
                            onLegalDocsChange={(files) => setFormData((prev) => ({ ...prev, legalDocs: files }))}
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
