import React, { useState } from 'react';
import { Users, Heart, MessageCircle, Share, TrendingUp, Filter } from 'lucide-react';
import { CommunityPost } from '../types';

interface CommunityFeedProps {
  posts: CommunityPost[];
  onLikePost: (postId: string) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ posts, onLikePost }) => {
  const [filter, setFilter] = useState<'all' | 'stressed' | 'calm' | 'energetic' | 'focused' | 'creative'>('all');

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
      case 'stressed': return 'bg-red-100 text-red-700';
      case 'calm': return 'bg-green-100 text-green-700';
      case 'energetic': return 'bg-yellow-100 text-yellow-700';
      case 'focused': return 'bg-blue-100 text-blue-700';
      case 'creative': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.mood === filter);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Community Feed</h3>
            <p className="text-gray-600 text-sm md:text-base">Share your wellness journey</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white/60 border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Moods</option>
            <option value="stressed">Stressed</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="focused">Focused</option>
            <option value="creative">Creative</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-800">{post.author}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(post.mood)}`}>
                    {getMoodEmoji(post.mood)} {post.mood}
                  </span>
                  <span className="text-xs text-gray-500">{getTimeAgo(post.timestamp)}</span>
                </div>
                
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">No Posts Found</h4>
          <p className="text-gray-600">
            {filter === 'all' ? 'Be the first to share your wellness journey!' : `No posts found for ${filter} mood.`}
          </p>
        </div>
      )}
    </div>
  );
};