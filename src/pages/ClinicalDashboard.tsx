import React, { useState } from 'react';
import { Activity, TrendingUp, AlertTriangle, Users, Globe, Zap } from 'lucide-react';
import { SignalType } from '../types';
import { mockEvents, mockAlerts } from '../data/mockData';
import LeafletMap from '../components/Dashboard/LeafletMap';
import ClinicalSignalFilters from '../components/Dashboard/ClinicalSignalFilters';
import ClinicalEventCard from '../components/Dashboard/ClinicalEventCard';

const ClinicalDashboard: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<SignalType[]>([]);

  const filteredEvents = React.useMemo(() => {
    if (activeFilters.length === 0) {
      return mockEvents;
    }
    
    return mockEvents.filter(event => 
      event.signalTypes.some(signalType => activeFilters.includes(signalType))
    );
  }, [activeFilters]);

  const stats = [
    {
      icon: Globe,
      label: 'Active Monitors',
      value: '2,847',
      change: '+12',
      changeType: 'positive' as const,
      description: 'Global surveillance sites'
    },
    {
      icon: Activity,
      label: 'Live Signals',
      value: '156.4K',
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'Real-time data streams'
    },
    {
      icon: TrendingUp,
      label: 'Risk Events',
      value: filteredEvents.length.toString(),
      change: '+3',
      changeType: 'neutral' as const,
      description: 'Detected anomalies'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: mockAlerts.filter(alert => alert.active).length.toString(),
      change: mockAlerts.filter(alert => alert.level === 'critical').length > 0 ? 'Critical' : 'Normal',
      changeType: mockAlerts.filter(alert => alert.level === 'critical').length > 0 ? 'negative' : 'positive' as const,
      description: 'System notifications'
    },
  ];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-alert';
      case 'neutral': return 'text-warning';
      default: return 'text-textSecondary dark:text-textSecondary-dark';
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-accent bg-opacity-10 rounded-lg">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-textPrimary dark:text-textPrimary-dark">
                Clinical Dashboard
              </h1>
              <p className="text-textSecondary dark:text-textSecondary-dark text-clinical-base uppercase tracking-wide font-medium">
                Real-time pathogen surveillance & outbreak detection
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark p-6 hover:shadow-clinical-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-accent bg-opacity-10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div className={`text-clinical-sm font-bold ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </div>
              </div>
              
              <div>
                <div className="text-clinical-xs font-semibold text-textSecondary dark:text-textSecondary-dark mb-1 uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-textPrimary-dark mb-1">
                  {stat.value}
                </div>
                <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signal Filters */}
        <div className="mb-8">
          <ClinicalSignalFilters 
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent bg-opacity-10 rounded-lg">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-clinical-xl font-semibold text-textPrimary dark:text-textPrimary-dark">
                      Global Surveillance Map
                    </h2>
                    <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                      Real-time outbreak detection
                    </p>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-clinical-xs font-medium text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                    System Online
                  </span>
                </div>
              </div>
              
              <LeafletMap 
                activeFilters={activeFilters} 
                className="h-96 rounded-lg overflow-hidden"
              />
            </div>
          </div>

          {/* Events Feed */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent bg-opacity-10 rounded-lg">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-clinical-xl font-semibold text-textPrimary dark:text-textPrimary-dark">
                      Live Events
                    </h2>
                    <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                      Recent detections
                    </p>
                  </div>
                </div>
                
                <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark font-medium uppercase tracking-wide">
                  {filteredEvents.length} of {mockEvents.length}
                  {activeFilters.length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-accent bg-opacity-10 text-accent rounded-full font-bold">
                      Filtered
                    </span>
                  )}
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark">
                  <Activity className="w-12 h-12 text-textSecondary dark:text-textSecondary-dark mx-auto mb-4 opacity-50" />
                  <h3 className="text-clinical-lg font-semibold text-textPrimary dark:text-textPrimary-dark mb-2">
                    No Events Found
                  </h3>
                  <p className="text-clinical-sm text-textSecondary dark:text-textSecondary-dark">
                    {activeFilters.length > 0 
                      ? 'Adjust signal filters to view more events'
                      : 'All systems monitoring normally'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredEvents.slice(0, 5).map((event) => (
                    <ClinicalEventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Activity Log */}
        <div className="mt-12">
          <div className="bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-accent bg-opacity-10 rounded-lg">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-clinical-xl font-semibold text-textPrimary dark:text-textPrimary-dark">
                  System Activity
                </h3>
                <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                  Recent system events
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { time: '14:30', event: 'High-risk signal cluster detected in Mumbai', type: 'critical', source: 'AI Detection' },
                { time: '12:15', event: 'Acoustic monitoring active in São Paulo', type: 'info', source: 'System' },
                { time: '11:45', event: 'Wearable data sync completed for Lagos region', type: 'success', source: 'Data Sync' },
                { time: '10:20', event: 'Wastewater surveillance updated for London', type: 'info', source: 'Data Update' },
                { time: '09:30', event: 'System health check completed successfully', type: 'success', source: 'Health Check' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-textSecondary dark:text-textSecondary-dark text-clinical-xs font-mono font-bold">
                    {activity.time}
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'critical' ? 'bg-alert animate-pulse' :
                      activity.type === 'success' ? 'bg-success' : 'bg-accent'
                    }`}
                  />
                  <div className="text-textPrimary dark:text-textPrimary-dark text-clinical-sm flex-1 font-medium">
                    {activity.event}
                  </div>
                  <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark font-medium uppercase tracking-wide">
                    {activity.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDashboard;