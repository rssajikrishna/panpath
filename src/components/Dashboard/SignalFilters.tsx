import React from 'react';
import { Filter } from 'lucide-react';
import { SignalType } from '../../types';
import SignalBadge from '../UI/SignalBadge';

interface SignalFiltersProps {
  activeFilters: SignalType[];
  onFiltersChange: (filters: SignalType[]) => void;
}

const SignalFilters: React.FC<SignalFiltersProps> = ({ activeFilters, onFiltersChange }) => {
  const allSignalTypes: SignalType[] = ['wastewater', 'pharmacy', 'wearable', 'acoustic', 'social', 'syndromic'];

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
    onFiltersChange(allSignalTypes);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">Filter by Signal Type</h3>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <button
            onClick={selectAllFilters}
            className="text-accent hover:text-primary font-medium transition-colors duration-200"
          >
            Select All
          </button>
          <span className="text-textSecondary">|</span>
          <button
            onClick={clearAllFilters}
            className="text-textSecondary hover:text-textPrimary font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {allSignalTypes.map((signalType) => {
          const isActive = activeFilters.includes(signalType);
          return (
            <button
              key={signalType}
              onClick={() => toggleFilter(signalType)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                isActive 
                  ? 'border-accent bg-accent bg-opacity-10 shadow-md' 
                  : 'border-gray-200 hover:border-accent hover:bg-gray-50'
              }`}
            >
              <SignalBadge type={signalType} size="sm" />
            </button>
          );
        })}
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-textSecondary">
              Showing data for <span className="font-semibold text-textPrimary">{activeFilters.length}</span> of {allSignalTypes.length} signal types
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-accent font-medium">Live Filtering</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalFilters;