// React Core + React Native components
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Custom UI component for this screen
import ListMultiSelectScreenTabUI from './ListMultiSelectScreenTabUI'

// constants strings
import Strings from '../../../utils/constants/Strings'
import { store } from '../../../redux/store'

export default function ListMultiSelectScreenTab(props) {
  // handle change
  async function handleChange(params, val) {
    // set as initial empty array because of multiple choice question
    let arrayListMultiSelectAnswers = global.OnboardingData?.hasOwnProperty(
      params
    )
      ? global.OnboardingData[params] // initially empty
      : []

    const existingIndex = arrayListMultiSelectAnswers.findIndex(
      item => item.onboardingQuestionId === val.onboardingQuestionId
    )

    if (existingIndex !== -1) {
      console.log('hello exist')

      // Question exists, check if option already added
      const existingOptions =
        arrayListMultiSelectAnswers[existingIndex].selectedOptions

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
    // setting the data to global
    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: arrayListMultiSelectAnswers
    }

    // setting the data to redux
    store.dispatch({
      type: 'SET_ONBOARDING_DATA',
      payload: global.OnboardingData
    })
    return
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.checkboxScreen)
  }

  return (
    <View style={styles.container}>
      <ListMultiSelectScreenTabUI
        {...props}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})
