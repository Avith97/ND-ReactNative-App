import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { hp, wp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'

const NormalProgressBar = ({
  height = hp(0.7),
  width = wp(70),
  progress = 0
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false
    }).start()
  }, [progress])

  const interpolatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width]
  })

  return (
    <View style={[styles.line, { height, width }]}>
      <Animated.View
        style={[styles.box, { width: interpolatedWidth, height }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    overflow: 'hidden',
    width: 500, // The length of the line from A to B
    height: 2,
    backgroundColor: '#f3f3f3', // The line from A to B
    justifyContent: 'center',
    borderRadius: 12
  },
  box: {
    height: 30,
    borderRadius: 12,
    backgroundColor: '#BFFF00',
    position: 'absolute',
    left: 0
  }
})

export default NormalProgressBar
