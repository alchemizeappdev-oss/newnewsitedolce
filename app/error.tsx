'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#080808',
      color: '#F5EDD6',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      textAlign: 'center',
      padding: '20px',
    }}>
      <h2 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        marginBottom: '16px',
        color: '#C9A84C',
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        marginBottom: '24px',
        color: '#D4C4A0',
        maxWidth: '400px',
      }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: 'linear-gradient(135deg, #8B6914, #C9A84C)',
          border: 'none',
          color: '#080808',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          padding: '14px 32px',
          cursor: 'pointer',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
