import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import ProductGrid from '@/components/ecommerce/ProductGrid'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'
import { useProductStore } from '@/lib/store'

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  const {
    products,
    filteredProducts,
    filters,
    setProducts,
    setFilters,
    clearFilters,
  } = useProductStore()

  const categories = ['All', 'Disposables', 'Starter Kits', 'Pod Systems', 'Coils', 'E-Liquids']
  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: Infinity },
  ]

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
  }, [setProducts])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setFilters({ search: searchTerm || undefined })
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm, setFilters])

  const handleCategoryFilter = (category: string) => {
    setFilters({ category: category === 'All' ? undefined : category })
  }

  const handlePriceFilter = (range: { min: number; max: number }) => {
    setFilters({ 
      priceRange: range.max === Infinity ? undefined : range 
    })
  }

  const handleStockFilter = (inStock: boolean | undefined) => {
    setFilters({ inStock })
  }

  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key as keyof typeof filters] !== undefined
  ).length

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-orbitron font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Our Products
          </h1>
          <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our complete collection of premium vaping products, 
            from cutting-edge devices to premium e-liquids.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`neon-button px-4 py-3 flex items-center space-x-2 ${
                  activeFiltersCount > 0 ? 'neon-button-pink' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-neon-pink text-vapor-black px-2 py-1 rounded-full text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </motion.button>

              {activeFiltersCount > 0 && (
                <motion.button
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-vt323"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              className="mt-6 p-6 bg-vapor-dark-gray border border-neon-cyan/30 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-orbitron font-bold text-neon-cyan mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors duration-300 font-vt323 ${
                          (category === 'All' && !filters.category) || filters.category === category
                            ? 'bg-neon-cyan/20 text-neon-cyan'
                            : 'text-gray-300 hover:text-white hover:bg-vapor-light-gray/50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-orbitron font-bold text-neon-pink mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => handlePriceFilter(range)}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors duration-300 font-vt323 ${
                          (!filters.priceRange && range.max === Infinity) ||
                          (filters.priceRange?.min === range.min && filters.priceRange?.max === range.max)
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'text-gray-300 hover:text-white hover:bg-vapor-light-gray/50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <h3 className="font-orbitron font-bold text-neon-purple mb-3">Availability</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStockFilter(undefined)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors duration-300 font-vt323 ${
                        filters.inStock === undefined
                          ? 'bg-neon-purple/20 text-neon-purple'
                          : 'text-gray-300 hover:text-white hover:bg-vapor-light-gray/50'
                      }`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => handleStockFilter(true)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors duration-300 font-vt323 ${
                        filters.inStock === true
                          ? 'bg-neon-purple/20 text-neon-purple'
                          : 'text-gray-300 hover:text-white hover:bg-vapor-light-gray/50'
                      }`}
                    >
                      In Stock Only
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 font-vt323 text-lg">
            {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProductGrid products={filteredProducts} loading={loading} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Products
