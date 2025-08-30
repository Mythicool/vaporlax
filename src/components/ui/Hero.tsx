import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Star } from 'lucide-react'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-vapor-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-neon-cyan/30 rotate-45"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 border-2 border-neon-pink/30 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 border-2 border-neon-purple/30"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-cyan/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-neon-purple/5 via-transparent to-neon-teal/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <img
              src="/vaporlax-logo.png"
              alt="VaporLAX"
              className="h-32 w-auto mx-auto mb-4"
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-orbitron font-black text-4xl sm:text-6xl lg:text-8xl mb-6"
            variants={itemVariants}
          >
            <span className="block gradient-text animate-neon-pulse">
              VAPOR
            </span>
            <span className="block text-white">
              LAX
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-vt323 text-xl sm:text-2xl lg:text-3xl text-neon-cyan mb-4"
            variants={itemVariants}
          >
            VAPE SHOP
          </motion.p>

          {/* Description */}
          <motion.p
            className="font-vt323 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Experience the future of vaping with premium products, 
            cutting-edge technology, and unmatched style. 
            Welcome to the neon-soaked world of VaporLAX.
          </motion.p>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 text-neon-teal">
              <Star className="w-5 h-5" />
              <span className="font-orbitron font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-pink">
              <Zap className="w-5 h-5" />
              <span className="font-orbitron font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-purple">
              <Star className="w-5 h-5" />
              <span className="font-orbitron font-medium">21+ Only</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Link to="/products">
              <motion.button
                className="neon-button neon-button-pink px-8 py-4 text-lg flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                className="neon-button px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LEARN MORE
              </motion.button>
            </Link>
          </motion.div>

          {/* Age Verification Notice */}
          <motion.div
            className="mt-12 p-4 border border-neon-cyan/30 rounded-lg bg-vapor-dark-gray/50 max-w-md mx-auto"
            variants={itemVariants}
          >
            <p className="text-neon-cyan font-orbitron font-bold text-sm mb-2">
              AGE VERIFICATION REQUIRED
            </p>
            <p className="text-gray-300 font-vt323 text-sm">
              You must be 21 years or older to purchase vaping products. 
              Please vape responsibly.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-neon-cyan rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
