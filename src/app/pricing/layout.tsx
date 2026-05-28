import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Affordable SMS Plans - SDASMS',
  description: 'Affordable bulk SMS pricing with SDASMS. Pay-As-You-Go and volume-based plans starting from low rates. No hidden fees, transparent pricing for churches and ministries in Africa.',
  keywords: ['SMS pricing', 'bulk SMS cost', 'affordable SMS Africa', 'church SMS pricing', 'SMS plans', 'Pay-As-You-Go SMS'],
  openGraph: {
    title: 'Pricing | Affordable SMS Plans - SDASMS',
    description: 'Affordable bulk SMS pricing with SDASMS. Pay-As-You-Go and volume-based plans starting from low rates. No hidden fees, transparent pricing for churches and ministries in Africa.',
    url: 'https://sdasms.com/pricing',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pricing | Affordable SMS Plans - SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Affordable SMS Plans - SDASMS',
    description: 'Affordable bulk SMS pricing with SDASMS. Pay-As-You-Go and volume-based plans starting from low rates. No hidden fees, transparent pricing for churches and ministries in Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/pricing',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
