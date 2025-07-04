import React from 'react';
import { Award, Star, Zap, Heart, Target, Sparkles } from 'lucide-react';
import { Badge } from '../types';

interface BadgeSystemProps {
  badges: Badge[];
  newBadges?: Badge[];
}

export const BadgeSystem: React.FC<BadgeSystemProps> = ({ badges, newBadges = [] }) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'award': return Award;
      case 'star': return Star;
      case 'zap': return Zap;
      case 'heart': return Heart;
      case 'target': return Target;
      case 'sparkles': return Sparkles;
      default: return Award;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
          <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Achievement Badges</h3>
          <p className="text-gray-600 text-sm md:text-base">Your wellness milestones</p>
        </div>
      </div>

      {/* New Badges Alert */}
      {newBadges.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">New Badges Unlocked!</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {newBadges.map((badge) => {
              const IconComponent = getBadgeIcon(badge.icon);
              return (
                <div
                  key={badge.id}
                  className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white rounded-full text-sm animate-pulse`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {badges.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const IconComponent = getBadgeIcon(badge.icon);
            return (
              <div
                key={badge.id}
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 ${getRarityBorder(badge.rarity)} hover:shadow-lg transition-all duration-200 text-center`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${getRarityColor(badge.rarity)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                <div className="flex items-center justify-center space-x-1">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)}`}></div>
                  <span className="text-xs text-gray-500 capitalize">{badge.rarity}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {badge.unlockedAt.toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">No Badges Yet</h4>
          <p className="text-gray-600 max-w-md mx-auto">
            Complete wellness activities and maintain streaks to unlock achievement badges!
          </p>
        </div>
      )}
    </div>
  );
};