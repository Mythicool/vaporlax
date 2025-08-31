import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'
import VaporwaveLoader from '@/components/ui/VaporwaveLoader'

const SimpleProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-vapor-black relative">
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
            <Link to="/products" className="font-vt323 text-lg text-neon-pink font-bold relative group">
              PRODUCTS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-pink"></span>
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

      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Floating particles background */}
        <div className="absolute inset-0 floating-particles opacity-20 pointer-events-none"></div>
        
        {/* Enhanced Page Header */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-6">
            <span className="holographic">Our</span> <span className="chromatic-text" data-text="Products">Products</span>
          </h1>
          <p className="font-vt323 text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our complete collection of <span className="neon-text-cyan">premium</span> vaping products
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-16 h-1 bg-neon-pink animate-pulse"></div>
            <div className="w-16 h-1 bg-neon-cyan animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 h-1 bg-neon-purple animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-12 max-w-lg mx-auto relative z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the vapor dimension..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-vapor-dark-gray/80 backdrop-blur-md border-2 border-neon-cyan/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink focus:shadow-lg focus:shadow-neon-pink/20 transition-all duration-300 font-vt323 text-xl"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-neon-cyan rounded-full animate-spin opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8 relative z-10">
          <div className="text-center">
            <p className="text-gray-400 font-vt323 text-xl">
              {loading ? (
                <span className="neon-text-cyan animate-pulse">Scanning vapor database...</span>
              ) : (
                <>
                  <span className="neon-text-purple">Showing</span> {filteredProducts.length} <span className="neon-text-cyan">of</span> {products.length} <span className="neon-text-teal">products</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        {loading ? (
          <div className="text-center py-20 relative z-10">
            <VaporwaveLoader text="Loading premium products..." size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 relative z-10">
            <div className="mb-8">
              <div className="w-24 h-24 border-4 border-neon-pink rounded-full mx-auto mb-6 animate-pulse"></div>
            </div>
            <h3 className="font-orbitron font-bold text-3xl holographic mb-4">
              No Products Found
            </h3>
            <p className="text-gray-300 font-vt323 text-xl mb-8">
              The vapor dimension seems empty. Try adjusting your search parameters.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="neon-button neon-button-cyan px-8 py-4 text-lg"
            >
              RESET SEARCH
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card-enhanced group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Enhanced Product Image */}
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-vapor-light-gray to-vapor-dark-gray rounded-lg mb-4 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vapor-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-3 bg-neon-teal rounded-full animate-pulse"></div>
                  </div>
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-neon-pink text-vapor-black px-3 py-1 rounded-full text-xs font-orbitron font-bold animate-pulse">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Enhanced Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-neon-purple text-sm font-orbitron font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-orbitron font-bold text-white text-xl mb-3 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm font-vt323 line-clamp-3 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {product.description || "Premium vaping device with advanced features and exceptional performance."}
                  </p>

                  {/* Stock Status */}
                  <div className="mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-orbitron font-bold ${
                      product.inStock
                        ? 'bg-neon-teal/20 text-neon-teal border border-neon-teal/30'
                        : 'bg-red-500/20 text-red-400 border border-red-400/30'
                    }`}>
                      {product.inStock ? '✓ IN STOCK' : '✗ OUT OF STOCK'}
                    </span>
                  </div>

                  {/* Price and Actions */}
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

      {/* Footer */}
      <footer className="bg-vapor-dark-gray border-t border-neon-cyan/30 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-vt323">
            © 2024 VaporLAX. Must be 21+ to purchase. Vape responsibly.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleProducts
