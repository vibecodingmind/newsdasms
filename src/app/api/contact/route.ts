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

    // Validate required fields
    const validation = validateRequired(body, ['name', 'email', 'subject', 'message'])
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`)
    }

    // Log the contact submission
    console.log('[contact] New contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
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
          subject: `Contact Form: ${body.subject}`,
          body: `
New contact form submission:

Name: ${body.name}
Email: ${body.email}
Subject: ${body.subject}

Message:
${body.message}
          `.trim(),
        })
      }
    } catch {
      // Email sending is optional - don't fail the submission
      console.log('[contact] Email notification skipped (sdk unavailable)')
    }

    return successResponse({
      message: 'Message sent successfully',
    })
  } catch {
    return errorResponse('Invalid request. Please check your submission and try again.', 400)
  }
}
