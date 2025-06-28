import React, { useState } from 'react';
import { X, Shield, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signUp } from '../../lib/supabase';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signUp(
        formData.email,
        userType === 'admin' ? formData.password : undefined,
        {
          name: formData.name,
          role: userType,
        }
      );

      if (error) {
        setError(error.message);
      } else {
        onSuccess();
        onClose();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card-white rounded-lg shadow-modal max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-h3 font-bold text-text-primary">Join PanPath Guardian</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-text-secondary" />
                </button>
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
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

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
                        placeholder="Create a password"
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
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>

              {/* Info */}
              <div className="mt-6 p-4 bg-background rounded-lg">
                <p className="text-sm text-text-secondary">
                  {userType === 'user' 
                    ? 'You\'ll receive an email with a verification link to complete your signup.'
                    : 'Admin accounts require password authentication and manual verification.'
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;