// React Core + React Native components
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// Custom UI component for this screen
import ListMultiSelectScreenTabUI from './ListMultiSelectScreenTabUI'

// constants strings
import Strings from '../../../utils/constants/Strings'
import { store } from '../../../redux/store'

export default function ListMultiSelectScreenTab(props) {
  async function handleChange(params, item) {
    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: item
    }

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
