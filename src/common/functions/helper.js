import moment from 'moment'

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
  console.log(data)
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

export function formatSecondsWithMoment(seconds) {
  if (!seconds || isNaN(seconds)) return '00'
  return moment.utc(seconds * 1000).format('mm')
}
