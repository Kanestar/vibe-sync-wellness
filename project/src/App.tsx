import React, { useState, useCallback, useEffect } from 'react';
import { Waves, Github, Heart, Calendar, Star, Users, MessageSquare, User, LogOut, ArrowLeft } from 'lucide-react';
import { MoodForm } from './components/MoodForm';
import { MoodResult } from './components/MoodResult';
import { WellnessRecommendationsComponent } from './components/WellnessRecommendations';
import { UserProfileComponent } from './components/UserProfile';
import { Notification } from './components/Notification';
import { LivelyAI } from './components/LivelyAI';
import { SessionHistory } from './components/SessionHistory';
import { FavoriteRoutines } from './components/FavoriteRoutines';
import { BadgeSystem } from './components/BadgeSystem';
import { CommunityFeed } from './components/CommunityFeed';
import { DeliveryTracker } from './components/DeliveryTracker';
import { ChatInterface } from './components/ChatInterface';
import { AuthModal } from './components/AuthModal';
import { KitOrderModal } from './components/KitOrderModal';
import { analyzeMood } from './utils/moodAnalyzer';
import { getRecommendations } from './utils/recommendationEngine';
import { checkForNewBadges, calculateLevel, generateMotivationalMessage } from './utils/gamificationEngine';
import { mockCommunityPosts, mockWellnessKits, generateMockSessions, generateMockFavorites } from './utils/mockData';
import { MoodData, MoodCategory, WellnessRecommendations as WellnessRecommendationsType, Playlist, UserProfile, Badge, SessionHistory as SessionHistoryType, FavoriteRoutine, CommunityPost, WellnessKit } from './types';

function App() {
  const [currentMood, setCurrentMood] = useState<MoodCategory | null>(null);
  const [recommendations, setRecommendations] = useState<WellnessRecommendationsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<string>('');
  const [showAiStatus, setShowAiStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'mood' | 'history' | 'favorites' | 'badges' | 'community'>('mood');
  const [showDeliveryTracker, setShowDeliveryTracker] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showKitOrderModal, setShowKitOrderModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    vibePoints: 150,
    totalSubmissions: 12,
    currentStreak: 5,
    badges: [],
    level: 1,
    favoriteRoutines: generateMockFavorites()
  });

  const [sessions, setSessions] = useState<SessionHistoryType[]>(generateMockSessions());
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  // Check for existing user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('vibesync_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      // Show auth modal for new users
      setTimeout(() => {
        setShowAuthModal(true);
        setAuthMode('signup');
      }, 2000);
    }
  }, []);

  // Update level when vibe points change
  useEffect(() => {
    const newLevel = calculateLevel(userProfile.vibePoints);
    if (newLevel !== userProfile.level) {
      setUserProfile(prev => ({ ...prev, level: newLevel }));
      showNotification(`🎉 Level up! You're now level ${newLevel}!`, 'success');
    }
  }, [userProfile.vibePoints]);

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const simulateAIProcessing = useCallback(async () => {
    const statuses = [
      'Analyzing your unique energy patterns...',
      'Curating personalized recommendations...',
      'Preparing your wellness kit...',
      'Logging session data...',
      'Finalizing your vibe profile...'
    ];

    setShowAiStatus(true);
    
    for (let i = 0; i < statuses.length; i++) {
      setAiStatus(statuses[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setTimeout(() => {
      setShowAiStatus(false);
    }, 1000);
  }, []);

  const handleAuth = useCallback((userData: any) => {
    setCurrentUser(userData);
    localStorage.setItem('vibesync_user', JSON.stringify(userData));
    showNotification(`Welcome ${userData.name ? userData.name : 'back'}! 🎉`, 'success');
  }, [showNotification]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('vibesync_user');
    setShowAuthModal(true);
    setAuthMode('login');
    showNotification('Logged out successfully', 'info');
  }, [showNotification]);

  const handleMoodSubmit = useCallback(async (moodData: MoodData) => {
    if (!currentUser) {
      setShowAuthModal(true);
      setAuthMode('signup');
      return;
    }

    setIsLoading(true);
    
    // Start AI processing simulation
    simulateAIProcessing();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const moodResult = analyzeMood(moodData);
    const wellnessRecs = getRecommendations(moodResult);
    
    setCurrentMood(moodResult);
    setRecommendations(wellnessRecs);
    setIsLoading(false);
    
    // Create new session
    const newSession: SessionHistoryType = {
      id: `session-${Date.now()}`,
      date: new Date(),
      mood: moodResult,
      moodData,
      recommendations: wellnessRecs,
      completedActivities: [],
      vibePointsEarned: 25
    };
    
    setSessions(prev => [newSession, ...prev]);
    
    // Update user profile
    const updatedProfile = {
      ...userProfile,
      vibePoints: userProfile.vibePoints + 25,
      totalSubmissions: userProfile.totalSubmissions + 1,
      currentStreak: userProfile.currentStreak + 1
    };
    
    setUserProfile(updatedProfile);
    
    // Check for new badges
    const badges = checkForNewBadges(updatedProfile, [newSession, ...sessions]);
    if (badges.length > 0) {
      setNewBadges(badges);
      setUserProfile(prev => ({
        ...prev,
        badges: [...prev.badges, ...badges]
      }));
      setTimeout(() => setNewBadges([]), 5000);
    }
    
    showNotification('🎉 Mood analyzed! +25 Vibe Points earned!', 'success');
  }, [showNotification, simulateAIProcessing, userProfile, sessions, currentUser]);

  const handleChatMoodSubmit = useCallback((mood: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      setAuthMode('signup');
      return;
    }

    const moodData: MoodData = {
      stressLevel: 3,
      energyLevel: 'medium',
      currentActivity: 'relaxing',
      timestamp: new Date()
    };
    
    // Override mood based on chat analysis
    const moodResult: MoodCategory = {
      category: mood as any,
      confidence: 85
    };
    
    const wellnessRecs = getRecommendations(moodResult);
    setCurrentMood(moodResult);
    setRecommendations(wellnessRecs);
    setActiveTab('mood');
    
    showNotification('🤖 AI chat analysis complete! Here are your recommendations.', 'success');
  }, [showNotification, currentUser]);

  const handlePlaylistPlay = useCallback((playlist: Playlist) => {
    showNotification(`🎵 Now playing: ${playlist.name}`, 'info');
  }, [showNotification]);

  const handleOrderKit = useCallback(() => {
    if (!currentUser) {
      setShowAuthModal(true);
      setAuthMode('signup');
      return;
    }
    setShowKitOrderModal(true);
  }, [currentUser]);

  const handleKitOrderComplete = useCallback((orderData: any) => {
    showNotification('🎁 Your wellness kit has been ordered! Delivery tracking activated.', 'success');
    setUserProfile(prev => ({
      ...prev,
      vibePoints: prev.vibePoints + 50
    }));
    setShowDeliveryTracker(true);
  }, [showNotification]);

  const handleSaveRoutine = useCallback(() => {
    if (!currentMood || !recommendations) return;
    
    const newRoutine: FavoriteRoutine = {
      id: `routine-${Date.now()}`,
      name: `${currentMood.category.charAt(0).toUpperCase() + currentMood.category.slice(1)} Routine`,
      mood: currentMood,
      recommendations,
      savedAt: new Date(),
      timesUsed: 0
    };
    
    setUserProfile(prev => ({
      ...prev,
      favoriteRoutines: [...prev.favoriteRoutines, newRoutine]
    }));
    
    showNotification('💾 Routine saved to favorites!', 'success');
  }, [currentMood, recommendations, showNotification]);

  const handlePlayFavoriteRoutine = useCallback((routine: FavoriteRoutine) => {
    setCurrentMood(routine.mood);
    setRecommendations(routine.recommendations);
    setActiveTab('mood');
    
    // Update usage count
    setUserProfile(prev => ({
      ...prev,
      favoriteRoutines: prev.favoriteRoutines.map(r => 
        r.id === routine.id ? { ...r, timesUsed: r.timesUsed + 1 } : r
      )
    }));
    
    showNotification(`🎵 Playing ${routine.name}`, 'success');
  }, [showNotification]);

  const handleRemoveFavorite = useCallback((routineId: string) => {
    setUserProfile(prev => ({
      ...prev,
      favoriteRoutines: prev.favoriteRoutines.filter(r => r.id !== routineId)
    }));
    showNotification('🗑️ Routine removed from favorites', 'info');
  }, [showNotification]);

  const handleLikePost = useCallback((postId: string) => {
    setCommunityPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }, []);

  const handleCloseMoodResult = useCallback(() => {
    const recommendationsSection = document.getElementById('recommendations');
    if (recommendationsSection) {
      recommendationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const resetApp = useCallback(() => {
    setCurrentMood(null);
    setRecommendations(null);
    setShowAiStatus(false);
    setActiveTab('mood');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEditMood = useCallback(() => {
    setCurrentMood(null);
    setRecommendations(null);
    setShowAiStatus(false);
    setActiveTab('mood');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Ready for a new mood analysis!', 'info');
  }, [showNotification]);

  const handleBackToMoodForm = useCallback(() => {
    setCurrentMood(null);
    setRecommendations(null);
    setActiveTab('mood');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <SessionHistory
            sessions={sessions}
            onSessionSelect={(session) => {
              setCurrentMood(session.mood);
              setRecommendations(session.recommendations);
              setActiveTab('mood');
              showNotification('📊 Session loaded from history', 'info');
            }}
          />
        );
      case 'favorites':
        return (
          <FavoriteRoutines
            favorites={userProfile.favoriteRoutines}
            onPlayRoutine={handlePlayFavoriteRoutine}
            onRemoveFavorite={handleRemoveFavorite}
          />
        );
      case 'badges':
        return (
          <BadgeSystem
            badges={userProfile.badges}
            newBadges={newBadges}
          />
        );
      case 'community':
        return (
          <CommunityFeed
            posts={communityPosts}
            onLikePost={handleLikePost}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Waves className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">VibeSync</h1>
                <p className="text-gray-600 text-xs md:text-sm">Wellness Weaver</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => setShowChatInterface(true)}
                    className="p-2 md:p-3 bg-white/80 hover:bg-white text-purple-600 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
                  >
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <div className="hidden md:block">
                    <UserProfileComponent profile={userProfile} />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 md:p-3 bg-white/80 hover:bg-white text-red-600 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('login');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white text-purple-600 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        {currentUser && (
          <div className="container mx-auto px-4 mb-6">
            <div className="flex space-x-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/30 overflow-x-auto">
              {[
                { id: 'mood', label: 'Mood Analysis', icon: Heart },
                { id: 'history', label: 'History', icon: Calendar },
                { id: 'favorites', label: 'Favorites', icon: Star },
                { id: 'badges', label: 'Badges', icon: Star },
                { id: 'community', label: 'Community', icon: Users }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Status Indicator */}
        {showAiStatus && (
          <div className="container mx-auto px-4 mb-6">
            <LivelyAI 
              status={aiStatus} 
              mood={currentMood?.category}
              isActive={showAiStatus}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Mobile Profile */}
            {currentUser && (
              <div className="md:hidden mb-6 md:mb-8">
                <UserProfileComponent profile={userProfile} />
              </div>
            )}

            {/* Tab Content */}
            {activeTab !== 'mood' && renderTabContent()}

            {/* Mood Analysis Tab */}
            {activeTab === 'mood' && (
              <>
                {/* Back Button */}
                {(currentMood || recommendations) && (
                  <div className="mb-6">
                    <button
                      onClick={handleBackToMoodForm}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm font-medium">Back to Mood Form</span>
                    </button>
                  </div>
                )}

                {/* Welcome Section */}
                {!currentMood && currentUser && (
                  <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                      Welcome back, {currentUser.name}! 👋
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                      Ready to discover your perfect wellness vibe? Let's analyze your mood and create a personalized experience just for you.
                    </p>
                  </div>
                )}

                {!currentMood && !currentUser && (
                  <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                      Discover Your Perfect Wellness Vibe
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                      Let AI analyze your mood and create a personalized wellness experience with music, scents, and movements tailored just for you.
                    </p>
                  </div>
                )}

                {/* Mood Form */}
                {!currentMood && (
                  <div className="mb-6 md:mb-8">
                    <MoodForm onSubmit={handleMoodSubmit} isLoading={isLoading} />
                  </div>
                )}

                {/* Mood Result */}
                {currentMood && (
                  <div className="mb-6 md:mb-8">
                    <MoodResult
                      moodCategory={currentMood}
                      onClose={handleCloseMoodResult}
                      onEdit={handleEditMood}
                    />
                  </div>
                )}

                {/* Recommendations */}
                {recommendations && (
                  <div id="recommendations">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 space-y-4 sm:space-y-0">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your Personalized Recommendations</h2>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handleSaveRoutine}
                          className="px-4 md:px-6 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-full transition-colors duration-200 backdrop-blur-sm border border-green-400/30 text-sm md:text-base"
                        >
                          Save Routine
                        </button>
                        <button
                          onClick={handleEditMood}
                          className="px-4 md:px-6 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-full transition-colors duration-200 backdrop-blur-sm border border-blue-400/30 text-sm md:text-base"
                        >
                          Try Another Mood
                        </button>
                        <button
                          onClick={resetApp}
                          className="px-4 md:px-6 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30 text-sm md:text-base"
                        >
                          Start Fresh
                        </button>
                      </div>
                    </div>
                    <WellnessRecommendationsComponent
                      recommendations={recommendations}
                      onOrderKit={handleOrderKit}
                      onPlaylistPlay={handlePlaylistPlay}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-white/30 mt-16">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                <span className="text-gray-600 text-sm md:text-base">Built with love for your wellness journey</span>
              </div>
              <p className="text-gray-500 text-xs md:text-sm">
                VibeSync Wellness Weaver - Your AI-powered wellness companion
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <AuthModal
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        mode={authMode}
      />

      <KitOrderModal
        isVisible={showKitOrderModal}
        onClose={() => setShowKitOrderModal(false)}
        onOrderComplete={handleKitOrderComplete}
        availableKits={mockWellnessKits}
      />

      {showDeliveryTracker && (
        <DeliveryTracker
          kit={mockWellnessKits[0]}
          onClose={() => setShowDeliveryTracker(false)}
        />
      )}

      <ChatInterface
        onMoodSubmit={handleChatMoodSubmit}
        isVisible={showChatInterface}
        onClose={() => setShowChatInterface(false)}
      />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          border: 2px solid white;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          border: 2px solid white;
        }

        @media (max-width: 768px) {
          input[type="range"]::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;