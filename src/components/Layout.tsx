import React from 'react';
import { Music, User, Settings, Home, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analysis', label: 'Mood Analysis', icon: TrendingUp },
    { id: 'playlists', label: 'My Playlists', icon: Music },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MoodTunes
                </h1>
                <p className="text-xs text-gray-500">AI-Powered Music Curation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white/60 backdrop-blur-md border-r border-white/20 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white/50 hover:shadow-md'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};