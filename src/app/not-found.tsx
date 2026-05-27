'use client'

import Link from 'next/link'
import { ArrowRight, Home, Mail } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative bg-[#0B0518] overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D72444]/8 rounded-full blur-[150px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7C3AED]/8 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF8340]/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Number */}
            <div className="mb-8">
              <h1
                className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-black leading-none select-none"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #D72444 0%, #FF8340 50%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </h1>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Page Not Found
            </h2>

            {/* Fun message */}
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-3 font-medium">
              Looks like this page went on a mission trip! 🌍
            </p>

            {/* Subtitle */}
            <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto font-medium">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way back.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#D72444] hover:bg-[#E03355] text-white font-semibold rounded-full px-8 py-4 h-auto text-base shadow-lg shadow-[#D72444]/25 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Go Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto text-base font-semibold transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
