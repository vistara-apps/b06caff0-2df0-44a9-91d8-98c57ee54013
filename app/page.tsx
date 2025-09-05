'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { StateGuideCard } from '@/components/StateGuideCard';
import { RecordButton } from '@/components/RecordButton';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ShareButton } from '@/components/ShareButton';
import { LocationDisplay } from '@/components/LocationDisplay';
import { StatsCard } from '@/components/StatsCard';
import { Language, LocationData, EncounterRecord, ShareableCard } from '@/lib/types';
import { STATE_GUIDES, TRANSLATIONS } from '@/lib/constants';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/utils';
import { Shield, Settings } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [encounterRecords, setEncounterRecords] = useState<EncounterRecord[]>([]);
  
  const { setFrameReady } = useMiniKit();
  const t = TRANSLATIONS[language];

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Load saved data
  useEffect(() => {
    const savedLanguage = loadFromLocalStorage<Language>('preferred_language', 'en');
    const savedRecords = loadFromLocalStorage<EncounterRecord[]>('encounter_records', []);
    
    setLanguage(savedLanguage);
    setEncounterRecords(savedRecords);
  }, []);

  // Save language preference
  useEffect(() => {
    saveToLocalStorage('preferred_language', language);
  }, [language]);

  const handleLocationChange = (location: LocationData | null) => {
    setCurrentLocation(location);
  };

  const handleRecordingSaved = (record: EncounterRecord) => {
    setEncounterRecords(prev => [...prev, record]);
  };

  // Get current state guide
  const currentStateCode = currentLocation?.state || 'CA';
  const currentGuide = STATE_GUIDES[currentStateCode] || STATE_GUIDES.CA;

  // Create shareable card data
  const shareableCard: ShareableCard = {
    encounterTime: new Date().toISOString(),
    location: currentLocation ? `${currentLocation.city || ''}, ${currentLocation.state}`.trim() : 'Unknown',
    state: currentStateCode,
    keyRights: currentGuide.keyRights,
    notes: undefined
  };

  return (
    <AppShell variant="glass">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10"></div> {/* Spacer */}
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-purple-300" />
              <h1 className="text-3xl font-bold text-white">{t.appTitle}</h1>
            </div>
            <Link 
              href="/settings" 
              className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            >
              <Settings className="w-6 h-6 text-white" />
            </Link>
          </div>
          <p className="text-gray-200 text-lg leading-relaxed max-w-md mx-auto">
            Instant, state-specific legal rights and police encounter guides, right in your pocket.
          </p>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />

        {/* Location Display */}
        <LocationDisplay
          language={language}
          onLocationChange={handleLocationChange}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title={t.stateGuide}
            value={currentStateCode}
            subtitle={t.currentLocation}
          />
          <StatsCard
            title={t.recordings}
            value={encounterRecords.length.toString()}
            subtitle={t.totalSaved}
          />
        </div>

        {/* Record Button */}
        <RecordButton
          language={language}
          variant="primary"
          onRecordingSaved={handleRecordingSaved}
        />

        {/* State Guide Card */}
        <StateGuideCard
          guide={currentGuide}
          language={language}
          variant="default"
        />

        {/* Share Button */}
        <ShareButton
          shareData={shareableCard}
          language={language}
          variant="outline"
        />

        {/* Recent Recordings */}
        {encounterRecords.length > 0 && (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{t.recentRecordings}</h3>
              <Link 
                href="/recordings" 
                className="text-purple-300 hover:text-purple-200 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {encounterRecords.slice(-3).reverse().map((record) => (
                <div key={record.recordId} className="bg-white bg-opacity-5 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {t.duration}: {Math.floor(record.duration / 60)}:{(record.duration % 60).toString().padStart(2, '0')}
                      </p>
                      {record.notes && (
                        <p className="text-gray-300 text-sm mt-1">{record.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <p className="text-gray-300 text-sm">
            {t.appTitle} • {t.builtOnBase}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {t.educationalPurpose}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
