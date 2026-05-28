import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice Broadcasting | SDASMS',
  description: 'Voice broadcasting service by SDASMS. Send voice messages to thousands across Africa. Perfect for church announcements, prayer lines, and emergency alerts.',
  keywords: ['voice broadcasting', 'voice SMS', 'voice messages Africa', 'church voice messages', 'voice API'],
  openGraph: {
    title: 'Voice Broadcasting | SDASMS',
    description: 'Voice broadcasting service by SDASMS. Send voice messages to thousands across Africa. Perfect for church announcements, prayer lines, and emergency alerts.',
    url: 'https://sdasms.com/products/voice',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voice Broadcasting | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice Broadcasting | SDASMS',
    description: 'Voice broadcasting service by SDASMS. Send voice messages to thousands across Africa. Perfect for church announcements, prayer lines, and emergency alerts.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/voice',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
