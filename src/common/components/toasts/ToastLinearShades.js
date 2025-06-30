import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons, { iconType } from '../../../assets/icons/Icons'
import Colors from '../../../utils/constants/Colors'
import Fonts from '../../../utils/constants/Fonts'
import LinearGradient from 'react-native-linear-gradient'

export const ToastLinearShades = ({ text1, text2, type, ...props }) => {
  // const toastTypeConfig = {
  //   success: {
  //     backgroundColor: 'rgba(31,41,55,0.56)',
  //     colors:
  //       [
  //         'rgba(0,255,153,0.7)',
  //         'rgba(0,204,102,0.7)',
  //         'rgba(31,41,55,0.1)'
  //       ],
  //     icon: 'check-circle',
  //     iconType: iconType.material,
  //     iconColor: '#22c55e',
  //     barColor: '#22c55e',
  //   },
  //   error: {
  //     backgroundColor: 'rgba(31,41,55,0.7)',
  //     icon: 'running-with-errors',
  //     iconType: iconType.material,
  //     iconColor: '#ef4444',
  //     barColor: '#ef4444',
  //   },
  //   info: {
  //     backgroundColor: 'rgba(31,41,55,0.7)',
  //     icon: 'sellcast',
  //     // icon: 'perm-device-info',
  //     iconType: iconType.fa5b,
  //     iconColor: '#facc15',
  //     barColor: '#facc15',
  //   },
  // };
  const toastTypeConfig = {
    success: {
      backgroundColor: 'rgba(31,41,55,0.5)',
      // colors: [
      //   'rgba(0,255,153,0.7)',   // Light green
      //   'rgba(0,204,102,0.7)',   // Medium green
      //   'rgba(31,41,55,0.1)',    // Slight overlay dark
      // ],
      colors: [
        'rgba(188,214,78,1)', // #BCD64E full opacity
        'rgba(188,213,0,0.7)', // Slightly transparent
        'rgba(31,41,55,0.1)' // More transparent
      ],
      icon: 'check-circle',
      iconType: iconType.material,
      iconColor: '#BCD64E', // Tailwind green-500
      barColor: '#BCD64E'
    },

    error: {
      backgroundColor: 'rgba(31,41,55,0.5)',
      colors: [
        'rgba(255,85,85,0.7)', // Soft red
        'rgba(239,68,68,0.7)', // Tailwind red-500
        'rgba(31,41,55,0.1)'
      ],
      icon: 'running-with-errors',
      iconType: iconType.material,
      iconColor: '#ef4444', // Tailwind red-500
      barColor: '#ef4444'
    },

    info: {
      backgroundColor: 'rgba(31,41,55,0.5)',
      colors: [
        'rgba(250,204,21,0.7)', // Tailwind yellow-400
        'rgba(251,191,36,0.7)', // Golden-yellow
        'rgba(31,41,55,0.1)'
      ],
      icon: 'sellcast', // or 'perm-device-info'
      iconType: iconType.fa5b,
      iconColor: '#facc15', // Tailwind yellow-400
      barColor: '#facc15'
    }
  }

  const config = toastTypeConfig[type] || toastTypeConfig.info

  return (
    <View
      style={[styles.container, { backgroundColor: config.backgroundColor }]}>
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        useAngle={true}
        angle={100}
        angleCenter={{
          x: 0.1,
          y: -1.4
        }}>
        <View
          style={[
            styles.toastContainer,
            { backgroundColor: config.backgroundColor }
          ]}>
          <View style={styles.row}>
            <Icons
              name={config.icon}
              type={config.iconType}
              size={22}
              color={config.iconColor}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.text1}>
                {text1}
              </Text>
              <Text style={styles.text2}>{text2}</Text>
            </View>
          </View>
          <View
            style={[styles.bottomLine, { backgroundColor: config.barColor }]}
          />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  toastContainer: {
    width: '100%',
    // borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: 'center'
  },
  // toastContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 14,
  //   borderRadius: 10,
  //   marginHorizontal: 20,
  //   marginTop: 10,
  //   elevation: 4,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.2,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  // },
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
    fontSize: 18,
    marginBottom: 2
  },
  text2: {
    // textAlign: 'justify',
    fontFamily: Fonts.Regular,
    color: '#e2e2e2',
    // color: '#d1d5db',
    fontSize: 14
  },
  bottomLine: {
    height: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 8
  }
})
