import { store } from '../../redux/store'
import Strings from '../../utils/constants/Strings'
import { appsnackbar } from './snackbar_actions'

export const waitUntilNotSyncing = (getState, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const interval = setInterval(() => {
      if (!store.getState().settings.isLoading) {
        clearInterval(interval)
        resolve()
      }

      // Optional: prevent infinite loop
      if (Date.now() - startTime > timeout) {
        clearInterval(interval)
        reject(new Error('Timed out waiting for sync to complete'))
      }
    }, 200) // Check every 200ms
  })
}

export const waitUntilNavigationReady = (getState, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const interval = setInterval(() => {
      if (global.navigation) {
        clearInterval(interval)
        global.navigation.navigate(Strings.NAVIGATION.auth, {
          screen: Strings.NAVIGATION.signup
        })
        resolve()
      }

      // Optional: prevent infinite loop
      if (Date.now() - startTime > timeout) {
        clearInterval(interval)
        appsnackbar.showErrMsg('Something went wrong, please try again later.')
        reject(new Error('Timed out waiting for navigation to be ready'))
      }
    }, 200) // Check every 200ms
  })
}
