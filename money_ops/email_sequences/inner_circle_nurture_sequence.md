# Inner Circle — 5-Email Welcome Nurture Sequence
**Trigger:** Inner Circle form submit on homepage (currently frontend-only — needs Resend backend)
**Revenue relevance:** Warm leads who opted in → 10–15% convert to paid session within 30 days
**From:** Star Monreal <info@dolcevida.pink>
**Platform:** Resend (RESEND_API_KEY)

---

## EMAIL 1 — Welcome (send immediately on signup)
**Subject:** You're in. Welcome to the Inner Circle. ✦
**Delay:** 0 minutes

---

{{FIRST_NAME}},

You're in.

You didn't stumble onto Dolce Vida by accident. The people who find their way here are always the ones who were already ready — they just needed something to confirm it.

Consider this your confirmation.

---

**What the Inner Circle is:**

This is not a newsletter. This is not a marketing list.

This is a private space where I share what I can't share publicly — new moon transmissions, messages I receive that are meant for the collective, early access to new offerings, and moments of truth that don't belong on a website.

You'll hear from me when I have something real to say. Never for the sake of filling your inbox.

---

**A question to sit with tonight:**

*What would your life look like if the thing you've been carrying for the longest time was finally gone?*

Don't answer it yet. Just let it sit somewhere in you.

We'll talk soon.

With love,
**Star**

*Dolce Vida · Reno, Nevada · dolcevida.pink*
*To unsubscribe, reply with "unsubscribe" — no judgment, ever.*

---

## EMAIL 2 — Star's Story (send Day 2)
**Subject:** The moment I died — and why I came back
**Delay:** 48 hours after signup

---

{{FIRST_NAME}},

I want to tell you something I've only ever told in full to the people closest to me.

There was an accident. And for a moment — a real, undeniable moment — I left.

I didn't go somewhere dark. I went somewhere *vast*. I was held in a love so complete that everything I had ever been afraid of simply... didn't matter. I stood in the presence of the Creator and Archangel Michael. And what I was shown there changed everything I thought I understood about why we're here.

Then I came back.

---

Waking up was not relief. It was a weight I didn't expect. Because I now knew things that most people spend their entire lives searching for — and I was back in a world that seemed completely unaware of how close it was to the truth.

That's why Dolce Vida exists.

Not to be mysterious. Not to perform. To help people access, in this lifetime, what I was shown on the other side — that your energy is not fixed, your wounds are not permanent, and the life you sense is possible is not a fantasy.

It's actually available to you right now.

---

If you've been curious about a reading, a session, or just a conversation — I'm here.

[See what a session with me looks like →](https://dolcevida.pink/book)

With love,
**Star Monreal**

*dolcevida.pink · 775-400-9649 · info@dolcevida.pink*

---

## EMAIL 3 — The Education (send Day 4)
**Subject:** Why you're still carrying it (and what that actually means)
**Delay:** 4 days after signup

---

{{FIRST_NAME}},

Most people who come to me have already tried the obvious things.

Therapy. Self-help books. Affirmations. Journaling. Maybe medication. Maybe moving to a different city. Maybe ending a relationship and starting a new one.

And something still won't lift.

Here's what I've learned from working with hundreds of people over ten years:

*The thing that won't lift is not in your mind. It's in your energy field.*

---

**What that means:**

Your energy body carries everything — not just current stress, but old grief, inherited patterns, spiritual interference, energetic cords that attach you to people and situations that are long gone. Talk therapy can name these things. It almost never clears them.

What I do goes to the root.

A reading shows you what's there — specifically, accurately, sometimes shockingly so. A cleanse removes what doesn't belong. A ritual service seals the new space.

People don't leave my sessions with more information. They leave feeling *different*.

---

**The most common thing people say afterward:**

*"I wish I'd done this years ago."*

You found the Inner Circle because something in you was already moving toward this. If you're ready to find out what's in your field — and what's possible once it's cleared —

[Book a session with me →](https://dolcevida.pink/book)

The 30-minute reading is where most people start. It's $85, and it's enough for you to know whether this work is for you.

With love,
**Star**

*dolcevida.pink*

---

## EMAIL 4 — New Moon Transmission (send Day 7)
**Subject:** ✦ New moon message — this one is for you
**Delay:** 7 days after signup

---

{{FIRST_NAME}},

I sent this to the Inner Circle last night after the new moon.

Every new moon I sit quietly and ask: *what does the collective need to hear right now?*

This is what came through.

---

*There is something you have been waiting for permission to release.*

*Not from someone else. From yourself.*

*You have been loyal to a version of your story that no longer serves you — loyal because changing it would require admitting that the person you were when you wrote it deserved more than they received.*

*You deserved more.*

*That is not weakness. That is the beginning.*

*The sweet life — the dolce vita — is not earned through suffering more. It is claimed the moment you stop agreeing that the weight was ever yours to carry.*

---

If that landed somewhere specific in you — that's not coincidence. That's your energy telling you something is ready to move.

I'm here when you are.

[Book a session →](https://dolcevida.pink/book)

With love,
**Star**

*dolcevida.pink · Reno, Nevada*

---

## EMAIL 5 — The Direct Offer (send Day 10)
**Subject:** A personal note from me to you
**Delay:** 10 days after signup

---

{{FIRST_NAME}},

You've been in the Inner Circle for about ten days now.

I want to be direct with you — because that's the only way I know how to be.

If you've been reading these messages and something in you keeps saying *yes, this is real, this is for me* — that feeling is accurate. Trust it.

A lot of people sit with that feeling for months. Years sometimes. And then they finally book, and they sit across from me, and they say: *I don't know why I waited so long.*

I don't want that for you.

---

**Here's what I'm offering Inner Circle members this month:**

A **30-minute reading for $85** — no upsell, no pressure. One session to hear what's in your field, receive what wants to come through, and decide from there.

That's it. One step.

[Claim your session →](https://dolcevida.pink/book?service=30-Minute+Reading)

If you have questions before booking, reply to this email or text Junior directly at **775-400-9649**. He'll take care of everything.

With love and intention,
**Star Monreal**

*Dolce Vida · 351 S. Wells Ave, Suite 200 · Reno, NV 89502*
*dolcevida.pink · info@dolcevida.pink*

---

## IMPLEMENTATION NOTES (for developer)

**Backend needed:**
- Wire Inner Circle form (`app/page.tsx` — the `icDone` state form) to a real POST endpoint
- Create `app/api/inner-circle/route.ts` that saves email + name and triggers sequence via Resend

**Sequence scheduler:**
```
Email 1 — immediate (send on POST)
Email 2 — delay: 2 days (172800 seconds)
Email 3 — delay: 4 days (345600 seconds)
Email 4 — delay: 7 days (604800 seconds)
Email 5 — delay: 10 days (864000 seconds)
```

**Simple implementation with Resend Batch or scheduled sends:**
```ts
// app/api/inner-circle/route.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email } = await req.json()
  const firstName = name.split(' ')[0]

  // Email 1 — immediate
  await resend.emails.send({ from: 'Star Monreal <info@dolcevida.pink>', to: email, subject: "You're in. Welcome to the Inner Circle. ✦", html: buildEmail1(firstName) })

  // Emails 2–5 use Resend's scheduledAt parameter
  // scheduledAt: new Date(Date.now() + 2 * 86400 * 1000).toISOString()

  return Response.json({ ok: true })
}
```

**Template variables:**
- `FIRST_NAME` — from name field, split on space, take first token
