import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCS Messaging | SDASMS',
  description: 'RCS messaging by SDASMS. Rich Communication Services for interactive messaging with images, buttons, and carousels. Next-generation church communication.',
  keywords: ['RCS messaging', 'rich communication', 'RCS Africa', 'interactive messaging', 'RCS business'],
  openGraph: {
    title: 'RCS Messaging | SDASMS',
    description: 'RCS messaging by SDASMS. Rich Communication Services for interactive messaging with images, buttons, and carousels. Next-generation church communication.',
    url: 'https://sdasms.com/products/rcs',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RCS Messaging | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCS Messaging | SDASMS',
    description: 'RCS messaging by SDASMS. Rich Communication Services for interactive messaging with images, buttons, and carousels. Next-generation church communication.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/rcs',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
