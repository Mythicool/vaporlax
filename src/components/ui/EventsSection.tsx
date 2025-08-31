import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, DollarSign, Zap, Award, BookOpen, Coffee, ShoppingBag } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'
import { getFeaturedEvents, getUpcomingEvents } from '@/data/eventsData'
import { VapeEvent } from '@/data/eventsData'

const EventsSection = () => {
  const [featuredEvents] = useState(getFeaturedEvents())
  const [showAllEvents, setShowAllEvents] = useState(false)
  const upcomingEvents = getUpcomingEvents()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return <BookOpen className="w-6 h-6" />
      case 'competition': return <Award className="w-6 h-6" />
      case 'meetup': return <Coffee className="w-6 h-6" />
      case 'sale': return <ShoppingBag className="w-6 h-6" />
      case 'launch': return <Zap className="w-6 h-6" />
      default: return <Calendar className="w-6 h-6" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'neon-cyan'
      case 'competition': return 'neon-pink'
      case 'meetup': return 'neon-purple'
      case 'sale': return 'neon-teal'
      case 'launch': return 'neon-yellow'
      default: return 'neon-cyan'
    }
  }

  const getAvailabilityStatus = (event: VapeEvent) => {
    if (!event.capacity) return null
    
    const spotsLeft = event.capacity - (event.registered || 0)
    const percentFull = ((event.registered || 0) / event.capacity) * 100
    
    if (spotsLeft <= 0) return { text: 'SOLD OUT', color: 'neon-pink' }
    if (percentFull >= 80) return { text: `${spotsLeft} spots left`, color: 'neon-yellow' }
    if (percentFull >= 50) return { text: `${spotsLeft} spots available`, color: 'neon-cyan' }
    return { text: 'Plenty of spots', color: 'neon-teal' }
  }

  return (
    <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Calendar className="w-16 h-16 text-neon-purple mx-auto mb-6 animate-pulse" />
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Community</span> <span className="chromatic-text" data-text="Events">Events</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            Join the <span className="neon-text-cyan">VaporLAX community</span> for exclusive events and competitions
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="font-orbitron font-bold text-2xl text-center mb-8">
              <span className="neon-text-pink">Featured Events</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.slice(0, 2).map((event, index) => (
                <VaporwaveCard 
                  key={event.id} 
                  className="overflow-hidden group"
                  glow
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 bg-${getEventColor(event.type)}/90 text-vapor-black rounded-full font-vt323 text-sm font-bold flex items-center gap-1`}>
                        {getEventIcon(event.type)}
                        {event.type.toUpperCase()}
                      </div>
                    </div>
                    {getAvailabilityStatus(event) && (
                      <div className="absolute top-4 right-4">
                        <div className={`px-2 py-1 bg-${getAvailabilityStatus(event)!.color}/90 text-vapor-black rounded font-vt323 text-xs font-bold`}>
                          {getAvailabilityStatus(event)!.text}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="font-vt323 text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-6 text-sm font-vt323 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neon-cyan" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neon-pink" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-neon-purple" />
                        {event.location}
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-neon-teal" />
                          {event.registered || 0}/{event.capacity} registered
                        </div>
                      )}
                      {event.price && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-neon-yellow" />
                          ${event.price}
                        </div>
                      )}
                    </div>
                    
                    <VaporwaveButton 
                      variant="primary" 
                      size="sm" 
                      className="w-full"
                      disabled={getAvailabilityStatus(event)?.text === 'SOLD OUT'}
                    >
                      {getAvailabilityStatus(event)?.text === 'SOLD OUT' ? 'SOLD OUT' : 'REGISTER NOW'}
                    </VaporwaveButton>
                  </div>
                </VaporwaveCard>
              ))}
            </div>
          </div>
        )}

        {/* All Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-orbitron font-bold text-2xl">
              <span className="neon-text-cyan">Upcoming Events</span>
            </h3>
            <VaporwaveButton
              variant="ghost"
              onClick={() => setShowAllEvents(!showAllEvents)}
            >
              {showAllEvents ? 'SHOW LESS' : 'VIEW ALL'}
            </VaporwaveButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllEvents ? upcomingEvents : upcomingEvents.slice(0, 3)).map((event, index) => (
              <VaporwaveCard 
                key={event.id} 
                className="p-6 group"
                hover
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-${getEventColor(event.type)}/20 rounded-full flex items-center justify-center border border-${getEventColor(event.type)}/50`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {event.title}
                    </h4>
                    <p className="font-vt323 text-sm text-gray-400">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </p>
                  </div>
                </div>
                
                <p className="font-vt323 text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-1 mb-4 text-xs font-vt323 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.date)} • {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  {event.price && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      ${event.price}
                    </div>
                  )}
                </div>
                
                {getAvailabilityStatus(event) && (
                  <div className="mb-4">
                    <span className={`text-${getAvailabilityStatus(event)!.color} font-vt323 text-sm`}>
                      {getAvailabilityStatus(event)!.text}
                    </span>
                  </div>
                )}
                
                <VaporwaveButton 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  disabled={getAvailabilityStatus(event)?.text === 'SOLD OUT'}
                >
                  {getAvailabilityStatus(event)?.text === 'SOLD OUT' ? 'SOLD OUT' : 'LEARN MORE'}
                </VaporwaveButton>
              </VaporwaveCard>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-16 text-center">
          <VaporwaveCard className="p-8 bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10">
            <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
              <span className="holographic">Join Our</span> <span className="neon-text-cyan">Community</span>
            </h3>
            <p className="font-vt323 text-lg text-gray-300 mb-6">
              Connect with fellow vapers, learn new techniques, and stay updated on the latest events!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <VaporwaveButton variant="primary">
                JOIN DISCORD
              </VaporwaveButton>
              <VaporwaveButton variant="ghost">
                FOLLOW ON INSTAGRAM
              </VaporwaveButton>
            </div>
          </VaporwaveCard>
        </div>
      </div>
    </section>
  )
}

export default EventsSection