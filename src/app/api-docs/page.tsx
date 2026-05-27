'use client'

import { useState } from 'react'
import {
  Code2,
  Key,
  Zap,
  Globe,
  Shield,
  Terminal,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Copy,
  Webhook,
  Lock,
  Send,
  BarChart3,
  Users,
  FileText,
  Layers,
  Clock,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/AnimationHelpers'

/* ─── Data ──────────────────────────────────────────────────────── */

const QUICK_START_STEPS = [
  {
    step: '01',
    icon: Key,
    title: 'Get Your API Key',
    description:
      'Sign up or log in to your SDASMS dashboard. Navigate to Settings > API Keys and generate a new key. Keep it secure — it\'s your authentication credential.',
    color: '#D72444',
  },
  {
    step: '02',
    icon: Globe,
    title: 'Configure Your Endpoint',
    description:
      'Choose your preferred API: the simple HTTP API or the full-featured REST v3 API. Both support JSON and form-encoded requests.',
    color: '#FF8340',
  },
  {
    step: '03',
    icon: Send,
    title: 'Send Your First Request',
    description:
      'Make a POST request to the SMS send endpoint with your API key, recipient number, and message. You\'ll receive a message ID for tracking delivery.',
    color: '#7C3AED',
  },
]

const HTTP_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/http/sms/send',
    baseUrl: 'https://my.sdasms.com',
    description: 'Send an SMS message to one or more recipients.',
    params: [
      { name: 'api_token', required: true, type: 'string', desc: 'Your API authentication token' },
      { name: 'to', required: true, type: 'string', desc: 'Recipient phone number(s), comma-separated' },
      { name: 'from', required: true, type: 'string', desc: 'Sender ID or phone number' },
      { name: 'message', required: true, type: 'string', desc: 'SMS text content (up to 160 chars per segment)' },
      { name: 'schedule', required: false, type: 'datetime', desc: 'Schedule delivery (ISO 8601 format)' },
    ],
  },
  {
    method: 'GET',
    path: '/api/http/sms/status',
    baseUrl: 'https://my.sdasms.com',
    description: 'Check the delivery status of a sent message.',
    params: [
      { name: 'api_token', required: true, type: 'string', desc: 'Your API authentication token' },
      { name: 'message_id', required: true, type: 'string', desc: 'ID returned from the send endpoint' },
    ],
  },
  {
    method: 'POST',
    path: '/api/http/contacts',
    baseUrl: 'https://my.sdasms.com',
    description: 'Create or update contacts in your address book.',
    params: [
      { name: 'api_token', required: true, type: 'string', desc: 'Your API authentication token' },
      { name: 'phone', required: true, type: 'string', desc: 'Contact phone number' },
      { name: 'name', required: false, type: 'string', desc: 'Contact display name' },
      { name: 'group', required: false, type: 'string', desc: 'Group to assign the contact to' },
    ],
  },
  {
    method: 'GET',
    path: '/api/http/reports',
    baseUrl: 'https://my.sdasms.com',
    description: 'Retrieve delivery reports for your messages.',
    params: [
      { name: 'api_token', required: true, type: 'string', desc: 'Your API authentication token' },
      { name: 'date_from', required: false, type: 'date', desc: 'Start date (YYYY-MM-DD)' },
      { name: 'date_to', required: false, type: 'date', desc: 'End date (YYYY-MM-DD)' },
      { name: 'status', required: false, type: 'string', desc: 'Filter by status: delivered, failed, pending' },
    ],
  },
]

const V3_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/v3/sms/send',
    baseUrl: 'https://my.sdasms.com',
    description: 'Send SMS via the RESTful v3 API with full JSON body support.',
    params: [
      { name: 'to', required: true, type: 'array', desc: 'Array of recipient phone numbers' },
      { name: 'from', required: true, type: 'string', desc: 'Sender ID or phone number' },
      { name: 'message', required: true, type: 'string', desc: 'SMS text content' },
      { name: 'schedule', required: false, type: 'datetime', desc: 'ISO 8601 scheduled time' },
      { name: 'callback_url', required: false, type: 'string', desc: 'Webhook URL for delivery updates' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v3/sms/{id}',
    baseUrl: 'https://my.sdasms.com',
    description: 'Retrieve details and delivery status of a specific message.',
    params: [
      { name: 'id', required: true, type: 'string', desc: 'Message ID (path parameter)' },
    ],
  },
  {
    method: 'POST',
    path: '/api/v3/contacts',
    baseUrl: 'https://my.sdasms.com',
    description: 'Create or update contacts with structured JSON payload.',
    params: [
      { name: 'phone', required: true, type: 'string', desc: 'Contact phone number' },
      { name: 'name', required: true, type: 'string', desc: 'Contact display name' },
      { name: 'groups', required: false, type: 'array', desc: 'Array of group names to assign' },
      { name: 'metadata', required: false, type: 'object', desc: 'Custom key-value pairs' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v3/reports',
    baseUrl: 'https://my.sdasms.com',
    description: 'Retrieve aggregated delivery reports with filtering and pagination.',
    params: [
      { name: 'date_from', required: false, type: 'date', desc: 'Start date (YYYY-MM-DD)' },
      { name: 'date_to', required: false, type: 'date', desc: 'End date (YYYY-MM-DD)' },
      { name: 'page', required: false, type: 'integer', desc: 'Page number (default: 1)' },
      { name: 'per_page', required: false, type: 'integer', desc: 'Results per page (default: 50)' },
    ],
  },
  {
    method: 'POST',
    path: '/api/v3/groups',
    baseUrl: 'https://my.sdasms.com',
    description: 'Create contact groups for organized messaging campaigns.',
    params: [
      { name: 'name', required: true, type: 'string', desc: 'Group name' },
      { name: 'description', required: false, type: 'string', desc: 'Group description' },
    ],
  },
]

const CODE_EXAMPLES: Record<string, { label: string; icon: string; code: string }> = {
  curl: {
    label: 'cURL',
    icon: '⌘',
    code: `curl -X POST https://my.sdasms.com/api/http/sms/send \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "api_token=YOUR_API_KEY" \\
  -d "to=+254712345678" \\
  -d "from=SDASMS" \\
  -d "message=Hello from SDASMS API!"`,
  },
  javascript: {
    label: 'JavaScript',
    icon: 'JS',
    code: `const response = await fetch(
  "https://my.sdasms.com/api/http/sms/send",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY",
    },
    body: JSON.stringify({
      to: "+254712345678",
      from: "SDASMS",
      message: "Hello from SDASMS API!",
    }),
  }
);

const data = await response.json();
console.log(data);`,
  },
  python: {
    label: 'Python',
    icon: '🐍',
    code: `import requests

response = requests.post(
    "https://my.sdasms.com/api/http/sms/send",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "to": "+254712345678",
        "from": "SDASMS",
        "message": "Hello from SDASMS API!",
    },
)

print(response.json())`,
  },
  php: {
    label: 'PHP',
    icon: '🐘',
    code: `<?php

$ch = curl_init("https://my.sdasms.com/api/http/sms/send");

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer YOUR_API_KEY",
    "Content-Type: application/json",
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "to" => "+254712345678",
    "from" => "SDASMS",
    "message" => "Hello from SDASMS API!",
]));

$response = curl_exec($ch);
curl_close($ch);

echo $response;`,
  },
}

const ERROR_CODES = [
  { code: 400, title: 'Bad Request', description: 'The request was malformed or missing required parameters. Check your request body and try again.' },
  { code: 401, title: 'Unauthorized', description: 'Invalid or missing API key. Verify your api_token or Authorization header is correct.' },
  { code: 403, title: 'Forbidden', description: 'Your API key does not have permission to access this resource. Check your account plan and permissions.' },
  { code: 404, title: 'Not Found', description: 'The requested resource or endpoint does not exist. Verify the URL path and resource ID.' },
  { code: 429, title: 'Too Many Requests', description: 'You have exceeded the rate limit. Wait and retry, or contact support to increase your limits.' },
  { code: 500, title: 'Server Error', description: 'An unexpected error occurred on our servers. Please retry after a moment or contact support.' },
]

/* ─── Sub-Components ────────────────────────────────────────────── */

function TerminalCodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1A1A2E] dark:bg-[#0D0B1A]">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#16162A] dark:bg-[#0A0918]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        {language && (
          <span className="text-white/30 text-xs font-medium">{language}</span>
        )}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-5">
        <pre className="text-sm leading-relaxed font-mono">
          <code className="text-white/80">{code}</code>
        </pre>
      </div>
    </div>
  )
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    POST: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    PUT: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    DELETE: 'bg-red-500/15 text-red-400 border-red-500/20',
    PATCH: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
        colors[method] || 'bg-gray-500/15 text-gray-400 border-gray-500/20'
      }`}
    >
      {method}
    </span>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────── */

export default function ApiDocsPage() {
  const [activeCodeTab, setActiveCodeTab] = useState<string>('curl')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ─── Hero ──────────────────────────────────────────────── */}
        <PageHero
          badge={{ icon: <BookOpen className="w-3.5 h-3.5 text-[#D72444]" />, text: 'Developer Resources' }}
          title="API"
          titleAccent="Documentation"
          subtitle="Integrate SMS messaging into your applications with our simple HTTP API or full-featured REST v3 endpoints."
        />

        {/* ─── Getting Started ───────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#D72444]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#D72444]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Getting Started
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Send your first SMS in minutes. Follow these three simple steps to get up and running with the SDASMS API.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {QUICK_START_STEPS.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="group relative bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    {/* Step number */}
                    <span
                      className="absolute top-6 right-6 text-6xl font-black opacity-[0.06]"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </span>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${step.color}12` }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Authentication ────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF8340]/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FF8340]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Authentication
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                All API requests require authentication. You can authenticate using either a Bearer token in the Authorization header or by passing your API key as a query parameter.
              </p>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Bearer Token */}
              <FadeInWhenVisible delay={0.1}>
                <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white">
                        Bearer Token
                      </h3>
                      <p className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium">
                        Recommended — REST API v3
                      </p>
                    </div>
                  </div>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-5">
                    Include your API key in the <code className="text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/10 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header using the Bearer scheme. This is the recommended method for the v3 REST API.
                  </p>
                  <TerminalCodeBlock
                    code={`Authorization: Bearer YOUR_API_KEY`}
                    language="HTTP Header"
                  />
                </div>
              </FadeInWhenVisible>

              {/* API Token Parameter */}
              <FadeInWhenVisible delay={0.2}>
                <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D72444]/10 flex items-center justify-center">
                      <Key className="w-5 h-5 text-[#D72444]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white">
                        API Token Parameter
                      </h3>
                      <p className="text-[#7F7F7F] dark:text-white/50 text-xs font-medium">
                        Simple — HTTP API
                      </p>
                    </div>
                  </div>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-5">
                    Pass your API key as the <code className="text-[#D72444] dark:text-[#FF8340] bg-[#D72444]/10 px-1.5 py-0.5 rounded text-xs font-mono">api_token</code> parameter in the request body or query string. This is the simplest method for the HTTP API.
                  </p>
                  <TerminalCodeBlock
                    code={`POST /api/http/sms/send
      api_token=YOUR_API_KEY
      to=+254712345678
      from=SDASMS
      message=Hello World`}
                    language="Form Data"
                  />
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* ─── HTTP API Endpoints ────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#D72444]/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#D72444]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  HTTP API Endpoints
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                A simple, easy-to-use HTTP API for sending SMS and managing your messaging. Perfect for quick integrations and simple use cases.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-[#7F7F7F] dark:text-white/50 font-medium">Base URL:</span>
                <code className="text-[#D72444] dark:text-[#FF8340] bg-[#D72444]/10 dark:bg-[#FF8340]/10 px-3 py-1 rounded-lg font-mono text-xs">
                  https://my.sdasms.com
                </code>
              </div>
            </FadeInWhenVisible>

            <div className="space-y-6">
              {HTTP_ENDPOINTS.map((endpoint, idx) => (
                <FadeInWhenVisible key={endpoint.path} delay={idx * 0.08}>
                  <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Endpoint header */}
                    <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <MethodBadge method={endpoint.method} />
                        <code className="text-sm sm:text-base font-mono text-black dark:text-white font-semibold break-all">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-[#7F7F7F] dark:text-white/50 text-sm mt-3 font-medium">
                        {endpoint.description}
                      </p>
                    </div>
                    {/* Parameters table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100 dark:border-white/5">
                            <th className="text-left px-5 sm:px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Parameter
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Type
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Required
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.params.map((param) => (
                            <tr
                              key={param.name}
                              className="border-b border-gray-50 dark:border-white/5 last:border-0"
                            >
                              <td className="px-5 sm:px-6 py-3">
                                <code className="text-[#D72444] dark:text-[#FF8340] bg-[#D72444]/10 dark:bg-[#FF8340]/10 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                                  {param.name}
                                </code>
                              </td>
                              <td className="px-3 py-3 text-[#7F7F7F] dark:text-white/40 font-mono text-xs">
                                {param.type}
                              </td>
                              <td className="px-3 py-3">
                                {param.required ? (
                                  <span className="inline-flex items-center gap-1 text-[#D72444] text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D72444]" />
                                    Required
                                  </span>
                                ) : (
                                  <span className="text-[#7F7F7F] dark:text-white/30 text-xs font-medium">
                                    Optional
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-3 text-[#7F7F7F] dark:text-white/50 text-sm font-medium">
                                {param.desc}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* ─── REST API v3 Endpoints ─────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  REST API v3 Endpoints
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                A modern, RESTful API with full JSON support, structured responses, and OAuth2 authentication. Ideal for production applications.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-[#7F7F7F] dark:text-white/50 font-medium">Base URL:</span>
                <code className="text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/10 px-3 py-1 rounded-lg font-mono text-xs">
                  https://my.sdasms.com
                </code>
              </div>
            </FadeInWhenVisible>

            <div className="space-y-6">
              {V3_ENDPOINTS.map((endpoint, idx) => (
                <FadeInWhenVisible key={endpoint.path} delay={idx * 0.08}>
                  <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Endpoint header */}
                    <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <MethodBadge method={endpoint.method} />
                        <code className="text-sm sm:text-base font-mono text-black dark:text-white font-semibold break-all">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-[#7F7F7F] dark:text-white/50 text-sm mt-3 font-medium">
                        {endpoint.description}
                      </p>
                    </div>
                    {/* Parameters table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-white/10">
                            <th className="text-left px-5 sm:px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Parameter
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Type
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Required
                            </th>
                            <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.params.map((param) => (
                            <tr
                              key={param.name}
                              className="border-b border-gray-100 dark:border-white/5 last:border-0"
                            >
                              <td className="px-5 sm:px-6 py-3">
                                <code className="text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/10 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                                  {param.name}
                                </code>
                              </td>
                              <td className="px-3 py-3 text-[#7F7F7F] dark:text-white/40 font-mono text-xs">
                                {param.type}
                              </td>
                              <td className="px-3 py-3">
                                {param.required ? (
                                  <span className="inline-flex items-center gap-1 text-[#7C3AED] text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                                    Required
                                  </span>
                                ) : (
                                  <span className="text-[#7F7F7F] dark:text-white/30 text-xs font-medium">
                                    Optional
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-3 text-[#7F7F7F] dark:text-white/50 text-sm font-medium">
                                {param.desc}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Code Examples ─────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF8340]/10 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-[#FF8340]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Code Examples
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Get started quickly with code samples in popular languages. All examples show how to send an SMS message.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <div className="bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                {/* Tab bar */}
                <div className="flex items-center border-b border-gray-100 dark:border-white/10 overflow-x-auto">
                  {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                    <button
                      key={key}
                      onClick={() => setActiveCodeTab(key)}
                      className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                        activeCodeTab === key
                          ? 'text-[#D72444] dark:text-[#FF8340] border-[#D72444] dark:border-[#FF8340] bg-[#D72444]/05 dark:bg-[#FF8340]/05'
                          : 'text-[#7F7F7F] dark:text-white/40 border-transparent hover:text-black dark:hover:text-white/70'
                      }`}
                    >
                      <span className="text-xs">{example.icon}</span>
                      {example.label}
                    </button>
                  ))}
                </div>

                {/* Code content */}
                <div className="p-0">
                  <TerminalCodeBlock
                    code={CODE_EXAMPLES[activeCodeTab].code}
                    language={CODE_EXAMPLES[activeCodeTab].label}
                  />
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ─── Webhooks ──────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                  <Webhook className="w-6 h-6 text-[#10B981]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Webhooks
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                Receive real-time delivery updates via HTTP callbacks to your server. Configure your webhook URL in the dashboard or via the API.
              </p>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <FadeInWhenVisible delay={0.1}>
                <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Webhook Payload
                  </h3>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-5">
                    When a delivery status changes, SDASMS sends a POST request to your configured URL with the following JSON payload:
                  </p>
                  <TerminalCodeBlock
                    code={`{
  "event": "sms.delivery",
  "message_id": "msg_abc123def456",
  "status": "delivered",
  "to": "+254712345678",
  "timestamp": "2025-01-15T10:30:00Z",
  "error_code": null,
  "metadata": {
    "campaign_id": "camp_789"
  }
}`}
                    language="JSON"
                  />
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.2}>
                <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Delivery Status Values
                  </h3>
                  <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-5">
                    Webhook callbacks will include one of the following status values:
                  </p>
                  <div className="space-y-3">
                    {[
                      { status: 'queued', color: '#F59E0B', desc: 'Message is queued and waiting to be sent' },
                      { status: 'sent', color: '#3B82F6', desc: 'Message has been sent to the carrier' },
                      { status: 'delivered', color: '#10B981', desc: 'Message was successfully delivered' },
                      { status: 'failed', color: '#EF4444', desc: 'Message delivery failed' },
                      { status: 'undelivered', color: '#8B5CF6', desc: 'Message could not be delivered' },
                    ].map((item) => (
                      <div key={item.status} className="flex items-start gap-3">
                        <span
                          className="mt-1 w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <code className="text-sm font-mono font-bold text-black dark:text-white">
                            {item.status}
                          </code>
                          <p className="text-[#7F7F7F] dark:text-white/50 text-sm font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#FF8340]/10 border border-[#FF8340]/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#FF8340] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#FF8340] font-medium leading-relaxed">
                        Your endpoint must respond with a 200 status code within 5 seconds. Failed deliveries are retried up to 3 times with exponential backoff.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* ─── Rate Limits ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#F6F6F6] dark:bg-[#1A0A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Rate Limits
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                To ensure fair usage and platform stability, API requests are rate-limited. Limits vary by plan and endpoint.
              </p>
            </FadeInWhenVisible>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Send,
                  label: 'SMS Send',
                  value: '100 req/min',
                  desc: 'Per API key on standard plans',
                  color: '#D72444',
                },
                {
                  icon: BarChart3,
                  label: 'Status Checks',
                  value: '200 req/min',
                  desc: 'Delivery status queries',
                  color: '#FF8340',
                },
                {
                  icon: Users,
                  label: 'Contact Ops',
                  value: '60 req/min',
                  desc: 'Create, update, list contacts',
                  color: '#7C3AED',
                },
                {
                  icon: FileText,
                  label: 'Reports',
                  value: '30 req/min',
                  desc: 'Delivery and analytics reports',
                  color: '#10B981',
                },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <div className="group bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#7F7F7F] dark:text-white/50 mb-1 uppercase tracking-wider">
                      {item.label}
                    </h3>
                    <p className="text-2xl font-bold text-black dark:text-white mb-2">
                      {item.value}
                    </p>
                    <p className="text-[#7F7F7F] dark:text-white/40 text-xs font-medium">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInWhenVisible delay={0.3}>
              <div className="mt-8 bg-white dark:bg-[#0D0B1A] border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-bold text-black dark:text-white mb-4">
                  Rate Limit Headers
                </h3>
                <p className="text-[#7F7F7F] dark:text-white/50 text-sm leading-relaxed font-medium mb-5">
                  Every API response includes headers to help you track your rate limit usage:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/10">
                        <th className="text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">Header</th>
                        <th className="text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { header: 'X-RateLimit-Limit', desc: 'Maximum number of requests allowed in the current window' },
                        { header: 'X-RateLimit-Remaining', desc: 'Number of requests remaining in the current window' },
                        { header: 'X-RateLimit-Reset', desc: 'Unix timestamp when the rate limit window resets' },
                      ].map((h) => (
                        <tr key={h.header} className="border-b border-gray-50 dark:border-white/5 last:border-0">
                          <td className="px-4 py-3">
                            <code className="text-[#D72444] dark:text-[#FF8340] bg-[#D72444]/10 dark:bg-[#FF8340]/10 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                              {h.header}
                            </code>
                          </td>
                          <td className="px-4 py-3 text-[#7F7F7F] dark:text-white/50 font-medium">{h.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ─── Error Codes ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                  Error Codes
                </h2>
              </div>
              <p className="text-[#7F7F7F] dark:text-white/50 text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
                The API uses standard HTTP status codes. Here are the most common errors and how to resolve them.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <div className="bg-[#F6F6F6] dark:bg-[#1A0A2E] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0D0B1A]">
                        <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">Code</th>
                        <th className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">Error</th>
                        <th className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-[#7F7F7F] dark:text-white/40">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ERROR_CODES.map((err) => {
                        const codeColors: Record<number, string> = {
                          400: 'text-amber-500',
                          401: 'text-orange-500',
                          403: 'text-red-500',
                          404: 'text-gray-500',
                          429: 'text-purple-500',
                          500: 'text-red-600',
                        }
                        return (
                          <tr key={err.code} className="border-b border-gray-100 dark:border-white/5 last:border-0">
                            <td className="px-6 py-4">
                              <span className={`text-lg font-black font-mono ${codeColors[err.code] || 'text-gray-500'}`}>
                                {err.code}
                              </span>
                            </td>
                            <td className="px-4 py-4 font-semibold text-black dark:text-white">
                              {err.title}
                            </td>
                            <td className="px-4 py-4 text-[#7F7F7F] dark:text-white/50 font-medium max-w-lg">
                              {err.description}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Example error response */}
            <FadeInWhenVisible delay={0.2}>
              <div className="mt-8">
                <h3 className="text-base font-bold text-black dark:text-white mb-4">
                  Example Error Response
                </h3>
                <TerminalCodeBlock
                  code={`{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid API key provided",
    "type": "authentication_error"
  }
}`}
                  language="JSON"
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ─── CTA Section ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#1A0A2E] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D72444]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <Code2 className="w-4 h-4 text-[#FF8340]" />
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  Developer Ready
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to integrate?
                <br />
                <span className="bg-gradient-to-r from-[#FF8340] to-[#D72444] bg-clip-text text-transparent">
                  Start building today
                </span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                Get your API key and start sending SMS in minutes. Our comprehensive
                documentation and code samples make integration a breeze.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://my.sdasms.com"
                  className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
                >
                  <Key className="w-5 h-5" />
                  Get API Key
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
                >
                  Contact Support
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
