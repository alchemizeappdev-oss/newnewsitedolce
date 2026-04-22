import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 600 }}>
        <div style={{ fontSize: '3rem', color: '#C9A84C', marginBottom: 24 }}>✦</div>
        <h1 className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.08em', marginBottom: 16 }}>Booking Confirmed</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#D4C4A0', lineHeight: 1.75, marginBottom: 12 }}>
          Thank you. Your session has been reserved and a confirmation has been sent to your email.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#D4C4A0', opacity: 0.7, lineHeight: 1.75, marginBottom: 40 }}>
          Star and her team look forward to welcoming you.
        </p>
        <Link href="/" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#080808', background: 'linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A)', padding: '18px 48px', textDecoration: 'none', display: 'inline-block' }}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
