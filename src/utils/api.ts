const N8N_BASE_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook';

export const apiService = {
  // Signal monitoring
  async uploadSignalData(data: any) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/signals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'signal_upload',
          timestamp: new Date().toISOString(),
          data,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to upload signal data:', error);
      throw error;
    }
  },

  // Event synthesis
  async triggerEventSynthesis() {
    try {
      const response = await fetch(`${N8N_BASE_URL}/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'event_synthesis',
          timestamp: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to trigger event synthesis:', error);
      throw error;
    }
  },

  // Location search
  async searchLocation(query: string) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'location_search',
          query,
          timestamp: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to search location:', error);
      throw error;
    }
  },

  // Map updates
  async updateMapData(eventId: string) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/map-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'map_update',
          eventId,
          timestamp: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to update map data:', error);
      throw error;
    }
  },

  // Alert dispatch
  async dispatchAlert(alertData: any) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/alert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'alert_dispatch',
          timestamp: new Date().toISOString(),
          alert: alertData,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to dispatch alert:', error);
      throw error;
    }
  },

  // Chat AI
  async sendChatMessage(message: string, context?: string) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'chat_message',
          message,
          context,
          timestamp: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to send chat message:', error);
      throw error;
    }
  },

  // Synthetic anomaly injection
  async triggerSyntheticAnomaly(data: any) {
    try {
      const response = await fetch(`${N8N_BASE_URL}/anomaly`, {
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
      return await response.json();
    } catch (error) {
      console.error('Failed to trigger synthetic anomaly:', error);
      throw error;
    }
  },
};