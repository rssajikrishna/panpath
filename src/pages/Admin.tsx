// Complete Admin Panel Code with Webhook to n8n for SignalMonitor Integration

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

      const payload: UploadData = {
        type: uploadType,
        signalType,
        data: uploadType === 'json' ? JSON.parse(uploadData) : uploadData,
        timestamp: new Date().toISOString()
      };

      await apiService.uploadSignalData(payload);

      // 🔗 Trigger n8n webhook
      await fetch("https://forzio.app.n8n.cloud/webhook-test/panpath", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
    const payload = {
      location: anomalyLocation,
      intensity: anomalyIntensity,
      signalTypes: selectedSignals,
      timestamp: new Date().toISOString()
    };

    try {
      await apiService.triggerSyntheticAnomaly(payload);

      // 🔗 Trigger n8n webhook
      await fetch("https://forzio.app.n8n.cloud/webhook-test/panpath", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  // ... Remaining UI JSX omitted here for brevity, already detailed in prior messages

  return (
    <div>
      {/* Render form elements for upload and anomaly injection */}
      {/* Display statusMessage and handle UI states */}
    </div>
  );
};

export default Admin;
