import React, { useState } from 'react';
import { Database, Search, Layers, TrendingUp, Bell } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Database,
      title: 'Collect Signals',
      description: 'Multi-source data ingestion from wastewater, pharmacy sales, wearables, acoustic sensors, social media, and clinical reports.',
      details: 'Our edge computing network processes over 156,000 live signals from 89 countries in real-time.',
    },
    {
      icon: Search,
      title: 'Edge Detection',
      description: 'AI-powered anomaly detection algorithms identify unusual patterns in each signal type independently.',
      details: 'Federated learning models adapt to local patterns while maintaining global threat awareness.',
    },
    {
      icon: Layers,
      title: 'Cluster & Characterize',
      description: 'Graph neural networks fuse signals to identify potential pathogen events and characterize their properties.',
      details: 'Advanced clustering algorithms determine event severity, confidence scores, and affected populations.',
    },
    {
      icon: TrendingUp,
      title: 'Spread Simulation',
      description: 'Spatio-temporal diffusion models forecast outbreak spread patterns and risk evolution.',
      details: 'Monte Carlo simulations provide optimistic, realistic, and pessimistic scenarios for planning.',
    },
    {
      icon: Bell,
      title: 'Actionable Alerts',
      description: 'Precise alerts with prescriptive guidance delivered to health authorities and response teams.',
      details: 'Automated dispatch to emergency response systems with recommended actions and resource allocation.',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Five Steps to Global Protection
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From signal collection to actionable alerts, our platform provides end-to-end 
            pandemic prevention through advanced AI and global collaboration.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Step Cards */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'border-primary bg-primary bg-opacity-5 shadow-card'
                    : 'border-border hover:border-primary hover:bg-card-white'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    activeStep === index ? 'bg-primary text-white' : 'bg-background text-primary'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="bg-card-white rounded-lg p-8 shadow-card">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-primary bg-opacity-10 rounded-lg">
                {React.createElement(steps[activeStep].icon, { className: "h-8 w-8 text-primary" })}
              </div>
              <h3 className="text-h3 font-bold text-text-primary">
                {steps[activeStep].title}
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6 leading-relaxed">
              {steps[activeStep].description}
            </p>
            
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-text-secondary">
                <strong>Technical Detail:</strong> {steps[activeStep].details}
              </p>
            </div>

            {/* Mini Visualization */}
            <div className="mt-6 h-32 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-1">Step {activeStep + 1}</div>
                <div className="text-sm opacity-75">Interactive Demo Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;