/**
 * It takes a number and returns a string formatted as a currency.
 * @param {number} cur - number - The number to currency
 */
const formatCurrency = (cur: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    compactDisplay: 'long',
    maximumFractionDigits: 0
  }).format(cur)

export default formatCurrency
