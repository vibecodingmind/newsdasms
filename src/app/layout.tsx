import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/CookieConsent";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sdasms.com'),
  title: "SDASMS – Digital Evangelism Messaging Platform",
  description:
    "SDASMS is Africa's leading digital evangelism and SMS messaging platform. Send bulk SMS, WhatsApp, voice, and email campaigns to reach your congregation instantly. 99.2% delivery rate across Africa.",
  keywords: [
    "SDASMS",
    "SMS",
    "bulk SMS",
    "bulk messaging",
    "evangelism",
    "digital evangelism",
    "church communication",
    "ministry messaging",
    "Africa",
    "Tanzania",
    "Kenya",
    "Nigeria",
    "Ghana",
    "Uganda",
    "South Africa",
    "church SMS",
    "gospel messaging",
    "digital ministry",
    "SMS API",
    "WhatsApp Business API",
    "voice broadcasting",
    "email marketing",
    "church announcements",
    "religious messaging",
    "pastor tools",
  ],
  authors: [{ name: "SDASMS Africa" }],
  alternates: {
    canonical: 'https://sdasms.com',
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "SDASMS – Digital Evangelism Messaging Platform",
    description:
      "Africa's leading SMS messaging platform for churches and ministries. Send bulk SMS, WhatsApp, voice, and email campaigns with 99.2% delivery rate.",
    url: 'https://sdasms.com',
    siteName: "SDASMS",
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SDASMS – Digital Evangelism Messaging Platform',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDASMS – Digital Evangelism Messaging Platform",
    description:
      "Africa's leading SMS messaging platform for churches and ministries. 99.2% delivery rate across Africa.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                var t = localStorage.getItem('sdasms-theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
                } catch(e){}
              })();
              // Suppress Next.js 16 Turbopack "true" console noise
              (function(){
                var _origLog = console.log;
                var _origWarn = console.warn;
                var _origError = console.error;
                function suppressTrue(){
                  for(var i=0;i<arguments.length;i++){if(arguments[i]===true)return true;}
                  return false;
                }
                console.log = function(){
                  if(suppressTrue.apply(null,arguments))return;
                  return _origLog.apply(console, arguments);
                };
                console.warn = function(){
                  if(suppressTrue.apply(null,arguments))return;
                  return _origWarn.apply(console, arguments);
                };
                console.error = function(){
                  if(suppressTrue.apply(null,arguments))return;
                  return _origError.apply(console, arguments);
                };
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SDASMS",
              "description": "Digital Evangelism Messaging Platform - Spreading the Gospel, One Message at a Time",
              "url": "https://sdasms.com",
              "logo": "https://sdasms.com/sdasms-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+255658600302",
                "email": "hello@sdasms.com",
                "contactType": "customer service",
                "areaServed": "AF",
                "availableLanguage": ["English", "Swahili"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Arusha",
                "addressRegion": "Arusha",
                "postalCode": "10636",
                "streetAddress": "PAPU Tower 6th Floor, Moshi Rd",
                "addressCountry": "TZ"
              },
              "sameAs": [
                "https://www.facebook.com/sdasmsafrica",
                "https://twitter.com/sdasmsafrica",
                "https://www.instagram.com/sdasms/",
                "https://www.linkedin.com/company/sdasmsafrica",
                "https://pinterest.com/sdasmsafrica"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SDASMS",
              "url": "https://sdasms.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://sdasms.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SDASMS",
              "applicationCategory": "CommunicationApplication",
              "operatingSystem": "Web",
              "description": "Africa's leading digital evangelism and SMS messaging platform for churches and ministries.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.94",
                "ratingCount": "996"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is bulk SMS and how does it work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bulk SMS is a service that allows you to send large volumes of text messages to multiple recipients simultaneously. It works through an SMS gateway that connects your application to mobile networks, ensuring fast and reliable delivery to your audience."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How reliable is SDASMS for message delivery?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SDASMS provides industry-leading delivery rates of 99.2%. We have direct connections to local networks across Africa, ensuring your messages reach their destination quickly and reliably without intermediary delays."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the pricing options available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SDASMS offers flexible pricing models including Pay-As-You-Go for occasional senders and volume-based discounts for organizations with larger messaging needs. There are no hidden fees and you only pay for what you use."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I schedule messages for later delivery?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! SDASMS supports message scheduling, allowing you to compose messages now and send them at the optimal time. This is perfect for time-sensitive announcements, event reminders, and coordinated campaigns."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there an API available for integration?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. SDASMS provides a robust REST API with comprehensive documentation, SDKs for popular programming languages, and webhook support. You can integrate SMS capabilities into your existing applications in minutes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which African countries does SDASMS cover?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SDASMS covers all major African regions including Kenya, Nigeria, South Africa, Uganda, Ghana, Tanzania, and many more. Our direct network connections ensure reliable delivery across the continent."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I get started with SDASMS?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Getting started is simple: create a free account, add credits or choose a pricing plan, import your contacts, and start sending messages immediately. Our intuitive dashboard makes the entire process straightforward."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my data secure with SDASMS?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, SDASMS takes data security seriously. We use end-to-end encryption, comply with data protection regulations, and never share your contact lists with third parties. Your data remains yours at all times."
                  }
                }
              ]
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              try {
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/67726ec3af5bfec1dbe484a7/1igbg1bae';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              if(s0&&s0.parentNode){s0.parentNode.insertBefore(s1,s0);}
              else{document.head.appendChild(s1);}
              } catch(e){console.warn('Tawk.to load skipped:',e);}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#D72444] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-xl"
        >
          Skip to main content
        </a>
        <Preloader />
        <div id="main-content">
          {children}
        </div>
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
