import 'server-only'
import { NextRequest } from 'next/server'
import { successResponse, errorResponse, SDASMS_API_TOKEN } from '@/lib/sdasms-api'

// Helper to get a text field from FormData
function getTextField(formData: FormData, key: string): string {
  return (formData.get(key) as string) || ''
}

export async function POST(request: NextRequest) {
  // 503 guard if API token is missing
  if (!SDASMS_API_TOKEN) {
    return errorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    const formData = await request.formData()

    // Extract text fields
    const accountType = getTextField(formData, 'accountType')
    const termsAccepted = getTextField(formData, 'termsAccepted')

    // Validate account type
    if (!accountType || (accountType !== 'personal' && accountType !== 'organization')) {
      return errorResponse('Please select a valid account type (Personal or Organization)')
    }

    // Validate based on account type
    if (accountType === 'personal') {
      const fullName = getTextField(formData, 'fullName')
      const email = getTextField(formData, 'email')
      const phone = getTextField(formData, 'phone')
      if (!fullName || !email || !phone) {
        return errorResponse('Missing required fields: fullName, email, phone')
      }
    } else {
      // Organization account
      const orgName = getTextField(formData, 'orgName')
      const orgEmail = getTextField(formData, 'orgEmail')
      const orgPhone = getTextField(formData, 'orgPhone')
      if (!orgName || !orgEmail || !orgPhone) {
        return errorResponse('Missing organization fields: orgName, orgEmail, orgPhone')
      }

      // Validate representative details for organization
      const repName = getTextField(formData, 'repName')
      const repEmail = getTextField(formData, 'repEmail')
      const repPhone = getTextField(formData, 'repPhone')
      const repIdNumber = getTextField(formData, 'repIdNumber')
      if (!repName || !repEmail || !repPhone || !repIdNumber) {
        return errorResponse('Missing representative fields: repName, repEmail, repPhone, repIdNumber')
      }

      // Validate sector for organization
      const sector = getTextField(formData, 'sector')
      if (!sector || (sector !== 'Private' && sector !== 'Government')) {
        return errorResponse('Please select a valid sector (Private or Government)')
      }

      // Validate file uploads for organization
      const repIdCopy = formData.get('repIdCopy')
      const orgRegDoc = formData.get('orgRegDoc')
      const authLetter = formData.get('authLetter')
      if (!repIdCopy || !(repIdCopy instanceof File)) {
        return errorResponse('Representative ID copy is required')
      }
      if (!orgRegDoc || !(orgRegDoc instanceof File)) {
        return errorResponse('Organization registration document is required')
      }
      if (!authLetter || !(authLetter instanceof File)) {
        return errorResponse('Authorization letter is required')
      }
    }

    // Validate terms acceptance
    if (termsAccepted !== 'true') {
      return errorResponse('You must accept the Terms & Conditions to proceed')
    }

    // Build file info for logging
    const fileInfo: Record<string, string> = {}
    if (accountType === 'organization') {
      const repIdCopy = formData.get('repIdCopy')
      const orgRegDoc = formData.get('orgRegDoc')
      const authLetter = formData.get('authLetter')
      if (repIdCopy instanceof File) fileInfo.repIdCopy = `${repIdCopy.name} (${(repIdCopy.size / 1024).toFixed(1)}KB)`
      if (orgRegDoc instanceof File) fileInfo.orgRegDoc = `${orgRegDoc.name} (${(orgRegDoc.size / 1024).toFixed(1)}KB)`
      if (authLetter instanceof File) fileInfo.authLetter = `${authLetter.name} (${(authLetter.size / 1024).toFixed(1)}KB)`
    }

    // Build registration summary
    const registrationSummary = accountType === 'personal'
      ? {
          accountType: 'Personal',
          name: getTextField(formData, 'fullName'),
          email: getTextField(formData, 'email'),
          phone: getTextField(formData, 'phone'),
          address: getTextField(formData, 'address') || 'N/A',
          city: getTextField(formData, 'city') || 'N/A',
          region: getTextField(formData, 'region') || 'N/A',
        }
      : {
          accountType: 'Organization',
          organization: getTextField(formData, 'orgName'),
          orgEmail: getTextField(formData, 'orgEmail'),
          orgPhone: getTextField(formData, 'orgPhone'),
          orgAddress: getTextField(formData, 'orgAddress') || 'N/A',
          orgCity: getTextField(formData, 'orgCity') || 'N/A',
          orgRegion: getTextField(formData, 'orgRegion') || 'N/A',
          orgWebsite: getTextField(formData, 'orgWebsite') || 'N/A',
          representative: getTextField(formData, 'repName'),
          repEmail: getTextField(formData, 'repEmail'),
          repPhone: getTextField(formData, 'repPhone'),
          repIdType: getTextField(formData, 'repIdType'),
          repIdNumber: getTextField(formData, 'repIdNumber'),
          repDesignation: getTextField(formData, 'repDesignation') || 'N/A',
          sector: getTextField(formData, 'sector'),
          industries: (() => { try { return JSON.parse(getTextField(formData, 'industries')) } catch { return [] } })(),
          otherIndustry: getTextField(formData, 'otherIndustry') || 'N/A',
          uploadedFiles: fileInfo,
        }

    // Log the registration submission
    console.log('[onboard] New registration submitted:', {
      ...registrationSummary,
      package: 'Starter - Tsh 94,500',
      submittedAt: new Date().toISOString(),
    })

    // Attempt to send notification email
    try {
      const { default: sdk } = await import('z-ai-web-dev-sdk')
      if (sdk?.sendEmail) {
        const emailBody = accountType === 'personal'
          ? `
New Personal Account Registration:

Name: ${getTextField(formData, 'fullName')}
Email: ${getTextField(formData, 'email')}
Phone: ${getTextField(formData, 'phone')}
Address: ${getTextField(formData, 'address') || 'N/A'}
City: ${getTextField(formData, 'city') || 'N/A'}, Region: ${getTextField(formData, 'region') || 'N/A'}

Package: Starter - Tsh 94,500
          `.trim()
          : `
New Organization Account Registration:

Organization: ${getTextField(formData, 'orgName')}
Org Email: ${getTextField(formData, 'orgEmail')}
Org Phone: ${getTextField(formData, 'orgPhone')}
Address: ${getTextField(formData, 'orgAddress') || 'N/A'}, ${getTextField(formData, 'orgCity') || 'N/A'}, ${getTextField(formData, 'orgRegion') || 'N/A'}
Website: ${getTextField(formData, 'orgWebsite') || 'N/A'}

Authorized Representative: ${getTextField(formData, 'repName')}
Rep Email: ${getTextField(formData, 'repEmail')}
Rep Phone: ${getTextField(formData, 'repPhone')}
ID Type: ${getTextField(formData, 'repIdType')} - ${getTextField(formData, 'repIdNumber')}
Designation: ${getTextField(formData, 'repDesignation') || 'N/A'}

Sector: ${getTextField(formData, 'sector')}
Industries: ${(() => { try { return JSON.parse(getTextField(formData, 'industries')).join(', ') } catch { return 'N/A' } })()}
Other Industry: ${getTextField(formData, 'otherIndustry') || 'N/A'}

Uploaded Documents:
- ID Copy: ${fileInfo.repIdCopy || 'N/A'}
- Registration Doc: ${fileInfo.orgRegDoc || 'N/A'}
- Authorization Letter: ${fileInfo.authLetter || 'N/A'}

Package: Starter - Tsh 94,500
          `.trim()

        await sdk.sendEmail({
          to: 'hello@sdasms.com',
          subject: `New SDASMS ${accountType === 'personal' ? 'Personal' : 'Organization'} Registration: ${accountType === 'personal' ? getTextField(formData, 'fullName') : getTextField(formData, 'orgName')}`,
          body: emailBody,
        })
      }
    } catch {
      // Email sending is optional - don't fail the registration
      console.log('[onboard] Email notification skipped (sdk unavailable)')
    }

    return successResponse({
      message: 'Registration submitted successfully',
    })
  } catch {
    return errorResponse('Invalid request. Please check your submission and try again.', 400)
  }
}
