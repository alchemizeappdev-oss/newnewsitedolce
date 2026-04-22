# Dolce Vida — Next.js

Built with Next.js 14, TypeScript, Tailwind CSS, Stripe.

## Project structure

```
app/
  page.tsx          → Homepage
  services/page.tsx → Services page
  book/page.tsx     → Booking flow
  success/page.tsx  → Post-payment confirmation
  api/checkout/route.ts → Stripe checkout session
public/images/      → Brand images
```

## Deploy to Vercel (3 steps)

### Option A — GitHub (recommended)

1. Push this folder to a GitHub repo
2. Go to vercel.com/new → Import repo
3. Set environment variables (see below)
4. Click Deploy

### Option B — Vercel CLI

```bash
cd nextjs
npm install
npm install -g vercel
vercel login
vercel --prod
```

## Environment variables

Copy `.env.local.example` → `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | dashboard.stripe.com → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page |
| `NEXT_PUBLIC_BASE_URL` | Your domain e.g. `https://dolcevida.pink` |
| `RESEND_API_KEY` | resend.com (for Inner Circle emails) |

Set these same variables in Vercel → Project Settings → Environment Variables.

## Connect your domain

1. Vercel → Project → Settings → Domains
2. Add `dolcevida.pink`
3. Update your DNS nameservers to point to Vercel

## Stripe setup

1. Go to dashboard.stripe.com
2. Create an account / log in
3. Copy your **live** secret key and publishable key
4. Add them to Vercel environment variables
5. Payments will flow to your Stripe account automatically

## Images

To swap in new brand images, replace files in `public/images/`:
- `hero-tarot.png` — hero background
- `about-portal.png` — about section
- `book-cover.png` — Life After Death book cover

## Local development

```bash
npm install
cp .env.local.example .env.local
# fill in your keys
npm run dev
# → http://localhost:3000
```
