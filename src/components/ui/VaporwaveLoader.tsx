interface VaporwaveLoaderProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const VaporwaveLoader = ({ 
  text = 'Loading VaporLAX...', 
  size = 'md',
  className = '' 
}: VaporwaveLoaderProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Animated loader rings */}
      <div className="relative mb-8">
        <div className={`${sizeClasses[size]} border-4 border-neon-cyan/30 rounded-full animate-spin`}>
          <div className="absolute inset-2 border-4 border-neon-pink/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="absolute inset-2 border-4 border-neon-purple/70 rounded-full animate-spin" style={{ animationDuration: '2s' }}>
              <div className="absolute inset-2 border-4 border-neon-teal/90 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-neon-cyan rounded-full animate-pulse shadow-lg shadow-neon-cyan/50"></div>
        </div>
      </div>

      {/* Loading text with effects */}
      <div className="text-center">
        <p className={`font-orbitron font-bold ${textSizeClasses[size]} holographic mb-2`}>
          {text}
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-neon-cyan rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-neon-pink rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-neon-purple rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-neon-teal rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  )
}

export default VaporwaveLoader