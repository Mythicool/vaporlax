import { loadStripe, Stripe } from '@stripe/stripe-js'
import { CartItem } from '@/types'

// Initialize Stripe
let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      console.warn('Stripe publishable key not found. Using demo mode.')
      // Return a mock for demo purposes
      stripePromise = Promise.resolve(null)
    } else {
      stripePromise = loadStripe(publishableKey)
    }
  }
  return stripePromise
}

// Create checkout session
export const createStripeCheckoutSession = async (cartItems: CartItem[]) => {
  try {
    // In a real application, this would be an API call to your backend
    // Your backend would create the Stripe checkout session and return the session ID
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
              description: item.product.description,
              images: [item.product.image],
              metadata: {
                product_id: item.product.id,
                category: item.product.category,
              },
            },
            unit_amount: Math.round(item.product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        })),
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cart`,
        metadata: {
          order_type: 'vape_products',
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    return sessionId
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Redirect to Stripe Checkout
export const redirectToCheckout = async (cartItems: CartItem[]) => {
  try {
    const stripe = await getStripe()
    
    if (!stripe) {
      // Demo mode - simulate checkout
      console.log('Demo mode: Simulating Stripe checkout with items:', cartItems)
      
      // Calculate total for demo
      const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      
      // Simulate checkout delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo, we'll just show an alert and redirect
      alert(`Demo Checkout Complete!\nTotal: $${total.toFixed(2)}\n\nIn production, this would redirect to Stripe Checkout.`)
      
      return { success: true, demo: true }
    }

    // Real Stripe integration
    const sessionId = await createStripeCheckoutSession(cartItems)
    
    const result = await stripe.redirectToCheckout({
      sessionId,
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return { success: true, demo: false }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

// Verify payment success (for success page)
export const verifyPaymentSuccess = async (sessionId: string) => {
  try {
    const response = await fetch(`/api/verify-payment?session_id=${sessionId}`)
    
    if (!response.ok) {
      throw new Error('Failed to verify payment')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

// Stripe webhook handler types (for backend reference)
export interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
}

// Common Stripe event types for vape shop
export const STRIPE_EVENTS = {
  CHECKOUT_SESSION_COMPLETED: 'checkout.session.completed',
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
} as const

// Age verification for Stripe metadata
export const addAgeVerificationToMetadata = (metadata: Record<string, string>) => {
  return {
    ...metadata,
    age_verified: 'true',
    product_type: 'vape_products',
    requires_age_verification: 'true',
    minimum_age: '21',
  }
}

// Format price for Stripe (convert to cents)
export const formatPriceForStripe = (price: number): number => {
  return Math.round(price * 100)
}

// Format price from Stripe (convert from cents)
export const formatPriceFromStripe = (priceInCents: number): number => {
  return priceInCents / 100
}

// Validate Stripe environment
export const validateStripeEnvironment = (): boolean => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    console.warn('Stripe configuration missing. Running in demo mode.')
    return false
  }
  
  if (publishableKey.startsWith('pk_test_')) {
    console.log('Stripe running in test mode')
    return true
  }
  
  if (publishableKey.startsWith('pk_live_')) {
    console.log('Stripe running in live mode')
    return true
  }
  
  console.error('Invalid Stripe publishable key format')
  return false
}

// Initialize Stripe on app load
export const initializeStripe = async () => {
  const isValid = validateStripeEnvironment()
  
  if (isValid) {
    try {
      const stripe = await getStripe()
      if (stripe) {
        console.log('Stripe initialized successfully')
      }
    } catch (error) {
      console.error('Failed to initialize Stripe:', error)
    }
  }
}

export default getStripe
