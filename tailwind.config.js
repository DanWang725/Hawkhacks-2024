/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#FFAD72',
      secondary: '#72C4FF',
      tertiary: '#1E2A69',
    }),
    extend: {
      textColor: {
        primary: '#1E2A69',
        secondary: '#FFAD72',
      },
    },
  },
  plugins: [],
};
