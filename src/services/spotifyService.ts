import { Track, AudioFeatures } from '../types';

// Mock Spotify service - in a real app, you'd use the Spotify Web API
export class SpotifyService {
  private static mockTracks: Track[] = [
    {
      id: '1',
      spotify_id: 'track1',
      name: 'Sunny Day Vibes',
      artist: 'Happy Band',
      album: 'Good Times',
      duration_ms: 210000,
      preview_url: 'https://example.com/preview1.mp3',
      image_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
      audio_features: {
        danceability: 0.8,
        energy: 0.9,
        valence: 0.9,
        tempo: 120,
        acousticness: 0.2,
        instrumentalness: 0.1,
      },
    },
    {
      id: '2',
      spotify_id: 'track2',
      name: 'Rainy Day Blues',
      artist: 'Melancholy Collective',
      album: 'Stormy Weather',
      duration_ms: 240000,
      preview_url: 'https://example.com/preview2.mp3',
      image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
      audio_features: {
        danceability: 0.3,
        energy: 0.4,
        valence: 0.2,
        tempo: 80,
        acousticness: 0.8,
        instrumentalness: 0.3,
      },
    },
    {
      id: '3',
      spotify_id: 'track3',
      name: 'Energetic Workout',
      artist: 'Pump It Up',
      album: 'Gym Motivation',
      duration_ms: 180000,
      preview_url: 'https://example.com/preview3.mp3',
      image_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      audio_features: {
        danceability: 0.9,
        energy: 0.95,
        valence: 0.8,
        tempo: 140,
        acousticness: 0.1,
        instrumentalness: 0.0,
      },
    },
    {
      id: '4',
      spotify_id: 'track4',
      name: 'Chill Evening',
      artist: 'Relaxation Station',
      album: 'Peaceful Moments',
      duration_ms: 300000,
      preview_url: 'https://example.com/preview4.mp3',
      image_url: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
      audio_features: {
        danceability: 0.4,
        energy: 0.3,
        valence: 0.6,
        tempo: 70,
        acousticness: 0.9,
        instrumentalness: 0.7,
      },
    },
  ];

  static async searchTracks(
    genres: string[],
    targetMood: number,
    targetEnergy: number,
    limit: number = 20
  ): Promise<Track[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter tracks based on mood and energy
    const filteredTracks = this.mockTracks.filter(track => {
      const moodMatch = Math.abs(track.audio_features.valence - (targetMood + 1) / 2) < 0.4;
      const energyMatch = Math.abs(track.audio_features.energy - targetEnergy) < 0.4;
      return moodMatch && energyMatch;
    });
    
    // If not enough matches, add some random tracks
    const result = [...filteredTracks];
    while (result.length < Math.min(limit, this.mockTracks.length)) {
      const randomTrack = this.mockTracks[Math.floor(Math.random() * this.mockTracks.length)];
      if (!result.find(t => t.id === randomTrack.id)) {
        result.push(randomTrack);
      }
    }
    
    return result.slice(0, limit);
  }

  static async createPlaylist(name: string, description: string, tracks: Track[]): Promise<string> {
    // Simulate playlist creation
    await new Promise(resolve => setTimeout(resolve, 500));
    return `playlist_${Date.now()}`;
  }

  static async getAudioFeatures(trackIds: string[]): Promise<AudioFeatures[]> {
    // Return mock audio features
    return trackIds.map(() => ({
      danceability: Math.random(),
      energy: Math.random(),
      valence: Math.random(),
      tempo: 60 + Math.random() * 120,
      acousticness: Math.random(),
      instrumentalness: Math.random(),
    }));
  }
}