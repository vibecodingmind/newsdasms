import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SMS API | Bulk SMS Messaging - SDASMS',
  description: 'Send bulk SMS messages with SDASMS. Reliable SMS API with 99.2% delivery rate across Africa. Custom sender IDs, scheduling, and real-time delivery reports.',
  keywords: ['bulk SMS', 'SMS API', 'mass messaging', 'SMS gateway Africa', 'church SMS', 'sender ID'],
  openGraph: {
    title: 'SMS API | Bulk SMS Messaging - SDASMS',
    description: 'Send bulk SMS messages with SDASMS. Reliable SMS API with 99.2% delivery rate across Africa. Custom sender IDs, scheduling, and real-time delivery reports.',
    url: 'https://sdasms.com/products/sms',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SMS API | Bulk SMS Messaging - SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMS API | Bulk SMS Messaging - SDASMS',
    description: 'Send bulk SMS messages with SDASMS. Reliable SMS API with 99.2% delivery rate across Africa. Custom sender IDs, scheduling, and real-time delivery reports.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/sms',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
