const path = require('path')

const buildEslintCommand = (filenames) =>
  `yarn lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx}': ['yarn format'],
  '*.{css,scss,md,html,json}': ['yarn format']
}
