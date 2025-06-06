import moment from 'moment'

/**
 * Formats a date using a given moment format string.
 * @param {moment.Moment | string | Date} date - The date to format.
 * @param {string} format - The format string, e.g., 'YYYY-MM-DD', 'MMM Do, YYYY'.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}

/**
 * Returns a formatted string for a week range (e.g., "28 April - 4 May").
 * @param {moment.Moment | Date | string} date
 * @returns {string}
 */
export const getWeekRange = date => {
  const start = moment(date).startOf('isoWeek') // Monday
  const end = moment(date).endOf('isoWeek') // Sunday
  return `${start.format('D MMMM')} - ${end.format('D MMM')}`
}

/**
 * Returns a formatted string for a month (e.g., "May 2025").
 * @param {moment.Moment | Date | string} date
 * @returns {string}
 */
export const getMonthRange = date => {
  return moment(date).format('MMMM YYYY')
}

/**
 * Returns the previous date based on view mode.
 * @param {'week' | 'month'} mode
 * @param {moment.Moment} currentDate
 * @returns {moment.Moment}
 */
export const getPreviousDate = (mode, currentDate) => {
  return moment(currentDate).subtract(1, mode === 'week' ? 'weeks' : 'months')
}

/**
 * Returns the next date based on view mode.
 * @param {'week' | 'month'} mode
 * @param {moment.Moment} currentDate
 * @returns {moment.Moment}
 */
export const getNextDate = (mode, currentDate) => {
  return moment(currentDate).add(1, mode === 'week' ? 'weeks' : 'months')
}

/**
 * Returns start and end of the week for filtering or backend requests.
 * @param {moment.Moment | string | Date} date
 * @returns {{ startDate: string, endDate: string }}
 */
export const getWeekStartEnd = date => {
  const start = moment(date).startOf('isoWeek')
  const end = moment(date).endOf('isoWeek')
  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD')
  }
}

/**
 * Returns start and end of the month.
 * @param {moment.Moment | string | Date} date
 * @returns {{ startDate: string, endDate: string }}
 */
export const getMonthStartEnd = date => {
  const start = moment(date).startOf('month')
  const end = moment(date).endOf('month')
  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD')
  }
}
