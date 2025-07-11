import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { hp, wp } from '../../functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

const bmiRanges = [
  { label: 'Underweight', min: 0, max: 18.4, color: '#85C1E9' },
  { label: 'Normal', min: 18.5, max: 24.9, color: '#58D68D' },
  { label: 'Overweight', min: 25, max: 29.9, color: '#F4D03F' },
  { label: 'Obese', min: 30, max: 40, color: '#E74C3C' }
]

const DOT_COUNT = 40
const DOT_HEIGHT = 25
const GAP = 2

const getRangeForBmi = bmiValue =>
  bmiRanges.find(range => bmiValue >= range.min && bmiValue <= range.max)

const BMIProgressBar = React.memo(({ bmi, style }) => {
  const translateX = useRef(new Animated.Value(0)).current
  const [barWidth, setBarWidth] = React.useState(0)

  const currentRange = useMemo(() => getRangeForBmi(bmi), [bmi])
  const labelColor = currentRange?.color || '#ccc'
  const labelText = currentRange?.label || ''

  const dotWidth = useMemo(
    () => (barWidth > 0 ? (barWidth - (DOT_COUNT - 1) * GAP) / DOT_COUNT : 0),
    [barWidth]
  )

  useEffect(() => {
    if (barWidth > 0 && dotWidth > 0) {
      const positionIndex = Math.min(Math.floor(bmi), DOT_COUNT - 1)
      Animated.spring(translateX, {
        toValue: positionIndex * dotWidth,
        useNativeDriver: true
      }).start()
    }
  }, [bmi, dotWidth, barWidth, translateX])

  const onLayout = useCallback(e => setBarWidth(e.nativeEvent.layout.width), [])

  const dots = useMemo(
    () =>
      Array.from({ length: DOT_COUNT }).map((_, index) => {
        const bmiValue = index + 1
        const dotColor = getRangeForBmi(bmiValue)?.color || '#ccc'
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: dotColor,
                width: dotWidth,
                height: DOT_HEIGHT,
                marginRight: index !== DOT_COUNT - 1 ? GAP : 0
              }
            ]}
          />
        )
      }),
    [dotWidth]
  )

  return (
    <View style={[styles.container, { width: wp(85) }, style]}>
      <View style={styles.barWrapper} onLayout={onLayout}>
        {dots}
        {barWidth > 0 && (
          <Animated.View
            style={[
              styles.labelWrapper,
              {
                backgroundColor: labelColor,
                transform: [{ translateX }]
              }
            ]}>
            <Text style={styles.labelText}>{labelText}</Text>
            <View
              style={[
                styles.labelTail,
                {
                  borderTopColor: labelColor
                }
              ]}
            />
          </Animated.View>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center'
  },
  barWrapper: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    width: '100%'
  },
  dot: {
    borderRadius: DOT_HEIGHT / 2
  },
  labelWrapper: {
    position: 'absolute',
    top: -hp(4.3),
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center'
  },
  labelText: {
    color: 'white',
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
  },
  labelTail: {
    position: 'absolute',
    bottom: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  }
})

export default BMIProgressBar
