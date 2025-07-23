import { WeatherData, CalendarEvent, SocialPost, MoodAnalysis } from '../types';

export class MoodAnalyzer {
  static analyzeMood(
    weather: WeatherData,
    calendarEvents: CalendarEvent[],
    socialPosts: SocialPost[]
  ): Omit<MoodAnalysis, 'id' | 'user_id' | 'analysis_timestamp'> {
    const weatherInfluence = this.analyzeWeather(weather);
    const calendarStress = this.analyzeCalendar(calendarEvents);
    const socialSentiment = this.analyzeSocialMedia(socialPosts);
    
    const moodScore = this.calculateOverallMood(weatherInfluence, calendarStress, socialSentiment);
    const energyLevel = this.calculateEnergyLevel(weather, calendarEvents, socialPosts);
    const recommendedGenres = this.recommendGenres(moodScore, energyLevel, weatherInfluence);

    return {
      mood_score: moodScore,
      energy_level: energyLevel,
      weather_influence: weatherInfluence,
      social_sentiment: socialSentiment,
      calendar_stress: calendarStress,
      recommended_genres: recommendedGenres,
    };
  }

  private static analyzeWeather(weather: WeatherData): number {
    let score = 0;
    
    // Temperature influence
    if (weather.temperature >= 20 && weather.temperature <= 25) {
      score += 0.3; // Perfect temperature
    } else if (weather.temperature < 0 || weather.temperature > 35) {
      score -= 0.2; // Extreme temperatures
    }
    
    // Weather condition influence
    const positiveConditions = ['sunny', 'clear', 'partly cloudy'];
    const negativeConditions = ['rain', 'storm', 'snow', 'fog'];
    
    if (positiveConditions.some(condition => 
      weather.condition.toLowerCase().includes(condition))) {
      score += 0.4;
    } else if (negativeConditions.some(condition => 
      weather.condition.toLowerCase().includes(condition))) {
      score -= 0.3;
    }
    
    return Math.max(-1, Math.min(1, score));
  }

  private static analyzeCalendar(events: CalendarEvent[]): number {
    if (events.length === 0) return 0;
    
    const now = new Date();
    const upcomingEvents = events.filter(event => 
      new Date(event.start_time) > now && 
      new Date(event.start_time) < new Date(now.getTime() + 4 * 60 * 60 * 1000) // Next 4 hours
    );
    
    if (upcomingEvents.length === 0) return 0;
    
    const avgStress = upcomingEvents.reduce((sum, event) => sum + event.stress_level, 0) / upcomingEvents.length;
    return avgStress;
  }

  private static analyzeSocialMedia(posts: SocialPost[]): number {
    if (posts.length === 0) return 0;
    
    const recentPosts = posts.filter(post => {
      const postTime = new Date(post.timestamp);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return postTime > dayAgo;
    });
    
    if (recentPosts.length === 0) return 0;
    
    const avgSentiment = recentPosts.reduce((sum, post) => sum + post.sentiment_score, 0) / recentPosts.length;
    return avgSentiment;
  }

  private static calculateOverallMood(weather: number, calendar: number, social: number): number {
    // Weighted average with weather having most influence
    const weightedScore = (weather * 0.4) + (social * 0.4) + (-calendar * 0.2);
    return Math.max(-1, Math.min(1, weightedScore));
  }

  private static calculateEnergyLevel(weather: WeatherData, events: CalendarEvent[], posts: SocialPost[]): number {
    let energy = 0.5; // Base energy level
    
    // Weather influence on energy
    if (weather.condition.toLowerCase().includes('sunny')) energy += 0.2;
    if (weather.temperature > 30) energy -= 0.1; // Too hot
    if (weather.temperature < 5) energy -= 0.1; // Too cold
    
    // Calendar influence
    const workEvents = events.filter(e => e.type === 'work').length;
    if (workEvents > 3) energy -= 0.2; // Busy day
    
    // Social media influence
    const recentPosts = posts.filter(p => {
      const postTime = new Date(p.timestamp);
      const hoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      return postTime > hoursAgo;
    });
    
    if (recentPosts.length > 5) energy += 0.1; // Active on social media
    
    return Math.max(0, Math.min(1, energy));
  }

  private static recommendGenres(mood: number, energy: number, weather: number): string[] {
    const genres: string[] = [];
    
    // Mood-based genres
    if (mood > 0.5) {
      genres.push('pop', 'indie', 'funk');
    } else if (mood > 0) {
      genres.push('alternative', 'indie rock', 'folk');
    } else if (mood > -0.5) {
      genres.push('blues', 'jazz', 'acoustic');
    } else {
      genres.push('ambient', 'classical', 'lo-fi');
    }
    
    // Energy-based genres
    if (energy > 0.7) {
      genres.push('electronic', 'dance', 'rock');
    } else if (energy < 0.3) {
      genres.push('chill', 'ambient', 'meditation');
    }
    
    // Weather-based genres
    if (weather > 0.3) {
      genres.push('summer hits', 'tropical');
    } else if (weather < -0.3) {
      genres.push('cozy', 'winter', 'melancholic');
    }
    
    return [...new Set(genres)].slice(0, 5); // Remove duplicates and limit to 5
  }
}