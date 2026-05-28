import Link from 'next/link'

const FOOTER_LINKS_COL1 = ['Home', 'About', 'Why SDASMS', 'Contact']
const FOOTER_LINKS_COL2 = ['My Account', 'Get Started', 'Coverage', 'Features', 'Pricing', 'API Docs']

const FOOTER_PRODUCTS = [
  { label: 'SMS', href: '/products/sms' },
  { label: 'RCS', href: '/products/rcs' },
  { label: 'Email', href: '/products/email' },
  { label: 'MMS', href: '/products/mms' },
  { label: 'Voice', href: '/products/voice' },
  { label: 'Live Chat', href: '/products/live-chat' },
]

const FOOTER_LINKS_COL3 = [
  { label: 'Privacy Policy', href: '/policies/privacy-policy' },
  { label: 'Refund Policy', href: '/policies/refund-policy' },
  { label: 'Cookies Policy', href: '/policies/cookies-policy' },
  { label: 'Terms of Service', href: '/policies/terms-of-service' },
]

export default function Footer() {
  return (
    <footer aria-label="Footer navigation" className="bg-black dark:bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              {/* Colored logo for light mode */}
              <img
                src="/logo-colored.svg"
                alt="SDASMS Logo"
                className="h-12 w-auto block dark:hidden"
              />
              {/* Inverted logo for dark mode */}
              <img
                src="/sdasms-logo.png"
                alt="SDASMS Logo"
                className="h-12 w-auto brightness-0 invert hidden dark:block"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Discover the transformative power of seamless evangelism, where
              the integration of technology meets effective communication to
              create a profound spiritual impact.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/sdasmsafrica" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#D72444]/30 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="https://twitter.com/sdasmsafrica" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#D72444]/30 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="https://www.instagram.com/sdasms/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#D72444]/30 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/sdasmsafrica" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#D72444]/30 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://pinterest.com/sdasmsafrica" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#D72444]/30 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS_COL1.map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : link === 'About' ? '/about' : link === 'Why SDASMS' ? '/why-sdasms' : link === 'Contact' ? '/contact' : '#'}
                    className="text-gray-400 text-sm hover:text-[#FF8340] transition-colors font-medium block py-1.5"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {FOOTER_PRODUCTS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#FF8340] transition-colors font-medium block py-1.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS_COL2.map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Coverage' ? '/coverage' : link === 'Features' ? '/features' : link === 'Pricing' ? '/pricing' : link === 'API Docs' ? '/api-docs' : link === 'Get Started' ? '/get-started' : link === 'My Account' ? 'https://my.sdasms.com/login' : '#'}
                    className="text-gray-400 text-sm hover:text-[#FF8340] transition-colors font-medium block py-1.5"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Policies column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Our Policies</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS_COL3.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#FF8340] transition-colors font-medium block py-1.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-medium">
            2015&ndash;{new Date().getFullYear()} &copy; SDASMS Africa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
