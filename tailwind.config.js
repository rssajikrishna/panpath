/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PanPath Guardian Brand Colors
        primary: '#00C7B7',
        'primary-dark': '#005F73',
        accent: '#00C7B7',
        background: '#F8FAFC',
        'card-white': '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        
        // Alert Colors
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
        
        // Risk Levels
        'risk-low': '#10B981',
        'risk-medium': '#F59E0B',
        'risk-high': '#EF4444',
        'risk-critical': '#DC2626',
        
        // Additional UI Colors
        border: '#E2E8F0',
        'border-dark': '#334155',
        overlay: 'rgba(0, 95, 115, 0.3)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'button': ['14px', { lineHeight: '1', fontWeight: '600', letterSpacing: '1px' }],
      },
      spacing: {
        'base': '16px',
        'gutter': '24px',
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        'default': '8px',
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'data-flow': 'dataFlow 20s linear infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};