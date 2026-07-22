/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crt-bg': '#0a0a0f',
        'crt-green': '#00ff41',
        'crt-amber': '#ffaa00',
        'crt-danger': '#ff3333',
        'crt-gray': '#333344',
        'crt-border': '#008822',
      },
      fontFamily: {
        'mono': ['"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'glitch-shake': 'glitch-shake-anim 0.3s infinite',
        'glitch-rgb': 'glitch-rgb-anim 0.1s infinite',
        'screen-shake': 'screen-shake-anim 0.2s ease-in-out',
        'screen-flash': 'screen-flash-anim 0.3s ease-out',
      },
      keyframes: {
        'glitch-shake-anim': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(2px, -1px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
        },
        'glitch-rgb-anim': {
          '0%, 100%': { filter: 'drop-shadow(-2px 0 #ff0000) drop-shadow(2px 0 #00ffff)' },
          '25%': { filter: 'drop-shadow(2px 0 #ff0000) drop-shadow(-2px 0 #00ffff)' },
          '50%': { filter: 'drop-shadow(-1px 0 #ff0000) drop-shadow(1px 0 #00ffff)' },
          '75%': { filter: 'drop-shadow(1px 0 #ff0000) drop-shadow(-1px 0 #00ffff)' },
        },
        'screen-shake-anim': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-4px, -4px)' },
          '40%': { transform: 'translate(4px, 4px)' },
          '60%': { transform: 'translate(-4px, 4px)' },
          '80%': { transform: 'translate(4px, -4px)' },
        },
        'screen-flash-anim': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
