import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationListScreenUi from './NotificationListScreenUI'
import Colors from '../../utils/constants/Colors'

export default function NotificationListScreen() {
  return (
    <View style={styles.container}>
      <NotificationListScreenUi />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white
  }
})
