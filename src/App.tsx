import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { Loader2 } from 'lucide-react';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading MoodTunes...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <Dashboard />
  );
}

export default App;
