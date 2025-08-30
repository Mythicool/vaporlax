import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Best Sellers', href: '/products?filter=bestsellers' },
      { name: 'Sale Items', href: '/products?filter=sale' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Age Verification', href: '/age-verification' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ]

  return (
    <footer className="bg-vapor-dark-gray border-t border-neon-cyan/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img
                src="/vaporlax-logo.png"
                alt="VaporLAX"
                className="h-10 w-auto"
              />
              <span className="font-orbitron font-bold text-xl gradient-text">
                VaporLAX
              </span>
            </Link>
            <p className="text-gray-300 mb-6 font-vt323 text-lg">
              Your premium destination for the latest vaping products and accessories. 
              Experience the future of vaping with VaporLAX.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-neon-cyan" />
                <span className="font-vt323">info@vaporlax.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-neon-cyan" />
                <span className="font-vt323">(405) 217-2299</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-neon-cyan" />
                <span className="font-vt323">Norman, OK</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-orbitron font-bold text-neon-pink mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-vt323 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-orbitron font-bold text-neon-pink mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-vt323 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-orbitron font-bold text-neon-pink mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-vt323 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="font-orbitron font-bold text-neon-cyan mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="text-gray-300 hover:text-neon-pink transition-colors duration-300"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-neon-cyan/30 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-orbitron font-bold text-neon-purple mb-2">
              Stay in the Loop
            </h3>
            <p className="text-gray-300 mb-4 font-vt323 text-lg">
              Get the latest updates on new products and exclusive deals
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-vapor-black border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323"
              />
              <motion.button
                className="neon-button neon-button-pink px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-cyan/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-vt323 text-lg">
            © {currentYear} VaporLAX. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 font-vt323 text-lg">
              Must be 21+ to purchase. Please vape responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
