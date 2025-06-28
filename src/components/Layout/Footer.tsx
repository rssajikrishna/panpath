import React from 'react';
import { Shield, ExternalLink, Globe, Activity, Users, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div className="font-inter">
                <span className="text-xl font-bold">PanPath</span>
                <span className="text-xl font-bold text-primary"> Guardian</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              AI-powered, multi-signal platform that detects outbreaks days before clinical systems. 
              Built by students, for humanity.
            </p>
            
            {/* System Status */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-gray-300">All Systems Operational</span>
            </div>

            {/* Built with Bolt.new Badge */}
            <div className="pt-4">
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <span>Built with Bolt.new</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Platform</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/dashboard" className="hover:text-primary transition-colors">Live Dashboard</a></li>
              <li><a href="/alerts" className="hover:text-primary transition-colors">Alert System</a></li>
              <li><a href="/admin" className="hover:text-primary transition-colors">Data Upload</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Global Coverage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
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
              <Users className="h-5 w-5 text-primary" />
              <span>Support</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary transition-colors">Emergency Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Join the Beta</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Student Team</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm flex items-center space-x-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>© 2025 PanPath Guardian. Built with love by students worldwide.</span>
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
              <span className="text-xs text-gray-500">Powered by AI • Protected by Love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;