import 'server-only'
import { NextRequest } from 'next/server'
import { successResponse, errorResponse, SDASMS_API_TOKEN } from '@/lib/sdasms-api'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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

    // Validate terms acceptance
    if (termsAccepted !== 'true') {
      return errorResponse('You must accept the Terms & Conditions to proceed')
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
          country: getTextField(formData, 'country'),
        }
      : {
          accountType: 'Organization',
          organization: getTextField(formData, 'orgName'),
          orgEmail: getTextField(formData, 'orgEmail'),
          orgPhone: getTextField(formData, 'orgPhone'),
          orgAddress: getTextField(formData, 'orgAddress') || 'N/A',
          orgCity: getTextField(formData, 'orgCity') || 'N/A',
          orgRegion: getTextField(formData, 'orgRegion') || 'N/A',
          orgCountry: getTextField(formData, 'orgCountry'),
          orgWebsite: getTextField(formData, 'orgWebsite') || 'N/A',
          representative: getTextField(formData, 'repName'),
          repEmail: getTextField(formData, 'repEmail'),
          repPhone: getTextField(formData, 'repPhone'),
          repIdType: getTextField(formData, 'repIdType'),
          repIdNumber: getTextField(formData, 'repIdNumber'),
          repDesignation: getTextField(formData, 'repDesignation') || 'N/A',
          orgType: getTextField(formData, 'orgType'),
          orgTypeOther: getTextField(formData, 'orgTypeOther') || 'N/A',
          uploadedFiles: fileInfo,
          savedFilePaths: savedFiles,
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
Country: ${getTextField(formData, 'country')}

Package: Starter - Tsh 94,500
          `.trim()
          : `
New Organization Account Registration:

Organization: ${getTextField(formData, 'orgName')}
Org Email: ${getTextField(formData, 'orgEmail')}
Org Phone: ${getTextField(formData, 'orgPhone')}
Address: ${getTextField(formData, 'orgAddress') || 'N/A'}, ${getTextField(formData, 'orgCity') || 'N/A'}, ${getTextField(formData, 'orgRegion') || 'N/A'}
Country: ${getTextField(formData, 'orgCountry')}
Website: ${getTextField(formData, 'orgWebsite') || 'N/A'}

Authorized Representative: ${getTextField(formData, 'repName')}
Rep Email: ${getTextField(formData, 'repEmail')}
Rep Phone: ${getTextField(formData, 'repPhone')}
ID Type: ${getTextField(formData, 'repIdType')} - ${getTextField(formData, 'repIdNumber')}
Designation: ${getTextField(formData, 'repDesignation') || 'N/A'}

Organization Type: ${getTextField(formData, 'orgType')}${getTextField(formData, 'orgTypeOther') ? ` (${getTextField(formData, 'orgTypeOther')})` : ''}

Uploaded Documents:
- ID Copy: ${fileInfo.repIdCopy || 'N/A'} → ${savedFiles.repIdCopy || 'not saved'}
- Legal Docs: ${fileInfo.legalDocs || 'N/A'}
- Request & Authorization Letter: ${fileInfo.authLetter || 'N/A'} → ${savedFiles.authLetter || 'not saved'}

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
