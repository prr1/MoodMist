export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  spotify_connected: boolean;
  twitter_connected: boolean;
  calendar_connected: boolean;
  created_at: string;
}

export interface MoodAnalysis {
  id: string;
  user_id: string;
  mood_score: number; // -1 to 1 scale
  energy_level: number; // 0 to 1 scale
  weather_influence: number;
  social_sentiment: number;
  calendar_stress: number;
  recommended_genres: string[];
  analysis_timestamp: string;
}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description: string;
  mood_analysis_id: string;
  spotify_playlist_id?: string;
  tracks: Track[];
  created_at: string;
}

export interface Track {
  id: string;
  spotify_id: string;
  name: string;
  artist: string;
  album: string;
  duration_ms: number;
  preview_url?: string;
  image_url?: string;
  audio_features: AudioFeatures;
}

export interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  pressure: number;
  location: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  type: 'work' | 'personal' | 'social' | 'other';
  stress_level: number;
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook';
  content: string;
  sentiment_score: number;
  timestamp: string;
}