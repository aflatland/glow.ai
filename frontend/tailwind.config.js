/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    function ({ addUtilities }) {
      const newUtilities = {
        '.fade-out-effect::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '20px',
          background: 'linear-gradient(to bottom, white, transparent)',
          pointerEvents: 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

