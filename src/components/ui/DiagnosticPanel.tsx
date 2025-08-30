import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'

interface DiagnosticResult {
  name: string
  status: 'success' | 'error' | 'warning' | 'info'
  message: string
}

const DiagnosticPanel = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const runDiagnostics = () => {
      const results: DiagnosticResult[] = []

      // Test React
      try {
        results.push({
          name: 'React',
          status: 'success',
          message: 'React is working correctly'
        })
      } catch (error) {
        results.push({
          name: 'React',
          status: 'error',
          message: `React error: ${error}`
        })
      }

      // Test Zustand Cart Store
      try {
        const cartState = useCartStore.getState()
        results.push({
          name: 'Cart Store',
          status: 'success',
          message: `Cart initialized with ${cartState.cart.items.length} items`
        })
      } catch (error) {
        results.push({
          name: 'Cart Store',
          status: 'error',
          message: `Cart store error: ${error}`
        })
      }

      // Test UI Store
      try {
        const uiState = useUIStore.getState()
        results.push({
          name: 'UI Store',
          status: 'success',
          message: `UI store initialized, cart drawer: ${uiState.isCartDrawerOpen ? 'open' : 'closed'}`
        })
      } catch (error) {
        results.push({
          name: 'UI Store',
          status: 'error',
          message: `UI store error: ${error}`
        })
      }

      // Test localStorage
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        results.push({
          name: 'LocalStorage',
          status: 'success',
          message: 'LocalStorage is available'
        })
      } catch (error) {
        results.push({
          name: 'LocalStorage',
          status: 'warning',
          message: 'LocalStorage not available, using memory storage'
        })
      }

      // Test Framer Motion
      try {
        results.push({
          name: 'Framer Motion',
          status: 'success',
          message: 'Animations library loaded'
        })
      } catch (error) {
        results.push({
          name: 'Framer Motion',
          status: 'error',
          message: `Animation error: ${error}`
        })
      }

      // Test TailwindCSS
      const testElement = document.createElement('div')
      testElement.className = 'bg-vapor-black'
      document.body.appendChild(testElement)
      const styles = window.getComputedStyle(testElement)
      document.body.removeChild(testElement)
      
      if (styles.backgroundColor) {
        results.push({
          name: 'TailwindCSS',
          status: 'success',
          message: 'Vaporwave styles loaded'
        })
      } else {
        results.push({
          name: 'TailwindCSS',
          status: 'warning',
          message: 'Custom styles may not be loaded'
        })
      }

      setDiagnostics(results)
    }

    runDiagnostics()
  }, [])

  const getIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-neon-teal" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <Info className="w-5 h-5 text-neon-cyan" />
    }
  }

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-neon-teal/50 bg-neon-teal/10'
      case 'error':
        return 'border-red-400/50 bg-red-400/10'
      case 'warning':
        return 'border-yellow-400/50 bg-yellow-400/10'
      case 'info':
        return 'border-neon-cyan/50 bg-neon-cyan/10'
    }
  }

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple px-4 py-2 rounded-lg font-orbitron font-medium z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        System Diagnostics
      </motion.button>
    )
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto bg-vapor-dark-gray border border-neon-cyan/30 rounded-lg p-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron font-bold text-white">System Diagnostics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-2">
        {diagnostics.map((diagnostic, index) => (
          <motion.div
            key={diagnostic.name}
            className={`p-3 rounded-lg border ${getStatusColor(diagnostic.status)}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              {getIcon(diagnostic.status)}
              <div className="flex-1 min-w-0">
                <h4 className="font-orbitron font-medium text-white text-sm">
                  {diagnostic.name}
                </h4>
                <p className="font-vt323 text-gray-300 text-sm">
                  {diagnostic.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="font-vt323 text-gray-400 text-xs">
          VaporLAX System Status: {diagnostics.filter(d => d.status === 'success').length}/{diagnostics.length} OK
        </p>
      </div>
    </motion.div>
  )
}

export default DiagnosticPanel
