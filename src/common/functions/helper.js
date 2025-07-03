import moment from 'moment'
import { interPolate } from '../../services/interpolate/interpolate'
import { Images } from '../../utils/constants/Images'

export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export function eventDataSeparation(data) {
  return data
  //   let event = {
  //       token: data?.token,
  //       isLoggedIn: true,
  //       contactNumber: data?.contactNumber,
  //       email: data?.email,
  //       user_id: data?.id,
  //       runnerId: data?.runnerId,
  //       isAuthorized: data?.isAuthorized
  //     }
}

export function formatDistanceInKm(meters, decimals = 2) {
  if (!meters || isNaN(meters)) return '0 km'
  const km = meters / 1000
  return km?.toFixed(decimals)
}

// export function formatSecondsWithMoment(seconds) {
//   if (!seconds || isNaN(seconds)) return '00'
//   return moment.utc(seconds * 1000).format('mm')
// }

export function formatToHHMMSS(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00:00'
  return moment.utc(seconds * 1000).format('HH:mm:ss')
}

export function parseHtmlDescription(string) {
  if (!string) return ''
  return string
    .replace(/<br\s*\/?>/gi, '\n') // convert <br> to newline
    .replace(/<\/?p>/gi, '') // remove <p> tags
    .replace(/<\/?b>/gi, '**') // optional: bold marker
    .replace(/<[^>]+>/g, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/\n/g, ' ') // remove other tags
    .trim()
}

export function getFullImageUrl(imagePath) {
  if (!imagePath) {
    // No image path provided
    return 'https://img.icons8.com/3d-fluency/94/user-male-circle.png'
  }

  const isFullUrl = imagePath?.startsWith('http')

  if (isFullUrl) {
    return imagePath.trim() // Return the URL as is
  } else {
    // If it's a relative path, use your base URL interpolation function
    return interPolate.base_url(decodeURIComponent(imagePath))
  }
}

export function getFullEventBgImageUrl(imagePath) {
  const isFullUrl = imagePath?.startsWith('http')

  if (isFullUrl) {
    return imagePath.trim() // Return the URL as is
  } else {
    // If it's a relative path, use your base URL interpolation function
    return interPolate.base_url(decodeURIComponent(imagePath))
  }
}

export const isEventStarted = startDate => {
  if (!startDate) return false

  return moment().isSameOrAfter(startDate, 'day')
}

export const programCardFormattedData = data => {
  if (!data) return null

  const now = moment()
  const start = moment(data?.localStartDate)
  const end = moment(data?.localEndDate)

  let eventStatus = 'Completed'
  if (now.isBefore(start)) {
    eventStatus = 'Not Started Yet'
  } else if (now.isBetween(start, end, undefined, '[]')) {
    eventStatus = 'Ongoing'
  }

  return {
    title: data?.name,
    localStartDate: data?.localStartDate,
    localEndDate: data?.localEndDate,
    buttonName:
      eventStatus === 'Not Started Yet' ? 'View Details' : 'View Result',
    image: data?.image?.url
      ? { uri: interPolate.base_url(data?.image?.url) }
      : null,
    eventStatus: eventStatus,
    program: data
  }
}
