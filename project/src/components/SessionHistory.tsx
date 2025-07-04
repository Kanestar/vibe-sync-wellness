import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { SessionHistory as SessionHistoryType } from '../types';

interface SessionHistoryProps {
  sessions: SessionHistoryType[];
  onSessionSelect: (session: SessionHistoryType) => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onSessionSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => 
      session.date.toDateString() === date.toDateString()
    );
  };

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 md:h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const sessionsForDay = getSessionsForDate(date);
      const hasSession = sessionsForDay.length > 0;
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-8 md:h-10 w-8 md:w-10 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 relative ${
            isSelected
              ? 'bg-purple-500 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
              : hasSession
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {day}
          {hasSession && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{sessionsForDay.length}</span>
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const selectedDateSessions = selectedDate ? getSessionsForDate(selectedDate) : [];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Session History</h3>
          <p className="text-gray-600 text-sm md:text-base">Track your wellness journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>

          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
              <span className="text-gray-600">Has sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-100 rounded-full border-2 border-blue-300"></div>
              <span className="text-gray-600">Today</span>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div>
          {selectedDate ? (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>

              {selectedDateSessions.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white/60 rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all duration-200 cursor-pointer"
                      onClick={() => onSessionSelect(session)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getMoodEmoji(session.mood.category)}</span>
                          <span className="font-medium text-gray-800 capitalize">
                            {session.mood.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{session.date.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {session.completedActivities.length} activities completed
                        </span>
                        <div className="flex items-center space-x-1 text-purple-600">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{session.vibePointsEarned} points</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No sessions on this date</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Select a date to view sessions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};