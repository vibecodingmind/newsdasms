import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram DM API | SDASMS',
  description: 'Instagram DM API integration by SDASMS. Automate Instagram direct messages, manage conversations, and connect with your community through Instagram.',
  keywords: ['Instagram API', 'Instagram DM', 'Instagram messaging', 'Instagram automation', 'church Instagram'],
  openGraph: {
    title: 'Instagram DM API | SDASMS',
    description: 'Instagram DM API integration by SDASMS. Automate Instagram direct messages, manage conversations, and connect with your community through Instagram.',
    url: 'https://sdasms.com/products/instagram',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Instagram DM API | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram DM API | SDASMS',
    description: 'Instagram DM API integration by SDASMS. Automate Instagram direct messages, manage conversations, and connect with your community through Instagram.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/instagram',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
