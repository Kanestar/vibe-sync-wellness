import React, { useState } from 'react';
import { Heart, Activity, BookOpen, Coffee, Dumbbell, Users, Palette, Car, ChefHat, Sparkles } from 'lucide-react';
import { MoodData } from '../types';

interface MoodFormProps {
  onSubmit: (moodData: MoodData) => void;
  isLoading?: boolean;
}

export const MoodForm: React.FC<MoodFormProps> = ({ onSubmit, isLoading = false }) => {
  const [stressLevel, setStressLevel] = useState(3);
  const [energyLevel, setEnergyLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [currentActivity, setCurrentActivity] = useState<'studying' | 'working' | 'relaxing' | 'exercising' | 'socializing' | 'creative' | 'commuting' | 'cooking' | 'cleaning' | 'reading'>('relaxing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      stressLevel,
      energyLevel,
      currentActivity,
      timestamp: new Date()
    });
  };

  const getStressLevelLabel = (level: number) => {
    const labels = ['', 'Very Low', 'Low', 'Moderate', 'High', 'Very High'];
    return labels[level];
  };

  const getStressLevelColor = (level: number) => {
    if (level <= 2) return 'text-green-600';
    if (level === 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activities = [
    { value: 'studying', label: 'Studying', icon: BookOpen, color: 'purple' },
    { value: 'working', label: 'Working', icon: Activity, color: 'blue' },
    { value: 'relaxing', label: 'Relaxing', icon: Coffee, color: 'green' },
    { value: 'exercising', label: 'Exercising', icon: Dumbbell, color: 'orange' },
    { value: 'socializing', label: 'Socializing', icon: Users, color: 'pink' },
    { value: 'creative', label: 'Creative Work', icon: Palette, color: 'indigo' },
    { value: 'commuting', label: 'Commuting', icon: Car, color: 'gray' },
    { value: 'cooking', label: 'Cooking', icon: ChefHat, color: 'yellow' },
    { value: 'cleaning', label: 'Cleaning', icon: Sparkles, color: 'teal' },
    { value: 'reading', label: 'Reading', icon: BookOpen, color: 'emerald' }
  ] as const;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">How are you feeling?</h2>
        <p className="text-gray-600 text-sm md:text-base px-4">Share your current mood to get personalized recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Stress Level */}
        <div className="space-y-4">
          <label className="block text-base md:text-lg font-semibold text-gray-700">
            Stress Level: <span className={`${getStressLevelColor(stressLevel)} font-bold`}>
              {getStressLevelLabel(stressLevel)}
            </span>
          </label>
          <div className="relative px-2">
            <input
              type="range"
              min="1"
              max="5"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #dcfce7 0%, #fef3c7 50%, #fecaca 100%)`
              }}
            />
            <div className="flex justify-between text-xs md:text-sm text-gray-500 mt-2 px-1">
              <span>Very Low</span>
              <span>Moderate</span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        {/* Energy Level */}
        <div className="space-y-4">
          <label className="block text-base md:text-lg font-semibold text-gray-700">Energy Level</label>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setEnergyLevel(level)}
                className={`p-3 md:p-4 rounded-2xl border-2 transition-all duration-200 ${
                  energyLevel === level
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <Activity className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2" />
                <span className="font-medium capitalize text-sm md:text-base">{level}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Activity */}
        <div className="space-y-4">
          <label className="block text-base md:text-lg font-semibold text-gray-700">Current Activity</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <button
                  key={activity.value}
                  type="button"
                  onClick={() => setCurrentActivity(activity.value)}
                  className={`p-3 md:p-4 rounded-2xl border-2 transition-all duration-200 ${
                    currentActivity === activity.value
                      ? `border-${activity.color}-500 bg-${activity.color}-50 text-${activity.color}-700`
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-2" />
                  <span className="font-medium text-xs md:text-sm">{activity.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
        >
          {isLoading ? 'Analyzing Your Vibe...' : 'Get My Wellness Recommendations'}
        </button>
      </form>
    </div>
  );
};