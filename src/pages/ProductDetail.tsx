import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Zap, Shield, Truck } from 'lucide-react'
import { Product } from '@/types'
import { getProductById, formatPrice } from '@/lib/api'
import { useCartStore } from '@/lib/store'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return
      
      try {
        const productData = await getProductById(id)
        setProduct(productData)
        
        // Initialize selected variants with first option of each variant type
        if (productData?.variants) {
          const initialVariants: { [key: string]: string } = {}
          const variantTypes = [...new Set(productData.variants.map(v => v.name))]
          
          variantTypes.forEach(type => {
            const firstVariant = productData.variants?.find(v => v.name === type)
            if (firstVariant) {
              initialVariants[type] = firstVariant.value
            }
          })
          
          setSelectedVariants(initialVariants)
        }
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    
    addToCart(product, quantity)
    
    // Show success feedback (you could use a toast library here)
    alert(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }))
  }

  const getVariantsByType = (type: string) => {
    return product?.variants?.filter(v => v.name === type) || []
  }

  const variantTypes = product?.variants ? 
    [...new Set(product.variants.map(v => v.name))] : []

  if (loading) {
    return (
      <div className="min-h-screen bg-vapor-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-vapor-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-orbitron font-bold text-2xl text-white mb-4">
            Product Not Found
          </h1>
          <Link to="/products">
            <motion.button
              className="neon-button neon-button-cyan px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Products
            </motion.button>
          </Link>
        </div>
      </div>
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
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/products"
            className="flex items-center space-x-2 text-neon-cyan hover:text-white transition-colors duration-300 font-vt323 text-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="aspect-square mb-4 bg-vapor-dark-gray rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                      selectedImage === index
                        ? 'border-neon-cyan'
                        : 'border-vapor-light-gray hover:border-neon-pink'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category and Featured Badge */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-neon-purple" />
                <span className="text-neon-purple text-sm font-orbitron font-medium uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              {product.featured && (
                <div className="bg-neon-pink/90 text-vapor-black px-3 py-1 rounded-full text-xs font-orbitron font-bold flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>FEATURED</span>
                </div>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-orbitron font-bold text-3xl sm:text-4xl text-white mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-orbitron font-bold gradient-text">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-orbitron font-bold ${
                product.inStock
                  ? 'bg-neon-teal/20 text-neon-teal'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-300 font-vt323 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            {variantTypes.length > 0 && (
              <div className="mb-8 space-y-6">
                {variantTypes.map((type) => (
                  <div key={type}>
                    <h3 className="font-orbitron font-bold text-white mb-3">
                      {type}:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getVariantsByType(type).map((variant) => (
                        <motion.button
                          key={variant.id}
                          onClick={() => handleVariantChange(type, variant.value)}
                          className={`px-4 py-2 border-2 rounded-lg font-vt323 transition-colors duration-300 ${
                            selectedVariants[type] === variant.value
                              ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan'
                              : 'border-vapor-light-gray text-gray-300 hover:border-neon-pink hover:text-neon-pink'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {variant.value}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-orbitron font-bold text-white">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-vapor-light-gray hover:bg-neon-cyan hover:text-vapor-black transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>

                  <span className="w-12 text-center font-orbitron font-bold text-xl text-white">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-vapor-light-gray hover:bg-neon-cyan hover:text-vapor-black transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full neon-button neon-button-pink py-4 text-lg flex items-center justify-center space-x-3 ${
                  !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={product.inStock ? { scale: 1.02 } : {}}
                whileTap={product.inStock ? { scale: 0.98 } : {}}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-3 bg-vapor-dark-gray/50 rounded-lg">
                <Shield className="w-5 h-5 text-neon-teal" />
                <span className="font-vt323 text-sm text-gray-300">Authentic Product</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-vapor-dark-gray/50 rounded-lg">
                <Truck className="w-5 h-5 text-neon-cyan" />
                <span className="font-vt323 text-sm text-gray-300">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-vapor-dark-gray/50 rounded-lg">
                <Star className="w-5 h-5 text-neon-pink" />
                <span className="font-vt323 text-sm text-gray-300">Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-orbitron font-bold text-2xl gradient-text mb-6">
              Specifications
            </h2>
            <div className="neon-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-vapor-light-gray/30 last:border-b-0">
                    <span className="font-orbitron font-medium text-neon-cyan">
                      {spec.name}:
                    </span>
                    <span className="font-vt323 text-lg text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Age Verification Notice */}
        <motion.div
          className="mt-12 p-6 border border-neon-cyan/30 rounded-lg bg-vapor-dark-gray/50 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-neon-cyan font-orbitron font-bold mb-2">
            AGE VERIFICATION REQUIRED
          </p>
          <p className="text-gray-300 font-vt323 text-lg">
            You must be 21 years or older to purchase vaping products. Please vape responsibly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductDetail
