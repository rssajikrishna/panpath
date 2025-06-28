import React from 'react';
import { Heart, Users, Globe, Shield } from 'lucide-react';

const WhyWeDo: React.FC = () => {
  return (
    <section className="py-24 bg-card-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary to-primary-dark rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Globe className="h-24 w-24 mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">Global Student Network</h3>
                  <p className="text-lg opacity-90">
                    Students from 89 countries working together to protect humanity
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-card-white rounded-lg shadow-card p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold text-text-primary">2,847</div>
                  <div className="text-xs text-text-secondary">Active Contributors</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card-white rounded-lg shadow-card p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold text-text-primary">24/7</div>
                  <div className="text-xs text-text-secondary">Global Protection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Why We Do It
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed mb-8">
                We're a global student-powered team on a mission to protect humanity—detecting 
                threats before they strike. Join us to build the world's first planetary pathogen radar.
              </p>
            </div>

            {/* Mission Points */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Built with Love
                  </h3>
                  <p className="text-text-secondary">
                    Every line of code, every algorithm, every alert is crafted with care for human life and global health.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Student-Powered
                  </h3>
                  <p className="text-text-secondary">
                    Driven by the passion and innovation of students worldwide who believe technology can save lives.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Global Impact
                  </h3>
                  <p className="text-text-secondary">
                    Protecting communities across 89 countries through collaborative intelligence and shared responsibility.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 text-button uppercase">
                Support Our Mission
                <Heart className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeDo;