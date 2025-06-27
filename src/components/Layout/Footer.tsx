import React from 'react';
import { Shield, ExternalLink, Globe, Activity, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accent" />
              <div className="font-inter">
                <span className="text-xl font-extrabold">PanPath</span>
                <span className="text-xl font-extrabold text-accent"> Guardian</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              Advanced pathogen detection platform providing early warning systems 
              for global health security through multi-signal intelligence.
            </p>
            
            {/* System Status */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">All Systems Operational</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Activity className="h-5 w-5 text-accent" />
              <span>Platform</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/dashboard" className="hover:text-accent transition-colors">Live Dashboard</a></li>
              <li><a href="/alerts" className="hover:text-accent transition-colors">Alert System</a></li>
              <li><a href="/admin" className="hover:text-accent transition-colors">Data Upload</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Global Coverage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Globe className="h-5 w-5 text-accent" />
              <span>Coverage</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>89 Countries Protected</li>
              <li>2,847 Active Monitors</li>
              <li>156K+ Live Signals</li>
              <li>24/7 Global Surveillance</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span>Support</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Emergency Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Data Partnership</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Research Collaboration</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 PanPath Guardian. Built for global health security.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>Emergency Protocols</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-400 hover:text-accent transition-colors text-sm"
              >
                <span>Built with Bolt.new</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;