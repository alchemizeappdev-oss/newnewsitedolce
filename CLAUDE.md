# Dolce Vida — Project Memory

## Brand Identity
- **Brand:** Dolce Vida ("the sweet life")
- **Founder:** Star Monreal (Estrella) — Intuitive Medium, Author, Spiritual Guide
- **Co-practitioner:** JR — carries shaman/medicine man gifts through bloodline
- **Support:** Junior — bookings, client prep, session logistics
- **Location:** 351 S. Wells Ave, Suite 200, Reno, NV 89502
- **Phone:** 775-400-9649 / 775-772-3146
- **Email:** info@dolcevida.pink
- **Domain:** dolcevida.pink
- **Socials:** TikTok, Facebook, Instagram (URLs TBD)
- **Amazon book link:** https://www.amazon.com/dp/B0DFZZ3X5R

## Color Palette
```
--black: #080808 (dominant background)
--black2: #0e0e0e
--gold: #C9A84C
--gold-light: #E8C96A
--gold-dark: #8B6914
--crimson: #8B1A1A
--purple: #4A0E6B
--purple-bright: #7B2FBE
--cream: #F5EDD6
--cream-muted: #D4C4A0
```

## Typography
- **Headings:** Cinzel / Cinzel Decorative (Google Fonts)
- **Body:** Cormorant Garamond (Google Fonts)
- **Gold text:** animated metallic shimmer gradient (200% background-size, metalShimmer keyframe)

## Aesthetic
Dark luxury, cinematic, immersive. Tarot symbolism. Gold ornate frames. Velvet depth. Candlelight. NOT: Halloween, rainbow, crystal shop, cheesy.

## Brand Images (in assets/)
- `assets/hero-tarot.png` — Dolce Vida tarot card floating in golden storm clouds (HERO BACKGROUND)
- `assets/about-portal.png` — Star in black celestial gown opening ornate Dolce Vida door (ABOUT SECTION)
- `assets/book-cover.png` — Life After Death book cover with angel and roses
- Streamable `qpzawe` — video in about section portrait frame (Star's story)
- Streamable `z3w7cj` — video next to JR paragraph (portrait 9/16)

## Files Built
| File | Purpose |
|---|---|
| `Dolce Vida.html` | Main landing page (homepage) |
| `Dolce Vida Services.html` | Dedicated services page |
| `Dolce Vida Book.html` | Booking flow (HTML prototype) |
| `Dolce Vida Standalone.html` | Fully offline bundled version |
| `nextjs/` | Full Next.js 14 / TypeScript deploy-ready project |

## Next.js Project Structure (nextjs/)
```
app/page.tsx              ← Homepage
app/layout.tsx            ← Root layout + SEO metadata
app/globals.css           ← Fonts, Tailwind, brand CSS tokens
app/services/page.tsx     ← Services page with category filter
app/book/page.tsx         ← Full booking flow + Stripe integration
app/success/page.tsx      ← Post-payment confirmation
app/api/checkout/route.ts ← Stripe checkout session API
public/images/            ← hero-tarot.png, about-portal.png, book-cover.png
.env.local.example        ← Env vars template
```

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (installed, available)
- Stripe (checkout sessions via /api/checkout)
- Google Fonts: Cinzel, Cinzel Decorative, Cormorant Garamond

## Environment Variables Needed for Deploy
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_BASE_URL=https://dolcevida.pink
RESEND_API_KEY=re_...  (for Inner Circle email signups)
```

## Services & Pricing
### Readings
| Service | Duration | Price |
|---|---|---|
| 15-Minute Reading | 15 min | $45 |
| 30-Minute Reading | 30 min | $85 |
| 60-Minute Reading | 60 min | $150 |
| Couples Reading | 45 min | $120 |
| Pet Reading | 30 min | $65 |

### Rituals & Cleansing
| Service | Duration | Price |
|---|---|---|
| Fire Cleanse | 4 hrs | $1,200 |
| Business Energy Cleanse | 4 hrs | $2,000 |
| Tuning Fork Alignment | 55 min | $100 |
| Energy Egg Cleanse + Tuning Fork | 40 min | $148 |
| Hex Removal | 3 hrs | $1,500 |
| Home Cleanse | 4 hrs | $1,200 |
| Ritual Service | 1 hr | $1,500 |

### Counseling & Healing
| Service | Duration | Price |
|---|---|---|
| Spiritual Awakening Counseling | 1 hr | $200 |
| Past Life Regression + Tarot | 2 hrs | $400 |
| Past Life Regression | 1 hr 45 min | $350 |
| Hypnosis | 1 hr 30 min | $250 |
| 3-Pack Hypnosis Sessions | 3 sessions | $550 |
| Hypnosis 6-Pack Sessions | 6 sessions | $1,000 |
| Guided Meditations | 1 hr | $198 |

### Book
| Item | Price |
|---|---|
| Life After Death (Signed Copy) | $35 |

## Still To Connect
- Real social media URLs (TikTok, Instagram, Facebook)
- Stripe live keys (replace placeholders in .env.local)
- Resend/SendGrid for Inner Circle email signups
- Google Maps embed for contact section
- starjk.mov video if user wants to add as hero alternative
- Vercel deploy: push nextjs/ to GitHub → import at vercel.com/new

## Design Decisions
- Services removed from homepage — live on dedicated `/services` page
- Hero overlay fully opaque when no video; semi-transparent (0.55) with tarot image
- Gold text uses animated metalShimmer keyframe across ALL instances
- Particle canvas: 200 density, glow off (user-saved tweaks)
- Book cover: real image with drop shadow glow, links to Amazon
- About section: two-column (image/video + text) for both Star and JR stories
