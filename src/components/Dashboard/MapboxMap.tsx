import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, SignalType } from '../../types';
import { mockMapPins } from '../../data/mockData';

// You'll need to set your Mapbox access token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'your-mapbox-token-here';

interface MapboxMapProps {
  activeFilters: SignalType[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ activeFilters }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your-mapbox-token-here') {
      console.warn('Mapbox token not configured. Please set VITE_MAPBOX_TOKEN in your environment variables.');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 2,
      projection: { name: 'mercator' }
    });

    map.current.on('load', () => {
      setIsLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when data or filters change
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter pins based on active filters
    const filteredPins = mockMapPins.filter(pin => {
      if (activeFilters.length === 0) return true;
      return pin.signalTypes.some(type => activeFilters.includes(type));
    });

    // Add new markers
    filteredPins.forEach(pin => {
      const color = getRiskColor(pin.riskLevel);
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      // Add hover effects
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
        markerElement.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
      });

      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
        markerElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
      });

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'map-popup'
      }).setHTML(`
        <div class="p-3">
          <h3 class="font-semibold text-textPrimary mb-2">${pin.location}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-textSecondary">Risk Level:</span>
              <span class="font-medium capitalize ${getRiskTextColor(pin.riskLevel)}">${pin.riskLevel}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-textSecondary">Signals:</span>
              <span class="font-medium">${pin.signalCount}</span>
            </div>
            ${pin.affectedPopulation ? `
              <div class="flex justify-between">
                <span class="text-textSecondary">Affected:</span>
                <span class="font-medium">${formatPopulation(pin.affectedPopulation)}</span>
              </div>
            ` : ''}
            <div class="flex justify-between">
              <span class="text-textSecondary">Updated:</span>
              <span class="font-medium">${formatLastUpdate(pin.lastUpdate)}</span>
            </div>
          </div>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(pin.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [isLoaded, activeFilters]);

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return '#C3E8BD';
      case 'medium': return '#F9E79F';
      case 'high': return '#F5B7B1';
      default: return '#E5E7EB';
    }
  };

  const getRiskTextColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatPopulation = (population: number) => {
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`;
    return population.toString();
  };

  const formatLastUpdate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  // Fallback for when Mapbox is not configured
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your-mapbox-token-here') {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
          <p className="text-sm opacity-90 mb-4">
            Configure Mapbox token to enable interactive mapping
          </p>
          <p className="text-xs opacity-75">
            Set VITE_MAPBOX_TOKEN in your environment variables
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg overflow-hidden shadow-lg"
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg">
        <h4 className="text-sm font-semibold text-textPrimary mb-2">Risk Levels</h4>
        <div className="space-y-2">
          {[
            { level: 'high', label: 'High Risk', count: mockMapPins.filter(p => p.riskLevel === 'high').length },
            { level: 'medium', label: 'Medium Risk', count: mockMapPins.filter(p => p.riskLevel === 'medium').length },
            { level: 'low', label: 'Low Risk', count: mockMapPins.filter(p => p.riskLevel === 'low').length },
          ].map((item) => (
            <div key={item.level} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: getRiskColor(item.level as any) }}
              />
              <span className="text-textSecondary">
                {item.label} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active filters indicator */}
      {activeFilters.length > 0 && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-sm font-medium text-textPrimary">
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;