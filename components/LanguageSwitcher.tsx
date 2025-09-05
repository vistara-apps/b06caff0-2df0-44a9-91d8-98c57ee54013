'use client';

import { Globe } from 'lucide-react';
import { Language } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  variant?: 'default';
}

export function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'default' 
}: LanguageSwitcherProps) {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="glass-card p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Globe className="w-5 h-5 text-purple-300" />
        <span className="text-white font-medium">Language</span>
      </div>
      
      <div className="flex space-x-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={cn(
              'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
              currentLanguage === lang.code
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20'
            )}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
