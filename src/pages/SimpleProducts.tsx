import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'

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
    <div className="min-h-screen bg-vapor-black">
      {/* Simple Header */}
      <header className="bg-vapor-dark-gray border-b border-neon-cyan/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-orbitron font-bold text-2xl gradient-text">
            VaporLAX
          </Link>
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:text-neon-cyan transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-neon-cyan font-bold">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron font-bold text-4xl gradient-text mb-4">
            Our Products
          </h1>
          <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our complete collection of premium vaping products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 font-vt323 text-lg">
            {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-orbitron">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-orbitron font-bold text-xl text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-300 font-vt323 text-lg">
              Try adjusting your search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="neon-card group">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-vapor-dark-gray rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-neon-purple text-xs font-orbitron font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="bg-neon-pink text-vapor-black px-2 py-1 rounded-full text-xs font-orbitron font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="font-orbitron font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm font-vt323 line-clamp-3 mb-4">
                    {product.description}
                  </p>

                  {/* Stock Status */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-orbitron font-bold ${
                      product.inStock
                        ? 'bg-neon-teal/20 text-neon-teal'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-orbitron font-bold gradient-text">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link to={`/products/${product.id}`}>
                      <button className="neon-button neon-button-cyan px-4 py-2 text-sm hover:scale-105 transition-transform duration-300">
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
