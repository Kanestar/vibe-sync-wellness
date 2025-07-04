import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface VoiceInstructorProps {
  instructions: string[];
  isActive: boolean;
  onComplete: () => void;
}

export const VoiceInstructor: React.FC<VoiceInstructorProps> = ({ 
  instructions, 
  isActive, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window);
  }, []);

  useEffect(() => {
    if (isActive && !isMuted && speechSupported) {
      startInstructions();
    }
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isActive, isMuted]);

  const speak = (text: string) => {
    if (!speechSupported || isMuted) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setTimeout(() => {
        if (currentStep < instructions.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
          onComplete();
        }
      }, 1000);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const startInstructions = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    speak(instructions[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      startInstructions();
    }
  };

  useEffect(() => {
    if (isPlaying && currentStep < instructions.length && !isMuted) {
      speak(instructions[currentStep]);
    }
  }, [currentStep, isPlaying]);

  if (!isActive) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-gray-800">Voice Instructor</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {speechSupported && (
            <>
              <button
                onClick={togglePlayPause}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {instructions.length}
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-3 border border-blue-100">
          <p className="text-gray-800 font-medium">
            {instructions[currentStep]}
          </p>
        </div>

        {!speechSupported && (
          <div className="text-xs text-gray-500 text-center">
            Voice instructions not supported in this browser
          </div>
        )}
      </div>
    </div>
  );
};