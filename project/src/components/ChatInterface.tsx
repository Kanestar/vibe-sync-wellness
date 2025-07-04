import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onMoodSubmit: (mood: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onMoodSubmit, isVisible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi there! I'm your VibeSync AI companion. How are you feeling today? You can tell me about your mood, stress level, or what you're currently doing.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMoodFromText = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('stress') || lowerText.includes('anxious') || lowerText.includes('overwhelm') || lowerText.includes('pressure')) {
      return 'stressed';
    } else if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relax') || lowerText.includes('zen')) {
      return 'calm';
    } else if (lowerText.includes('energy') || lowerText.includes('excited') || lowerText.includes('pumped') || lowerText.includes('active')) {
      return 'energetic';
    } else if (lowerText.includes('focus') || lowerText.includes('concentrate') || lowerText.includes('work') || lowerText.includes('study')) {
      return 'focused';
    } else if (lowerText.includes('creative') || lowerText.includes('artistic') || lowerText.includes('inspire') || lowerText.includes('imagine')) {
      return 'creative';
    }
    
    return 'calm'; // default
  };

  const generateBotResponse = (userMessage: string) => {
    const mood = analyzeMoodFromText(userMessage);
    const responses = {
      stressed: [
        "I can sense you're feeling some tension. Let me help you find some calming activities to ease that stress.",
        "Stress can be overwhelming. I've got some great relaxation techniques that might help you feel more centered.",
        "It sounds like you need some stress relief. Let me curate some soothing recommendations for you."
      ],
      calm: [
        "That's wonderful that you're feeling peaceful! Let's enhance that calm energy with some mindful activities.",
        "I love that you're in a serene state. Perfect time for some gentle wellness practices.",
        "Your calm energy is beautiful. Let me suggest some activities to maintain that tranquility."
      ],
      energetic: [
        "I can feel your vibrant energy! Let's channel that into some amazing activities.",
        "Your enthusiasm is contagious! I have some perfect high-energy recommendations for you.",
        "That energy is fantastic! Let me help you make the most of this vibrant mood."
      ],
      focused: [
        "I can tell you're in a concentrated mindset. Great time for some productivity-boosting activities!",
        "Your focus is impressive! Let me suggest some activities that will enhance your concentration.",
        "That focused energy is perfect for deep work. I have some great recommendations to support your flow state."
      ],
      creative: [
        "I can sense your creative spark! Let's nurture that artistic energy with some inspiring activities.",
        "Your creativity is flowing! I have some perfect recommendations to fuel your imagination.",
        "That creative energy is beautiful! Let me suggest some activities to enhance your artistic flow."
      ]
    };

    return responses[mood][Math.floor(Math.random() * responses[mood].length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Trigger mood analysis after bot response
      setTimeout(() => {
        const mood = analyzeMoodFromText(inputValue);
        onMoodSubmit(mood);
        onClose();
      }, 1000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-96 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">VibeSync AI</h3>
              <p className="text-xs text-gray-500">Your wellness companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me how you're feeling..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};