import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EventDetailScreenUI from './EventDetailScreenUI'
import Strings from '../../utils/constants/Strings'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Loader from '../../common/components/loader/Loader'
import { store } from '../../redux/store'
import actions from '../../redux/action_types/actions'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'

export default function EventDetailScreen(props) {
  let eventDistKey = props?.route?.params?.eventDistKey

  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(false)

  let isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      initiateScreen()
    }
  }, [isFocused])

  async function initiateScreen() {
    setLoading(true)
    let resp = await fetchEventDetails(eventDistKey)
    if (resp) {
      setEventData(resp)
      setLoading(false)
    }
  }

  // async function getEventDetail() {
  //   try {
  //     let url = TemplateService?._eventID(URL.get_event, eventID)

  //     let resp = await services?._get(url)

  //     if (resp?.type === 'success') {
  //       return resp?.data
  //     } else {
  //       appsnackbar.showErrMsg('Something went wrong')
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     return null
  //   }
  // }

  async function fetchEventDetails(eventDistKey) {
    console.log(moment().format('hh:mm:ss'))

    let resp = await services._get('event', {
      headers: {
        distKey: encodeURIComponent(eventDistKey),
        timezone: 'Asia/Calcutta'
      }
    })

    if (resp.type !== 'success') {
      appsnackbar.showErrMsg('Something went wrong!Please try again')
      handleNavigate()
      return
    }

    console.log(moment().format('hh:mm:ss'))

    return resp?.data
  }

  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
      eventID: eventData.id
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Loader isLoading={loading} />
      <EventDetailScreenUI
        eventData={eventData}
        handleNavigate={handleNavigate}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
