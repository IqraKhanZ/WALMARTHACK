import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const { isAuthenticated, isLoading, error, login, clearError } = useAuth();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-walmart-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-walmart-blue mx-auto mb-4"></div>
          <p className="text-walmart-medium-gray">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={async (credentials) => {
          clearError();
          await login(credentials);
        }}
        error={error || undefined}
      />
    );
  }

  // Show dashboard if authenticated
  return <Dashboard />;
}

export default App;