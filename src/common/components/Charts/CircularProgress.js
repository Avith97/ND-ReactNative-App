import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CircularProgress = ({
  percentage = 0,
  radius = 50,
  strokeWidth = 10,
  progressColor = '#B6FF2D',
  backgroundColor = '#555',
  iconName = 'leaf',
  iconSize = 24,
  iconColor = '#B6FF2D'
}) => {
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${radius}, ${radius}`}
        />
      </Svg>

      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
        <Text style={styles.text}>{`${percentage}%`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  }
})

export default CircularProgress
