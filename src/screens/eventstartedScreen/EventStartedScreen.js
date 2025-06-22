import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import EventStartedScreenUI from './EventStartedScreenUI'
import Strings from '../../utils/constants/Strings'
import { useSelector } from 'react-redux'

export default function EventStartedScreen(props) {
  let IsRegistered = props.route.params?.IsRegistered

  const eventData = useSelector(store => store.eventData)

  useEffect(() => {
    console.log('event detail -->', eventData)
  }, [eventData])

  const handleNavigate = () => {
    if (IsRegistered) {
      props.navigation.navigate(Strings.NAVIGATION.eventdetail, {
        IsRegistered: true
      })
    } else {
      props.navigation.navigate(Strings.NAVIGATION.eventregister)
    }
  }

  return (
    <View style={styles.container}>
      <EventStartedScreenUI
        eventDetail={eventData}
        handleNavigate={handleNavigate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
