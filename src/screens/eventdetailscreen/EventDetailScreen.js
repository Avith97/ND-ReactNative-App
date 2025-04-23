import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventDetailScreenUI from './EventDetailScreenUI'
import Strings from '../../utils/constants/Strings'

export default function EventDetailScreen(props) {

    const handleNavigate =()=>{
        props.navigation.navigate(Strings.NAVIGATION.eventregister)
       }
    
  return (
    <View style={{flex:1}}>
      <EventDetailScreenUI handleNavigate={handleNavigate}/>
    </View>
  )
}

const styles = StyleSheet.create({})