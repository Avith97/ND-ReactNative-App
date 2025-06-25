import { Platform } from 'react-native'
import HealthConnectService from './HealthConnectService'
import moment from 'moment'

export const healthService = {
  init: async () => {
    console.log('Health Service Initialized')
  },

  getHealthStatus: async () => {
    return { status: 'Healthy' }
  },

  getSteps: async (startDate, endDate) => {
    if (Platform.OS === 'android') {
      const resp = await HealthConnectService.getSteps(startDate, endDate)
      return {
        steps: resp?.steps || 0,
        startDate: startDate,
        endDate: endDate || moment().toISOString(),
        extraData: { ...resp }
      }
    } else {
      console.warn('📱 iOS: getSteps not implemented')
      return
    }
  },

  getDistance: async (startDate, endDate) => {
    if (Platform.OS === 'android') {
      const resp = await HealthConnectService.getDistance(startDate, endDate)
      return {
        distance: resp?.distance || 0,
        startDate,
        endDate
      }
    } else {
      console.warn('📱 iOS: getDistance not implemented')
      return
    }
  },

  getActiveCalories: async (startDate, endDate) => {
    if (Platform.OS === 'android') {
      const resp = await HealthConnectService.getActiveCalories(
        startDate,
        endDate
      )
      return {
        activeCalories: resp?.calories || 0,
        startDate,
        endDate
      }
    } else {
      console.warn('📱 iOS: getActiveCalories not implemented')
      return
    }
  },

  getYesterdaySteps: async () => {
    const today = moment()
    const yesterday = moment().subtract(1, 'day')

    if (Platform.OS === 'android') {
      const result = await healthService.getSteps(
        yesterday.toISOString(),
        today.toISOString()
      )
      return {
        ...result,
        label: 'Yesterday',
        date: yesterday.format('YYYY-MM-DD')
      }
    } else {
      console.warn('📱 iOS: getYesterdaySteps not implemented')
      return
    }
  },

  getWeeklySteps: async () => {
    const weekStart = moment().startOf('isoWeek') // Monday
    const weekEnd = moment().endOf('isoWeek')

    if (Platform.OS === 'android') {
      const result = await healthService.getSteps(
        weekStart.toISOString(),
        weekEnd.toISOString()
      )
      return {
        ...result,
        label: 'This Week',
        startDateFormatted: weekStart.format('YYYY-MM-DD'),
        endDateFormatted: weekEnd.format('YYYY-MM-DD')
      }
    } else {
      console.warn('📱 iOS: getWeeklySteps not implemented')
      return
    }
  },
  getData: async (startDate, endDate, format) => {
    if (Platform.OS === 'android') {
      try {
        // const [steps, distance, toCalories] = await Promise.all([
        //   HealthConnectService.getSteps(),
        //   HealthConnectService.getDistance(),
        //   HealthConnectService.getCaloriesBurned()
        // ])

        // added start date
        const [steps, distance, toCalories] = await Promise.all([
          HealthConnectService.getSteps(startDate, endDate, format),
          HealthConnectService.getDistance(startDate, endDate, format),
          HealthConnectService.getCaloriesBurned(startDate, endDate, format)
        ])

        console.log(
          'data in health service',
          '\n',
          steps,
          '\n',
          distance,
          '\n',
          toCalories
        )

        return { steps, distance, toCalories }
      } catch (error) {
        console.log('Err:getData health service ==>', error)
      }
    } else {
      console.warn('📱 iOS: getAggregateData not implemented')
      return
    }
  }
}
