/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'busking-img': "url('/background.png')",
      }
  },
},
  plugins: [],
}
