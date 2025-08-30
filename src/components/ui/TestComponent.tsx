import { useState } from 'react'
import { motion } from 'framer-motion'

const TestComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-vapor-black flex items-center justify-center">
      <motion.div
        className="neon-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-orbitron font-bold text-3xl gradient-text mb-6">
          VaporLAX Test - HMR Working! ✅
        </h1>
        
        <p className="text-white font-vt323 text-xl mb-6">
          React is working! Count: {count}
        </p>
        
        <motion.button
          onClick={() => setCount(count + 1)}
          className="neon-button neon-button-pink px-6 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Increment
        </motion.button>
      </motion.div>
    </div>
  )
}

export default TestComponent
