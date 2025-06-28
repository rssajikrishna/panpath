import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react';
import { signIn } from '../../lib/supabase';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(
        formData.email,
        userType === 'admin' ? formData.password : undefined
      );

      if (error) {
        setError(error.message);
      } else {
        if (userType === 'user') {
          setOtpSent(true);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (otpSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-card-white rounded-lg shadow-card p-8 text-center">
            <div className="mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-h3 font-bold text-text-primary mb-2">Check Your Email</h2>
              <p className="text-text-secondary">
                We've sent a login link to <strong>{formData.email}</strong>
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                Click the link in your email to complete the login process.
              </p>
              
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card-white rounded-lg shadow-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-h3 font-bold text-text-primary mb-2">Welcome Back</h2>
            <p className="text-text-secondary">Sign in to your PanPath Guardian account</p>
          </div>

          {/* User Type Toggle */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-background rounded-lg">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`py-2 px-4 rounded-lg text-button font-semibold transition-all duration-200 uppercase ${
                  userType === 'user'
                    ? 'bg-primary text-white shadow-card'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`py-2 px-4 rounded-lg text-button font-semibold transition-all duration-200 uppercase ${
                  userType === 'admin'
                    ? 'bg-primary text-white shadow-card'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password (Admin only) */}
            {userType === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-error bg-opacity-10 border border-error border-opacity-20 rounded-lg">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-button uppercase"
            >
              {loading ? 'Signing In...' : userType === 'user' ? 'Send Login Link' : 'Sign In'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">
                Sign up
              </Link>
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;