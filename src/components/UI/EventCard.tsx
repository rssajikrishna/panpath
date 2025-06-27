import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { EventData } from '../../types';
import RiskBadge from './RiskBadge';
import SignalBadge from './SignalBadge';

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-accent hover:border-opacity-50 transition-all duration-300 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-textPrimary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {event.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-textSecondary mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.location.name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{formatTimestamp(event.timestamp)}</span>
            </div>
            
            {event.affectedPopulation && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>{formatPopulation(event.affectedPopulation)} affected</span>
              </div>
            )}
          </div>
        </div>
        <RiskBadge level={event.riskLevel} />
      </div>

      {/* Confidence Score */}
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-4 h-4 text-accent" />
        <span className="text-sm text-textSecondary">
          Confidence: 
          <span className="font-semibold text-textPrimary ml-1">
            {Math.round(event.confidenceScore * 100)}%
          </span>
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${event.confidenceScore * 100}%` }}
          />
        </div>
      </div>

      {/* Signal Types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {event.signalTypes.slice(0, 3).map((signalType) => (
          <SignalBadge 
            key={signalType} 
            type={signalType} 
            value={event.signals[signalType]}
            showValue={true}
            size="sm"
          />
        ))}
        {event.signalTypes.length > 3 && (
          <span className="px-2 py-1 text-xs font-medium text-textSecondary bg-gray-100 rounded-full">
            +{event.signalTypes.length - 3} more
          </span>
        )}
      </div>

      {/* Response Teams */}
      {event.responseTeams && event.responseTeams.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-textSecondary mb-1">Response Teams:</p>
          <p className="text-sm text-textPrimary">
            {event.responseTeams.slice(0, 2).join(', ')}
            {event.responseTeams.length > 2 && ` +${event.responseTeams.length - 2} more`}
          </p>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-textSecondary">
          {event.signalTypes.length} signal{event.signalTypes.length !== 1 ? 's' : ''} detected
        </div>
        <Link
          to={`/event/${event.id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-accent hover:text-white hover:bg-accent border border-accent rounded-lg transition-all duration-200 group-hover:shadow-md"
        >
          View Details
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;