import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import DashboardScreenUI from './DashboardScreenUI'
import { hp } from '../../../common/functions/dimensions'
import Colors from '../../../utils/constants/Colors'
import Strings from '../../../utils/constants/Strings'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { useSelector } from 'react-redux'
import { services } from '../../../services/axios/services'
import { appsnackbar } from '../../../common/functions/snackbar_actions'
import moment from 'moment'
import Loader from '../../../common/components/loader/Loader'
import { useIsFocused } from '@react-navigation/native'

export default function DashboardScreen() {
  const [state, setState] = useState({
    selectedTab: 'Week',
    dashboardData: null
  })

  let isFocused = useIsFocused()
  const auth = useSelector(store => store?.user)

  useEffect(() => {
    if (isFocused) {
      initiateScreen()
    }
  }, [isFocused])

  async function initiateScreen() {
    let resp = await getDashboardDetail()

    if (resp) {
      setState(prev => ({ ...prev, dashboardData: resp || null }))
    }
  }

  //  formatting data week wise and set the values weekdays
  function prepareWeeklySteps(data) {
    const startDate = moment(data?.eventStartDate, 'YYYY-MM-DD')
    const endDate = moment(data?.eventEndDate, 'YYYY-MM-DD')

    // Parse activity data and normalize date format
    const activityMap = {}
    data?.runnerActivityDetails?.forEach(item => {
      const date = moment(item.startDateLocal, 'DD-MM-YYYY HH:mm:ss').format(
        'YYYY-MM-DD'
      )
      activityMap[date] = item.steps
    })

    const result = []

    let current = startDate.clone()

    while (current.isSameOrBefore(endDate)) {
      const weekStart = current.clone()
      const weekEnd = moment.min(weekStart.clone().add(6, 'days'), endDate)

      const days = []

      for (let i = 0; i < 7; i++) {
        const day = weekStart.clone().add(i, 'days')
        if (day.isAfter(weekEnd)) break

        const formatted = day.format('YYYY-MM-DD')
        const dayName = day.format('ddd') // 'Mon', 'Tue', 'Wed', etc.

        days.push({
          date: formatted,
          day: dayName,
          steps: activityMap[formatted] || 0
        })
      }

      const totalSteps = days.reduce((sum, d) => sum + d.steps, 0)

      result.push({
        weekRange: `${weekStart.format('D MMMM')} - ${weekEnd.format(
          'D MMMM'
        )}`,
        totalSteps,
        days
      })

      current = current.add(7, 'days')
    }

    return result
  }

  async function getDashboardDetail(params) {
    try {
      let url = TemplateService._userId(
        URL.dashboard_detail,
        auth?.runner?.id || auth?.runnerId
      )

      let resp = await services._get(url)

      console.log(resp, url)

      if (resp?.type === 'success') {
        let data = prepareWeeklySteps(resp.data?.graphDTO?.[0])
        let totalSteps = data.reduce((sum, d) => sum + d.totalSteps, 0)

        return (
          { ...resp.data, daysData: data, totalSteps: totalSteps || 0 } || {}
        )
      } else {
        appsnackbar.showErrMsg(
          resp?.error_data?.verbose || 'Something went wrong!'
        )
      }
    } catch (error) {}
  }

  // const []
  const [options] = useState({
    tabs: ['Week', 'Month'],
    daysData: [
      { id: 1, dayTitle: 'day1', response: false },
      { id: 2, dayTitle: 'day2', response: true },
      { id: 3, dayTitle: 'day3', response: false },
      { id: 4, dayTitle: 'day4', response: false },
      { id: 5, dayTitle: 'day5', response: false },
      { id: 6, dayTitle: 'day6', response: false },
      { id: 7, dayTitle: 'day7', response: true }
    ]
  })
  const handleNavigate = eventID => {
    navigation.navigate(Strings.NAVIGATION.programleaderboard, {
      eventID: eventID
    })
  }

  const handleChange = tab => {
    setState(prev => ({ ...prev, selectedTab: tab }))
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp(5) }}
      showsVerticalScrollIndicator={false}>
      <Loader />

      <DashboardScreenUI
        {...state}
        eventGraphData={state?.dashboardData}
        {...options}
        // eventGraphData={state?.dashboardData}
        handleChange={handleChange}
        handleNavigate={handleNavigate}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    paddingBottom: hp(10)
  }
})
