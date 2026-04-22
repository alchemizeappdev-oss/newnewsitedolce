'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TESTIMONIALS = [
  { quote: "Star knew things no one could possibly know. She described my late mother's jewelry, her voice, the exact phrase she always used. I left that session changed in a way I still can't explain.", author: 'Maria T.', location: 'Reno, NV' },
  { quote: "After the fire cleanse, the weight I'd been carrying for three years just — lifted. My house feels lighter. I feel lighter. I don't have any other way to describe it except it worked.", author: 'Denise R.', location: 'Sparks, NV' },
  { quote: "The hypnosis sessions helped me quit smoking after 20 years. Three sessions. I haven't touched a cigarette since and I genuinely don't want one. Star is the real thing.", author: 'James O.', location: 'Carson City, NV' },
  { quote: "My past life regression session answered questions I've had my whole life about why I'm drawn to certain places and people. Profound, beautiful, and completely validating.", author: 'Alicia M.', location: 'San Francisco, CA' },
  { quote: "I booked a 30-minute reading as a skeptic. I left as a believer. The accuracy was undeniable. Star has an extraordinary gift and the grace to use it with care and love.", author: 'Kevin L.', location: 'Las Vegas, NV' },
  { quote: "Star cleansed my business space after two years of bad luck and nothing going right. Within a month, new clients, new energy, a completely different atmosphere. I bring everyone to her now.", author: 'Yolanda S.', location: 'Reno, NV' },
]

const FAQS = [
  { q: 'How do I book a session with Star?', a: 'Click "Book Now" from any page and select your service. Choose your date and time, complete your information, and you\'ll be directed to secure checkout. You\'ll receive a confirmation email with everything you need to prepare.' },
  { q: 'Are sessions available in person or remotely?', a: 'Most readings can be conducted via phone or video call as well as in person at our Reno office at 351 S. Wells Ave, Suite 200. Ritual services are typically conducted on-site. Contact us to confirm your preference when booking.' },
  { q: 'What is your cancellation and refund policy?', a: 'Cancellations made 48+ hours before your scheduled session receive a full refund or credit toward rebooking. Cancellations within 48 hours are non-refundable but may be rescheduled once at no additional charge. No-shows are non-refundable.' },
  { q: 'How should I prepare for my session?', a: 'Come with an open heart and, ideally, a quiet mind. If you have specific questions or intentions, write them down beforehand. Avoid alcohol or heavy substances for 24 hours before a session. Arrival 10 minutes early is recommended for in-person visits.' },
  { q: 'What exactly happens during a hex removal?', a: 'Star will first identify the nature and source of the energetic interference through intuitive assessment and spiritual tools. The removal involves a three-hour ceremonial process using sacred prayer, specific ritual materials, and Star\'s direct spiritual intervention. A protective sealing is completed at the end.' },
  { q: 'How is hypnosis different from a reading?', a: 'Readings are intuitive — Star receives information from the spiritual realm to guide and inform you. Hypnosis is clinical and directive — it works directly on your subconscious mind to reprogram patterns, release trauma, and install new beliefs. Both are powerful but serve different needs.' },
  { q: "Where can I get Star's book?", a: "Life After Death is available on Amazon. You can also purchase a personally signed copy directly through this website. Signed copies include a handwritten note from Star and ship within 5–7 business days." },
]

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
      {/* PWA INSTALL BANNER */}
      {showInstall && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
          background: 'rgba(8,8,8,0.97)', borderTop: '1px solid rgba(201,168,76,0.3)',
          padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/icons/icon-192.png" alt="Dolce Vida" width={40} height={40} style={{ borderRadius: 8 }} />
            <div>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.1em', color: '#F5EDD6', marginBottom: 2 }}>Dolce Vida</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.85rem', color: '#D4C4A0' }}>Add to your home screen</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowInstall(false)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#D4C4A0', fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.15em', padding: '10px 16px', cursor: 'pointer' }}>
              Later
            </button>
            <button onClick={handleInstall} style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: '#080808', fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.15em', padding: '10px 16px', cursor: 'pointer', fontWeight: 700 }}>
              Install
            </button>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#C9A84C', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
          {[['About', '#about'], ['Services', '/services'], ['The Book', '#book-section'], ['Reviews', '#testimonials'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EDD6', textDecoration: 'none' }}>{label}</a>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)} style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: '#080808', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px 32px', textDecoration: 'none', fontWeight: 700, marginTop: 8 }}>
            Book a Reading
          </Link>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '14px 20px' : '18px 20px',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.18)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <a href="#hero" className="gold-text" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(1rem,4vw,1.4rem)', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}>Dolce Vida</a>
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
          {[['About', '#about'], ['Services', '/services'], ['The Book', '#book-section'], ['Reviews', '#testimonials'], ['Contact', '#contact']].map(([label, href]) => (
            <li key={label}><a href={href} style={{ fontFamily: "'Cinzel',serif", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4C4A0', textDecoration: 'none' }}>{label}</a></li>
          ))}
        </ul>
        <Link href="/book" className="btn-primary hidden md:inline-block" style={{ padding: '12px 24px', fontSize: '0.65rem' }}>Book Now</Link>
        <button
          onClick={() => setMobileOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
          className="flex md:hidden"
          aria-label="Open menu"
        >
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 26, height: 2, background: '#C9A84C', borderRadius: 1 }} />)}
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.5)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: 700, width: '100%', marginTop: 60 }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, opacity: 0.85 }}>Reno, Nevada · Star Monreal</p>
          <h1 className="gold-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(3.5rem,14vw,8rem)', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1, marginBottom: 24 }}>Dolce<br />Vida</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem,4vw,1.5rem)', color: '#D4C4A0', marginBottom: 40, lineHeight: 1.5 }}>Change your energy.<br /><em>Transform your life.</em></p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
            <Link href="/book?service=30-Minute+Reading&price=85" style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: '#080808', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px 32px', textDecoration: 'none', fontWeight: 700, width: '100%', maxWidth: 320, textAlign: 'center', display: 'block' }}>
              Book a 30 Min Reading
            </Link>
            <a href="#about" style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#F5EDD6', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px 32px', textDecoration: 'none', width: '100%', maxWidth: 320, textAlign: 'center', display: 'block' }}>
              Our Story
            </a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,rgba(201,168,76,0.6),transparent)' }} />
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', opacity: 0.6 }}>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '80px 20px', background: `url('/images/about-bg.jpg') center center / cover no-repeat`, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.45)', zIndex: 0 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Opening statement */}
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 60px' }}>
            <p className="section-label">The Story</p>
            <h2 className="gold-text section-title" style={{ fontSize: 'clamp(2rem,6vw,3.8rem)', marginBottom: 24 }}>
              She died.<br />
              <em style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic' }}>And that is when everything began.</em>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,3vw,1.25rem)', lineHeight: 1.85, color: '#D4C4A0' }}>
              There was a moment — a split second that should have been the end — when Star Monreal left this world. No warning. No goodbye. Just silence, then light, then something no human language was built to describe.
            </p>
          </div>

          {/* Star's story — responsive two column */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 60 }}>
            <div>
              <p className="section-label" style={{ textAlign: 'left' }}>Star Monreal</p>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.3rem,4vw,2rem)', letterSpacing: '0.06em', marginBottom: 20, color: '#F5EDD6', lineHeight: 1.3 }}>She came back<br />with a transmission.</h3>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 14 }}>She stood beyond the veil — not in darkness, not in fear — in a peace so complete it erased every question she had ever carried. In a love so vast it made every wound, every heartbreak, every year of feeling lost suddenly make sense.</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 14 }}>In the presence of the Creator and <strong style={{ color: '#F5EDD6' }}>Archangel Michael</strong>, she was shown what most people spend their entire lives searching for: truth, purpose, and the real reason the soul chooses to come here. And then she came back.</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0' }}>Waking up was not a relief. It was a reckoning. She returned knowing that people are living far beneath their power. That spirits are exhausted, energy is blocked, and people have forgotten who they really are. <strong style={{ color: '#F5EDD6' }}>That is why Dolce Vida was born.</strong></p>
            </div>
            <div style={{ position: 'relative', aspectRatio: '16/9', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.15)' }}>
              <Image src="/images/dolce-vida-portal.jpg" alt="Star opening the Dolce Vida portal" fill style={{ objectFit: 'cover', borderRadius: 4 }} />
            </div>
          </div>

          {/* JR's story */}
          <div style={{ maxWidth: 960, margin: '0 auto 60px' }}>
            <div className="jr-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.15)', overflow: 'hidden', borderRadius: 4 }}>
                <Image src="/images/jr-commander.jpg" alt="JR — Commander, Dolce Vida" fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 1, background: 'linear-gradient(to right,transparent,#C9A84C)' }} />
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84C' }}>JR</span>
                  <div style={{ width: 40, height: 1, background: 'linear-gradient(to left,transparent,#C9A84C)' }} />
                </div>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.3rem,4vw,2rem)', letterSpacing: '0.06em', color: '#F5EDD6', marginBottom: 20, lineHeight: 1.3 }}>He was born<br />to protect it.</h3>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 14 }}>JR comes from a small town, but his story was never meant to stay small. Through his mother's bloodline, he carries the gifts of his grandfather — a medicine man, a shaman, a healer. The same energy lives in him.</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 14 }}>JR does not need cards to know what others are feeling. His intuition is immediate, powerful, undeniable. There was a woman preparing for surgery on her hand. After working with JR, she canceled the surgery completely.</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.15rem)', lineHeight: 1.85, color: '#D4C4A0' }}>He is fearless. Wild. Drawn to the edge. The same man who can race toward danger is the man who can sit in silence and help someone find themselves again.</p>
              </div>
            </div>
          </div>

          {/* Belief pillars */}
          <div style={{ maxWidth: 900, margin: '0 auto 60px' }}>
            <p className="section-label" style={{ marginBottom: 32 }}>What We Believe</p>
            <div className="belief-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 2 }}>
              {[
                { label: 'Energy', text: 'Your energy is not fixed. The blocks, the patterns, the heaviness you have been carrying can be released.' },
                { label: 'Clarity', text: 'Clarity is your birthright. You deserve to know who you are, why you are here, and what has been standing in your way.' },
                { label: 'Purpose', text: 'There are no accidents. If you found Dolce Vida, you were meant to. The sweet life begins when you stop carrying what was never yours.' },
              ].map(({ label, text }) => (
                <div key={label} style={{ padding: '28px 24px', background: 'rgba(8,8,8,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>{label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.75, color: '#D4C4A0' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[['500+', 'Clients guided'], ['5★', 'Google rating'], ['10+', 'Years of practice']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p className="gold-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(2rem,6vw,2.5rem)', fontWeight: 700, display: 'block' }}>{num}</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4C4A0', opacity: 0.7, marginTop: 8 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK SECTION */}
      <section id="book-section" style={{ padding: '80px 20px', background: 'var(--black2)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="book-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr minmax(260px,340px)', gap: 48, alignItems: 'center' }}>
          <div>
            <p className="section-label" style={{ textAlign: 'left' }}>The Book</p>
            <h2 className="gold-text section-title" style={{ textAlign: 'left', fontSize: 'clamp(1.8rem,5vw,3rem)' }}>Life After Death</h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.1rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 16 }}>Star&apos;s memoir of the journey no one returns from — and why she did. After her fatal accident, she was guided by Archangel Michael into realms of light, love, and divine truth beyond anything earthly language can fully hold.</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1.1rem)', lineHeight: 1.85, color: '#D4C4A0', marginBottom: 36, fontStyle: 'italic' }}><em>Life After Death</em> is a map for anyone who has lost someone, who fears death, or who senses there is more. It is proof, written in love.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexDirection: 'column' }}>
              <a href="https://www.amazon.com/dp/B0DFZZ3X5R" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: '#080808', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px 24px', textDecoration: 'none', fontWeight: 700, textAlign: 'center', display: 'block' }}>
                Order on Amazon
              </a>
              <Link href="/book?service=Life+After+Death+(Signed+Copy)&price=35" style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#F5EDD6', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px 24px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                Buy Signed Copy — $35
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.15)' }}>
            <Image src="/images/book-hero.jpg" alt="Life After Death book surrounded by roses" fill style={{ objectFit: 'cover', borderRadius: 4 }} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '80px 20px', background: 'var(--black)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-label">Client Voices</p>
          <h2 className="gold-text section-title">What They Say</h2>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginTop: 48 }}>
            {TESTIMONIALS.map(({ quote, author, location }) => (
              <div key={author} style={{ background: 'var(--black2)', padding: '32px 24px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 16, fontSize: '0.9rem' }}>★★★★★</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1rem,2.5vw,1.1rem)', lineHeight: 1.75, color: '#D4C4A0', marginBottom: 20 }}>&ldquo;{quote}&rdquo;</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5EDD6' }}>{author}</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', opacity: 0.7, marginTop: 4 }}>{location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 20px', background: 'var(--black2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="section-label">Questions</p>
          <h2 className="gold-text section-title">Common Questions</h2>
          <div style={{ marginTop: 48 }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                >
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.7rem,2.5vw,0.82rem)', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F5EDD6', lineHeight: 1.5 }}>{q}</span>
                  <span style={{ color: '#C9A84C', fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 20, paddingRight: 8 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,3vw,1.05rem)', lineHeight: 1.8, color: '#D4C4A0' }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INNER CIRCLE */}
      <section id="inner-circle" style={{ padding: '80px 20px', background: 'var(--black)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label">The Inner Circle</p>
          <h2 className="gold-text section-title">Enter the Inner Circle</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,3vw,1.1rem)', lineHeight: 1.8, color: '#D4C4A0', marginBottom: 36 }}>Receive Star's new moon messages, exclusive spiritual guidance, first access to new offerings, and transmissions that never go public.</p>
          {icDone ? (
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C' }}>✦ Welcome to the circle</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setIcDone(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" placeholder="Your name" required value={icName} onChange={e => setIcName(e.target.value)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', color: '#F5EDD6', fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', padding: '16px', outline: 'none', width: '100%' }} />
              <input type="email" placeholder="Your email" required value={icEmail} onChange={e => setIcEmail(e.target.value)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', color: '#F5EDD6', fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', padding: '16px', outline: 'none', width: '100%' }} />
              <button type="submit" style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: '#080808', fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', cursor: 'pointer', fontWeight: 700, width: '100%' }}>
                Enter the Inner Circle
              </button>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', fontStyle: 'italic', color: '#D4C4A0', opacity: 0.5 }}>Sacred space. No spam, ever. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 20px', background: 'var(--black2)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">Find Us</p>
          <h2 className="gold-text section-title">Come to Us</h2>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 48, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { label: 'Address', value: '351 S. Wells Ave, Suite 200\nReno, Nevada 89502', href: undefined },
                { label: 'Phone', value: '775-400-9649', href: 'tel:7754009649' },
                { label: 'Email', value: 'info@dolcevida.pink', href: 'mailto:info@dolcevida.pink' },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,3vw,1.1rem)', color: '#F5EDD6', textDecoration: 'none' }}>{value}</a>
                  ) : (
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,3vw,1.1rem)', color: '#F5EDD6', whiteSpace: 'pre-line' }}>{value}</p>
                  )}
                </div>
              ))}
              <div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Office Hours</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['Mon – Fri', '10am – 6pm'], ['Saturday', 'By appointment'], ['Sunday', 'Closed']].map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1rem)', color: '#D4C4A0' }}>{day}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2.5vw,1rem)', color: '#D4C4A0', opacity: 0.7 }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--black)', border: '1px solid rgba(201,168,76,0.1)', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
              <span style={{ fontSize: '2.5rem', color: '#C9A84C', opacity: 0.3 }}>✦</span>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4C4A0' }}>Reno, Nevada</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1rem', color: '#D4C4A0', opacity: 0.5 }}>351 S. Wells Ave, Suite 200</p>
              <a href="https://maps.google.com/?q=351+S+Wells+Ave+Suite+200+Reno+NV" target="_blank" rel="noopener noreferrer" style={{ marginTop: 16, fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: 2 }}>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '48px 20px', textAlign: 'center' }}>
        <p className="gold-text" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(1.1rem,4vw,1.4rem)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 12 }}>Dolce Vida</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1rem', color: '#D4C4A0', marginBottom: 24 }}>Change your energy. Transform your life.</p>
        <nav style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          {[['About', '#about'], ['Services', '/services'], ['Book', '/book'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4C4A0', textDecoration: 'none', opacity: 0.6 }}>{label}</a>
          ))}
        </nav>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.85rem', color: '#D4C4A0', opacity: 0.3 }}>© 2026 Dolce Vida · Star Monreal · Reno, NV</p>
      </footer>
    </>
  )
}
