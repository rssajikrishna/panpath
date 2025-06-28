import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Heart, Star, ArrowRight } from 'lucide-react';
import { updateUserProfile } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const SurveyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    city: '',
    helpType: [] as string[],
    features: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const helpOptions = [
    'Data Collection',
    'Community Advocacy',
    'Beta Testing',
    'Research Collaboration',
    'Technical Development',
    'Spread Awareness',
  ];

  const featureOptions = [
    'Real-time Alerts',
    'Interactive Maps',
    'Data Analytics',
    'Mobile App',
    'API Access',
    'Custom Reports',
  ];

  const handleHelpTypeToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      helpType: prev.helpType.includes(option)
        ? prev.helpType.filter(item => item !== option)
        : [...prev.helpType, option]
    }));
  };

  const handleFeatureToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(option)
        ? prev.features.filter(item => item !== option)
        : [...prev.features, option]
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await updateUserProfile(user.id, {
        preferences: formData,
        onboarding_completed: true,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card-white rounded-lg shadow-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-h3 font-bold text-text-primary mb-2">Welcome to PanPath Guardian!</h2>
            <p className="text-text-secondary">Help us personalize your experience with a few quick questions</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Step {currentStep} of 3</span>
              <span className="text-sm font-medium text-text-secondary">{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-h3 font-bold text-text-primary mb-2">Where are you located?</h3>
                <p className="text-text-secondary">This helps us provide relevant local insights and alerts</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  City/Region
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>
          )}

          {/* Step 2: How to Help */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-h3 font-bold text-text-primary mb-2">How would you like to help?</h3>
                <p className="text-text-secondary">Select all that interest you - we're stronger together!</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {helpOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleHelpTypeToggle(option)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.helpType.includes(option)
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-border hover:border-primary hover:bg-background'
                    }`}
                  >
                    <div className="font-medium">{option}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Features */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Star className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-h3 font-bold text-text-primary mb-2">What features matter most?</h3>
                <p className="text-text-secondary">Help us prioritize what you'd like to see first</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {featureOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFeatureToggle(option)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.features.includes(option)
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-border hover:border-primary hover:bg-background'
                    }`}
                  >
                    <div className="font-medium">{option}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-button uppercase"
            >
              <span>{currentStep === 3 ? (loading ? 'Saving...' : 'Complete') : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;