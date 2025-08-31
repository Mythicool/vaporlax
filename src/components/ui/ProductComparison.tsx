import { useState } from 'react'
import { Plus, X, Zap, Battery, Droplets, Star, ArrowRight } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'
import { Product } from '@/types'

interface ProductComparisonProps {
  products: Product[]
}

const ProductComparison = ({ products }: ProductComparisonProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const addToComparison = (product: Product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const removeFromComparison = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const clearComparison = () => {
    setSelectedProducts([])
    setShowComparison(false)
  }

  const getFeatureValue = (product: Product, feature: string): string => {
    // Mock feature extraction - in real app this would come from product data
    switch (feature) {
      case 'battery':
        return product.name.includes('5000') ? '5000mAh' : 
               product.name.includes('3000') ? '3000mAh' : '2500mAh'
      case 'puffs':
        return product.name.includes('5000') ? '~5000 puffs' : 
               product.name.includes('3000') ? '~3000 puffs' : '~2500 puffs'
      case 'nicotine':
        return '5% (50mg)'
      case 'flavors':
        return Math.floor(Math.random() * 10) + 15 + ' flavors'
      case 'type':
        return product.name.includes('Disposable') ? 'Disposable' : 'Refillable'
      default:
        return 'N/A'
    }
  }

  const features = [
    { key: 'type', label: 'Type', icon: Zap },
    { key: 'battery', label: 'Battery', icon: Battery },
    { key: 'puffs', label: 'Puff Count', icon: Droplets },
    { key: 'nicotine', label: 'Nicotine', icon: Star },
    { key: 'flavors', label: 'Flavors', icon: Plus },
  ]

  return (
    <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Product</span> <span className="chromatic-text" data-text="Comparison">Comparison</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            Compare up to 3 products side by side to find your <span className="neon-text-cyan">perfect match</span>
          </p>
        </div>

        {/* Product Selection */}
        {!showComparison && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.slice(0, 6).map((product, index) => (
                <VaporwaveCard 
                  key={product.id} 
                  className="p-6 group cursor-pointer"
                  hover
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => addToComparison(product)}
                >
                  <div className="aspect-square bg-gradient-to-br from-vapor-light-gray to-vapor-dark-gray mb-4 rounded-lg overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="w-8 h-8 bg-neon-cyan/20 backdrop-blur-md rounded-full flex items-center justify-center border border-neon-cyan/50">
                        <Plus className="w-4 h-4 text-neon-cyan" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-orbitron font-bold text-white text-lg mb-2 group-hover:text-neon-cyan transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="font-vt323 text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-orbitron font-bold holographic">
                      ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                    </span>
                    <div className="text-neon-cyan font-vt323 text-sm">
                      Click to compare
                    </div>
                  </div>
                </VaporwaveCard>
              ))}
            </div>
          </div>
        )}

        {/* Selected Products Bar */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <VaporwaveCard className="p-4 bg-vapor-dark-gray/95 backdrop-blur-md border-2 border-neon-cyan">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {selectedProducts.map(product => (
                    <div key={product.id} className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-neon-pink"
                      />
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center text-vapor-black hover:scale-110 transition-transform"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-vt323 text-white">
                    {selectedProducts.length}/3 selected
                  </span>
                  
                  {selectedProducts.length >= 2 && (
                    <VaporwaveButton
                      variant="primary"
                      size="sm"
                      onClick={() => setShowComparison(true)}
                    >
                      <ArrowRight className="w-4 h-4 mr-1" />
                      COMPARE
                    </VaporwaveButton>
                  )}
                  
                  <VaporwaveButton
                    variant="ghost"
                    size="sm"
                    onClick={clearComparison}
                  >
                    CLEAR
                  </VaporwaveButton>
                </div>
              </div>
            </VaporwaveCard>
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && selectedProducts.length >= 2 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-orbitron font-bold text-2xl text-white">
                <span className="neon-text-cyan">Comparison Results</span>
              </h3>
              <VaporwaveButton
                variant="ghost"
                onClick={() => setShowComparison(false)}
              >
                <X className="w-4 h-4 mr-2" />
                CLOSE
              </VaporwaveButton>
            </div>
            
            <VaporwaveCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neon-cyan/30">
                      <th className="p-4 text-left font-orbitron font-bold text-white">Feature</th>
                      {selectedProducts.map(product => (
                        <th key={product.id} className="p-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover border border-neon-pink"
                            />
                            <div className="font-orbitron font-bold text-white text-sm">
                              {product.name}
                            </div>
                            <div className="font-vt323 text-neon-cyan">
                              ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={feature.key} className={`border-b border-gray-700/50 ${index % 2 === 0 ? 'bg-vapor-black/30' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <feature.icon className="w-5 h-5 text-neon-purple" />
                            <span className="font-vt323 text-white text-lg">{feature.label}</span>
                          </div>
                        </td>
                        {selectedProducts.map(product => (
                          <td key={product.id} className="p-4 text-center font-vt323 text-gray-300">
                            {getFeatureValue(product, feature.key)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-vapor-black/50 border-t border-neon-cyan/30">
                <div className="flex flex-wrap justify-center gap-4">
                  {selectedProducts.map(product => (
                    <VaporwaveButton
                      key={product.id}
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(`/products/${product.id}`, '_blank')}
                    >
                      VIEW {product.name.split(' ')[0].toUpperCase()}
                    </VaporwaveButton>
                  ))}
                </div>
              </div>
            </VaporwaveCard>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductComparison