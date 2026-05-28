import 'server-only'
import { NextRequest } from 'next/server'
import { successResponse, errorResponse, SDASMS_API_TOKEN, validateRequired } from '@/lib/sdasms-api'

export async function POST(request: NextRequest) {
  // 503 guard if API token is missing
  if (!SDASMS_API_TOKEN) {
    return errorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    const body = await request.json()

    // Validate account type
    if (!body.accountType || (body.accountType !== 'personal' && body.accountType !== 'organization')) {
      return errorResponse('Please select a valid account type (Personal or Organization)')
    }

    // Validate based on account type
    if (body.accountType === 'personal') {
      const personalValidation = validateRequired(body, ['fullName', 'email', 'phone'])
      if (!personalValidation.valid) {
        return errorResponse(`Missing required fields: ${personalValidation.missing.join(', ')}`)
      }
    } else {
      // Organization account
      const orgValidation = validateRequired(body, ['orgName', 'orgEmail', 'orgPhone'])
      if (!orgValidation.valid) {
        return errorResponse(`Missing organization fields: ${orgValidation.missing.join(', ')}`)
      }

      // Validate representative details for organization
      const repValidation = validateRequired(body, ['repName', 'repEmail', 'repPhone', 'repIdNumber'])
      if (!repValidation.valid) {
        return errorResponse(`Missing representative fields: ${repValidation.missing.join(', ')}`)
      }

      // Validate sector for organization
      if (!body.sector || (body.sector !== 'Private' && body.sector !== 'Government')) {
        return errorResponse('Please select a valid sector (Private or Government)')
      }
    }

    // Validate sender IDs - at least one required for both account types
    const senderIds: string[] = body.senderIds || []
    const validSenderIds = senderIds.filter((id: string) => id && id.trim().length > 0)
    if (validSenderIds.length === 0) {
      return errorResponse('At least one Sender ID is required')
    }

    // Validate terms acceptance
    if (!body.termsAccepted) {
      return errorResponse('You must accept the Terms & Conditions to proceed')
    }

    // Build registration summary
    const registrationSummary = body.accountType === 'personal'
      ? {
          accountType: 'Personal',
          name: body.fullName,
          email: body.email,
          phone: body.phone,
          address: body.address || 'N/A',
          city: body.city || 'N/A',
          region: body.region || 'N/A',
          senderIds: validSenderIds,
          sampleMessages: body.sampleMessages?.filter((m: string) => m?.trim()) || [],
        }
      : {
          accountType: 'Organization',
          organization: body.orgName,
          orgEmail: body.orgEmail,
          orgPhone: body.orgPhone,
          orgAddress: body.orgAddress || 'N/A',
          orgCity: body.orgCity || 'N/A',
          orgRegion: body.orgRegion || 'N/A',
          orgWebsite: body.orgWebsite || 'N/A',
          representative: body.repName,
          repEmail: body.repEmail,
          repPhone: body.repPhone,
          repIdType: body.repIdType,
          repIdNumber: body.repIdNumber,
          repDesignation: body.repDesignation || 'N/A',
          sector: body.sector,
          industries: body.industries || [],
          otherIndustry: body.otherIndustry || 'N/A',
          senderIds: validSenderIds,
          sampleMessages: body.sampleMessages?.filter((m: string) => m?.trim()) || [],
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
        const emailBody = body.accountType === 'personal'
          ? `
New Personal Account Registration:

Name: ${body.fullName}
Email: ${body.email}
Phone: ${body.phone}
Address: ${body.address || 'N/A'}
City: ${body.city || 'N/A'}, Region: ${body.region || 'N/A'}

Sender IDs: ${validSenderIds.join(', ')}
Sample Messages: ${body.sampleMessages?.filter((m: string) => m?.trim()).join(' | ') || 'N/A'}

Package: Starter - Tsh 94,500
          `.trim()
          : `
New Organization Account Registration:

Organization: ${body.orgName}
Org Email: ${body.orgEmail}
Org Phone: ${body.orgPhone}
Address: ${body.orgAddress || 'N/A'}, ${body.orgCity || 'N/A'}, ${body.orgRegion || 'N/A'}
Website: ${body.orgWebsite || 'N/A'}

Authorized Representative: ${body.repName}
Rep Email: ${body.repEmail}
Rep Phone: ${body.repPhone}
ID Type: ${body.repIdType} - ${body.repIdNumber}
Designation: ${body.repDesignation || 'N/A'}

Sector: ${body.sector}
Industries: ${body.industries?.join(', ')}
Other Industry: ${body.otherIndustry || 'N/A'}

Sender IDs: ${validSenderIds.join(', ')}
Sample Messages: ${body.sampleMessages?.filter((m: string) => m?.trim()).join(' | ') || 'N/A'}

Package: Starter - Tsh 94,500
          `.trim()

        await sdk.sendEmail({
          to: 'hello@sdasms.com',
          subject: `New SDASMS ${body.accountType === 'personal' ? 'Personal' : 'Organization'} Registration: ${body.accountType === 'personal' ? body.fullName : body.orgName}`,
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
