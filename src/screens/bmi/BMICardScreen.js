import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BMICardScreenUI from './BMICardScreenUI'

export default function BMICardScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <BMICardScreenUI />
    </View>
  )
}

const styles = StyleSheet.create({})
