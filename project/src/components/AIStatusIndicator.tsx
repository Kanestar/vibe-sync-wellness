import React from 'react';
import { Brain, Loader2 } from 'lucide-react';

interface AIStatusIndicatorProps {
  status: string;
}

export const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({ status }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-purple-300/30">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-purple-600 animate-spin" />
          </div>
          <div>
            <p className="text-purple-800 font-semibold text-sm md:text-base">VibeSync AI Agent</p>
            <p className="text-purple-700 text-xs md:text-sm">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};