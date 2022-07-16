const path = require('path')

const buildEslintCommand = (filenames) =>
  `yarn lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const formatFile = (filenames) =>
  `yarn format --write --ignore-unkown ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, formatFile],
  './src/**/*.{md,css,json}': [formatFile]
}
