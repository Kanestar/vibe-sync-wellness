import { CommunityPost, WellnessKit, SessionHistory, FavoriteRoutine } from '../types';

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=100&h=100',
    content: 'Just finished my morning breathing exercise! Feeling so centered and ready for the day. The lavender scent recommendation was perfect! 🌸',
    mood: 'calm',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    likes: 12,
    comments: 3,
    tags: ['breathing', 'morning', 'lavender']
  },
  {
    id: '2',
    author: 'Mike R.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=100&h=100',
    content: 'Work stress was getting to me, but the quick desk stretches and peppermint aromatherapy combo worked wonders! Thanks VibeSync! 💪',
    mood: 'stressed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 8,
    comments: 1,
    tags: ['work', 'stress', 'stretches']
  },
  {
    id: '3',
    author: 'Emma L.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=100&h=100',
    content: 'Creative block is gone! The jasmine scent and upbeat playlist got my artistic juices flowing again. Currently painting my best piece yet! 🎨',
    mood: 'creative',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 15,
    comments: 5,
    tags: ['creative', 'painting', 'jasmine', 'music']
  },
  {
    id: '4',
    author: 'David K.',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&w=100&h=100',
    content: 'Energy levels through the roof today! The citrus aromatherapy and dance break combo is my new favorite. Who else loves the energetic playlists? ⚡',
    mood: 'energetic',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 20,
    comments: 7,
    tags: ['energy', 'dance', 'citrus', 'playlists']
  },
  {
    id: '5',
    author: 'Lisa T.',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&w=100&h=100',
    content: 'Deep focus mode activated! The rosemary scent and instrumental music helped me power through my project. Productivity level: 100! 🎯',
    mood: 'focused',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 11,
    comments: 2,
    tags: ['focus', 'productivity', 'rosemary', 'instrumental']
  }
];

export const mockWellnessKits: WellnessKit[] = [
  {
    id: '1',
    name: 'Calm & Centered Kit',
    description: 'Everything you need for deep relaxation and stress relief',
    items: [
      'Lavender essential oil (10ml)',
      'Chamomile tea blend (50g)',
      'Meditation cushion',
      'Breathing exercise guide',
      'Stress relief journal',
      'Aromatherapy diffuser',
      'Relaxation playlist access'
    ],
    price: 49.99,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&w=400&h=300',
    deliveryStatus: 'preparing',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  },
  {
    id: '2',
    name: 'Energy Boost Kit',
    description: 'Revitalize your energy with natural aromatherapy and movement tools',
    items: [
      'Citrus essential oil blend (10ml)',
      'Peppermint oil (5ml)',
      'Resistance bands',
      'Energy smoothie recipe book',
      'Morning routine planner',
      'Energizing tea blend (30g)',
      'Workout playlist access'
    ],
    price: 39.99,
    image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&w=400&h=300',
    deliveryStatus: 'shipped',
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
  },
  {
    id: '3',
    name: 'Focus & Productivity Kit',
    description: 'Enhance concentration and mental clarity for peak performance',
    items: [
      'Rosemary essential oil (8ml)',
      'Peppermint oil (5ml)',
      'Focus-enhancing tea blend (40g)',
      'Productivity planner',
      'Desk aromatherapy diffuser',
      'Blue light blocking glasses',
      'Concentration playlist access'
    ],
    price: 44.99,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400&h=300',
    deliveryStatus: 'preparing',
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4 days from now
  },
  {
    id: '4',
    name: 'Creative Flow Kit',
    description: 'Unlock your artistic potential with inspiring scents and tools',
    items: [
      'Jasmine essential oil (8ml)',
      'Orange blossom oil (5ml)',
      'Creative journal with prompts',
      'Inspiration card deck',
      'Artistic tea blend (35g)',
      'Creativity playlist access',
      'Mindfulness coloring book'
    ],
    price: 42.99,
    image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=400&h=300',
    deliveryStatus: 'preparing',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  }
];

export const generateMockSessions = (): SessionHistory[] => {
  const sessions: SessionHistory[] = [];
  const moods = ['stressed', 'calm', 'energetic', 'focused', 'creative'] as const;
  
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const completedActivities = Math.floor(Math.random() * 4) + 1;
    
    sessions.push({
      id: `session-${i}`,
      date,
      mood: {
        category: mood,
        confidence: Math.floor(Math.random() * 20) + 80
      },
      moodData: {
        stressLevel: Math.floor(Math.random() * 5) + 1,
        energyLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
        currentActivity: 'working' as any,
        timestamp: date
      },
      recommendations: {
        playlists: [],
        scents: [],
        movements: []
      },
      completedActivities: Array.from({ length: completedActivities }, (_, j) => `activity-${j}`),
      vibePointsEarned: completedActivities * 25
    });
  }
  
  return sessions;
};

export const generateMockFavorites = (): FavoriteRoutine[] => [
  {
    id: 'fav-1',
    name: 'Morning Calm Ritual',
    mood: {
      category: 'calm',
      confidence: 92
    },
    recommendations: {
      playlists: [],
      scents: [],
      movements: []
    },
    savedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    timesUsed: 8
  },
  {
    id: 'fav-2',
    name: 'Creative Flow Session',
    mood: {
      category: 'creative',
      confidence: 88
    },
    recommendations: {
      playlists: [],
      scents: [],
      movements: []
    },
    savedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    timesUsed: 5
  }
];