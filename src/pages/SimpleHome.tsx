import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/lib/api'

const SimpleHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-vapor-black">
      {/* Enhanced Header */}
      <header className="bg-vapor-dark-gray/95 backdrop-blur-md border-b border-neon-cyan/30 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-orbitron font-bold text-3xl holographic group-hover:scale-105 transition-transform duration-300">
              VaporLAX
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-vt323 text-lg text-white hover:text-neon-cyan transition-all duration-300 hover:scale-110 relative group">
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/products" className="font-vt323 text-lg text-white hover:text-neon-pink transition-all duration-300 hover:scale-110 relative group">
              PRODUCTS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-pink group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="font-vt323 text-lg text-white hover:text-neon-purple transition-all duration-300 hover:scale-110 relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-purple group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="font-vt323 text-lg text-white hover:text-neon-teal transition-all duration-300 hover:scale-110 relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-teal group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden neon-button px-4 py-2 text-sm">
            MENU
          </button>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-20 text-center floating-particles relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-orbitron font-black text-6xl md:text-8xl mb-6 relative">
            <span className="holographic animate-pulse-slow" data-text="VAPOR">VAPOR</span>
            <span className="chromatic-text text-white animate-float" data-text="LAX">LAX</span>
          </h1>
          <p className="font-vt323 text-3xl md:text-4xl neon-text-cyan mb-6 animate-neon-pulse">
            PREMIUM VAPE SHOP
          </p>
          <p className="font-vt323 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience the <span className="neon-text-purple">future</span> of vaping with premium products, 
            cutting-edge technology, and unmatched <span className="neon-text">style</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <button className="neon-button neon-button-pink px-10 py-5 text-xl font-bold transform hover:scale-105 transition-all duration-300">
                SHOP NOW
              </button>
            </Link>
            <Link to="/about">
              <button className="neon-button px-10 py-5 text-xl font-bold transform hover:scale-105 transition-all duration-300">
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-neon-cyan opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-neon-pink opacity-40 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-neon-purple opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-neon-teal opacity-25 animate-float"></div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 floating-particles opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-center mb-4">
            <span className="holographic">Featured</span> <span className="neon-text-cyan">Products</span>
          </h2>
          <p className="font-vt323 text-xl text-center text-gray-400 mb-16">
            Discover our most popular vaping devices
          </p>
          
          {loading ? (
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-white font-vt323 text-xl">Loading premium products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card-enhanced group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-vapor-light-gray to-vapor-dark-gray mb-4 rounded-lg overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vapor-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-3 h-3 bg-neon-teal rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-orbitron font-bold text-white text-xl mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      {product.description || "Premium vaping device with advanced features and exceptional performance."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-orbitron font-bold holographic">
                        ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      <Link to={`/products/${product.id}`}>
                        <button className="neon-button px-6 py-3 text-sm font-bold transform hover:scale-105 transition-all duration-300">
                          VIEW DETAILS
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-vapor-black border-t border-neon-cyan/30 py-12 relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h3 className="font-orbitron font-bold text-2xl holographic mb-4">VaporLAX</h3>
            <p className="font-vt323 text-lg text-neon-cyan mb-2">PREMIUM VAPING EXPERIENCE</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="font-orbitron font-bold text-neon-pink mb-3">QUICK LINKS</h4>
              <div className="space-y-2">
                <Link to="/products" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">Products</Link>
                <Link to="/about" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">About Us</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">Contact</Link>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-orbitron font-bold text-neon-purple mb-3">SUPPORT</h4>
              <div className="space-y-2">
                <p className="text-gray-400 font-vt323">24/7 Customer Service</p>
                <p className="text-gray-400 font-vt323">Free Shipping Over $50</p>
                <p className="text-gray-400 font-vt323">30-Day Returns</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-orbitron font-bold text-neon-teal mb-3">CONNECT</h4>
              <div className="space-y-2">
                <p className="text-gray-400 font-vt323">info@vaporlax.com</p>
                <p className="text-gray-400 font-vt323">1-800-VAPOR-LAX</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="w-8 h-8 border border-neon-cyan rounded hover:bg-neon-cyan/20 transition-colors cursor-pointer"></div>
                  <div className="w-8 h-8 border border-neon-pink rounded hover:bg-neon-pink/20 transition-colors cursor-pointer"></div>
                  <div className="w-8 h-8 border border-neon-purple rounded hover:bg-neon-purple/20 transition-colors cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neon-cyan/20 pt-8 text-center">
            <p className="text-gray-400 font-vt323 text-lg mb-2">
              © 2024 VaporLAX. All rights reserved.
            </p>
            <p className="text-neon-pink font-vt323 text-sm animate-pulse">
              ⚠️ Must be 21+ to purchase. Vape responsibly. ⚠️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SimpleHome
