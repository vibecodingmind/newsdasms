import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why SDASMS | Trusted by Ministries Across Africa',
  description: 'Discover why thousands of ministries trust SDASMS: lowest pricing, best coverage, 24/7 support, and user-friendly interface. 99.2% delivery rate across Africa.',
  keywords: ['why SDASMS', 'best SMS platform Africa', 'church SMS trusted', 'ministry communication tools', 'reliable SMS service'],
  openGraph: {
    title: 'Why SDASMS | Trusted by Ministries Across Africa',
    description: 'Discover why thousands of ministries trust SDASMS: lowest pricing, best coverage, 24/7 support, and user-friendly interface. 99.2% delivery rate across Africa.',
    url: 'https://sdasms.com/why-sdasms',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why SDASMS | Trusted by Ministries Across Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why SDASMS | Trusted by Ministries Across Africa',
    description: 'Discover why thousands of ministries trust SDASMS: lowest pricing, best coverage, 24/7 support, and user-friendly interface. 99.2% delivery rate across Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/why-sdasms',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
