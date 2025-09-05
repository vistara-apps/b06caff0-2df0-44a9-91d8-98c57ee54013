'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-gray-200">
            We encountered an error while loading the app. Please try again.
          </p>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try again</span>
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
