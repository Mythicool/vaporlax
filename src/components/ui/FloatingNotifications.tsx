import { useState, useEffect } from 'react'
import { X, Gift, Zap, Star, Clock } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'

interface Notification {
  id: string
  type: 'deal' | 'update' | 'warning' | 'info'
  title: string
  message: string
  action?: {
    text: string
    url: string
  }
  duration?: number
  persistent?: boolean
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'deal',
    title: 'Flash Sale Alert!',
    message: '40% off all disposables for the next 2 hours only!',
    action: {
      text: 'SHOP NOW',
      url: '/products?category=disposables'
    },
    duration: 10000
  },
  {
    id: '2',
    type: 'update',
    title: 'New Arrivals',
    message: 'Check out the latest Elf Bar flavors just added to our collection!',
    action: {
      text: 'VIEW NEW',
      url: '/products?new=true'
    },
    duration: 8000
  },
  {
    id: '3',
    type: 'info',
    title: 'Free Shipping Weekend',
    message: 'No minimum order required. Valid through Sunday!',
    action: {
      text: 'LEARN MORE',
      url: '/shipping-info'
    },
    duration: 12000
  },
  {
    id: '4',
    type: 'warning',
    title: 'Age Verification Required',
    message: 'Must be 21+ to purchase. Have your ID ready for delivery.',
    persistent: true
  }
]

const FloatingNotifications = () => {
  const [activeNotifications, setActiveNotifications] = useState<Notification[]>([])
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Show notifications with delay
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        if (!dismissedIds.has(notification.id)) {
          setActiveNotifications(prev => {
            if (!prev.find(n => n.id === notification.id)) {
              return [...prev, notification]
            }
            return prev
          })

          // Auto-dismiss non-persistent notifications
          if (!notification.persistent && notification.duration) {
            setTimeout(() => {
              dismissNotification(notification.id)
            }, notification.duration)
          }
        }
      }, index * 3000) // Stagger notifications
    })
  }, [dismissedIds])

  const dismissNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id))
    setDismissedIds(prev => new Set([...prev, id]))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deal': return <Gift className="w-5 h-5 text-neon-pink" />
      case 'update': return <Star className="w-5 h-5 text-neon-cyan" />
      case 'warning': return <Clock className="w-5 h-5 text-neon-yellow" />
      default: return <Zap className="w-5 h-5 text-neon-purple" />
    }
  }

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'deal': return 'border-neon-pink bg-neon-pink/10'
      case 'update': return 'border-neon-cyan bg-neon-cyan/10'
      case 'warning': return 'border-neon-yellow bg-neon-yellow/10'
      default: return 'border-neon-purple bg-neon-purple/10'
    }
  }

  if (activeNotifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-40 space-y-4 max-w-sm">
      {activeNotifications.map((notification, index) => (
        <VaporwaveCard
          key={notification.id}
          className={`p-4 ${getNotificationColors(notification.type)} backdrop-blur-md animate-slide-in-right`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-orbitron font-bold text-white text-sm mb-1">
                {notification.title}
              </h4>
              <p className="font-vt323 text-gray-300 text-sm mb-3 leading-relaxed">
                {notification.message}
              </p>
              
              {notification.action && (
                <a
                  href={notification.action.url}
                  className="inline-block px-3 py-1 bg-neon-cyan text-vapor-black rounded font-vt323 text-xs font-bold hover:bg-neon-pink transition-colors"
                >
                  {notification.action.text}
                </a>
              )}
            </div>
            
            <button
              onClick={() => dismissNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </VaporwaveCard>
      ))}
    </div>
  )
}

export default FloatingNotifications