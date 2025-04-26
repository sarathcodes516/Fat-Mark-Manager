import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-center">
      <div className="mb-8 text-7xl font-bold text-blue-500">404</div>
      <h1 className="mb-4 text-3xl font-bold text-white">Page Not Found</h1>
      <p className="mb-8 max-w-md text-gray-400">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Home size={16} className="mr-2" />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;