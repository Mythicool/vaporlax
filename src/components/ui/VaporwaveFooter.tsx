import { Link } from 'react-router-dom'

const VaporwaveFooter = () => {
  return (
    <footer className="bg-vapor-black border-t border-neon-cyan/30 py-12 relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h3 className="font-orbitron font-bold text-2xl holographic mb-4">VaporLAX</h3>
          <p className="font-vt323 text-lg text-neon-cyan mb-2">PREMIUM VAPING EXPERIENCE</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h4 className="font-orbitron font-bold text-neon-pink mb-3">QUICK LINKS</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">Products</Link>
              <Link to="/about" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">About Us</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-neon-cyan transition-colors font-vt323">Contact</Link>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-orbitron font-bold text-neon-purple mb-3">SUPPORT</h4>
            <div className="space-y-2">
              <p className="text-gray-400 font-vt323">24/7 Customer Service</p>
              <p className="text-gray-400 font-vt323">Free Shipping Over $50</p>
              <p className="text-gray-400 font-vt323">30-Day Returns</p>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-orbitron font-bold text-neon-teal mb-3">CONNECT</h4>
            <div className="space-y-2">
              <p className="text-gray-400 font-vt323">info@vaporlax.com</p>
              <p className="text-gray-400 font-vt323">1-800-VAPOR-LAX</p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-8 h-8 border border-neon-cyan rounded hover:bg-neon-cyan/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 border border-neon-pink rounded hover:bg-neon-pink/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 border border-neon-purple rounded hover:bg-neon-purple/20 transition-colors cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neon-cyan/20 pt-8 text-center">
          <p className="text-gray-400 font-vt323 text-lg mb-2">
            © 2024 VaporLAX. All rights reserved.
          </p>
          <p className="text-neon-pink font-vt323 text-sm animate-pulse">
            ⚠️ Must be 21+ to purchase. Vape responsibly. ⚠️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default VaporwaveFooter