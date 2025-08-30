import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice, calculateTax, calculateShipping, calculateTotal } from '@/lib/api'
import CheckoutButton from '@/components/ecommerce/CheckoutButton'

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCartStore()

  const subtotal = cart.total
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = calculateTotal(subtotal)

  if (cart.items.length === 0) {
    return (
      <motion.div
        className="min-h-screen bg-vapor-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-vapor-dark-gray flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </motion.div>
          
          <motion.h1
            className="font-orbitron font-bold text-3xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your Cart is Empty
          </motion.h1>
          
          <motion.p
            className="text-gray-300 font-vt323 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Looks like you haven't added any products to your cart yet. 
            Start exploring our premium vaping collection!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/products">
              <motion.button
                className="neon-button neon-button-pink px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-vapor-black pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/products"
            className="flex items-center space-x-2 text-neon-cyan hover:text-white transition-colors duration-300 font-vt323 text-lg mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <h1 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text">
              Shopping Cart
            </h1>
            <div className="bg-neon-pink text-vapor-black px-3 py-1 rounded-full text-sm font-orbitron font-bold">
              {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="neon-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <Link to={`/products/${item.product.id}`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-vapor-dark-gray hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/products/${item.product.id}`}
                        className="block hover:text-neon-cyan transition-colors duration-300"
                      >
                        <h3 className="font-orbitron font-bold text-lg text-white mb-1 truncate">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-400 font-vt323 text-sm mb-2 line-clamp-2">
                        {item.product.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-neon-purple text-xs font-orbitron font-medium uppercase">
                          {item.product.category}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-orbitron font-bold text-xl gradient-text mb-2">
                        {formatPrice(item.product.price)}
                      </div>
                      <div className="text-gray-400 font-vt323 text-sm">
                        each
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
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

                    {/* Item Total */}
                    <div className="text-right min-w-[80px]">
                      <div className="font-orbitron font-bold text-xl text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="neon-card p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-orbitron font-bold text-xl text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-vt323 text-lg text-gray-300">Subtotal:</span>
                  <span className="font-orbitron font-medium text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-vt323 text-lg text-gray-300">Tax:</span>
                  <span className="font-orbitron font-medium text-white">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-vt323 text-lg text-gray-300">Shipping:</span>
                  <span className="font-orbitron font-medium text-white">
                    {shipping === 0 ? (
                      <span className="text-neon-teal">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {subtotal < 50 && (
                  <div className="text-center p-3 bg-neon-teal/10 border border-neon-teal/30 rounded-lg">
                    <p className="text-neon-teal text-sm font-vt323">
                      Add {formatPrice(50 - subtotal)} more for free shipping!
                    </p>
                  </div>
                )}

                <div className="border-t border-vapor-light-gray pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-bold text-xl text-white">Total:</span>
                    <span className="font-orbitron font-bold text-2xl gradient-text">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <CheckoutButton />

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm font-vt323">
                  Must be 21+ to purchase. Secure checkout powered by Stripe.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
