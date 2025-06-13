import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { fontSize } from '../../../utils/constants/Fonts'
import { hp } from '../../functions/dimensions'

const SessionCard = props => {
  return (
    <View style={{ ...styles.card }}>
      <View style={styles.content}>
        <Text style={{ textAlign: 'right', paddingVertical: hp(1) }}>
          Time : 3:00 pm to 4:00 pm
        </Text>
        <View style={styles.dashedLine} />
        <Text style={styles.title} numberOfLines={2}>
          Faculty: {props?.facultyName}
        </Text>
        <Text style={styles.meta}>Mode: {props?.mode}</Text>
        <Text style={styles.description} numberOfLines={2}>
          Status: {props?.status}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E1FB98',
    borderWidth: 1,
    borderColor: '#B2DB03',
    borderRadius: 16,
    marginTop: hp(1.5),
    padding: 10
  },

  content: {
    flex: 1
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    opacity: 0.4,
    marginBottom: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.m,
    marginBottom: 4,
    color: '#111'
  },
  meta: {
    fontSize: fontSize.s,
    color: '#888',
    marginBottom: 6
  },
  description: {
    fontSize: fontSize.normal,
    color: '#444'
  }
})

export default SessionCard
