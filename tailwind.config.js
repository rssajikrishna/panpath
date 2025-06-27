/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Clinical color palette
        primary: '#003366',
        accent: '#00BFA6',
        alert: '#FF4D4F',
        warning: '#FF8C00',
        success: '#52C41A',
        background: '#F4F6F9',
        'background-dark': '#0F1419',
        'card-dark': '#1A1F2E',
        textPrimary: '#1E1E1E',
        'textPrimary-dark': '#FFFFFF',
        textSecondary: '#6E6E6E',
        'textSecondary-dark': '#A0A0A0',
        border: '#E5E7EB',
        'border-dark': '#2D3748',
        
        // Risk levels
        riskLow: '#52C41A',
        riskMedium: '#FF8C00',
        riskHigh: '#FF4D4F',
        
        // Medical grade colors
        medical: {
          navy: '#003366',
          teal: '#00BFA6',
          mint: '#E6FFFA',
          gray: '#F4F6F9',
          'dark-navy': '#001A33',
          'dark-teal': '#008B7A',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'clinical-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'clinical-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'clinical-base': ['1rem', { lineHeight: '1.5rem' }],
        'clinical-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'clinical-xl': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      boxShadow: {
        'clinical': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'clinical-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'clinical-xl': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};