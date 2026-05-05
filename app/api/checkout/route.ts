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

    // Create a payment link using Square's Payment Link API
    const paymentLink = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `${email}-${Date.now()}`,
      quickPay: {
        name: `${service} - $${price.toFixed(2)}`,
        priceMoney: {
          amount: BigInt(Math.round(price * 100)),
          currency: 'USD',
        },
        locationId: process.env.SQUARE_LOCATION_ID!,
      },
    })

    const checkoutUrl = paymentLink.result?.paymentLink?.url

    if (!checkoutUrl) {
      throw new Error('Failed to generate payment link')
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (err: unknown) {
    console.error('Square error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
