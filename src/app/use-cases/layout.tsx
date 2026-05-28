import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases | How Ministries Use SDASMS',
  description: 'Discover how churches and ministries use SDASMS for announcements, devotionals, event promotion, fundraising, member follow-ups, and emergency alerts across Africa.',
  keywords: ['church SMS use cases', 'ministry messaging', 'church announcements SMS', 'devotional SMS', 'church event promotion', 'fundraising SMS'],
  openGraph: {
    title: 'Use Cases | How Ministries Use SDASMS',
    description: 'Discover how churches and ministries use SDASMS for announcements, devotionals, event promotion, fundraising, member follow-ups, and emergency alerts across Africa.',
    url: 'https://sdasms.com/use-cases',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Use Cases | How Ministries Use SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Use Cases | How Ministries Use SDASMS',
    description: 'Discover how churches and ministries use SDASMS for announcements, devotionals, event promotion, fundraising, member follow-ups, and emergency alerts across Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/use-cases',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
