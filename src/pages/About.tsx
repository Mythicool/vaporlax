import { Zap, Shield, Users, Award, Target, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import VaporwaveCard from '@/components/ui/VaporwaveCard'
import VaporwaveButton from '@/components/ui/VaporwaveButton'

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
    <div className="min-h-screen bg-vapor-black relative">
      {/* Enhanced Header */}
      <header className="bg-vapor-dark-gray/95 backdrop-blur-md border-b border-neon-cyan/30 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-orbitron font-bold text-3xl holographic group-hover:scale-105 transition-transform duration-300">
              VaporLAX
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-vt323 text-lg text-white hover:text-neon-cyan transition-all duration-300 hover:scale-110 relative group">
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/products" className="font-vt323 text-lg text-white hover:text-neon-pink transition-all duration-300 hover:scale-110 relative group">
              PRODUCTS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-pink group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="font-vt323 text-lg text-neon-purple font-bold relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-purple"></span>
            </Link>
            <Link to="/contact" className="font-vt323 text-lg text-white hover:text-neon-teal transition-all duration-300 hover:scale-110 relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-teal group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden neon-button px-4 py-2 text-sm">
            MENU
          </button>
        </div>
      </header>
      
      <div className="pt-8">
        {/* Enhanced Hero Section */}
        <section className="py-20 relative overflow-hidden floating-particles">
          <div className="absolute inset-0 retro-grid opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="mb-12">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                  <div className="absolute inset-0 border-4 border-neon-cyan rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
                  <div className="absolute inset-4 border-4 border-neon-pink rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-8 border-4 border-neon-purple rounded-full animate-spin" style={{ animationDuration: '6s' }}></div>
                  <div className="absolute inset-12 bg-neon-teal rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <h1 className="font-orbitron font-bold text-5xl sm:text-7xl mb-8">
                <span className="holographic">About</span> <span className="chromatic-text" data-text="VaporLAX">VaporLAX</span>
              </h1>
              
              <p className="font-vt323 text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Born from the <span className="neon-text-pink">neon-soaked</span> streets of Los Angeles, VaporLAX represents 
                the fusion of cutting-edge vaping technology with <span className="neon-text-cyan">cyberpunk</span> aesthetics. 
                We're not just a vape shop – we're a <span className="neon-text-purple">gateway</span> to the future of vaping.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                <Link to="/products">
                  <VaporwaveButton variant="primary" size="lg">
                    EXPLORE PRODUCTS
                  </VaporwaveButton>
                </Link>
                <Link to="/contact">
                  <VaporwaveButton variant="secondary" size="lg">
                    GET IN TOUCH
                  </VaporwaveButton>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-neon-cyan opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 border-2 border-neon-pink opacity-40 animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-neon-purple opacity-25 animate-pulse-slow"></div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-vapor-dark-gray relative">
          <div className="absolute inset-0 retro-grid opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-orbitron font-bold text-4xl sm:text-5xl mb-8">
                  <span className="holographic">Our</span> <span className="chromatic-text" data-text="Story">Story</span>
                </h2>
                
                <div className="space-y-6 font-vt323 text-xl text-gray-300 leading-relaxed">
                  <p>
                    Founded in <span className="neon-text-cyan">2020</span> by a group of vaping enthusiasts and tech innovators,
                    VaporLAX emerged from a shared vision: to create a vaping experience
                    that transcends the ordinary and embraces the <span className="neon-text-pink">extraordinary</span>.
                  </p>

                  <p>
                    Starting in <span className="neon-text-purple">Los Angeles</span> and now proudly serving Norman, Oklahoma,
                    we've brought the vibrant neon aesthetic and cutting-edge vaping
                    technology to the heart of the Midwest. Our two Norman locations
                    offer the same premium experience with <span className="neon-text-teal">local community</span> focus.
                  </p>

                  <p>
                    Today, VaporLAX stands as a beacon for vapers who demand more than
                    just functionality – they want products that reflect their <span className="neon-text-cyan">personality</span>,
                    their passion, and their connection to a community that values
                    innovation and authenticity.
                  </p>
                </div>
              </div>

              <div className="relative">
                <VaporwaveCard className="p-8" glow>
                  <div className="text-center">
                    <Zap className="w-24 h-24 text-neon-purple mx-auto mb-6 animate-pulse" />
                    <h3 className="font-orbitron font-bold text-2xl holographic mb-4">
                      Innovation Driven
                    </h3>
                    <p className="font-vt323 text-lg text-gray-300">
                      Pushing the boundaries of what's possible in vaping technology
                    </p>
                  </div>
                </VaporwaveCard>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-vapor-black relative">
          <div className="absolute inset-0 floating-particles opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-orbitron font-bold text-4xl sm:text-5xl mb-6">
                <span className="holographic">Our</span> <span className="chromatic-text" data-text="Values">Values</span>
              </h2>
              <p className="font-vt323 text-2xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide everything we do at <span className="neon-text-cyan">VaporLAX</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <VaporwaveCard 
                    key={value.title} 
                    className="text-center p-6"
                    hover
                    animated
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${value.color}/20 flex items-center justify-center border-2 border-${value.color}/50`}>
                      <Icon className={`w-8 h-8 text-${value.color}`} />
                    </div>
                    <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="font-vt323 text-lg text-gray-300">
                      {value.description}
                    </p>
                  </VaporwaveCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-vapor-dark-gray relative">
          <div className="absolute inset-0 retro-grid opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-orbitron font-bold text-4xl sm:text-5xl mb-6">
                <span className="holographic">By</span> <span className="chromatic-text" data-text="Numbers">the Numbers</span>
              </h2>
              <p className="font-vt323 text-2xl text-gray-300">
                Our impact on the <span className="neon-text-purple">vaping community</span>
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="font-orbitron font-black text-5xl sm:text-6xl holographic mb-4">
                    {stat.number}
                  </div>
                  <div className="font-vt323 text-xl text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-vapor-black relative">
          <div className="absolute inset-0 floating-particles opacity-15"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Target className="w-12 h-12 text-neon-pink mr-4 animate-pulse" />
              <h2 className="font-orbitron font-bold text-4xl sm:text-5xl">
                <span className="holographic">Our</span> <span className="chromatic-text" data-text="Mission">Mission</span>
              </h2>
            </div>
            
            <p className="font-vt323 text-2xl sm:text-3xl text-gray-300 leading-relaxed mb-12">
              To revolutionize the vaping experience by providing <span className="neon-text-cyan">premium products</span>, 
              exceptional service, and fostering a community where <span className="neon-text-pink">innovation</span> meets passion. 
              We believe vaping is more than a habit – it's a <span className="neon-text-purple">lifestyle</span>, an art form, 
              and a gateway to <span className="neon-text-teal">self-expression</span>.
            </p>

            <VaporwaveCard className="p-8" glow>
              <h3 className="font-orbitron font-bold text-2xl text-neon-cyan mb-6">
                Age Verification & Responsibility
              </h3>
              <p className="font-vt323 text-xl text-gray-300 leading-relaxed">
                VaporLAX is committed to <span className="neon-text-pink">responsible vaping</span>. All our products are intended 
                for adults <span className="neon-text-cyan">21 years and older</span>. We strictly verify age for all purchases 
                and promote safe, responsible vaping practices within our community.
              </p>
            </VaporwaveCard>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About