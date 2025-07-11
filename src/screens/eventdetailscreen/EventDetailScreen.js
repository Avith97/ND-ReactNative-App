import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import EventDetailScreenUI from './EventDetailScreenUI'
import Strings from '../../utils/constants/Strings'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Loader from '../../common/components/loader/Loader'
import { useIsFocused } from '@react-navigation/native'

export default function EventDetailScreen(props) {
  const eventDistKey = props?.route?.params?.eventDistKey
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    let isMounted = true
    const initiateScreen = async () => {
      setLoading(true)
      try {
        const resp = await services._get('event', {
          headers: {
            distKey: encodeURIComponent(eventDistKey),
            timezone: 'Asia/Calcutta'
          }
        })
        if (isMounted) {
          if (resp.type === 'success') {
            setEventData(resp.data)
          } else {
            appsnackbar.showErrMsg('Something went wrong! Please try again')
            handleNavigate()
          }
        }
      } catch (error) {
        appsnackbar.showErrMsg('Network error! Please try again')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    if (isFocused && eventDistKey) {
      initiateScreen()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line
  }, [isFocused, eventDistKey])

  const handleNavigate = useCallback(() => {
    if (eventData?.id) {
      props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
        eventID: eventData.id
      })
    }
  }, [props.navigation, eventData])

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
