import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const getConfig = () => {
    switch (level) {
      case 'low':
        return {
          colors: 'bg-riskLow text-green-800 border-green-300',
          icon: CheckCircle,
          text: 'Low Risk',
        };
      case 'medium':
        return {
          colors: 'bg-riskMedium text-yellow-800 border-yellow-300',
          icon: AlertCircle,
          text: 'Medium Risk',
        };
      case 'high':
        return {
          colors: 'bg-riskHigh text-red-800 border-red-300',
          icon: AlertTriangle,
          text: 'High Risk',
        };
      default:
        return {
          colors: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: AlertCircle,
          text: 'Unknown',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${config.colors} ${getSizeClasses()} animate-fade-in`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1.5" />}
      {config.text}
    </span>
  );
};

export default RiskBadge;