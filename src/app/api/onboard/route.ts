import 'server-only'
import { NextRequest } from 'next/server'
import { successResponse, errorResponse, SDASMS_API_TOKEN } from '@/lib/sdasms-api'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import nodemailer from 'nodemailer'

// Helper to get a text field from FormData
function getTextField(formData: FormData, key: string): string {
  return (formData.get(key) as string) || ''
}

// Save uploaded file to disk and return the stored path
async function saveUploadedFile(file: File, prefix: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'uploads', 'onboard')
  await mkdir(uploadDir, { recursive: true })

  // Generate unique filename
  const ext = path.extname(file.name) || '.pdf'
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 30)
  const filename = `${prefix}_${timestamp}_${safeName}`
  const filepath = path.join(uploadDir, filename)

  await writeFile(filepath, buffer)
  return filepath
}

// Create email transporter using environment variables
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
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

// Build HTML email body for registration
function buildEmailHtml(data: {
  accountType: string
  fields: Record<string, string>
  paymentMethod: string
  paymentLabel: string
  paymentConfirmed: boolean
  fileInfo?: Record<string, string>
}): string {
  const { accountType, fields, paymentMethod, paymentLabel, paymentConfirmed, fileInfo } = data

  const rows = Object.entries(fields)
    .map(([key, value]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; white-space: nowrap;">${key}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value || 'N/A'}</td>
      </tr>`)
    .join('')

  const fileInfoRows = fileInfo
    ? Object.entries(fileInfo)
        .map(([key, value]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; white-space: nowrap;">${key}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value}</td>
          </tr>`)
        .join('')
    : ''

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #D72444, #7C3AED); padding: 24px 32px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">New ${accountType} Registration</h1>
        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">SDASMS Digital Evangelism Platform</p>
      </div>

      <!-- Body -->
      <div style="padding: 24px 32px;">
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px;">A new registration has been submitted. Details below:</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <thead>
            <tr>
              <th style="padding: 8px 12px; text-align: left; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Field</th>
              <th style="padding: 8px 12px; text-align: left; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Value</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        ${fileInfoRows ? `
        <h3 style="color: #374151; font-size: 16px; margin: 24px 0 12px;">Uploaded Documents</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tbody>
            ${fileInfoRows}
          </tbody>
        </table>
        ` : ''}

        <!-- Payment Info -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <h3 style="margin: 0 0 8px; color: #166534; font-size: 15px;">Payment Details</h3>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Package:</strong> Starter Pack - 94,500 TZS</p>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Method:</strong> ${paymentLabel}</p>
          <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Confirmed:</strong> ${paymentConfirmed ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Submitted at ${new Date().toISOString()} | SDASMS Onboard System</p>
      </div>
    </div>
  `
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
      const country = getTextField(formData, 'country')
      if (!fullName || !email || !phone || !country) {
        return errorResponse('Missing required fields: fullName, email, phone, country')
      }
    } else {
      // Organization account
      const orgName = getTextField(formData, 'orgName')
      const orgEmail = getTextField(formData, 'orgEmail')
      const orgPhone = getTextField(formData, 'orgPhone')
      const orgCountry = getTextField(formData, 'orgCountry')
      if (!orgName || !orgEmail || !orgPhone || !orgCountry) {
        return errorResponse('Missing organization fields: orgName, orgEmail, orgPhone, orgCountry')
      }

      // Validate representative details for organization
      const repName = getTextField(formData, 'repName')
      const repEmail = getTextField(formData, 'repEmail')
      const repPhone = getTextField(formData, 'repPhone')
      const repIdNumber = getTextField(formData, 'repIdNumber')
      if (!repName || !repEmail || !repPhone || !repIdNumber) {
        return errorResponse('Missing representative fields: repName, repEmail, repPhone, repIdNumber')
      }

      // Validate org type
      const orgType = getTextField(formData, 'orgType')
      if (!orgType) {
        return errorResponse('Please select an organization type')
      }

      // Validate file uploads for organization
      const repIdCopy = formData.get('repIdCopy')
      const legalDocsEntries = formData.getAll('legalDocs')
      const authLetter = formData.get('authLetter')
      if (!repIdCopy || !(repIdCopy instanceof File)) {
        return errorResponse('Representative ID copy is required')
      }
      if (legalDocsEntries.length === 0 || !legalDocsEntries.some((f) => f instanceof File)) {
        return errorResponse('At least one legal document is required')
      }
      if (!authLetter || !(authLetter instanceof File)) {
        return errorResponse('Request & authorization letter is required')
      }
    }

    // Extract payment fields
    const paymentMethod = getTextField(formData, 'paymentMethod')
    const paymentConfirmed = getTextField(formData, 'paymentConfirmed')

    // Payment method label map (manual only — no Stripe/PesaPal)
    const paymentLabels: Record<string, string> = {
      mpesa: 'M-PESA (Lipa Number: 51720044)',
      bank: 'Bank Transfer — Equity Bank Tanzania, Acc: SDASMS MARKETING AGENCY, 3002211802039',
    }
    const paymentLabel = paymentLabels[paymentMethod] || paymentMethod

    // Validate terms acceptance
    if (termsAccepted !== 'true') {
      return errorResponse('You must accept the Terms & Conditions to proceed')
    }

    // Validate payment selection
    if (!paymentMethod) {
      return errorResponse('Please select a payment method')
    }
    // Manual payments require confirmation
    if (paymentConfirmed !== 'true') {
      return errorResponse('Please confirm your payment to proceed')
    }

    // Save uploaded files to disk (organization only)
    const savedFiles: Record<string, string> = {}
    const fileInfo: Record<string, string> = {}

    if (accountType === 'organization') {
      const orgName = getTextField(formData, 'orgName').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)

      try {
        const repIdCopy = formData.get('repIdCopy')
        if (repIdCopy instanceof File) {
          savedFiles.repIdCopy = await saveUploadedFile(repIdCopy, `${orgName}_idcopy`)
          fileInfo.repIdCopy = `${repIdCopy.name} (${(repIdCopy.size / 1024).toFixed(1)}KB)`
        }

        // Handle multiple legal documents
        const legalDocsEntries = formData.getAll('legalDocs')
        const legalDocInfos: string[] = []
        for (let i = 0; i < legalDocsEntries.length; i++) {
          const doc = legalDocsEntries[i]
          if (doc instanceof File) {
            const key = `legalDoc_${i}`
            savedFiles[key] = await saveUploadedFile(doc, `${orgName}_legaldoc_${i}`)
            legalDocInfos.push(`${doc.name} (${(doc.size / 1024).toFixed(1)}KB)`)
          }
        }
        if (legalDocInfos.length > 0) {
          fileInfo.legalDocs = legalDocInfos.join(', ')
        }

        const authLetter = formData.get('authLetter')
        if (authLetter instanceof File) {
          savedFiles.authLetter = await saveUploadedFile(authLetter, `${orgName}_authletter`)
          fileInfo.authLetter = `${authLetter.name} (${(authLetter.size / 1024).toFixed(1)}KB)`
        }
      } catch (fileErr) {
        console.error('[onboard] Error saving files:', fileErr)
        // Continue even if file saving fails - files are logged but not blocking
      }
    }

    // Build registration fields for email
    const emailFields = accountType === 'personal'
      ? {
          'Account Type': 'Personal',
          'Full Name': getTextField(formData, 'fullName'),
          'Email': getTextField(formData, 'email'),
          'Phone': getTextField(formData, 'phone'),
          'Address': getTextField(formData, 'address'),
          'City': getTextField(formData, 'city'),
          'Region': getTextField(formData, 'region'),
          'Country': getTextField(formData, 'country'),
          'ID Type': getTextField(formData, 'repIdType'),
          'ID Number': getTextField(formData, 'repIdNumber'),
        }
      : {
          'Account Type': 'Organization',
          'Organization': getTextField(formData, 'orgName'),
          'Org Email': getTextField(formData, 'orgEmail'),
          'Org Phone': getTextField(formData, 'orgPhone'),
          'Address': getTextField(formData, 'orgAddress'),
          'City': getTextField(formData, 'orgCity'),
          'Region': getTextField(formData, 'orgRegion'),
          'Country': getTextField(formData, 'orgCountry'),
          'Website': getTextField(formData, 'orgWebsite'),
          'Representative': getTextField(formData, 'repName'),
          'Rep Email': getTextField(formData, 'repEmail'),
          'Rep Phone': getTextField(formData, 'repPhone'),
          'ID Type': getTextField(formData, 'repIdType'),
          'ID Number': getTextField(formData, 'repIdNumber'),
          'Designation': getTextField(formData, 'repDesignation'),
          'Org Type': getTextField(formData, 'orgType'),
          'Org Type (Other)': getTextField(formData, 'orgTypeOther'),
        }

    const subjectName = accountType === 'personal'
      ? getTextField(formData, 'fullName')
      : getTextField(formData, 'orgName')

    // Log the registration submission
    console.log('[onboard] New registration submitted:', {
      accountType,
      subjectName,
      package: 'Starter - Tsh 94,500',
      paymentMethod: paymentLabel,
      paymentConfirmed: paymentConfirmed === 'true',
      submittedAt: new Date().toISOString(),
    })

    // Send notification email to hello@sdasms.com
    let emailSent = false
    const transporter = createTransporter()

    if (transporter) {
      try {
        const htmlBody = buildEmailHtml({
          accountType: accountType === 'personal' ? 'Personal' : 'Organization',
          fields: emailFields,
          paymentMethod,
          paymentLabel,
          paymentConfirmed: paymentConfirmed === 'true',
          fileInfo: accountType === 'organization' ? fileInfo : undefined,
        })

        // Attach uploaded files for organization registrations
        const attachments: nodemailer.SendMailOptions['attachments'] = []
        if (accountType === 'organization') {
          for (const [key, filepath] of Object.entries(savedFiles)) {
            attachments.push({
              filename: path.basename(filepath),
              path: filepath,
            })
          }
        } else {
          // Personal account: attach ID copy if saved
          if (savedFiles.repIdCopy) {
            attachments.push({
              filename: path.basename(savedFiles.repIdCopy),
              path: savedFiles.repIdCopy,
            })
          }
        }

        // Save personal ID copy too
        if (accountType === 'personal') {
          const repIdCopy = formData.get('repIdCopy')
          if (repIdCopy instanceof File) {
            const userName = getTextField(formData, 'fullName').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)
            savedFiles.repIdCopy = await saveUploadedFile(repIdCopy, `${userName}_idcopy`)
            fileInfo.repIdCopy = `${repIdCopy.name} (${(repIdCopy.size / 1024).toFixed(1)}KB)`
            attachments.push({
              filename: path.basename(savedFiles.repIdCopy),
              path: savedFiles.repIdCopy,
            })
          }
        }

        await transporter.sendMail({
          from: `"SDASMS Onboard" <${process.env.SMTP_USER}>`,
          to: 'hello@sdasms.com',
          subject: `New SDASMS ${accountType === 'personal' ? 'Personal' : 'Organization'} Registration: ${subjectName}`,
          html: htmlBody,
          attachments,
        })

        emailSent = true
        console.log('[onboard] Email notification sent to hello@sdasms.com')
      } catch (emailErr) {
        console.error('[onboard] Failed to send email notification:', emailErr)
      }
    } else {
      console.log('[onboard] Email skipped — SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local')
    }

    return successResponse({
      message: 'Registration submitted successfully',
      emailSent,
    })
  } catch {
    return errorResponse('Invalid request. Please check your submission and try again.', 400)
  }
}
