/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Courier New"', 'monospace'],
      },
      colors: {
        crt: {
          bg: '#0a0a0f',
          green: '#39ff14',
          amber: '#ffb000',
          danger: '#ff003c',
        },
      },
    },
  },
  plugins: [],
}
