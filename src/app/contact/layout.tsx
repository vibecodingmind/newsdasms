import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | SDASMS Support',
  description: 'Contact SDASMS support team. Get help with SMS messaging, account setup, pricing questions, and technical support. Available 24/7 for churches and ministries in Africa.',
  keywords: ['SDASMS contact', 'SMS support', 'church messaging help', 'Africa SMS support', 'contact SDASMS'],
  openGraph: {
    title: 'Contact Us | SDASMS Support',
    description: 'Contact SDASMS support team. Get help with SMS messaging, account setup, pricing questions, and technical support. Available 24/7 for churches and ministries in Africa.',
    url: 'https://sdasms.com/contact',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Us | SDASMS Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | SDASMS Support',
    description: 'Contact SDASMS support team. Get help with SMS messaging, account setup, pricing questions, and technical support. Available 24/7 for churches and ministries in Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
