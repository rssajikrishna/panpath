import React, { useState } from 'react';
import { MapPin, Calendar, Filter } from 'lucide-react';
import { mockEvents, mockNews } from '../../data/mockData';
import InteractiveMap from '../Dashboard/InteractiveMap';

const LiveFeed: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  const signalTypes = ['wastewater', 'pharmacy', 'wearable', 'acoustic', 'social', 'syndromic'];

  const toggleSignal = (signal: string) => {
    setSelectedSignals(prev => 
      prev.includes(signal) 
        ? prev.filter(s => s !== signal)
        : [...prev, signal]
    );
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Live Global Intelligence
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Real-time outbreak detection and AI-generated insights from our global monitoring network.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-semibold text-text-primary">Filters:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Date Picker */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-text-secondary" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Signal Type Toggles */}
              <div className="flex flex-wrap gap-2">
                {signalTypes.map((signal) => (
                  <button
                    key={signal}
                    onClick={() => toggleSignal(signal)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedSignals.includes(signal)
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {signal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-card-white rounded-lg shadow-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-h3 font-bold text-text-primary">Global Threat Map</h3>
              </div>
              <div className="h-96">
                <InteractiveMap activeFilters={selectedSignals as any} />
              </div>
            </div>
          </div>

          {/* News Carousel */}
          <div className="lg:col-span-1">
            <div className="bg-card-white rounded-lg shadow-card p-6">
              <h3 className="text-h3 font-bold text-text-primary mb-6">AI-Generated Insights</h3>
              
              <div className="space-y-4">
                {mockNews.map((item) => (
                  <div key={item.id} className="p-4 bg-background rounded-lg hover:shadow-card transition-shadow duration-200">
                    <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {item.headline}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span>{item.location}</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 text-xs text-primary font-medium">
                      {item.source}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Events */}
              <div className="mt-8">
                <h4 className="font-semibold text-text-primary mb-4">Recent Events</h4>
                <div className="space-y-3">
                  {mockEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="p-3 bg-background rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.riskLevel === 'critical' ? 'bg-error text-white' :
                          event.riskLevel === 'high' ? 'bg-warning text-white' :
                          event.riskLevel === 'medium' ? 'bg-warning bg-opacity-20 text-warning' :
                          'bg-success bg-opacity-20 text-success'
                        }`}>
                          {event.riskLevel}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {Math.round(event.confidenceScore * 100)}%
                        </span>
                      </div>
                      <h5 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                        {event.title}
                      </h5>
                      <p className="text-xs text-text-secondary">
                        {event.location.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveFeed;