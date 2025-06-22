// react core + react native components
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// constants strings
import Strings from '../../../utils/constants/Strings'

// Custom UI component for this screen
import CheckBoxSlideTabUI from './CheckBoxSlideTabUI'
import { store } from '../../../redux/store'

export default function CheckBoxSlideTab(props) {
  // handle change = set options to  questions
  async function handleChange(params, val) {
    let arrayListMultiSelectAnswers = global.OnboardingData?.hasOwnProperty(
      params
    )
      ? global.OnboardingData[params] // initially empty
      : []

    const existingIndex = arrayListMultiSelectAnswers.findIndex(
      item => item.onboardingQuestionId === val.onboardingQuestionId
    )

    if (existingIndex !== -1) {
      // Question exists, check if option already added
      const existingOptions =
        arrayListMultiSelectAnswers[existingIndex].selectedOptions

      console.log(existingOptions)

      const alreadyExists = existingOptions.some(
        option => option.option_id === val.option_id
      )

      if (!alreadyExists) {
        // Add new option if not duplicate
        arrayListMultiSelectAnswers[existingIndex].selectedOptions.push(val)
      } else {
        arrayListMultiSelectAnswers[existingIndex].selectedOptions =
          existingOptions.filter(option => option.option_id !== val.option_id)
      }
    } else {
      // Question doesn't exist — add new object
      arrayListMultiSelectAnswers.push({
        onboardingQuestionId: val.onboardingQuestionId,
        selectedOptions: [val]
      })
    }

    // console.log(arrayListMultiSelectAnswers)

    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: arrayListMultiSelectAnswers
    }

    store.dispatch({
      type: 'SET_ONBOARDING_DATA',
      payload: global.OnboardingData
    })
    return
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.cardSlideScreen)
  }

  return (
    <View style={styles.container}>
      <CheckBoxSlideTabUI
        {...props}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
