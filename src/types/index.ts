export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  location?: string;
  preferences?: UserPreferences;
  created_at: string;
}

export interface UserPreferences {
  city?: string;
  helpType?: string[];
  features?: string[];
  notifications?: boolean;
}

export interface EventData {
  id: string;
  title: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
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
  forecast?: ForecastData[];
}

export interface ForecastData {
  week: number;
  riskScore: number;
  confidence: number;
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

export interface AlertData {
  id: string;
  title: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  location?: string;
  active: boolean;
  priority: number;
  responseActions?: string[];
  acknowledged?: boolean;
  resolved?: boolean;
}

export type SignalType = 'wastewater' | 'pharmacy' | 'wearable' | 'acoustic' | 'social' | 'syndromic';

export interface MapPin {
  id: string;
  coordinates: [number, number];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  signalCount: number;
  lastUpdate: string;
  affectedPopulation?: number;
  signalTypes: SignalType[];
}

export interface SystemStats {
  activeMonitors: number;
  liveSignals: number;
  riskEvents: number;
  activeAlerts: number;
  globalCoverage: number;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: string;
}

export interface UploadData {
  type: 'csv' | 'json';
  signalType: SignalType;
  data: any;
  timestamp: string;
}

export interface WorkflowStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  lastRun: string;
  nextRun?: string;
  errorMessage?: string;
}