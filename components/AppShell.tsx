'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen w-full',
      variant === 'glass' ? 'backdrop-blur-sm' : '',
      className || ''
    )}>
      <div className="container mx-auto max-w-lg px-6 py-8">
        {children}
      </div>
    </div>
  );
}
