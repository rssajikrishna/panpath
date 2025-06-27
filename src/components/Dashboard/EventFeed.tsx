import React from 'react';
import { Activity } from 'lucide-react';
import { EventData, SignalType } from '../../types';
import EventCard from '../UI/EventCard';

interface EventFeedProps {
  events: EventData[];
  activeFilters: SignalType[];
}

const EventFeed: React.FC<EventFeedProps> = ({ events, activeFilters }) => {
  const filteredEvents = React.useMemo(() => {
    if (activeFilters.length === 0) {
      return events;
    }
    
    return events.filter(event => 
      event.signalTypes.some(signalType => activeFilters.includes(signalType))
    );
  }, [events, activeFilters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold text-textPrimary">Live Event Feed</h2>
        </div>
        <div className="text-sm text-textSecondary">
          {filteredEvents.length} of {events.length} events
          {activeFilters.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-accent bg-opacity-10 text-accent rounded-full text-xs font-medium">
              Filtered
            </span>
          )}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-textSecondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-textPrimary mb-2">No events found</h3>
          <p className="text-textSecondary max-w-md mx-auto">
            {activeFilters.length > 0 
              ? 'Try adjusting your signal type filters to see more events.'
              : 'No recent outbreak signals detected. All systems monitoring normally.'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventFeed;