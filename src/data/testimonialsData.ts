export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product?: string;
  avatar: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Norman, OK',
    rating: 5,
    text: "VaporLAX completely changed my vaping experience! The staff is incredibly knowledgeable and helped me find the perfect setup. The neon aesthetic of their store matches the quality of their products perfectly.",
    product: 'SMOK Nord 4',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus T.',
    location: 'Oklahoma City, OK',
    rating: 5,
    text: "Been vaping for 3 years and VaporLAX has the best selection I've seen. Their disposables last longer than advertised and the flavors are incredible. Plus, their cyberpunk vibe is just awesome!",
    product: 'Elf Bar BC5000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: '3',
    name: 'Jessica L.',
    location: 'Edmond, OK',
    rating: 5,
    text: "As a beginner, I was overwhelmed by all the options. The VaporLAX team took time to explain everything and set me up with a perfect starter kit. Their blog articles are super helpful too!",
    product: 'Vaporesso XROS 3',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: '4',
    name: 'David R.',
    location: 'Moore, OK',
    rating: 5,
    text: "VaporLAX isn't just a vape shop - it's a community. Their cloud chasing events are legendary, and their competition-grade equipment is top-notch. The future of vaping is here!",
    product: 'GeekVape Aegis Legend 2',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: '5',
    name: 'Amanda K.',
    location: 'Yukon, OK',
    rating: 5,
    text: "The online ordering is seamless and delivery is super fast. Love how they verify age properly and package everything securely. Their customer service is available 24/7 which is amazing!",
    product: 'Lost Vape Orion Bar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: '6',
    name: 'Tyler B.',
    location: 'Mustang, OK',
    rating: 5,
    text: "Their coil building workshops are incredible! Learned so much about advanced techniques. The staff really knows their stuff and the vaporwave aesthetic makes shopping there an experience.",
    product: 'Custom Build',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
]

export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}