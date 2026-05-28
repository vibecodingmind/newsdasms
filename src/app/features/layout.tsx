import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features | SDASMS Omnichannel Messaging Platform',
  description: 'Explore SDASMS features: bulk SMS, WhatsApp Business API, voice broadcasting, email marketing, message scheduling, automation, analytics, and two-way messaging for churches and ministries.',
  keywords: ['SDASMS features', 'bulk SMS features', 'WhatsApp Business API', 'voice broadcasting', 'message scheduling', 'SMS automation', 'church messaging features'],
  openGraph: {
    title: 'Features | SDASMS Omnichannel Messaging Platform',
    description: 'Explore SDASMS features: bulk SMS, WhatsApp Business API, voice broadcasting, email marketing, message scheduling, automation, analytics, and two-way messaging for churches and ministries.',
    url: 'https://sdasms.com/features',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Features | SDASMS Omnichannel Messaging Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features | SDASMS Omnichannel Messaging Platform',
    description: 'Explore SDASMS features: bulk SMS, WhatsApp Business API, voice broadcasting, email marketing, message scheduling, automation, analytics, and two-way messaging for churches and ministries.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/features',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
