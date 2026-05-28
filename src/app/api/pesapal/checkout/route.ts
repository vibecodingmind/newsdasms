import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

const PESAPAL_API_BASE = 'https://pay.pesapal.com/v3'

async function getPesapalToken(): Promise<string | null> {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET

  if (!consumerKey || !consumerSecret) return null

  try {
    const res = await fetch(`${PESAPAL_API_BASE}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ consumer_key: consumerKey, consumer_secret: consumerSecret }),
    })

    const data = await res.json()
    return data.token || null
  } catch (error) {
    console.error('[pesapal] Token error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  const token = await getPesapalToken()

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'PesaPal is not configured. Please try another payment method.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json().catch(() => ({}))
    const accountType = body.accountType || 'personal'
    const origin = request.headers.get('origin') || 'https://sdasms.com'

    // Register IPN URL first
    const ipnRes = await fetch(`${PESAPAL_API_BASE}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: `${origin}/api/pesapal/ipn`,
        ipn_notification_type: 'GET',
      }),
    })

    const ipnData = await ipnRes.json()
    const ipnId = ipnData?.ipn_id || ''

    // Submit order to PesaPal
    const orderRes = await fetch(`${PESAPAL_API_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: `SDASMS-${Date.now()}`,
        currency: 'TZS',
        amount: 94500,
        description: `SDASMS Starter Pack — ${accountType === 'organization' ? 'Organization' : 'Personal'} Account`,
        callback_url: `${origin}/get-started?payment=success`,
        notification_id: ipnId,
        billing_address: {
          email_address: '',
          phone_number: '',
          country_code: 'TZ',
          first_name: 'SDASMS',
          last_name: accountType === 'organization' ? 'Organization' : 'Personal',
        },
      }),
    })

    const orderData = await orderRes.json()

    if (orderData.redirect_url) {
      return NextResponse.json({ success: true, url: orderData.redirect_url })
    }

    return NextResponse.json(
      { success: false, message: orderData?.error?.message || 'Failed to create PesaPal order' },
      { status: 500 }
    )
  } catch (error: unknown) {
    console.error('[pesapal/checkout] Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create PesaPal checkout'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}
