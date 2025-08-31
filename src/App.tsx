import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load components
const SimpleHome = lazy(() => import('./pages/SimpleHome'))
const SimpleProducts = lazy(() => import('./pages/SimpleProducts'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

import VaporwaveLoader from './components/ui/VaporwaveLoader'
import VaporwaveBackground from './components/ui/VaporwaveBackground'

// Enhanced loading component with vaporwave effects
const VaporwaveLoadingScreen = () => (
  <div className="min-h-screen bg-vapor-black flex items-center justify-center relative overflow-hidden">
    <VaporwaveBackground intensity="low" />
    <div className="relative z-10">
      <VaporwaveLoader size="lg" text="Initializing VaporLAX..." />
    </div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-vapor-black relative">
      <VaporwaveBackground intensity="low" />
      <div className="relative z-10">
        <Suspense fallback={<VaporwaveLoadingScreen />}>
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
    </div>
  )
}

export default App
