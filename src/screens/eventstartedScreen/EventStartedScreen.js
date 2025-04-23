import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventStartedScreenUI from './EventStartedScreenUI'
import Strings from '../../utils/constants/Strings'

export default function EventStartedScreen(props) {

   const handleNavigate =()=>{
    props.navigation.navigate(Strings.NAVIGATION.eventdetail)
   }

  return (
    <View style={styles.container}>
      <EventStartedScreenUI handleNavigate={handleNavigate} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})