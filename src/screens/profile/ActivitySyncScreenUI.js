import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Images } from '../../utils/constants/Images'
import { hp, wp } from '../../common/functions/dimensions'
import CustomButton from '../../common/components/buttons/CustomButton'
import { fontSize } from '../../utils/constants/Fonts'
import Icons, { iconType } from '../../assets/icons/Icons'
import Colors from '../../utils/constants/Colors'

export default function ActivitySyncScreenUI() {
  return (
    <View style={styles.container}>
      {/* Google Fit Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={Images.google_fit}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Connection Status */}
      <View style={styles.statusContainer}>
        <Icons
          type={iconType.fa5}
          name="sync"
          size={20}
          color={Colors.appbtn}
        />
        <Text style={styles.statusText}>Connected</Text>
      </View>

      {/* Disconnect Button */}
      <CustomButton
        title={'Disconnect'}
        btnStyles={{
          ...styles.btnStyles
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#9CBF0621',
    width: wp(80),
    height: hp(30),
    borderRadius: 10
  },
  logo: {
    width: wp(30),
    height: hp(30)
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center', // this centers the icon/text horizontally
    gap: 5
  },
  statusText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#444'
  },
  btnStyles: {
    marginVertical: hp(3),
    width: wp(80)
  }
})
