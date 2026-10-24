/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#03050b',
          900: '#050811',
          850: '#070b14',
          800: '#0d1424',
          700: '#121b2d',
        },
        brand: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          emerald: '#10b981',
          neon: '#00ffcc',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)', boxShadow: '0 0 10px #10b981' },
          '50%': { opacity: 0.6, transform: 'scale(1.2)', boxShadow: '0 0 20px #10b981' },
        }
      }
    },
  },
  plugins: [],
}
