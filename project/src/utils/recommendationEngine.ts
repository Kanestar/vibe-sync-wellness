import { MoodCategory, WellnessRecommendations } from '../types';

const playlistsData = {
  stressed: [
    {
      id: '1',
      name: 'Deep Focus Chill',
      description: 'Calming beats to reduce stress and improve focus',
      tracks: 45,
      duration: '2h 34m',
      image: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
    },
    {
      id: '2',
      name: 'Ambient Relaxation',
      description: 'Peaceful ambient sounds for deep relaxation',
      tracks: 32,
      duration: '1h 58m',
      image: 'https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=1ZYbU82GVz4'
    },
    {
      id: '3',
      name: 'Nature Sounds & Lo-Fi',
      description: 'Gentle nature sounds mixed with lo-fi beats',
      tracks: 28,
      duration: '1h 42m',
      image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A'
    }
  ],
  calm: [
    {
      id: '4',
      name: 'Acoustic Serenity',
      description: 'Soft acoustic melodies for peaceful moments',
      tracks: 38,
      duration: '2h 15m',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=36YnV9STBqc'
    },
    {
      id: '5',
      name: 'Mindful Meditation',
      description: 'Gentle instrumentals for meditation and mindfulness',
      tracks: 25,
      duration: '1h 33m',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM'
    },
    {
      id: '6',
      name: 'Evening Wind Down',
      description: 'Perfect playlist for unwinding after a long day',
      tracks: 42,
      duration: '2h 28m',
      image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY'
    }
  ],
  energetic: [
    {
      id: '7',
      name: 'Morning Motivation',
      description: 'Uplifting tracks to start your day with energy',
      tracks: 50,
      duration: '2h 45m',
      image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs'
    },
    {
      id: '8',
      name: 'Workout Power',
      description: 'High-energy beats for intense workouts',
      tracks: 35,
      duration: '1h 52m',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=BHXzwypAKSs'
    },
    {
      id: '9',
      name: 'Feel Good Vibes',
      description: 'Positive, upbeat songs to boost your mood',
      tracks: 44,
      duration: '2h 36m',
      image: 'https://images.pexels.com/photos/3756740/pexels-photo-3756740.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=y6120QOlsfU'
    }
  ],
  focused: [
    {
      id: '10',
      name: 'Deep Work Flow',
      description: 'Instrumental tracks for maximum concentration',
      tracks: 40,
      duration: '2h 20m',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=kgx4WGK0oNU'
    },
    {
      id: '11',
      name: 'Study Sessions',
      description: 'Perfect background music for studying',
      tracks: 35,
      duration: '2h 5m',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=5yx6BWlEVcY'
    },
    {
      id: '12',
      name: 'Productivity Boost',
      description: 'Energizing yet focused music for work',
      tracks: 38,
      duration: '2h 12m',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
    }
  ],
  creative: [
    {
      id: '13',
      name: 'Creative Flow',
      description: 'Inspiring music to unlock your creativity',
      tracks: 42,
      duration: '2h 30m',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=BeOmyG_U_ts'
    },
    {
      id: '14',
      name: 'Artistic Inspiration',
      description: 'Eclectic mix to spark your imagination',
      tracks: 36,
      duration: '2h 8m',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=mvJjmWTg7Qo'
    },
    {
      id: '15',
      name: 'Innovation Soundtrack',
      description: 'Modern beats for creative thinking',
      tracks: 33,
      duration: '1h 55m',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=300&h=300',
      youtubeUrl: 'https://www.youtube.com/watch?v=DWcJFNfaw9c'
    }
  ]
};

const scentRecommendations = {
  stressed: [
    { 
      name: 'Lavender', 
      benefits: 'Reduces anxiety and promotes relaxation', 
      icon: '🌸',
      diyRecipe: {
        ingredients: ['2 cups dried lavender buds', '1 cup carrier oil (jojoba or sweet almond)', 'Glass jar'],
        instructions: [
          'Place dried lavender buds in a clean glass jar',
          'Pour carrier oil over lavender, ensuring buds are completely covered',
          'Seal jar and place in a sunny window for 2-4 weeks',
          'Strain the oil through cheesecloth into a clean bottle',
          'Use 2-3 drops on pulse points or add to diffuser'
        ],
        duration: '2-4 weeks infusion time'
      }
    },
    { 
      name: 'Chamomile', 
      benefits: 'Calms the mind and reduces stress', 
      icon: '🌼',
      diyRecipe: {
        ingredients: ['1/4 cup dried chamomile flowers', '1 cup boiling water', 'Essential oil diffuser'],
        instructions: [
          'Steep dried chamomile flowers in boiling water for 10 minutes',
          'Strain the liquid and let it cool completely',
          'Pour the chamomile tea into your diffuser',
          'Add 2-3 drops of chamomile essential oil if available',
          'Run diffuser for 30-60 minutes in your space'
        ],
        duration: '15 minutes prep time'
      }
    },
    { 
      name: 'Bergamot', 
      benefits: 'Uplifts mood while reducing tension', 
      icon: '🍋',
      diyRecipe: {
        ingredients: ['Zest of 2 bergamot oranges', '1/2 cup vodka', 'Small spray bottle'],
        instructions: [
          'Grate the zest from fresh bergamot oranges',
          'Place zest in a small jar with vodka',
          'Let mixture sit for 1 week, shaking daily',
          'Strain liquid into spray bottle',
          'Spray lightly in room or on linens for aromatherapy'
        ],
        duration: '1 week infusion time'
      }
    }
  ],
  calm: [
    { 
      name: 'Vanilla', 
      benefits: 'Creates a warm, comforting atmosphere', 
      icon: '🌿',
      diyRecipe: {
        ingredients: ['2 vanilla beans', '1/2 cup carrier oil', 'Small glass bottle'],
        instructions: [
          'Split vanilla beans lengthwise and scrape out seeds',
          'Place beans and seeds in carrier oil',
          'Let infuse in a cool, dark place for 2 weeks',
          'Strain oil through fine mesh or cheesecloth',
          'Use in diffuser or apply to skin as natural perfume'
        ],
        duration: '2 weeks infusion time'
      }
    },
    { 
      name: 'Sandalwood', 
      benefits: 'Promotes mental clarity and peace', 
      icon: '🪵',
      diyRecipe: {
        ingredients: ['Sandalwood powder', 'Coconut oil', 'Small container'],
        instructions: [
          'Mix 2 tablespoons sandalwood powder with 1/4 cup melted coconut oil',
          'Stir until well combined and smooth',
          'Let mixture cool and solidify',
          'Apply small amount to temples and wrists',
          'Inhale deeply for calming aromatherapy effect'
        ],
        duration: '10 minutes prep time'
      }
    },
    { 
      name: 'Rose', 
      benefits: 'Enhances emotional balance and tranquility', 
      icon: '🌹',
      diyRecipe: {
        ingredients: ['2 cups fresh rose petals', '1 cup distilled water', 'Spray bottle'],
        instructions: [
          'Gently rinse fresh rose petals and pat dry',
          'Boil distilled water and pour over rose petals',
          'Cover and let steep for 30 minutes',
          'Strain liquid and pour into spray bottle',
          'Mist around room or on pillows for relaxation'
        ],
        duration: '45 minutes total time'
      }
    }
  ],
  energetic: [
    { 
      name: 'Citrus', 
      benefits: 'Boosts energy and mental alertness', 
      icon: '🍊',
      diyRecipe: {
        ingredients: ['Peels from 2 oranges, 1 lemon, 1 lime', '1 cup white vinegar', 'Spray bottle'],
        instructions: [
          'Place all citrus peels in a glass jar',
          'Cover with white vinegar and seal tightly',
          'Let infuse for 2 weeks in a cool, dark place',
          'Strain liquid and dilute 1:1 with water',
          'Use as room spray for instant energy boost'
        ],
        duration: '2 weeks infusion time'
      }
    },
    { 
      name: 'Peppermint', 
      benefits: 'Invigorates and increases focus', 
      icon: '🌱',
      diyRecipe: {
        ingredients: ['1/2 cup fresh peppermint leaves', '1 cup boiling water', 'Ice cubes'],
        instructions: [
          'Crush fresh peppermint leaves gently to release oils',
          'Pour boiling water over leaves and steep for 15 minutes',
          'Strain and add ice cubes to cool quickly',
          'Pour into spray bottle for instant cooling mist',
          'Spray on face and neck for energizing effect'
        ],
        duration: '20 minutes prep time'
      }
    },
    { 
      name: 'Eucalyptus', 
      benefits: 'Refreshes and energizes the mind', 
      icon: '🌿',
      diyRecipe: {
        ingredients: ['Fresh eucalyptus branches', 'Hot shower', 'Rubber band'],
        instructions: [
          'Gather 3-4 fresh eucalyptus branches',
          'Bundle together with rubber band',
          'Hang bundle from shower head, away from direct water',
          'Take a hot shower - steam will release eucalyptus oils',
          'Breathe deeply for natural aromatherapy experience'
        ],
        duration: '5 minutes setup time'
      }
    }
  ],
  focused: [
    { 
      name: 'Rosemary', 
      benefits: 'Enhances memory and concentration', 
      icon: '🌿',
      diyRecipe: {
        ingredients: ['Fresh rosemary sprigs', '1 cup olive oil', 'Glass jar'],
        instructions: [
          'Wash and dry fresh rosemary sprigs thoroughly',
          'Bruise leaves gently to release oils',
          'Place in glass jar and cover with olive oil',
          'Let infuse for 1 week in sunny location',
          'Use 1-2 drops on temples while studying or working'
        ],
        duration: '1 week infusion time'
      }
    },
    { 
      name: 'Lemon', 
      benefits: 'Improves focus and mental clarity', 
      icon: '🍋',
      diyRecipe: {
        ingredients: ['Zest of 3 lemons', '1/2 cup witch hazel', 'Small spray bottle'],
        instructions: [
          'Grate fresh lemon zest, avoiding white pith',
          'Mix zest with witch hazel in glass container',
          'Let mixture sit for 24 hours, stirring occasionally',
          'Strain through coffee filter into spray bottle',
          'Spray in workspace for mental clarity boost'
        ],
        duration: '24 hours infusion time'
      }
    },
    { 
      name: 'Pine', 
      benefits: 'Clears mental fog and increases alertness', 
      icon: '🌲',
      diyRecipe: {
        ingredients: ['Fresh pine needles', 'Hot water', 'Large bowl'],
        instructions: [
          'Collect fresh pine needles from clean trees',
          'Place needles in large heat-proof bowl',
          'Pour hot (not boiling) water over needles',
          'Cover head with towel and lean over bowl',
          'Inhale steam for 5-10 minutes for mental clarity'
        ],
        duration: '15 minutes total time'
      }
    }
  ],
  creative: [
    { 
      name: 'Jasmine', 
      benefits: 'Stimulates creativity and inspiration', 
      icon: '🌺',
      diyRecipe: {
        ingredients: ['1/4 cup dried jasmine flowers', '1 cup coconut oil', 'Double boiler'],
        instructions: [
          'Gently heat coconut oil in double boiler until melted',
          'Add dried jasmine flowers to warm oil',
          'Simmer on low heat for 2 hours, stirring occasionally',
          'Strain oil through cheesecloth into clean container',
          'Use as massage oil or add to diffuser for creative sessions'
        ],
        duration: '2.5 hours total time'
      }
    },
    { 
      name: 'Orange Blossom', 
      benefits: 'Inspires joy and creative thinking', 
      icon: '🌸',
      diyRecipe: {
        ingredients: ['Orange blossom water', 'Glycerin', 'Small spray bottle'],
        instructions: [
          'Mix 3/4 cup orange blossom water with 1 tablespoon glycerin',
          'Shake well to combine ingredients',
          'Pour mixture into spray bottle',
          'Shake before each use',
          'Mist around creative workspace or on face for inspiration'
        ],
        duration: '5 minutes prep time'
      }
    },
    { 
      name: 'Frankincense', 
      benefits: 'Enhances spiritual creativity and focus', 
      icon: '✨',
      diyRecipe: {
        ingredients: ['Frankincense resin', 'Charcoal disc', 'Heat-safe bowl'],
        instructions: [
          'Light charcoal disc and place in heat-safe bowl',
          'Wait until charcoal is glowing red',
          'Sprinkle small amount of frankincense resin on charcoal',
          'Allow smoke to fill creative space',
          'Meditate or work creatively while incense burns'
        ],
        duration: '30-60 minutes burn time'
      }
    }
  ]
};

const movementRecommendations = {
  stressed: [
    { name: 'Desk Stretches', duration: '5 mins', description: 'Simple stretches to release tension', icon: '🤸‍♀️' },
    { name: 'Deep Breathing', duration: '3 mins', description: 'Calming breath work to reduce stress', icon: '🧘‍♀️' },
    { name: 'Neck Rolls', duration: '2 mins', description: 'Gentle neck movements to ease tension', icon: '💆‍♀️' }
  ],
  calm: [
    { name: 'Gentle Yoga', duration: '10 mins', description: 'Slow, mindful movements for relaxation', icon: '🧘‍♀️' },
    { name: 'Meditation Walk', duration: '15 mins', description: 'Peaceful walking meditation', icon: '🚶‍♀️' },
    { name: 'Progressive Relaxation', duration: '8 mins', description: 'Systematic muscle relaxation', icon: '🛌' }
  ],
  energetic: [
    { name: 'Quick Walk', duration: '10 mins', description: 'Brisk walk to boost circulation', icon: '🚶‍♂️' },
    { name: 'Jumping Jacks', duration: '3 mins', description: 'Quick cardio burst for energy', icon: '🏃‍♀️' },
    { name: 'Dance Break', duration: '5 mins', description: 'Free-form dancing to favorite songs', icon: '💃' }
  ],
  focused: [
    { name: 'Eye Exercises', duration: '3 mins', description: 'Reduce eye strain and improve focus', icon: '👁️' },
    { name: 'Posture Reset', duration: '2 mins', description: 'Align spine and shoulders for better concentration', icon: '🧍‍♀️' },
    { name: 'Hand Stretches', duration: '4 mins', description: 'Relieve tension from typing and writing', icon: '✋' }
  ],
  creative: [
    { name: 'Free Movement', duration: '8 mins', description: 'Expressive movement to unlock creativity', icon: '💃' },
    { name: 'Finger Exercises', duration: '5 mins', description: 'Warm up hands for creative work', icon: '🤲' },
    { name: 'Inspiration Walk', duration: '12 mins', description: 'Mindful walk to gather creative ideas', icon: '🚶‍♀️' }
  ]
};

export const getRecommendations = (moodCategory: MoodCategory): WellnessRecommendations => {
  const { category } = moodCategory;
  
  return {
    playlists: playlistsData[category],
    scents: scentRecommendations[category],
    movements: movementRecommendations[category]
  };
};