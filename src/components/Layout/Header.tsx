import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, AlertTriangle, Bell } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="bg-red-600 text-white px-4 py-3 text-sm font-medium animate-pulse">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span className="font-semibold">CRITICAL ALERT:</span>
              <span>{criticalAlerts[0].message}</span>
            </div>
            <Link 
              to="/alerts" 
              className="underline hover:no-underline whitespace-nowrap font-semibold"
            >
              View All ({activeAlerts.length})
            </Link>
          </div>
        </div>
      )}

      {/* Warning Alert Banner */}
      {criticalAlerts.length === 0 && activeAlerts.length > 0 && (
        <div className="bg-alert text-primary px-4 py-2 text-sm font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{activeAlerts[0].message}</span>
            </div>
            <Link to="/alerts" className="underline hover:no-underline">
              View All
            </Link>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-200" />
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 rounded-full animate-pulse-slow transition-opacity duration-200"></div>
              </div>
              <div className="font-inter">
                <span className="text-xl font-extrabold text-primary">PanPath</span>
                <span className="text-xl font-extrabold text-accent"> Guardian</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-200 relative ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-textSecondary hover:text-primary'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-slide-in-right"></div>
                  )}
                </Link>
              ))}
              
              {/* Notification Bell */}
              <Link
                to="/alerts"
                className="relative p-2 text-textSecondary hover:text-primary transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
                {activeAlerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-bounce-subtle">
                    {activeAlerts.length}
                  </div>
                )}
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {activeAlerts.length > 0 && (
                <Link
                  to="/alerts"
                  className="relative p-2 text-textSecondary hover:text-primary transition-colors duration-200"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-bounce-subtle">
                    {activeAlerts.length}
                  </div>
                </Link>
              )}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-textSecondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-3 text-base font-semibold transition-colors duration-200 rounded-md ${
                      isActive(item.path)
                        ? 'text-primary bg-accent bg-opacity-10'
                        : 'text-textSecondary hover:text-primary hover:bg-gray-50'
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
    </>
  );
};

export default Header;