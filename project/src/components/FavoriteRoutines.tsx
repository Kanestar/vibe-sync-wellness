import React from 'react';
import { Heart, Play, Trash2, Clock, Star } from 'lucide-react';
import { FavoriteRoutine } from '../types';

interface FavoriteRoutinesProps {
  favorites: FavoriteRoutine[];
  onPlayRoutine: (routine: FavoriteRoutine) => void;
  onRemoveFavorite: (routineId: string) => void;
}

export const FavoriteRoutines: React.FC<FavoriteRoutinesProps> = ({
  favorites,
  onPlayRoutine,
  onRemoveFavorite
}) => {
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'stressed': return '😓';
      case 'calm': return '😌';
      case 'energetic': return '⚡';
      case 'focused': return '🎯';
      case 'creative': return '🎨';
      default: return '🤔';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'stressed': return 'from-red-500 to-orange-500';
      case 'calm': return 'from-green-500 to-blue-500';
      case 'energetic': return 'from-yellow-500 to-orange-500';
      case 'focused': return 'from-blue-500 to-indigo-500';
      case 'creative': return 'from-purple-500 to-pink-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Favorite Routines</h3>
          <p className="text-gray-600 text-sm md:text-base">Your saved wellness combinations</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((routine) => (
            <div
              key={routine.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getMoodColor(routine.mood.category)} rounded-full flex items-center justify-center`}>
                    <span className="text-2xl">{getMoodEmoji(routine.mood.category)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{routine.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{routine.mood.category} mood</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFavorite(routine.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Saved {routine.savedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Used {routine.timesUsed} times</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span>{routine.recommendations.playlists.length} playlists • </span>
                  <span>{routine.recommendations.scents.length} scents • </span>
                  <span>{routine.recommendations.movements.length} movements</span>
                </div>
              </div>

              <button
                onClick={() => onPlayRoutine(routine)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <Play className="w-4 h-4" />
                <span>Use This Routine</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">No Favorite Routines Yet</h4>
          <p className="text-gray-600 max-w-md mx-auto">
            Complete a mood analysis and save your favorite wellness combinations to access them quickly later.
          </p>
        </div>
      )}
    </div>
  );
};