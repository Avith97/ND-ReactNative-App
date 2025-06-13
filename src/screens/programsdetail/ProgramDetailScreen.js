import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgramDetailUI from './ProgramDetailScreenUI'
import Strings from '../../utils/constants/Strings'

export default function ProgramDetailScreen(props) {
  const { IsRegistered } = props.route.params

  const handleNavigate = name => {
    if (name === 'register') {
      props.navigation.navigate(Strings.NAVIGATION.eventregister)
    } else {
      props.navigation.navigate(Strings.NAVIGATION.submitresponse)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ProgramDetailUI
        handleNavigate={handleNavigate}
        IsRegistered={IsRegistered}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
