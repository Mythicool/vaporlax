import { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '../ecommerce/CartDrawer'
import LoadingSpinner from '../ui/LoadingSpinner'
import DiagnosticPanel from '../ui/DiagnosticPanel'
import { useUIStore } from '@/lib/store'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isStoreReady, setIsStoreReady] = useState(false)

  // Safely get loading state with fallback
  const isLoading = useUIStore((state) => {
    try {
      return state.isLoading
    } catch {
      return false
    }
  })

  useEffect(() => {
    // Ensure store is initialized before rendering
    const timer = setTimeout(() => {
      setIsStoreReady(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  if (!isStoreReady) {
    return (
      <div className="min-h-screen bg-vapor-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-vapor-black">
      <Header />
      
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      <Footer />
      
      {/* Cart Drawer */}
      <CartDrawer />
      
      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-vapor-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Diagnostic Panel (development only) */}
      {process.env.NODE_ENV === 'development' && <DiagnosticPanel />}
    </div>
  )
}

export default Layout
