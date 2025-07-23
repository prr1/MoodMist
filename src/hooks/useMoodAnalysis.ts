import { useState, useEffect } from 'react';
import { MoodAnalysis, WeatherData, CalendarEvent, SocialPost } from '../types';
import { MoodAnalyzer } from '../services/moodAnalyzer';
import { WeatherService } from '../services/weatherService';

export const useMoodAnalysis = () => {
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get weather data
      const weather = await WeatherService.getCurrentWeather();
      
      // Mock calendar events
      const calendarEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Team Meeting',
          start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          type: 'work',
          stress_level: 0.6,
        },
        {
          id: '2',
          title: 'Lunch with Friends',
          start_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
          type: 'social',
          stress_level: 0.1,
        },
      ];
      
      // Mock social posts
      const socialPosts: SocialPost[] = [
        {
          id: '1',
          platform: 'twitter',
          content: 'Having a great day! ☀️',
          sentiment_score: 0.8,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          platform: 'twitter',
          content: 'Work is challenging but rewarding',
          sentiment_score: 0.3,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ];
      
      const moodData = MoodAnalyzer.analyzeMood(weather, calendarEvents, socialPosts);
      
      const fullAnalysis: MoodAnalysis = {
        id: `analysis_${Date.now()}`,
        user_id: 'current_user',
        analysis_timestamp: new Date().toISOString(),
        ...moodData,
      };
      
      setAnalysis(fullAnalysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze mood');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAnalysis();
  }, []);

  return { analysis, loading, error, regenerateAnalysis: generateAnalysis };
};