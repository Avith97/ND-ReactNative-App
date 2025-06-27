import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Strings from '../../utils/constants/Strings'
import OnBoardingScreenUI from './OnBoardingScreenUI'
import { services } from '../../services/axios/services'
import { onBoardingScreenData } from '../../data/static_data/temp'
import OnBoardForm from './OnBoardForm'
import { TemplateService } from '../../services/templates/TemplateService'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { URL } from '../../utils/constants/Urls'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { en as labels } from '../../utils/labels/en'

export default function OnBoardScreen(props) {
  global.OnboardingData = null
  global.CurentOnboardingScreen = 'more_about'

  let onboardQuestions = props?.route?.params?.onboardQuestions

  let eventData = useSelector(state => state?.eventData)
  let user = useSelector(state => state?.user)
  let isFocused = useIsFocused()
  let key = 0
  const [state, setState] = useState({
    onBoardQuestions: null,
    slides: []
  })

  useEffect(() => {
    if (isFocused && onboardQuestions) {
      initiateScreen()
    }
  }, [isFocused, onboardQuestions])

  async function initiateScreen() {
    let data = await onboardQuestions // getting from route params

    if (!onboardQuestions) {
      appsnackbar.showErrMsg('No data received for onboarding screen')
      return
    }

    let Slides =
      onboardQuestions &&
      onboardQuestions?.map((item, index) => {
        return () => (
          <OnBoardForm key={index} data={item} {...props} {...state} />
        )
      })
    setState({ ...state, onBoardQuestions: data, slides: Slides })
  }

  // async function getDetails() {
  //   try {
  //     // Simulate an API call or any async operation
  //     let url = TemplateService._eventID(
  //       URL.onboard_url,
  //       eventData?.program?.id
  //     )

  //     let resp = await services._get(url)
  //     // console.log('Response:', resp)

  //     if (resp?.type === 'success') {
  //       return resp?.data || []
  //       console.log('fetching the onboard data')
  //     }

  //     return []
  //   } catch (error) {
  //     console.log('Error onboard screen get details', error)
  //   }
  // }

  const handleChange = (params, val) => {
    setState({
      ...state,
      [params]: val
    })
  }

  async function handleSubmit() {
    console.log('Form submitted with state:', global.OnboardingData, user)
    // You can navigate to the next screen or perform any action here
    // return;

    const result = []

    if (global.OnboardingData) {
      // formatted data as per API request
      Object.values(global.OnboardingData).forEach(entries => {
        entries.forEach(entry => {
          if (entry.selectedOptions) {
            const optionIds = entry.selectedOptions.map(opt => opt.option_id)
            const { selectedOptions, ...rest } = entry
            result.push({
              ...rest,
              onboardingOptionIds: optionIds,
              runnerId: user?.runnerId,
              eventId: eventData?.id
            })
          } else {
            const { option_id, ...rest } = entry
            result.push({
              ...rest,
              onboardingOptionIds: option_id !== undefined ? [option_id] : [],
              runnerId: user?.runnerId,
              eventId: eventData?.id
            })
          }
        })
      })

      let resp = await services?._post(URL?.submit_onboard, result) // Submit onboard API request

      if (resp?.type === 'success') {
        props.navigation.replace(Strings.NAVIGATION.eventregister)
      } else {
        appsnackbar.showErrMsg('Please fill the question')
      }
    } else {
      props.navigation.replace(Strings.NAVIGATION.eventregister)
    }
  }

  function onNext(e) {
    console.log('onnext called')
    global.CurentOnboardingScreen = 'more_about'
    e?.()
  }

  return (
    <View style={{ flex: 1 }}>
      <OnBoardingScreenUI
        {...state}
        {...props}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onNext={onNext}
      />
    </View>
  )
}
