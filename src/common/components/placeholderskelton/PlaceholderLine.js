import React, { useEffect, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'

const PlaceholderLine = ({ width = '80%', height = 16, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [opacity])

  return (
    <Animated.View
      style={[
        {
          opacity,
          width,
          height,
          backgroundColor: '#E0E0E0',
          borderRadius: 8,
          marginVertical: 4
        },
        style
      ]}
    />
  )
}

export default PlaceholderLine
