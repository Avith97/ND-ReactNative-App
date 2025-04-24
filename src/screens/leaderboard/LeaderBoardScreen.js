import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LeaderBoardScreenUI from './LeaderBoardScreenUI'
import Colors from '../../utils/constants/Colors'

export default function LeaderBoardScreen() {
  return (
    <View style={styles.container}>
     <LeaderBoardScreenUI />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:Colors.white
    }
})