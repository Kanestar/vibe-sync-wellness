import React from 'react';
import { Play, Clock, Music, ExternalLink } from 'lucide-react';
import { Playlist } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: (playlist: Playlist) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onPlay }) => {
  const handlePlayClick = () => {
    if (playlist.youtubeUrl) {
      window.open(playlist.youtubeUrl, '_blank');
    }
    onPlay(playlist);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/30">
      <div className="aspect-square overflow-hidden relative group">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 group"
          >
            <Play className="w-8 h-8 text-purple-600 ml-1" />
          </button>
        </div>
        {playlist.youtubeUrl && (
          <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-80">
            <ExternalLink className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-2 text-lg">{playlist.name}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{playlist.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Music className="w-3 h-3" />
            <span>{playlist.tracks} tracks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{playlist.duration}</span>
          </div>
        </div>

        <button
          onClick={handlePlayClick}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium"
        >
          Play on YouTube
        </button>
      </div>
    </div>
  );
};