import React from 'react';
import { Brain, TrendingUp, Calendar, Edit3, ArrowDown } from 'lucide-react';
import { MoodCategory } from '../types';

interface MoodResultProps {
  moodCategory: MoodCategory;
  onClose: () => void;
  onEdit: () => void;
}

export const MoodResult: React.FC<MoodResultProps> = ({ moodCategory, onClose, onEdit }) => {
  const getMoodColor = (category: string) => {
    switch (category) {
      case 'stressed':
        return 'from-red-500 to-orange-500';
      case 'calm':
        return 'from-green-500 to-blue-500';
      case 'energetic':
        return 'from-yellow-500 to-orange-500';
      case 'focused':
        return 'from-blue-500 to-indigo-500';
      case 'creative':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getMoodEmoji = (category: string) => {
    switch (category) {
      case 'stressed':
        return '😓';
      case 'calm':
        return '😌';
      case 'energetic':
        return '⚡';
      case 'focused':
        return '🎯';
      case 'creative':
        return '🎨';
      default:
        return '🤔';
    }
  };

  const getMoodDescription = (category: string) => {
    switch (category) {
      case 'stressed':
        return 'You\'re experiencing some tension. Let\'s help you find your center with calming activities.';
      case 'calm':
        return 'You\'re in a peaceful state. Perfect time for mindful activities and gentle wellness practices.';
      case 'energetic':
        return 'You\'re feeling vibrant and ready to take on the world! Let\'s channel that energy positively.';
      case 'focused':
        return 'You\'re in a concentrated mindset. Great time for deep work and productive activities.';
      case 'creative':
        return 'Your creative energy is flowing! Perfect time for artistic expression and innovative thinking.';
      default:
        return 'We\'ve analyzed your mood to provide the best recommendations.';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${getMoodColor(moodCategory.category)} rounded-full mb-4 md:mb-6`}>
          <span className="text-3xl md:text-4xl">{getMoodEmoji(moodCategory.category)}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 capitalize">
          You're feeling {moodCategory.category}
        </h3>
        
        <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6 max-w-md mx-auto px-4">
          {getMoodDescription(moodCategory.category)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 md:mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Brain className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">AI Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{moodCategory.confidence}% Confidence</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={onEdit}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-full transition-colors duration-200 text-sm md:text-base"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Mood</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200 text-sm md:text-base"
          >
            <ArrowDown className="w-4 h-4" />
            <span>View Recommendations</span>
          </button>
        </div>
      </div>
    </div>
  );
};