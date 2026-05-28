import 'server-only'
import { NextRequest } from 'next/server'
import { successResponse, errorResponse, SDASMS_API_TOKEN } from '@/lib/sdasms-api'
import nodemailer from 'nodemailer'

// Pricing constants
const PRICING = {
  personal: { amount: 99500, display: '99,500 TZS', label: 'Personal Starter Pack' },
  organization: { amount: 249500, display: '249,500 TZS', label: 'Business Starter Pack' },
} as const

// Create email transporter
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })
}

// Build HTML email for admin notification
function buildAdminEmail(data: Record<string, string>, accountType: string, paymentLabel: string, paymentConfirmed: boolean, pricing: typeof PRICING.personal): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([key, value]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; white-space: nowrap;">${key}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value}</td>
      </tr>`)
    .join('')

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      <div style="background: linear-gradient(135deg, #D72444, #7C3AED); padding: 24px 32px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">New ${accountType} Registration</h1>
        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">SDASMS Digital Evangelism Platform</p>
      </div>
      <div style="padding: 24px 32px;">
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px;">A new registration has been submitted:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <thead>
            <tr>
              <th style="padding: 8px 12px; text-align: left; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Field</th>
              <th style="padding: 8px 12px; text-align: left; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Value</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px;">
          <h3 style="margin: 0 0 8px; color: #166534; font-size: 15px;">Payment Details</h3>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Package:</strong> ${pricing.label} - ${pricing.display}</p>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Method:</strong> ${paymentLabel}</p>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Confirmed:</strong> ${paymentConfirmed ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Submitted at ${new Date().toISOString()} | SDASMS Onboard System</p>
      </div>
    </div>
  `
}

// Build HTML email for user confirmation
function buildUserEmail(subjectName: string, accountType: string, paymentLabel: string, pricing: typeof PRICING.personal): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      <div style="background: linear-gradient(135deg, #D72444, #7C3AED); padding: 32px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">Thank You for Registering!</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">Your submission is under review</p>
      </div>
      <div style="padding: 28px 32px;">
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.6;">Dear <strong>${subjectName}</strong>,</p>
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.6;">Thank you for registering with SDASMS — Africa's leading Digital Evangelism Messaging Platform!</p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin: 0 0 12px; color: #374151; font-size: 15px;">Your Registration Summary</h3>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Account Type:</strong> ${accountType}</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Package:</strong> ${pricing.label}</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Amount:</strong> ${pricing.display}</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Payment Method:</strong> ${paymentLabel}</p>
        </div>
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px; color: #9a3412; font-size: 14px;">What Happens Next</h4>
          <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px; line-height: 1.8;">
            <li>Our team will review your registration and payment</li>
            <li>We will verify your payment with our financial records</li>
            <li>Once approved, you will receive login credentials via email</li>
            <li>Account activation typically takes <strong>24-48 hours</strong></li>
          </ol>
        </div>
        <p style="margin: 16px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Questions? Reach us at <a href="mailto:hello@sdasms.com" style="color: #D72444;">hello@sdasms.com</a> or call <strong>+255 658 600 302</strong>.</p>
      </div>
      <div style="background: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
        <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">SDASMS Africa — Spreading the Gospel, One Message at a Time</p>
        <p style="margin: 0; color: #9ca3af; font-size: 11px;">PAPU Tower 6th Floor, Moshi Rd, Arusha, Tanzania</p>
      </div>
    </div>
  `
}

export async function POST(request: NextRequest) {
  if (!SDASMS_API_TOKEN) {
    return errorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    const body = await request.json()

    const accountType = body.accountType
    if (!accountType || (accountType !== 'personal' && accountType !== 'organization')) {
      return errorResponse('Please select a valid account type.')
    }

    const isOrg = accountType === 'organization'

    // Validate required fields
    if (isOrg) {
      if (!body.orgName || !body.orgEmail || !body.orgPhone || !body.orgAddress || !body.orgCity || !body.orgRegion || !body.orgCountry) {
        return errorResponse('Please fill in all organization details.')
      }
      if (!body.repName || !body.repEmail || !body.repPhone || !body.repIdNumber || !body.repDesignation || !body.orgType) {
        return errorResponse('Please fill in all representative details.')
      }
    } else {
      if (!body.fullName || !body.email || !body.phone || !body.address || !body.city || !body.region || !body.country) {
        return errorResponse('Please fill in all personal details.')
      }
      if (!body.repIdNumber) {
        return errorResponse('Please provide your ID number.')
      }
    }

    if (!body.paymentMethod) {
      return errorResponse('Please select a payment method.')
    }
    if (!body.paymentConfirmed) {
      return errorResponse('Please confirm your payment.')
    }
    if (!body.termsAccepted) {
      return errorResponse('Please accept the Terms & Conditions.')
    }

    // Payment label
    const paymentLabels: Record<string, string> = {
      mpesa: 'M-PESA (Lipa Number: 51720044)',
      bank: 'Bank Transfer — Equity Bank Tanzania, Acc: SDASMS MARKETING AGENCY, 3002211802039',
    }
    const paymentLabel = paymentLabels[body.paymentMethod] || body.paymentMethod
    const pricing = isOrg ? PRICING.organization : PRICING.personal

    // Build email fields
    const emailFields = isOrg
      ? {
          'Account Type': 'Organization',
          'Organization': body.orgName,
          'Org Email': body.orgEmail,
          'Org Phone': body.orgPhone,
          'Address': body.orgAddress,
          'City': body.orgCity,
          'Region': body.orgRegion,
          'Country': body.orgCountry,
          'Website': body.orgWebsite,
          'Representative': body.repName,
          'Rep Email': body.repEmail,
          'Rep Phone': body.repPhone,
          'ID Type': body.repIdType,
          'ID Number': body.repIdNumber,
          'Designation': body.repDesignation,
          'Org Type': body.orgType === 'other' ? body.orgTypeOther : body.orgType,
        }
      : {
          'Account Type': 'Personal',
          'Full Name': body.fullName,
          'Email': body.email,
          'Phone': body.phone,
          'Address': body.address,
          'City': body.city,
          'Region': body.region,
          'Country': body.country,
          'ID Type': body.repIdType,
          'ID Number': body.repIdNumber,
        }

    const subjectName = isOrg ? body.orgName : body.fullName

    console.log('[onboard] New registration:', { accountType, subjectName, payment: paymentLabel })

    // Send emails
    let emailSent = false
    const transporter = createTransporter()

    if (transporter) {
      try {
        // Admin email
        await transporter.sendMail({
          from: `"SDASMS Onboard" <${process.env.SMTP_USER}>`,
          to: 'hello@sdasms.com',
          subject: `New SDASMS ${isOrg ? 'Organization' : 'Personal'} Registration: ${subjectName}`,
          html: buildAdminEmail(emailFields, isOrg ? 'Organization' : 'Personal', paymentLabel, body.paymentConfirmed, pricing),
        })
        emailSent = true
        console.log('[onboard] Admin email sent')
      } catch (err) {
        console.error('[onboard] Admin email failed:', err)
      }

      // User confirmation email
      try {
        const userEmail = isOrg ? (body.repEmail || body.orgEmail) : body.email
        if (userEmail) {
          await transporter.sendMail({
            from: `"SDASMS" <${process.env.SMTP_USER}>`,
            to: userEmail,
            subject: 'SDASMS Registration Received — We Will Review Your Details & Get In Touch',
            html: buildUserEmail(subjectName, isOrg ? 'Organization' : 'Personal', paymentLabel, pricing),
          })
          console.log('[onboard] User confirmation email sent to:', userEmail)
        }
      } catch (err) {
        console.error('[onboard] User email failed:', err)
      }
    } else {
      console.log('[onboard] SMTP not configured — email skipped')
    }

    return successResponse({
      message: 'Your registration has been received. We will review your details and get in touch with you shortly.',
      emailSent,
    })
  } catch {
    return errorResponse('Invalid request. Please check your submission and try again.', 400)
  }
}
