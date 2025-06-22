import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import EventStartedScreenUI from './EventStartedScreenUI'
import Strings from '../../utils/constants/Strings'
import { useSelector } from 'react-redux'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'

export default function EventStartedScreen(props) {
  let { IsRegistered } = props.route.params

  const { eventData, user } = useSelector(store => store)

  // checking is onboard or not
  async function isCheckOnBoard() {
    // Construct the URL to check if the user is onboarded for the event
    let url = TemplateService?._userIDAndEventID(
      URL?.isUserOnBoardURL,
      user?.runnerId,
      eventData?.program?.id
    )
    let resp = await services?._get(url) // API Request

    // Check if the response is successful
    if (resp?.type === 'success') {
      return resp?.data?.onboarded
    }
    // Return from the function in any case
    return false
  }

  async function handleNavigate() {
    let isOnBoard = await isCheckOnBoard()
    if (isOnBoard) {
      props.navigation.navigate(Strings.NAVIGATION.eventregister) // isOnBoard === true then continue(user already onboarded)
    } else {
      props.navigation.navigate(Strings.NAVIGATION.onboard) // isOnBoard === false then navigate to onboard screens(user not onboarded)
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
