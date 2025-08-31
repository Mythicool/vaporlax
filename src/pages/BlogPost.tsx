import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from 'lucide-react'
import VaporwaveCard from '@/components/ui/VaporwaveCard'
import VaporwaveButton from '@/components/ui/VaporwaveButton'
import VaporwaveHeader from '@/components/ui/VaporwaveHeader'
import VaporwaveFooter from '@/components/ui/VaporwaveFooter'
import { getPostBySlug, getRelatedPosts } from '@/data/blogData'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/blog" replace />
  }

  const post = getPostBySlug(slug)
  
  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const relatedPosts = getRelatedPosts(post)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatContent = (content: string) => {
    // Enhanced markdown-like formatting with tables and ratings
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let i = 0
    
    while (i < lines.length) {
      const line = lines[i]
      
      // Table detection
      if (line.includes('|') && lines[i + 1]?.includes('|') && lines[i + 1]?.includes('-')) {
        const tableLines = []
        let j = i
        while (j < lines.length && lines[j].includes('|')) {
          tableLines.push(lines[j])
          j++
        }
        
        if (tableLines.length > 2) {
          const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h)
          const rows = tableLines.slice(2).map(row => 
            row.split('|').map(cell => cell.trim()).filter(cell => cell)
          )
          
          elements.push(
            <div key={i} className="my-8 overflow-x-auto">
              <table className="w-full border border-neon-cyan/30 rounded-lg overflow-hidden">
                <thead className="bg-neon-cyan/10">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-4 py-3 text-left font-orbitron font-bold text-neon-cyan border-b border-neon-cyan/30">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-gray-600/30 hover:bg-neon-cyan/5 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 font-vt323 text-gray-300">
                          <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<span class="text-neon-pink font-bold">$1</span>') }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          i = j
          continue
        }
      }
      
      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="font-orbitron font-bold text-4xl sm:text-5xl mb-8 mt-12 first:mt-0">
            <span className="holographic">{line.substring(2)}</span>
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="font-orbitron font-bold text-2xl sm:text-3xl mb-6 mt-10">
            <span className="chromatic-text" data-text={line.substring(3)}>{line.substring(3)}</span>
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="font-orbitron font-bold text-xl sm:text-2xl mb-4 mt-8 text-neon-cyan">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={i} className="font-orbitron font-bold text-lg mb-3 mt-6 text-neon-pink">
            {line.substring(5)}
          </h4>
        )
      }
      // Rating lines
      else if (line.includes('Rating') && line.includes('⭐')) {
        elements.push(
          <div key={i} className="my-4 p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
            <div className="font-vt323 text-lg text-neon-cyan font-bold" dangerouslySetInnerHTML={{ 
              __html: line.replace(/\*\*(.*?)\*\*/g, '<span class="text-neon-pink">$1</span>') 
            }} />
          </div>
        )
      }
      // List items with bold terms
      else if (line.startsWith('- **') && line.includes('**:')) {
        const [term, description] = line.substring(2).split('**:')
        elements.push(
          <li key={i} className="font-vt323 text-lg text-gray-300 mb-2 ml-6 flex">
            <span className="text-neon-pink font-bold mr-2">{term.replace('**', '')}:</span>
            <span>{description}</span>
          </li>
        )
      }
      // Regular list items
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="font-vt323 text-lg text-gray-300 mb-2 ml-6">
            {line.substring(2)}
          </li>
        )
      }
      // Quote/testimonial formatting
      else if (line.startsWith('*"') && line.endsWith('"*')) {
        const parts = line.split('" - ')
        if (parts.length === 2) {
          const quote = parts[0].substring(2)
          const author = parts[1].replace('*', '')
          elements.push(
            <blockquote key={i} className="my-6 p-6 bg-neon-purple/10 border-l-4 border-neon-purple rounded-r-lg">
              <p className="font-vt323 text-xl text-gray-300 italic mb-3">"{quote}"</p>
              <cite className="font-orbitron text-neon-purple font-bold">- {author}</cite>
            </blockquote>
          )
        }
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<br key={i} />)
      }
      // Regular paragraphs
      else if (line.trim() !== '') {
        let formattedLine = line
        // Bold text
        formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<span class="text-neon-cyan font-bold">$1</span>')
        // Italic text
        formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<span class="text-neon-pink italic">$1</span>')
        
        elements.push(
          <p key={i} className="font-vt323 text-lg text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        )
      }
      
      i++
    }
    
    return elements
  }

  return (
    <div className="min-h-screen bg-vapor-black relative">
      <VaporwaveHeader />
      
      {/* Article Header */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center text-neon-cyan hover:text-neon-pink transition-colors font-vt323 text-lg mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO CHRONICLES
          </Link>
          
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center mb-8">
            {/* Article Meta */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full font-vt323 border ${
                post.category === 'Product Reviews' 
                  ? 'bg-neon-pink/20 text-neon-pink border-neon-pink/30' 
                  : 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
              }`}>
                {post.category}
              </span>
              {post.featured && (
                <span className="px-4 py-2 bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30 rounded-full font-vt323">
                  ⭐ FEATURED
                </span>
              )}
              <div className="flex items-center text-gray-400 font-vt323">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center text-gray-400 font-vt323">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime} min read
              </div>
              <div className="flex items-center text-gray-400 font-vt323">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
            </div>
            
            <h1 className="font-orbitron font-bold text-4xl sm:text-6xl mb-6">
              <span className="holographic">{post.title}</span>
            </h1>
            
            <p className="font-vt323 text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              {post.excerpt}
            </p>
            
            {/* Article Tags Preview */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.slice(0, 5).map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm font-vt323 border border-neon-purple/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <VaporwaveButton variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                SHARE ARTICLE
              </VaporwaveButton>
              {post.category === 'Product Reviews' && (
                <VaporwaveButton variant="primary" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  VIEW PRODUCTS
                </VaporwaveButton>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-vapor-dark-gray relative">
        <div className="absolute inset-0 floating-particles opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <VaporwaveCard className="p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>
            
            {/* Author Bio Section */}
            <div className="mt-12 pt-8 border-t border-neon-cyan/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center">
                  <User className="w-8 h-8 text-vapor-black" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                    Written by {post.author}
                  </h4>
                  <p className="font-vt323 text-gray-400">
                    {post.author === 'Alex Chen' && 'VaporLAX founder and vaping technology enthusiast. 8+ years in the industry.'}
                    {post.author === 'Maya Rodriguez' && 'Product specialist and cloud chasing champion. Expert in advanced vaping techniques.'}
                    {post.author === 'Jordan Kim' && 'E-liquid connoisseur and flavor expert. Reviews the latest products and trends.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-600/30">
              <h4 className="font-orbitron font-bold text-lg text-white mb-4">Article Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm font-vt323 border border-neon-purple/30 hover:bg-neon-purple/30 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Reviews CTA */}
            {post.category === 'Product Reviews' && (
              <div className="mt-8 pt-6 border-t border-gray-600/30">
                <div className="bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 p-6 rounded-lg border border-neon-cyan/30">
                  <h4 className="font-orbitron font-bold text-xl text-white mb-3 text-center">
                    <span className="holographic">Try These Products</span>
                  </h4>
                  <p className="font-vt323 text-gray-300 text-center mb-4">
                    Experience the products featured in this review at VaporLAX
                  </p>
                  <div className="text-center">
                    <Link to="/products">
                      <VaporwaveButton variant="primary">
                        <Tag className="w-4 h-4 mr-2" />
                        SHOP NOW
                      </VaporwaveButton>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </VaporwaveCard>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-vapor-black relative">
          <div className="absolute inset-0 retro-grid opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-center mb-12">
              <span className="holographic">Related</span> <span className="chromatic-text" data-text="Articles">Articles</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <VaporwaveCard 
                  key={relatedPost.id} 
                  className="overflow-hidden group"
                  hover
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="px-3 py-1 bg-neon-teal/20 text-neon-teal rounded-full font-vt323">
                        {relatedPost.category}
                      </span>
                      <div className="flex items-center text-gray-400 font-vt323">
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedPost.readTime} min
                      </div>
                    </div>
                    
                    <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:text-neon-pink transition-colors">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="font-vt323 text-gray-300 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <VaporwaveButton variant="ghost" size="sm">
                        READ MORE
                      </VaporwaveButton>
                    </Link>
                  </div>
                </VaporwaveCard>
              ))}
            </div>
          </div>
        </section>
      )}

      <VaporwaveFooter />
    </div>
  )
}

export default BlogPost