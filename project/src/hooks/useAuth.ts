import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  region: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  username: 'manager@walmart.com',
  password: 'walmart123'
};

const DEMO_USER: User = {
  id: '1',
  username: 'manager@walmart.com',
  name: 'Regional Manager',
  role: 'Regional Manager',
  region: 'North Central'
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('walmart_user');
      const token = localStorage.getItem('walmart_token');
      
      if (storedUser && token) {
        try {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          // Clear invalid stored data
          localStorage.removeItem('walmart_user');
          localStorage.removeItem('walmart_token');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials (in production, this would be a real API call)
      if (
        credentials.username === DEMO_CREDENTIALS.username &&
        credentials.password === DEMO_CREDENTIALS.password
      ) {
        // Generate a mock token
        const token = `mock_token_${Date.now()}`;
        
        // Store user data and token
        localStorage.setItem('walmart_user', JSON.stringify(DEMO_USER));
        localStorage.setItem('walmart_token', token);

        setAuthState({
          user: DEMO_USER,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid username or password'
        }));
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      const errorMessage = 'An error occurred during login. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('walmart_user');
    localStorage.removeItem('walmart_token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    logout,
    clearError
  };
};