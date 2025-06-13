// react-native
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// UI components
import ProgramDashboardScreenUI from './ProgramDashboardScreenUI'

// constants utils & assets
import Colors from '../../utils/constants/Colors'
import Strings from '../../utils/constants/Strings'

export default function ProgramDashboardScreen(props) {
  const navigation = useNavigation()

  const [state, setState] = useState({
    selectedTab: 'Week'
  })
  // const []
  const [options] = useState({
    tabs: ['Week', 'Month'],
    daysData: [
      { id: 1, dayTitle: 'day1', response: false },
      { id: 2, dayTitle: 'day2', response: true },
      { id: 3, dayTitle: 'day3', response: false },
      { id: 4, dayTitle: 'day4', response: false },
      { id: 5, dayTitle: 'day5', response: false },
      { id: 6, dayTitle: 'day6', response: false },
      { id: 7, dayTitle: 'day7', response: true }
    ]
  })

  const handleNavigate = () => {
    navigation.navigate(Strings.NAVIGATION.programleaderboard)
  }

  const handleChange = tab => {
    console.log(tab)

    setState(prev => ({ ...prev, selectedTab: tab }))
  }
  return (
    <View style={styles.container}>
      <ProgramDashboardScreenUI
        {...state}
        {...props}
        {...options}
        handleNavigate={handleNavigate}
        handleChange={handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20
  }
})
