import React, { useState, useMemo } from 'react';
import { MapPin as MapPinIcon, Globe } from 'lucide-react';
import { SignalType } from '../../types';
import { mockMapPins } from '../../data/mockData';

interface InteractiveMapProps {
  activeFilters: SignalType[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ activeFilters }) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const filteredPins = useMemo(() => {
    return mockMapPins.filter(pin => {
      if (activeFilters.length === 0) return true;
      return pin.signalTypes.some(type => activeFilters.includes(type));
    });
  }, [activeFilters]);

  const getRiskColor = (level: 'low' | 'medium' | 'high' | 'critical') => {
    switch (level) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
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

  const formatPopulation = (population?: number) => {
    if (!population) return 'N/A';
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`;
    return population.toString();
  };

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectCoordinates = (lng: number, lat: number) => {
    const x = ((lng + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 500;
    return { x, y };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Global Surveillance Map</h3>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-primary rounded-lg overflow-hidden shadow-card">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-96 relative z-10"
        >
          {/* Enhanced world map outline */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Enhanced continent shapes */}
          <g fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
            {/* North America */}
            <path d="M80 80 L240 60 L280 100 L260 140 L220 180 L180 200 L120 180 L100 140 Z" />
            {/* South America */}
            <path d="M180 220 L240 210 L260 240 L280 300 L260 360 L220 380 L180 370 L160 340 L150 280 Z" />
            {/* Europe */}
            <path d="M420 60 L520 50 L540 80 L530 120 L480 140 L440 130 L410 100 Z" />
            {/* Africa */}
            <path d="M420 150 L520 140 L540 180 L560 250 L540 320 L500 350 L460 340 L440 300 L430 250 L440 200 Z" />
            {/* Asia */}
            <path d="M540 40 L780 30 L820 60 L840 100 L860 140 L840 180 L800 200 L750 190 L700 180 L650 170 L580 160 L540 120 Z" />
            {/* Australia */}
            <path d="M720 280 L800 270 L820 300 L810 330 L780 340 L740 335 L710 320 Z" />
          </g>

          {/* Risk level pins with enhanced interactions */}
          {filteredPins.map((pin) => {
            const coords = projectCoordinates(pin.coordinates[0], pin.coordinates[1]);
            const isHovered = hoveredPin === pin.id;
            
            return (
              <g key={pin.id}>
                {/* Pulse animation for high/critical risk */}
                {(pin.riskLevel === 'high' || pin.riskLevel === 'critical') && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="20"
                    fill={getRiskColor(pin.riskLevel)}
                    opacity="0.3"
                    className="animate-pulse-ring"
                  />
                )}
                
                {/* Main pin */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered ? "14" : "10"}
                  fill={getRiskColor(pin.riskLevel)}
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200 hover:drop-shadow-lg"
                  filter="url(#glow)"
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                
                {/* Inner indicator */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="5"
                  fill="rgba(255,255,255,0.9)"
                  className="pointer-events-none"
                />
                
                {/* Enhanced popup */}
                {isHovered && (
                  <g>
                    <rect
                      x={coords.x + 20}
                      y={coords.y - 60}
                      width="240"
                      height="120"
                      rx="8"
                      fill="rgba(0,0,0,0.95)"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    />
                    
                    <text x={coords.x + 35} y={coords.y - 35} fill="white" fontSize="14" fontWeight="700">
                      {pin.location}
                    </text>
                    
                    <text x={coords.x + 35} y={coords.y - 15} fill="#00C7B7" fontSize="11" fontWeight="600">
                      {pin.signalCount} signals • {pin.riskLevel} risk
                    </text>
                    
                    {pin.affectedPopulation && (
                      <text x={coords.x + 35} y={coords.y + 5} fill="rgba(255,255,255,0.8)" fontSize="10">
                        {formatPopulation(pin.affectedPopulation)} affected
                      </text>
                    )}
                    
                    <text x={coords.x + 35} y={coords.y + 25} fill="rgba(255,255,255,0.6)" fontSize="10">
                      Updated {formatLastUpdate(pin.lastUpdate)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Enhanced Legend */}
        <div className="absolute bottom-4 left-4 bg-card-white bg-opacity-95 rounded-lg p-4 shadow-card border border-border">
          <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4 text-primary" />
            <span>Risk Levels</span>
          </h4>
          <div className="space-y-2">
            {[
              { level: 'critical', label: 'Critical', count: filteredPins.filter(p => p.riskLevel === 'critical').length },
              { level: 'high', label: 'High Risk', count: filteredPins.filter(p => p.riskLevel === 'high').length },
              { level: 'medium', label: 'Medium Risk', count: filteredPins.filter(p => p.riskLevel === 'medium').length },
              { level: 'low', label: 'Low Risk', count: filteredPins.filter(p => p.riskLevel === 'low').length },
            ].map((item) => (
              <div key={item.level} className="flex items-center justify-between space-x-3 text-xs">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: getRiskColor(item.level as any) }}
                  />
                  <span className="text-text-secondary font-medium">{item.label}</span>
                </div>
                <span className="text-text-primary font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active filters indicator */}
        {activeFilters.length > 0 && (
          <div className="absolute top-4 right-4 bg-card-white bg-opacity-95 rounded-lg p-3 shadow-card">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-text-primary">
                {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
              </span>
            </div>
          </div>
        )}

        {/* System status indicator */}
        <div className="absolute top-4 left-4 bg-card-white bg-opacity-95 rounded-lg p-3 shadow-card">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-text-secondary">
              Live Monitoring • {filteredPins.length} locations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;