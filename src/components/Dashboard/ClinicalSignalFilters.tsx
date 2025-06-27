import React from 'react';
import { Filter, Droplets, Pill, Heart, Mic, MessageSquare, Activity } from 'lucide-react';
import { SignalType } from '../../types';

interface ClinicalSignalFiltersProps {
  activeFilters: SignalType[];
  onFiltersChange: (filters: SignalType[]) => void;
}

const ClinicalSignalFilters: React.FC<ClinicalSignalFiltersProps> = ({ 
  activeFilters, 
  onFiltersChange 
}) => {
  const signalTypes: Array<{
    type: SignalType;
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    description: string;
  }> = [
    {
      type: 'wastewater',
      label: 'Wastewater',
      icon: Droplets,
      color: 'bg-blue-500',
      description: 'Sewage surveillance'
    },
    {
      type: 'pharmacy',
      label: 'Pharmacy',
      icon: Pill,
      color: 'bg-green-500',
      description: 'OTC medication sales'
    },
    {
      type: 'wearable',
      label: 'Wearables',
      icon: Heart,
      color: 'bg-red-500',
      description: 'Biometric monitoring'
    },
    {
      type: 'acoustic',
      label: 'Cough Audio',
      icon: Mic,
      color: 'bg-purple-500',
      description: 'Audio pattern analysis'
    },
    {
      type: 'social',
      label: 'Social Media',
      icon: MessageSquare,
      color: 'bg-orange-500',
      description: 'Social sentiment tracking'
    },
    {
      type: 'syndromic',
      label: 'Syndromic',
      icon: Activity,
      color: 'bg-pink-500',
      description: 'Clinical symptom reports'
    },
  ];

  const toggleFilter = (signalType: SignalType) => {
    if (activeFilters.includes(signalType)) {
      onFiltersChange(activeFilters.filter(filter => filter !== signalType));
    } else {
      onFiltersChange([...activeFilters, signalType]);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  const selectAllFilters = () => {
    onFiltersChange(signalTypes.map(s => s.type));
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-lg shadow-clinical border border-border dark:border-border-dark p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent bg-opacity-10 rounded-lg">
            <Filter className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-clinical-lg font-semibold text-textPrimary dark:text-textPrimary-dark">
              Signal Sources
            </h3>
            <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
              Filter by data source type
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={selectAllFilters}
            className="text-clinical-xs font-semibold text-accent hover:text-primary transition-colors duration-200 uppercase tracking-wide"
          >
            Select All
          </button>
          <span className="text-textSecondary dark:text-textSecondary-dark">|</span>
          <button
            onClick={clearAllFilters}
            className="text-clinical-xs font-semibold text-textSecondary dark:text-textSecondary-dark hover:text-textPrimary dark:hover:text-textPrimary-dark transition-colors duration-200 uppercase tracking-wide"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {signalTypes.map((signal) => {
          const isActive = activeFilters.includes(signal.type);
          const Icon = signal.icon;
          
          return (
            <button
              key={signal.type}
              onClick={() => toggleFilter(signal.type)}
              className={`group relative p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                isActive 
                  ? 'border-accent bg-accent bg-opacity-10 shadow-clinical' 
                  : 'border-border dark:border-border-dark hover:border-accent hover:bg-accent hover:bg-opacity-5'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-accent bg-opacity-20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-textSecondary dark:text-textSecondary-dark'}`} />
                </div>
                
                <div className="text-center">
                  <div className={`text-clinical-xs font-semibold uppercase tracking-wide ${
                    isActive ? 'text-accent' : 'text-textPrimary dark:text-textPrimary-dark'
                  }`}>
                    {signal.label}
                  </div>
                  <div className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark mt-1">
                    {signal.description}
                  </div>
                </div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white dark:border-card-dark animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Status */}
      {activeFilters.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-clinical-xs font-medium text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                {activeFilters.length} of {signalTypes.length} sources active
              </span>
            </div>
            <div className="text-clinical-xs font-semibold text-accent uppercase tracking-wide">
              Live Filtering
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalSignalFilters;