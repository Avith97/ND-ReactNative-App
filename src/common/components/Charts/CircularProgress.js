import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fonts from '../../../utils/constants/Fonts'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const CircularProgress = ({
  percentage,
  currentSteps,
  totalSteps,
  goalSteps,
  radius = SCREEN_WIDTH * 0.2,
  strokeWidth,
  progressColor = '#B6FF2D',
  backgroundColor = '#555',
  iconName = 'run',
  iconColor = '#B6FF2D'
}) => {
  const dynamicStrokeWidth = strokeWidth || radius * 0.15

  //size manage
  const iconSize = radius * 0.4
  const fontSize = radius * 0.28
  // const fontSize = radius * 0.35;

  // Calculate percentage from steps if not provided
  const computedPercentage =
    percentage != null
      ? percentage
      : totalSteps && goalSteps
      ? (totalSteps / goalSteps) * 100
      : 0

  const normalizedRadius = radius - dynamicStrokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset =
    circumference - (computedPercentage / 100) * circumference

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={dynamicStrokeWidth}
        />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={dynamicStrokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${radius}, ${radius}`}
        />
      </Svg>

      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
        <Text style={[styles.stepsText, { fontSize }]}>
          {currentSteps || `${Math.round(computedPercentage)}%`}
        </Text>
        {totalSteps && goalSteps >= 0 && (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.subLabel}>
              Total Steps <Text style={styles.highlight}>{totalSteps}</Text>
            </Text>
            <Text style={styles.subLabel}>
              Total Goal <Text style={styles.highlight}>{goalSteps}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepsText: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
    marginTop: 6
  },
  subLabel: {
    color: '#FFF',
    fontSize: 9,
    fontFamily: Fonts.LightItalic,
    fontWeight: '500'
  },
  highlight: {
    color: '#B6FF2D',
    fontFamily: Fonts.Bold
    // fontWeight: 'bold',
  }
})

export default CircularProgress
