import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WhatsApp Business API | SDASMS',
  description: 'Integrate WhatsApp Business API with SDASMS. Send messages at scale, automate conversations, and engage your congregation through WhatsApp across Africa.',
  keywords: ['WhatsApp Business API', 'WhatsApp messaging', 'church WhatsApp', 'WhatsApp automation', 'WhatsApp Africa'],
  openGraph: {
    title: 'WhatsApp Business API | SDASMS',
    description: 'Integrate WhatsApp Business API with SDASMS. Send messages at scale, automate conversations, and engage your congregation through WhatsApp across Africa.',
    url: 'https://sdasms.com/products/whatsapp',
    siteName: 'SDASMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WhatsApp Business API | SDASMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Business API | SDASMS',
    description: 'Integrate WhatsApp Business API with SDASMS. Send messages at scale, automate conversations, and engage your congregation through WhatsApp across Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sdasms.com/products/whatsapp',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
