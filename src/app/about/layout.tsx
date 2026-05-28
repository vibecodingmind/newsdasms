import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About SDASMS | Africa's Leading Digital Evangelism Platform",
  description: "Learn about SDASMS, Africa's leading digital evangelism and SMS messaging platform. Discover our mission to empower churches and ministries with reliable communication tools across the continent.",
  keywords: ['SDASMS', 'about SDASMS', 'digital evangelism platform', 'church communication', 'SMS Africa', 'ministry messaging'],
  openGraph: {
    title: "About SDASMS | Africa's Leading Digital Evangelism Platform",
    description: "Learn about SDASMS, Africa's leading digital evangelism and SMS messaging platform. Discover our mission to empower churches and ministries with reliable communication tools across the continent.",
    url: 'https://sdasms.com/about',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "About SDASMS | Africa's Leading Digital Evangelism Platform",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About SDASMS | Africa's Leading Digital Evangelism Platform",
    description: "Learn about SDASMS, Africa's leading digital evangelism and SMS messaging platform. Discover our mission to empower churches and ministries with reliable communication tools across the continent.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/about',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
