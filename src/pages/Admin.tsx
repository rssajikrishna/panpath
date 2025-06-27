import React, { useState } from 'react';
import { Upload, Database, Zap, AlertTriangle, CheckCircle, FileText, Activity, Lock, Globe, Users } from 'lucide-react';
import { SignalType, UploadData } from '../types';
import { apiService } from '../utils/api';

const N8N_WEBHOOK_URL1 = 'https://forzio.app.n8n.cloud/webhook-test/panpath'; // Replace with your actual webhook URL
const N8N_WEBHOOK_URL2 = 'https://forzio.app.n8n.cloud/webhook-test/p2';

const Admin: React.FC = () => {
  const [uploadType, setUploadType] = useState<'csv' | 'json'>('json');
  const [signalType, setSignalType] = useState<SignalType>('wastewater');
  const [uploadData, setUploadData] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Synthetic anomaly injection
  const [anomalyLocation, setAnomalyLocation] = useState('');
  const [anomalyIntensity, setAnomalyIntensity] = useState(50);
  const [selectedSignals, setSelectedSignals] = useState<SignalType[]>(['wastewater']);
  const [isInjecting, setIsInjecting] = useState(false);

  // File upload
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
      // Validate JSON format if type is JSON
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

      // Send to n8n webhook
      try {
        await fetch(N8N_WEBHOOK_URL1, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadPayload),
        });
      } catch (e) {
        console.error('Failed to notify n8n webhook for upload', e);
      }
      
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

    try {
      const anomalyPayload = {
        location: anomalyLocation,
        intensity: anomalyIntensity,
        signalTypes: selectedSignals,
        timestamp: new Date().toISOString(),
      };

      await apiService.triggerSyntheticAnomaly(anomalyPayload);

      // Send to n8n webhook
      try {
        await fetch(N8N_WEBHOOK_URL2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(anomalyPayload),
        });
      } catch (e) {
        console.error('Failed to notify n8n webhook for anomaly', e);
      }

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
        
        // Auto-detect file type
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-8 h-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
              Admin Control Panel
            </h1>
          </div>
          <p className="text-textSecondary text-lg">
            Secure data upload and synthetic anomaly injection for testing and research
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">Security Notice</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This panel is for authorized personnel only. All uploads are logged and monitored. 
                Ensure data compliance with privacy regulations before uploading.
              </p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`rounded-lg p-4 mb-8 border ${getStatusColor()}`}>
            <div className="flex items-center space-x-2">
              {React.createElement(getStatusIcon(), { className: "w-5 h-5" })}
              <span className="font-medium">{statusMessage}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Data Upload Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-textPrimary">Signal Data Upload</h2>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-6">
              {/* Upload Type Selection */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  Data Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['json', 'csv'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUploadType(type)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        uploadType === type
                          ? 'border-accent bg-accent bg-opacity-10 text-accent'
                          : 'border-gray-200 text-textSecondary hover:border-accent hover:text-accent'
                      }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Signal Type Selection */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  Signal Type
                </label>
                <select
                  value={signalType}
                  onChange={(e) => setSignalType(e.target.value as SignalType)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {signalTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? 'border-accent bg-accent bg-opacity-5'
                    : 'border-gray-300 hover:border-accent'
                }`}
              >
                <Database className="w-12 h-12 text-textSecondary mx-auto mb-4" />
                <p className="text-textSecondary mb-2">
                  Drag and drop your {uploadType.toUpperCase()} file here, or paste data below
                </p>
                <p className="text-sm text-textSecondary">
                  Supports {uploadType.toUpperCase()} format only
                </p>
              </div>

              {/* Data Input */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  {uploadType.toUpperCase()} Data
                </label>
                <textarea
                  value={uploadData}
                  onChange={(e) => setUploadData(e.target.value)}
                  placeholder={sampleData[uploadType]}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
                />
              </div>

              {/* Upload Button */}
              <button
                type="submit"
                disabled={isUploading || !uploadData.trim()}
                className="w-full flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isUploading ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Signal Data
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Synthetic Anomaly Injection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-textPrimary">Synthetic Anomaly Injection</h2>
            </div>

            <div className="space-y-6">
              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  Target Location
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-textSecondary" />
                  <input
                    type="text"
                    value={anomalyLocation}
                    onChange={(e) => setAnomalyLocation(e.target.value)}
                    placeholder="e.g., Mumbai, India"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* Intensity Slider */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  Anomaly Intensity: {anomalyIntensity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={anomalyIntensity}
                  onChange={(e) => setAnomalyIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-textSecondary mt-1">
                  <span>Low (10%)</span>
                  <span>High (100%)</span>
                </div>
              </div>

              {/* Signal Types */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-3">
                  Affected Signal Types
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {signalTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSignals.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSignals([...selectedSignals, type]);
                          } else {
                            setSelectedSignals(selectedSignals.filter(s => s !== type));
                          }
                        }}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="text-sm text-textPrimary capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Inject Button */}
              <button
                onClick={handleSyntheticAnomaly}
                disabled={isInjecting || !anomalyLocation.trim() || selectedSignals.length === 0}
                className="w-full flex items-center justify-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isInjecting ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Injecting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Trigger Synthetic Anomaly
                  </>
                )}
              </button>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-700">
                    <strong>Warning:</strong> This will create synthetic outbreak signals for testing purposes. 
                    Use only in testing environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Integration Status */}
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
