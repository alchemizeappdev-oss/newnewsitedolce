# Dolce Vida — Revenue Report
**Updated:** 2026-04-24
**Owner:** Review weekly with Star

---

## SERVICE PRICING REFERENCE

| Service | Category | Price | Duration |
|---|---|---|---|
| 15-Minute Reading | Reading | $45 | 15 min |
| 30-Minute Reading | Reading | $85 | 30 min |
| 60-Minute Reading | Reading | $150 | 60 min |
| Couples Reading | Reading | $120 | 45 min |
| Pet Reading | Reading | $65 | 30 min |
| Tuning Fork Alignment | Ritual | $100 | 55 min |
| Energy Egg Cleanse + Tuning Fork | Ritual | $148 | 40 min |
| Fire Cleanse | Ritual | $1,200 | 4 hrs |
| Home Cleanse | Ritual | $1,200 | 4 hrs |
| Business Energy Cleanse | Ritual | $2,000 | 4 hrs |
| Hex Removal | Ritual | $1,500 | 3 hrs |
| Ritual Service | Ritual | $1,500 | 1 hr |
| Spiritual Awakening Counseling | Healing | $200 | 1 hr |
| Hypnosis | Healing | $250 | 90 min |
| 3-Pack Hypnosis | Healing | $550 | 3 sessions |
| Hypnosis 6-Pack | Healing | $1,000 | 6 sessions |
| Guided Meditations | Healing | $198 | 1 hr |
| Past Life Regression | Healing | $350 | 1 hr 45 min |
| Past Life Regression + Tarot | Healing | $400 | 2 hrs |
| Life After Death (Signed Copy) | Book | $35 | — |

---

## REVENUE TARGETS

### Break-even scenarios (examples)

**$5,000/month requires ONE of:**
- 34 × 30-min readings ($85)
- 4 × Home Cleanses ($1,200)
- 3 × Ritual Services + 2 × 60-min Readings ($4,800)
- 2 × Business Energy Cleanses + 2 × Hypnosis ($4,500) + misc

**$10,000/month requires ONE of:**
- 5 × Business Energy Cleanses ($10,000)
- 4 × Hex Removals + 2 × Ritual Services ($9,000)
- Mix: 3 × Ritual ($4,500) + 10 × Readings ($1,500) + 5 × Healing ($1,600) + misc

**High-leverage insight:** ONE Business Energy Cleanse = 24 × 30-min readings. Every ritual booked is worth 3–4 weeks of reading volume.

---

## HIGHEST-ROI SERVICES TO PROMOTE

| Priority | Service | Why |
|---|---|---|
| 1 | Business Energy Cleanse ($2,000) | Highest single ticket; business owners have budget and urgency |
| 2 | Hex Removal ($1,500) | High urgency; emotional stakes remove price resistance |
| 3 | Hypnosis 6-Pack ($1,000) | Recurring revenue; 6 sessions = relationship |
| 4 | Fire / Home Cleanse ($1,200) | Strong referral driver after results |
| 5 | Past Life Regression + Tarot ($400) | High perceived value; unique to Star |

---

## MONTHLY TRACKER

| Month | Readings Rev | Ritual Rev | Healing Rev | Book Rev | TOTAL |
|---|---|---|---|---|---|
| Apr 2026 | — | — | — | — | — |
| May 2026 | — | — | — | — | — |
| Jun 2026 | — | — | — | — | — |

---

## NEXT REVENUE UNLOCK

**Immediate actions that directly add revenue:**

1. **Connect Resend to Inner Circle form** — Every signup is a warm lead. A 5-email welcome sequence converts ~10–15% to a paid session. Even 50 signups/month = 5–7 new clients.

2. **Add post-session upsell to Email 3** — Post-booking email sequence (see `email_sequences/post_booking_sequence.md`) has a soft "Book Next Session" link. This alone adds ~20% rebooking rate.

3. **Junior starts logging all inquiries** — If 10 people call per week and 3 convert, that's a 30% rate. Tracking reveals what's being lost and where.

4. **Promote Hypnosis 6-Pack on services page** — Currently buried. It's $1,000 for 6 sessions — the easiest upsell from a single hypnosis booking.

5. **Ritual services need testimonials front-and-center** — The $1,200–$2,000 services have the highest conversion barrier. One specific testimonial about the Fire Cleanse or Business Cleanse (like Yolanda S.'s existing testimonial) on the services page would directly lift conversions.

---

## RISKS

| Risk | Impact | Mitigation |
|---|---|---|
| Stripe keys not live | Zero online revenue | Set STRIPE_SECRET_KEY in Vercel env vars |
| Inner Circle emails not sending | Warm leads lost | Connect Resend API (RESEND_API_KEY) |
| No-show rate unknown | Revenue leakage | Track with daily report; Email 2 reduces no-shows |
| High-ticket services underpromoted | Revenue ceiling | Feature ritual services in social content |
