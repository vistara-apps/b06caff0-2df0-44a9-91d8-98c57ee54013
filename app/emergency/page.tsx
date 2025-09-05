'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { LocationDisplay } from '@/components/LocationDisplay';
import { Language, LocationData } from '@/lib/types';
import { TRANSLATIONS, STATE_GUIDES } from '@/lib/constants';
import { loadFromLocalStorage } from '@/lib/utils';
import { ArrowLeft, Phone, AlertTriangle, Shield, MapPin, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const savedLanguage = loadFromLocalStorage<Language>('preferred_language', 'en');
    setLanguage(savedLanguage);
  }, []);

  const handleLocationChange = (location: LocationData | null) => {
    setCurrentLocation(location);
  };

  // Get current state guide
  const currentStateCode = currentLocation?.state || 'CA';
  const currentGuide = STATE_GUIDES[currentStateCode] || STATE_GUIDES.CA;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const callNumber = (number: string) => {
    // Extract just the phone number from the contact string
    const phoneMatch = number.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) {
      window.location.href = `tel:${phoneMatch[0]}`;
    }
  };

  const emergencyTips = [
    {
      icon: '🆔',
      title: 'Keep ID Ready',
      description: 'Have your identification easily accessible but don\'t reach for it unless asked.'
    },
    {
      icon: '📱',
      title: 'Record if Safe',
      description: 'Use this app to record interactions when it\'s safe to do so.'
    },
    {
      icon: '🤐',
      title: 'Stay Silent',
      description: 'You have the right to remain silent. Use it.'
    },
    {
      icon: '👥',
      title: 'Ask for Witnesses',
      description: 'If possible, ask bystanders to witness and record the interaction.'
    },
    {
      icon: '📝',
      title: 'Remember Details',
      description: 'Try to remember badge numbers, patrol car numbers, and officer descriptions.'
    },
    {
      icon: '⚖️',
      title: 'Contact Lawyer',
      description: 'Contact a lawyer as soon as possible after any encounter.'
    }
  ];

  const nationalContacts = [
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate life-threatening emergencies',
      type: 'emergency'
    },
    {
      name: 'ACLU National',
      number: '(212) 549-2500',
      description: 'American Civil Liberties Union',
      type: 'legal'
    },
    {
      name: 'National Lawyers Guild',
      number: '(212) 679-5100',
      description: 'Legal support and know your rights',
      type: 'legal'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support',
      type: 'support'
    }
  ];

  return (
    <AppShell variant="glass">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h1 className="text-2xl font-bold text-white">Emergency Contacts</h1>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-red-200 font-semibold">Emergency Situation?</h3>
          </div>
          <p className="text-red-100 text-sm mb-3">
            If you're in immediate danger, call 911 first. Use these resources for legal support and guidance.
          </p>
          <button
            onClick={() => callNumber('911')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call 911</span>
          </button>
        </div>

        {/* Location Display */}
        <LocationDisplay
          language={language}
          onLocationChange={handleLocationChange}
        />

        {/* State-Specific Contacts */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-300" />
            <h2 className="text-lg font-semibold text-white">
              {currentGuide.title} - Emergency Contacts
            </h2>
          </div>
          
          <div className="space-y-3">
            {currentGuide.emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium">{contact}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(contact)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => callNumber(contact)}
                      className="p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
                      title="Call number"
                    >
                      <Phone className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National Contacts */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-300" />
            <span>National Resources</span>
          </h2>
          
          <div className="space-y-3">
            {nationalContacts.map((contact, index) => (
              <div key={index} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{contact.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.type === 'emergency' ? 'bg-red-500 text-white' :
                        contact.type === 'legal' ? 'bg-blue-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {contact.type}
                      </span>
                    </div>
                    <p className="text-purple-300 font-mono text-sm mb-1">{contact.number}</p>
                    <p className="text-gray-300 text-sm">{contact.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => copyToClipboard(contact.number)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                    {contact.type !== 'support' && (
                      <button
                        onClick={() => callNumber(contact.number)}
                        className="p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
                        title="Call number"
                      >
                        <Phone className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Emergency Tips</h2>
          <div className="grid gap-4">
            {emergencyTips.map((tip, index) => (
              <div key={index} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">{tip.title}</h3>
                    <p className="text-gray-300 text-sm">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/"
              className="btn-primary text-center"
            >
              Start Recording
            </Link>
            <Link 
              href="/settings"
              className="btn-secondary text-center"
            >
              App Settings
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-gray-400 text-xs">
            {t.educationalPurpose}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
