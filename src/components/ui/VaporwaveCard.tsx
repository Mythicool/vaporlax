import { ReactNode, CSSProperties } from 'react'

interface VaporwaveCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  animated?: boolean
  style?: CSSProperties
}

const VaporwaveCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  animated = false,
  style
}: VaporwaveCardProps) => {
  const baseClasses = `
    relative bg-vapor-dark-gray/90 backdrop-blur-md
    border border-neon-cyan/50 rounded-lg overflow-hidden
    transition-all duration-500 ease-out
  `

  const hoverClasses = hover ? `
    hover:border-neon-pink hover:shadow-2xl hover:shadow-neon-pink/20
    hover:transform hover:-translate-y-2 hover:scale-[1.02]
  ` : ''

  const glowClasses = glow ? 'animate-glow' : ''
  const animatedClasses = animated ? 'animate-float' : ''

  return (
    <div 
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${glowClasses}
        ${animatedClasses}
        ${className}
      `}
      style={style}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neon-cyan/30"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/30"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon-cyan/30"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neon-cyan/30"></div>
    </div>
  )
}

export default VaporwaveCard