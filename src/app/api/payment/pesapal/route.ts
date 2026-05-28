import { NextRequest, NextResponse } from 'next/server'

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function POST(request: NextRequest) {
  try {
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        { success: false, message: 'PesaPal is not configured. Please use manual payment.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { amount, currency = 'TZS' } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Step 1: Get PesaPal access token
    const tokenResponse = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.token) {
      console.error('[pesapal] Token error:', tokenData)
      return NextResponse.json(
        { success: false, message: 'Failed to authenticate with PesaPal. Please try manual payment.' },
        { status: 502 }
      )
    }

    const token = tokenData.token

    // Step 2: Register IPN URL (if not already registered)
    // We use a simple notification endpoint
    const ipnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sdasms.com'}/api/payment/pesapal/ipn`

    let ipnId = ''
    try {
      const ipnResponse = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: ipnUrl,
          ipn_notification_type: 'GET',
        }),
      })
      const ipnData = await ipnResponse.json()
      ipnId = ipnData.ipn_id || ''
    } catch {
      // IPN registration may already exist, continue
    }

    // Step 3: Submit order to PesaPal
    const orderResponse = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: `SDASMS-${Date.now()}`,
        currency,
        amount: Number(amount),
        description: 'SDASMS Starter Pack - Digital Evangelism Platform',
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sdasms.com'}/get-started?payment=success`,
        notification_id: ipnId,
        billing_address: {
          email_address: 'hello@sdasms.com',
          phone_number: '',
          country_code: 'TZ',
          first_name: 'SDASMS',
          last_name: 'Payment',
        },
      }),
    })

    const orderData = await orderResponse.json()

    if (orderData.redirect_url) {
      return NextResponse.json({
        success: true,
        url: orderData.redirect_url,
        orderTrackingId: orderData.order_tracking_id,
      })
    }

    console.error('[pesapal] Order error:', orderData)
    return NextResponse.json(
      { success: false, message: 'Failed to create PesaPal order. Please try manual payment.' },
      { status: 502 }
    )
  } catch (error) {
    console.error('[pesapal] Error:', error)
    return NextResponse.json(
      { success: false, message: 'PesaPal service unavailable. Please try manual payment.' },
      { status: 500 }
    )
  }
}
