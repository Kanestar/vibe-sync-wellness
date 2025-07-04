export interface MoodData {
  stressLevel: number;
  energyLevel: 'low' | 'medium' | 'high';
  currentActivity: 'studying' | 'working' | 'relaxing' | 'exercising' | 'socializing' | 'creative' | 'commuting' | 'cooking' | 'cleaning' | 'reading';
  timestamp: Date;
}

export interface MoodCategory {
  category: 'stressed' | 'calm' | 'energetic' | 'focused' | 'creative';
  confidence: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: number;
  duration: string;
  image: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface ScentRecommendation {
  name: string;
  benefits: string;
  icon: string;
  diyRecipe?: {
    ingredients: string[];
    instructions: string[];
    duration: string;
  };
}

export interface MovementRecommendation {
  name: string;
  duration: string;
  description: string;
  icon: string;
}

export interface WellnessRecommendations {
  playlists: Playlist[];
  scents: ScentRecommendation[];
  movements: MovementRecommendation[];
}

export interface UserProfile {
  vibePoints: number;
  totalSubmissions: number;
  currentStreak: number;
  badges: Badge[];
  level: number;
  favoriteRoutines: FavoriteRoutine[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface FavoriteRoutine {
  id: string;
  name: string;
  mood: MoodCategory;
  recommendations: WellnessRecommendations;
  savedAt: Date;
  timesUsed: number;
}

export interface SessionHistory {
  id: string;
  date: Date;
  mood: MoodCategory;
  moodData: MoodData;
  recommendations: WellnessRecommendations;
  completedActivities: string[];
  vibePointsEarned: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  mood: string;
  timestamp: Date;
  likes: number;
  comments: number;
  tags: string[];
}

export interface WellnessKit {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  image: string;
  deliveryStatus: 'preparing' | 'shipped' | 'delivered';
  estimatedDelivery: Date;
}