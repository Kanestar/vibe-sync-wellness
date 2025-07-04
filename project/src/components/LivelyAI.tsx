import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Zap, Heart, Target } from 'lucide-react';

interface LivelyAIProps {
  status: string;
  mood?: string;
  isActive: boolean;
}

export const LivelyAI: React.FC<LivelyAIProps> = ({ status, mood, isActive }) => {
  const [currentEmoji, setCurrentEmoji] = useState('🤖');
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [thoughts, setThoughts] = useState<string[]>([]);

  const moodEmojis = {
    stressed: ['😌', '🧘‍♀️', '💆‍♀️', '🌸'],
    calm: ['😊', '🌿', '☁️', '🕊️'],
    energetic: ['⚡', '🔥', '💪', '🚀'],
    focused: ['🎯', '🧠', '💡', '📚'],
    creative: ['🎨', '✨', '🌈', '💫']
  };

  const aiThoughts = [
    "Analyzing your unique energy patterns...",
    "Curating the perfect wellness blend...",
    "Connecting with your inner vibe...",
    "Optimizing for maximum zen...",
    "Personalizing your journey...",
    "Syncing with your wellness frequency...",
    "Crafting your perfect moment..."
  ];

  useEffect(() => {
    if (!isActive) return;

    const emojiInterval = setInterval(() => {
      if (mood && moodEmojis[mood as keyof typeof moodEmojis]) {
        const emojis = moodEmojis[mood as keyof typeof moodEmojis];
        setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      } else {
        const allEmojis = ['🤖', '✨', '💫', '🌟', '⭐'];
        setCurrentEmoji(allEmojis[Math.floor(Math.random() * allEmojis.length)]);
      }
    }, 2000);

    const pulseInterval = setInterval(() => {
      setPulseIntensity(Math.random() * 0.5 + 0.75);
    }, 1500);

    const thoughtInterval = setInterval(() => {
      const randomThought = aiThoughts[Math.floor(Math.random() * aiThoughts.length)];
      setThoughts(prev => {
        const newThoughts = [randomThought, ...prev.slice(0, 2)];
        return newThoughts;
      });
    }, 3000);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(pulseInterval);
      clearInterval(thoughtInterval);
    };
  }, [isActive, mood]);

  if (!isActive) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-purple-300/30 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="flex items-center space-x-3 transition-all duration-500"
              style={{ transform: `scale(${pulseIntensity})` }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-20"></div>
                <span className="text-2xl md:text-3xl relative z-10">{currentEmoji}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-600 animate-pulse" />
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-600 animate-bounce" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg md:text-xl font-bold text-purple-800">VibeSync AI Agent</h3>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <p className="text-purple-700 font-medium text-sm md:text-base">{status}</p>
            </div>
          </div>

          {/* AI Thoughts Bubble */}
          {thoughts.length > 0 && (
            <div className="mt-4 space-y-2">
              {thoughts.map((thought, index) => (
                <div
                  key={index}
                  className={`bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/30 transition-all duration-500 ${
                    index === 0 ? 'opacity-100 scale-100' : index === 1 ? 'opacity-70 scale-95' : 'opacity-40 scale-90'
                  }`}
                  style={{ 
                    transform: `translateY(${index * 4}px) scale(${1 - index * 0.05})`,
                    zIndex: 10 - index 
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-purple-800 text-sm font-medium">{thought}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activity Indicators */}
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-purple-600">
              <Heart className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-medium">Mood Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-600">
              <Target className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-xs font-medium">Personalization</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Zap className="w-4 h-4 animate-bounce" />
              <span className="text-xs font-medium">Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};