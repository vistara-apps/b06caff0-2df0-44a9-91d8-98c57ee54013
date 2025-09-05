export interface User {
  userId: string;
  farcasterId?: string;
  savedState?: string;
  subscriptionStatus: 'free' | 'premium';
}

export interface StateGuide {
  stateCode: string;
  title: string;
  rightsSummary: string;
  doSay: string[];
  dontSay: string[];
  keyRights: string[];
  emergencyContacts: string[];
}

export interface EncounterRecord {
  recordId: string;
  userId: string;
  timestamp: number;
  duration: number;
  filePath?: string;
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    state: string;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  state: string;
  city?: string;
}

export type Language = 'en' | 'es';

export interface ShareableCard {
  encounterTime: string;
  location: string;
  state: string;
  keyRights: string[];
  notes?: string;
}
