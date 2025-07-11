import { Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Colors from '../../utils/constants/Colors'
import moment from 'moment'
import ProgramLeaderBoardScreenUI from './ProgramLeaderBoardScreenUI'
import { URL } from '../../utils/constants/Urls'
import { TemplateService } from '../../services/templates/TemplateService'
import { services } from '../../services/axios/services'
import { useSelector } from 'react-redux'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../common/components/loader/Loader'

export default function ProgramLeaderBoardScreen(props) {
  const { eventID } = props?.route?.params
  const { auth } = useSelector(store => store)
  const isFocused = useIsFocused()
  const eventData = useSelector(store => store.eventData)

  const [state, setState] = useState({
    selectedTab: 'Male',
    eventData: null,
    limit: [
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '15', value: '15' }
    ],
    selectedParticipated: { value: 'individual', label: 'Individual' },
    selectedWeekRange: {
      label: 'OverAll',
      value: 'OverAll',
      toDate: null,
      fromDate: null
    },
    selectedLimit: { label: '5', value: '5' },
    showModal: false,
    searchResultData: null,
    selectedActivity: null,
    selectedCategory: null
  })

  console.log(eventData)

  const [filters, setFilters] = useState({
    selectedParticipated: { value: 'individual', label: 'Individual' },
    selectLimit: { label: '5', value: '5' },
    selectedWeek: { label: 'overAll', value: 'overAll' },
    activity: null,
    category: null
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const runnerId = auth?.runner?.id || auth?.runnerId
        const [eventData, runnerData, runnerActivityDetail] = await Promise.all(
          [getEventDetail(), getAllRunnerData(), getRunnerDetail(runnerId)]
        )

        // console.log(eventData , runnerData , runnerActivityDetail);

        const activityPriority =
          eventData?.activities?.[0]?.activityPriority || 'PRIMARY'
        const eventCategoryId = eventData?.eventRunCategories?.[0]?.id || null
        const [formattedParticipatedLabel, weekDropdowns, eventActivities] =
          await Promise.all([
            getParticipatedOptions(eventData),
            generateWeekFilterOptions(eventData, eventID),
            getActivityOptions(eventData)
          ])
        const selectedActivity = eventActivities?.activity?.[0] || null
        const selectedCategory = eventActivities?.category?.[0] || null

        if (isMounted) {
          setState(prev => ({
            ...prev,
            eventData,
            runnerData,
            runnerActivityDetail,
            activityPriority,
            eventCategoryId,
            weekDropdowns,
            formattedParticipatedLabel,
            eventActivities,
            selectedActivity,
            selectedCategory
          }))
        }
      } catch (error) {
        // Optionally handle error in state
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    if (isFocused) fetchData()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line
  }, [isFocused])

  // --- Helper functions (same as before, but remove console.logs) ---

  async function getParticipatedOptions(event) {
    const participated = []
    const type = event?.challengeType
    const showRunnerGroupGraph = event?.showRunnerGroupGraph
    const showAgeGroup = event?.showAgeGroup

    if (
      !type ||
      type === 'BOTH' ||
      type === 'TEAM_RELAY' ||
      ['INDIVIDUAL', 'RELAY'].includes(type)
    ) {
      participated.push({ value: 'individual', label: 'Individual' })
    }
    if (
      type === 'BOTH' ||
      type === 'TEAM_RELAY' ||
      (type === 'TEAM' && showRunnerGroupGraph === true)
    ) {
      participated.push({ value: 'team', label: 'Team' })
    }
    if (showRunnerGroupGraph) {
      participated.push({ value: 'runnerGroup', label: 'Runner Group' })
    }
    if (showAgeGroup) {
      participated.push({ value: 'ageGroup', label: 'Age Group' })
    }
    return participated
  }

  async function generateWeekFilterOptions(eventData, eventId) {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
    const dropdownDates = [
      { label: 'OverAll', value: 'OverAll', toDate: null, fromDate: null }
    ]
    const now = moment()
    const todayFormatted = now.startOf('day').format(DATE_FORMAT)
    const todayEndFormatted = now.endOf('day').format(DATE_FORMAT)
    const todaysDateOption = {
      label: "Today's Leaderboard",
      value: `${todayFormatted} ${todayEndFormatted}`,
      fromDate: todayFormatted,
      toDate: todayEndFormatted
    }
    const parseDate = (dateStr, format = 'YYYY-MM-DD') =>
      dateStr ? moment(dateStr, format) : null
    const initialDate = parseDate(eventData?.localStartDate)
    const endDate = parseDate(eventData?.localEndDate)
    if (!initialDate || !endDate) return dropdownDates
    const totalDays = endDate.diff(initialDate, 'days')
    const totalWeeks = Math.ceil(totalDays / 7)
    let weekStart = initialDate.clone()
    const formattedWeeks = []
    if (totalDays > 10) {
      for (let i = 1; i <= totalWeeks; i++) {
        const start = weekStart.clone()
        const endCandidate = start.clone().add(6, 'days')
        const end = endCandidate.isAfter(endDate)
          ? endDate.clone()
          : endCandidate
        const isCurrentWeek = now.isBetween(start, end, undefined, '[]')
        const checkDays = end.diff(start, 'days')
        if (checkDays <= 3 && formattedWeeks.length > 0) {
          const last = formattedWeeks[formattedWeeks.length - 1]
          last.label = `${moment(last.fromDate, DATE_FORMAT).format(
            'Do MMM'
          )} - ${end.format('Do MMM')}`
          last.toDate = end.endOf('day').format(DATE_FORMAT)
          last.value = `${last.fromDate} ${last.toDate}`
        } else {
          const fromDateStr = start.startOf('day').format(DATE_FORMAT)
          const toDateStr = end.endOf('day').format(DATE_FORMAT)
          const weekOption = {
            label: `${start.format('Do MMM')} - ${end.format('Do MMM')}`,
            value: `${fromDateStr} ${toDateStr}`,
            fromDate: fromDateStr,
            toDate: toDateStr
          }
          if (isCurrentWeek) {
            formattedWeeks.push(weekOption)
            break
          }
          formattedWeeks.push(weekOption)
        }
        weekStart = end.clone().add(1, 'days')
      }
      formattedWeeks.reverse()
      dropdownDates.push(...formattedWeeks)
      const isNonStepsEvent =
        eventId !== 530 &&
        eventId !== 1989 &&
        endDate.isSameOrAfter(now) &&
        eventData?.activities?.[0]?.challengeParams !== 'STEPS'
      if (isNonStepsEvent) {
        dropdownDates.unshift(todaysDateOption)
      }
    }
    return dropdownDates
  }

  async function getActivityOptions(eventData) {
    let actOptions = []
    let secOptions = []
    let categoryOptions = []
    if (eventData?.activities?.length) {
      eventData.activities.forEach(activity => {
        if (activity?.type !== 'DUATHLON' || activity?.id !== 3) {
          actOptions.push({
            label: activity?.displayName,
            value: activity?.displayName,
            type: activity?.type,
            activityPriority: activity?.activityPriority,
            eventSupportedActivityTypeId: activity?.eventSupportedActivityTypeId
          })
        }
      })
    }
    if (eventData?.secondaryActivities?.length) {
      eventData.secondaryActivities.forEach(secActivity => {
        secOptions.push({
          label: secActivity?.displayName,
          value: secActivity?.displayName,
          type: secActivity?.type,
          activityPriority: secActivity?.activityPriority,
          id: secActivity?.id
        })
      })
    }
    if (eventData?.eventRunCategories) {
      eventData.eventRunCategories.forEach(category => {
        categoryOptions.push({
          label: category?.categoryName,
          value: category?.category,
          type: category?.eventSupportedActivityType?.activityType?.type,
          id: category?.id
        })
      })
    }
    return {
      activity: [...actOptions, ...secOptions],
      category: categoryOptions
    }
  }

  async function getEventDetail() {
    try {
      let url = TemplateService?._eventID(URL.get_event, eventID)
      let resp = await services?._get(url)
      if (resp?.type === 'success') {
        return resp?.data
      } else {
        appsnackbar.showErrMsg('Something went wrong')
      }
    } catch (error) {
      return null
    }
  }

  async function getAllRunnerData() {
    try {
      let url = TemplateService._eventID(
        URL?.get_all_runners,
        eventID || eventData?.id
      )
      const resp = await services._get(url, { params: { searchString: '' } })
      if (resp?.type === 'success') {
        return resp?.data
      } else
        appsnackbar.showErrMsg('Something went wrong, please try again later.')
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong, please try again later.')
      return
    }
  }

  async function getRunnerDetail(userId) {
    try {
      let url = TemplateService._userIDAndEventID(
        URL?.get_runner_detail,
        userId,
        eventID || eventData?.id
      )
      const resp = await services._get(url)
      if (resp?.type === 'success') {
        return resp?.data
      } else
        appsnackbar.showErrMsg('Something went wrong, please try again later.')
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong, please try again later.')
      return
    }
  }

  // Debounced search (basic, for demonstration)
  const searchResult = useCallback(
    async searchQuery => {
      if (!searchQuery?.trim()) return []
      const runnerData = state?.runnerData
      const searchTerms = searchQuery.trim().toLowerCase().split(' ')
      const filteredResults = runnerData?.filter(obj => {
        const firstName = obj?.firstName?.toLowerCase() || ''
        const lastName = obj?.lastName?.toLowerCase() || ''
        const fullName = `${firstName} ${lastName}`
        return searchTerms.every(term => fullName.includes(term))
      })
      return filteredResults
    },
    [state.runnerData]
  )

  async function handleChange(params, val) {
    if (params === 'search') {
      let searchResultData = await searchResult(val)
      setState(prev => ({
        ...prev,
        searchResultData
      }))
    } else {
      setState(prev => ({
        ...prev,
        [params]: val
      }))
    }
  }

  async function handleSubmit() {
    setFilters(prev => ({
      ...prev,
      selectedWeek: state?.selectedWeekRange,
      selectLimit: state?.selectedLimit,
      selectedParticipated: state?.selectedParticipated,
      activity: state?.selectedActivity,
      category: state?.selectedCategory
    }))
    setState(prev => ({
      ...prev,
      showModal: false
    }))
  }

  async function handleSearchedItemPress(runnerID) {
    Keyboard.dismiss()
    setState(prev => ({
      ...prev,
      searchResultData: []
    }))
    let runnerActivityDetail = await getRunnerDetail(runnerID?.runnerId)
    setState(prev => ({
      ...prev,
      runnerActivityDetail,
      searchResultData: []
    }))
  }

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.08)', padding: 20 }}>
  //     <Loader isLoading={loading} />
  //     </View>
  //   )
  // }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}>
      {loading && <Loader isLoading={loading} />}
      <ProgramLeaderBoardScreenUI
        {...state}
        runnerActivityDetail={state?.runnerActivityDetail}
        filters={filters}
        searchResultData={state?.searchResultData}
        eventData={state?.eventData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSearchedItemPress={handleSearchedItemPress}
        eventID={eventID || eventData?.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
