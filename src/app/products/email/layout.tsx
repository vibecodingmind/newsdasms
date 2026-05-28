import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Marketing | SDASMS',
  description: 'Email marketing platform by SDASMS. Send newsletters, devotionals, and church updates with beautiful templates and real-time analytics across Africa.',
  keywords: ['email marketing', 'church email', 'newsletter Africa', 'devotional email', 'email campaigns'],
  openGraph: {
    title: 'Email Marketing | SDASMS',
    description: 'Email marketing platform by SDASMS. Send newsletters, devotionals, and church updates with beautiful templates and real-time analytics across Africa.',
    url: 'https://sdasms.com/products/email',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Email Marketing | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Marketing | SDASMS',
    description: 'Email marketing platform by SDASMS. Send newsletters, devotionals, and church updates with beautiful templates and real-time analytics across Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/email',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
