import React, { useState } from 'react';
import { Music, Sparkles, Zap, Package, ChevronDown, ChevronUp, Clock, Users, Play, Pause, Volume2 } from 'lucide-react';
import { WellnessRecommendations as WellnessRecommendationsType, Playlist } from '../types';
import { PlaylistCard } from './PlaylistCard';
import { BreathingExercise } from './BreathingExercise';
import { VoiceInstructor } from './VoiceInstructor';

interface WellnessRecommendationsProps {
  recommendations: WellnessRecommendationsType;
  onOrderKit: () => void;
  onPlaylistPlay: (playlist: Playlist) => void;
}

export const WellnessRecommendationsComponent: React.FC<WellnessRecommendationsProps> = ({
  recommendations,
  onOrderKit,
  onPlaylistPlay
}) => {
  const [expandedScents, setExpandedScents] = useState<number[]>([]);
  const [activeMovement, setActiveMovement] = useState<number | null>(null);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);

  const toggleScentExpansion = (index: number) => {
    setExpandedScents(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleMovementClick = (index: number) => {
    if (activeMovement === index) {
      setActiveMovement(null);
    } else {
      setActiveMovement(index);
      // Auto-close after 30 seconds
      setTimeout(() => {
        setActiveMovement(null);
      }, 30000);
    }
  };

  const handleBreathingExercise = () => {
    setShowBreathingExercise(true);
  };

  const getMovementInstructions = (movementName: string): string[] => {
    const instructions: { [key: string]: string[] } = {
      'Desk Stretches': [
        'Sit up straight in your chair with feet flat on the floor',
        'Roll your shoulders back and down 5 times',
        'Gently tilt your head to the right, hold for 10 seconds',
        'Tilt your head to the left, hold for 10 seconds',
        'Reach your right arm across your chest, hold with left hand for 15 seconds',
        'Repeat with your left arm across your chest',
        'Take 3 deep breaths and return to your work refreshed'
      ],
      'Deep Breathing': [
        'Find a comfortable seated or lying position',
        'Place one hand on your chest, one on your belly',
        'Breathe in slowly through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly through your mouth for 6 counts',
        'Repeat this cycle 5 more times',
        'Notice how your body feels more relaxed'
      ],
      'Neck Rolls': [
        'Sit or stand with your spine straight',
        'Slowly drop your chin toward your chest',
        'Gently roll your head to the right shoulder',
        'Continue rolling back, then to the left shoulder',
        'Complete the circle by returning chin to chest',
        'Repeat 3 times in each direction',
        'Move slowly and stop if you feel any pain'
      ],
      'Gentle Yoga': [
        'Start in a comfortable seated position',
        'Raise your arms overhead and stretch upward',
        'Gently twist to the right, holding for 15 seconds',
        'Return to center, then twist to the left',
        'Fold forward gently, letting your arms hang',
        'Slowly roll up vertebra by vertebra',
        'End with 3 deep, mindful breaths'
      ],
      'Quick Walk': [
        'Stand up and take a moment to stretch',
        'Start walking at a comfortable pace',
        'Focus on your breathing and surroundings',
        'Swing your arms naturally as you walk',
        'If outdoors, notice the fresh air and nature',
        'Walk for 8-10 minutes at a steady pace',
        'Return feeling energized and refreshed'
      ],
      'Jumping Jacks': [
        'Stand with feet together, arms at your sides',
        'Jump while spreading your legs shoulder-width apart',
        'Simultaneously raise your arms overhead',
        'Jump back to starting position',
        'Repeat for 30 seconds at your own pace',
        'Rest for 15 seconds, then do another set',
        'Cool down with gentle arm circles'
      ],
      'Dance Break': [
        'Put on your favorite upbeat song',
        'Start by moving your shoulders to the beat',
        'Add in some hip movements and arm gestures',
        'Let your body move however feels good',
        'Don\'t worry about looking perfect - just have fun!',
        'Dance for the full length of the song',
        'End with a big smile and some deep breaths'
      ],
      'Eye Exercises': [
        'Sit comfortably and look straight ahead',
        'Without moving your head, look up for 3 seconds',
        'Look down for 3 seconds, then left for 3 seconds',
        'Look right for 3 seconds, then return to center',
        'Close your eyes tightly for 5 seconds',
        'Open and blink rapidly 10 times',
        'Focus on something far away for 30 seconds'
      ],
      'Posture Reset': [
        'Stand against a wall with your back flat',
        'Keep your head, shoulders, and butt touching the wall',
        'Hold this position for 30 seconds',
        'Step away from the wall maintaining this posture',
        'Roll your shoulders back and down',
        'Imagine a string pulling the top of your head up',
        'Practice this posture throughout your day'
      ],
      'Hand Stretches': [
        'Extend your right arm in front of you, palm up',
        'With your left hand, gently pull your fingers back',
        'Hold for 15 seconds, feeling the stretch in your forearm',
        'Flip your palm down and gently push your hand down',
        'Hold for 15 seconds, then switch hands',
        'Make fists and rotate your wrists 5 times each direction',
        'Shake out your hands and wiggle your fingers'
      ],
      'Free Movement': [
        'Stand in an open space with room to move',
        'Close your eyes and take 3 deep breaths',
        'Start moving your body however feels natural',
        'Let your arms flow, your hips sway, your body dance',
        'There\'s no right or wrong way - just express yourself',
        'Continue for 5-8 minutes, following your instincts',
        'End by standing still and noticing how you feel'
      ],
      'Finger Exercises': [
        'Hold your hands in front of you, palms facing down',
        'Spread your fingers wide, then make tight fists',
        'Repeat this 10 times to warm up',
        'Touch your thumb to each fingertip, one at a time',
        'Do this on both hands, going slowly and deliberately',
        'Make circles with each finger, both directions',
        'Finish by gently massaging your palms and fingers'
      ],
      'Inspiration Walk': [
        'Step outside or find a space with natural light',
        'Begin walking slowly, focusing on your surroundings',
        'Notice colors, textures, sounds, and smells around you',
        'Let your mind wander freely without forcing thoughts',
        'If an idea comes, acknowledge it and keep walking',
        'Walk for 10-12 minutes, staying present and open',
        'Return with fresh perspective and creative energy'
      ],
      'Meditation Walk': [
        'Find a quiet path or space where you can walk slowly',
        'Begin walking at about half your normal pace',
        'Focus on the sensation of your feet touching the ground',
        'Coordinate your breathing with your steps',
        'When your mind wanders, gently return focus to walking',
        'Continue for 10-15 minutes in mindful awareness',
        'End by standing still for a moment of gratitude'
      ],
      'Progressive Relaxation': [
        'Lie down comfortably on your back',
        'Start by tensing your toes for 5 seconds, then relax',
        'Move up to your calves, tense and relax',
        'Continue with thighs, glutes, abdomen, and chest',
        'Tense and relax your arms, hands, shoulders, and neck',
        'Finally, scrunch your face muscles, then relax',
        'Lie still for 2 minutes, enjoying the full-body relaxation'
      ]
    };

    return instructions[movementName] || [
      'Follow the movement as described',
      'Listen to your body and move at your own pace',
      'Stop if you feel any discomfort',
      'Focus on your breathing throughout',
      'Enjoy the movement and how it makes you feel'
    ];
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Music Playlists */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Curated Playlists</h3>
            <p className="text-gray-600 text-sm md:text-base">Perfect music for your current vibe - click to play on YouTube</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {recommendations.playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlay={onPlaylistPlay}
            />
          ))}
        </div>
      </section>

      {/* Scent Recommendations with DIY Recipes */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">DIY Aromatherapy</h3>
            <p className="text-gray-600 text-sm md:text-base">Natural scents to enhance your mood with easy DIY recipes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.scents.map((scent, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-center mb-4">
                <div className="text-3xl md:text-4xl mb-3">{scent.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">{scent.name}</h4>
                <p className="text-gray-600 text-xs md:text-sm mb-4">{scent.benefits}</p>
              </div>

              {scent.diyRecipe && (
                <div>
                  <button
                    onClick={() => toggleScentExpansion(index)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-3 md:px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 text-xs md:text-sm font-medium"
                  >
                    <span>DIY Recipe</span>
                    {expandedScents.includes(index) ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>

                  {expandedScents.includes(index) && (
                    <div className="mt-4 p-3 md:p-4 bg-white/80 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-xs md:text-sm font-medium text-green-700">{scent.diyRecipe.duration}</span>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Ingredients:</h5>
                        <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                          {scent.diyRecipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Instructions:</h5>
                        <ol className="text-xs md:text-sm text-gray-600 space-y-2">
                          {scent.diyRecipe.instructions.map((instruction, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="bg-green-500 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                                {i + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Movement Recommendations */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Micro-Movements</h3>
            <p className="text-gray-600 text-sm md:text-base">Quick activities to boost your wellbeing - click to start with voice guidance</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.movements.map((movement, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-3">{movement.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">{movement.name}</h4>
                <p className="text-purple-600 font-semibold text-xs md:text-sm mb-2">{movement.duration}</p>
                <p className="text-gray-600 text-xs md:text-sm mb-4">{movement.description}</p>
                
                <button
                  onClick={() => {
                    if (movement.name === 'Deep Breathing') {
                      handleBreathingExercise();
                    } else {
                      handleMovementClick(index);
                    }
                  }}
                  className={`w-full py-2 px-3 md:px-4 rounded-xl transition-all duration-200 text-xs md:text-sm font-medium ${
                    activeMovement === index
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                  }`}
                >
                  {activeMovement === index ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Start with Voice Guide</span>
                    </div>
                  )}
                </button>
                
                {activeMovement === index && (
                  <div className="mt-4">
                    <VoiceInstructor
                      instructions={getMovementInstructions(movement.name)}
                      isActive={activeMovement === index}
                      onComplete={() => setActiveMovement(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Breathing Exercise Modal */}
      {showBreathingExercise && (
        <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
      )}

      {/* Wellness Kit Order */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">Complete Wellness Kit</h3>
          <p className="text-purple-100 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base px-4">
            Get a curated wellness kit with aromatherapy items, relaxation tools, and wellness guides delivered to your door.
          </p>
          <button
            onClick={onOrderKit}
            className="bg-white text-purple-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-purple-50 transition-colors duration-200 inline-flex items-center space-x-2 text-sm md:text-base"
          >
            <Package className="w-4 h-4 md:w-5 md:h-5" />
            <span>Order Your Wellness Kit</span>
          </button>
        </div>
      </section>
    </div>
  );
};