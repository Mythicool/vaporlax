import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, User, Tag, Filter } from 'lucide-react'
import VaporwaveCard from '@/components/ui/VaporwaveCard'
import VaporwaveButton from '@/components/ui/VaporwaveButton'
import VaporwaveHeader from '@/components/ui/VaporwaveHeader'
import VaporwaveFooter from '@/components/ui/VaporwaveFooter'
import { blogPosts, blogCategories, getFeaturedPosts, getRecentPosts } from '@/data/blogData'
import { BlogPost } from '@/types'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const featuredPosts = getFeaturedPosts()
  const recentPosts = getRecentPosts()

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-vapor-black relative">
      <VaporwaveHeader />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden floating-particles">
        <div className="absolute inset-0 retro-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <h1 className="font-orbitron font-bold text-5xl sm:text-7xl mb-8">
              <span className="holographic">Vapor</span> <span className="chromatic-text" data-text="Chronicles">Chronicles</span>
            </h1>
            <p className="font-vt323 text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Dive into the <span className="neon-text-cyan">digital realm</span> of vaping knowledge, 
              where <span className="neon-text-pink">cutting-edge insights</span> meet 
              <span className="neon-text-purple">cyberpunk culture</span>
            </p>
            
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="font-orbitron font-bold text-3xl text-neon-cyan mb-2">{blogPosts.length}</div>
                <div className="font-vt323 text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron font-bold text-3xl text-neon-pink mb-2">{blogCategories.length}</div>
                <div className="font-vt323 text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron font-bold text-3xl text-neon-purple mb-2">3</div>
                <div className="font-vt323 text-gray-400">Expert Authors</div>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-cyan w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search the chronicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-vapor-dark-gray/90 backdrop-blur-md border border-neon-cyan/50 rounded-lg text-white placeholder-gray-400 font-vt323 text-lg focus:outline-none focus:border-neon-pink transition-colors"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <VaporwaveButton
                  variant={showFilters ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  FILTERS
                </VaporwaveButton>
                
                {showFilters && (
                  <div className="w-full flex flex-wrap justify-center gap-2 mt-4">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`px-4 py-2 rounded-full font-vt323 text-sm transition-all duration-300 ${
                        selectedCategory === 'All'
                          ? 'bg-neon-cyan text-vapor-black'
                          : 'bg-vapor-dark-gray/50 text-gray-300 hover:text-neon-cyan border border-neon-cyan/30'
                      }`}
                    >
                      ALL
                    </button>
                    {blogCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-full font-vt323 text-sm transition-all duration-300 ${
                          selectedCategory === category.name
                            ? `bg-${category.color} text-vapor-black`
                            : `bg-vapor-dark-gray/50 text-gray-300 hover:text-${category.color} border border-${category.color}/30`
                        }`}
                      >
                        {category.name.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-vapor-dark-gray relative">
          <div className="absolute inset-0 retro-grid opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 via-transparent to-neon-teal/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block p-3 rounded-full bg-neon-pink/10 border border-neon-pink/30 mb-6">
                <span className="text-neon-pink text-xl">⭐</span>
              </div>
              <h2 className="font-orbitron font-bold text-3xl sm:text-4xl mb-4">
                <span className="holographic">Featured</span> <span className="chromatic-text" data-text="Articles">Articles</span>
              </h2>
              <p className="font-vt323 text-xl text-gray-400 max-w-2xl mx-auto">
                Handpicked articles from our <span className="text-neon-cyan">expert team</span> covering the latest in vaping technology and culture
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <VaporwaveCard 
                  key={post.id} 
                  className="overflow-hidden group relative"
                  hover
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-neon-yellow/90 text-vapor-black rounded-full font-vt323 text-xs font-bold">
                      FEATURED
                    </div>
                  </div>
                  
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vapor-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full font-vt323 border border-neon-cyan/30">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-400 font-vt323">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min read
                      </div>
                    </div>
                    
                    <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-neon-pink transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="font-vt323 text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400 font-vt323">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <VaporwaveButton variant="primary" size="sm">
                          READ MORE
                        </VaporwaveButton>
                      </Link>
                    </div>
                  </div>
                </VaporwaveCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-vapor-black relative">
        <div className="absolute inset-0 floating-particles opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl">
              <span className="holographic">All</span> <span className="chromatic-text" data-text="Posts">Posts</span>
            </h2>
            
            <div className="text-neon-cyan font-vt323 text-lg">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <VaporwaveCard className="text-center p-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
                No Articles Found
              </h3>
              <p className="font-vt323 text-xl text-gray-300 mb-6">
                Try adjusting your search terms or filters
              </p>
              <VaporwaveButton
                variant="primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
              >
                RESET FILTERS
              </VaporwaveButton>
            </VaporwaveCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <VaporwaveCard 
                  key={post.id} 
                  className="overflow-hidden group relative transform hover:scale-105 transition-all duration-300"
                  hover
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* New/Hot Badge for recent posts */}
                  {new Date().getTime() - post.publishedAt.getTime() < 7 * 24 * 60 * 60 * 1000 && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-2 py-1 bg-neon-pink/90 text-vapor-black rounded-full font-vt323 text-xs font-bold animate-pulse">
                        NEW
                      </div>
                    </div>
                  )}
                  
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vapor-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Reading time overlay */}
                    <div className="absolute bottom-4 right-4 bg-vapor-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center text-neon-cyan font-vt323 text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}m
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded-full font-vt323 border border-neon-pink/30">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-400 font-vt323">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                    
                    <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-neon-cyan transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="font-vt323 text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-400 font-vt323">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <VaporwaveButton variant="ghost" size="sm" className="group-hover:bg-neon-cyan/20 group-hover:text-neon-cyan">
                          READ MORE
                        </VaporwaveButton>
                      </Link>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-xs font-vt323 border border-neon-purple/30 hover:bg-neon-purple/30 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs font-vt323">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </VaporwaveCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-vapor-dark-gray relative">
        <div className="absolute inset-0 retro-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-center mb-12">
            <span className="holographic">Explore</span> <span className="chromatic-text" data-text="Categories">Categories</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCategories.map((category, index) => (
              <VaporwaveCard 
                key={category.id} 
                className="p-6 text-center group cursor-pointer"
                hover
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${category.color}/20 flex items-center justify-center border-2 border-${category.color}/50 group-hover:scale-110 transition-transform duration-300`}>
                  <Tag className={`w-8 h-8 text-${category.color}`} />
                </div>
                
                <h3 className="font-orbitron font-bold text-xl text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {category.name}
                </h3>
                
                <p className="font-vt323 text-gray-300 mb-4">
                  {category.description}
                </p>
                
                <div className="text-sm text-gray-400 font-vt323">
                  {blogPosts.filter(post => post.category === category.name).length} articles
                </div>
              </VaporwaveCard>
            ))}
          </div>
        </div>
      </section>



      {/* Newsletter Signup Section */}
      <section className="py-16 bg-vapor-black relative">
        <div className="absolute inset-0 floating-particles opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-neon-pink/5 to-neon-purple/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <VaporwaveCard className="p-8 sm:p-12 text-center">
            <div className="inline-block p-4 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full flex items-center justify-center">
                <span className="text-xl">📧</span>
              </div>
            </div>
            
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl mb-4">
              <span className="holographic">Stay</span> <span className="chromatic-text" data-text="Connected">Connected</span>
            </h2>
            
            <p className="font-vt323 text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the latest <span className="text-neon-cyan">product reviews</span>, 
              <span className="text-neon-pink"> exclusive insights</span>, and 
              <span className="text-neon-purple"> industry updates</span> delivered to your inbox
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-4 mb-4">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-3 bg-vapor-dark-gray/90 backdrop-blur-md border border-neon-cyan/50 rounded-lg text-white placeholder-gray-400 font-vt323 text-lg focus:outline-none focus:border-neon-pink transition-colors"
                />
                <VaporwaveButton variant="primary">
                  SUBSCRIBE
                </VaporwaveButton>
              </div>
              
              <p className="font-vt323 text-sm text-gray-400">
                Join <span className="text-neon-cyan">2,500+</span> vapers getting weekly insights. 
                Unsubscribe anytime.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-pink/20 flex items-center justify-center">
                  <span className="text-neon-pink">🔍</span>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">Expert Reviews</h4>
                <p className="font-vt323 text-gray-400 text-sm">In-depth product analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <span className="text-neon-cyan">💡</span>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">Pro Tips</h4>
                <p className="font-vt323 text-gray-400 text-sm">Advanced techniques & guides</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-purple/20 flex items-center justify-center">
                  <span className="text-neon-purple">🎯</span>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">Exclusive Deals</h4>
                <p className="font-vt323 text-gray-400 text-sm">Subscriber-only offers</p>
              </div>
            </div>
          </VaporwaveCard>
        </div>
      </section>

      <VaporwaveFooter />
    </div>
  )
}

export default Blog