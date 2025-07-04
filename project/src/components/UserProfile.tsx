import React from 'react';
import { Star, Award, TrendingUp } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileProps {
  profile: UserProfile;
}

export const UserProfileComponent: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-white/20">
      <div className="text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Your Vibe Points</h2>
        
        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 md:mb-6">
          {profile.vibePoints}
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white/60 rounded-2xl p-3 md:p-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
            <div className="text-lg md:text-2xl font-bold text-gray-800">{profile.totalSubmissions}</div>
            <div className="text-gray-600 text-xs md:text-sm">Total Submissions</div>
          </div>
          
          <div className="bg-white/60 rounded-2xl p-3 md:p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            </div>
            <div className="text-lg md:text-2xl font-bold text-gray-800">{profile.currentStreak}</div>
            <div className="text-gray-600 text-xs md:text-sm">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};