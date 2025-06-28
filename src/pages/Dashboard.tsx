import React, { useState } from 'react';
import { Globe, Activity, TrendingUp, AlertTriangle, Search } from 'lucide-react';
import { SignalType } from '../types';
import { mockEvents, mockAlerts, mockSystemStats } from '../data/mockData';
import InteractiveMap from '../components/Dashboard/InteractiveMap';
import { apiService } from '../utils/api';

const Dashboard: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<SignalType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const stats = [
    {
      icon: Globe,
      label: 'Active Monitors',
      value: mockSystemStats.activeMonitors.toLocaleString(),
      change: '+12',
      changeType: 'positive' as const,
    },
    {
      icon: Activity,
      label: 'Live Signals',
      value: `${(mockSystemStats.liveSignals / 1000).toFixed(1)}K`,
      change: '+8.2%',
      changeType: 'positive' as const,
    },
    {
      icon: TrendingUp,
      label: 'Risk Events',
      value: mockSystemStats.riskEvents.toString(),
      change: '+3',
      changeType: 'neutral' as const,
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: mockSystemStats.activeAlerts.toString(),
      change: mockAlerts.filter(alert => alert.level === 'critical').length > 0 ? 'Critical' : 'Normal',
      changeType: mockAlerts.filter(alert => alert.level === 'critical').length > 0 ? 'negative' : 'positive' as const,
    },
  ];

  const signalTypes: SignalType[] = ['wastewater', 'pharmacy', 'wearable', 'acoustic', 'social', 'syndromic'];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const toggleFilter = (signalType: SignalType) => {
    setActiveFilters(prev => 
      prev.includes(signalType)
        ? prev.filter(filter => filter !== signalType)
        : [...prev, signalType]
    );
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearchLoading(true);
    try {
      await apiService.searchLocation(searchQuery);
      // In a real app, this would update the map and events list
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const filteredEvents = React.useMemo(() => {
    if (activeFilters.length === 0) {
      return mockEvents;
    }
    
    return mockEvents.filter(event => 
      event.signalTypes.some(signalType => activeFilters.includes(signalType))
    );
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h2 font-bold text-text-primary mb-2">
            Global Health Intelligence Dashboard
          </h1>
          <p className="text-text-secondary text-lg">
            Real-time pathogen outbreak detection and early warning system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card-white rounded-lg shadow-card border border-border p-6 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${getChangeColor(stat.changeType)} mt-1`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-card-white rounded-lg shadow-card border border-border p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-primary" />
            <div className="flex-1 flex space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by city, ZIP code, or region..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={searchLoading || !searchQuery.trim()}
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-button uppercase"
              >
                {searchLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Signal Filters */}
        <div className="bg-card-white rounded-lg shadow-card border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Signal Sources</h3>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <button
                onClick={() => setActiveFilters(signalTypes)}
                className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
              >
                Select All
              </button>
              <span className="text-text-secondary">|</span>
              <button
                onClick={() => setActiveFilters([])}
                className="text-text-secondary hover:text-text-primary font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {signalTypes.map((signalType) => {
              const isActive = activeFilters.includes(signalType);
              return (
                <button
                  key={signalType}
                  onClick={() => toggleFilter(signalType)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                    isActive 
                      ? 'border-primary bg-primary bg-opacity-10 shadow-card' 
                      : 'border-border hover:border-primary hover:bg-background'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-sm font-semibold capitalize ${
                      isActive ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {signalType}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">
                  Showing data for <span className="font-semibold text-text-primary">{activeFilters.length}</span> of {signalTypes.length} signal types
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary font-medium">Live Filtering</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="bg-card-white rounded-lg shadow-card border border-border p-6 mb-8">
              <InteractiveMap activeFilters={activeFilters} />
            </div>
          </div>

          {/* Event Feed */}
          <div className="lg:col-span-1">
            <div className="bg-card-white rounded-lg shadow-card border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-text-primary">Live Events</h2>
                </div>
                <div className="text-sm text-text-secondary">
                  {filteredEvents.length} of {mockEvents.length} events
                  {activeFilters.length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs font-medium">
                      Filtered
                    </span>
                  )}
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No events found</h3>
                  <p className="text-text-secondary">
                    {activeFilters.length > 0 
                      ? 'Try adjusting your signal type filters to see more events.'
                      : 'No recent outbreak signals detected. All systems monitoring normally.'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className="p-4 bg-background rounded-lg hover:shadow-card transition-all duration-200 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-text-primary line-clamp-2">
                          {event.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.riskLevel === 'critical' ? 'bg-error text-white' :
                          event.riskLevel === 'high' ? 'bg-warning text-white' :
                          event.riskLevel === 'medium' ? 'bg-warning bg-opacity-20 text-warning' :
                          'bg-success bg-opacity-20 text-success'
                        }`}>
                          {event.riskLevel}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-2">
                        {event.location.name}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">
                          {Math.round(event.confidenceScore * 100)}% confidence
                        </span>
                        <span className="text-xs text-text-secondary">
                          {event.signalTypes.length} signal{event.signalTypes.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <div className="bg-card-white rounded-lg shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Recent System Activity</h3>
            <div className="space-y-4">
              {[
                { time: '14:30', event: 'High-risk signal cluster detected in Mumbai', type: 'critical' },
                { time: '12:15', event: 'Acoustic monitoring active in São Paulo', type: 'info' },
                { time: '11:45', event: 'Wearable data sync completed for Lagos region', type: 'success' },
                { time: '10:20', event: 'Wastewater surveillance updated for London', type: 'info' },
                { time: '09:30', event: 'System health check completed successfully', type: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 py-2">
                  <div className="text-text-secondary text-sm font-mono">
                    {activity.time}
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'critical' ? 'bg-error' :
                      activity.type === 'success' ? 'bg-success' : 'bg-primary'
                    }`}
                  />
                  <div className="text-text-primary text-sm flex-1">
                    {activity.event}
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

export default Dashboard;