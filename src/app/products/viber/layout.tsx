import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viber for Business | SDASMS',
  description: 'Viber for Business integration by SDASMS. Connect with your congregation on Viber. Send messages, automate responses, and engage communities at scale.',
  keywords: ['Viber for Business', 'Viber messaging', 'Viber API', 'Viber Africa', 'church Viber'],
  openGraph: {
    title: 'Viber for Business | SDASMS',
    description: 'Viber for Business integration by SDASMS. Connect with your congregation on Viber. Send messages, automate responses, and engage communities at scale.',
    url: 'https://sdasms.com/products/viber',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Viber for Business | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viber for Business | SDASMS',
    description: 'Viber for Business integration by SDASMS. Connect with your congregation on Viber. Send messages, automate responses, and engage communities at scale.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/viber',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
