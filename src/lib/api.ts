import { Product, RawProduct, CartItem } from '@/types'
import rawProductsData from '@/data/products.json'

// Safe price parsing function
const parsePrice = (price: any): number => {
  // Handle null, undefined, or empty values
  if (price === null || price === undefined || price === '') {
    return 0
  }

  // If already a number, return it
  if (typeof price === 'number') {
    return isNaN(price) ? 0 : price
  }

  // If it's a string, clean it and parse
  if (typeof price === 'string') {
    // Remove currency symbols, spaces, and other non-numeric characters except decimal point
    const cleanPrice = price.replace(/[^0-9.]/g, '')
    const parsed = parseFloat(cleanPrice)
    return isNaN(parsed) ? 0 : parsed
  }

  // Fallback for any other type
  return 0
}

// Transform raw product data to expected Product interface
const transformProduct = (rawProduct: RawProduct, index: number): Product => {
  // Mark first few products as featured for display purposes
  const isFeatured = index < 4

  return {
    id: rawProduct.id,
    name: rawProduct.name,
    description: rawProduct.description || 'Premium disposable vape with exceptional flavor and performance.',
    price: parsePrice(rawProduct.price),
    image: rawProduct.image || `https://via.placeholder.com/400x400/ff71ce/ffffff?text=${encodeURIComponent(rawProduct.name || 'VaporLAX')}`,
    images: rawProduct.image ? [rawProduct.image] : [`https://via.placeholder.com/400x400/ff71ce/ffffff?text=${encodeURIComponent(rawProduct.name || 'VaporLAX')}`],
    category: rawProduct.category || 'Disposable',
    inStock: (rawProduct.stock || 0) > 0,
    featured: isFeatured,
    variants: [], // No variants in current data
    specifications: [
      { name: 'Stock', value: rawProduct.stock?.toString() || '0' },
      { name: 'Category', value: rawProduct.category || 'Disposable' },
      { name: 'Type', value: 'Disposable Vape' },
      { name: 'Nicotine', value: '5% (50mg)' } // Standard for disposables
    ]
  }
}

// Transform all products with error handling
const productsData: Product[] = (() => {
  try {
    const rawProducts = rawProductsData as RawProduct[]
    console.log(`🔄 Transforming ${rawProducts.length} products...`)

    const transformedProducts = rawProducts.map((product, index) => {
      try {
        return transformProduct(product, index)
      } catch (error) {
        console.error(`❌ Error transforming product at index ${index}:`, product, error)
        // Return a fallback product to prevent complete failure
        return {
          id: product.id || `fallback-${index}`,
          name: product.name || 'Unknown Product',
          description: 'Product data unavailable',
          price: 0,
          image: `https://via.placeholder.com/400x400/ff71ce/ffffff?text=Error`,
          images: [`https://via.placeholder.com/400x400/ff71ce/ffffff?text=Error`],
          category: 'Unknown',
          inStock: false,
          featured: false,
          variants: [],
          specifications: []
        } as Product
      }
    })

    console.log(`✅ Successfully transformed ${transformedProducts.length} products`)
    return transformedProducts
  } catch (error) {
    console.error('❌ Critical error in product transformation:', error)
    return []
  }
})()

// Simulate API delay for realistic loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Product API functions
export const getProducts = async (): Promise<Product[]> => {
  await delay(500) // Simulate network delay
  return productsData
}

export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(300)
  const product = productsData.find(p => p.id === id)
  return product || null
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(400)
  return productsData.filter(product => product.featured)
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(400)
  return productsData.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  )
}

export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(500)
  const searchTerm = query.toLowerCase()
  return productsData.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  )
}

// Stripe Checkout API functions
export const createCheckoutSession = async (cartItems: CartItem[]): Promise<string> => {
  try {
    // In a real application, this would make a request to your backend
    // which would then create a Stripe checkout session
    
    // Prepare line items for Stripe (would be used in real implementation)
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Simulate API call to backend
    await delay(1000)

    // Log line items for demo purposes
    console.log('Demo checkout with items:', lineItems)

    // For demo purposes, we'll return a mock checkout URL
    // In production, this would be the actual Stripe checkout session URL
    const mockSessionId = `cs_test_${Date.now()}`
    const checkoutUrl = `https://checkout.stripe.com/pay/${mockSessionId}`
    
    return checkoutUrl
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

// Newsletter subscription
export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    await delay(800)
    
    // Simulate API call to newsletter service
    console.log('Subscribing email to newsletter:', email)
    
    // In a real app, you would integrate with a service like Mailchimp, ConvertKit, etc.
    return true
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return false
  }
}

// Contact form submission
export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> => {
  try {
    await delay(1000)
    
    // Simulate API call to contact form handler
    console.log('Submitting contact form:', formData)
    
    // In a real app, you would send this to your backend or a service like Formspree
    return true
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return false
  }
}

// Utility functions for price formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal * taxRate
}

export const calculateShipping = (subtotal: number): number => {
  // Free shipping over $50
  return subtotal >= 50 ? 0 : 5.99
}

export const calculateTotal = (subtotal: number): number => {
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  return subtotal + tax + shipping
}

// Age verification (required for vape products)
export const verifyAge = async (birthDate: string): Promise<boolean> => {
  try {
    await delay(500)
    
    const birth = new Date(birthDate)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 21
    }
    
    return age >= 21
  } catch (error) {
    console.error('Error verifying age:', error)
    return false
  }
}

// Error handling utility
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic API wrapper with error handling
export const apiCall = async <T>(
  apiFunction: () => Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T> => {
  try {
    return await apiFunction()
  } catch (error) {
    console.error(errorMessage, error)
    throw new ApiError(errorMessage)
  }
}
