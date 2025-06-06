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
    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: val
    }

    store.dispatch({
      type: 'SET_ONBOARDING_DATA',
      payload: global.OnboardingData
    })

    return
  }
  const handleSubmit = () => {
    //not used
    console.log('Selected Activity:', state)
    props.navigation.navigate(Strings.NAVIGATION.imagesSlideTab)
  }

  return (
    <View style={styles.container}>
      <ListSlideTabUI
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
