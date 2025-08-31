export interface VapeEvent {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  type: 'workshop' | 'competition' | 'meetup' | 'sale' | 'launch'
  image: string
  price?: number
  capacity?: number
  registered?: number
  featured: boolean
}

export const events: VapeEvent[] = [
  {
    id: '1',
    title: 'Cloud Chasing Championship',
    description: 'Join the ultimate cloud competition! Prizes for biggest clouds, best tricks, and most creative setups. Open to all skill levels.',
    date: new Date('2024-12-15'),
    time: '7:00 PM - 10:00 PM',
    location: 'VaporLAX Norman Store',
    type: 'competition',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    price: 10,
    capacity: 50,
    registered: 32,
    featured: true
  },
  {
    id: '2',
    title: 'Coil Building Workshop',
    description: 'Learn advanced coil building techniques from our master builders. All materials provided, bring your RDA/RTA!',
    date: new Date('2024-12-08'),
    time: '2:00 PM - 5:00 PM',
    location: 'VaporLAX Norman Store',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    price: 25,
    capacity: 15,
    registered: 8,
    featured: true
  },
  {
    id: '3',
    title: 'New Flavor Launch Party',
    description: 'Be the first to try our exclusive new flavor line! Free samples, giveaways, and special launch pricing.',
    date: new Date('2024-12-20'),
    time: '6:00 PM - 9:00 PM',
    location: 'VaporLAX Norman Store',
    type: 'launch',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    capacity: 100,
    registered: 67,
    featured: true
  },
  {
    id: '4',
    title: 'Beginner\'s Vaping 101',
    description: 'New to vaping? Learn the basics in a friendly, no-pressure environment. Perfect for those making the switch!',
    date: new Date('2024-12-12'),
    time: '7:00 PM - 8:30 PM',
    location: 'VaporLAX Norman Store',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    capacity: 20,
    registered: 14,
    featured: false
  },
  {
    id: '5',
    title: 'Weekly Vape Meetup',
    description: 'Casual meetup for the local vaping community. Share experiences, try new setups, and make friends!',
    date: new Date('2024-12-11'),
    time: '7:00 PM - 9:00 PM',
    location: 'VaporLAX Norman Store',
    type: 'meetup',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    capacity: 30,
    registered: 18,
    featured: false
  },
  {
    id: '6',
    title: 'Black Friday Midnight Sale',
    description: 'Exclusive midnight sale with doorbusters and flash deals. First 50 customers get mystery gift bags!',
    date: new Date('2024-11-29'),
    time: '12:00 AM - 6:00 AM',
    location: 'VaporLAX Norman Store',
    type: 'sale',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
    capacity: 200,
    registered: 156,
    featured: true
  }
]

export const getFeaturedEvents = (): VapeEvent[] => {
  return events.filter(event => event.featured && event.date > new Date())
}

export const getUpcomingEvents = (): VapeEvent[] => {
  return events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const getEventsByType = (type: VapeEvent['type']): VapeEvent[] => {
  return events.filter(event => event.type === type && event.date > new Date())
}