import React from 'react';
import { Database, Brain, AlertTriangle } from 'lucide-react';

const WhatWeDo: React.FC = () => {
  const features = [
    {
      icon: Database,
      title: 'Data Ingestion',
      description: 'Wastewater, pharmacy, wearables, cough audio, social & syndromic feeds—ingested securely at the edge.',
      details: 'Real-time processing of 6 signal types from global sources with edge computing for minimal latency.',
    },
    {
      icon: Brain,
      title: 'AI Fusion',
      description: 'Federated anomaly detectors & graph neural networks cluster signals into pathogen events.',
      details: 'Advanced machine learning algorithms identify patterns across disparate data sources.',
    },
    {
      icon: AlertTriangle,
      title: 'Predict & Alert',
      description: 'Spatio-temporal diffusion models forecast risk; precise alerts & prescriptive guidance.',
      details: 'Predictive models provide early warnings with actionable recommendations for response teams.',
    },
  ];

  return (
    <section className="py-24 bg-card-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            How PanPath Guardian Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with global health expertise to provide 
            the world's most comprehensive early warning system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-lg p-8 hover:shadow-card-hover transition-all duration-300 text-center animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary bg-opacity-10 rounded-lg mb-6 group-hover:bg-primary group-hover:bg-opacity-20 transition-all duration-300">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              
              <h3 className="text-h3 font-bold text-text-primary mb-4">
                {feature.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <p className="text-sm text-text-secondary opacity-75">
                {feature.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;