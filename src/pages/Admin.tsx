import React, { useState } from 'react';
import {
  Upload,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity,
  Lock,
  Globe,
  Users
} from 'lucide-react';
import { SignalType, UploadData } from '../types';
import { apiService } from '../utils/api';

// 🔗 Add your n8n webhook URLs here
const N8N_WEBHOOK_UPLOAD_URL = 'https://forzio.app.n8n.cloud/webhook-test/panpath';
const N8N_WEBHOOK_ANOMALY_URL = 'https://forzio.app.n8n.cloud/webhook-test/panpath';

const Admin: React.FC = () => {
  const [uploadType, setUploadType] = useState<'csv' | 'json'>('json');
  const [signalType, setSignalType] = useState<SignalType>('wastewater');
  const [uploadData, setUploadData] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const [anomalyLocation, setAnomalyLocation] = useState('');
  const [anomalyIntensity, setAnomalyIntensity] = useState(50);
  const [selectedSignals, setSelectedSignals] = useState<SignalType[]>(['wastewater']);
  const [isInjecting, setIsInjecting] = useState(false);

  const [isDragOver, setIsDragOver] = useState(false);

  const signalTypes: SignalType[] = ['wastewater', 'pharmacy', 'wearable', 'acoustic', 'social', 'syndromic'];

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!uploadData.trim()) {
      setUploadStatus('error');
      setStatusMessage('Please provide data to upload');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      if (uploadType === 'json') {
        JSON.parse(uploadData);
      }

      const uploadPayload: UploadData = {
        type: uploadType,
        signalType,
        data: uploadType === 'json' ? JSON.parse(uploadData) : uploadData,
        timestamp: new Date().toISOString(),
      };

      await apiService.uploadSignalData(uploadPayload);

      // 🚀 Send to n8n webhook
      await fetch(N8N_WEBHOOK_UPLOAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadPayload),
      });

      setUploadStatus('success');
      setStatusMessage(`${signalType} data uploaded successfully`);
      setUploadData('');
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSyntheticAnomaly = async () => {
    if (!anomalyLocation.trim()) {
      setStatusMessage('Please enter a location for the anomaly');
      return;
    }

    setIsInjecting(true);

    const anomalyPayload = {
      location: anomalyLocation,
      intensity: anomalyIntensity,
      signalTypes: selectedSignals,
      timestamp: new Date().toISOString(),
    };

    try {
      await apiService.triggerSyntheticAnomaly(anomalyPayload);

      // 🚀 Send to n8n webhook
      await fetch(N8N_WEBHOOK_ANOMALY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anomalyPayload),
      });

      setStatusMessage(`Synthetic anomaly triggered in ${anomalyLocation}`);
      setAnomalyLocation('');
      setAnomalyIntensity(50);
      setSelectedSignals(['wastewater']);
    } catch (error) {
      setStatusMessage('Failed to trigger synthetic anomaly');
    } finally {
      setIsInjecting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setUploadData(content);
        if (file.name.endsWith('.json')) {
          setUploadType('json');
        } else if (file.name.endsWith('.csv')) {
          setUploadType('csv');
        }
      };
      reader.readAsText(file);
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      default: return FileText;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const sampleData = {
    json: `{
  "timestamp": "2025-01-20T15:00:00Z",
  "location": "Mumbai, India",
  "coordinates": [72.8777, 19.0760],
  "signals": {
    "wastewater": 75,
    "confidence": 0.87
  }
}`,
    csv: `timestamp,location,coordinates_lat,coordinates_lng,signal_value,confidence
2025-01-20T15:00:00Z,Mumbai India,19.0760,72.8777,75,0.87
2025-01-20T15:30:00Z,São Paulo Brazil,-23.5505,-46.6333,68,0.72`
  };

  // 💡 The rest of your component remains unchanged, all UI stays intact.
  return (
    <div className="min-h-screen bg-background">
      {/* Entire JSX returned by Admin component remains the same */}
      {/* Paste all your JSX code here without modification */}
    </div>
  );
};

export default Admin;
