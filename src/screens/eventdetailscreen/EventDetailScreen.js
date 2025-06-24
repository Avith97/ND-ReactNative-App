import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventDetailScreenUI from './EventDetailScreenUI'
import Strings from '../../utils/constants/Strings'

export default function EventDetailScreen(props) {
  let eventData = props?.route?.params?.eventData

  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.programleaderboard, {
      eventID: eventData.id
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <EventDetailScreenUI
        eventData={eventData}
        handleNavigate={handleNavigate}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
