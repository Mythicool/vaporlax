import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, AlertCircle } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { redirectToCheckout } from '@/lib/stripe'
import LoadingSpinner from '../ui/LoadingSpinner'

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen)

  const handleCheckout = async () => {
    if (cart.items.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      // Use Stripe checkout integration
      const result = await redirectToCheckout(cart.items)

      if (result.success) {
        if (result.demo) {
          // Demo mode - clear cart after successful demo checkout
          clearCart()
          setCartDrawerOpen(false)
        }
        // In real Stripe mode, the user will be redirected to Stripe
        // and the cart will be cleared after successful payment
      }

    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to initiate checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.items.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {error && (
        <motion.div
          className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-vt323">{error}</span>
        </motion.div>
      )}

      <motion.button
        onClick={handleCheckout}
        disabled={isLoading || cart.items.length === 0}
        className={`w-full neon-button neon-button-pink py-4 flex items-center justify-center space-x-3 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color="neon-pink" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Secure Checkout</span>
          </>
        )}
      </motion.button>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
        <Lock className="w-3 h-3" />
        <span className="font-vt323">Secured by Stripe • SSL Encrypted</span>
      </div>

      {/* Age Verification Notice */}
      <div className="text-center">
        <p className="text-gray-400 text-xs font-vt323">
          By proceeding, you confirm you are 21+ years old
        </p>
      </div>
    </div>
  )
}

export default CheckoutButton
