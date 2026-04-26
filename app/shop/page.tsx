'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, CATEGORIES, type Product, type Category } from '@/lib/products'

/* ── Shared design tokens (match main site) ── */
const BLACK = '#080808'
const BLACK2 = '#0e0e0e'
const GOLD = '#C9A84C'
const CREAM = '#F5EDD6'
const CREAM_MUTED = '#D4C4A0'
const ROSE = '#8B3A52'
const HEAD_FONT = "'Cinzel', serif"
const BODY_FONT = "'Cormorant Garamond', Georgia, serif"
const PX = 'clamp(16px, 5vw, 40px)'

/* ── Cart types ── */
interface CartItem {
  product: Product
  quantity: number
}

/* ── Order form type ── */
interface OrderForm {
  fullName: string
  email: string
  phone: string
  address: string
  apt: string
  city: string
  state: string
  zip: string
  contactMethod: 'email' | 'phone' | 'text'
  notes: string
}

const EMPTY_FORM: OrderForm = {
  fullName: '', email: '', phone: '', address: '', apt: '',
  city: '', state: '', zip: '', contactMethod: 'email', notes: '',
}

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close cart/modal on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false)
      }
    }
    if (cartOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [cartOpen])

  /* Lock body scroll when overlay open */
  useEffect(() => {
    document.body.style.overflow = (cartOpen || quickView || checkoutOpen || mobileOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen, quickView, checkoutOpen, mobileOpen])

  /* ── Filtered products ── */
  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  const featured = useMemo(() => PRODUCTS.filter(p => p.featured), [])

  /* ── Cart helpers ── */
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartSubtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
  }

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id))
  }

  /* ── Form validation ── */
  const validate = (): boolean => {
    const e: Partial<OrderForm> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    if (!validate()) return

    const order = {
      customer: form,
      items: cart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        weight: i.product.weight,
        lineTotal: +(i.product.price * i.quantity).toFixed(2),
      })),
      subtotal: +cartSubtotal.toFixed(2),
      shipping: 'TBD -- Dolce Vida will confirm shipping cost',
      total: 'TBD -- Dolce Vida will confirm total',
      timestamp: new Date().toISOString(),
      status: 'pending fulfillment',
    }

    // TODO: Replace console.log with production integration:
    // - Supabase: await supabase.from('orders').insert(order)
    // - Email automation: await sendOrderEmail(order)
    // - Stripe: create PaymentIntent after manual confirmation
    // - CRM: await crmWebhook(order)
    // - Webhook: await fetch('/api/orders', { method: 'POST', body: JSON.stringify(order) })
    console.log('[Dolce Vida] Order submitted:', order)

    setSubmitted(true)
    setCart([])
  }

  /* ── Reusable label ── */
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.55rem,2vw,0.65rem)', letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 12 }}>{children}</span>
  )

  /* ── Product card ── */
  const ProductCard = ({ product }: { product: Product }) => (
    <div
      style={{
        background: BLACK2,
        border: '1px solid rgba(201,168,76,0.1)',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.3s, transform 0.3s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.4)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.1)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {product.featured && (
          <span style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 8px', fontWeight: 700 }}>Featured</span>
        )}
        {product.inventory <= 5 && (
          <span style={{ background: ROSE, color: CREAM, fontFamily: HEAD_FONT, fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 8px' }}>Low Stock</span>
        )}
      </div>

      {/* Image */}
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}
        onClick={() => setQuickView(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Info */}
      <div style={{ padding: 'clamp(14px,3vw,20px)', display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
        <span style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, opacity: 0.8 }}>{product.category} &middot; {product.weight}</span>
        <h3
          style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.85rem,2.5vw,1rem)', letterSpacing: '0.06em', color: CREAM, lineHeight: 1.3, cursor: 'pointer' }}
          onClick={() => setQuickView(product)}
        >{product.name}</h3>
        <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.9rem,2vw,0.95rem)', color: CREAM_MUTED, lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <span style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1rem,3vw,1.15rem)', color: GOLD, letterSpacing: '0.05em' }}>{product.formattedPrice}</span>
          <button
            onClick={() => addToCart(product)}
            style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '10px 14px', cursor: 'pointer', fontWeight: 700, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Add to Cart</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '80px 24px 40px' }}>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: GOLD, fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1, padding: 10 }}>&#x2715;</button>
          {[['About', '/#about'], ['Services', '/services'], ['Shop', '/shop'], ['The Book', '/#book-section'], ['Reviews', '/#testimonials'], ['Contact', '/#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1rem,5vw,1.3rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: label === 'Shop' ? GOLD : CREAM, textDecoration: 'none' }}>{label}</a>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)} style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px 36px', textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}>Book a Reading</Link>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${scrolled ? '10px' : '14px'} ${PX}`, background: scrolled ? 'rgba(8,8,8,0.95)' : 'rgba(8,8,8,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(201,168,76,0.18)', transition: 'all 0.4s ease', gap: 12 }}>
        <Link href="/" style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(0.85rem,4vw,1.3rem)', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none', flexShrink: 0, background: 'linear-gradient(105deg,#8B6914,#C9A84C,#F5D778,#C9A84C,#8B6914)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dolce Vida</Link>
        <ul className="hidden md:flex" style={{ gap: 28, listStyle: 'none', flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
          {[['About', '/#about'], ['Services', '/services'], ['Shop', '/shop'], ['The Book', '/#book-section'], ['Reviews', '/#testimonials'], ['Contact', '/#contact']].map(([label, href]) => (
            <li key={label}>
              <a href={href} className={`nav-link${label === 'Shop' ? ' nav-link-gold' : ''}`}>{label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setCartOpen(true)} aria-label={`Cart (${cartCount})`} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: CREAM, fontFamily: HEAD_FONT, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '9px 14px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>
            Cart
            {cartCount > 0 && (
              <span style={{ background: GOLD, color: BLACK, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, fontFamily: HEAD_FONT }}>{cartCount}</span>
            )}
          </button>
          <Link href="/book" className="hidden md:inline-block" style={{ padding: '11px 22px', fontSize: '0.62rem', fontFamily: HEAD_FONT, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'linear-gradient(135deg,#8B6914,#C9A84C)', color: BLACK, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>Book Now</Link>
          <button onClick={() => setMobileOpen(true)} className="flex md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }} aria-label="Open menu">
            {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 26, height: 2, background: GOLD, borderRadius: 1 }} />)}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 'clamp(100px,15vw,140px)', paddingBottom: 'clamp(48px,8vw,80px)', paddingLeft: PX, paddingRight: PX, textAlign: 'center', background: BLACK, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <SectionLabel>The Boutique</SectionLabel>
        <h1 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(2rem,8vw,4rem)', letterSpacing: '0.06em', color: CREAM, lineHeight: 1.1, marginBottom: 16 }}>
          <span style={{ background: 'linear-gradient(105deg,#3d2000,#8B6914,#C9A84C,#F5D778,#FFE999,#C9A84C,#8B6914)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sacred Objects</span>
          <br />for the Modern Mystic
        </h1>
        <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.2rem)', color: CREAM_MUTED, maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.75 }}>
          Each piece is intention-crafted. Choose what calls to you.
        </p>
        {/* Search */}
        <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
          <input
            type="search"
            placeholder="Search candles, jewelry, accessories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)', color: CREAM, fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1.05rem)', padding: '16px 48px 16px 20px', outline: 'none', boxSizing: 'border-box', borderRadius: 0, WebkitAppearance: 'none' }}
          />
          <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', color: GOLD, fontSize: '1rem', pointerEvents: 'none' }}>&#9679;</span>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <div style={{ background: BLACK2, borderBottom: '1px solid rgba(201,168,76,0.1)', padding: `16px ${PX}`, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '10px 20px', border: `1px solid ${activeCategory === cat ? GOLD : 'rgba(201,168,76,0.2)'}`, background: activeCategory === cat ? 'rgba(201,168,76,0.12)' : 'transparent', color: activeCategory === cat ? GOLD : CREAM_MUTED, cursor: 'pointer', transition: 'all 0.25s' }}
          >{cat}</button>
        ))}
      </div>

      {/* ── FEATURED ── */}
      {activeCategory === 'All' && search.trim() === '' && (
        <section style={{ padding: `clamp(48px,8vw,80px) ${PX}`, background: BLACK }}>
          <SectionLabel>Featured</SectionLabel>
          <h2 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.4rem,5vw,2.4rem)', letterSpacing: '0.06em', color: CREAM, textAlign: 'center', marginBottom: 'clamp(28px,5vw,48px)' }}>Curated for You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(260px,100%),1fr))', gap: 16, maxWidth: 1200, margin: '0 auto' }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── FULL CATALOG ── */}
      <section style={{ padding: `clamp(48px,8vw,80px) ${PX}`, background: BLACK2 }}>
        {activeCategory === 'All' && search.trim() === '' && (
          <>
            <SectionLabel>Full Collection</SectionLabel>
            <h2 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.4rem,5vw,2.4rem)', letterSpacing: '0.06em', color: CREAM, textAlign: 'center', marginBottom: 'clamp(28px,5vw,48px)' }}>All Products</h2>
          </>
        )}
        {search.trim() !== '' && (
          <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.9rem,2vw,1rem)', color: CREAM_MUTED, textAlign: 'center', marginBottom: 32 }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
        )}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.65rem,2vw,0.75rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>No Results</p>
            <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: '1.1rem', color: CREAM_MUTED }}>Nothing matches your search. Try a different keyword or browse all categories.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }} style={{ marginTop: 24, background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: CREAM_MUTED, fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '12px 24px', cursor: 'pointer' }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(260px,100%),1fr))', gap: 16, maxWidth: 1200, margin: '0 auto' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* ── MANUAL FULFILLMENT NOTICE ── */}
      <div style={{ background: BLACK, borderTop: '1px solid rgba(201,168,76,0.1)', padding: `clamp(24px,5vw,40px) ${PX}`, textAlign: 'center' }}>
        <p style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Manual Order Fulfillment</p>
        <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(0.95rem,2.5vw,1.05rem)', color: CREAM_MUTED, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          All orders are personally fulfilled by Dolce Vida. After submitting your request, we will contact you to confirm payment, shipping, and delivery details.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer-safe" style={{ background: BLACK2, borderTop: '1px solid rgba(201,168,76,0.1)', padding: `clamp(36px,6vw,48px) ${PX}`, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(1rem,5vw,1.4rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10, background: 'linear-gradient(105deg,#8B6914,#C9A84C,#F5D778,#C9A84C)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dolce Vida</p>
        <nav className="footer-nav" style={{ marginBottom: 20 }}>
          {[['About', '/#about'], ['Services', '/services'], ['Shop', '/shop'], ['Book', '/book'], ['Contact', '/#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(0.58rem,2.5vw,0.68rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: CREAM_MUTED, textDecoration: 'none', opacity: 0.6 }}>{label}</a>
          ))}
        </nav>
        <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(0.8rem,3vw,0.88rem)', color: CREAM_MUTED, opacity: 0.3 }}>2026 Dolce Vida - Star Monreal - Reno, NV</p>
      </footer>

      {/* ── QUICK VIEW MODAL ── */}
      {quickView && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.9)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }} onClick={() => setQuickView(null)}>
          <div style={{ background: BLACK2, border: '1px solid rgba(201,168,76,0.2)', maxWidth: 700, width: '100%', display: 'grid', gridTemplateColumns: '1fr', overflow: 'hidden', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setQuickView(null)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: GOLD, fontSize: '1.4rem', cursor: 'pointer', zIndex: 2, lineHeight: 1 }}>&#x2715;</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', background: 'rgba(255,255,255,0.02)', minHeight: 240 }}>
                <Image src={quickView.image} alt={quickView.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'clamp(24px,5vw,40px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <span style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, opacity: 0.8 }}>{quickView.category} &middot; {quickView.weight}</span>
                  <h2 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1rem,4vw,1.4rem)', letterSpacing: '0.06em', color: CREAM, marginTop: 8, lineHeight: 1.3 }}>{quickView.name}</h2>
                </div>
                <p style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.2rem,4vw,1.5rem)', color: GOLD }}>{quickView.formattedPrice}</p>
                <p style={{ fontFamily: BODY_FONT, fontSize: 'clamp(1rem,2.5vw,1.05rem)', color: CREAM_MUTED, lineHeight: 1.75 }}>{quickView.description}</p>
                <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: '0.9rem', color: CREAM_MUTED, opacity: 0.6 }}>{quickView.shippingNote}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
                  {quickView.tags.map(t => (
                    <span key={t} style={{ fontFamily: HEAD_FONT, fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: CREAM_MUTED, border: '1px solid rgba(201,168,76,0.15)', padding: '4px 8px', opacity: 0.7 }}>{t}</span>
                  ))}
                </div>
                <button
                  onClick={() => { addToCart(quickView); setQuickView(null) }}
                  style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', cursor: 'pointer', fontWeight: 700, marginTop: 8 }}
                >Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.7)', zIndex: 250 }}>
          <div
            ref={cartRef}
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)', background: BLACK2, borderLeft: '1px solid rgba(201,168,76,0.15)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
          >
            {/* Cart header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Your Cart</p>
                <p style={{ fontFamily: BODY_FONT, fontSize: '0.9rem', color: CREAM_MUTED, marginTop: 2 }}>{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart" style={{ background: 'none', border: 'none', color: GOLD, fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>&#x2715;</button>
            </div>

            {/* Cart items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>Empty</p>
                  <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', color: CREAM_MUTED }}>Your cart is empty. Add something sacred.</p>
                  <button onClick={() => setCartOpen(false)} style={{ marginTop: 20, background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: CREAM_MUTED, fontFamily: HEAD_FONT, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '12px 20px', cursor: 'pointer' }}>Continue Browsing</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cart.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                      <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0, background: 'rgba(255,255,255,0.02)' }}>
                        <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: HEAD_FONT, fontSize: '0.7rem', letterSpacing: '0.06em', color: CREAM, lineHeight: 1.3, marginBottom: 4 }}>{item.product.name}</p>
                        <p style={{ fontFamily: HEAD_FONT, fontSize: '0.85rem', color: GOLD, marginBottom: 10 }}>{item.product.formattedPrice}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <button onClick={() => updateQty(item.product.id, -1)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: CREAM, fontFamily: HEAD_FONT, width: 30, height: 30, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                          <span style={{ fontFamily: HEAD_FONT, fontSize: '0.8rem', color: CREAM, width: 34, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.product.id, 1)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: CREAM, fontFamily: HEAD_FONT, width: 30, height: 30, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                          <button onClick={() => removeItem(item.product.id)} style={{ marginLeft: 10, background: 'none', border: 'none', color: CREAM_MUTED, fontFamily: BODY_FONT, fontSize: '0.85rem', cursor: 'pointer', opacity: 0.5 }}>Remove</button>
                        </div>
                      </div>
                      <p style={{ fontFamily: HEAD_FONT, fontSize: '0.85rem', color: CREAM, flexShrink: 0 }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart footer */}
            {cart.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(201,168,76,0.1)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: BODY_FONT, color: CREAM_MUTED }}>Subtotal</span>
                  <span style={{ fontFamily: HEAD_FONT, color: CREAM }}>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontFamily: BODY_FONT, color: CREAM_MUTED }}>Shipping</span>
                  <span style={{ fontFamily: BODY_FONT, fontStyle: 'italic', color: CREAM_MUTED, opacity: 0.6 }}>Confirmed at checkout</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}
                  style={{ width: '100%', background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', cursor: 'pointer', fontWeight: 700 }}
                >Request Order</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CHECKOUT / ORDER FORM ── */}
      {checkoutOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.92)', zIndex: 300, overflowY: 'auto', padding: '40px 16px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', background: BLACK2, border: '1px solid rgba(201,168,76,0.18)', padding: 'clamp(24px,6vw,48px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <SectionLabel>Order Request</SectionLabel>
                <h2 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.2rem,5vw,1.8rem)', letterSpacing: '0.06em', color: CREAM }}>Complete Your Order</h2>
              </div>
              <button onClick={() => setCheckoutOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: GOLD, fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>&#x2715;</button>
            </div>

            {submitted ? (
              /* ── ORDER CONFIRMATION ── */
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', border: `2px solid ${GOLD}`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: GOLD, fontSize: '1.6rem' }}>&#10003;</span>
                </div>
                <p style={{ fontFamily: HEAD_FONT, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>Order Received</p>
                <h3 style={{ fontFamily: HEAD_FONT, fontSize: 'clamp(1.2rem,5vw,1.6rem)', color: CREAM, marginBottom: 16, lineHeight: 1.3 }}>Thank You</h3>
                <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.1rem)', color: CREAM_MUTED, lineHeight: 1.8, maxWidth: 480, margin: '0 auto 28px' }}>
                  Your order request has been received. Dolce Vida will contact you shortly to confirm payment, shipping, and fulfillment.
                </p>
                <button onClick={() => { setSubmitted(false); setCheckoutOpen(false); setForm(EMPTY_FORM) }} style={{ background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px 32px', cursor: 'pointer', fontWeight: 700 }}>Continue Shopping</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Order summary */}
                <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)', padding: 'clamp(16px,4vw,24px)', marginBottom: 28 }}>
                  <p style={{ fontFamily: HEAD_FONT, fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>Order Summary</p>
                  {cart.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontFamily: BODY_FONT, color: CREAM_MUTED, fontSize: '0.95rem' }}>{item.product.name} &times; {item.quantity}</span>
                      <span style={{ fontFamily: HEAD_FONT, color: CREAM, fontSize: '0.85rem' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: CREAM }}>Subtotal</span>
                    <span style={{ fontFamily: HEAD_FONT, color: GOLD }}>${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Helper for field */}
                {(() => {
                  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: keyof OrderForm; type?: string; placeholder?: string }) => (
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: errors[field] ? '#c0392b' : GOLD, display: 'block', marginBottom: 6 }}>{label}{errors[field] ? ` -- ${errors[field]}` : ''}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field] as string}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? '#c0392b' : 'rgba(201,168,76,0.2)'}`, color: CREAM, fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1rem)', padding: '14px 16px', outline: 'none', boxSizing: 'border-box', borderRadius: 0, WebkitAppearance: 'none' }}
                      />
                    </div>
                  )

                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                        <Field label="Full Name" field="fullName" placeholder="Star Monreal" />
                        <Field label="Email" field="email" type="email" placeholder="you@email.com" />
                      </div>
                      <Field label="Phone (optional)" field="phone" type="tel" placeholder="+1 (775) 000-0000" />
                      <Field label="Shipping Address" field="address" placeholder="123 Main Street" />
                      <Field label="Apartment / Unit (optional)" field="apt" placeholder="Apt 4B" />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', gap: 12 }}>
                        <Field label="City" field="city" placeholder="Reno" />
                        <Field label="State" field="state" placeholder="NV" />
                        <Field label="ZIP" field="zip" placeholder="89501" />
                      </div>
                    </>
                  )
                })()}

                {/* Preferred contact */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 8 }}>Preferred Contact Method</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {(['email', 'phone', 'text'] as const).map(m => (
                      <button key={m} type="button" onClick={() => setForm(f => ({ ...f, contactMethod: m }))} style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'capitalize', padding: '10px 18px', border: `1px solid ${form.contactMethod === m ? GOLD : 'rgba(201,168,76,0.2)'}`, background: form.contactMethod === m ? 'rgba(201,168,76,0.12)' : 'transparent', color: form.contactMethod === m ? GOLD : CREAM_MUTED, cursor: 'pointer', transition: 'all 0.2s' }}>{m}</button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontFamily: HEAD_FONT, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 6 }}>Notes / Custom Request</label>
                  <textarea
                    rows={3}
                    placeholder="Any special instructions, personalization notes, or questions..."
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', color: CREAM, fontFamily: BODY_FONT, fontSize: 'clamp(1rem,3vw,1rem)', padding: '14px 16px', outline: 'none', resize: 'vertical', minHeight: 80, boxSizing: 'border-box', borderRadius: 0 }}
                  />
                </div>

                {/* Hidden serialized order for future backend */}
                <input type="hidden" name="orderData" value={JSON.stringify({ items: cart, subtotal: cartSubtotal, timestamp: new Date().toISOString() })} />

                <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '20px', cursor: 'pointer', fontWeight: 700 }}>
                  Submit Order Request
                </button>
                <p style={{ fontFamily: BODY_FONT, fontStyle: 'italic', fontSize: '0.88rem', color: CREAM_MUTED, opacity: 0.5, textAlign: 'center', marginTop: 12 }}>No payment is charged now. Dolce Vida will reach out to confirm everything.</p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating cart button on mobile */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label={`View cart (${cartCount} items)`}
          style={{ position: 'fixed', bottom: 'max(24px, env(safe-area-inset-bottom, 24px))', right: 20, zIndex: 150, background: 'linear-gradient(135deg,#8B6914,#C9A84C)', border: 'none', color: BLACK, fontFamily: HEAD_FONT, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 20px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 8px 30px rgba(201,168,76,0.35)', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          Cart
          <span style={{ background: BLACK, color: GOLD, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>{cartCount}</span>
        </button>
      )}
    </>
  )
}
