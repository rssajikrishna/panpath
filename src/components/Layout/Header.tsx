import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockAlerts } from '../../data/mockData';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const activeAlerts = mockAlerts.filter(alert => alert.active);
  const criticalAlerts = activeAlerts.filter(alert => alert.level === 'critical');

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Alerts', path: '/alerts' },
    ...(user?.user_metadata?.role === 'admin' ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <>
      {/* Critical Alert Banner */}
      {criticalAlerts.length > 0 && (
        <div className="bg-error text-white px-4 py-3 text-sm font-semibold animate-pulse">
          <div className="max-w-container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 flex-shrink-0" />
              <span className="font-bold uppercase tracking-wider">CRITICAL ALERT:</span>
              <span>{criticalAlerts[0].message}</span>
            </div>
            <Link 
              to="/alerts" 
              className="underline hover:no-underline whitespace-nowrap font-bold uppercase tracking-wider"
            >
              View All ({activeAlerts.length})
            </Link>
          </div>
        </div>
      )}

      <header className="bg-card-white shadow-card border-b border-border sticky top-0 z-40">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary group-hover:text-primary-dark transition-colors duration-200" />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 rounded-full animate-pulse-ring transition-opacity duration-200"></div>
              </div>
              <div className="font-inter">
                <span className="text-xl font-bold text-text-primary">PanPath</span>
                <span className="text-xl font-bold text-primary"> Guardian</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-button font-semibold transition-all duration-200 relative uppercase ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* User Controls */}
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <Link
                to="/alerts"
                className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-background"
              >
                <Bell className="h-5 w-5" />
                {activeAlerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-subtle">
                    {activeAlerts.length}
                  </div>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-background"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block text-sm font-medium">
                      {user.user_metadata?.name || user.email}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card-white rounded-lg shadow-modal border border-border py-1">
                      <div className="px-4 py-2 text-sm text-text-secondary border-b border-border">
                        {user.email}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-background transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-button font-semibold text-text-secondary hover:text-primary transition-colors duration-200 uppercase"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-button font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors duration-200 uppercase"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-background transition-colors duration-200"
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
            <div className="md:hidden border-t border-border py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-3 text-base font-semibold transition-colors duration-200 rounded-lg uppercase ${
                      isActive(item.path)
                        ? 'text-primary bg-primary bg-opacity-10'
                        : 'text-text-secondary hover:text-primary hover:bg-background'
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