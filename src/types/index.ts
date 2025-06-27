export interface EventData {
  id: string;
  title: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  riskLevel: 'low' | 'medium' | 'high';
  signalTypes: SignalType[];
  timestamp: string;
  confidenceScore: number;
  signals: {
    wastewater?: number;
    pharmacy?: number;
    wearable?: number;
    acoustic?: number;
    social?: number;
    syndromic?: number;
  };
  recommendation?: string;
  affectedPopulation?: number;
  responseTeams?: string[];
}

export interface AlertData {
  id: string;
  title: string;
  level: 'warning' | 'critical';
  message: string;
  timestamp: string;
  location?: string;
  active: boolean;
  priority: number;
  responseActions?: string[];
}

export type SignalType = 'wastewater' | 'pharmacy' | 'wearable' | 'acoustic' | 'social' | 'syndromic';

export interface MapPin {
  id: string;
  coordinates: [number, number];
  riskLevel: 'low' | 'medium' | 'high';
  location: string;
  signalCount: number;
  lastUpdate: string;
  affectedPopulation?: number;
  signalTypes: SignalType[];
}

export interface ApiConfig {
  airtableApiKey?: string;
  airtableBaseId?: string;
  n8nWebhookUrl?: string;
  mapboxToken?: string;
}

export interface UploadData {
  type: 'csv' | 'json';
  signalType: SignalType;
  data: any;
  timestamp: string;
}

export interface SystemStats {
  activeMonitors: number;
  liveSignals: number;
  riskEvents: number;
  activeAlerts: number;
  globalCoverage: number;
  lastUpdated: string;
}