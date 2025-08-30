import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import { ProductCardProps } from '@/types'
import { formatPrice } from '@/lib/api'

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product, 1)
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        <div className="neon-card h-full flex flex-col overflow-hidden">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-vapor-dark-gray">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            <motion.img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-vapor-black/60 via-transparent to-transparent" />
            
            {/* Featured Badge */}
            {product.featured && (
              <motion.div
                className="absolute top-3 left-3 bg-neon-pink/90 text-vapor-black px-2 py-1 rounded-full text-xs font-orbitron font-bold flex items-center space-x-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-3 h-3" />
                <span>FEATURED</span>
              </motion.div>
            )}

            {/* Stock Status */}
            <div className="absolute top-3 right-3">
              <motion.div
                className={`px-2 py-1 rounded-full text-xs font-orbitron font-bold ${
                  product.inStock
                    ? 'bg-neon-teal/90 text-vapor-black'
                    : 'bg-red-500/90 text-white'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
              </motion.div>
            </div>

            {/* Quick Add Button */}
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-neon-cyan/90 hover:bg-neon-cyan text-vapor-black p-2 rounded-full transition-colors duration-300 opacity-0 group-hover:opacity-100"
              disabled={!product.inStock}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Category */}
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-3 h-3 text-neon-purple" />
              <span className="text-neon-purple text-xs font-orbitron font-medium uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-orbitron font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-300">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm font-vt323 line-clamp-3 mb-4 flex-1">
              {product.description}
            </p>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-orbitron font-bold gradient-text">
                  {formatPrice(product.price)}
                </span>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`neon-button px-4 py-2 text-sm ${
                  product.inStock ? 'neon-button-pink' : 'opacity-50 cursor-not-allowed'
                }`}
                whileHover={product.inStock ? { scale: 1.05 } : {}}
                whileTap={product.inStock ? { scale: 0.95 } : {}}
              >
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
