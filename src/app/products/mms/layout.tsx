import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MMS Messaging | SDASMS',
  description: 'MMS messaging service by SDASMS. Send images, audio, and video content via multimedia messages. Perfect for visual ministry outreach across Africa.',
  keywords: ['MMS messaging', 'multimedia SMS', 'image messaging', 'video SMS', 'MMS Africa'],
  openGraph: {
    title: 'MMS Messaging | SDASMS',
    description: 'MMS messaging service by SDASMS. Send images, audio, and video content via multimedia messages. Perfect for visual ministry outreach across Africa.',
    url: 'https://sdasms.com/products/mms',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MMS Messaging | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MMS Messaging | SDASMS',
    description: 'MMS messaging service by SDASMS. Send images, audio, and video content via multimedia messages. Perfect for visual ministry outreach across Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/mms',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
