import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function OrContainerUI() {
  return (
    <View style={styles.separatorContainer}>
    <View style={styles.line} />
    <Text style={styles.orText}>OR</Text>
    <View style={styles.line} />
  </View>
  )
}

const styles = StyleSheet.create({
    separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
      marginHorizontal:20
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'gray',
    },
    orText: {
      marginHorizontal: 10,
      fontSize: 14, // or use fontSize.s if you have that
      color: 'gray',
    },
  });
  