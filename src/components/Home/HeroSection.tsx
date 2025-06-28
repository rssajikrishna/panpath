import React, { useState } from 'react';
import { Shield, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupModal from '../Auth/SignupModal';

const HeroSection: React.FC = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Data Points */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60 animate-bounce-subtle"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full opacity-30 animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-primary rounded-full opacity-40 animate-bounce-subtle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-white rounded-full opacity-20 animate-bounce-subtle" style={{ animationDelay: '3s' }}></div>

        {/* Data Flow Animation */}
        <div className="absolute top-1/4 left-0 w-2 h-2 bg-primary rounded-full opacity-50 animate-data-flow"></div>
        <div className="absolute top-1/2 left-0 w-1 h-1 bg-white rounded-full opacity-30 animate-data-flow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-3/4 left-0 w-3 h-3 bg-primary rounded-full opacity-40 animate-data-flow" style={{ animationDelay: '10s' }}></div>
        
        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex items-center min-h-screen">
          <div className="text-center w-full">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Shield className="h-20 w-20 text-white" />
                <div className="absolute inset-0 bg-primary opacity-30 rounded-full animate-pulse-ring"></div>
                <div className="absolute inset-2 bg-white opacity-20 rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            <h1 className="text-h1 font-bold text-white mb-6 leading-tight">
              Stop the Next Pandemic
              <br />
              <span className="text-primary">Before It Starts.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed">
              An AI-powered, multi-signal platform that detects outbreaks days before clinical systems 
              through advanced data fusion and predictive analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-dark bg-white hover:bg-gray-100 rounded-lg shadow-card hover:shadow-card-hover transform hover:scale-105 transition-all duration-200"
              >
                See Live Demo
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={() => setShowSignupModal(true)}
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary-dark rounded-lg transition-all duration-200"
              >
                Join the Beta
                <Eye className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Stats Preview */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Cities Protected', value: '2,847' },
                { label: 'Live Signals', value: '156K+' },
                { label: 'Countries', value: '89' },
                { label: 'Early Warnings', value: '1,245' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={() => {}}
      />
    </>
  );
};

export default HeroSection;