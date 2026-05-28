import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: 'Stripe is not configured. Please use manual payment.' },
        { status: 503 }
      )
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' })
    const body = await request.json()
    const { amount, currency = 'TZS' } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'SDASMS Starter Pack',
              description: 'Complete onboarding package: Sender ID Registration, Account Setup, Dashboard Access, API Credentials, Contact List Upload (up to 10K), Priority Support',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sdasms.com'}/get-started?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sdasms.com'}/get-started?payment=cancelled`,
      metadata: {
        product: 'sdasms_starter_pack',
        amount: String(amount),
        currency,
        email_to: 'hello@sdasms.com',
      },
    })

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('[stripe] Error creating checkout session:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create payment session. Please try manual payment.' },
      { status: 500 }
    )
  }
}
