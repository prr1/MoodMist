import React, { useState } from 'react';
import { MoodAnalysis, Track, Playlist } from '../types';
import { SpotifyService } from '../services/spotifyService';
import { Play, Pause, Clock, User, Loader2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaylistGeneratorProps {
  analysis: MoodAnalysis;
}

export const PlaylistGenerator: React.FC<PlaylistGeneratorProps> = ({ analysis }) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const generatePlaylist = async () => {
    setLoading(true);
    try {
      const tracks = await SpotifyService.searchTracks(
        analysis.recommended_genres,
        analysis.mood_score,
        analysis.energy_level,
        15
      );

      const newPlaylist: Playlist = {
        id: `playlist_${Date.now()}`,
        user_id: 'current_user',
        name: `${getMoodDescription(analysis.mood_score)} Mix`,
        description: `Curated for your current mood • ${tracks.length} tracks`,
        mood_analysis_id: analysis.id,
        tracks,
        created_at: new Date().toISOString(),
      };

      setPlaylist(newPlaylist);
    } catch (error) {
      console.error('Failed to generate playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodDescription = (moodScore: number) => {
    if (moodScore > 0.5) return 'Uplifting';
    if (moodScore > 0) return 'Positive';
    if (moodScore > -0.5) return 'Mellow';
    return 'Contemplative';
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      // In a real app, you'd integrate with Spotify Web Playback SDK
      setTimeout(() => setPlayingTrack(null), 3000); // Auto-stop after 3 seconds
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
            <Music className="w-4 h-4 text-white" />
          </div>
          Your Personalized Playlist
        </h3>
        
        <button
          onClick={generatePlaylist}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4" />
              <span>Generate Playlist</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {playlist && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Playlist Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white mb-6">
              <h4 className="text-2xl font-bold mb-2">{playlist.name}</h4>
              <p className="text-purple-100 mb-4">{playlist.description}</p>
              <div className="flex items-center space-x-4 text-sm text-purple-100">
                <span className="flex items-center">
                  <Music className="w-4 h-4 mr-1" />
                  {playlist.tracks.length} tracks
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.round(playlist.tracks.reduce((total, track) => total + track.duration_ms, 0) / 60000)} min
                </span>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-3">
              {playlist.tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 group"
                >
                  <div className="relative">
                    <img
                      src={track.image_url}
                      alt={track.album}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <button
                      onClick={() => togglePlay(track.id)}
                      className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {playingTrack === track.id ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-800 truncate">{track.name}</h5>
                    <p className="text-sm text-gray-600 truncate flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {track.artist}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {formatDuration(track.duration_ms)}
                  </div>
                  
                  {/* Audio Features Visualization */}
                  <div className="hidden md:flex space-x-1">
                    <div
                      className="w-1 bg-green-400 rounded-full"
                      style={{ height: `${track.audio_features.energy * 20 + 4}px` }}
                      title={`Energy: ${Math.round(track.audio_features.energy * 100)}%`}
                    />
                    <div
                      className="w-1 bg-blue-400 rounded-full"
                      style={{ height: `${track.audio_features.valence * 20 + 4}px` }}
                      title={`Mood: ${Math.round(track.audio_features.valence * 100)}%`}
                    />
                    <div
                      className="w-1 bg-purple-400 rounded-full"
                      style={{ height: `${track.audio_features.danceability * 20 + 4}px` }}
                      title={`Danceability: ${Math.round(track.audio_features.danceability * 100)}%`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Save Playlist Button */}
            <div className="mt-6 text-center">
              <button className="px-8 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Save to Spotify
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!playlist && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-purple-500" />
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">Ready to Create Your Playlist?</h4>
          <p className="text-gray-500">Click "Generate Playlist" to get music recommendations based on your current mood analysis.</p>
        </div>
      )}
    </div>
  );
};