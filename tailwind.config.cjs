/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        1: colors.blue[100],
        2: colors.blue[200],
        3: colors.blue[300],
        4: colors.blue[400],
        5: colors.blue[500],
        6: colors.blue[600],
        7: colors.blue[700]
      },
      theme: {
        1: colors.white,
        2: colors.neutral[100],
        3: colors.neutral[300],
        4: colors.neutral[500],
        5: colors.neutral[600],
        6: colors.neutral[700],
        7: colors.neutral[800],
        8: colors.neutral[900]
      }
    },
    fontFamily: {
      primary: ['"Inter"', ...fontFamily.sans]
    }
  },
  plugins: []
}
