// Image drop-in ready: replace image paths only when product photos are available.

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  formattedPrice: string
  weight: string
  category: 'Candles' | 'Accessories' | 'Jewelry'
  image: string
  description: string
  inventory: number
  featured: boolean
  tags: string[]
  shippingNote: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'tarot-moon-candle',
    name: 'Tarot Moon Candle',
    slug: 'tarot-moon-candle',
    price: 16.66,
    formattedPrice: '$16.66',
    weight: '8 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tarot-moon-candle-IuzYCxQttZzZxJ3bqMlwUDTQ00MJlx.jpg',
    description: 'A mystical moon-inspired candle created for intuition, emotional clarity, reflection, and feminine energy. Perfect for altar work, journaling, moon rituals, and peaceful evening resets.',
    inventory: 12,
    featured: true,
    tags: ['moon', 'intuition', 'ritual', 'feminine', 'altar'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'tarot-sun-candle',
    name: 'Tarot Sun Candle',
    slug: 'tarot-sun-candle',
    price: 16.66,
    formattedPrice: '$16.66',
    weight: '8 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tarot-sun-candle-WDN6sCq3wb7JigKDI4WVvu1979BVb8.jpg',
    description: 'A radiant sun-inspired candle made for confidence, motivation, clarity, and warm energetic protection. Designed for morning rituals, manifestation work, and uplifting the energy of any room.',
    inventory: 10,
    featured: true,
    tags: ['sun', 'confidence', 'manifestation', 'morning', 'energy'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'main-character-energy-candle',
    name: 'Main Character Energy Candle',
    slug: 'main-character-energy-candle',
    price: 16.66,
    formattedPrice: '$16.66',
    weight: '8 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/famous-taylor-swift-candle-TG4FqwmzGPSNdeUlljIz0mLKFnIIjJ.jpg',
    description: 'A playful fame-and-glamour inspired intention candle created for confidence, visibility, luxury energy, and main-character manifestation.',
    inventory: 8,
    featured: true,
    tags: ['glamour', 'confidence', 'visibility', 'luxury', 'manifestation'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'creative-spotlight-candle',
    name: 'Creative Spotlight Candle',
    slug: 'creative-spotlight-candle',
    price: 16.66,
    formattedPrice: '$16.66',
    weight: '8 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/famous-paris-hilton-candle-iiCWxR4H8iNxiNIjxJqjj0ZjJhp1C3.jpg',
    description: 'A fame-inspired intention candle created for creative confidence, public recognition, artistic momentum, and stepping into the spotlight.',
    inventory: 7,
    featured: false,
    tags: ['creativity', 'spotlight', 'recognition', 'artistic', 'confidence'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'dark-feminine-glamour-candle',
    name: 'Dark Feminine Glamour Candle',
    slug: 'dark-feminine-glamour-candle',
    price: 16.66,
    formattedPrice: '$16.66',
    weight: '8 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/famous-morticia-addams-candle-zzdIl9p4LMfdnmefWRR0oy1Ltsq4eR.jpg',
    description: 'A dark feminine candle inspired by elegance, mystery, magnetism, and timeless gothic glamour. Perfect for confidence rituals and bold personal energy.',
    inventory: 9,
    featured: true,
    tags: ['dark feminine', 'mystery', 'glamour', 'gothic', 'magnetism'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'poppets-candle',
    name: 'Poppets Candle',
    slug: 'poppets-candle',
    price: 24.44,
    formattedPrice: '$24.44',
    weight: '10 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poppets-candle-m52f2SADRoK5RciYdDaa2K003MGCOk.jpg',
    description: 'A spiritual poppet-style candle designed for focused intention work, personal energy rituals, protection, attraction, and symbolic manifestation.',
    inventory: 5,
    featured: false,
    tags: ['poppet', 'intention', 'protection', 'attraction', 'ritual'],
    shippingNote: 'Ships within 3-5 business days. Handle with care.',
  },
  {
    id: 'poppet-spell-kit-candle',
    name: 'Poppet Spell Kit Candle',
    slug: 'poppet-spell-kit-candle',
    price: 34.44,
    formattedPrice: '$34.44',
    weight: '14 oz',
    category: 'Candles',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poppet-spell-kit-candle-MidDdo2tCRg3536yvOCDnzNUuknbkN.jpg',
    description: 'A complete poppet-inspired spell candle kit designed for deeper intention work. Includes a premium ritual-style candle presentation with space for kit contents, instructions, and personalization notes.',
    inventory: 3,
    featured: true,
    tags: ['spell kit', 'poppet', 'ritual', 'intention', 'personalized'],
    shippingNote: 'Ships within 5-7 business days. Handcrafted to order.',
  },
  {
    id: 'mystic-charm-keychain',
    name: 'Mystic Charm Keychain',
    slug: 'mystic-charm-keychain',
    price: 12.99,
    formattedPrice: '$12.99',
    weight: '2 oz',
    category: 'Accessories',
    image: '/products/mystic-charm-keychain.jpg',
    description: 'A small mystical-style charm keychain accessory made for personal style, gifting, and everyday spiritual flair.',
    inventory: 20,
    featured: false,
    tags: ['keychain', 'charm', 'gift', 'accessory', 'mystical'],
    shippingNote: 'Ships within 2-3 business days.',
  },
  {
    id: 'crystal-necklace-rose-wrapped',
    name: 'Crystal Necklace -- Rose Wrapped',
    slug: 'crystal-necklace-rose-wrapped',
    price: 14.44,
    formattedPrice: '$14.44',
    weight: '3 oz',
    category: 'Jewelry',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crystal-necklace-rose-wrapped-Yaj85PN6KmJQPxakJ0HqPCTAb7Nj9N.jpg',
    description: 'A rose-wrapped crystal necklace designed as a soft spiritual accessory for beauty, protection, love energy, and everyday wearable intention.',
    inventory: 15,
    featured: false,
    tags: ['crystal', 'necklace', 'rose', 'protection', 'love'],
    shippingNote: 'Ships within 2-3 business days.',
  },
]

export const CATEGORIES = ['All', 'Candles', 'Accessories', 'Jewelry'] as const
export type Category = typeof CATEGORIES[number]
