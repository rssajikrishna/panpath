import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Bell, Moon, Sun, AlertTriangle } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';
import NotificationPanel from '../Dashboard/NotificationPanel';

interface ClinicalHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const ClinicalHeader: React.FC<ClinicalHeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const location = useLocation();
  
  const activeAlerts = mockAlerts.filter(alert => alert.active);
  const criticalAlerts = activeAlerts.filter(alert => alert.level === 'critical');

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Critical Alert Banner */}
      {criticalAlerts.length > 0 && (
        <div className="bg-alert text-white px-4 py-3 text-clinical-sm font-bold animate-pulse">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span className="font-bold uppercase tracking-wide">CRITICAL ALERT:</span>
              <span>{criticalAlerts[0].message}</span>
            </div>
            <Link 
              to="/alerts" 
              className="underline hover:no-underline whitespace-nowrap font-bold uppercase tracking-wide"
            >
              View All ({activeAlerts.length})
            </Link>
          </div>
        </div>
      )}

      <header className="bg-white dark:bg-card-dark shadow-clinical border-b border-border dark:border-border-dark sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary dark:text-accent group-hover:text-accent transition-colors duration-200" />
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 rounded-full animate-pulse-ring transition-opacity duration-200"></div>
              </div>
              <div className="font-inter">
                <span className="text-xl font-extrabold text-primary dark:text-textPrimary-dark">PanPath</span>
                <span className="text-xl font-extrabold text-accent"> Guardian</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-clinical-sm font-semibold transition-all duration-200 relative uppercase tracking-wide ${
                    isActive(item.path)
                      ? 'text-primary dark:text-accent'
                      : 'text-textSecondary dark:text-textSecondary-dark hover:text-primary dark:hover:text-accent'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 text-textSecondary dark:text-textSecondary-dark hover:text-primary dark:hover:text-accent transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setNotificationPanelOpen(true)}
                className="relative p-2 text-textSecondary dark:text-textSecondary-dark hover:text-primary dark:hover:text-accent transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5" />
                {activeAlerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-alert text-white text-clinical-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-subtle">
                    {activeAlerts.length}
                  </div>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-lg text-textSecondary dark:text-textSecondary-dark hover:text-primary dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border dark:border-border-dark py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-3 text-clinical-base font-semibold transition-colors duration-200 rounded-lg uppercase tracking-wide ${
                      isActive(item.path)
                        ? 'text-primary dark:text-accent bg-accent bg-opacity-10'
                        : 'text-textSecondary dark:text-textSecondary-dark hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />
    </>
  );
};

export default ClinicalHeader;