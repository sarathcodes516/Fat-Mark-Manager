import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, UserCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 shadow-xl">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <UserCircle size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SVCE FAT Management</h1>
            <p className="mt-2 text-gray-400">Sign in to access your portal</p>
          </div>
          
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex rounded-lg bg-gray-700 p-1">
              <button
                type="button"
                className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-colors ${
                  role === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-colors ${
                  role === 'professor'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setRole('professor')}
              >
                Professor
              </button>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                isLoading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Signing in...</span>
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
        
        <div className="border-t border-gray-700 bg-gray-750 px-8 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SVCE. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;