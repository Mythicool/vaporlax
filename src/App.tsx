import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load components
const SimpleHome = lazy(() => import('./pages/SimpleHome'))
const SimpleProducts = lazy(() => import('./pages/SimpleProducts'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Simple loading component without Framer Motion
const SimpleLoader = () => (
  <div className="min-h-screen bg-vapor-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white font-orbitron">Loading VaporLAX...</p>
    </div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-vapor-black">
      <Suspense fallback={<SimpleLoader />}>
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/products" element={<SimpleProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
