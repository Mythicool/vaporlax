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
      {/* Simple Header */}
      <header className="bg-vapor-dark-gray border-b border-neon-cyan/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-orbitron font-bold text-2xl gradient-text">
            VaporLAX
          </h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:text-neon-cyan transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-neon-cyan transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-white hover:text-neon-cyan transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-neon-cyan transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-orbitron font-black text-6xl mb-6">
            <span className="gradient-text">VAPOR</span>
            <span className="text-white">LAX</span>
          </h1>
          <p className="font-vt323 text-2xl text-neon-cyan mb-4">
            VAPE SHOP
          </p>
          <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Experience the future of vaping with premium products, 
            cutting-edge technology, and unmatched style.
          </p>
          <Link to="/products">
            <button className="neon-button neon-button-pink px-8 py-4 text-lg">
              SHOP NOW
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-vapor-dark-gray">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-orbitron font-bold text-3xl gradient-text text-center mb-16">
            Featured Products
          </h2>
          
          {loading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="neon-card">
                  <div className="aspect-square bg-vapor-light-gray mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-orbitron font-bold text-white text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-orbitron font-bold gradient-text">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link to={`/products/${product.id}`}>
                        <button className="neon-button neon-button-cyan px-4 py-2">
                          View Details
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

      {/* Footer */}
      <footer className="bg-vapor-black border-t border-neon-cyan/30 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-vt323">
            © 2024 VaporLAX. Must be 21+ to purchase. Vape responsibly.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleHome
