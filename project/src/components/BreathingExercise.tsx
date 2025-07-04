import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setCycle(prev => prev + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  useEffect(() => {
    if (cycle >= totalCycles) {
      setIsActive(false);
      setCycle(0);
    }
  }, [cycle, totalCycles]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold':
        return 'from-yellow-400 to-yellow-600';
      case 'exhale':
        return 'from-green-400 to-green-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe In';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Breathing Exercise</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center mb-4 transition-all duration-1000 ${
            isActive ? 'scale-110' : 'scale-100'
          }`}>
            <div className="text-white text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">{count}</div>
              <div className="text-sm md:text-base font-medium">{getPhaseInstruction()}</div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-sm md:text-base">
              Cycle {cycle + 1} of {totalCycles}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((cycle) / totalCycles) * 100}%` }}
              ></div>
            </div>
          </div>

          <p className="text-gray-500 text-xs md:text-sm mb-6">
            4-4-4 breathing pattern: Inhale for 4, hold for 4, exhale for 4
          </p>
        </div>

        <div className="flex space-x-3 justify-center">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {cycle >= totalCycles && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-green-700 text-center font-medium">
              🎉 Great job! You've completed your breathing exercise.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};