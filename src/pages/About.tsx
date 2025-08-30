import { motion } from 'framer-motion'
import { Zap, Shield, Users, Award, Target, Heart } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We source only the highest quality products from trusted manufacturers, ensuring every item meets our strict standards.',
      color: 'neon-cyan',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building a supportive community of vaping enthusiasts who share knowledge, experiences, and passion for the culture.',
      color: 'neon-pink',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Staying at the forefront of vaping technology, bringing you the latest innovations and cutting-edge products.',
      color: 'neon-purple',
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Providing exceptional customer service with expert guidance, fast shipping, and comprehensive support.',
      color: 'neon-teal',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support' },
  ]

  return (
    <motion.div
      className="min-h-screen bg-vapor-black pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <img
                src="/vaporlax-logo.png"
                alt="VaporLAX"
                className="h-24 w-auto mx-auto mb-4"
              />
            </motion.div>
            
            <h1 className="font-orbitron font-bold text-4xl sm:text-6xl gradient-text mb-6">
              About VaporLAX
            </h1>
            
            <p className="font-vt323 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Born from the neon-soaked streets of Los Angeles, VaporLAX represents 
              the fusion of cutting-edge vaping technology with cyberpunk aesthetics. 
              We're not just a vape shop – we're a gateway to the future of vaping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-vapor-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-6">
                Our Story
              </h2>
              
              <div className="space-y-6 font-vt323 text-lg text-gray-300 leading-relaxed">
                <p>
                  Founded in 2020 by a group of vaping enthusiasts and tech innovators,
                  VaporLAX emerged from a shared vision: to create a vaping experience
                  that transcends the ordinary and embraces the extraordinary.
                </p>

                <p>
                  Starting in Los Angeles and now proudly serving Norman, Oklahoma,
                  we've brought the vibrant neon aesthetic and cutting-edge vaping
                  technology to the heart of the Midwest. Our two Norman locations
                  offer the same premium experience with local community focus.
                </p>

                <p>
                  Today, VaporLAX stands as a beacon for vapers who demand more than
                  just functionality – they want products that reflect their personality,
                  their passion, and their connection to a community that values
                  innovation and authenticity.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gradient-to-br from-neon-pink/20 to-neon-cyan/20 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-neon-purple mx-auto mb-4" />
                  <h3 className="font-orbitron font-bold text-2xl gradient-text mb-2">
                    Innovation Driven
                  </h3>
                  <p className="font-vt323 text-lg text-gray-300">
                    Pushing the boundaries of what's possible in vaping technology
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-vapor-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-4">
              Our Values
            </h2>
            <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at VaporLAX
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="neon-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${value.color}/20 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${value.color}`} />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="font-vt323 text-lg text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-vapor-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text mb-4">
              By the Numbers
            </h2>
            <p className="font-vt323 text-xl text-gray-300">
              Our impact on the vaping community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="font-orbitron font-black text-4xl sm:text-5xl gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="font-vt323 text-lg text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-vapor-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <Target className="w-12 h-12 text-neon-pink mr-4" />
              <h2 className="font-orbitron font-bold text-3xl sm:text-4xl gradient-text">
                Our Mission
              </h2>
            </div>
            
            <p className="font-vt323 text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8">
              To revolutionize the vaping experience by providing premium products, 
              exceptional service, and fostering a community where innovation meets passion. 
              We believe vaping is more than a habit – it's a lifestyle, an art form, 
              and a gateway to self-expression.
            </p>

            <div className="neon-card p-8">
              <h3 className="font-orbitron font-bold text-xl text-neon-cyan mb-4">
                Age Verification & Responsibility
              </h3>
              <p className="font-vt323 text-lg text-gray-300">
                VaporLAX is committed to responsible vaping. All our products are intended 
                for adults 21 years and older. We strictly verify age for all purchases 
                and promote safe, responsible vaping practices within our community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
