'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SERVICES = [
  { cat: 'reading', name: '15-Minute Reading', meta: '15 minutes', price: 75, desc: 'A precise intuitive reading for a single question or focused area of life. Clear, fast, direct.' },
  { cat: 'reading', name: '30-Minute Reading', meta: '30 minutes', price: 100, desc: 'Deeper insight into relationships, career, health, or spiritual path. Room to breathe and explore.' },
  { cat: 'reading', name: '60-Minute Reading', meta: '60 minutes', price: 200, desc: 'A full intuitive session. Life path, loved ones, guides, blocks, and practical next steps — all illuminated.' },
  { cat: 'reading', name: '90-Minute Reading', meta: '1 hr 30 min', price: 260, desc: 'The deepest single-session reading available. Space for multiple areas of life, extended spirit contact, and full energetic assessment.' },
  { cat: 'reading', name: 'Couples Reading', meta: '45 minutes', price: 120, desc: 'Clarity for two — relationship dynamics, energy alignment, and the path forward together.' },
  { cat: 'reading', name: 'Pet Reading', meta: '30 minutes', price: 65, desc: "Connect with your animal companion's energy and receive messages from pets who have passed." },
  { cat: 'ritual', name: 'Fire Cleanse', meta: '4 hours', price: 1200, desc: 'A powerful full-body energetic purification using sacred fire ceremony. Deep release of stagnant energy, trauma, and spiritual debris.' },
  { cat: 'ritual', name: 'Business Energy Cleanse', meta: '4 hours', price: 2000, desc: 'Clear stagnant, negative, or blocked energy from your business or commercial space. Attract prosperity and aligned clients.' },
  { cat: 'ritual', name: 'Hex Removal', meta: '3 hours', price: 1500, desc: 'Identification and complete removal of psychic attacks, curses, and energetic bindings. Protective sealing included.' },
  { cat: 'ritual', name: 'Home Cleanse', meta: '4 hours', price: 1200, desc: 'A complete spiritual clearing of your home — removing negative entities, residual energy, and creating sacred protective boundaries.' },
  { cat: 'ritual', name: 'Tuning Fork Alignment', meta: '55 minutes', price: 100, desc: "Sacred sound frequencies applied to the body's energy centers to restore balance and open blocked chakras." },
  { cat: 'ritual', name: 'Energy Egg Cleanse + Tuning Fork', meta: '40 minutes', price: 148, desc: 'Combined limpia egg cleanse drawing out dense energies, followed by vibrational tuning fork realignment.' },
  { cat: 'ritual', name: 'Ritual Service', meta: '1 hour', price: 1500, desc: 'A custom sacred ritual — crafted for your specific intention, whether protection, manifestation, release, or amplification.' },
  { cat: 'healing', name: 'Spiritual Awakening Counseling', meta: '1 hour', price: 200, desc: 'Guidance for those experiencing spiritual awakening — navigating new sensitivities, gifts, confusion, and transformation.' },
  { cat: 'healing', name: 'Past Life Regression + Tarot', meta: '2 hours', price: 400, desc: 'Journey into past lives through guided hypnotic regression, then integrate the insights with a tarot reading anchored in your present.' },
  { cat: 'healing', name: 'Past Life Regression', meta: '1 hr 45 mins', price: 350, desc: 'Guided hypnotic journey into previous lifetimes to heal recurring patterns, unexplained fears, and soul contracts.' },
  { cat: 'healing', name: 'Hypnosis', meta: '1 hr 30 mins', price: 250, desc: 'Certified clinical hypnosis for deep subconscious reprogramming — anxiety, confidence, habits, trauma, and transformation at the root level.' },
  { cat: 'healing', name: '3-Pack Hypnosis Sessions', meta: '3 sessions', price: 550, desc: 'Commit to lasting change. Three sessions targeting the same core issue — compounding transformation, measurable results.' },
  { cat: 'healing', name: 'Hypnosis 6-Pack Sessions', meta: '6 sessions', price: 1000, desc: 'Deep, sustained transformation. Six sessions for maximum reprogramming — phobias, chronic patterns, spiritual blocks, and complete mindset rebuilding.' },
  { cat: 'healing', name: 'Guided Meditations', meta: '1 hour', price: 198, desc: 'Personalized guided meditation journeys — chakra opening, spirit contact, inner child healing, or divine alignment.' },
]

const BADGE: Record<string, React.CSSProperties> = {
  reading: { background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' },
  ritual:  { background: 'rgba(139,26,26,0.18)',  color: '#E05555', border: '1px solid rgba(139,26,26,0.4)' },
  healing: { background: 'rgba(74,14,107,0.18)',  color: '#7B2FBE', border: '1px solid rgba(123,47,190,0.4)' },
}
const PRICE_COLOR: Record<string, string> = { reading: '#C9A84C', ritual: '#E05555', healing: '#7B2FBE' }

export default function ServicesPage() {
  const [filter, setFilter] = useState<'all'|'reading'|'ritual'|'healing'>('all')
  const router = useRouter()

  const visible = SERVICES.filter(s => filter === 'all' || s.cat === filter)

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.12)', padding: '16px clamp(16px,4vw,40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Link href="/" className="gold-text" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(0.85rem,3vw,1.1rem)', fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none', flexShrink: 0 }}>Dolce Vida</Link>
        <ul className="hidden md:flex" style={{ gap: 28, listStyle: 'none', flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
          {[['About', '/#about'], ['Services', '/services'], ['Shop', '/shop'], ['The Book', '/#book-section'], ['Reviews', '/#testimonials'], ['Contact', '/#contact']].map(([label, href]) => (
            <li key={label}>
              <Link href={href} className={`nav-link${label === 'Services' ? ' nav-link-gold' : ''}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/book" className="hidden md:inline-block" style={{ padding: '11px 22px', fontSize: '0.62rem', fontFamily: "'Cinzel',serif", letterSpacing: '0.2em', textTransform: 'uppercase', background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: '#080808', textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>Book Now</Link>
        <Link href="/" className="flex md:hidden" style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4C4A0', textDecoration: 'none', whiteSpace: 'nowrap' }}>Menu</Link>
      </nav>

      <div style={{ padding: '100px 20px 60px', textAlign: 'center', background: '#080808' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(74,14,107,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16 }}>Sacred Offerings</p>
        <h1 className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 20 }}>Choose Your Path</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem,1.8vw,1.35rem)', color: '#D4C4A0', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Every service is a doorway. Enter where you are called.
        </p>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto 52px', padding: '0 20px' }}>
        <div style={{ display: 'flex', border: '1px solid rgba(201,168,76,0.2)', overflow: 'hidden' }}>
          {(['all', 'reading', 'ritual', 'healing'] as const).map((cat, i, arr) => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ fontFamily: "'Cinzel',serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: filter === cat ? 'rgba(201,168,76,0.08)' : 'transparent', border: 'none', color: filter === cat ? '#C9A84C' : '#D4C4A0', padding: '15px 0', flex: 1, cursor: 'pointer', borderRight: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.2)' : 'none', transition: 'all 0.25s' }}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 2 }}>
          {visible.map(svc => (
            <div key={svc.name} style={{ background: '#0e0e0e', padding: 32, border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '4px 10px', display: 'inline-block', marginBottom: 16, ...BADGE[svc.cat] }}>
                {svc.cat.charAt(0).toUpperCase() + svc.cat.slice(1)}
              </span>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', color: '#F5EDD6', marginBottom: 8 }}>{svc.name}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: '#D4C4A0', fontStyle: 'italic', marginBottom: 12, opacity: 0.7 }}>{svc.meta}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', lineHeight: 1.65, color: '#D4C4A0', marginBottom: 20 }}>{svc.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.2rem', fontWeight: 600, color: PRICE_COLOR[svc.cat] }}>
                  ${svc.price.toLocaleString()}
                </span>
                <button onClick={() => router.push(`/book?service=${encodeURIComponent(svc.name)}&price=${svc.price}`)}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                  Book This →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '48px 20px', textAlign: 'center' }}>
        <p className="gold-text" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 12 }}>Dolce Vida</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: '#D4C4A0', marginBottom: 20 }}>Change your energy. Transform your life.</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: '#D4C4A0', opacity: 0.3 }}>© 2026 Dolce Vida · Star Monreal · Reno, NV · info@dolcevida.pink</p>
      </footer>
    </>
  )
}
