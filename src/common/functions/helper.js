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
