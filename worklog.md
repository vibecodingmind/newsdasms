---
Task ID: 1
Agent: Main Agent
Task: Fix light mode header text visibility + dark mode mega menu text visibility + make onboard form fields required + remove Stripe/PesaPal

Work Log:
- Diagnosed light mode header issue: on homepage, header had transparent background but text was dark (text-gray-900), making it invisible against the always-dark hero section (bg-[#0B0518])
- Fixed header background logic: changed from `scrolled || !isHome` to `isTransparent` (which is only true in dark mode on homepage when not scrolled), ensuring solid white header in light mode
- Updated text colors from text-gray-900 to text-gray-800 for better visibility
- Fixed ThemeToggle placeholder from `text-white/70` to `text-gray-700 dark:text-white/70` for light mode visibility
- Improved mega menu text contrast in both modes: section headers from text-gray-500/white-70 to text-gray-700/white-90, descriptions from text-gray-500/white-70 to text-gray-700/white-85
- Added `required` attribute to all select elements (country, ID type) and orgTypeOther input in onboard form
- Removed unused Stripe and PesaPal API route directories
- Cleaned up isManualPayment variable (no longer needed since all payments are manual)
- Verified build succeeds

Stage Summary:
- Light mode header: Now always has solid white/95 background with blur when not in dark transparent mode, text is clearly visible
- Dark mode mega menu: All text now uses white/85-90 opacity instead of white/70, much more readable
- Onboard form: All fields now have `required` attribute, validation enforces all fields
- Payment: Only Bank Transfer + M-PESA remain, no online payment options
- Removed: /api/stripe/checkout, /api/pesapal/checkout, /api/payment/stripe, /api/payment/pesapal
