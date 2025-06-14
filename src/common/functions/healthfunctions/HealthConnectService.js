import moment from 'moment'
import { Linking } from 'react-native'
import HealthConnect, {
  isAvailable,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  deleteRecords,
  aggregateRecord,
  initialize,
  getSdkStatus,
  openHealthConnectSettings,
  insertRecords,
  aggregateGroupByPeriod,
  aggregateGroupByDuration,
  SdkAvailabilityStatus
} from 'react-native-health-connect'
import AndroidPermissions from '../permissions'

const permissions = [
  { accessType: 'read', recordType: 'Steps' },
  { accessType: 'read', recordType: 'Distance' },
  { accessType: 'read', recordType: 'TotalCaloriesBurned' }
]

const HealthConnectService = {
  init: async () => {
    try {
      const sdkStatus = await getSdkStatus()
      await sort_status(sdkStatus)
    } catch (error) {
      console.error('HealthConnect initialization error:', error)
    }
  },
  // init: async () => {
  //   try {
  //     console.log('HealthConnect initialized successfully')
  //     const sdkStatus = await getSdkStatus();
  //     console.log('Health Connect SDK Status -->', sdkStatus);

  //     switch (sdkStatus) {
  //       case 0:
  //         console.log('✅ Health Connect is available!');
  //         initialize()
  //         return;
  //       case 1:
  //         console.log('⚠️ Health Connect is not installed.');
  //         Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata');
  //         return;
  //       case 2:
  //         console.log('⚠️ Health Connect is not up to date.');
  //         return;
  //       case 3:
  //         openHealthConnectSettings();
  //         console.log('🚨 No permission to use Health Connect.');
  //         return;
  //       case 4:
  //         console.log('⚠️ Health Connect not supported on this device.');
  //         return;
  //       default:
  //         console.log('❌ Unknown Health Connect status.');
  //         return;
  //     }
  //   } catch (error) {
  //     console.error('HealthConnect initialization error:', error)
  //   }
  // },
  /**
   * Check if Health Connect is available on the device
   */
  checkAvailability: async () => {
    try {
      return await isAvailable()
    } catch (error) {
      console.error('HealthConnect availability error:', error)
      return false
    }
  },

  /**
   * Request required permissions from the user
   */
  requestPermissions: async () => {
    try {
      await requestPermission(permissions)
      return true
    } catch (error) {
      console.error('HealthConnect permission error:', error)
      return false
    }
  },

  /**
   * Get granted permissions
   */
  getGrantedPermissions: async () => {
    try {
      return await getGrantedPermissions()
    } catch (error) {
      console.error('HealthConnect getGrantedPermissions error:', error)
      return null
    }
  },

  // Read Steps dataOriginFilter
  getSteps: async (startDate, endDate, format) => {
    try {
      await HealthConnectService.requestPermissions()

      const dates = {
        startTime: startDate
          ? moment(startDate, format).startOf('day').toISOString()
          : moment().startOf('day').toISOString(),
        endTime: endDate
          ? moment(endDate, format).endOf('day').toISOString()
          : moment().endOf('day').toISOString()
      }

      const steps = await aggregateRecord({
        recordType: 'Steps',
        timeRangeFilter: {
          operator: 'between',
          ...dates
        },
        dataOriginFilter: [
          'com.google.android.apps.fitness',
          'com.fitbit.FitbitMobile'
        ]
      })
      return steps
    } catch (error) {
      console.error('getSteps error:', error)
      return []
    }
  },

  // Read Distance dataOriginFilter
  getDistance: async (startDate, endDate, format) => {
    try {
      await HealthConnectService.requestPermissions()

      const dates = {
        startTime: startDate
          ? moment(startDate, format).startOf('day').toISOString()
          : moment().startOf('day').toISOString(),
        endTime: endDate
          ? moment(endDate, format).endOf('day').toISOString()
          : moment().endOf('day').toISOString()
      }
      const distance = await aggregateRecord({
        recordType: 'Distance',
        timeRangeFilter: {
          operator: 'between',
          ...dates
        },
        dataOriginFilter: [
          'com.google.android.apps.fitness',
          'com.fitbit.FitbitMobile'
        ]
      })
      return distance
    } catch (error) {
      console.error('getDistance error:', error)
      return []
    }
  },

  // Read Active Calories dataOriginFilter
  getCaloriesBurned: async (startDate, endDate, format) => {
    try {
      await HealthConnectService.requestPermissions()

      const dates = {
        startTime: startDate
          ? moment(startDate, format).startOf('day').toISOString()
          : moment().startOf('day').toISOString(),
        endTime: endDate
          ? moment(endDate, format).endOf('day').toISOString()
          : moment().endOf('day').toISOString()
      }

      const calories = await aggregateRecord({
        recordType: 'TotalCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          ...dates
        },
        dataOriginFilter: [
          'com.google.android.apps.fitness',
          'com.fitbit.FitbitMobile'
        ]
      })

      return calories
    } catch (error) {
      console.error('getCaloriesBurned error:', error)
      return []
    }
  },

  /**
   * Read Heart Rate data
   */
  getHeartRate: async (startDate, endDate) => {
    try {
      const data = await readRecords('HeartRate', {
        startTime: startDate,
        endTime: endDate
      })
      return data
    } catch (error) {
      console.error('getHeartRate error:', error)
      return []
    }
  },

  /**
   * Read Sleep Session data
   */
  getSleepData: async (startDate, endDate) => {
    try {
      const data = await readRecords('SleepSession', {
        startTime: startDate,
        endTime: endDate
      })
      return data
    } catch (error) {
      console.error('getSleepData error:', error)
      return []
    }
  },

  /**
   * Optionally, delete records (useful for dev/test apps)
   */
  deleteRecordsByTimeRange: async (recordType, startDate, endDate) => {
    try {
      await deleteRecords(recordType, {
        startTime: startDate,
        endTime: endDate
      })
      return true
    } catch (error) {
      console.error('deleteRecords error:', error)
      return false
    }
  }
}

export default HealthConnectService

const sort_status = async sdkStatus => {
  try {
    switch (sdkStatus) {
      case SdkAvailabilityStatus.SDK_AVAILABLE:
        console.log('✅ Health Connect is available!')
        initialize()
        await HealthConnectService.requestPermissions()
        setTimeout(() => {
          AndroidPermissions.requestPermission(
            AndroidPermissions.HEALTH_CONNECT_READ_BACKGROUND,
            'Health Connect Background access'
          )
        }, 1000)

        return

      case SdkAvailabilityStatus.SDK_UNAVAILABLE:
        console.log('⚠️ Health Connect is not installed.')
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata'
        )
        return

      case SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED:
        console.log('⚠️ Health Connect is not up to date.')
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata'
        )
        return

      case SdkAvailabilityStatus.SDK_UNAVAILABLE_NO_PERMISSIONS:
        // openHealthConnectSettings();
        AndroidPermissions.requestPermission(
          AndroidPermissions.HEALTH_CONNECT
        ).then(granted => {
          AndroidPermissions.requestPermission(
            AndroidPermissions.HEALTH_CONNECT_READ_BACKGROUND
          )
          // if (!granted) openHealthConnectSettings();
        })
        console.log('🚨 No permission to use Health Connect.')
        return

      case SdkAvailabilityStatus.SDK_UNSUPPORTED:
        console.log('⚠️ Health Connect not supported on this device.')
        return

      default:
        console.log('❌ Unknown Health Connect status.')
        return
    }
  } catch (error) {
    console.error('Error handling Health Connect SDK status:', error)
  }
}
