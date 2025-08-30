import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ErrorBoundary from './components/ui/ErrorBoundary'
import './styles/globals.css'
import './utils/testProducts'

// Debug logging
console.log('🚀 VaporLAX initializing...')
console.log('React version:', React.version)

// Error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

// Error handling for general errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

console.log('🎯 Rendering VaporLAX app...')

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
)
