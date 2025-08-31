import { useState } from 'react'
import { Mail, Send, CheckCircle, AlertCircle, Zap, Award, Star } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline'
  className?: string
}

const NewsletterSignup = ({ variant = 'default', className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Welcome to the Vapor Chronicles! Check your email for confirmation.')
      setEmail('')
    }, 2000)
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            className="flex-1 px-3 py-2 bg-vapor-dark-gray/90 border border-neon-cyan/50 rounded text-white placeholder-gray-400 font-vt323 focus:outline-none focus:border-neon-pink transition-colors"
            disabled={status === 'loading'}
          />
          <VaporwaveButton 
            type="submit" 
            variant="primary" 
            size="sm"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? '...' : 'JOIN'}
          </VaporwaveButton>
        </form>
        {status === 'success' && (
          <p className="text-neon-teal font-vt323 text-sm mt-2 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Subscribed!
          </p>
        )}
        {status === 'error' && (
          <p className="text-neon-pink font-vt323 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {message}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-vapor-dark-gray/50 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-neon-cyan" />
          <h3 className="font-orbitron font-bold text-lg text-white">
            Join the <span className="neon-text-cyan">Chronicles</span>
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@domain.com"
            className="w-full px-4 py-3 bg-vapor-black/50 border border-neon-cyan/50 rounded text-white placeholder-gray-400 font-vt323 focus:outline-none focus:border-neon-pink transition-colors"
            disabled={status === 'loading'}
          />
          
          <VaporwaveButton 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                CONNECTING...
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                SUBSCRIBE
              </>
            )}
          </VaporwaveButton>
        </form>
        
        {status === 'success' && (
          <div className="mt-4 p-3 bg-neon-teal/20 border border-neon-teal/50 rounded text-neon-teal font-vt323 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {message}
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-3 bg-neon-pink/20 border border-neon-pink/50 rounded text-neon-pink font-vt323 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {message}
          </div>
        )}
        
        <p className="text-gray-400 font-vt323 text-xs mt-3">
          Get exclusive deals, new product alerts, and vaping tips. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  // Default variant
  return (
    <section className={`py-20 bg-vapor-black relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 floating-particles opacity-15"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <VaporwaveCard className="p-12 newsletter-glow" glow>
          <Mail className="w-16 h-16 text-neon-cyan mx-auto mb-6 animate-pulse" />
          
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl mb-6">
            <span className="holographic">Join</span> <span className="chromatic-text" data-text="The">The</span> <span className="neon-text-cyan">Chronicles</span>
          </h2>
          
          <p className="font-vt323 text-xl text-gray-300 mb-8 leading-relaxed">
            Subscribe to the <span className="neon-text-cyan">Vapor Chronicles</span> and get exclusive access to:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-pink/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-neon-pink" />
              </div>
              <p className="font-vt323 text-gray-300">New Product Alerts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-neon-purple" />
              </div>
              <p className="font-vt323 text-gray-300">Exclusive Deals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-neon-teal" />
              </div>
              <p className="font-vt323 text-gray-300">Expert Tips</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 bg-vapor-dark-gray/90 backdrop-blur-md border border-neon-cyan/50 rounded-lg text-white placeholder-gray-400 font-vt323 text-lg focus:outline-none focus:border-neon-pink transition-colors"
                disabled={status === 'loading'}
              />
              <VaporwaveButton 
                type="submit" 
                variant="primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    JOINING...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    SUBSCRIBE
                  </>
                )}
              </VaporwaveButton>
            </div>
          </form>
          
          {status === 'success' && (
            <div className="mt-6 p-4 bg-neon-teal/20 border border-neon-teal/50 rounded-lg text-neon-teal font-vt323 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-6 p-4 bg-neon-pink/20 border border-neon-pink/50 rounded-lg text-neon-pink font-vt323 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          
          <p className="font-vt323 text-sm text-gray-400 mt-6">
            No spam, just pure vaping knowledge. Unsubscribe anytime.
          </p>
        </VaporwaveCard>
      </div>
    </section>
  )
}

export default NewsletterSignup