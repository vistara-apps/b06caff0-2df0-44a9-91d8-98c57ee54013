'use client';

import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { Language, ShareableCard } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { generateShareableText } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  shareData: ShareableCard;
  language: Language;
  variant?: 'default' | 'outline';
}

export function ShareButton({ shareData, language, variant = 'default' }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const t = TRANSLATIONS[language];

  const shareText = generateShareableText(
    shareData.state,
    shareData.location,
    new Date(shareData.encounterTime).getTime(),
    shareData.keyRights
  );

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Know Your Rights Card',
          text: shareText,
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const handleFarcasterShare = () => {
    const encodedText = encodeURIComponent(shareText);
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodedText}`;
    window.open(farcasterUrl, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className={cn(
          'w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200',
          variant === 'outline'
            ? 'border border-white border-opacity-30 bg-white bg-opacity-10 text-white hover:bg-opacity-20'
            : 'btn-primary'
        )}
      >
        <Share2 className="w-5 h-5" />
        <span>{t.shareCard}</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 space-y-3 z-10">
          <h4 className="text-white font-medium text-center mb-3">Share Options</h4>
          
          <div className="space-y-2">
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center space-x-3 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-md transition-all duration-200"
            >
              <Share2 className="w-4 h-4 text-purple-300" />
              <span className="text-white">Share via System</span>
            </button>

            <button
              onClick={handleFarcasterShare}
              className="w-full flex items-center space-x-3 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-purple-300" />
              <span className="text-white">Share on Farcaster</span>
            </button>

            <button
              onClick={handleCopyToClipboard}
              className="w-full flex items-center space-x-3 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-md transition-all duration-200"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-purple-300" />
              )}
              <span className="text-white">
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowShareMenu(false)}
            className="w-full text-gray-300 text-sm py-2 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
