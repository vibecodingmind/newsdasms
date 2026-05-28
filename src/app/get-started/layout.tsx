import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started | Create Your SDASMS Account',
  description: 'Create your free SDASMS account and start sending bulk SMS messages in minutes. Easy sign-up, instant access to SMS, WhatsApp, voice, and email messaging tools.',
  keywords: ['SDASMS sign up', 'create SMS account', 'get started SMS', 'church messaging account', 'free SMS account'],
  openGraph: {
    title: 'Get Started | Create Your SDASMS Account',
    description: 'Create your free SDASMS account and start sending bulk SMS messages in minutes. Easy sign-up, instant access to SMS, WhatsApp, voice, and email messaging tools.',
    url: 'https://sdasms.com/get-started',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Get Started | Create Your SDASMS Account',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started | Create Your SDASMS Account',
    description: 'Create your free SDASMS account and start sending bulk SMS messages in minutes. Easy sign-up, instant access to SMS, WhatsApp, voice, and email messaging tools.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/get-started',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
