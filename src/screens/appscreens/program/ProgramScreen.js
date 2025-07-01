import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// constants utils & assets
import Colors from '../../../utils/constants/Colors'
import { Images } from '../../../utils/constants/Images'
import Strings from '../../../utils/constants/Strings'

// UI component
import ProgramScreenUI from './ProgramScreenUI'
import { services } from '../../../services/axios/services'
import { BASE_URL, URL } from '../../../utils/constants/Urls'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import Loader from '../../../common/components/loader/Loader'
import actions from '../../../redux/action_types/actions'
import { TemplateService } from '../../../services/templates/TemplateService'
import { useIsFocused } from '@react-navigation/native'
import { interPolate } from '../../../services/interpolate/interpolate'

export default function ProgramScreen(props) {
  const [state, setState] = useState({
    selectedTabID: 0
  })

  const userData = useSelector(state => state.auth)

  let focused = useIsFocused()

  const [options, setOptions] = useState({
    programs: [],
    tabs: [
      { id: 0, title: 'My Programs' },
      { id: 1, title: 'Upcoming' }
    ]
  })

  // Fetch "My Programs"
  const fetchPrograms = async () => {
    let url = TemplateService._userId(URL.my_events, userData?.runnerId)
    try {
      // api request
      const resp = await services._get(url)

      // response handle
      if (resp.type !== 'success') return

      if (resp.api_response.status === 200) {
        const formattedPrograms = resp?.data?.data.map(event => {
          const now = moment()
          const start = moment(event?.localStartDate)
          const end = moment(event?.localEndDate)

          let eventStatus = 'Completed'
          if (now.isBefore(start)) {
            eventStatus = 'Not Started Yet'
          } else if (now.isBetween(start, end, undefined, '[]')) {
            eventStatus = 'Ongoing'
          }

          return {
            title: event?.name,
            localStartDate: event?.localStartDate,
            localEndDate: event?.localEndDate,
            buttonName:
              eventStatus === 'Not Started Yet'
                ? 'View Details'
                : 'View Result',
            image: event?.image?.url
              ? { uri: interPolate.base_url(event?.image?.url) }
              : null,
            eventStatus: eventStatus,
            program: event
          }
        })

        setOptions(prev => ({
          ...prev,
          programs: formattedPrograms
        }))
      }
    } catch (error) {
      console.log('Error fetching all programs:', error)
    }
  }

  // Fetch "Upcoming Programs"
  const fetchUpcomingPrograms = async () => {
    // url
    let url = TemplateService._userId(URL.upcoming_events, userData?.runnerId)
    try {
      // API request
      const resp = await services._get(url)

      // response handle
      if (resp.type !== 'success') return

      if (resp.api_response.status === 200) {
        const formattedPrograms = resp?.data?.data.map(event => {
          const now = moment()
          const start = moment(event?.localStartDate)
          const end = moment(event?.localEndDate)

          return {
            title: event?.name,
            localStartDate: event?.localStartDate,
            localEndDate: event?.localEndDate,
            image: event?.image?.url
              ? { uri: interPolate.base_url(event?.image?.url) }
              : null,
            eventStatus: now.isBetween(start, end, undefined, '[]')
              ? 'ongoing'
              : 'upcoming',
            program: event
          }
        })

        setOptions(prev => ({
          ...prev,
          programs: formattedPrograms
        }))
      }
    } catch (error) {
      console.log('Error fetching upcoming programs:', error)
    }
  }

  // Fetch data when selectedTabID changes
  useEffect(() => {
    if (focused) {
      if (state.selectedTabID === 0) {
        fetchPrograms()
      } else {
        fetchUpcomingPrograms()
      }
    }
  }, [state.selectedTabID, focused])

  const handleChange = tab => {
    setState(prev => ({ ...prev, selectedTabID: tab?.id }))
  }

  const handleNavigate = data => {
    store.dispatch({
      type: actions.SET_EVENT_DETAILS,
      payload: data?.program || {}
    })
    if (state.selectedTabID === 0) {
      if (data?.eventStatus === 'Not Started Yet') {
        // Handle not yet started event
        props.navigation.navigate(Strings.NAVIGATION.eventdetail, {
          eventDistKey: data?.program?.distKey
        })
      } else {
        // Handle ongoing or completed event
        props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
          eventID: data?.program?.id
        })
      }
      // props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
      //   eventID: data?.program.id
      // })
    } else {
      props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
        isRegistered: false
      })
    }
  }

  return (
    <View style={styles.container}>
      <Loader />
      <ProgramScreenUI
        {...state}
        {...options}
        handleNavigate={handleNavigate}
        handleChange={handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20,
    backgroundColor: Colors.white
  }
})
