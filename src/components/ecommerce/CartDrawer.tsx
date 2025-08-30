import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { formatPrice } from '@/lib/api'
import CheckoutButton from './CheckoutButton'

const CartDrawer = () => {
  const isOpen = useUIStore((state) => state.isCartDrawerOpen)
  const setOpen = useUIStore((state) => state.setCartDrawerOpen)
  const { cart, updateCartQuantity, removeFromCart } = useCartStore()

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-vapor-black/80 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-vapor-dark-gray border-l border-neon-cyan/30 z-50 flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon-cyan/30">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-neon-cyan" />
                <h2 className="font-orbitron font-bold text-xl text-white">
                  Shopping Cart
                </h2>
                <span className="bg-neon-pink text-vapor-black px-2 py-1 rounded-full text-xs font-bold">
                  {cart.itemCount}
                </span>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-vapor-black flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-400 font-vt323 text-lg">
                    Add some products to get started
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-vapor-black/50 rounded-lg border border-neon-cyan/20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-vapor-light-gray">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-orbitron font-medium text-white text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-neon-cyan font-vt323 text-lg">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-vapor-light-gray hover:bg-neon-cyan hover:text-vapor-black transition-colors duration-300 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        
                        <span className="w-8 text-center font-orbitron font-bold text-white">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-vapor-light-gray hover:bg-neon-cyan hover:text-vapor-black transition-colors duration-300 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="p-6 border-t border-neon-cyan/30 bg-vapor-black/50">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-orbitron font-medium text-white">Subtotal:</span>
                  <span className="font-orbitron font-bold text-xl gradient-text">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                {/* Shipping Notice */}
                <p className="text-gray-400 text-sm font-vt323 mb-4 text-center">
                  {cart.total >= 50 ? (
                    <span className="text-neon-teal">🎉 Free shipping unlocked!</span>
                  ) : (
                    <span>
                      Add {formatPrice(50 - cart.total)} more for free shipping
                    </span>
                  )}
                </p>

                {/* Checkout Button */}
                <CheckoutButton />

                {/* Continue Shopping */}
                <motion.button
                  onClick={() => setOpen(false)}
                  className="w-full mt-3 py-3 text-neon-cyan hover:text-white transition-colors duration-300 font-orbitron font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
