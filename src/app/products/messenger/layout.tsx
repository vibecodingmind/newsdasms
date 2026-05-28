import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messenger API | SDASMS',
  description: 'Facebook Messenger API integration by SDASMS. Automate conversations, send broadcasts, and engage your community through Messenger at scale.',
  keywords: ['Messenger API', 'Facebook Messenger', 'Messenger automation', 'church Messenger', 'Messenger Africa'],
  openGraph: {
    title: 'Messenger API | SDASMS',
    description: 'Facebook Messenger API integration by SDASMS. Automate conversations, send broadcasts, and engage your community through Messenger at scale.',
    url: 'https://sdasms.com/products/messenger',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Messenger API | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Messenger API | SDASMS',
    description: 'Facebook Messenger API integration by SDASMS. Automate conversations, send broadcasts, and engage your community through Messenger at scale.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/messenger',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
