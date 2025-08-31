/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vaporwave color palette
        neon: {
          pink: '#ff71ce',
          cyan: '#01cdfe',
          purple: '#b967ff',
          teal: '#05ffa1',
        },
        vapor: {
          black: '#0d0d0d',
          'dark-gray': '#1a1a1a',
          'light-gray': '#333333',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'vt323': ['VT323', 'monospace'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-float': 'grid-float 20s ease-in-out infinite',
        'chromatic-aberration-1': 'chromatic-aberration-1 2s ease-in-out infinite',
        'chromatic-aberration-2': 'chromatic-aberration-2 2s ease-in-out infinite',
        'glitch-text': 'glitch-text 3s infinite',
        'holographic-shift': 'holographic-shift 3s ease-in-out infinite',
        'neon-border-rotate': 'neon-border-rotate 3s linear infinite',
        'floating-particles': 'floating-particles 20s linear infinite',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%': {
            textShadow: '0 0 5px #ff71ce, 0 0 10px #ff71ce, 0 0 15px #ff71ce, 0 0 20px #ff71ce',
          },
          '100%': {
            textShadow: '0 0 2px #ff71ce, 0 0 5px #ff71ce, 0 0 8px #ff71ce, 0 0 12px #ff71ce',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glow': {
          '0%': {
            boxShadow: '0 0 5px #01cdfe, 0 0 10px #01cdfe, 0 0 15px #01cdfe',
          },
          '100%': {
            boxShadow: '0 0 10px #01cdfe, 0 0 20px #01cdfe, 0 0 30px #01cdfe',
          },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(1, 205, 254, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(1, 205, 254, 0.1) 1px, transparent 1px)
        `,
        'neon-gradient': 'linear-gradient(45deg, #ff71ce, #01cdfe, #b967ff)',
        'vapor-gradient': 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
