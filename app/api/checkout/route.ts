import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  try {
    const { service, price, firstName, lastName, email, phone, date, time, notes } = await req.json()

    // Derive the base URL: env var takes priority, then infer from the incoming request
    const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || ''
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || origin).replace(/\/$/, '')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service,
              description: `Session with Star Monreal — ${date} at ${time}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book`,
      metadata: {
        service,
        firstName,
        lastName,
        email,
        phone: phone || '',
        date,
        time,
        notes: notes || '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
