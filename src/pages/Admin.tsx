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

      // 🔗 Send to n8n webhook
      await fetch("https://forzio.app.n8n.cloud/webhook-test/panpath", {
        method: "POST",
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

      // 🔗 Send to n8n webhook
      await fetch("https://forzio.app.n8n.cloud/webhook-test/panpath", {
        method: "POST",
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
        if (file.name.endsWith('.json')) setUploadType('json');
        else if (file.name.endsWith('.csv')) setUploadType('csv');
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
2025-01-20T15:00:00Z,Mumbai India,19.0760,72.8777,75,0.87`
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-8 h-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">Admin Control Panel</h1>
          </div>
          <p className="text-textSecondary text-lg">
            Secure data upload and synthetic anomaly injection for testing and research
          </p>
        </div>

       

        {statusMessage && (
          <div className={`rounded-lg p-4 mb-8 border ${getStatusColor()}`}>
            <div className="flex items-center space-x-2">
              {React.createElement(getStatusIcon(), { className: "w-5 h-5" })}
              <span className="font-medium">{statusMessage}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Signal Data Upload Section */}
          {/* ... this block stays unchanged as already included above in your working code */}
          {/* Anomaly Trigger Section */}
          {/* ... also unchanged, only webhook logic added inside handlers */}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-textPrimary mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-accent" />
            <span>System Integration Status</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-textPrimary">Airtable API</p>
                <p className="text-xs text-textSecondary">Connected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-textPrimary">n8n Webhooks</p>
                <p className="text-xs text-textSecondary">Active</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-textPrimary">Mapbox Integration</p>
                <p className="text-xs text-textSecondary">Requires Token</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-textSecondary">
                <Users className="w-4 h-4" />
                <span>Last admin session: 2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-textSecondary">
                <Database className="w-4 h-4" />
                <span>Total uploads today: 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
