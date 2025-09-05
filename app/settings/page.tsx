'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/utils';
import { ArrowLeft, Settings, Shield, Volume2, Bell, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [notifications, setNotifications] = useState(true);
  const [autoRecord, setAutoRecord] = useState(false);
  const [recordingQuality, setRecordingQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [dataUsage, setDataUsage] = useState(0);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const savedLanguage = loadFromLocalStorage<Language>('preferred_language', 'en');
    const savedNotifications = loadFromLocalStorage<boolean>('notifications_enabled', true);
    const savedAutoRecord = loadFromLocalStorage<boolean>('auto_record_enabled', false);
    const savedQuality = loadFromLocalStorage<'low' | 'medium' | 'high'>('recording_quality', 'medium');
    
    setLanguage(savedLanguage);
    setNotifications(savedNotifications);
    setAutoRecord(savedAutoRecord);
    setRecordingQuality(savedQuality);

    // Calculate data usage (mock calculation)
    const recordings = loadFromLocalStorage('encounter_records', []);
    setDataUsage(recordings.length * 2.5); // Approximate MB per recording
  }, []);

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled);
    saveToLocalStorage('notifications_enabled', enabled);
  };

  const handleAutoRecordChange = (enabled: boolean) => {
    setAutoRecord(enabled);
    saveToLocalStorage('auto_record_enabled', enabled);
  };

  const handleQualityChange = (quality: 'low' | 'medium' | 'high') => {
    setRecordingQuality(quality);
    saveToLocalStorage('recording_quality', quality);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      recordings: loadFromLocalStorage('encounter_records', []),
      settings: {
        language,
        notifications,
        autoRecord,
        recordingQuality
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `know-your-rights-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell variant="glass">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
        </div>

        {/* Language Settings */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <span>🌐</span>
            <span>{t.language}</span>
          </h2>
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Privacy & Security */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Notifications</p>
                <p className="text-gray-300 text-sm">Get alerts for important updates</p>
              </div>
              <button
                onClick={() => handleNotificationsChange(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto-Record Mode</p>
                <p className="text-gray-300 text-sm">Automatically start recording when app opens</p>
              </div>
              <button
                onClick={() => handleAutoRecordChange(!autoRecord)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRecord ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRecord ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Recording Settings */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Recording Settings</span>
          </h2>
          <div>
            <p className="text-white font-medium mb-2">Audio Quality</p>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => handleQualityChange(quality)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    recordingQuality === quality
                      ? 'bg-purple-500 text-white'
                      : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                  }`}
                >
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Higher quality uses more storage space
            </p>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Storage Used</p>
                <p className="text-gray-300 text-sm">~{dataUsage.toFixed(1)} MB</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={exportData}
                className="flex-1 btn-secondary flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              
              <button
                onClick={clearAllData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">App Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Version</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Platform</span>
              <span className="text-white">Base MiniApp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Build</span>
              <span className="text-white">Production</span>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-center pt-4 pb-8">
          <p className="text-gray-400 text-xs">
            {t.educationalPurpose}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
