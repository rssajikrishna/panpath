import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Zap, Eye, TrendingUp, Users } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Real-time monitoring across 6 continents with 24/7 data collection from multiple signal sources.',
    },
    {
      icon: Zap,
      title: 'Early Detection',
      description: 'Advanced AI algorithms detect outbreak patterns weeks before traditional surveillance methods.',
    },
    {
      icon: Eye,
      title: 'Multi-Signal Intelligence',
      description: 'Integrates wastewater, pharmacy, wearable, acoustic, social, and syndromic surveillance data.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Machine learning models provide confidence scores and outbreak probability assessments.',
    },
  ];

  const stats = [
    { label: 'Cities Monitored', value: '2,847' },
    { label: 'Active Signals', value: '156,432' },
    { label: 'Countries Protected', value: '89' },
    { label: 'Early Warnings Issued', value: '1,245' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Shield className="h-20 w-20 text-white" />
                <div className="absolute inset-0 bg-accent opacity-30 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-2 bg-white opacity-20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-inter leading-tight">
              Early Detection.
              <br />
              <span className="text-accent">Global Protection.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              PanPath Guardian predicts disease outbreaks before they become pandemics through 
              advanced multi-signal intelligence and AI-powered early warning systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary bg-white hover:bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Launch Dashboard
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary rounded-lg transition-all duration-200"
              >
                Learn More
                <Eye className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-white rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-textSecondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4">
              Advanced Outbreak Intelligence
            </h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with global health expertise 
              to provide the world's most comprehensive early warning system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent bg-opacity-10 rounded-lg mb-6">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-textPrimary mb-4">
                  {feature.title}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Protect Global Health?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Join health authorities, researchers, and organizations worldwide in the fight 
            against pandemic threats. Every second counts in outbreak detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary bg-accent hover:bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Access Dashboard
              <Shield className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/alerts"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary rounded-lg transition-all duration-200"
            >
              View Active Alerts
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;