import { NextRequest, NextResponse } from 'next/server'
import { Client, Environment } from 'square'

const squareClient = new Client({
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    const { service, price, firstName, lastName, email, phone, date, time, notes } = await req.json()

    // Derive the base URL
    const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || ''
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || origin).replace(/\/$/, '')

    // Create a checkout link using Square's Payment Link API
    const paymentLink = await squareClient.checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
      idempotencyKey: `${email}-${Date.now()}`,
      checkout: {
        lineItems: [
          {
            quantity: '1',
            name: service,
            description: `Session with Star Monreal — ${date} at ${time}`,
            basePriceMoney: {
              amount: BigInt(Math.round(price * 100)),
              currency: 'USD',
            },
          },
        ],
        additionalRecipients: [],
        redirectUrl: `${baseUrl}/success`,
        orderReference: `session-${Date.now()}`,
      },
    })

    return NextResponse.json({ url: paymentLink.result?.checkout?.checkoutPageUrl })
  } catch (err: unknown) {
    console.error('Square error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
