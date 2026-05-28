import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      { success: false, message: 'Stripe is not configured. Please try another payment method.' },
      { status: 503 }
    )
  }

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-04-30.basil',
    })

    const body = await request.json().catch(() => ({}))
    const accountType = body.accountType || 'personal'

    // Create a Stripe Checkout Session for the SDASMS Starter Pack
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'tzs',
            product_data: {
              name: 'SDASMS Starter Pack',
              description: `Get started with SDASMS — ${accountType === 'organization' ? 'Organization' : 'Personal'} account setup, Sender ID registration, dashboard access, API credentials, and priority support.`,
            },
            unit_amount: 94500 * 100, // Stripe expects amount in smallest currency unit (cents). TZS is 2 decimals.
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'https://sdasms.com'}/get-started?payment=success`,
      cancel_url: `${request.headers.get('origin') || 'https://sdasms.com'}/get-started?payment=cancelled`,
      metadata: {
        accountType,
        package: 'starter',
      },
    })

    return NextResponse.json({ success: true, url: session.url })
  } catch (error: unknown) {
    console.error('[stripe/checkout] Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create checkout session'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}

// GET redirects to Stripe Checkout directly — for the link in the get-started page
export async function GET(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return NextResponse.redirect(
      new URL('/get-started?payment=error', request.url)
    )
  }

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-04-30.basil',
    })

    const origin = request.headers.get('origin') || new URL(request.url).origin

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'tzs',
            product_data: {
              name: 'SDASMS Starter Pack',
              description: 'Get started with SDASMS — account setup, Sender ID registration, dashboard access, API credentials, and priority support.',
            },
            unit_amount: 94500 * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/get-started?payment=success`,
      cancel_url: `${origin}/get-started?payment=cancelled`,
      metadata: {
        accountType: 'personal',
        package: 'starter',
      },
    })

    if (session.url) {
      return NextResponse.redirect(session.url)
    }

    return NextResponse.redirect(
      new URL('/get-started?payment=error', request.url)
    )
  } catch (error) {
    console.error('[stripe/checkout] GET Error:', error)
    return NextResponse.redirect(
      new URL('/get-started?payment=error', request.url)
    )
  }
}
