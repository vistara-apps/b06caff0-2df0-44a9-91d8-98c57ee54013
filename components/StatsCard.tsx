'use client';

import { BarChart3, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
}

export function StatsCard({ title, value, subtitle, trend }: StatsCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium text-sm">{title}</h3>
        <BarChart3 className="w-4 h-4 text-purple-300" />
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-white">{value}</p>
        
        {subtitle && (
          <p className="text-gray-300 text-xs">{subtitle}</p>
        )}
        
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs">+{trend}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
