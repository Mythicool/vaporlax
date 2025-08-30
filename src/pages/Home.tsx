import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import ProductGrid from '@/components/ecommerce/ProductGrid'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/lib/api'
import { useCartStore } from '@/lib/store'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts()
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error loading featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  const features = [
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50. Express delivery available.',
      color: 'neon-cyan',
    },
    {
      icon: Shield,
      title: 'Authentic Products',
      description: 'All products are 100% authentic and quality guaranteed.',
      color: 'neon-pink',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert customer support available around the clock.',
      color: 'neon-purple',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-vapor-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-4">
              Why Choose VaporLAX?
            </h2>
            <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto">
              Experience premium vaping with our commitment to quality, 
              authenticity, and exceptional customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="neon-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${feature.color}/20 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-vt323 text-lg text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-vapor-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-4">
              Featured Products
            </h2>
            <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover our most popular vaping products, handpicked for their 
              quality, performance, and style.
            </p>
            <Link to="/products">
              <motion.button
                className="neon-button neon-button-cyan px-6 py-3 flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ProductGrid products={featuredProducts} loading={loading} />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-vapor-dark-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-4">
              Stay in the Loop
            </h2>
            <p className="font-vt323 text-xl text-gray-300 mb-8">
              Get exclusive access to new products, special offers, and vaping tips 
              delivered straight to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-vapor-black border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
                />
                <motion.button
                  className="neon-button neon-button-pink px-6 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-gray-400 text-sm font-vt323 mt-3">
                Must be 21+ to subscribe. We respect your privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
