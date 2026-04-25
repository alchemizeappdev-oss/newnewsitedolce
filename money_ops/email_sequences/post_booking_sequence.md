# Post-Booking Email Sequence
**Trigger:** Stripe payment confirmed → send EMAIL 1 immediately
**Revenue relevance:** Reduces no-shows, primes clients for transformation, opens upsell window
**Platform:** Resend / SendGrid (env var: RESEND_API_KEY)

---

## EMAIL 1 — Booking Confirmation
**Send:** Immediately after Stripe payment
**Subject:** Your session with Star is confirmed ✦ {{SERVICE_NAME}} on {{DATE}}
**From:** Star Monreal <info@dolcevida.pink>

---

{{CLIENT_FIRST_NAME}},

It's confirmed.

**{{SERVICE_NAME}}**
{{DATE}} at {{TIME}}
351 S. Wells Ave, Suite 200, Reno, NV 89502

Your investment: **${{PRICE}}**

---

**If this is a remote session:**
We'll connect via phone or video at the number/email you provided. Star will reach out within 24 hours to confirm the call link.

**If this is an in-person session:**
Please arrive 10 minutes early. Suite 200 is on the second floor. Street parking is available along S. Wells Ave.

---

**Before your session, we ask one thing of you:**

Write down what you most need clarity on. One question, one situation, one weight you have been carrying. You don't need to share it unless you want to — but naming it privately helps Star's connection and helps you receive the answer when it arrives.

---

Questions? Reply to this email or call us:
📞 775-400-9649
📧 info@dolcevida.pink

We don't take appointments casually. If something comes up, please let us know 48+ hours in advance.

With love,
**Star & the Dolce Vida team**

*351 S. Wells Ave, Suite 200 · Reno, NV 89502 · dolcevida.pink*

---

## EMAIL 2 — Pre-Session Preparation
**Send:** 24 hours before the session (schedule at booking time)
**Subject:** Tomorrow, you begin. // Dolce Vida
**From:** Star Monreal <info@dolcevida.pink>

---

{{CLIENT_FIRST_NAME}},

Tomorrow is your session with Star.

This is not just a reminder. This is a moment to prepare — not your calendar, but yourself.

---

**Tonight, before you sleep:**

Drink a full glass of water. Light a candle if you have one. Sit quietly for five minutes and breathe.

Ask yourself: *What am I carrying that I am finally ready to put down?*

You don't need an answer. The question is enough.

---

**Tomorrow morning:**

— Avoid alcohol and heavy substances (they cloud the energetic field)
— Eat something light at least an hour before your session
— Wear comfortable clothing you feel calm in
— Silence your phone except for our call

---

**Your session details:**

**{{SERVICE_NAME}}**
{{DATE}} at {{TIME}}

📍 351 S. Wells Ave, Suite 200, Reno, NV 89502
*(or remote — Star will connect at your confirmed number)*

---

If anything has changed or you need to reschedule:
📞 775-400-9649 — call or text Junior directly

See you tomorrow,
**Star**

*dolcevida.pink*

---

## EMAIL 3 — Post-Session Follow-Up
**Send:** 24 hours after the scheduled session end time
**Subject:** How are you carrying what was revealed?
**From:** Star Monreal <info@dolcevida.pink>

---

{{CLIENT_FIRST_NAME}},

It has been 24 hours since your session.

By now, some things have already begun to shift. You may feel it as lightness. Or as a new question that won't leave you alone. Or as a quiet knowing that something is different, even if you can't name it yet.

That is the work continuing inside you.

---

**A journaling prompt for right now:**

*What came through in your session that surprised you most — and what will you do differently because of it?*

Write without editing. Three minutes is enough.

---

**If you felt something powerful:**

Star often finds that one session opens the door and a second session walks you through it. What surfaces in the days after a reading or a cleanse frequently points toward the next layer of work.

If you're ready to continue — or if you have questions about what came through — we're here.

[Book Your Next Session →](https://dolcevida.pink/book)

---

**If you loved your experience:**

The most powerful thing you can do for someone you love is tell them about Star. A kind word — a shared post, a review, a phone call to a friend — changes lives in a way no advertisement ever could.

[Leave a Google Review →](https://g.page/r/dolcevida/review)
*(Takes 60 seconds. Means everything.)*

---

With love and gratitude,
**Star & the Dolce Vida team**

📞 775-400-9649
📧 info@dolcevida.pink
[dolcevida.pink](https://dolcevida.pink)

---

## IMPLEMENTATION NOTES (for developer)

**Where to trigger:**
- `app/api/checkout/route.ts` → after Stripe session creation succeeds, log the scheduled send time
- Or use a Stripe webhook on `checkout.session.completed` event

**Template variables needed from booking payload:**
```
CLIENT_FIRST_NAME  — from firstName field
SERVICE_NAME       — from service field
DATE               — formatted e.g. "Saturday, May 3, 2026"
TIME               — e.g. "2:00 PM"
PRICE              — numeric price
```

**Email 2 scheduling:**
- Calculate: `sessionDateTime - 24 hours`
- If booking is made < 24 hrs before session, skip Email 2 or send immediately

**Email 3 scheduling:**
- Calculate: `sessionDateTime + sessionDuration + 24 hours`
- Session durations are defined in the SERVICES array in `app/book/page.tsx`

**Resend setup:**
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({ from, to, subject, html })
```
