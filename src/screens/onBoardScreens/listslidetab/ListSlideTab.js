// react + react native core components
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//  Custom UI component for this screen
import ListSlideTabUI from './ListSlideTabUI'

// string constants
import Strings from '../../../utils/constants/Strings'
import { store } from '../../../redux/store'

export default function ListSlideTab(props) {
  global.CurentOnboardingScreen = 'list'
  async function handleChange(params, val) {
    // This commented because we might get duplicate type of question
    // global.OnboardingData = {
    //   ...global.OnboardingData,
    //   [params]: val
    // }

    let arrayListAnswers = []

    // checking params present in object or not
    if (global.OnboardingData?.hasOwnProperty(params)) {
      let existingArr = global.OnboardingData[params]
      let uniqueQuestionOption = existingArr?.filter(
        item => item?.onboardingQuestionId !== val?.onboardingQuestionId
      )

      arrayListAnswers = [...uniqueQuestionOption, val]
    } else {
      arrayListAnswers = [val]
    }

    // params = []
    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: arrayListAnswers
    }

    store.dispatch({
      type: 'SET_ONBOARDING_DATA',
      payload: global.OnboardingData
    })

    return
  }

  // const handleSubmit = () => {
  //   //not used
  //   console.log('Selected Activity:', state)
  //   props.navigation.navigate(Strings.NAVIGATION.imagesSlideTab)
  // }

  return (
    <View style={styles.container}>
      <ListSlideTabUI
        {...props}
        handleChange={handleChange}
        // handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
