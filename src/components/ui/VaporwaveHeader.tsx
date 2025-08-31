import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const VaporwaveHeader = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'HOME', color: 'neon-cyan' },
    { path: '/products', label: 'PRODUCTS', color: 'neon-pink' },
    { path: '/about', label: 'ABOUT', color: 'neon-purple' },
    { path: '/contact', label: 'CONTACT', color: 'neon-teal' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-vapor-dark-gray/95 backdrop-blur-md border-b border-neon-cyan/30 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="font-orbitron font-bold text-3xl holographic group-hover:scale-105 transition-transform duration-300">
            VaporLAX
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-vt323 text-lg transition-all duration-300 hover:scale-110 relative group ${
                isActive(item.path)
                  ? `text-${item.color} font-bold`
                  : `text-white hover:text-${item.color}`
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-${item.color} transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden neon-button px-4 py-2 text-sm"
        >
          {mobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-neon-cyan/30">
          <nav className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-vt323 text-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? `text-${item.color} font-bold`
                    : `text-white hover:text-${item.color}`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default VaporwaveHeader