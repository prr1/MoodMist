# MoodTunes - AI-Powered Music Curation

A sophisticated full-stack application that analyzes your mood through multiple data sources and curates personalized playlists using AI.

## Features

### 🎵 Intelligent Music Curation
- **Mood Analysis**: Combines weather data, calendar events, and social media sentiment
- **Personalized Playlists**: AI-generated playlists based on your current emotional state
- **Audio Feature Matching**: Matches songs to your energy level and mood preferences
- **Real-time Updates**: Dynamic playlist generation as your mood changes

### 🌟 Beautiful User Experience
- **Modern Design**: Apple-level aesthetics with glassmorphism effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Layout**: Optimized for all device sizes
- **Intuitive Interface**: Clean, user-friendly design with thoughtful UX

### 🔗 Smart Integrations
- **Weather Analysis**: Current conditions affect music recommendations
- **Calendar Integration**: Upcoming events influence energy level predictions
- **Social Media Sentiment**: Recent posts contribute to mood analysis
- **Spotify Integration**: Direct playlist creation and playback (coming soon)

### 🛡️ Secure & Scalable
- **Supabase Backend**: Secure authentication and data storage
- **Row Level Security**: User data protection at the database level
- **TypeScript**: Full type safety throughout the application
- **Modern Architecture**: Clean, maintainable code structure

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** with Yup validation
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend & Services
- **Supabase** for authentication and database
- **Mock APIs** for weather, calendar, and social media data
- **Spotify Web API** integration ready
- **Real-time subscriptions** for live updates

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code quality
- **PostCSS** with Autoprefixer
- **TypeScript** for type safety

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd moodtunes
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Database Setup

The application uses Supabase for data storage. The following tables are created automatically:

- **users**: User profiles and preferences
- **mood_analyses**: Historical mood analysis data
- **playlists**: Generated playlists and metadata
- **tracks**: Music track information and audio features

## Architecture Overview

### Mood Analysis Engine
The core of MoodTunes is its sophisticated mood analysis system:

```typescript
// Analyzes multiple data sources
const moodData = MoodAnalyzer.analyzeMood(
  weatherData,      // Current weather conditions
  calendarEvents,   // Upcoming schedule
  socialPosts       // Recent social media activity
);
```

### Music Matching Algorithm
Songs are matched based on audio features:
- **Valence**: Musical positivity (happiness/sadness)
- **Energy**: Intensity and power of the track
- **Danceability**: How suitable for dancing
- **Tempo**: Speed of the music
- **Acousticness**: Amount of acoustic vs electronic elements

### Real-time Updates
The application provides live updates as conditions change:
- Weather changes trigger new recommendations
- Calendar events influence energy predictions
- Social media activity affects mood scoring

## API Integration

### Current Integrations
- **Mock Weather API**: Simulates weather data for mood analysis
- **Mock Calendar API**: Generates sample calendar events
- **Mock Social API**: Creates sample social media posts
- **Mock Spotify API**: Provides sample tracks with audio features

### Production Integrations (Ready to implement)
- **OpenWeatherMap**: Real weather data
- **Google Calendar API**: Actual calendar events
- **Twitter API**: Real social media sentiment
- **Spotify Web API**: Actual music data and playlist creation

## Deployment

### Frontend Deployment
The application can be deployed to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

### Recommended Platforms
- **Vercel**: Automatic deployments with Git integration
- **Netlify**: Easy static site hosting
- **Supabase Hosting**: Integrated with your backend

## Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Spotify** for the Web API and audio features concept
- **OpenWeatherMap** for weather data inspiration
- **Supabase** for the excellent backend-as-a-service platform
- **Tailwind CSS** for the utility-first CSS framework

---

Built with ❤️ for music lovers who want their playlists to match their mood.