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
  title: "SDASMS – Digital Evangelism Messaging Platform",
  description:
    "Spreading the Gospel, One Message at a Time. Transform Digital Evangelism with Every Message Sent. Inspire, Uplift, and Share the Gospel Instantly.",
  keywords: [
    "SDASMS",
    "SMS",
    "bulk messaging",
    "evangelism",
    "church",
    "ministry",
    "Africa",
    "digital evangelism",
    "gospel",
  ],
  authors: [{ name: "SDASMS Africa" }],
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
      "Spreading the Gospel, One Message at a Time. Transform Digital Evangelism with Every Message Sent.",
    siteName: "SDASMS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDASMS – Digital Evangelism Messaging Platform",
    description:
      "Spreading the Gospel, One Message at a Time. Transform Digital Evangelism with Every Message Sent.",
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
              "sameAs": []
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
