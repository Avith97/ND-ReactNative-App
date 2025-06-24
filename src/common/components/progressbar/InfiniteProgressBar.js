import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { hp, wp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'

const MovingObject = props => {
  const [height, setHeight] = useState(props.height || hp(0.7))
  const [width, setWidth] = useState(props.width || wp(70))

  const translateX = useRef(new Animated.Value(-(width + 20))).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width + 20,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(translateX, {
          toValue: -(width + 20),
          duration: 0,
          useNativeDriver: true
        })
      ])
    )

    animation.start()

    return () => animation.stop()
  }, [translateX, width])

  return (
    <View style={[styles.line, { height, width }]}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX }],
            height
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    overflow: 'hidden',
    height: 2,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    borderRadius: 12
  },
  box: {
    width: wp(30),
    borderRadius: 12,
    backgroundColor: Colors.primary,
    position: 'absolute'
  }
})

export default MovingObject
