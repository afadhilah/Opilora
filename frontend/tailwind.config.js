/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e5ff',
          200: '#bcd2ff',
          300: '#8eb8ff',
          400: '#5990ff',
          500: '#3b6bfa',
          600: '#1e45ef',
          700: '#1633dc',
          800: '#192cb2',
          900: '#1a2a8c',
          950: '#151c55',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        positive: {
          light: '#ecfdf5',
          DEFAULT: '#10b981',
          dark: '#065f46',
        },
        negative: {
          light: '#fef2f2',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
        warning: {
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#92400e',
        },
        info: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 2px 8px 0 rgb(0 0 0 / 0.03)',
        'elevated': '0 4px 16px 0 rgb(0 0 0 / 0.06), 0 1px 4px 0 rgb(0 0 0 / 0.04)',
      },
      keyframes: {
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
