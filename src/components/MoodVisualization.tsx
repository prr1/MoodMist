import React from 'react';
import { MoodAnalysis } from '../types';
import { Cloud, Sun, CloudRain, Calendar, MessageCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MoodVisualizationProps {
  analysis: MoodAnalysis;
}

export const MoodVisualization: React.FC<MoodVisualizationProps> = ({ analysis }) => {
  const getMoodIcon = (score: number) => {
    if (score > 0.3) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (score < -0.3) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-yellow-500" />;
  };

  const getMoodColor = (score: number) => {
    if (score > 0.3) return 'from-green-400 to-green-600';
    if (score < -0.3) return 'from-red-400 to-red-600';
    return 'from-yellow-400 to-yellow-600';
  };

  const getWeatherIcon = (influence: number) => {
    if (influence > 0.2) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (influence < -0.2) return <CloudRain className="w-5 h-5 text-blue-500" />;
    return <Cloud className="w-5 h-5 text-gray-500" />;
  };

  const formatScore = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        Current Mood Analysis
      </h3>

      {/* Overall Mood Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Overall Mood</span>
          <div className="flex items-center space-x-2">
            {getMoodIcon(analysis.mood_score)}
            <span className="font-bold text-lg">{formatScore(analysis.mood_score)}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${getMoodColor(analysis.mood_score)} transition-all duration-1000`}
            style={{ width: `${Math.abs(formatScore(analysis.mood_score))}%` }}
          />
        </div>
      </div>

      {/* Energy Level */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Energy Level</span>
          <span className="font-bold text-lg">{formatScore(analysis.energy_level)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000"
            style={{ width: `${formatScore(analysis.energy_level)}%` }}
          />
        </div>
      </div>

      {/* Influence Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 rounded-xl p-4 border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            {getWeatherIcon(analysis.weather_influence)}
            <span className="text-sm font-medium text-gray-700">Weather</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {formatScore(analysis.weather_influence)}%
          </div>
        </div>

        <div className="bg-white/50 rounded-xl p-4 border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Calendar</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {formatScore(analysis.calendar_stress)}%
          </div>
        </div>

        <div className="bg-white/50 rounded-xl p-4 border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Social</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {formatScore(analysis.social_sentiment)}%
          </div>
        </div>
      </div>

      {/* Recommended Genres */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-3">Recommended Genres</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.recommended_genres.map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};