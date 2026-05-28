import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sdasms.com'
  
  const routes = [
    '', '/about', '/features', '/coverage', '/pricing', 
    '/get-started', '/use-cases', '/why-sdasms', '/contact', '/api-docs',
    '/products/sms', '/products/whatsapp', '/products/voice', '/products/email',
    '/products/mms', '/products/rcs', '/products/live-chat', 
    '/products/messenger', '/products/instagram', '/products/viber',
    '/policies/privacy-policy', '/policies/terms-of-service',
    '/policies/cookies-policy', '/policies/refund-policy',
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/get-started' ? 0.9 : route.startsWith('/products') ? 0.8 : 0.7,
  }))
}
