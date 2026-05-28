import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Chat | SDASMS',
  description: 'Live chat software by SDASMS. Real-time conversations with your congregation. Integrate chat widgets, automate responses, and provide instant support.',
  keywords: ['live chat', 'church chat', 'real-time messaging', 'chat widget', 'live support Africa'],
  openGraph: {
    title: 'Live Chat | SDASMS',
    description: 'Live chat software by SDASMS. Real-time conversations with your congregation. Integrate chat widgets, automate responses, and provide instant support.',
    url: 'https://sdasms.com/products/live-chat',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Live Chat | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Chat | SDASMS',
    description: 'Live chat software by SDASMS. Real-time conversations with your congregation. Integrate chat widgets, automate responses, and provide instant support.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/live-chat',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
