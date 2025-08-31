import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What age do I need to be to purchase vaping products?',
    answer: 'You must be 21 years or older to purchase any vaping products. We strictly verify age for all purchases both online and in-store.',
    category: 'Legal',
  },
  {
    id: '2',
    question: 'How do I choose the right nicotine strength?',
    answer: 'Nicotine strength depends on your smoking history. Former heavy smokers typically start with 12-18mg, moderate smokers with 6-12mg, and light/social smokers with 3-6mg. Our staff can help you find the perfect level.',
    category: 'Products',
  },
  {
    id: '3',
    question: 'What\'s the difference between disposables and refillable devices?',
    answer: 'Disposables are pre-filled, single-use devices perfect for convenience and trying new flavors. Refillable devices offer more customization, better value long-term, and environmental benefits.',
    category: 'Products',
  },
  {
    id: '4',
    question: 'Do you offer same-day delivery in Norman?',
    answer: 'Yes! We offer same-day delivery within Norman city limits for orders placed before 3 PM. Free delivery on orders over $50, or $5 delivery fee for smaller orders.',
    category: 'Shipping',
  },
  {
    id: '5',
    question: 'Can I return products if I\'m not satisfied?',
    answer: 'We offer a 30-day return policy on unopened products with original packaging. Due to health regulations, we cannot accept returns on opened e-liquids or used devices.',
    category: 'Returns',
  },
  {
    id: '6',
    question: 'Do you have a loyalty program?',
    answer: 'Absolutely! Our VaporLAX Rewards program gives you points for every purchase, exclusive access to new products, birthday discounts, and special member-only events.',
    category: 'Rewards',
  },
  {
    id: '7',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, cash (in-store), and digital payments like Apple Pay and Google Pay. We also offer buy-now-pay-later options through Klarna.',
    category: 'Payment',
  },
  {
    id: '8',
    question: 'How often should I replace my coils?',
    answer: 'Coil lifespan varies by usage, but typically 1-2 weeks for regular users. Signs it\'s time to replace: burnt taste, reduced flavor, or decreased vapor production.',
    category: 'Maintenance',
  },
]

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-20 bg-vapor-black relative overflow-hidden">
      <div className="absolute inset-0 floating-particles opacity-10"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <HelpCircle className="w-16 h-16 text-neon-purple mx-auto mb-6 animate-pulse" />
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Frequently</span> <span className="chromatic-text" data-text="Asked">Asked</span> <span className="neon-text-cyan">Questions</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            Get answers to common questions about <span className="neon-text-pink">vaping</span> and <span className="neon-text-purple">VaporLAX</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-vt323 text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-neon-cyan text-vapor-black'
                  : 'bg-vapor-dark-gray/50 text-gray-300 hover:text-neon-cyan border border-neon-cyan/30'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <VaporwaveCard 
              key={faq.id} 
              className="overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-neon-cyan/5 transition-colors duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded-full text-xs font-vt323">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-6 h-6 text-neon-cyan" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-6 border-t border-neon-cyan/20">
                  <p className="font-vt323 text-lg text-gray-300 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </VaporwaveCard>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="font-vt323 text-lg text-gray-400 mb-6">
            Still have questions? Our <span className="neon-text-cyan">cybernetic support team</span> is here to help!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:1-800-VAPOR-LAX" className="neon-button px-6 py-3 text-sm font-bold">
              📞 CALL US
            </a>
            <a href="mailto:info@vaporlax.com" className="neon-button px-6 py-3 text-sm font-bold">
              📧 EMAIL US
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection