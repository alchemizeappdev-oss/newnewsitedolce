# money_ops — Dolce Vida Business Operations
**Created:** 2026-04-24
**Owner:** Star Monreal + Junior
**Purpose:** All revenue-generating assets, scripts, sequences, and tracking live here

---

## DIRECTORY

| File | What It Is | Who Uses It |
|---|---|---|
| `email_sequences/post_booking_sequence.md` | 3 emails sent after every Stripe payment: confirmation, pre-session prep, post-session upsell | Developer to wire up; Star approves copy |
| `email_sequences/inner_circle_nurture_sequence.md` | 5-email welcome sequence for Inner Circle signups — converts warm leads to paid sessions over 10 days | Developer to wire up via `app/api/inner-circle/route.ts` |
| `sales/junior_booking_script.md` | Complete phone script for converting inbound inquiries to bookings | Junior — every call |
| `sales/objection_handler.md` | Word-for-word responses to price resistance, skepticism, "I need to think about it" | Junior (phone) + Star (in-person) |
| `reports/daily_report.md` | Daily log of sessions, inquiries, bookings, follow-ups | Junior — fills out daily |
| `reports/money_report.md` | Revenue targets, service pricing, monthly tracker, risk register | Star — reviews weekly |

---

## THIS SESSION — WHAT WAS BUILT (2026-04-24)

**Codex Commander confirmed:**
- Website is fully built (Next.js, Stripe checkout, all pages live)
- `money_ops/` did not exist — zero business ops infrastructure

**Created from scratch:**
1. `post_booking_sequence.md` — 3-email sequence + developer implementation notes
2. `junior_booking_script.md` — Full phone script with service match table, upsell logic, follow-up protocol
3. `objection_handler.md` — 6 major objections with exact response language + power phrases
4. `daily_report.md` — Daily ops log template
5. `money_report.md` — Revenue tracker, targets, highest-ROI service ranking, risk register

**Revenue relevance:** These 5 assets directly address the three biggest post-launch revenue leaks:
- No-shows (fixed by Email 2)
- Unconverted inquiries (fixed by Junior's script)
- Price resistance on high-ticket ($1,200–$2,000) services (fixed by objection handler)

---

## NEXT LOCKED ACTION

**Priority 1 (Developer):** Wire up `post_booking_sequence.md` emails via Resend. Connect to Stripe webhook `checkout.session.completed`. Every booking currently goes unacknowledged past the Stripe success page.

**Priority 2 (Developer):** Create `app/api/inner-circle/route.ts` and connect it to the homepage Inner Circle form. Use `inner_circle_nurture_sequence.md` for copy. Sequence sends over 10 days via Resend `scheduledAt`.

**Priority 3 (Junior):** Read `junior_booking_script.md` and `objection_handler.md` cover-to-cover before the next call.

**Priority 4 (Star):** Approve email copy in both sequences. Set weekly revenue target in `money_report.md`.

**Priority 5 (Next loop):** Social media content calendar — 30 days of TikTok/IG/FB content mapped to services.
