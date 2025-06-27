import React, { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertData } from '../../types';
import { mockAlerts } from '../../data/mockData';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<AlertData[]>([]);

  useEffect(() => {
    // Filter for active alerts and sort by priority
    const activeAlerts = mockAlerts
      .filter(alert => alert.active)
      .sort((a, b) => a.priority - b.priority);
    
    setNotifications(activeAlerts);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const getAlertConfig = (level: AlertData['level']) => {
    switch (level) {
      case 'critical':
        return {
          color: 'bg-alert text-white',
          icon: AlertTriangle,
          label: 'CRITICAL',
          pulse: 'animate-pulse'
        };
      case 'warning':
        return {
          color: 'bg-warning text-white',
          icon: Clock,
          label: 'WARNING',
          pulse: ''
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          icon: Clock,
          label: 'INFO',
          pulse: ''
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-card-dark shadow-clinical-xl z-50 border-l border-border dark:border-border-dark"
          >
            {/* Header */}
            <div className="p-6 border-b border-border dark:border-border-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent bg-opacity-10 rounded-lg">
                    <Bell className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-clinical-lg font-semibold text-textPrimary dark:text-textPrimary-dark">
                      Live Alerts
                    </h2>
                    <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark uppercase tracking-wide">
                      Real-time notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-textSecondary dark:text-textSecondary-dark" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 text-textSecondary dark:text-textSecondary-dark mx-auto mb-4 opacity-50" />
                  <h3 className="text-clinical-base font-semibold text-textPrimary dark:text-textPrimary-dark mb-2">
                    No Active Alerts
                  </h3>
                  <p className="text-clinical-sm text-textSecondary dark:text-textSecondary-dark">
                    All systems operating normally
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {notifications.map((notification, index) => {
                    const config = getAlertConfig(notification.level);
                    const Icon = config.icon;
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-border dark:border-border-dark hover:shadow-clinical transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${config.color} ${config.pulse} flex-shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-clinical-sm font-semibold text-textPrimary dark:text-textPrimary-dark line-clamp-2">
                                {notification.title}
                              </h4>
                              <ChevronRight className="w-4 h-4 text-textSecondary dark:text-textSecondary-dark group-hover:text-accent transition-colors duration-200 flex-shrink-0 ml-2" />
                            </div>
                            
                            <p className="text-clinical-xs text-textSecondary dark:text-textSecondary-dark mb-3 line-clamp-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between text-clinical-xs">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span className="font-medium">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                                {notification.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="font-medium truncate">
                                      {notification.location}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <span className={`px-2 py-1 rounded-full font-bold uppercase tracking-wide ${config.color} text-clinical-xs`}>
                                {config.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border dark:border-border-dark">
              <button className="w-full py-2 text-clinical-xs font-semibold text-accent hover:text-primary transition-colors duration-200 uppercase tracking-wide">
                View All Alerts
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;