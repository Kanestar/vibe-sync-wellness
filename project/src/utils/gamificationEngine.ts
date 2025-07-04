import { Badge, UserProfile, SessionHistory } from '../types';

export const checkForNewBadges = (
  profile: UserProfile,
  sessions: SessionHistory[]
): Badge[] => {
  const newBadges: Badge[] = [];
  const existingBadgeIds = profile.badges.map(b => b.id);

  // First Session Badge
  if (profile.totalSubmissions >= 1 && !existingBadgeIds.includes('first-session')) {
    newBadges.push({
      id: 'first-session',
      name: 'First Steps',
      description: 'Completed your first wellness session',
      icon: 'star',
      unlockedAt: new Date(),
      rarity: 'common'
    });
  }

  // Streak Badges
  if (profile.currentStreak >= 3 && !existingBadgeIds.includes('streak-3')) {
    newBadges.push({
      id: 'streak-3',
      name: 'Consistency Champion',
      description: 'Maintained a 3-day wellness streak',
      icon: 'zap',
      unlockedAt: new Date(),
      rarity: 'rare'
    });
  }

  if (profile.currentStreak >= 7 && !existingBadgeIds.includes('streak-7')) {
    newBadges.push({
      id: 'streak-7',
      name: 'Week Warrior',
      description: 'Maintained a 7-day wellness streak',
      icon: 'target',
      unlockedAt: new Date(),
      rarity: 'epic'
    });
  }

  if (profile.currentStreak >= 30 && !existingBadgeIds.includes('streak-30')) {
    newBadges.push({
      id: 'streak-30',
      name: 'Wellness Master',
      description: 'Maintained a 30-day wellness streak',
      icon: 'award',
      unlockedAt: new Date(),
      rarity: 'legendary'
    });
  }

  // Vibe Points Badges
  if (profile.vibePoints >= 500 && !existingBadgeIds.includes('points-500')) {
    newBadges.push({
      id: 'points-500',
      name: 'Vibe Collector',
      description: 'Earned 500 Vibe Points',
      icon: 'sparkles',
      unlockedAt: new Date(),
      rarity: 'rare'
    });
  }

  if (profile.vibePoints >= 1000 && !existingBadgeIds.includes('points-1000')) {
    newBadges.push({
      id: 'points-1000',
      name: 'Vibe Master',
      description: 'Earned 1000 Vibe Points',
      icon: 'award',
      unlockedAt: new Date(),
      rarity: 'epic'
    });
  }

  // Mood Diversity Badges
  const uniqueMoods = new Set(sessions.map(s => s.mood.category));
  if (uniqueMoods.size >= 3 && !existingBadgeIds.includes('mood-explorer')) {
    newBadges.push({
      id: 'mood-explorer',
      name: 'Mood Explorer',
      description: 'Experienced 3 different mood categories',
      icon: 'heart',
      unlockedAt: new Date(),
      rarity: 'rare'
    });
  }

  // Activity Completion Badges
  const totalActivities = sessions.reduce((sum, s) => sum + s.completedActivities.length, 0);
  if (totalActivities >= 10 && !existingBadgeIds.includes('activity-enthusiast')) {
    newBadges.push({
      id: 'activity-enthusiast',
      name: 'Activity Enthusiast',
      description: 'Completed 10 wellness activities',
      icon: 'zap',
      unlockedAt: new Date(),
      rarity: 'rare'
    });
  }

  return newBadges;
};

export const calculateLevel = (vibePoints: number): number => {
  return Math.floor(vibePoints / 100) + 1;
};

export const getPointsToNextLevel = (vibePoints: number): number => {
  const currentLevel = calculateLevel(vibePoints);
  const pointsForNextLevel = currentLevel * 100;
  return pointsForNextLevel - vibePoints;
};

export const generateMotivationalMessage = (profile: UserProfile): string => {
  const messages = [
    `You're on fire! ${profile.currentStreak} days strong! 🔥`,
    `Amazing progress! You've earned ${profile.vibePoints} Vibe Points! ✨`,
    `Keep it up! You're level ${profile.level} now! 🚀`,
    `Your wellness journey is inspiring! ${profile.totalSubmissions} sessions completed! 💪`,
    `You're building amazing habits! Stay consistent! 🌟`
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};