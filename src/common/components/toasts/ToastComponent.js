import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons, { iconType } from '../../../assets/icons/Icons'
import Colors from '../../../utils/constants/Colors'

export const ToastComponent = ({ text1, text2, type, ...props }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Icons
            name="check-circle"
            type={iconType.material}
            size={22}
            color={Colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>{text1}</Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </View>
  )
}
const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    // backgroundColor: '#1f2937',
    backgroundColor: 'rgba(31,41,55,0.8)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  iconContainer: {
    marginTop: 3,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  text1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2
  },
  text2: {
    color: '#d1d5db',
    fontSize: 14
  },
  bottomLine: {
    height: 4,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 8
  }
})
