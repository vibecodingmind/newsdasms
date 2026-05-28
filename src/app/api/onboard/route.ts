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

    // Validate required fields from Section A (Organization)
    const orgValidation = validateRequired(body, ['orgName', 'orgEmail', 'orgPhone'])
    if (!orgValidation.valid) {
      return errorResponse(`Missing required organization fields: ${orgValidation.missing.join(', ')}`)
    }

    // Validate required fields from Section B (Contact)
    const contactValidation = validateRequired(body, ['contactName', 'contactEmail', 'contactPhone', 'contactIdNumber'])
    if (!contactValidation.valid) {
      return errorResponse(`Missing required contact fields: ${contactValidation.missing.join(', ')}`)
    }

    // Validate sector
    if (!body.sector || (body.sector !== 'Private' && body.sector !== 'Government')) {
      return errorResponse('Please select a valid sector (Private or Government)')
    }

    // Validate sender IDs - at least one required
    const senderIds: string[] = body.senderIds || []
    const validSenderIds = senderIds.filter((id: string) => id && id.trim().length > 0)
    if (validSenderIds.length === 0) {
      return errorResponse('At least one Sender ID is required')
    }

    // Validate terms acceptance
    if (!body.termsAccepted) {
      return errorResponse('You must accept the Terms & Conditions to proceed')
    }

    // Log the registration submission
    console.log('[onboard] New registration submitted:', {
      organization: body.orgName,
      email: body.orgEmail,
      phone: body.orgPhone,
      contact: body.contactName,
      sector: body.sector,
      senderIds: validSenderIds,
      industries: body.industries,
      package: body.packageChoice,
      submittedAt: new Date().toISOString(),
    })

    // In production, this would send an email to hello@sdasms.com
    // and/or store in the database. For now, we log and return success.
    try {
      // Attempt to send notification email via z-ai-web-dev-sdk if available
      const { default: sdk } = await import('z-ai-web-dev-sdk')
      if (sdk?.sendEmail) {
        await sdk.sendEmail({
          to: 'hello@sdasms.com',
          subject: `New SDASMS Registration: ${body.orgName}`,
          body: `
New registration submitted:

Organization: ${body.orgName}
Email: ${body.orgEmail}
Phone: ${body.orgPhone}

Contact Person: ${body.contactName}
Contact Email: ${body.contactEmail}
Contact Phone: ${body.contactPhone}
ID Type: ${body.contactIdType}
ID Number: ${body.contactIdNumber}

Sector: ${body.sector}
Industries: ${body.industries?.join(', ')}
Other Industry: ${body.otherIndustry || 'N/A'}

Sender IDs: ${validSenderIds.join(', ')}
Sample Messages: ${body.sampleMessages?.filter((m: string) => m?.trim()).join(' | ') || 'N/A'}

Package: ${body.packageChoice}

Signatory: ${body.signatory || 'N/A'}
Name: ${body.signatoryName || 'N/A'}
Designation: ${body.designation || 'N/A'}
Date: ${body.signDate || 'N/A'}
          `.trim(),
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
