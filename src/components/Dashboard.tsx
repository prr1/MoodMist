import React from 'react';
import { Layout } from './Layout';
import { MoodVisualization } from './MoodVisualization';
import { PlaylistGenerator } from './PlaylistGenerator';
import { useMoodAnalysis } from '../hooks/useMoodAnalysis';
import { RefreshCw, Loader2, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { analysis, loading, error, regenerateAnalysis } = useMoodAnalysis();

  if (loading && !analysis) {
    return (
      <Layout currentPage="dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Analyzing Your Mood</h3>
            <p className="text-gray-500">Gathering data from weather, calendar, and social media...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout currentPage="dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Analysis Failed</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={regenerateAnalysis}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!analysis) {
    return (
      <Layout currentPage="dashboard">
        <div className="text-center py-12">
          <p className="text-gray-500">No analysis available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="dashboard">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Music Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Personalized recommendations based on your current mood and context
            </p>
          </div>
          
          <button
            onClick={regenerateAnalysis}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl text-gray-700 hover:bg-white/80 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Analysis</span>
          </button>
        </div>

        {/* Mood Analysis */}
        <MoodVisualization analysis={analysis} />

        {/* Playlist Generator */}
        <PlaylistGenerator analysis={analysis} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Mood Journey</h3>
            <p className="text-gray-600 text-sm">
              Your mood has been analyzed based on current weather conditions, upcoming calendar events, and recent social media activity.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Music Preferences</h3>
            <p className="text-gray-600 text-sm">
              We've identified {analysis.recommended_genres.length} genres that match your current state and energy level.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalization</h3>
            <p className="text-gray-600 text-sm">
              Connect more services to improve recommendations: Spotify, Twitter, Google Calendar.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};