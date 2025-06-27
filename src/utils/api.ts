import { EventData, AlertData, MapPin, SystemStats, ApiConfig, UploadData } from '../types';

class ApiService {
  private config: ApiConfig = {};

  constructor() {
    // Initialize with environment variables or defaults
    this.config = {
      airtableApiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
      airtableBaseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
      n8nWebhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL,
      mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
    };
  }

  // Airtable Integration
  async fetchEvents(): Promise<EventData[]> {
    if (!this.config.airtableApiKey || !this.config.airtableBaseId) {
      console.warn('Airtable credentials not configured, using mock data');
      // Return mock data for now
      const { mockEvents } = await import('../data/mockData');
      return mockEvents;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${this.config.airtableBaseId}/Events`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.airtableApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformAirtableEvents(data.records);
    } catch (error) {
      console.error('Failed to fetch events from Airtable:', error);
      // Fallback to mock data
      const { mockEvents } = await import('../data/mockData');
      return mockEvents;
    }
  }

  async fetchAlerts(): Promise<AlertData[]> {
    if (!this.config.airtableApiKey || !this.config.airtableBaseId) {
      const { mockAlerts } = await import('../data/mockData');
      return mockAlerts;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${this.config.airtableBaseId}/Alerts`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.airtableApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      return this.transformAirtableAlerts(data.records);
    } catch (error) {
      console.error('Failed to fetch alerts from Airtable:', error);
      const { mockAlerts } = await import('../data/mockData');
      return mockAlerts;
    }
  }

  async fetchMapPins(): Promise<MapPin[]> {
    if (!this.config.airtableApiKey || !this.config.airtableBaseId) {
      const { mockMapPins } = await import('../data/mockData');
      return mockMapPins;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${this.config.airtableBaseId}/MapPins`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.airtableApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      return this.transformAirtableMapPins(data.records);
    } catch (error) {
      console.error('Failed to fetch map pins from Airtable:', error);
      const { mockMapPins } = await import('../data/mockData');
      return mockMapPins;
    }
  }

  async fetchSystemStats(): Promise<SystemStats> {
    const { mockSystemStats } = await import('../data/mockData');
    return mockSystemStats;
  }

  // n8n Webhook Integration
  async triggerSyntheticAnomaly(data: any): Promise<void> {
    if (!this.config.n8nWebhookUrl) {
      console.warn('n8n webhook URL not configured');
      return;
    }

    try {
      await fetch(this.config.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'synthetic_anomaly',
          timestamp: new Date().toISOString(),
          data,
        }),
      });
    } catch (error) {
      console.error('Failed to trigger synthetic anomaly:', error);
      throw error;
    }
  }

  async uploadSignalData(uploadData: UploadData): Promise<void> {
    if (!this.config.n8nWebhookUrl) {
      console.warn('n8n webhook URL not configured');
      return;
    }

    try {
      await fetch(`${this.config.n8nWebhookUrl}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'signal_upload',
          timestamp: new Date().toISOString(),
          ...uploadData,
        }),
      });
    } catch (error) {
      console.error('Failed to upload signal data:', error);
      throw error;
    }
  }

  // Data transformation helpers
  private transformAirtableEvents(records: any[]): EventData[] {
    return records.map(record => ({
      id: record.id,
      title: record.fields.Title,
      location: {
        name: record.fields.Location,
        coordinates: [record.fields.Longitude, record.fields.Latitude],
      },
      riskLevel: record.fields.RiskLevel?.toLowerCase() || 'low',
      signalTypes: record.fields.SignalTypes?.split(',') || [],
      timestamp: record.fields.Timestamp,
      confidenceScore: record.fields.ConfidenceScore || 0,
      signals: {
        wastewater: record.fields.Wastewater,
        pharmacy: record.fields.Pharmacy,
        wearable: record.fields.Wearable,
        acoustic: record.fields.Acoustic,
        social: record.fields.Social,
        syndromic: record.fields.Syndromic,
      },
      recommendation: record.fields.Recommendation,
      affectedPopulation: record.fields.AffectedPopulation,
      responseTeams: record.fields.ResponseTeams?.split(',') || [],
    }));
  }

  private transformAirtableAlerts(records: any[]): AlertData[] {
    return records.map(record => ({
      id: record.id,
      title: record.fields.Title,
      level: record.fields.Level?.toLowerCase() || 'warning',
      message: record.fields.Message,
      timestamp: record.fields.Timestamp,
      location: record.fields.Location,
      active: record.fields.Active || false,
      priority: record.fields.Priority || 3,
      responseActions: record.fields.ResponseActions?.split(',') || [],
    }));
  }

  private transformAirtableMapPins(records: any[]): MapPin[] {
    return records.map(record => ({
      id: record.id,
      coordinates: [record.fields.Longitude, record.fields.Latitude],
      riskLevel: record.fields.RiskLevel?.toLowerCase() || 'low',
      location: record.fields.Location,
      signalCount: record.fields.SignalCount || 0,
      lastUpdate: record.fields.LastUpdate,
      affectedPopulation: record.fields.AffectedPopulation,
      signalTypes: record.fields.SignalTypes?.split(',') || [],
    }));
  }

  // Configuration methods
  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): ApiConfig {
    return { ...this.config };
  }
}

export const apiService = new ApiService();
export default apiService;