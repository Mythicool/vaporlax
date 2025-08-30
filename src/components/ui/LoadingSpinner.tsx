import { motion } from 'framer-motion'
import { LoadingSpinnerProps } from '@/types'

const LoadingSpinner = ({ size = 'md', color = 'neon-cyan' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const colorClasses = {
    'neon-cyan': 'border-neon-cyan',
    'neon-pink': 'border-neon-pink',
    'neon-purple': 'border-neon-purple',
    'neon-teal': 'border-neon-teal',
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-transparent border-t-current rounded-full`}
        style={{
          borderTopColor: `var(--${color})`,
          filter: `drop-shadow(0 0 10px var(--${color}))`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export default LoadingSpinner
