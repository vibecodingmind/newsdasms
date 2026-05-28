import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation | SDASMS Developer Hub',
  description: 'SDASMS REST API documentation. Integrate SMS, WhatsApp, voice, and email messaging into your applications. SDKs, webhooks, and comprehensive developer resources.',
  keywords: ['SMS API', 'SDASMS API', 'bulk SMS API', 'messaging API documentation', 'developer hub', 'WhatsApp API', 'SMS integration'],
  openGraph: {
    title: 'API Documentation | SDASMS Developer Hub',
    description: 'SDASMS REST API documentation. Integrate SMS, WhatsApp, voice, and email messaging into your applications. SDKs, webhooks, and comprehensive developer resources.',
    url: 'https://sdasms.com/api-docs',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Documentation | SDASMS Developer Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation | SDASMS Developer Hub',
    description: 'SDASMS REST API documentation. Integrate SMS, WhatsApp, voice, and email messaging into your applications. SDKs, webhooks, and comprehensive developer resources.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/api-docs',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
