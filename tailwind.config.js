const plugin = require('tailwindcss/plugin');

const CardRotate = plugin(function ({ addUtilities }) {
  addUtilities({
    '.card-rotate-x-0': {
      transform: `rotateX(0deg)`,
    },
    '.card-rotate-x-180': {
      transform: `rotateX(180deg)`,
    },
    '.card-rotate-x-360': {
      transform: `rotateX(-180deg)`,
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  });
});

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [CardRotate, require('@tailwindcss/line-clamp')],
};
