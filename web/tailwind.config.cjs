/** @type {import('tailwindcss').Config} */

//const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'busking-img': "url('/background.png')",
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      // colors: {
      //   gray: colors.gray,
      //   blue: colors.sky,
      //   red: colors.rose,
      //   pink: colors.fuchsia,
      // },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
      },
  },
},
  plugins: [],
}
