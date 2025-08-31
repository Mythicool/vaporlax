import { ReactNode, ButtonHTMLAttributes } from 'react'

interface VaporwaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  pulse?: boolean
  className?: string
}

const VaporwaveButton = ({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  pulse = false,
  className = '',
  ...props
}: VaporwaveButtonProps) => {
  const baseClasses = `
    relative overflow-hidden font-orbitron font-bold uppercase tracking-wider
    transition-all duration-300 transform hover:scale-105 active:scale-95
    border-2 cursor-pointer select-none
  `

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  }

  const variantClasses = {
    primary: `
      bg-transparent border-neon-cyan text-neon-cyan
      hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/30
      hover:text-white
    `,
    secondary: `
      bg-transparent border-neon-pink text-neon-pink
      hover:bg-neon-pink/10 hover:shadow-lg hover:shadow-neon-pink/30
      hover:text-white
    `,
    accent: `
      bg-transparent border-neon-purple text-neon-purple
      hover:bg-neon-purple/10 hover:shadow-lg hover:shadow-neon-purple/30
      hover:text-white
    `,
    ghost: `
      bg-transparent border-neon-teal text-neon-teal
      hover:bg-neon-teal/10 hover:shadow-lg hover:shadow-neon-teal/30
      hover:text-white
    `
  }

  const glowClasses = glow ? 'animate-glow' : ''
  const pulseClasses = pulse ? 'animate-pulse' : ''

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${glowClasses}
        ${pulseClasses}
        ${className}
      `}
      {...props}
    >
      {/* Animated background sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></span>
    </button>
  )
}

export default VaporwaveButton