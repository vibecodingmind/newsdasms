import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coverage | SDASMS SMS Coverage Across Africa',
  description: 'SDASMS provides direct network connections across Africa including Kenya, Nigeria, Tanzania, Uganda, Ghana, South Africa. 99.2% delivery rate with local network partnerships.',
  keywords: ['SMS coverage Africa', 'SMS Kenya', 'SMS Nigeria', 'SMS Tanzania', 'SMS Uganda', 'SMS Ghana', 'bulk SMS Africa', 'network coverage'],
  openGraph: {
    title: 'Coverage | SDASMS SMS Coverage Across Africa',
    description: 'SDASMS provides direct network connections across Africa including Kenya, Nigeria, Tanzania, Uganda, Ghana, South Africa. 99.2% delivery rate with local network partnerships.',
    url: 'https://sdasms.com/coverage',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coverage | SDASMS SMS Coverage Across Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coverage | SDASMS SMS Coverage Across Africa',
    description: 'SDASMS provides direct network connections across Africa including Kenya, Nigeria, Tanzania, Uganda, Ghana, South Africa. 99.2% delivery rate with local network partnerships.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/coverage',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
