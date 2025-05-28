/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ea',
          100: '#c0e6cc',
          200: '#9ad6ad',
          300: '#74c68e',
          400: '#57ba76',
          500: '#3aae5f', // Main primary color
          600: '#34a257',
          700: '#2c934d',
          800: '#258443',
          900: '#186732',
        },
        secondary: {
          50: '#e5f4fa',
          100: '#bee3f2',
          200: '#93d1e9',
          300: '#67bfe0',
          400: '#47b1d9',
          500: '#27a3d2', // Main secondary color
          600: '#2396c3',
          700: '#1d85af',
          800: '#17749c',
          900: '#0d577a',
        },
        accent: {
          50: '#fef5e7',
          100: '#fde5c4',
          200: '#fbd59d',
          300: '#f9c575',
          400: '#f7b857',
          500: '#f6ac39', // Main accent color
          600: '#f59f33',
          700: '#f38f2c',
          800: '#f28024',
          900: '#ef6317',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};