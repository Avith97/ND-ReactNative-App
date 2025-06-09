// react native imports
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// constants utils & assets
import Colors from '../../utils/constants/Colors'

// UI component
import moment from 'moment'
import axios from 'axios'
import ProgramLeaderBoardScreenUI from './ProgramLeaderBoardScreenUI'
import { URL } from '../../utils/constants/Urls'
import { TemplateService } from '../../services/templates/TemplateService'
import { services } from '../../services/axios/services'
import { useSelector } from 'react-redux'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Loader from '../../common/components/loader/Loader'

export default function ProgramLeaderBoardScreen(props) {
  let { eventID } = props?.route?.params


  const { auth } = useSelector(store => store)

  const [state, setState] = useState({
    selectedTab: 'Male',
    eventData: null,
    limit: [
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '15', value: '15' }
    ],
    selectedParticipated: {
      value: 'individual',
      label: 'Individual'
    },
    selectedWeekRange: {
      label: 'overAll',
      value: ''
    },
    selectedLimit: { label: '5', value: '5' },
    showModal: false,
    searchResultData: null,

    // activity
    selectedActivity: null,
    selectedCategory: null
  })

  const [filters, setFilters] = useState({
    selectedParticipated: {
      value: 'individual',
      label: 'Individual'
    },
    selectLimit: { label: '5', value: '5' },
    selectedWeek: {
      label: 'overAll',
      value: ''
    },
    activity:null,
    category:null
  })

  useEffect(() => {
    InitiateScreen()
  }, [])

  //  participated labels like , individual , team , age group
  async function getParticipatedOptions(event) {
    const participated = []

    const type = event.challengeType
    const id = event.id
    const showRunnerGroupGraph = event.showRunnerGroupGraph
    const showAgeGroup = event.showAgeGroup
    const showIndividual = event.showIndividual

    const getChallengeLabel = id => {
      if ([507, 508, 515].includes(id)) return 'Corporate'
      if (id === 2473) return 'Location'
      return 'Team'
    }

    // ✅ Individual condition
    if (
      type === 'BOTH' ||
      type === 'TEAM_RELAY' ||
      ['INDIVIDUAL', 'RELAY'].includes(type)
    ) {
      participated.push({
        value: 'individual',
        label: 'Individual'
      })
    }

    // ✅ Team condition
    if (
      type === 'BOTH' ||
      type === 'TEAM_RELAY' ||
      (type === 'TEAM' && showRunnerGroupGraph === true)
    ) {
      participated.push({
        value: 'team',
        label: getChallengeLabel(id)
      })
    }

    // ✅ Runner Group condition
    if (showRunnerGroupGraph) {
      participated.push({
        value: 'runnerGroup',
        label: 'Runner Group'
      })
    }

    // ✅ Age Group condition
    if (showAgeGroup && showIndividual) {
      participated.push({
        value: 'ageGroup',
        label: 'Age Group'
      })
    }

    return participated
  }

  async function generateWeekFilterOptions(eventData, eventId) {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
    const dropdownDates = [
      {
        label: 'OverAll',
        value: ''
      }
    ]

    const now = moment()
    const todayFormatted = now.format(DATE_FORMAT)

    const todaysDateOption = {
      label: "Today's Leaderboard",
      value: `${todayFormatted} ${todayFormatted}`,
      fromDate: todayFormatted,
      toDate: todayFormatted
    }

    const parseDate = (dateStr, format = 'YYYY-MM-DD') =>
      dateStr ? moment(dateStr, format) : null

    // Correct parsing based on your data
    const initialDate = parseDate(eventData?.localStartDate) // "2025-06-01"
    const endDate = parseDate(eventData?.localEndDate) // "2025-06-21"

    if (!initialDate || !endDate) return dropdownDates

    const totalDays = endDate.diff(initialDate, 'days')
    const totalWeeks = Math.ceil(totalDays / 7)

    let weekStart = initialDate.clone()
    const formattedWeeks = []

    

    // const isLiveEvent = now.isBetween(initialDate, endDate, undefined, '[]')

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
          last.toDate = end.format(DATE_FORMAT)
          last.value = `${last.fromDate} ${last.toDate}`
        } else {
          const fromDateStr = start.format(DATE_FORMAT)
          const toDateStr = end.format(DATE_FORMAT)

          const weekOption = {
            label: `${start.format('Do MMM')} - ${end.format('Do MMM')}`,
            value: `${fromDateStr} ${toDateStr}`,
            fromDate: fromDateStr,
            toDate: toDateStr
          }

          if (isCurrentWeek) break
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
        // Only include if NOT DUATHLON or id NOT 3
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

  async function InitiateScreen() {
    // getting Event Detail
    let res = await getEventDetail()


    // getting all Runners data, it will work like suggestion list
    let runnerData = await getAllRunnerData()

    // runner activity detail
    let runnerActivityDetail = await getRunnerDetail(auth?.runner?.id)

    let formattedParticipatedLabel = await getParticipatedOptions(res)

    // formatted week data
    let weeksData = await generateWeekFilterOptions(res, eventID)


    // get activity option
    let getActivities = await getActivityOptions(res) // activites not set how can I set

    let activityPriority = res?.activities?.[0]?.activityPriority || 'PRIMARY'
    let eventCategoryId = res?.eventRunCategories?.[0]?.id || null

    setState({
      ...state,
      eventData: res,
      weekDropdowns: weeksData,
      formattedParticipatedLabel: formattedParticipatedLabel,
      activityPriority: activityPriority,
      eventCategoryId: eventCategoryId,
      runnerData: runnerData,
      runnerActivityDetail: runnerActivityDetail,
      eventActivities: getActivities,
      selectedActivity: getActivities?.activity?.[0],
      selectedCategory: getActivities?.category?.[0]
    })
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
      console.error('Error fetching data:', error)
      return null
    } finally {
      console.log('fetch')
    }
  }

  async function getAllRunnerData() {
    try {
      // /public/leaderboard

      let url = TemplateService._eventID(URL?.get_all_runners, eventID)

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

  // get user activity
  async function getRunnerDetail(userId) {
    try {
      let url = TemplateService._userIDAndEventID(
        URL?.get_runner_detail,
        userId,
        eventID
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

  // searching Function
  // async function searchResult(searchQuery) {
  //   if (searchQuery === '') {
  //     return []
  //   }

  //   const { runnerData } = state

  //   // Convert search text to lowercase for case-insensitive search
  //   const searchTerms = searchQuery?.trim()?.toLowerCase()?.split(' ')

  //   // Filter array of objects based on search text
  //   let x = runnerData.filter(obj => {
  //     // Check if any property of the object contains relevant words
  //     // for (let key in obj) {
  //     if (obj.hasOwnProperty('firstName') || obj.hasOwnProperty('lastName')) {
  //       if (obj['firstName'] !== null || obj['lastName'] !== null) {
  //         const propertyValue = obj['firstName'].toString().toLowerCase()  || obj['lastName'].toString().toLowerCase()
  //         //  const propertyValue = obj['lastName'].toString().toLowerCase()
  //         // Check if any of the search terms is present in the property value
  //         if (searchTerms.some(term => propertyValue.includes(term))) {
  //           return true // Object matches the search criteria
  //         }
  //       }
  //     }

  //     return false // Object does not match the search criteria
  //   })

  //   return x
  // }

  async function searchResult(searchQuery) {
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
  }

  async function handleChange(params, val) {
    if (params === 'search') {
      let searchResultData = await searchResult(val)

      // if (searchResultData?.length > 0) {
      setState({
        ...state,
        searchResultData: searchResultData
      })
      // }
    } else {
      setState({
        ...state,
        [params]: val
      })
    }
  }

  async function handleSubmit() {
    setFilters({
      ...filters,
      selectedWeek: state?.selectedWeekRange,
      selectLimit: state?.selectedLimit,
      selectedParticipated: state?.selectedParticipated,
      activity:state?.selectedActivity,
      category:state?.selectedCategory
    })
    setState(prev => ({
      ...prev,
      showModal: false
    }))
  }

  async function handleSearchedItemPress(runnerID) {
    // Your custom logic here, for example:

    let runnerActivityDetail = await getRunnerDetail(runnerID?.runnerId)

    setState({
      ...state,
      runnerActivityDetail: runnerActivityDetail,
      searchResultData: []
    })
  }


  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}>
      {/* <Prg {...state}  /> */}
      {/* <Loader /> */}

      <ProgramLeaderBoardScreenUI
        {...state}
        runnerActivityDetail={state?.runnerActivityDetail}
        filters={filters}
        searchResultData={state?.searchResultData}
        eventData={state?.eventData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSearchedItemPress={handleSearchedItemPress}
        eventID={eventID}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
