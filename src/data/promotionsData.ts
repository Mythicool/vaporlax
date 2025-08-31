export interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  code?: string
  validUntil: Date
  image: string
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping'
  featured: boolean
  category?: string
}

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Cyber Monday Mega Sale',
    description: 'Massive discounts on all premium vaping devices and accessories. Limited time only!',
    discount: '40% OFF',
    code: 'CYBER40',
    validUntil: new Date('2024-12-31'),
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
    type: 'percentage',
    featured: true,
    category: 'Devices'
  },
  {
    id: '2',
    title: 'Free Shipping Weekend',
    description: 'Free shipping on all orders, no minimum purchase required. Perfect for trying new flavors!',
    discount: 'FREE SHIPPING',
    code: 'FREESHIP',
    validUntil: new Date('2024-12-15'),
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop',
    type: 'free_shipping',
    featured: true
  },
  {
    id: '3',
    title: 'Buy 2 Get 1 Free Disposables',
    description: 'Mix and match any disposable vapes. Perfect for stocking up on your favorites!',
    discount: 'BUY 2 GET 1',
    code: 'BOGO3',
    validUntil: new Date('2024-12-20'),
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    type: 'bogo',
    featured: false,
    category: 'Disposables'
  },
  {
    id: '4',
    title: 'New Customer Special',
    description: 'First-time customers get an exclusive discount plus a free starter kit guide!',
    discount: '25% OFF',
    code: 'WELCOME25',
    validUntil: new Date('2024-12-31'),
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    type: 'percentage',
    featured: true,
    category: 'New Customer'
  },
  {
    id: '5',
    title: 'Loyalty Rewards Double Points',
    description: 'VaporLAX Rewards members earn double points on all purchases this week!',
    discount: '2X POINTS',
    validUntil: new Date('2024-12-10'),
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    type: 'fixed',
    featured: false,
    category: 'Loyalty'
  },
  {
    id: '6',
    title: 'Bundle Deal Bonanza',
    description: 'Save big when you buy device + e-liquid bundles. Perfect starter combinations!',
    discount: '$15 OFF',
    code: 'BUNDLE15',
    validUntil: new Date('2024-12-25'),
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    type: 'fixed',
    featured: false,
    category: 'Bundles'
  }
]

export const getFeaturedPromotions = (): Promotion[] => {
  return promotions.filter(promo => promo.featured)
}

export const getActivePromotions = (): Promotion[] => {
  const now = new Date()
  return promotions.filter(promo => promo.validUntil > now)
}

export const getPromotionByCode = (code: string): Promotion | undefined => {
  return promotions.find(promo => promo.code === code)
}