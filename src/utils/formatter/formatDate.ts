/**
 * It takes a date as a string or a Date object and returns a formatted date string in en-US locale
 * @param {string | Date} date - string | Date
 * @example formatDate('9/19/2022') // -> Oct 9, 2022
 */
const formatDate = (date: string | Date, timeStyle?: Intl.DateTimeFormatOptions['timeStyle']) =>
  new Intl.DateTimeFormat(
    'en-US',
    timeStyle ? { dateStyle: 'long', timeStyle } : { dateStyle: 'long' }
  ).format(typeof date === 'string' ? new Date(date) : date)

export default formatDate
