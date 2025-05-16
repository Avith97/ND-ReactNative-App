import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterEventScreenUI from './RegisterEventScreenUI'
import Strings from '../../utils/constants/Strings'

export default function RegisterEventScreen(props) {
 const handleNavigate =()=>{
        props.navigation.navigate(Strings.NAVIGATION.consent)
       }
    
    
  return (
    <View style={{flex:1}}>
      <RegisterEventScreenUI handleNavigate={handleNavigate} />
    </View>
  )
}

const styles = StyleSheet.create({})