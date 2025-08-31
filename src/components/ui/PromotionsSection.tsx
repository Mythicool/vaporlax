import { useState, useEffect } from 'react'
import { Copy, CheckCircle, Clock, Tag, Gift } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'
import { getFeaturedPromotions, getActivePromotions } from '@/data/promotionsData'
import { Promotion } from '@/data/promotionsData'

const PromotionsSection = () => {
  const [featuredPromotions] = useState(getFeaturedPromotions())
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getTimeRemaining = (validUntil: Date) => {
    const now = new Date()
    const diff = validUntil.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h left`
    return `${hours}h left`
  }

  const getDiscountColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'neon-cyan'
      case 'fixed': return 'neon-pink'
      case 'bogo': return 'neon-purple'
      case 'free_shipping': return 'neon-teal'
      default: return 'neon-cyan'
    }
  }

  return (
    <section className="py-20 bg-vapor-black relative overflow-hidden">
      <div className="absolute inset-0 floating-particles opacity-15"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Gift className="w-16 h-16 text-neon-pink mx-auto mb-6 animate-bounce" />
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Exclusive</span> <span className="chromatic-text" data-text="Deals">Deals</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            Limited-time offers from the <span className="neon-text-cyan">digital marketplace</span>
          </p>
        </div>

        {/* Featured Promotion Banner */}
        {featuredPromotions[0] && (
          <div className="mb-16">
            <VaporwaveCard className="overflow-hidden relative" glow>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video lg:aspect-square overflow-hidden">
                  <img
                    src={featuredPromotions[0].image}
                    alt={featuredPromotions[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-2 bg-${getDiscountColor(featuredPromotions[0].type)}/20 text-${getDiscountColor(featuredPromotions[0].type)} rounded-full font-vt323 text-sm`}>
                      FEATURED DEAL
                    </span>
                    <div className="flex items-center text-gray-400 font-vt323 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeRemaining(featuredPromotions[0].validUntil)}
                    </div>
                  </div>
                  
                  <h3 className="font-orbitron font-bold text-3xl sm:text-4xl text-white mb-4">
                    {featuredPromotions[0].title}
                  </h3>
                  
                  <p className="font-vt323 text-lg text-gray-300 mb-6 leading-relaxed">
                    {featuredPromotions[0].description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`text-4xl font-orbitron font-bold text-${getDiscountColor(featuredPromotions[0].type)}`}>
                      {featuredPromotions[0].discount}
                    </div>
                    
                    {featuredPromotions[0].code && (
                      <div className="flex items-center gap-2">
                        <span className="font-vt323 text-gray-400">Code:</span>
                        <button
                          onClick={() => copyCode(featuredPromotions[0].code!)}
                          className="px-4 py-2 bg-vapor-dark-gray border border-neon-cyan/50 rounded font-vt323 text-neon-cyan hover:bg-neon-cyan/10 transition-colors flex items-center gap-2"
                        >
                          {featuredPromotions[0].code}
                          {copiedCode === featuredPromotions[0].code ? (
                            <CheckCircle className="w-4 h-4 text-neon-teal" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <VaporwaveButton variant="primary" size="lg">
                    SHOP NOW
                  </VaporwaveButton>
                </div>
              </div>
            </VaporwaveCard>
          </div>
        )}

        {/* All Active Promotions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getActivePromotions().slice(1).map((promotion, index) => (
            <VaporwaveCard 
              key={promotion.id} 
              className="overflow-hidden group"
              hover
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 bg-${getDiscountColor(promotion.type)}/90 text-vapor-black rounded-full font-vt323 text-sm font-bold`}>
                    {promotion.discount}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center text-white bg-vapor-black/70 backdrop-blur-sm px-2 py-1 rounded font-vt323 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeRemaining(promotion.validUntil)}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {promotion.title}
                </h3>
                
                <p className="font-vt323 text-gray-300 mb-4 line-clamp-2">
                  {promotion.description}
                </p>
                
                {promotion.code && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-vt323 text-sm text-gray-400">Code:</span>
                    <button
                      onClick={() => copyCode(promotion.code!)}
                      className="px-3 py-1 bg-vapor-dark-gray border border-neon-cyan/50 rounded font-vt323 text-neon-cyan hover:bg-neon-cyan/10 transition-colors flex items-center gap-1 text-sm"
                    >
                      {promotion.code}
                      {copiedCode === promotion.code ? (
                        <CheckCircle className="w-3 h-3 text-neon-teal" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}
                
                <VaporwaveButton variant="ghost" size="sm" className="w-full">
                  CLAIM DEAL
                </VaporwaveButton>
              </div>
            </VaporwaveCard>
          ))}
        </div>

        {/* Promotion Terms */}
        <div className="mt-12 text-center">
          <VaporwaveCard className="p-6 bg-vapor-dark-gray/50">
            <h4 className="font-orbitron font-bold text-white mb-4">
              <span className="neon-text-yellow">⚡ DEAL TERMS ⚡</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-vt323 text-gray-300">
              <div>
                <strong className="text-neon-cyan">Age Verification:</strong> Must be 21+ to purchase
              </div>
              <div>
                <strong className="text-neon-pink">Limited Time:</strong> While supplies last
              </div>
              <div>
                <strong className="text-neon-purple">Exclusions:</strong> Cannot combine with other offers
              </div>
            </div>
          </VaporwaveCard>
        </div>
      </div>
    </section>
  )
}

export default PromotionsSection