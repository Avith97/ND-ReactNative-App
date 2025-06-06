import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationSettingScreenUI from './NotificationSettingScreenUI'

export default function NotificationSettingScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <NotificationSettingScreenUI />
    </View>
  )
}

const styles = StyleSheet.create({})
