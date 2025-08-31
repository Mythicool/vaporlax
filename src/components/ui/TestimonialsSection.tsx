import { useState, useEffect } from 'react'
import { Star, Quote, MapPin, ShoppingBag } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import { testimonials, getRandomTestimonials } from '@/data/testimonialsData'
import { Testimonial } from '@/data/testimonialsData'

const TestimonialsSection = () => {
  const [currentTestimonials, setCurrentTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentTestimonials(getRandomTestimonials(3))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentTestimonials.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-neon-yellow fill-current' : 'text-gray-600'
        }`}
      />
    ))
  }

  if (currentTestimonials.length === 0) return null

  return (
    <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Customer</span> <span className="chromatic-text" data-text="Reviews">Reviews</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            What our <span className="neon-text-cyan">cyberpunk community</span> is saying
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <VaporwaveCard className="max-w-4xl mx-auto p-8 text-center" glow>
            <div className="mb-6">
              <Quote className="w-12 h-12 text-neon-cyan mx-auto mb-4 opacity-50" />
              <p className="font-vt323 text-2xl sm:text-3xl text-gray-300 leading-relaxed mb-6">
                "{currentTestimonials[currentIndex]?.text}"
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <img
                src={currentTestimonials[currentIndex]?.avatar}
                alt={currentTestimonials[currentIndex]?.name}
                className="w-16 h-16 rounded-full border-2 border-neon-pink"
              />
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-orbitron font-bold text-white text-lg">
                    {currentTestimonials[currentIndex]?.name}
                  </h4>
                  {currentTestimonials[currentIndex]?.verified && (
                    <div className="w-5 h-5 bg-neon-teal rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-vapor-black rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 font-vt323">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentTestimonials[currentIndex]?.location}
                  </div>
                  {currentTestimonials[currentIndex]?.product && (
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      {currentTestimonials[currentIndex]?.product}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {renderStars(currentTestimonials[currentIndex]?.rating || 5)}
                </div>
              </div>
            </div>
          </VaporwaveCard>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <VaporwaveCard 
              key={testimonial.id} 
              className="p-6"
              hover
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-neon-cyan"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-orbitron font-bold text-white">
                      {testimonial.name}
                    </h4>
                    {testimonial.verified && (
                      <div className="w-4 h-4 bg-neon-teal rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-vapor-black rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              
              <p className="font-vt323 text-gray-300 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 font-vt323">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {testimonial.location}
                </div>
                {testimonial.product && (
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    {testimonial.product}
                  </div>
                )}
              </div>
            </VaporwaveCard>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {currentTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-neon-cyan scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection