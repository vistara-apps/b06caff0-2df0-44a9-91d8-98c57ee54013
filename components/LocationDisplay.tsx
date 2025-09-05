'use client';

import { useState, useEffect } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { LocationData, Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { getCurrentLocation } from '@/lib/utils';

interface LocationDisplayProps {
  language: Language;
  onLocationChange?: (location: LocationData | null) => void;
}

export function LocationDisplay({ language, onLocationChange }: LocationDisplayProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);
      onLocationChange?.(locationData);
      
      if (!locationData) {
        setError(t.locationUnavailable);
      }
    } catch (err) {
      setError(t.error);
      console.error('Location fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-purple-300" />
          <span className="text-white font-medium">{t.location}</span>
        </div>
        
        <button
          onClick={fetchLocation}
          disabled={loading}
          className="p-1 text-purple-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="text-sm">
        {loading && (
          <p className="text-gray-300">Detecting location...</p>
        )}
        
        {error && (
          <p className="text-red-300">{error}</p>
        )}
        
        {location && !loading && (
          <div className="space-y-1">
            <p className="text-white font-medium">
              {location.state}
              {location.city && `, ${location.city}`}
            </p>
            <p className="text-gray-300 text-xs">
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </p>
          </div>
        )}
        
        {!location && !loading && !error && (
          <p className="text-gray-300">Location not available</p>
        )}
      </div>
    </div>
  );
}
