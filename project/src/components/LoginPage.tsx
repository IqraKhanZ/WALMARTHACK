import React, { useState } from 'react';
import { Eye, EyeOff, Warehouse, Lock, User, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  error?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      errors.username = 'Username or Employee ID is required';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin(formData);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-walmart-gray flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="bg-walmart-blue p-3 rounded-full">
              <Warehouse className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-walmart-dark-gray">Walmart</h1>
              <p className="text-sm text-walmart-medium-gray">Warehouse Manager</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-walmart-dark-gray">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-walmart-medium-gray">
            Access your warehouse management dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Global Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-walmart-dark-gray mb-2">
                Username or Employee ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-walmart-medium-gray" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-walmart-blue focus:border-walmart-blue ${
                    validationErrors.username ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your username or employee ID"
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-walmart-dark-gray mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-walmart-medium-gray" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-walmart-blue focus:border-walmart-blue ${
                    validationErrors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-walmart-medium-gray hover:text-walmart-dark-gray" />
                  ) : (
                    <Eye className="h-5 w-5 text-walmart-medium-gray hover:text-walmart-dark-gray" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-walmart-blue hover:text-walmart-blue-dark font-medium"
                onClick={() => alert('Forgot password functionality will be implemented')}
              >
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-walmart-blue hover:bg-walmart-blue-dark'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-walmart-yellow bg-opacity-10 rounded-md border border-walmart-yellow border-opacity-30">
            <h4 className="text-sm font-medium text-walmart-dark-gray mb-2">Demo Credentials:</h4>
            <div className="text-xs text-walmart-medium-gray space-y-1">
              <p><strong>Username:</strong> manager@walmart.com</p>
              <p><strong>Password:</strong> walmart123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-walmart-medium-gray">
            © 2024 Walmart Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;