import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, TrendingUp, Users, ArrowRight, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { EventData } from '../../types';

interface ClinicalEventCardProps {
  event: EventData;
}

const ClinicalEventCard: React.FC<ClinicalEventCardProps> = ({ event }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const formatPopulation = (population?: number) => {
    if (!population) return 'N/A';
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`;
    return population.toString();
  };

  const getRiskConfig = () => {
    switch (event.riskLevel) {
      case 'high':
        return {
          color: 'bg-alert text-white',
          icon: AlertTriangle,
          label: 'CRITICAL',
          pulse: 'animate-pulse'
        };
      case 'medium':
        return {
          color: 'bg-warning text-white',
          icon: AlertCircle,
          label: 'ELEVATED',
          pulse: ''
        };
      case 'low':
        return {
          color: 'bg-success text-white',
          icon: CheckCircle,
          label: 'NORMAL',
          pulse: ''
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          icon: AlertCircle,
          label: 'UNKNOWN',
          pulse: ''
        };
    }
  };

  // Mock sparkline data
  const sparklineData = [
    { value: 20 }, { value: 25 }, { value: 35 }, { value: 45 }, 
    { value: Math.round(event.confidenceScore * 100) }
  ];

  const riskConfig = getRiskConfig();
  const RiskIcon = riskConfig.icon;

  return (
    <div className="bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark hover:shadow-clinical-lg transition-all duration-300 group">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-clinical-lg font-semibold text-textPrimary dark:text-textPrimary-dark mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
              {event.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 text-clinical-sm text-textSecondary dark:text-textSecondary-dark">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate font-medium">{event.location.name}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{formatTimestamp(event.timestamp)}</span>
              </div>
              
              {event.affectedPopulation && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{formatPopulation(event.affectedPopulation)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Risk Status Badge */}
          <div className={`px-3 py-2 rounded-lg ${riskConfig.color} ${riskConfig.pulse} flex items-center space-x-2`}>
            <RiskIcon className="w-4 h-4" />
            <span className="text-clinical-xs font-bold uppercase tracking-wide">
              {riskConfig.label}
            </span>
          </div>
        </div>

        {/* Confidence Score with Sparkline */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-clinical-sm text-textSecondary dark:text-textSecondary-dark font-medium uppercase tracking-wide">
              Confidence
            </span>
            <span className="text-clinical-lg font-bold text-textPrimary dark:text-textPrimary-dark">
              {Math.round(event.confidenceScore * 100)}%
            </span>
          </div>
          
          {/* Mini Sparkline Chart */}
          <div className="w-20 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00BFA6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${event.confidenceScore * 100}%` }}
          />
        </div>
      </div>

      {/* Signal Types */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {event.signalTypes.slice(0, 4).map((signalType) => (
            <span 
              key={signalType}
              className="px-2 py-1 bg-accent bg-opacity-10 text-accent text-clinical-xs font-semibold rounded uppercase tracking-wide border border-accent border-opacity-20"
            >
              {signalType}
              {event.signals[signalType] && (
                <span className="ml-1 opacity-75">
                  {event.signals[signalType]}%
                </span>
              )}
            </span>
          ))}
          {event.signalTypes.length > 4 && (
            <span className="px-2 py-1 text-clinical-xs font-medium text-textSecondary dark:text-textSecondary-dark bg-gray-100 dark:bg-gray-700 rounded uppercase tracking-wide">
              +{event.signalTypes.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Response Teams */}
      {event.responseTeams && event.responseTeams.length > 0 && (
        <div className="px-6 pb-4">
          <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark font-medium uppercase tracking-wide mb-1">
            Response Teams
          </div>
          <div className="text-clinical-sm text-textPrimary dark:text-textPrimary-dark font-medium">
            {event.responseTeams.slice(0, 2).join(', ')}
            {event.responseTeams.length > 2 && ` +${event.responseTeams.length - 2} more`}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-border dark:border-border-dark rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark font-medium uppercase tracking-wide">
            {event.signalTypes.length} Signal{event.signalTypes.length !== 1 ? 's' : ''} • ID: {event.id}
          </div>
          <Link
            to={`/event/${event.id}`}
            className="inline-flex items-center px-4 py-2 text-clinical-xs font-bold text-white bg-accent hover:bg-primary rounded-lg transition-all duration-200 group-hover:shadow-clinical uppercase tracking-wide"
          >
            Investigate
            <ArrowRight className="ml-2 w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClinicalEventCard;