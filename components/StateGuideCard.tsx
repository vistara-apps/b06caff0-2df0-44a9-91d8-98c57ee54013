'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Shield, AlertTriangle } from 'lucide-react';
import { StateGuide, Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StateGuideCardProps {
  guide: StateGuide;
  language: Language;
  variant?: 'default' | 'compact';
}

export function StateGuideCard({ guide, language, variant = 'default' }: StateGuideCardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'doSay',
      title: t.whatToSay,
      icon: Shield,
      items: guide.doSay,
      color: 'text-green-400'
    },
    {
      id: 'dontSay',
      title: t.whatNotToSay,
      icon: AlertTriangle,
      items: guide.dontSay,
      color: 'text-red-400'
    },
    {
      id: 'rights',
      title: t.yourRights,
      icon: Shield,
      items: guide.keyRights,
      color: 'text-blue-400'
    },
    {
      id: 'contacts',
      title: t.emergencyContacts,
      icon: Shield,
      items: guide.emergencyContacts,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className={cn(
      'glass-card p-6 space-y-4',
      variant === 'compact' && 'p-4 space-y-3'
    )}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{guide.title}</h2>
        <p className="text-gray-200 text-sm leading-relaxed">
          {guide.rightsSummary}
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id} className="border border-white border-opacity-20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 flex items-center justify-between bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Icon className={cn('w-5 h-5', section.color)} />
                  <span className="font-medium text-white">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-300" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 py-3 bg-white bg-opacity-5">
                  <ul className="space-y-2">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-gray-300 mt-1">•</span>
                        <span className="text-gray-200 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
