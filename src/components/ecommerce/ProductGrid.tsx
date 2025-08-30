import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  const addToCart = useCartStore((state) => state.addToCart)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="neon-card h-96 animate-pulse">
            <div className="aspect-square bg-vapor-light-gray mb-4" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-vapor-light-gray rounded w-1/3" />
              <div className="h-6 bg-vapor-light-gray rounded w-3/4" />
              <div className="h-4 bg-vapor-light-gray rounded w-full" />
              <div className="h-4 bg-vapor-light-gray rounded w-2/3" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-8 bg-vapor-light-gray rounded w-1/3" />
                <div className="h-10 bg-vapor-light-gray rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-vapor-dark-gray flex items-center justify-center">
            <motion.div
              className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <h3 className="font-orbitron font-bold text-xl text-white mb-2">
            No Products Found
          </h3>
          <p className="text-gray-300 font-vt323 text-lg">
            We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} onAddToCart={addToCart} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductGrid
