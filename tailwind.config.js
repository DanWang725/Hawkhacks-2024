/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx}"],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#FFAD72',
      'secondary': '#72C4FF',
     }),
    extend: {},
  },
  plugins: [],
}

