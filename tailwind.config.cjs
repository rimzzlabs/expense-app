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
      ternary: {
        1: colors.emerald[100],
        2: colors.emerald[200],
        3: colors.emerald[300],
        4: colors.emerald[400],
        5: colors.emerald[500],
        6: colors.emerald[600],
        7: colors.emerald[700]
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
      },
      warning: {
        1: colors.yellow[500],
        2: colors.yellow[600],
        3: colors.yellow[700]
      },
      error: {
        1: colors.red[500],
        2: colors.red[600],
        3: colors.red[700]
      },
      success: {
        1: colors.emerald[500],
        2: colors.emerald[600],
        3: colors.emerald[700]
      },
      transparent: colors.transparent
    },
    fontFamily: {
      primary: ["'Inter'", ...fontFamily.sans]
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
