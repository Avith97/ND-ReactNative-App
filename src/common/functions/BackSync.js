import moment from 'moment'
import AsyncStore from '../../data/async/AsyncStore'
import { store } from '../../redux/store'
import { services } from '../../services/axios/services'
import Strings from '../../utils/constants/Strings'
import { URL } from '../../utils/constants/Urls'
import { waitUntilNavigationReady, waitUntilNotSyncing } from './check_queue'
import { healthService } from './healthfunctions/HealthService'
import { initialize } from 'react-native-health-connect'

export const BackSync = {
  // Function to sync data with the backend
  syncData: async params => {
    try {
      // Simulate a network request to sync data
      console.log('before syncing data:', params?.data)
      if (params?.data?.action === 'trigger') {
        if (params.data?.action_type === 'POST_HEALTH_DATA') {
          console.log('Syncing data with backend:', params.data)
          const result = await initialize() // or HealthConnectService.init()
          console.log('✅ Init result:', result)
          await BackSync.health_data_sync(params?.data)
          console.log('Synced with backend:')
        }
      } else if (params?.data?.action === 'navigate') {
        navigateTo(params?.data?.screen)
      }
    } catch (error) {
      console.error('Failed to sync data:', error)
    }
  },

  health_data_sync: async params => {
    console.log(params)

    try {
      // if (store.getState().settings.isLoading) {
      //   await waitUntilNotSyncing()
      // }
      //make your changes here for health_data_sync
      // let resp = await services._post(URL.otp, {
      //   userName: 'vinit@anssoft.in',
      //   byEmail: true,
      //   byMobile: false
      // })
      const result = await initialize()
      let healthData = await healthService.getData(
        params?.startDate,
        params?.endDate,
        'YYYY-MM-DD HH:mm:ss'
      )
      console.log('healthData in background--->', healthData)
      if (healthData) {
        let data = await AsyncStore.getData(Strings.ASYNC_KEY.offline)
        if (data?.auth?.token) {
          services.refreshInstance(data?.auth?.token)
          let resp = await services._post(URL.save_health_data, {
            runnerId: data?.user?.runnerId,
            distance: healthData.distance,
            steps: healthData?.steps,
            calories: healthData?.toCalories,
            startDate: params?.startDate || moment().format('YYYY-MM-DD'),
            activityUrl: 'www.googlefit.com'
          })
          console.log('resp in background--->', resp)
        }
      }
    } catch (error) {
      console.error('Failed to sync health data:===>', error)
    }
  },

  navigate_to: async params => {
    console.log('navigation in background--->', global.navigation)

    if (global.navigation?.isReady()) {
      global.navigation?.navigate(Strings.NAVIGATION.auth, {
        screen: Strings.NAVIGATION.signup
      })
    } else {
      await waitUntilNavigationReady()
    }
    return
  },

  // Function to clear local cache or state
  clearCache: async () => {
    try {
      console.log('Clearing local cache...')
    } catch (error) {
      console.error('Failed to clear local cache:', error)
    }
  }
}
