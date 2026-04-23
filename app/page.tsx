'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TESTIMONIALS = [
  { quote: "Star knew things no one could possibly know. She described my late mother's jewelry, her voice, the exact phrase she always used. I left that session changed in a way I still can't explain.", author: 'Maria T.', location: 'Reno, NV' },
  { quote: "After the fire cleanse, the weight I'd been carrying for three years just -- lifted. My house feels lighter. I feel lighter. I don't have any other way to describe it except it worked.", author: 'Denise R.', location: 'Sparks, NV' },
  { quote: "The hypnosis sessions helped me quit smoking after 20 years. Three sessions. I haven't touched a cigarette since and I genuinely don't want one. Star is the real thing.", author: 'James O.', location: 'Carson City, NV' },
  { quote: "My past life regression session answered questions I've had my whole life about why I'm drawn to certain places and people. Profound, beautiful, and completely validating.", author: 'Alicia M.', location: 'San Francisco, CA' },
  { quote: "I booked a 30-minute reading as a skeptic. I left as a believer. The accuracy was undeniable. Star has an extraordinary gift and the grace to use it with care and love.", author: 'Kevin L.', location: 'Las Vegas, NV' },
  { quote: "Star cleansed my business space after two years of bad luck and nothing going right. Within a month, new clients, new energy, a completely different atmosphere. I bring everyone to her now.", author: 'Yolanda S.', location: 'Reno, NV' },
]

const FAQS = [
  { q: 'How do I book a session with Star?', a: "Click 'Book Now' from any page and select your service. Choose your date and time, complete your information, and you'll be directed to secure checkout. You'll receive a confirmation email with everything you need to prepare." },
  { q: 'Are sessions available in person or remotely?', a: 'Most readings can be conducted via phone or video call as well as in person at our Reno office at 351 S. Wells Ave, Suite 200. Ritual services are typically conducted on-site. Contact us to confirm your preference when booking.' },
  { q: 'What is your cancellation and refund policy?', a: 'Cancellations made 48+ hours before your scheduled session receive a full refund or credit toward rebooking. Cancellations within 48 hours are non-refundable but may be rescheduled once at no additional charge. No-shows are non-refundable.' },
  { q: 'How should I prepare for my session?', a: 'Come with an open heart and, ideally, a quiet mind. If you have specific questions or intentions, write them down beforehand. Avoid alcohol or heavy substances for 24 hours before a session. Arrival 10 minutes early is recommended for in-person visits.' },
  { q: 'What exactly happens during a hex removal?', a: "Star will first identify the nature and source of the energetic interference through intuitive assessment and spiritual tools. The removal involves a three-hour ceremonial process using sacred prayer, specific ritual materials, and Star's direct spiritual intervention. A protective sealing is completed at the end." },
  { q: 'How is hypnosis different from a reading?', a: 'Readings are intuitive -- Star receives information from the spiritual realm to guide and inform you. Hypnosis is clinical and directive -- it works directly on your subconscious mind to reprogram patterns, release trauma, and install new beliefs. Both are powerful but serve different needs.' },
  { q: "Where can I get Star's book?", a: 'Life After Death is available on Amazon. You can also purchase a personally signed copy directly through this website. Signed copies include a handwritten note from Star and ship within 5–7 business days.' },
]

/* Shared inline style constants so values are DRY */
const PX = 'clamp(16px, 5vw, 40px)'
const SECTION_PY = 'clamp(60px, 10vw, 120px)'
const BODY_FONT = "'Cormorant Garamond', Georgia, serif"
const HEAD_FONT = "'Cinzel', serif"
const GOLD = '#C9A84C'
const CREAM = '#F5EDD6'
const CREAM_MUTED = '#D4C4A0'
const BLACK = '#080808'
const BLACK2 = '#0e0e0e'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [icName, setIcName] = useState('')
  const [icEmail, setIcEmail] = useState('')
  const [icDone, setIcDone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  return (
    <>
      {/* -- PWA INSTALL BANNER -- */}
      {showInstall && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
          background: 'rgba(8,8,8,0.97)',
          borderTop: '1px solid rgba(201,168,76,0.3)',
          padding: '14px 16px',
          paddingBottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
            <Image src="/icons/icon-192.png" alt="Dolce Vida" width={36} height={36} style={{ borderRadius: 8, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,3vw,0.75rem)', color: CREAM, marginBottom: 2 }}>Dolce Vida</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.8rem,3vw,0.9rem)', color: CREAM_MUTED }}>Add to home screen</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={() => setShowInstall(false)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: CREAM_MUTED, fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '10px 16px', cursor: 'pointer' }}>
              Later
            </button>
            <button onClick={handleInstall} style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '10px 16px', cursor: 'pointer', fontWeight: 700 }}>
              Install
            </button>
          </div>
        </div>
      )}

      {/* -- MOBILE MENU OVERLAY -- */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,8,0.98)',
          zIndex: 200,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
          padding: '80px 24px max(40px, env(safe-area-inset-bottom, 40px))',
          overflowY: 'auto',
        }}>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: GOLD, fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1, padding: 10, touchAction: 'manipulation' }}
          >
            ✕
          </button>
          {[['About', '#about'], ['Services', '/services'], ['The Book', '#book-section'], ['Reviews', '#testimonials'], ['Contact', '#contact']].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1rem, 5vw, 1.3rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM, textDecoration: 'none', touchAction: 'manipulation' }}
            >
              {label}
            </a>
          ))}
          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'linear-gradient(135deg,#8B6914,#C9A84C)',
              color: BLACK,
              fontFamily: HEAD_FONT,
              fontSize: 'clamp(0.7rem,3vw,0.85rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '18px 36px',
              textDecoration: 'none',
              fontWeight: 700,
              marginTop: 8,
              width: '100%',
              maxWidth: 320,
              textAlign: 'center',
              display: 'block',
            }}
          >
            Book a Reading
          </Link>
        </div>
      )}

      {/* -- NAVBAR -- */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${scrolled ? '10px' : '14px'} ${PX}`,
        paddingLeft: `max(${PX}, env(safe-area-inset-left, 16px))`,
        paddingRight: `max(${PX}, env(safe-area-inset-right, 16px))`,
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.18)' : 'none',
        transition: 'all 0.4s ease',
        gap: 12,
      }}>
        <a href="#hero" className="gold-text" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(0.85rem,4vw,1.3rem)', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none', flexShrink: 0 }}>Dolce Vida</a>

        <ul className="nav-desktop" style={{ display: 'none', gap: 28, listStyle: 'none', flex: 1, justifyContent: 'center' }}>
          {[['About', '#about'], ['Services', '/services'], ['The Book', '#book-section'], ['Reviews', '#testimonials'], ['Contact', '#contact']].map(([label, href]) => (
            <li key={label}>
              <a href={href} style={{ fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: CREAM_MUTED, textDecoration: 'none' }}>{label}</a>
            </li>
          ))}
        </ul>
        <Link href="/book" className="book-now-desktop" style={{ padding: '11px 22px', fontSize: '0.62rem', fontFamily: HEAD_FONT, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, textDecoration: 'none', fontWeight: 700, flexShrink: 0 }}>Book Now</Link>

        <button
          onClick={() => setMobileOpen(true)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5, touchAction: 'manipulation' }}
          aria-label="Open menu"
        >
          {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 26, height: 2, background: GOLD, borderRadius: 1 }} />)}
        </button>
      </nav>

      {/* -- HERO -- */}
      <section id="hero" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: BLACK }}>
        <Image
          src="/images/dolce-vida-logo.png"
          alt="Dolce Vida"
          fill
          priority
          style={{ objectFit: 'contain', objectPosition: 'center', zIndex: 0, maxWidth: '100%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.18)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, padding: `80px ${PX} 60px`, width: '100%', maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2.5vw,0.7rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 16, opacity: 0.85 }}>Reno, Nevada · Star Monreal</p>
          <h1 className="gold-text" style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(3rem,16vw,8rem)', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1, marginBottom: 20 }}>Dolce<br />Vida</h1>
          <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(1.05rem,4.5vw,1.5rem)', color: CREAM_MUTED, marginBottom: 36, lineHeight: 1.5 }}>
            Change your energy.<br /><em>Transform your life.</em>
          </p>
          {/* Buttons stack vertically, full width, capped at 340px */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: '100%' }}>
            <Link
              href="/book?service=30-Minute+Reading&price=85"
              style={{
                background: 'linear-gradient(135deg,#8B6914,#C9A84C)',
                color: BLACK,
                fontFamily: HEAD_FONT,
                fontSize: 'clamp(0.65rem,3vw,0.8rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                textDecoration: 'none',
                fontWeight: 700,
                width: '100%',
                maxWidth: 340,
                textAlign: 'center',
                display: 'block',
                wordBreak: 'break-word',
              }}
            >
              Book a 30 Min Reading
            </Link>
            <a
              href="#about"
              style={{
                border: '1px solid rgba(201,168,76,0.4)',
                color: CREAM,
                fontFamily: HEAD_FONT,
                fontSize: 'clamp(0.65rem,3vw,0.8rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                textDecoration: 'none',
                width: '100%',
                maxWidth: 340,
                textAlign: 'center',
                display: 'block',
                wordBreak: 'break-word',
              }}
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Scroll indicator -- centered, no absolute drift off screen */}
        <div style={{ position: 'absolute', bottom: 'max(20px, env(safe-area-inset-bottom, 20px))', left: 0, right: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom,rgba(201,168,76,0.6),transparent)' }} />
          <span style={{ fontFamily: HEAD_FONT, fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, opacity: 0.6 }}>Scroll</span>
        </div>
      </section>

      {/* -- ABOUT -- */}
      <section
        id="about"
        style={{
          padding: `${SECTION_PY} ${PX}`,
          background: BLACK,
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Opening statement */}
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
            <p className="section-label">The Story</p>
            <h2 className="gold-text section-title">
              She died.<br />
              <em style={{ fontFamily: BODY_FONT, fontWeight: 300, fontStyle: 'italic' }}>And that is when everything began.</em>
            </h2>
            <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3.5vw,1.2rem)', lineHeight: 1.85, color: CREAM_MUTED }}>
              There was a moment -- a split second that should have been the end -- when Star Monreal left this world. No warning. No goodbye. Just silence, then light, then something no human language was built to describe.
            </p>
          </div>

          {/* Star's story */}
          <div className="two-col-grid" style={{ marginBottom: 48 }}>
            <div>
              <p className="section-label" style={{ textAlign: 'left' }}>Star Monreal</p>
              <h3 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.3rem,5vw,2rem)', letterSpacing: '0.06em', marginBottom: 16, color: CREAM, lineHeight: 1.3 }}>She came back<br />with a transmission.</h3>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>She stood beyond the veil -- not in darkness, not in fear -- in a peace so complete it erased every question she had ever carried. In a love so vast it made every wound, every heartbreak, every year of feeling lost suddenly make sense.</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>In the presence of the Creator and <strong style={{ color: CREAM }}>Archangel Michael</strong>, she was shown what most people spend their entire lives searching for: truth, purpose, and the real reason the soul chooses to come here. And then she came back.</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED }}>Waking up was not a relief. It was a reckoning. She returned knowing that people are living far beneath their power. That spirits are exhausted, energy is blocked, and people have forgotten who they really are. <strong style={{ color: CREAM }}>That is why Dolce Vida was born.</strong></p>
            </div>
            {/* Image: 4/3 on mobile (less tall), 16/9 on desktop */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/dolce-vida-portal.jpg" alt="Star opening the Dolce Vida portal" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* JR's story -- video background */}
          <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto 48px', borderRadius: 8, overflow: 'hidden' }}>
            {/* Video fills this container */}
            <video
              autoPlay loop muted playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay so text stays legible */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.62)', zIndex: 1 }} />
            {/* Content sits above overlay */}
            <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(32px,6vw,64px)' }}>
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 1, background: `linear-gradient(to right,transparent,${GOLD})` }} />
                <span style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD }}>JR</span>
                <div style={{ width: 32, height: 1, background: `linear-gradient(to left,transparent,${GOLD})` }} />
              </div>
              <h3 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.3rem,5vw,2rem)', letterSpacing: '0.06em', color: CREAM, marginBottom: 16, lineHeight: 1.3 }}>He was born<br />to protect it.</h3>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>JR comes from a small town, but his story was never meant to stay small. Through his mother&apos;s bloodline, he carries the gifts of his grandfather -- a medicine man, a shaman, a healer. The same energy lives in him.</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>JR does not need cards to know what others are feeling. His intuition is immediate, powerful, undeniable. There was a woman preparing for surgery on her hand. After working with JR, she canceled the surgery completely.</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED }}>He is fearless. Wild. Drawn to the edge. The same man who can race toward danger is the man who can sit in silence and help someone find themselves again.</p>
            </div>
          </div>
              <div>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 1, background: `linear-gradient(to right,transparent,${GOLD})` }} />
                  <span style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD }}>JR</span>
                  <div style={{ width: 32, height: 1, background: `linear-gradient(to left,transparent,${GOLD})` }} />
                </div>
                <h3 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.3rem,5vw,2rem)', letterSpacing: '0.06em', color: CREAM, marginBottom: 16, lineHeight: 1.3 }}>He was born<br />to protect it.</h3>
                <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>JR comes from a small town, but his story was never meant to stay small. Through his mother&apos;s bloodline, he carries the gifts of his grandfather -- a medicine man, a shaman, a healer. The same energy lives in him.</p>
                <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>JR does not need cards to know what others are feeling. His intuition is immediate, powerful, undeniable. There was a woman preparing for surgery on her hand. After working with JR, she canceled the surgery completely.</p>
                <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', lineHeight: 1.85, color: CREAM_MUTED }}>He is fearless. Wild. Drawn to the edge. The same man who can race toward danger is the man who can sit in silence and help someone find themselves again.</p>
              </div>
            </div>
          </div>

          {/* Belief pillars */}
          <div style={{ maxWidth: 900, margin: '0 auto 48px' }}>
            <p className="section-label" style={{ marginBottom: 28 }}>What We Believe</p>
            <div className="auto-grid">
              {[
                { label: 'Energy', text: 'Your energy is not fixed. The blocks, the patterns, the heaviness you have been carrying can be released.' },
                { label: 'Clarity', text: 'Clarity is your birthright. You deserve to know who you are, why you are here, and what has been standing in your way.' },
                { label: 'Purpose', text: 'There are no accidents. If you found Dolce Vida, you were meant to. The sweet life begins when you stop carrying what was never yours.' },
              ].map(({ label, text }) => (
                <div key={label} style={{ padding: 'clamp(20px,4vw,28px) clamp(16px,3vw,24px)', background: 'rgba(8,8,8,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.6rem,2.5vw,0.72rem)', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>{label}</p>
                  <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.05rem)', lineHeight: 1.75, color: CREAM_MUTED }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {[['500+', 'Clients guided'], ['5★', 'Google rating'], ['10+', 'Years of practice']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center', minWidth: 80 }}>
                <p className="gold-text" style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.8rem,7vw,2.5rem)', fontWeight: 700, display: 'block' }}>{num}</p>
                <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2vw,0.65rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM_MUTED, opacity: 0.7, marginTop: 8 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- BOOK SECTION -- */}
      <section id="book-section" style={{ padding: `${SECTION_PY} ${PX}`, background: BLACK2, borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="two-col-grid">
            <div>
              <p className="section-label" style={{ textAlign: 'left' }}>The Book</p>
              <h2 className="gold-text section-title" style={{ textAlign: 'left' }}>Life After Death</h2>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.1rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 14 }}>
                Star&apos;s memoir of the journey no one returns from -- and why she did. After her fatal accident, she was guided by Archangel Michael into realms of light, love, and divine truth beyond anything earthly language can fully hold.
              </p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.1rem)', lineHeight: 1.85, color: CREAM_MUTED, marginBottom: 28, fontStyle: 'italic' }}>
                <em>Life After Death</em> is a map for anyone who has lost someone, who fears death, or who senses there is more. It is proof, written in love.
              </p>
              {/* Buttons: full-width stacked column, no overflow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href="https://www.amazon.com/dp/B0DFZZ3X5R"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,2.5vw,0.75rem)', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '18px 20px', textDecoration: 'none', fontWeight: 700, textAlign: 'center', display: 'block', wordBreak: 'break-word' }}
                >
                  Order on Amazon
                </a>
                <Link
                  href="/book?service=Life+After+Death+(Signed+Copy)&price=35"
                  style={{ border: '1px solid rgba(201,168,76,0.4)', color: CREAM, fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,2.5vw,0.75rem)', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '18px 20px', textDecoration: 'none', textAlign: 'center', display: 'block', wordBreak: 'break-word' }}
                >
                  Buy Signed Copy -- $35
                </Link>
              </div>
            </div>
            {/* 4/3 on mobile so it doesn't fill the whole viewport height */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/book-hero.jpg" alt="Life After Death book surrounded by roses" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* -- TESTIMONIALS -- */}
      <section id="testimonials" style={{ padding: `${SECTION_PY} ${PX}`, background: BLACK }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-label">Client Voices</p>
          <h2 className="gold-text section-title">What They Say</h2>
          {/* auto-grid: 1 col on mobile, multi-col on tablet+ */}
          <div className="auto-grid" style={{ marginTop: 40 }}>
            {TESTIMONIALS.map(({ quote, author, location }) => (
              <div key={author} style={{ background: BLACK2, padding: 'clamp(20px,4vw,32px) clamp(16px,4vw,24px)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ color: GOLD, letterSpacing: '0.1em', marginBottom: 14, fontSize: '0.85rem' }}>★★★★★</p>
                <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.1rem)', lineHeight: 1.75, color: CREAM_MUTED, marginBottom: 18 }}>&ldquo;{quote}&rdquo;</p>
                <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.6rem,2vw,0.7rem)', letterSpacing: '0.15em', textTransform: 'uppercase', color: CREAM }}>{author}</p>
                <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2vw,0.62rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, opacity: 0.7, marginTop: 4 }}>{location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section id="faq" style={{ padding: `${SECTION_PY} ${PX}`, background: BLACK2 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="section-label">Questions</p>
          <h2 className="gold-text section-title">Common Questions</h2>
          <div style={{ marginTop: 40 }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16, touchAction: 'manipulation' }}
                >
                  <span style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,2.8vw,0.82rem)', letterSpacing: '0.05em', textTransform: 'uppercase', color: CREAM, lineHeight: 1.6, flex: 1 }}>{q}</span>
                  <span style={{ color: GOLD, fontSize: '1.3rem', flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.05rem)', lineHeight: 1.8, color: CREAM_MUTED }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- INNER CIRCLE -- */}
      <section id="inner-circle" style={{
        padding: `${SECTION_PY} ${PX}`,
        borderTop: '1px solid rgba(201,168,76,0.08)',
        position: 'relative',
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%2019%2C%202026%2C%2010_03_46%20PM-BPzzECOH2TDIMHFRWb6EQWxfYW1et6.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Dark overlay keeps text legible without washing out the image */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.58)', zIndex: 0 }} />
        <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="section-label">The Inner Circle</p>
          <h2 className="gold-text section-title">Enter the Inner Circle</h2>
          <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3.5vw,1.1rem)', lineHeight: 1.8, color: CREAM_MUTED, marginBottom: 32 }}>
            Receive Star&apos;s new moon messages, exclusive spiritual guidance, first access to new offerings, and transmissions that never go public.
          </p>
          {icDone ? (
            <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.7rem,3vw,0.85rem)', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD }}>Welcome to the circle</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setIcDone(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                placeholder="Your name"
                required
                value={icName}
                onChange={e => setIcName(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', color: CREAM, fontFamily: BODY_FONT, fontSize: 'clamp(1rem,4vw,1.05rem)', padding: '16px', outline: 'none', width: '100%', borderRadius: 0, WebkitAppearance: 'none' }}
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={icEmail}
                onChange={e => setIcEmail(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', color: CREAM, fontFamily: BODY_FONT, fontSize: 'clamp(1rem,4vw,1.05rem)', padding: '16px', outline: 'none', width: '100%', borderRadius: 0, WebkitAppearance: 'none' }}
              />
              <button
                type="submit"
                style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,3vw,0.78rem)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', cursor: 'pointer', fontWeight: 700, width: '100%', touchAction: 'manipulation' }}
              >
                Enter the Inner Circle
              </button>
              <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.85rem,3vw,0.95rem)', fontStyle: 'italic', color: CREAM_MUTED, opacity: 0.5 }}>Sacred space. No spam, ever. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </section>

      {/* -- CONTACT -- */}
      <section id="contact" style={{ padding: `${SECTION_PY} ${PX}`, background: BLACK2 }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">Find Us</p>
          <h2 className="gold-text section-title">Come to Us</h2>
          <div className="two-col-grid" style={{ marginTop: 40, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                { label: 'Address', value: '351 S. Wells Ave, Suite 200\nReno, Nevada 89502', href: undefined },
                { label: 'Phone', value: '775-400-9649', href: 'tel:7754009649' },
                { label: 'Email', value: 'info@dolcevida.pink', href: 'mailto:info@dolcevida.pink' },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2.5vw,0.65rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3.5vw,1.15rem)', color: CREAM, textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
                  ) : (
                    <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3.5vw,1.15rem)', color: CREAM, whiteSpace: 'pre-line' }}>{value}</p>
                  )}
                </div>
              ))}
              <div>
                <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2.5vw,0.65rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Office Hours</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['Mon – Fri', '10am – 6pm'], ['Saturday', 'By appointment'], ['Sunday', 'Closed']].map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                      <span style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.05rem)', color: CREAM_MUTED }}>{day}</span>
                      <span style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.05rem)', color: CREAM_MUTED, opacity: 0.7 }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location card */}
            <div style={{ background: BLACK, border: '1px solid rgba(201,168,76,0.1)', padding: 'clamp(28px,6vw,48px) clamp(20px,4vw,32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
              <span style={{ fontSize: 'clamp(1.8rem,6vw,2.5rem)', color: GOLD, opacity: 0.3 }}>✦</span>
              <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,2.5vw,0.78rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM_MUTED }}>Reno, Nevada</p>
              <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(0.95rem,3vw,1.05rem)', color: CREAM_MUTED, opacity: 0.5 }}>351 S. Wells Ave, Suite 200</p>
              <a
                href="https://maps.google.com/?q=351+S+Wells+Ave+Suite+200+Reno+NV"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 8, fontFamily: HEAD_FONT, fontSize: 'clamp(0.6rem,2.5vw,0.68rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: 2 }}
              >
                Get Directions
              </a>
              <Link
                href="/book"
                style={{ marginTop: 12, background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, fontFamily: HEAD_FONT, fontSize: 'clamp(0.6rem,2.5vw,0.7rem)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px 24px', textDecoration: 'none', fontWeight: 700, display: 'block', width: '100%', textAlign: 'center', wordBreak: 'break-word' }}
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <footer className="footer-safe" style={{ background: BLACK, borderTop: '1px solid rgba(201,168,76,0.1)', padding: `clamp(36px,6vw,48px) ${PX}`, paddingBottom: 'max(28px, env(safe-area-inset-bottom, 28px))', textAlign: 'center' }}>
        <p className="gold-text" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(1rem,5vw,1.4rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10 }}>Dolce Vida</p>
        <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(0.95rem,3vw,1rem)', color: CREAM_MUTED, marginBottom: 20 }}>Change your energy. Transform your life.</p>
        <nav className="footer-nav" style={{ marginBottom: 20 }}>
          {[['About', '#about'], ['Services', '/services'], ['Book', '/book'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.58rem,2.5vw,0.68rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: CREAM_MUTED, textDecoration: 'none', opacity: 0.6 }}>{label}</a>
          ))}
        </nav>
        <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.8rem,3vw,0.88rem)', color: CREAM_MUTED, opacity: 0.3 }}>© 2026 Dolce Vida · Star Monreal · Reno, NV</p>
      </footer>
    </>
  )
}
