import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import DashboardScreenUI from './DashboardScreenUI'
import { hp } from '../../../common/functions/dimensions'
import Colors from '../../../utils/constants/Colors'
import ProgramDashboardScreen from '../../programdashboard/ProgramDashboardScreen'

export default function DashboardScreen() {

  const [state , setState] = useState({
    isVisibleProgramDashboard:true
  })
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
        {state.isVisibleProgramDashboard ? <ProgramDashboardScreen /> :  <DashboardScreenUI />}
   
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        backgroundColor:Colors.white,
        paddingBottom: hp(10),
      },
})