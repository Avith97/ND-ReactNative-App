import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons, { iconType } from '../../../assets/icons/Icons'
import Colors from '../../../utils/constants/Colors'
import Fonts from '../../../utils/constants/Fonts'

export const ToastComponent = ({ text1, text2, type, ...props }) => {
  const toastTypeConfig = {
    success: {
      backgroundColor: 'rgba(31,41,55,0.8)',
      icon: 'check-circle',
      iconColor: Colors.primary,
      barColor: Colors.primary
    },
    error: {
      backgroundColor: 'rgba(31,41,55,0.8)',
      icon: 'running-with-errors',
      iconColor: '#ef4444',
      barColor: '#ef4444'
    },
    info: {
      backgroundColor: 'rgba(31,41,55,0.8)',
      icon: 'perm-device-info',
      iconColor: '#facc15',
      barColor: '#facc15'
    }
  }

  const config = toastTypeConfig[type] || toastTypeConfig.info

  return (
    <View
      style={[
        styles.toastContainer,
        { backgroundColor: config.backgroundColor }
      ]}>
      <View style={styles.row}>
        <Icons
          name={config.icon}
          type={iconType.material}
          size={22}
          color={config.iconColor}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text1}>{text1}</Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
      <View style={[styles.bottomLine, { backgroundColor: config.barColor }]} />
    </View>
  )
}
const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  icon: {
    marginTop: 3,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  text1: {
    color: 'white',
    fontFamily: Fonts.Bold,
    fontSize: 16,
    marginBottom: 2
  },
  text2: {
    fontFamily: Fonts.Regular,
    color: '#d1d5db',
    fontSize: 14
  },
  bottomLine: {
    height: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 8
  }
})
