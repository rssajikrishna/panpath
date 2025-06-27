import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, SignalType } from '../../types';
import { mockMapPins } from '../../data/mockData';
import { Clock, Users, TrendingUp } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  activeFilters: SignalType[];
  className?: string;
}

// Custom marker icons for different risk levels
const createRiskIcon = (riskLevel: 'low' | 'medium' | 'high') => {
  const colors = {
    low: '#52C41A',
    medium: '#FF8C00', 
    high: '#FF4D4F'
  };

  const color = colors[riskLevel];
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse-ring absolute" style="background-color: ${color}; opacity: 0.3;"></div>
        <div class="w-4 h-4 rounded-full border-2 border-white shadow-lg relative z-10" style="background-color: ${color};"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to auto-center map on latest event
const MapController: React.FC<{ pins: MapPin[] }> = ({ pins }) => {
  const map = useMap();
  
  useEffect(() => {
    if (pins.length > 0) {
      // Sort by last update and get the most recent
      const latestPin = pins.sort((a, b) => 
        new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      )[0];
      
      map.setView([latestPin.coordinates[1], latestPin.coordinates[0]], 6);
    }
  }, [pins, map]);

  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ activeFilters, className = '' }) => {
  const [filteredPins, setFilteredPins] = useState<MapPin[]>(mockMapPins);

  useEffect(() => {
    const filtered = mockMapPins.filter(pin => {
      if (activeFilters.length === 0) return true;
      return pin.signalTypes.some(type => activeFilters.includes(type));
    });
    setFilteredPins(filtered);
  }, [activeFilters]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const formatPopulation = (population?: number) => {
    if (!population) return 'N/A';
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`;
    return population.toString();
  };

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full rounded-lg shadow-clinical"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:hue-rotate-180 dark:invert dark:brightness-95 dark:contrast-90"
        />
        
        <MapController pins={filteredPins} />
        
        {filteredPins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.coordinates[1], pin.coordinates[0]]}
            icon={createRiskIcon(pin.riskLevel)}
          >
            <Popup className="clinical-popup">
              <div className="p-3 min-w-64">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-clinical-lg text-textPrimary">
                    {pin.location}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-clinical-xs font-medium uppercase tracking-wide ${
                    pin.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                    pin.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {pin.riskLevel} Risk
                  </span>
                </div>
                
                <div className="space-y-2 text-clinical-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-textSecondary">
                      <TrendingUp className="w-4 h-4" />
                      <span>Signals</span>
                    </div>
                    <span className="font-semibold text-textPrimary">{pin.signalCount}</span>
                  </div>
                  
                  {pin.affectedPopulation && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-textSecondary">
                        <Users className="w-4 h-4" />
                        <span>Affected</span>
                      </div>
                      <span className="font-semibold text-textPrimary">
                        {formatPopulation(pin.affectedPopulation)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-textSecondary">
                      <Clock className="w-4 h-4" />
                      <span>Updated</span>
                    </div>
                    <span className="font-semibold text-textPrimary">
                      {formatTimestamp(pin.lastUpdate)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1">
                    {pin.signalTypes.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-accent bg-opacity-10 text-accent text-clinical-xs font-medium rounded uppercase tracking-wide"
                      >
                        {type}
                      </span>
                    ))}
                    {pin.signalTypes.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-textSecondary text-clinical-xs font-medium rounded">
                        +{pin.signalTypes.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-card-dark rounded-lg shadow-clinical p-4 border border-border dark:border-border-dark">
        <h4 className="text-clinical-sm font-semibold text-textPrimary dark:text-textPrimary-dark mb-3 uppercase tracking-wide">
          Risk Levels
        </h4>
        <div className="space-y-2">
          {[
            { level: 'high', label: 'Critical', color: '#FF4D4F', count: filteredPins.filter(p => p.riskLevel === 'high').length },
            { level: 'medium', label: 'Elevated', color: '#FF8C00', count: filteredPins.filter(p => p.riskLevel === 'medium').length },
            { level: 'low', label: 'Normal', color: '#52C41A', count: filteredPins.filter(p => p.riskLevel === 'low').length },
          ].map((item) => (
            <div key={item.level} className="flex items-center justify-between space-x-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-clinical-xs font-medium text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
              <span className="text-clinical-xs font-bold text-textPrimary dark:text-textPrimary-dark">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Filters Indicator */}
      {activeFilters.length > 0 && (
        <div className="absolute top-4 right-4 bg-accent bg-opacity-90 text-white rounded-lg px-3 py-2 shadow-clinical">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-clinical-xs font-semibold uppercase tracking-wide">
              {activeFilters.length} Filter{activeFilters.length !== 1 ? 's' : ''} Active
            </span>
          </div>
        </div>
      )}

      {/* Live Status Indicator */}
      <div className="absolute top-4 left-4 bg-white dark:bg-card-dark rounded-lg px-3 py-2 shadow-clinical border border-border dark:border-border-dark">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-clinical-xs font-medium text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
            Live • {filteredPins.length} Sites
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;