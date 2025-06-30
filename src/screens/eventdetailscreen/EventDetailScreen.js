import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EventDetailScreenUI from './EventDetailScreenUI'
import Strings from '../../utils/constants/Strings'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Loader from '../../common/components/loader/Loader'

export default function EventDetailScreen(props) {
  let eventID = props?.route?.params?.eventID

  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    initiateScreen()
  }, [])

  async function initiateScreen() {
    let resp = await getEventDetail()

    if (resp) {
      setEventData(resp)
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
      console.error('Error fetching data:', error)
      return null
    }
  }

  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
      eventID: eventData.id
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Loader />
      <EventDetailScreenUI
        eventData={eventData}
        handleNavigate={handleNavigate}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
