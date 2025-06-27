import React from 'react';
import { Droplets, Pill, Heart, Mic, MessageSquare, Activity } from 'lucide-react';
import { SignalType } from '../../types';

interface SignalBadgeProps {
  type: SignalType;
  value?: number;
  showValue?: boolean;
  size?: 'sm' | 'md';
}

const SignalBadge: React.FC<SignalBadgeProps> = ({ 
  type, 
  value, 
  showValue = false, 
  size = 'md' 
}) => {
  const getSignalConfig = (signalType: SignalType) => {
    switch (signalType) {
      case 'wastewater':
        return {
          icon: Droplets,
          label: 'Wastewater',
          color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
        };
      case 'pharmacy':
        return {
          icon: Pill,
          label: 'Pharmacy',
          color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
        };
      case 'wearable':
        return {
          icon: Heart,
          label: 'Wearable',
          color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
        };
      case 'acoustic':
        return {
          icon: Mic,
          label: 'Acoustic',
          color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
        };
      case 'social':
        return {
          icon: MessageSquare,
          label: 'Social',
          color: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
        };
      case 'syndromic':
        return {
          icon: Activity,
          label: 'Syndromic',
          color: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
        };
      default:
        return {
          icon: Activity,
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-2.5 py-1 text-sm';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const config = getSignalConfig(type);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors duration-200 ${config.color} ${getSizeClasses()}`}
    >
      <Icon className="w-3 h-3 mr-1.5" />
      {config.label}
      {showValue && value !== undefined && (
        <span className="ml-1.5 font-semibold">
          ({value}%)
        </span>
      )}
    </span>
  );
};

export default SignalBadge;