import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import EventStartedScreenUI from './EventStartedScreenUI'
import Strings from '../../utils/constants/Strings'
import { useSelector } from 'react-redux'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { en as labels } from '../../utils/labels/en'

export default function EventStartedScreen(props) {
  const user = useSelector(store => store.user)
  const eventData = useSelector(store => store.eventData)

  useEffect(() => {
    console.log('event detail -->', eventData)
  }, [eventData])

  // checking is onboard or not
  async function isCheckOnBoard() {
    // Construct the URL to check if the user is onboarded for the event
    let url = TemplateService?._userIDAndEventID(
      URL?.isUserOnBoardURL,
      user?.runnerId,
      eventData?.id
    )
    let resp = await services?._get(url) // API Request

    // Check if the response is successful
    if (resp?.type === 'success') {
      return resp?.data?.onboarded
    }
    // Return from the function in any case
    return false
  }

  async function getOnBoard() {
    try {
      // Simulate an API call or any async operation
      let url = TemplateService._eventID(URL.onboard_url, eventData?.id)

      let resp = await services._get(url)
      // console.log('Response:', resp)

      if (resp?.type === 'success') {
        return resp?.data || []
      }

      return []
    } catch (error) {
      console.log('Error onboard screen get details', error)
    }
  }

  async function checkUserRegisteredOrNot() {
    try {
      let url = TemplateService._userIDAndEventID(
        URL.check_user_registered,
        user?.runnerId,
        eventData?.id
      )
      let resp = await services?._get(url) // check

      if (resp?.type === 'success') {
        if (resp.data.success.code === '200') {
          return true
        } else {
          return false
        }
      }

      return false
    } catch (error) {
      appsnackbar.showErrMsg(labels.some_thing_went_wrong)
    }
  }

  async function handleNavigate() {
    // checking user register or not
    let isUserRegistered = await checkUserRegisteredOrNot()
    //checking user onboard or not
    let isOnBoard = await isCheckOnBoard()
    // checking onboard question present or not
    let onboardQuestions = await getOnBoard()
    if (isUserRegistered) {
      props.navigation.navigate(Strings.NAVIGATION.eventdetail, {
        eventDistKey: eventData?.distKey
      })
    } else {
      if (isOnBoard || onboardQuestions?.length === 0) {
        props.navigation.navigate(Strings.NAVIGATION.eventregister) // isOnBoard === true then continue(user already onboarded)
      } else {
        props.navigation.navigate(Strings.NAVIGATION.onboard, {
          onboardQuestions: onboardQuestions
        }) // isOnBoard === false then navigate to onboard screens(user not onboarded)
      }
    }
  }

  return (
    <View style={styles.container}>
      <EventStartedScreenUI
        {...props}
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
