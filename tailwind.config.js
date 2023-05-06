module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme:{
    extend:{
      scale: {
        '-100': '-1',
     },
     fontFamily: {
      arabic: 'arabic',
    },
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./utils/tailwind-preset')],
};
