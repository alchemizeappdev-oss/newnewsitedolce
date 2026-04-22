'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SERVICES = [
  { cat: 'reading', name: '15-Minute Reading', meta: '15 min', price: 45 },
  { cat: 'reading', name: '30-Minute Reading', meta: '30 min', price: 85 },
  { cat: 'reading', name: '60-Minute Reading', meta: '60 min', price: 150 },
  { cat: 'reading', name: 'Couples Reading', meta: '45 min', price: 120 },
  { cat: 'reading', name: 'Pet Reading', meta: '30 min', price: 65 },
  { cat: 'ritual', name: 'Fire Cleanse', meta: '4 hrs', price: 1200 },
  { cat: 'ritual', name: 'Business Energy Cleanse', meta: '4 hrs', price: 2000 },
  { cat: 'ritual', name: 'Hex Removal', meta: '3 hrs', price: 1500 },
  { cat: 'ritual', name: 'Home Cleanse', meta: '4 hrs', price: 1200 },
  { cat: 'ritual', name: 'Tuning Fork Alignment', meta: '55 min', price: 100 },
  { cat: 'ritual', name: 'Energy Egg Cleanse + Tuning Fork', meta: '40 min', price: 148 },
  { cat: 'ritual', name: 'Ritual Service', meta: '1 hr', price: 1500 },
  { cat: 'healing', name: 'Spiritual Awakening Counseling', meta: '1 hr', price: 200 },
  { cat: 'healing', name: 'Past Life Regression + Tarot', meta: '2 hrs', price: 400 },
  { cat: 'healing', name: 'Past Life Regression', meta: '1 hr 45 min', price: 350 },
  { cat: 'healing', name: 'Hypnosis', meta: '1 hr 30 min', price: 250 },
  { cat: 'healing', name: '3-Pack Hypnosis Sessions', meta: '3 sessions', price: 550 },
  { cat: 'healing', name: 'Hypnosis 6-Pack Sessions', meta: '6 sessions', price: 1000 },
  { cat: 'healing', name: 'Guided Meditations', meta: '1 hr', price: 198 },
  { cat: 'book', name: 'Life After Death (Signed Copy)', meta: 'Ships 5-7 days', price: 35 },
]

const TIME_SLOTS = ['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM']
const CATS = ['all','reading','ritual','healing','book'] as const

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,168,76,0.2)',
  color: '#F5EDD6',
  fontFamily: "'Cormorant Garamond',serif",
  fontSize: '1rem',
  padding: '14px 16px',
  outline: 'none',
  letterSpacing: '0.04em',
  borderRadius: 0,
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'Cinzel',serif",
  fontSize: '0.55rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: '#C9A84C',
  opacity: 0.8,
  display: 'block',
  marginBottom: 8,
}

function BookingUI() {
  const params = useSearchParams()

  const [catFilter, setCatFilter] = useState<typeof CATS[number]>('all')
  const [selected, setSelected] = useState<typeof SERVICES[0] | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const svcName = params.get('service')
    if (svcName) {
      const match = SERVICES.find(s => s.name === svcName)
      if (match) setSelected(match)
    }
  }, [params])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`

  const canCheckout = selected && date && time && firstName && lastName && email

  const handleCheckout = async () => {
    if (!canCheckout) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selected!.name, price: selected!.price, firstName, lastName, email, phone, date, time, notes }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Checkout failed')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const formatDate = (d: string) => {
    if (!d) return ''
    return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const stepLabel = (n: string, t: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
      <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.3em', color: '#C9A84C', opacity: 0.7 }}>{n}</span>
      <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5EDD6' }}>{t}</span>
    </div>
  )

  const orderSummary = (
    <div style={{ background: '#0e0e0e', border: '1px solid rgba(201,168,76,0.15)', padding: isMobile ? '28px 20px' : '36px 32px' }}>
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 28, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.12)' }}>Your Booking</p>
      {!selected ? (
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: '#D4C4A0', opacity: 0.4, fontSize: '0.95rem', textAlign: 'center', padding: '20px 0' }}>Select a service to begin</p>
      ) : (
        <>
          {([
            ['Service', selected.name],
            ['Duration', selected.meta],
            date ? ['Date', formatDate(date)] : null,
            time ? ['Time', time] : null,
            firstName ? ['Client', `${firstName} ${lastName}`.trim()] : null,
          ] as ([string, string] | null)[]).filter((x): x is [string, string] => x !== null).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4C4A0', opacity: 0.6, whiteSpace: 'nowrap', paddingTop: 2 }}>{key}</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: '#F5EDD6', textAlign: 'right', lineHeight: 1.4 }}>{val}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'rgba(201,168,76,0.1)', margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4C4A0' }}>Total</span>
            <span className="gold-text" style={{ fontFamily: "'Cinzel',serif", fontSize: '1.6rem', fontWeight: 600 }}>${selected.price.toLocaleString()}</span>
          </div>
        </>
      )}
      {error && <p style={{ fontFamily: "'Cormorant Garamond',serif", color: '#E05555', fontSize: '0.9rem', marginTop: 16, textAlign: 'center' }}>{error}</p>}
      <button onClick={handleCheckout} disabled={!canCheckout || loading}
        style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#080808', background: 'linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A)', border: 'none', padding: 20, cursor: canCheckout ? 'pointer' : 'not-allowed', marginTop: 28, opacity: (!canCheckout || loading) ? 0.35 : 1, transition: 'all 0.3s' }}>
        {loading ? 'Redirecting...' : 'Proceed to Checkout'}
      </button>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.8rem', fontStyle: 'italic', color: '#D4C4A0', opacity: 0.4, textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
        Secure payment via Stripe. You&apos;ll be redirected to complete your booking.
      </p>
    </div>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 16px 80px' : '60px 24px 100px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Sacred Offerings</p>
        <h1 className="gold-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.6rem,5vw,3rem)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 12 }}>Book a Session</h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.1rem)', color: '#D4C4A0' }}>Choose your service, select your time, and begin your transformation.</p>
      </div>

      {/* Two-column on desktop, single-column on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
        gap: isMobile ? 32 : 48,
        alignItems: 'start',
      }}>

        {/* FORM column */}
        <div style={{ minWidth: 0 }}>

          {/* Step 1 — Service */}
          <div style={{ marginBottom: 40 }}>
            {stepLabel('01', 'Select Your Service')}

            {/* Category filter — wraps on mobile */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {CATS.map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)}
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: '0.58rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: catFilter === cat ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border: `1px solid ${catFilter === cat ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
                    color: catFilter === cat ? '#C9A84C' : '#D4C4A0',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    whiteSpace: 'nowrap',
                  }}>
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Service list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {SERVICES.filter(s => catFilter === 'all' || s.cat === catFilter).map(svc => (
                <button key={svc.name} onClick={() => setSelected(svc)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: selected?.name === svc.name ? 'rgba(201,168,76,0.06)' : '#0e0e0e',
                    border: `1px solid ${selected?.name === svc.name ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.04)'}`,
                    cursor: 'pointer',
                    gap: 12,
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: 'left',
                    transition: 'all 0.25s',
                  }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.62rem,2vw,0.75rem)', letterSpacing: '0.06em', color: selected?.name === svc.name ? '#E8C96A' : '#F5EDD6', marginBottom: 4, lineHeight: 1.4 }}>{svc.name}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', color: '#D4C4A0', fontStyle: 'italic', opacity: 0.65 }}>{svc.meta}</p>
                  </div>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.85rem,2.5vw,1rem)', fontWeight: 600, color: svc.cat === 'reading' ? '#C9A84C' : svc.cat === 'ritual' ? '#E05555' : svc.cat === 'healing' ? '#7B2FBE' : '#C9A84C', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    ${svc.price.toLocaleString()}
                  </span>
                  <div style={{ width: 18, height: 18, border: `1px solid ${selected?.name === svc.name ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#C9A84C', flexShrink: 0 }}>
                    {selected?.name === svc.name ? '✓' : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Date & Time */}
          <div style={{ marginBottom: 40 }}>
            {stepLabel('02', 'Choose Date & Time')}

            {/* Date input — full width, box-sizing set so it never overflows */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark', maxWidth: '100%' }}
              />
            </div>

            {/* Time slots — 3 cols on mobile, keep readable */}
            <div>
              <label style={labelStyle}>Preferred Time</label>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(3,1fr)', gap: 8 }}>
                {TIME_SLOTS.map(slot => (
                  <button key={slot} onClick={() => setTime(slot)}
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 'clamp(0.52rem,2vw,0.6rem)',
                      letterSpacing: '0.08em',
                      background: time === slot ? 'rgba(201,168,76,0.08)' : '#0e0e0e',
                      border: `1px solid ${time === slot ? '#C9A84C' : 'rgba(255,255,255,0.06)'}`,
                      color: time === slot ? '#C9A84C' : '#D4C4A0',
                      padding: '12px 4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 — Client Info */}
          <div style={{ marginBottom: 40 }}>
            {stepLabel('03', 'Your Information')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Name — stacks to 1 col on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" placeholder="(775) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{"Anything you'd like Star to know"}</label>
                <textarea placeholder="Optional — a specific question, intention, or context..." value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, minHeight: 80 }} rows={3} />
              </div>
            </div>
          </div>

          {/* On mobile: order summary appears here after the form */}
          {isMobile && <div style={{ marginBottom: 40 }}>{orderSummary}</div>}
        </div>

        {/* ORDER SUMMARY — sticky on desktop, hidden here on mobile (shown above) */}
        {!isMobile && (
          <div style={{ position: 'sticky', top: 80 }}>
            {orderSummary}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        <Link href="/" className="gold-text" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(0.85rem,3vw,1.1rem)', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}>Dolce Vida</Link>
        <Link href="/" style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4C4A0', textDecoration: 'none', whiteSpace: 'nowrap' }}>Back to Site</Link>
      </nav>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: 100, color: '#C9A84C', fontFamily: "'Cinzel',serif", letterSpacing: '0.2em' }}>Loading...</div>}>
        <BookingUI />
      </Suspense>
    </>
  )
}
