/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#FFAD72',
      secondary: '#A7BEF2',
      tertiary: '#1E2A69',
    }),
    extend: {},
  },
  plugins: [],
};
