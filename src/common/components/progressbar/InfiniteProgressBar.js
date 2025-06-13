import React, { useEffect, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { hp, wp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'

const MovingObject = props => {
  const [height, setheight] = useState(props.height || hp(0.7))
  const [width, sewidth] = useState(props.width || wp(70))
  const translateX = new Animated.Value(-(width + 20)) // Start position just before A (negative offset)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        // Move from A (0) to B (300)
        Animated.timing(translateX, {
          toValue: width + 20, // Move to position B (300)
          // toValue: 500, // Move to position B (300)
          duration: 1500, // Duration to reach B
          useNativeDriver: true
        }),
        // Reset position back to A
        Animated.timing(translateX, {
          toValue: -120, // Move back to position A (slightly before A)
          duration: 0, // Instant reset to start position
          useNativeDriver: true
        })
      ])
    ).start()
  }, [])

  return (
    // <View style={styles.container}>
    <View style={{ ...styles.line, height: height, width: width }}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX }], height: height }]}
      />
    </View>
    // </View>
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
    width: wp(30),
    height: 30,
    borderRadius: 12,
    backgroundColor: Colors.color3,
    // backgroundColor: '#4caf50',
    position: 'absolute'
  }
})

export default MovingObject
